import { component$, useStore, useVisibleTask$, useSignal, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import MenuModal from "./MenuModal";
import IconPlay from "../IconPlay";
import IconPause from "../IconPause";

interface CryptoPrice {
  usd: number;
  kas: number;
  marketCap: number;
  priceChange24h: number;
}

// Add proper type for banner messages
interface BannerMessage {
  title?: string;
  subtitle?: string;
  message: string;
  customClass?: string;
}

// Add proper types for menu items
interface MenuItem {
  text: string;
  href: string;
  items?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  href: string;
}

export default component$(() => {
  // Easy toggle: Set to false to disable banner completely
  const BANNER_ENABLED = false;
  
  const store = useStore({
    isScrolling: false,
    isMobile: false,
    showBanner: true,
  });

  const isInitialized = useSignal(false);
  const location = useLocation();

  const cryptoPrice = useSignal<CryptoPrice | null>(null);
  const currentMessageIndex = useSignal(0);

  const audioRef = useSignal<HTMLAudioElement>();
  const isPlaying = useSignal(false);

  const toggleAudio = $(async () => {
    const audio = audioRef.value;
    if (audio) {
      if (isPlaying.value) {
        audio.pause();
        isPlaying.value = false;
        console.log("Audio paused");
      } else {
        try {
          await audio.play();
          isPlaying.value = true;
          console.log("Audio playing");
        } catch (error) {
          console.error("Failed to play audio:", error);
        }
      }
    } else {
      console.error("Audio element not available");
    }
  });

  const handleAudioEnded = $(() => {
    isPlaying.value = false;
  });

  // Fetch BMT price data
  useVisibleTask$(async () => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    store.isMobile = mediaQuery.matches;
    isInitialized.value = true;

    const audio = audioRef.value;
    if (audio && !isPlaying.value) {
      try {
        await audio.play();
        isPlaying.value = true;
        console.log("Audio auto-started on visibility");
      } catch (error) {
        console.error("Failed to auto-play audio:", error);
      }
    }
    
    const handler = (e: MediaQueryListEvent) => {
      store.isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    // Fetch crypto price from CoinGecko API
    const fetchPrice = async () => {
      try {
        // Using CoinGecko API for BMT (Bitcoin Maxi Tears)
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-maxi-tears&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
        );
        const data = await response.json();
        
        if (data['bitcoin-maxi-tears']) {
          // For KAS price, we'd need to fetch Kaspa price and calculate
          const kasResponse = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd'
          );
          const kasData = await kasResponse.json();
          const kasPrice = kasData.kaspa?.usd || 0.15; // fallback
          
          const bmtUsd = data['bitcoin-maxi-tears'].usd;
          const bmtInKas = kasPrice > 0 ? bmtUsd / kasPrice : 0;
          
          cryptoPrice.value = {
            usd: bmtUsd,
            kas: bmtInKas,
            marketCap: data['bitcoin-maxi-tears'].usd_market_cap || 0,
            priceChange24h: data['bitcoin-maxi-tears'].usd_24h_change || 0
          };
        }
      } catch (error) {
        console.error('Error fetching crypto price:', error);
      }
    };

    // Initial fetch
    await fetchPrice();
    
    // Update price every 60 seconds
    const priceInterval = setInterval(fetchPrice, 60000);

    // Cycle through banner messages every 6 seconds
    const messageInterval = setInterval(() => {
      currentMessageIndex.value = (currentMessageIndex.value + 1) % 3;
    }, 6000);

    return () => {
      mediaQuery.removeEventListener("change", handler);
      clearInterval(priceInterval);
      clearInterval(messageInterval);
    };
  });

  const menu: { items: MenuItem[] } = {
    items: [
            { text: "Collections", href: "/collections" },

      { text: "About", href: "#" },
      { text: "Media", href: "#" },
            { text: "Merch", href: "#" },

      // { text: "FAQ", href: "#" },
    ],
  };

  // Generate banner messages dynamically with crypto data
  const getBannerMessages = (): BannerMessage[] => {
    if (!cryptoPrice.value) {
      return [
        {
          message: "X Raid Promontion Banner"
        },
      
        {
          message: "Binance Listing Banner"
        }
      ];
    }

    const { usd, kas, marketCap, priceChange24h } = cryptoPrice.value;
    const priceEmoji = priceChange24h >= 0 ? "" : "";
    const changeColor = priceChange24h >= 0 ? "text-green-600" : "text-green-600";

    return [
      {
        title: `${priceEmoji} BMT $${(marketCap / 1000).toFixed(2)}K`,
        subtitle: `$${usd.toFixed(6)} USD`,
        message: `${kas.toFixed(8)} KAS • ${priceChange24h >= 0 ? '+' : ''}${priceChange24h.toFixed(2)}% (24h)`,
        customClass: changeColor
      },
    ];
  };

  const bannerMessages = getBannerMessages();
  const currentMessage = bannerMessages[currentMessageIndex.value];

  return (
    <>
      {/* Banner - Both mobile and desktop */}
      {BANNER_ENABLED && (
      <div
        class={`
          bg-primary-500 max-w-7xl md:mx-auto px-0.5
          shadow-md
          transition-all duration-100 ease-in-out
          ${store.showBanner ? 'h-auto py-0.5 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}
        `}
      >
        <div class="mx-auto px-0 md:px-10 max-w-7xl">
          <div class="flex items-center justify-between gap-2">
            <div class="flex-1 min-w-0 overflow-hidden">
              {/* Mobile: Scrolling text */}
              <div class="md:hidden relative h-6 flex items-center text-primary-700">
                <div class="animate-scroll whitespace-nowrap">
                  <span class="inline-flex items-center gap-2 mx-3">
                    {currentMessage.title && (
                      <h3 class={`font-bold text-md ${currentMessage.customClass || 'text-primary-600'}`}>{currentMessage.title}</h3>
                    )}
                    {currentMessage.subtitle && (
                      <>
                        <span class="text-md opacity-90">•</span>
                        <span class="text-md opacity-90">{currentMessage.subtitle}</span>
                      </>
                    )}
                    <span class="text-xs opacity-90">•</span>
                    <span class="text-md opacity-90">{currentMessage.message}</span>
                    <span class="text-md opacity-0 mx-8">•</span>
                  </span>
                  {/* Duplicate for seamless loop */}
                  <span class="inline-flex items-center gap-2">
                    {currentMessage.title && (
                      <h3 class={`font-bold text-md ${currentMessage.customClass || 'text-primary-600'}`}>{currentMessage.title}</h3>
                    )}
                    {currentMessage.subtitle && (
                      <>
                        <span class="text-md opacity-90">•</span>
                        <span class="text-md opacity-90">{currentMessage.subtitle}</span>
                      </>
                    )}
                    <span class="text-md opacity-90">•</span>
                    <span class="text-md opacity-90">{currentMessage.message}</span>
                    <span class="text-md opacity-0 mx-8">•</span>
                  </span>
                </div>
              </div>
              
              {/* Desktop: Static wrapped text */}
              <div class="hidden md:flex items-center gap-2 flex-wrap text-primary-700">
                {currentMessage.title && (
                  <h3 class={`font-bold text-md whitespace-nowrap ${currentMessage.customClass || 'text-primary-600'}`}>{currentMessage.title}</h3>
                )}
                {currentMessage.subtitle && (
                  <>
                    <span class="text-md opacity-90">•</span>
                    <span class="text-md md:text-md opacity-90">{currentMessage.subtitle}</span>
                  </>
                )}
                <span class="text-sm opacity-90">•</span>
                <span class="text-md md:text-sm opacity-90">{currentMessage.message}</span>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick$={() => {
                store.showBanner = false;
              }}
              class="flex-shrink-0 p-1 hover:bg-primary-600/30 rounded transition-colors duration-200 group"
              aria-label="Close banner"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 text-primary-700 group-hover:text-primary-800" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      )}
      
      <style>
        {`
          @keyframes scroll {
            0%, 10% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            display: inline-block;
            animation: scroll 22s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      {/* Header */}
      <header
        id="header"
        class={`
          sticky top-0 z-40 flex-none mx-3 md:mx-auto max-w-6xl rounded-t-md 
          transition-all duration-300 ease-in-out
          ${store.isScrolling
            ? "bg-black/40 dark:bg-primary-900/80 md:backdrop-blur-sm"
            : "bg-black/40 md:backdrop-blur-none"
          }
        `}
        window:onScroll$={() => {
          const scrollY = window.scrollY;

          if (!store.isScrolling && scrollY >= 10) {
            store.isScrolling = true;
            store.showBanner = false;
          } else if (store.isScrolling && scrollY < 10) {
            store.isScrolling = false;
            store.showBanner = true;
          }
        }}
      >
        <div class="absolute inset-0" aria-hidden="true"></div>
        <div class="relative text-default py-1 pb-1.5 md:p-1 px-2 md:px-6 mx-auto w-full md:flex md:items-center max-w-7xl">
          {/* Logo Section */}
          <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between items-center">
            <a class="flex items-center pb-1 -mt-2" href="/">
              <div style={{ width: "100px", height: "40px", position: "relative" }} class="md:w-[200px] md:-mt-7 md:h-[80px]">
                {/* Logo placeholder */}
              </div>
            </a>

            {/* Mobile buttons (MenuModal only for mobile) */}
            <div class="flex items-center md:hidden gap-2">
              <a
                class="btn bg-white/30 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconPause /> : <IconPlay />}
              </a>
              <MenuModal />
            </div>
          </div>
          
          {/* Navigation: Centered on desktop */}
          <nav
            class={`
              items-center w-full md:w-auto hidden md:flex dark:text-white overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-auto group
            `}
            aria-label="Main navigation"
          >
            {menu && menu.items ? (
              <ul class="flex flex-col md:flex-row text-white/70 md:self-center w-full md:w-auto text-xl md:text-2xl tracking-[0.01rem] font-medium">
                {menu.items.map(({ text, href, items }, key) => {
                  const isActive = location.url.pathname === href;
                  return (
                    <li key={key} class={items?.length ? "dropdown" : ""}>
                      {items?.length ? (
                        <>
                          <button
                            class={`
                              hover:text-purple-600
                              px-4 py-3
                              flex items-center
                              transition-all duration-200
                              relative
                              rounded-base
                              after:content-['']
                              after:absolute
                              after:bottom-[6px]
                              after:left-1/2
                              after:h-[2px]
                              after:bg-purple-600
                              after:transition-all
                              after:duration-200
                              ${isActive
                                ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                              }
                            `}
                            onClick$={() => {
                              if (location.url.pathname !== "/") {
                                window.location.href = "/classes";
                              } else {
                                const servicesSection = document.getElementById("services");
                                if (servicesSection) {
                                  servicesSection.scrollIntoView({ behavior: "smooth" });
                                }
                              }
                            }}
                          >
                            {text}
                            <IconChevronDown class="w-3.5 h-3.5 ml-0.5 rtl:ml-0 rtl:mr-0.5 hidden md:inline" />
                          </button>
                          <ul
                            class={`
                              dropdown-menu
                              md:backdrop-blur-md
                              dark:md:bg-muted
                              rounded-lg
                              md:absolute
                              pl-4 md:pl-0
                              md:hidden
                              font-medium
                              md:bg-white/80
                              md:min-w-[200px]
                              drop-shadow-xl
                              py-2
                            `}
                          >
                            {items.map(({ text: text2, href: href2 }: SubMenuItem, key2: number) => {
                              const isDropdownActive = location.url.pathname === href2;
                              const isFirst = key2 === 0;
                              const isLast = key2 === items.length - 1;
                              return (
                                <li key={key2}>
                                  <a
                                    class={`
                                      hover:bg-muted
                                      hover:text-purple-600
                                      py-2 px-5
                                      block
                                      whitespace-no-wrap
                                      transition-all duration-200
                                      relative
                                      after:content-['']
                                      after:absolute
                                      after:bottom-[4px]
                                      after:left-1/2
                                      after:h-[2px]
                                      after:bg--purple-600
                                      after:transition-all
                                      after:duration-200
                                      ${isDropdownActive
                                        ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                        : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                                      }
                                      ${isFirst ? "hover:rounded-t-base" : ""}
                                      ${isLast ? "hover:rounded-b-base" : ""}
                                      ${!isFirst && !isLast ? "hover:rounded-none" : ""}
                                    `}
                                    href={href2}
                                    onClick$={(e) => {
                                      if (text2 === "Clay" && href2 === "/about#clay") {
                                        e.preventDefault();
                                        if (location.url.pathname !== "/about") {
                                          window.location.href = "/about#clay";
                                        } else {
                                          const claySection = document.getElementById("clay");
                                          if (claySection) {
                                            claySection.scrollIntoView({ behavior: "smooth" });
                                          }
                                        }
                                      }
                                    }}
                                  >
                                    {text2}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <a
                          class={`
                            hover:bg-muted
                            hover:text-purple-600
                            px-4 py-3
                            flex items-center
                            relative
                            transition-all duration-200
                            after:content-['']
                            after:absolute
                            after:bottom-[6px]
                            after:left-1/2
                            after:h-[2px]
                            after:bg-purple-600
                            after:transition-all
                            after:duration-200
                            rounded-base
                            ${isActive
                              ? "text-purple-600 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                              : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                            }
                          `}
                          href={href}
                        >
                          {text}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </nav>
          
          {/* Right-side buttons: Audio + MINT */}
          <div class="hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0">
            <div class="items-center flex mr-2 justify-between w-full md:w-auto gap-2">
              {/* Audio Play/Pause Button */}
              <a
                class="btn bg-black/20 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconPause /> : <IconPlay />}
              </a>
              <audio
                ref={audioRef}
                src="/images/heroes.mp3"
                preload="auto"
                onEnded$={handleAudioEnded}
              />
              
              {/* MINT Button */}
              {/* <a
                href="#"
                class="w-full sm:w-auto bg-white/30 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  MINT
                  <img
                    src="/images/sticker.webp"
                    alt="Jar Icon"
                    class="w-8 h-8 transform transition-transform duration-300 -ml-1 group-hover:-rotate-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
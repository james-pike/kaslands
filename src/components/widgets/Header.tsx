import { component$, useStore, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconChevronDown from "../icons/IconChevronDown";
import MenuModal from "./MenuModal";

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
  const store = useStore({
    isScrolling: false,
    isMobile: false,
    showBanner: true,
  });

  const isInitialized = useSignal(false);
  const location = useLocation();
  const isHomeRoute = location.url.pathname === "/";

  const cryptoPrice = useSignal<CryptoPrice | null>(null);
  const currentMessageIndex = useSignal(0);

  // Fetch BMT price data
  useVisibleTask$(async () => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    store.isMobile = mediaQuery.matches;
    isInitialized.value = true;
    
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
      { text: "About", href: "#" },
      { text: "Roadmap", href: "#" },
      { text: "Exchanges", href: "#" },
      { text: "Memes", href: "#" },
      { text: "FAQ", href: "#" },
    ],
  };

  // Generate banner messages dynamically with crypto data
  const getBannerMessages = (): BannerMessage[] => {
    if (!cryptoPrice.value) {
      return [
        {
          message: "Check out our latest updates and improvements!"
        },
        {
          message: "Join us for a pottery workshop this weekend!"
        },
        {
          message: "Celebrate creativity with our open studio sessions!"
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
      <div
        class={`
          bg-primary-500 max-w-7xl md:mx-auto px-0.5
          shadow-md
          transition-all duration-100 ease-in-out
          ${store.showBanner ? 'h-auto py-0.5 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}
        `}
      >
        <div class="mx-auto px-0 md:px-6 max-w-7xl">
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
          </div>
        </div>
      </div>
      
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
          sticky top-0 z-40 flex-none mx-auto max-w-7xl 
          transition-all duration-300 ease-in-out border-b-4 border-primary-500
          ${store.isScrolling
            ? "bg-primary-300 md:bg-primary-100/80 dark:bg-primary-900/80 md:backdrop-blur-sm"
            : "bg-primary-300"
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
        <div class="relative text-default py-1 pb-1.5 md:p-1 px-2 md:px-6 mx-auto w-full md:flex md:justify-between max-w-7xl">
          <div class="mr-auto rtl:mr-0 rtl:ml-auto flex justify-between">
            <a class="flex items-center pb-1 -mt-2" href="/">
              <div style={{ width: "100px", height: "40px", position: "relative" }}>
                <img
                  src={isHomeRoute ? "/images/sticker.webp" : "/images/sticker.webp"}
                  alt={isHomeRoute ? "Logo Cropped" : "Logo"}
                  class={{
                    "absolute top-1 left-1 object-contain": true,
                    "w-[40px] h-[40px]": isHomeRoute,
                    "w-[100px] h-[40px]": !isHomeRoute,
                  }}
                  style={{ display: isInitialized.value ? "none" : "block" }}
                />
                {isInitialized.value && (
                  <>
                    {store.isMobile && isHomeRoute && (
                      <img
                        src="/images/sticker.webp"
                        alt="Logo Cropped"
                        class={{
                          "absolute top-1 left-1 w-[50px] h-[50px] object-contain transition-all duration-500 ease-in-out": true,
                          "opacity-100 translate-x-0": !store.isScrolling,
                          "opacity-0 translate-x-full": store.isScrolling,
                        }}
                      />
                    )}
                    <img
                      src="/images/sticker.webp"
                      alt="Logo"
                      class={{
                        "absolute top-1 -left-1 w-[100px] h-[40px] object-contain": true,
                        "transition-all duration-500 ease-in-out": store.isMobile && isHomeRoute,
                        "opacity-0 -translate-x-full": store.isMobile && isHomeRoute && !store.isScrolling,
                        "opacity-100 translate-x-0": !store.isMobile || !isHomeRoute || store.isScrolling,
                      }}
                    />
                  </>
                )}
              </div>
            </a>
            <div class="flex items-center md:hidden gap-1">
              <MenuModal />
            </div>
          </div>
          <nav
            class="items-center w-full md:w-auto hidden md:flex dark:text-white overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-auto md:mx-5 group"
            aria-label="Main navigation"
          >
            {menu && menu.items ? (
              <ul class="flex flex-col md:flex-row text-primary-600 md:self-center w-full md:w-auto text-xl md:text-2xl tracking-[0.01rem] font-medium">
                {menu.items.map(({ text, href, items }, key) => {
                  const isActive = location.url.pathname === href;
                  return (
                    <li key={key} class={items?.length ? "dropdown" : ""}>
                      {items?.length ? (
                        <>
                          <button
                            class={`
                              hover:text-[#f29b10]
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
                              after:bg-[#f29b10]
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
                                      hover:text-[#f29b10]
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
                                      after:bg--[#f29b10]
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
                            hover:text-[#f29b10]
                            px-4 py-3
                            flex items-center
                            relative
                            transition-all duration-200
                            after:content-['']
                            after:absolute
                            after:bottom-[6px]
                            after:left-1/2
                            after:h-[2px]
                            after:bg-[#f29b10]
                            after:transition-all
                            after:duration-200
                            rounded-base
                            ${isActive
                              ? "text-[#f29b10] after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
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
          <div class="hidden md:self-center md:flex items-center md:mb-0 fixed w-full md:w-auto md:static justify-end left-0 rtl:left-auto rtl:right-0 bottom-0 p-3 md:p-0">
            <div class="items-center flex justify-between w-full md:w-auto">
              <a
                href="#"
                class="w-full sm:w-auto bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Get $BMT 
                  <img
                    src="/images/sticker.webp"
                    alt="Jar Icon"
                    class="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-12 group-hover:translate-y-1 group-hover:-translate-x-1"
                  />
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
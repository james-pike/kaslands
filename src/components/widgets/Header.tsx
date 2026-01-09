import { component$, useStore, useVisibleTask$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import IconChevronDown from "../icons/IconChevronDown";
import IconPlay from "../IconPlay";
import IconPause from "../IconPause";
import { useAudioContext } from "~/contexts/AudioContext";
import { useTabContext, type TabId } from "~/contexts/TabContext";
import { GunIcon } from "~/components/icons/GunIcon";
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
  // Easy toggle: Set to false to disable banner completely
  const BANNER_ENABLED = false;
  
  const store = useStore({
    isScrolling: false,
    isMobile: false,
    showBanner: true,
    scrolledPast25: false,
  });

useStylesScoped$(`
  @keyframes neon-flicker {
    0%, 100% {
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(255, 255, 255, 0.6),
        0 0 30px rgba(255, 182, 193, 0.8),
        0 0 40px rgba(255, 182, 193, 0.6),
        0 0 50px rgba(255, 182, 193, 0.4),
        0 0 75px rgba(255, 182, 193, 0.3);
    }
    50% {
      text-shadow: 
        0 0 12px rgba(255, 255, 255, 0.85),
        0 0 22px rgba(255, 255, 255, 0.65),
        0 0 32px rgba(255, 182, 193, 0.85),
        0 0 42px rgba(255, 182, 193, 0.65),
        0 0 55px rgba(255, 182, 193, 0.45),
        0 0 80px rgba(255, 182, 193, 0.35);
    }
  }

  .neon-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: transparent;
    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
    text-stroke: 2px rgba(255, 255, 255, 0.8);
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.8),
      0 0 20px rgba(255, 255, 255, 0.6),
      0 0 30px rgba(255, 182, 193, 0.8),
      0 0 40px rgba(255, 182, 193, 0.6),
      0 0 50px rgba(255, 182, 193, 0.4),
      0 0 75px rgba(255, 182, 193, 0.3);
    animation: neon-flicker 2s infinite alternate;
  }

  /* Further reduced brightness on mobile */
  @media (max-width: 768px) {
    @keyframes neon-flicker-mobile {
      0%, 100% {
        text-shadow: 
          0 0 5px rgba(255, 255, 255, 0.4),
          0 0 10px rgba(255, 255, 255, 0.3),
          0 0 15px rgba(255, 182, 193, 0.4),
          0 0 25px rgba(255, 182, 193, 0.3);
      }
      50% {
        text-shadow: 
          0 0 6px rgba(255, 255, 255, 0.45),
          0 0 12px rgba(255, 255, 255, 0.35),
          0 0 18px rgba(255, 182, 193, 0.45),
          0 0 28px rgba(255, 182, 193, 0.35);
      }
    }

    .neon-text {
      -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
      text-stroke: 2px rgba(255, 255, 255, 0.5);
      text-shadow: 
        0 0 5px rgba(255, 255, 255, 0.4),
        0 0 10px rgba(255, 255, 255, 0.3),
        0 0 15px rgba(255, 182, 193, 0.4),
        0 0 25px rgba(255, 182, 193, 0.3);
      animation: neon-flicker-mobile 3.5s infinite alternate; /* Slower, calmer flicker */
    }
  }

  /* Optional: Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .neon-text {
      animation: none;
      text-shadow: 
        0 0 5px rgba(255, 255, 255, 0.3),
        0 0 12px rgba(255, 182, 193, 0.3);
    }
  }
`);

  const isInitialized = useSignal(false);

  const cryptoPrice = useSignal<CryptoPrice | null>(null);
  const currentMessageIndex = useSignal(0);

  // Use global audio context
  const { isPlaying, toggleAudio } = useAudioContext();

  // Use tab context for tab navigation
  const { activeTab } = useTabContext();

  // Handle tab switching

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
      { text: "About", href: "about" },
      { text: "Collection", href: "collection" },
      { text: "Merch", href: "merch" },
      { text: "FAQ", href: "faq" },
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
          sticky top-0 z-40 mt-0 flex-none mx-3 md:mx-auto max-w-6xl rounded-t-md
          transition-all duration-150 ease-in-out
          ${store.isScrolling
            ? "bg-gray-900/85 dark:bg-primary-900/85 md:backdrop-blur-sm"
            : "bg-gray-900/75 md:backdrop-blur-sm"
          }
        `}
        window:onScroll$={() => {
          const scrollY = window.scrollY;
          const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollY / pageHeight) * 100;

          if (!store.isScrolling && scrollY >= 10) {
            store.isScrolling = true;
            store.showBanner = false;
          } else if (store.isScrolling && scrollY < 10) {
            store.isScrolling = false;
            store.showBanner = true;
          }

          // Show h1 on desktop after 25% scroll
          store.scrolledPast25 = scrollPercent >= 10;
        }}
      >
        <div class="absolute inset-0" aria-hidden="true"></div>
        <div class="relative text-default py-1 pb-1.5 md:p-1 px-2 md:px-6 mx-auto w-full md:flex md:items-center max-w-7xl">
          {/* Logo Section */}
          <div class="mr-auto rtl:mr-0 rtl:ml-auto flex flex-col md:flex-row justify-between items-start md:items-center w-full md:w-auto">
            <div class="flex justify-between items-center w-full md:w-auto">
              <button class="flex items-center pb-1 -mt-2" onClick$={(e) => {
                e.preventDefault();
                activeTab.value = 'collection';
              }}>
                <div style={{ width: "100px", height: "40px", position: "relative" }} class="md:w-[200px] md:-mt-7 md:h-[80px]">
                  {/* Logo - Hidden on mobile until scroll, shown on desktop after 25% scroll */}
                  <h1 class={`neon-text text-2xl py-3 md:py-5 px-1.5 transition-opacity duration-300 ${store.isScrolling ? 'block' : 'hidden'} ${store.scrolledPast25 ? 'md:block' : 'md:hidden'}`}>Kaslands</h1>
                </div>
              </button>

              {/* Mobile buttons - Play, Twitter, Telegram, Menu */}
              <div class="flex items-center md:hidden gap-2">
              <a
                class="btn bg-white/10 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-white/20 transition-all"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconPause /> : <IconPlay />}
              </a>

              <a
                href="#"
                class="btn bg-white/10 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-white/20 transition-all"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-twitter-x" viewBox="0 0 16 16" height="20" width="20">
                  <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
                </svg>
              </a>

              <a
                href="#"
                class="btn bg-white/10 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-white/20 transition-all"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="white"></path>
                </svg>
              </a>

              {/* Mobile Menu Modal */}
              <MenuModal />
              </div>
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
              <ul class="flex flex-col md:flex-row  text-white/70 neon-text md:self-center w-full md:w-auto text-xl md:text-2xl tracking-[0.01rem] font-medium">
                {menu.items.map(({ text, href, items }, key) => {
                  const isActive = activeTab.value === href;
                  return (
                    <li key={key} class={items?.length ? "dropdown" : ""}>
                      {items?.length ? (
                        <>
                          <button
                            class={`
                              hover:text-pink-600
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
                              after:bg-pink-600
                              after:transition-all
                              after:duration-200
                              ${isActive
                                ? "after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                                : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                              }
                            `}
                            onClick$={(e) => {
                              e.preventDefault();
                              activeTab.value = href as TabId;
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
                              const isDropdownActive = activeTab.value === href2;
                              const isFirst = key2 === 0;
                              const isLast = key2 === items.length - 1;
                              return (
                                <li key={key2}>
                                  <button
                                    class={`
                                      hover:bg-muted
                                      hover:text-pink-600
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
                                      after:bg-pink-600
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
                                    onClick$={(e) => {
                                      e.preventDefault();
                                      activeTab.value = href2 as TabId;
                                    }}
                                  >
                                    {text2}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <button
                          class={`
                            hover:bg-muted
                            hover:text-pink-600
                            px-4 py-3
                            flex items-center
                            relative
                            transition-all duration-200
                            after:content-['']
                            after:absolute
                            after:bottom-[6px]
                            after:left-1/2
                            after:h-[2px]
                            after:bg-pink-600
                            after:transition-all
                            after:duration-200
                            rounded-base
                            ${isActive
                              ? "text-pink-600 after:w-1/2 after:left-1/4 md:group-hover:[&:not(:hover)]:after:w-0 md:group-hover:[&:not(:hover)]:after:left-1/2"
                              : "after:w-0 md:hover:after:w-1/2 md:hover:after:left-1/4"
                            }
                          `}
                          onClick$={(e) => {
                            e.preventDefault();
                            activeTab.value = href as TabId;
                          }}
                        >
                          {text}
                        </button>
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
              {/* Social Icons */}
              <a
                href="#"
                class="btn bg-black/20 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-black/30 transition-all"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-twitter-x" viewBox="0 0 16 16" height="20" width="20">
                  <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
                </svg>
              </a>

              <a
                href="#"
                class="btn bg-black/20 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-black/30 transition-all"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="white"></path>
                </svg>
              </a>

              {/* Audio Play/Pause Button */}
              <a
                class="btn bg-black/20 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md"
                aria-label={isPlaying.value ? "Pause audio" : "Play audio"}
                onClick$={toggleAudio}
              >
                {isPlaying.value ? <IconPause /> : <IconPlay />}
              </a>

              {/* MINT Button */}
              <a
                href="#"
                class="w-full sm:w-auto bg-pink-600/40 hover:bg-pink-600/60 group relative inline-flex items-center justify-center px-3 pl-4 py-2 rounded-md shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-pink-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500"
                role="button"
                aria-label="Mint NFT"
              >
                <span class="relative z-10 flex items-center gap-1 neon-text text-xl md:text-2xl tracking-[0.01rem] font-medium text-white/70">
                  MINT
                  <div class="transform transition-transform duration-300 group-hover:-rotate-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <GunIcon />
                  </div>
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
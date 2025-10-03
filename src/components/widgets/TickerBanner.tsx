import { component$, useStore, useVisibleTask$, useSignal } from "@builder.io/qwik";

interface CryptoPrice {
  usd: number;
  kas: number;
  marketCap: number;
  priceChange24h: number;
}

interface CryptoBannerProps {
  showBanner?: boolean;
  autoHide?: boolean;
  onScroll?: boolean;
}

export default component$<CryptoBannerProps>(({ showBanner = true, autoHide = false, onScroll = false }) => {
  const store = useStore({
    isMobile: false,
    isVisible: showBanner,
  });

  const cryptoPrice = useSignal<CryptoPrice | null>(null);
  const currentMessageIndex = useSignal(0);

  // Fetch BMT price data
  useVisibleTask$(async () => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    store.isMobile = mediaQuery.matches;
    
    const handler = (e: MediaQueryListEvent) => {
      store.isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handler);

    // Fetch crypto price from CoinGecko API
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-maxi-tears&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
        );
        const data = await response.json();
        
        if (data['bitcoin-maxi-tears']) {
          const kasResponse = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd'
          );
          const kasData = await kasResponse.json();
          const kasPrice = kasData.kaspa?.usd || 0.15;
          
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

    // Since we only have one message, no need to cycle messages
    const messageInterval = setInterval(() => {
      currentMessageIndex.value = 0; // Always stay on the first (and only) message
    }, 6000);

    // Optional scroll handler
    if (onScroll && autoHide) {
      const scrollHandler = () => {
        const scrollY = window.scrollY;
        store.isVisible = scrollY < 10;
      };
      window.addEventListener('scroll', scrollHandler);
      
      return () => {
        mediaQuery.removeEventListener("change", handler);
        clearInterval(priceInterval);
        clearInterval(messageInterval);
        window.removeEventListener('scroll', scrollHandler);
      };
    }

    return () => {
      mediaQuery.removeEventListener("change", handler);
      clearInterval(priceInterval);
      clearInterval(messageInterval);
    };
  });

  // Generate a single banner message with all crypto data
  const getBannerMessages = () => {
    if (!cryptoPrice.value) {
      return [
        {
          title: "🎉 Important Announcement",
          subtitle: "New Feature Launch",
          message: "Check out our latest updates and improvements!",
          customClass: "" // Default empty string for fallback
        }
      ];
    }

    const { usd, kas, marketCap, priceChange24h } = cryptoPrice.value;
    const priceEmoji = priceChange24h >= 0 ? "📈" : "📉";
    const changeColor = priceChange24h >= 0 ? "text-green-600" : "text-red-600";

    return [
      {
        title: `${priceEmoji} BMT Stats`,
        subtitle: `$${usd.toFixed(6)} USD • ${kas.toFixed(8)} KAS`,
        message: `Market Cap: $${(marketCap / 1000).toFixed(2)}K • 24h: ${priceChange24h >= 0 ? '+' : ''}${priceChange24h.toFixed(2)}%`,
        customClass: changeColor
      }
    ];
  };

  const bannerMessages = getBannerMessages();
  const currentMessage = bannerMessages[currentMessageIndex.value];

  return (
    <>
      {/* Banner */}
      <div
        class={`
          bg-primary-200/70 max-w-7xl md:mx-auto px-0.5
          shadow-md
          transition-all duration-300 ease-in-out
          ${store.isVisible ? 'h-auto py-0.5 opacity-100' : 'h-0 py-0 opacity-0 overflow-hidden'}
        `}
      >
        <div class="mx-auto px-0 md:px-6 max-w-7xl">
          <div class="flex items-center justify-between gap-2">
            <div class="flex-1 min-w-0 overflow-hidden">
              {/* Mobile: Scrolling text */}
              <div class="md:hidden relative h-6 flex items-center text-primary-700">
                <div class="animate-scroll whitespace-nowrap">
                  <span class="inline-flex items-center gap-2 mx-3">
                    <h3 class={`font-bold text-md ${currentMessage.customClass || 'text-primary-600'}`}>{currentMessage.title}</h3>
                    <span class="text-md opacity-90">•</span>
                    <span class="text-md opacity-90">{currentMessage.subtitle}</span>
                    <span class="text-xs opacity-90">•</span>
                    <span class="text-md opacity-90">{currentMessage.message}</span>
                    <span class="text-md opacity-0 mx-8">•</span>
                  </span>
                  {/* Duplicate for seamless loop */}
                  <span class="inline-flex items-center gap-2">
                    <h3 class={`font-bold text-md ${currentMessage.customClass || 'text-primary-600'}`}>{currentMessage.title}</h3>
                    <span class="text-md opacity-90">•</span>
                    <span class="text-md opacity-90">{currentMessage.subtitle}</span>
                    <span class="text-md opacity-90">•</span>
                    <span class="text-md opacity-90">{currentMessage.message}</span>
                    <span class="text-md opacity-0 mx-8">•</span>
                  </span>
                </div>
              </div>
              
              {/* Desktop: Static wrapped text */}
              <div class="hidden md:flex items-center gap-2 flex-wrap text-primary-700">
                <h3 class={`font-bold text-md whitespace-nowrap ${currentMessage.customClass || 'text-primary-600'}`}>{currentMessage.title}</h3>
                <span class="text-md opacity-90">•</span>
                <span class="text-md md:text-md opacity-90">{currentMessage.subtitle}</span>
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
    </>
  );
});
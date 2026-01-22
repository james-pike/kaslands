import { component$, useSignal, $, useVisibleTask$, useStyles$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { Carousel } from '@qwik-ui/headless';
import { type DocumentHead } from "@builder.io/qwik-city";
import { FileQuestionIcon, MountainIcon } from "lucide-qwik";
import { Card } from "~/components/ui/Card";
import { SITE } from "~/config.mjs";
import Collections from "~/components/widgets/Collections";
import AboutCarousel from "~/components/widgets/AboutCarousel";
import { useTabContext } from "~/contexts/TabContext";

// Mailchimp subscription server function
const subscribeToMailchimp = server$(async (email: string, listType: 'newsletter' | 'notify') => {
  const API_KEY = process.env.MAILCHIMP_API_KEY || '';
  const DC = API_KEY.split('-')[1] || 'us13';
  const LIST_ID = process.env.MAILCHIMP_LIST_ID || '';

  const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${API_KEY}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: [listType === 'notify' ? 'art-print-notify' : 'newsletter'],
        merge_fields: {
          FNAME: 'James',
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: 'Successfully subscribed!' };
    } else if (data.title === 'Member Exists') {
      return { success: true, message: 'You are already subscribed!' };
    } else {
      return { success: false, message: data.detail || 'Subscription failed. Please try again.' };
    }
  } catch (error) {
    console.error('Mailchimp error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
});

// Gun Icon component for MINT button
const GunIcon = component$(() => {
  return (
    <svg
      height="36px"
      width="36px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.461 512.461"
      fill="#000000"
    >
      <g transform="translate(1 1)">
        <path
          style={{ fill: "#fd08d0" }}
          d="M40.421,208.297c23.893,0,40.107,25.6,29.013,46.933l-56.32,114.347 c-8.533,18.773-5.973,40.96,8.533,58.027c10.24,12.8,26.453,19.627,43.52,19.627h96.427c26.453,0,40.96-31.573,23.04-51.2 l-11.093-12.8c-2.56-3.413-4.267-8.533-3.413-12.8l51.2-162.133H40.421z"
        />
        <path
          style={{ fill: "#ff0aa5" }}
          d="M33.595,88.831v25.6l8.533,12.8c8.533,12.8,8.533,29.867,0,42.667l-8.533,12.8v25.6h332.8v-17.067 c0-13.653,10.24-25.6,23.04-25.6h87.893v-76.8H33.595z"
        />
      </g>
    </svg>
  );
});

// Camera Icon component for FAQ "What I do?"
const CameraIcon = component$(() => {
  return (
    <svg
      class="w-4 h-4 text-pink-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
});


interface Faq {
  id: number;
  question: string;
  answer: string;
  icon: any;
  isHtml?: boolean;
}

export default component$(() => {
  const { activeTab } = useTabContext();
  const hasScrolledOnTabChange = useSignal(false);
  const bundleCarouselPlaying = useSignal(false);
  const bundleCurrentSlide = useSignal(0);
  const bundleTouchStartX = useSignal(0);
  const bundleTouchEndX = useSignal(0);

  // Art Print Bundle images
  const bundleImages = [
    '/images/b1.jpg',
    '/images/b2.jpg',
    '/images/b3.jpg',
    '/images/b4.jpg',
    '/images/b5.jpg',
    '/images/b6.jpg',
    '/images/b7.jpg',
    '/images/b8.jpg',
    '/images/b9.jpg',
  ];

  useStyles$(`
    .bundle-slide-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      touch-action: pan-y;
      user-select: none;
      border: 2px solid rgba(236, 72, 153, 0.3);
      border-radius: 0.125rem;
    }
    .bundle-carousel-track {
      display: flex;
      width: ${9 * 100}%;
      height: 100%;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .bundle-carousel-item {
      width: ${100 / 9}%;
      height: 100%;
      flex-shrink: 0;
    }
    .bundle-carousel-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .bundle-slide-dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      position: absolute;
      bottom: 12px;
      left: 0;
      right: 0;
      z-index: 10;
    }
    .bundle-slide-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(236, 72, 153, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .bundle-slide-dot.active {
      background: rgba(236, 72, 153, 0.8);
      transform: scale(1.3);
    }
    .bundle-carousel-root {
      height: 100%;
      width: 100%;
      position: relative;
    }
    .bundle-carousel-slide {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bundle-carousel-slide img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 0.125rem;
    }
    .bundle-carousel-scroller {
      height: 100%;
      width: 100%;
    }
    .bundle-carousel-buttons {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      padding: 0 8px;
    }
    .bundle-carousel-button {
      pointer-events: auto;
      width: 36px;
      height: 36px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.3s ease;
      border: 1px solid rgba(236, 72, 153, 0.5);
    }
    .bundle-carousel-button:hover {
      background: rgba(236, 72, 153, 0.7);
    }
    .bundle-carousel-button svg {
      width: 20px;
      height: 20px;
    }
  `);

  // Scroll to content when tab changes (skip hero on mobile)
  useVisibleTask$(({ track }) => {
    // Track activeTab changes
    track(() => activeTab.value);

    // Skip scrolling on initial page load
    if (!hasScrolledOnTabChange.value) {
      hasScrolledOnTabChange.value = true;
      return;
    }

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Small delay to ensure DOM is updated after tab change
      setTimeout(() => {
        // On mobile, scroll so content starts right under the header
        const heroSection = document.querySelector('section.md\\:hidden') as HTMLElement | null;
        if (heroSection) {
          const heroHeight = heroSection.offsetHeight;
          // Use less scroll for About tab to show more padding
          const scrollOffset = activeTab.value === 'about' ? 6 : 7;
          window.scrollTo({ top: heroHeight + scrollOffset, behavior: 'instant' });
        } else {
          window.scrollTo({ top: 360, behavior: 'instant' });
        }
      }, 50);
    } else {
      // On desktop, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Newsletter and notification form state
  const newsletterEmail = useSignal('');
  const notifyEmail = useSignal('');
  const newsletterStatus = useSignal<'idle' | 'loading' | 'success' | 'error'>('idle');
  const notifyStatus = useSignal<'idle' | 'loading' | 'success' | 'error'>('idle');
  const newsletterMessage = useSignal('');
  const notifyMessage = useSignal('');
  const showNotifyModal = useSignal(false);

  // FAQ items
  const faqs = useSignal<Faq[]>([
    {
      id: 1,
      question: "Who I am?",
      answer: `I'm Jules, I enjoy being with family & friends. Having celiac & a form of asthma, I'm an avid health enthusiast. I like 80s music & that retro vibe. I also really enjoy cooking, baking, gardening, photography, spending time in the outdoors, & games that bring people together.`,
      icon: MountainIcon,
    },
    {
      id: 2,
      question: "What I do?",
      answer: `The photography you see was all shot by yours truly. I have & will continue to hire various artists & skilled professionals to bring my visions to web3. I want all my projects that are applicable to be fair launched. Some of the NFT collections are created from photography, some from sketches. In the works include more art collections & kaslands merch. More to be discussed.`,
      icon: CameraIcon,
      isHtml: true,
    },
    {
      id: 3,
      question: "Why?",
      answer: `I'm honing my brand as an early entrepreneur and investor within Kaspa. I am creating an ecosystem that brings excitement, creativity, and a place to connect & engage with others. I believe we are in the early stages of kaspa still, similarly to other cryptocurrencies that became a top 10.`,
      icon: FileQuestionIcon,
    },
    {
      id: 4,
      question: "What's next?",
      answer: `Upcoming plans include more art collections, brand merchandise, and community engagement. Expect collaborations and exclusive drops to build a lasting presence in web3.`,
      icon: MountainIcon,
    },
  ]);

  const openItems = useSignal<number | null>(null);
  const isMobile = useSignal(false);

  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    isMobile.value = mediaQuery.matches;
    openItems.value = faqs.value[0]?.id || null;

    const handler = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches;
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  });

  // Bundle carousel autoplay - only when merch tab is active
  useVisibleTask$(({ track, cleanup }) => {
    track(() => activeTab.value);

    if (activeTab.value === 'merch') {
      // Reset to first slide when entering merch tab
      bundleCurrentSlide.value = 0;
      bundleCarouselPlaying.value = true;

      // Start autoplay interval
      const interval = setInterval(() => {
        bundleCurrentSlide.value = (bundleCurrentSlide.value + 1) % bundleImages.length;
      }, 3500);

      cleanup(() => {
        clearInterval(interval);
        bundleCarouselPlaying.value = false;
      });
    }
  });


  const toggleItem = $((id: number) => {
    openItems.value = openItems.value === id ? null : id;
  });

  const leftColumn = faqs.value.filter((_, i) => i % 2 === 0);
  const rightColumn = faqs.value.filter((_, i) => i % 2 === 1);

  const renderFaqItem = (item: Faq) => {
    const Icon = item.icon;
    return (
      <div key={item.id} class="group">
        <div class="bg-gray-900/60 rounded-md border-2 border-pink-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <button
            onClick$={() => toggleItem(item.id)}
            class="w-full px-4 py-3 flex items-center justify-between text-left transition-all"
            aria-expanded={openItems.value === item.id}
            aria-controls={`faq-answer-${item.id}`}
          >
            <div class="flex items-center gap-2">
              <Icon class="w-4 h-4 text-pink-500" />
              <h3 class="!text-lg md:neon-text font-semibold text-white">
                {item.question}
              </h3>
            </div>
            <div
              class={`w-8 h-8 rounded-full border-pink-500/80 border flex items-center justify-center transition-all ${
                openItems.value === item.id
                  ? "bg-pink-500/80 text-white"
                  : "bg-white/20"
              }`}
            >
              <svg
                class={`w-5 h-5 transition-transform text-pink-500 ${
                  openItems.value === item.id ? "rotate-180 text-white" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          <div
            id={`faq-answer-${item.id}`}
            class={`overflow-hidden transition-all duration-300 ${
              openItems.value === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div class="px-4 pb-3 text-white">
              {item.isHtml ? (
                <div dangerouslySetInnerHTML={item.answer} />
              ) : (
                <p>{item.answer}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div class="flex flex-col">
        {/* Hero Landing Section - Mobile Only */}
        <section class="relative mx-auto max-w-7xl w-full md:hidden transform-gpu backface-hidden" style="will-change: transform; contain: layout style paint;">
          {/* Hero Content Container */}
          <div class="p-5 pt-8 pb-2 max-w-6xl rounded-t-none border-none mx-[6px] bg-gray-900/60">
            <div class="relative py-8 md:py-20 px-0 md:px-8 mx-2 transform-gpu">
              <div class="relative z-10 flex flex-col items-center justify-center text-center">
                {/* Large Kaslands Logo */}
                <h1 class="neon-text text-[4.125rem] md:text-8xl lg:text-9xl mb-10 md:mb-12 !tracking-tight md:!tracking-wide brightness-100 px-4 md:px-0 transform-gpu backface-hidden">
                  Kaslands
                </h1>

                {/* Subtitle */}
                <p class="text-white/80 text-2xl md:text-2xl mt-2 max-w-lg px-0">
                  Explore collections, join our community and be a part of the legacy.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons Container */}
          <div class="px-5 py-0 mb-0.75 pb-7 max-w-6xl border-none mx-[6px] bg-gray-900/60">
            <div class="flex flex-row gap-3 justify-center">
              <a
                href="https://kaspa.com/nft/collections/KASLANDS"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-pink-600/60 hover:bg-pink-600/75 group relative inline-flex items-center justify-center px-10 py-3 rounded-md shadow-lg hover:shadow-[0_0_20px_rgba(255,105,180,0.5)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-pink-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500"
                role="button"
                aria-label="Mint NFT"
              >
                <span class="relative z-10 flex items-center gap-1 neon-text text-xl md:text-2xl tracking-[0.01rem] font-medium text-white/70 brightness-[0.9] md:brightness-100">
                  MINT
                  <div class="transform transition-transform duration-300 group-hover:-rotate-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <GunIcon />
                  </div>
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </a>

              <a
                href="#"
                onClick$={(e) => {
                  e.preventDefault();
                  if (activeTab.value === 'about') {
                    activeTab.value = 'faq';
                  } else if (activeTab.value === 'faq') {
                    activeTab.value = 'merch';
                  } else if (activeTab.value === 'merch') {
                    activeTab.value = 'collection';
                  } else {
                    activeTab.value = 'about';
                  }
                }}
                class="bg-purple-600/60 hover:bg-purple-600/75 group relative inline-flex items-center justify-center px-10 py-3 rounded-md shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500"
                role="button"
                aria-label="Explore collections"
              >
                <span class="relative z-10 neon-text text-xl md:text-2xl tracking-[0.01rem] font-medium text-white/70 brightness-[0.9] md:brightness-100">
                  EXPLORE
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </section>

        <main class="mt-0 order-3">
          <div class="relative mx-auto max-w-7xl overflow-x-hidden">

            {/* Collections Tab */}
            {activeTab.value === 'collection' && (
              <Collections />
            )}

            {/* About Tab */}
            {activeTab.value === 'about' && (
              <>
                {/* About Carousel */}
                <AboutCarousel />

                {/* Bottom CTA Section */}
                <div class="max-w-6xl md:mx-auto mb-0.5 md:mb-1.5 md:mt-1 mx-[6px] md:px-0">
                  <div class="bg-gray-900/80 bg-gradient-to-r from-pink-600/30 to-purple-600/30 p-5 md:p-8 border-2 border-pink-500/30 text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
                      Join Kaslands
                    </h2>
                    <p class="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                      Explore collections, join our community and be a part of the legacy.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Merch Tab */}
            {activeTab.value === 'merch' && (
              <Card.Root class="p-3 md:p-5 mb-0.5 pt-3 max-w-6xl rounded-xs rounded-t-none border-none md:mx-auto mx-[6px] bg-gray-900/60">
                  {/* Featured Product Banner */}
                  <div class="grid md:grid-cols-2 gap-2 md:gap-4 mb-4">
                    <div class="overflow-hidden h-[300px] md:h-[400px]">
                      {/* Mobile: Sliding Carousel */}
                      <div
                        class="bundle-slide-container md:hidden"
                        onTouchStart$={(e) => {
                          bundleTouchStartX.value = e.touches[0].clientX;
                          bundleTouchEndX.value = e.touches[0].clientX;
                        }}
                        onTouchMove$={(e) => {
                          bundleTouchEndX.value = e.touches[0].clientX;
                        }}
                        onTouchEnd$={() => {
                          const swipeThreshold = 50;
                          const diff = bundleTouchStartX.value - bundleTouchEndX.value;

                          if (Math.abs(diff) > swipeThreshold) {
                            if (diff > 0) {
                              bundleCurrentSlide.value = (bundleCurrentSlide.value + 1) % bundleImages.length;
                            } else {
                              bundleCurrentSlide.value = (bundleCurrentSlide.value - 1 + bundleImages.length) % bundleImages.length;
                            }
                          }

                          bundleTouchStartX.value = 0;
                          bundleTouchEndX.value = 0;
                        }}
                      >
                        <div
                          class="bundle-carousel-track"
                          style={{ transform: `translateX(-${bundleCurrentSlide.value * (100 / bundleImages.length)}%)` }}
                        >
                          {bundleImages.map((src, index) => (
                            <div key={index} class="bundle-carousel-item">
                              <img src={src} alt={`Art Print ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                        <div class="bundle-slide-dots">
                          {bundleImages.map((_, index) => (
                            <button
                              key={index}
                              class={`bundle-slide-dot ${bundleCurrentSlide.value === index ? 'active' : ''}`}
                              onClick$={() => { bundleCurrentSlide.value = index; }}
                            >
                              <span class="sr-only">Go to image {index + 1}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Desktop: Carousel */}
                      <div class="hidden md:block h-full bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-xs p-1 border-2 border-pink-500/30">
                        <Carousel.Root
                          class="bundle-carousel-root"
                          gap={0}
                          autoPlayIntervalMs={3500}
                          bind:autoplay={bundleCarouselPlaying}
                        >
                          <div class="bundle-carousel-buttons">
                            <Carousel.Previous class="bundle-carousel-button">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                              </svg>
                            </Carousel.Previous>
                            <Carousel.Next class="bundle-carousel-button">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </Carousel.Next>
                          </div>
                          <Carousel.Scroller class="bundle-carousel-scroller">
                            {bundleImages.map((src, index) => (
                              <Carousel.Slide key={index} class="bundle-carousel-slide">
                                <img src={src} alt={`Art Print ${index + 1}`} />
                              </Carousel.Slide>
                            ))}
                          </Carousel.Scroller>
                        </Carousel.Root>
                      </div>
                    </div>
                    <div class="bg-black/80 rounded-xs p-5 md:p-6 border-2 border-pink-500/30 flex flex-col justify-center">
                      <span class="inline-block bg-pink-600/40 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 w-fit">
                        New
                      </span>
                      <h2 class="text-2xl font-bold text-white md:neon-text mb-3">
                        Art Print Bundle
                      </h2>
                      <p class="text-white/90 mb-4 text-lg">
                        A set of 10 high-resolution prints photographed by Jules.
                      </p>
                      <div class="flex items-center gap-4 mb-6">
                        <span class="text-3xl font-bold text-pink-500">287 KAS</span>
                      </div>
                      <button
                        onClick$={() => { showNotifyModal.value = true; }}
                        class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-xs font-semibold text-white transition-all duration-300 hover:shadow-lg w-full md:w-auto"
                      >
                        Coming Soon
                      </button>
                    </div>
                  </div>

                  {/* Notify Modal */}
                  {showNotifyModal.value && (
                    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick$={(e) => {
                      if (e.target === e.currentTarget) showNotifyModal.value = false;
                    }}>
                      <div class="bg-gray-900 border-2 border-pink-500/30 rounded-lg p-6 max-w-md w-full">
                        <div class="flex justify-between items-center mb-4">
                          <h3 class="text-xl font-bold text-white">Get Notified</h3>
                          <button
                            onClick$={() => { showNotifyModal.value = false; notifyStatus.value = 'idle'; notifyMessage.value = ''; }}
                            class="text-white/60 hover:text-white text-2xl"
                          >
                            &times;
                          </button>
                        </div>
                        <p class="text-white/80 mb-4">Enter email to be notified when Art Print Bundle becomes available.</p>
                        {notifyStatus.value === 'success' ? (
                          <div class="text-green-400 text-center py-4">{notifyMessage.value}</div>
                        ) : (
                          <form preventdefault:submit onSubmit$={async () => {
                            if (!notifyEmail.value) return;
                            notifyStatus.value = 'loading';
                            const result = await subscribeToMailchimp(notifyEmail.value, 'notify');
                            if (result.success) {
                              notifyStatus.value = 'success';
                              notifyMessage.value = result.message;
                              notifyEmail.value = '';
                            } else {
                              notifyStatus.value = 'error';
                              notifyMessage.value = result.message;
                            }
                          }}>
                            <input
                              type="email"
                              placeholder="Enter email"
                              value={notifyEmail.value}
                              onInput$={(e) => { notifyEmail.value = (e.target as HTMLInputElement).value; }}
                              class="w-full px-4 py-3 rounded-xs bg-black/60 border-2 border-pink-500/30 text-white placeholder-white/50 focus:outline-none focus:border-pink-500/60 mb-4"
                              required
                            />
                            {notifyStatus.value === 'error' && (
                              <p class="text-red-400 text-sm mb-4">{notifyMessage.value}</p>
                            )}
                            <button
                              type="submit"
                              disabled={notifyStatus.value === 'loading'}
                              class="w-full bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-xs font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                            >
                              {notifyStatus.value === 'loading' ? 'Subscribing...' : 'Get Notified'}
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                {/* Newsletter Section */}
                <div class="mt-6">
                  <div class="bg-gradient-to-r from-pink-600/40 to-purple-600/40 p-5 md:p-8 border-2 border-pink-500/30 text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
                      Stay Updated
                    </h2>
                    <p class="text-white/90 mb-4 text-base max-w-2xl mx-auto">
                      Stay updated to get notified when merch drops.
                    </p>
                    {newsletterStatus.value === 'success' ? (
                      <div class="text-green-400 text-center py-4 max-w-md mx-auto">{newsletterMessage.value}</div>
                    ) : (
                      <form
                        preventdefault:submit
                        onSubmit$={async () => {
                          if (!newsletterEmail.value) return;
                          newsletterStatus.value = 'loading';
                          const result = await subscribeToMailchimp(newsletterEmail.value, 'newsletter');
                          if (result.success) {
                            newsletterStatus.value = 'success';
                            newsletterMessage.value = result.message;
                            newsletterEmail.value = '';
                          } else {
                            newsletterStatus.value = 'error';
                            newsletterMessage.value = result.message;
                          }
                        }}
                        class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
                      >
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={newsletterEmail.value}
                          onInput$={(e) => { newsletterEmail.value = (e.target as HTMLInputElement).value; }}
                          class="flex-1 px-4 py-3 rounded-xs bg-black/60 border-2 border-pink-500/30 text-white placeholder-white/50 focus:outline-none focus:border-pink-500/60"
                          required
                        />
                        <button
                          type="submit"
                          disabled={newsletterStatus.value === 'loading'}
                          class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-xs font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                        >
                          {newsletterStatus.value === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                      </form>
                    )}
                    {newsletterStatus.value === 'error' && (
                      <p class="text-red-400 text-sm mt-2">{newsletterMessage.value}</p>
                    )}
                  </div>
                </div>
              </Card.Root>
            )}

            {/* FAQ Tab */}
            {activeTab.value === 'faq' && (
              <Card.Root class="p-4 md:p-6 mb-0.5 pt-4 max-w-6xl rounded-xs rounded-t-none border-none md:mx-auto mx-[6px] bg-gray-900/60">
                <div class="flex flex-col md:flex-row md:gap-4">
                  <div class="flex-1 flex flex-col gap-3">
                    {leftColumn.map(renderFaqItem)}
                  </div>
                  <div class="flex-1 flex flex-col gap-3 mt-3 md:mt-0">
                    {rightColumn.map(renderFaqItem)}
                  </div>
                </div>

                {/* Bottom CTA Section */}
                <div class="mt-6">
                  <div class="bg-gradient-to-r from-pink-600/40 to-purple-600/40 p-5 md:p-8 border-2 border-pink-500/30 text-center">
                    <h2 class="text-lg md:text-xl font-bold text-white mb-3">
                      Get in touch for more information
                    </h2>
                    <div class="flex justify-center gap-3">
                      <a
                        href="https://x.com/i/communities/1974567804901917065"
                        class="btn bg-white/10 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-3 px-3 font-semibold shadow-none text-md hover:bg-white/20 transition-all"
                        aria-label="X (Twitter)"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-twitter-x w-6 h-6" viewBox="0 0 16 16">
                          <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
                        </svg>
                      </a>
                      <a
                        href="https://web.telegram.org/k/#-5034383505"
                        class="btn bg-white/10 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-3 px-3 font-semibold shadow-none text-md hover:bg-white/20 transition-all"
                        aria-label="Telegram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="white"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </Card.Root>
            )}

          </div>
        </main>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: SITE.title,
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};

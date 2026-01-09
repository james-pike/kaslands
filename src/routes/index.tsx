import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { FileQuestionIcon, MountainIcon } from "lucide-qwik";
import { Card } from "~/components/ui/Card";
import { SITE } from "~/config.mjs";
import Collections from "~/components/widgets/Collections";
import AboutCarousel from "~/components/widgets/AboutCarousel";
import { useTabContext } from "~/contexts/TabContext";

// Gun Icon component for FAQ
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

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  badge?: string;
}

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
          window.scrollTo({ top: heroHeight - 5, behavior: 'instant' });
        } else {
          window.scrollTo({ top: 360, behavior: 'instant' });
        }
      }, 50);
    } else {
      // On desktop, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Merch products
  const products = useSignal<Product[]>([
    {
      id: 1,
      name: "Kaslands Hoodie",
      price: "0.025 KAS",
      description: "Premium quality hoodie with neon Kaslands logo. Ultra-soft cotton blend.",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Neon T-Shirt",
      price: "0.015 KAS",
      description: "Classic fit t-shirt featuring the iconic Kaslands neon design.",
    },
    {
      id: 3,
      name: "Kaslands Cap",
      price: "0.012 KAS",
      description: "Adjustable snapback cap with embroidered logo. One size fits all.",
    },
  ]);

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
      icon: GunIcon,
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

    if (isMobile.value) {
      openItems.value = faqs.value[0]?.id || null;
    } else {
      const randomFaq = faqs.value[Math.floor(Math.random() * faqs.value.length)];
      openItems.value = randomFaq?.id || null;
    }

    const handler = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches;
      if (isMobile.value) {
        openItems.value = faqs.value[0]?.id || null;
      } else {
        const randomFaq = faqs.value[Math.floor(Math.random() * faqs.value.length)];
        openItems.value = randomFaq?.id || null;
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
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
        <section class="relative mx-auto -mb-2 max-w-7xl w-full md:hidden transform-gpu backface-hidden" style="will-change: transform; contain: layout style paint;">
          {/* Hero Content Container */}
          <div class="p-5 pt-8 pb-2 max-w-6xl rounded-t-none border-none mx-3 bg-gray-900/75">
            <div class="relative py-8 md:py-20 px-0 md:px-8 mx-2 transform-gpu">
              <div class="relative z-10 flex flex-col items-center justify-center text-center">
                {/* Large Kaslands Logo */}
                <h1 class="neon-text text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-12 tracking-wide brightness-[0.85] md:brightness-100 px-4 md:px-0 transform-gpu backface-hidden">
                  Kaslands
                </h1>

                {/* Subtitle */}
                <p class="text-white/80 text-2xl md:text-2xl mt-2 max-w-lg px-0">
                  Join the NFT Ecosystem on the Kaspa BlockDag, revise final text here
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons Container */}
          <div class="px-5 py-0 mb-4 pb-7 max-w-6xl border-none mx-3 bg-gray-900/75">
            <div class="flex flex-row gap-4 w-full max-w-md mx-auto">
              <a
                href="#"
                class="flex-1 bg-pink-600/40 hover:bg-pink-600/60 group relative inline-flex items-center justify-center pl-4 pr-2 py-4 rounded-md shadow-lg hover:shadow-[0_0_20px_rgba(255,105,180,0.5)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-pink-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500"
                role="button"
                aria-label="Mint NFT"
              >
                <span class="relative z-10 flex items-center gap-1 neon-text text-2xl md:text-3xl tracking-[0.01rem] font-medium text-white/70 brightness-[0.85] md:brightness-100">
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
                  activeTab.value = 'collection';
                }}
                class="flex-1 bg-purple-600/40 hover:bg-purple-600/60 group relative inline-flex items-center justify-center px-6 py-4 rounded-md shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500"
                role="button"
                aria-label="Explore collections"
              >
                <span class="relative z-10 neon-text text-2xl md:text-3xl tracking-[0.01rem] font-medium text-white/70 brightness-[0.85] md:brightness-100">
                  EXPLORE
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </section>

        <main class="mt-0 order-3">
          <div class="relative mx-auto max-w-7xl overflow-x-hidden">

            {/* Collection Tab */}
            {activeTab.value === 'collection' && (
              <Collections />
            )}

            {/* About Tab */}
            {activeTab.value === 'about' && (
              <>
                {/* About Carousel */}
                <AboutCarousel />

                {/* Community Section */}
                <div class="max-w-6xl mx-auto mb-6 px-3 md:px-0">
                  <div class="bg-gray-900/75 border-none overflow-hidden">
                    <div class="flex flex-col md:flex-row">
                      <div class="md:w-1/3 bg-gradient-to-br from-pink-500/20 to-purple-500/20 md:p-4 flex items-center justify-center">
                        <img
                          src="/images/k2.jpg"
                          alt="Building Together"
                          class="w-48 h-48 md:w-full md:h-auto object-contain"
                        />
                      </div>
                      <div class="md:w-2/3 px-6 py-6 md:px-10 md:py-8">
                        <p class="text-white/90 mb-4 leading-relaxed text-base md:text-lg">
                          Kaslands is built on the belief that we're in the early stages of Kaspa's growth—similar to
                          Ethereum's early days. This presents an incredible opportunity for collectors, artists, and
                          enthusiasts to be part of something special from the ground up.
                        </p>
                        <p class="text-white/90 leading-relaxed text-base md:text-lg">
                          Join us in building a vibrant community where creativity thrives, collaboration is encouraged,
                          and lasting connections are made. Together, we're shaping the future of NFTs on Kaspa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Section */}
                <div class="max-w-6xl mx-auto mb-6 px-3 md:px-0">
                  <div class="bg-gray-900/80 bg-gradient-to-r from-pink-600/30 to-purple-600/30 p-5 md:p-8 border-2 border-pink-500/30 text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
                      Ready to Join Kaslands?
                    </h2>
                    <p class="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                      Explore our collections, connect with the community, and be part of the legacy we're building on Kaspa.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Merch Tab */}
            {activeTab.value === 'merch' && (
              <>
                <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl rounded-xs rounded-t-none border-none md:mx-auto mx-3 bg-gray-900/75">
                  {/* Featured Product Banner */}
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div class="bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-xs p-2 border-2 border-pink-500/40 overflow-hidden">
                      <img
                        src="/images/k1.jpg"
                        alt="Art Print Bundle"
                        class="w-full h-full object-cover rounded-xs"
                      />
                    </div>
                    <div class="bg-black/80 rounded-xs p-5 md:p-6 border-2 border-pink-500/30 flex flex-col justify-center">
                      <span class="inline-block bg-pink-600/40 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 w-fit">
                        New
                      </span>
                      <h2 class="text-2xl font-bold text-white md:neon-text mb-3">
                        Art Print Bundle
                      </h2>
                      <p class="text-white/90 mb-4 text-lg">
                        High-quality prints of our top NFT collections. Set of 3 prints featuring stunning Kaslands artwork.
                      </p>
                      <div class="flex items-center gap-4 mb-6">
                        <span class="text-3xl font-bold text-pink-500">0.020 KAS</span>
                      </div>
                      <button class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-xs font-semibold text-white transition-all duration-300 hover:shadow-lg w-full md:w-auto">
                        Notify When Available
                      </button>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.value.map((product) => (
                      <div
                        key={product.id}
                        class="bg-black/80 rounded-xs border-2 border-pink-500/20 overflow-hidden hover:border-pink-500/50 transition-all duration-300 group"
                      >
                        {/* Product Image Placeholder */}
                        <div class="bg-gradient-to-br from-pink-500/20 to-purple-500/20 h-48 flex items-center justify-center relative overflow-hidden">
                          <div class="text-7xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                            {product.id === 1 && "👕"}
                            {product.id === 2 && "👔"}
                            {product.id === 3 && "🧢"}
                          </div>
                          {product.badge && (
                            <span class="absolute top-4 right-4 bg-pink-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Product Info */}
                        <div class="p-4">
                          <h3 class="text-lg font-bold text-white mb-2">{product.name}</h3>
                          <p class="text-white/80 mb-3 text-sm">{product.description}</p>
                          <div class="flex items-center justify-between mb-4">
                            <span class="text-2xl font-bold text-pink-500">{product.price}</span>
                          </div>
                          <button class="w-full bg-pink-600/40 hover:bg-pink-600/60 px-6 py-2 rounded-xs font-semibold text-white transition-all duration-300 border-2 border-pink-500/30">
                            Coming Soon
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Root>

                {/* Newsletter Section */}
                <div class="max-w-6xl md:mx-auto mx-3 mb-4">
                  <div class="bg-gray-900/80 bg-gradient-to-r from-pink-600/30 to-purple-600/30 p-5 md:p-8 border-2 border-pink-500/30 text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
                      Stay Updated
                    </h2>
                    <p class="text-white/90 mb-4 text-base max-w-2xl mx-auto">
                      Be the first to know when our merch drops. Join our community and get exclusive early access.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        class="flex-1 px-4 py-3 rounded-xs bg-black/60 border-2 border-pink-500/30 text-white placeholder-white/50 focus:outline-none focus:border-pink-500/60"
                      />
                      <button class="bg-pink-600/60 hover:bg-pink-600/80 px-8 py-3 rounded-xs font-semibold text-white transition-all duration-300 hover:shadow-lg">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* FAQ Tab */}
            {activeTab.value === 'faq' && (
              <>
                <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl rounded-xl rounded-t-none border-none md:mx-auto mx-3 bg-gray-900/75">
                  <div class="flex flex-col md:flex-row md:gap-4">
                    <div class="flex-1 flex flex-col gap-3">
                      {leftColumn.map(renderFaqItem)}
                    </div>
                    <div class="flex-1 flex flex-col gap-3 mt-3 md:mt-0">
                      {rightColumn.map(renderFaqItem)}
                    </div>
                  </div>
                </Card.Root>

                {/* Bottom CTA Section */}
                <div class="max-w-6xl md:mx-auto mx-3 mb-4">
                  <div class="bg-gray-900/80 bg-gradient-to-r from-pink-600/30 to-purple-600/30 p-5 md:p-8 border-2 border-pink-500/30 text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
                      Join the Kaslands Community
                    </h2>
                    <p class="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
                      Connect with fellow collectors and stay updated on new drops, events, and exclusive content.
                    </p>
                  </div>
                </div>
              </>
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

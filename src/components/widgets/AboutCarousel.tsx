import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const currentSlide = useSignal(0);
  const touchStartX = useSignal(0);
  const touchEndX = useSignal(0);

  useStyles$(`
    .about-slide-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      touch-action: pan-y;
      user-select: none;
    }
    .about-carousel-track {
      display: flex;
      width: 300%;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .about-carousel-slide {
      width: 33.333%;
      flex-shrink: 0;
    }
    .about-slide-content {
      min-height: 280px;
    }
    .about-carousel-dots {
      display: flex;
      gap: 6px;
    }
    .about-carousel-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(236, 72, 153, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .about-carousel-dot.active {
      background: rgba(236, 72, 153, 0.8);
      transform: scale(1.3);
    }
  `);

  // Auto-advance slides
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % 3;
    }, 6000);
    cleanup(() => clearInterval(interval));
  });

  const slides = [
    {
      id: 1,
      title: 'Vision',
      image: '/images/vision.jpg',
      content: (
        <>
          <p class="text-white/90 mb-4 leading-relaxed text-base">
            Kaslands is more than just an NFT collection—it's a creative vision brought to life on the Kaspa blockchain.
            Founded by Jules, an artist and entrepreneur passionate about 80s culture, family, and adventure, Kaslands
            represents the fusion of retro aesthetics with cutting-edge web3 technology.
          </p>
          <p class="text-white/90 leading-relaxed text-base">
            Our mission is to create a lasting legacy in the Kaspa ecosystem, bringing excitement, art, and
            community together in unique and innovative ways.
          </p>
        </>
      ),
      gradient: 'from-pink-500/20 to-purple-500/20',
    },
    {
      id: 2,
      title: 'Art',
      image: '/images/art.jpg',
      content: (
        <>
          <p class="text-white/90 mb-4 leading-relaxed text-base">
            Each Kaslands collection is carefully curated and created by hiring talented artists and skilled
            professionals who bring unique visions to life. From photography-based pieces to hand-drawn sketches,
            every piece tells a story.
          </p>
          <p class="text-white/90 leading-relaxed text-base">
            We believe in fair launches and community-first approach, ensuring that everyone has an equal
            opportunity to be part of the Kaslands journey.
          </p>
          <p class="text-white/90 leading-relaxed text-base">&nbsp;</p>
        </>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 3,
      title: 'Community',
      image: '/images/k2.jpg',
      content: (
        <>
          <p class="text-white/90 mb-4 leading-relaxed text-base">
            Kaslands is built on the belief that we're in the early stages of Kaspa's growth—similar to
            Ethereum's early days. This presents an incredible opportunity for collectors, artists, and
            enthusiasts to be part of something special from the ground up.
          </p>
          <p class="text-white/90 leading-relaxed text-base">
            Join us in building a vibrant community where creativity thrives, collaboration is encouraged,
            and lasting connections are made. Together, we're shaping the future of NFTs on Kaspa.
          </p>
        </>
      ),
      gradient: 'from-pink-500/20 to-purple-500/20',
    },
  ];

  return (
    <div class="max-w-6xl mx-auto mb-0.5 px-[5px] md:px-0">
      {/* Mobile: Sliding Carousel */}
      <div class="md:hidden">
        <div
          class="about-slide-container"
          onTouchStart$={(e) => {
            touchStartX.value = e.touches[0].clientX;
            touchEndX.value = e.touches[0].clientX;
          }}
          onTouchMove$={(e) => {
            touchEndX.value = e.touches[0].clientX;
          }}
          onTouchEnd$={() => {
            const swipeThreshold = 50;
            const diff = touchStartX.value - touchEndX.value;

            if (Math.abs(diff) > swipeThreshold) {
              if (diff > 0) {
                currentSlide.value = (currentSlide.value + 1) % slides.length;
              } else {
                currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
              }
            }

            touchStartX.value = 0;
            touchEndX.value = 0;
          }}
        >
          <div
            class="about-carousel-track"
            style={{ transform: `translateX(-${currentSlide.value * 33.333}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} class="about-carousel-slide">
                <div class="overflow-hidden border border-pink-500/20 relative">
                  {/* Image Section */}
                  <div class="bg-gray-900/80 flex items-center justify-center py-0.5">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      class="w-44 h-44 object-contain"
                    />
                  </div>

                  {/* Content Section */}
                  <div class="px-5 py-5 bg-gray-900/70 relative about-slide-content">
                    <div class="flex justify-between items-start">
                      <h3 class="text-xl font-bold text-white mb-3 neon-text">{slide.title}</h3>
                      {/* Pagination Dots - Inline with title */}
                      <div class="flex gap-1.5">
                        {slides.map((s, i) => (
                          <button
                            key={s.id}
                            class={`about-carousel-dot ${currentSlide.value === i ? 'active' : ''}`}
                            onClick$={() => { currentSlide.value = i; }}
                          >
                            <span class="sr-only">Go to slide {i + 1}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {slide.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Stacked Sections */}
      <div class="hidden md:block space-y-1">
        {slides.map((slide, index) => (
          <div key={slide.id} class="bg-gray-900/60 border-none overflow-hidden">
            <div class={`flex flex-row ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              {/* Image Section */}
              <div class={`w-1/3 bg-gradient-to-br ${slide.gradient} p-4 flex items-center justify-center`}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  class="w-full h-auto object-contain"
                />
              </div>

              {/* Content Section */}
              <div class="w-2/3 px-10 py-8">
                {slide.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

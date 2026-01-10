import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

export default component$(() => {
  const isPlaying = useSignal(false);
  const currentSlide = useSignal(0);

  useStyles$(`
    .about-carousel-root {
      width: 100%;
      position: relative;
    }
    .about-carousel-scroller {
      display: flex;
      gap: 0;
    }
    .about-carousel-slide {
      flex: 0 0 100%;
      width: 100%;
    }
    .about-carousel-pagination {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 16px 0;
    }
    .about-carousel-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(236, 72, 153, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .about-carousel-dot:hover {
      background: rgba(236, 72, 153, 0.5);
    }
    .about-carousel-dot[data-active="true"] {
      background: rgba(236, 72, 153, 0.8);
      transform: scale(1.2);
    }
    .about-carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 32px;
      height: 32px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.3s ease;
      border: 1px solid rgba(236, 72, 153, 0.5);
    }
    .about-carousel-nav:hover {
      background: rgba(236, 72, 153, 0.7);
    }
    .about-carousel-prev {
      left: 8px;
    }
    .about-carousel-next {
      right: 8px;
    }
  `);

  useVisibleTask$(() => {
    isPlaying.value = false;
  });

  const slides = [
    {
      id: 1,
      title: 'The Vision',
      image: '/images/vision.jpg',
      content: (
        <>
          <p class="text-white/90 mb-4 leading-relaxed text-base md:text-lg">
            Kaslands is more than just an NFT collection—it's a creative vision brought to life on the Kaspa blockchain.
            Founded by Jules, an artist and entrepreneur passionate about 80s culture, family, and adventure, Kaslands
            represents the fusion of retro aesthetics with cutting-edge web3 technology.
          </p>
          <p class="text-white/90 leading-relaxed text-base md:text-lg">
            Our mission is to create a lasting legacy in the Kaspa ecosystem, bringing excitement, art, and
            community together in unique and innovative ways.
          </p>
        </>
      ),
      gradient: 'from-pink-500/20 to-purple-500/20',
    },
    {
      id: 2,
      title: 'The Art',
      image: '/images/art.jpg',
      content: (
        <>
          <p class="text-white/90 mb-4 leading-relaxed text-base md:text-lg">
            Each Kaslands collection is carefully curated and created by hiring talented artists and skilled
            professionals who bring unique visions to life. From photography-based pieces to hand-drawn sketches,
            every piece tells a story.
          </p>
          <p class="text-white/90 leading-relaxed text-base md:text-lg">
            We believe in fair launches and community-first approach, ensuring that everyone has an equal
            opportunity to be part of the Kaslands journey.
          </p>
        </>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
      reverse: true,
    },
    {
      id: 3,
      title: 'The Community',
      image: '/images/k2.jpg',
      content: (
        <>
          <p class="text-white/90 mb-4 leading-relaxed text-base md:text-lg">
            Kaslands is built on the belief that we're in the early stages of Kaspa's growth—similar to
            Ethereum's early days. This presents an incredible opportunity for collectors, artists, and
            enthusiasts to be part of something special from the ground up.
          </p>
          <p class="text-white/90 leading-relaxed text-base md:text-lg">
            Join us in building a vibrant community where creativity thrives, collaboration is encouraged,
            and lasting connections are made. Together, we're shaping the future of NFTs on Kaspa.
          </p>
        </>
      ),
      gradient: 'from-pink-500/20 to-purple-500/20',
    },
  ];

  return (
    <div class="max-w-6xl mx-auto mb-1 px-4 md:px-0">
      {/* Mobile: Swipeable Carousel */}
      <div class="md:hidden">
        <Carousel.Root
          class="about-carousel-root"
          gap={0}
          bind:autoplay={isPlaying}
          bind:selectedIndex={currentSlide}
        >
          {/* Navigation Arrows */}
          <Carousel.Previous class="about-carousel-nav about-carousel-prev">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Carousel.Previous>
          <Carousel.Next class="about-carousel-nav about-carousel-next">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </Carousel.Next>

          <Carousel.Scroller class="about-carousel-scroller">
            {slides.map((slide) => (
              <Carousel.Slide key={slide.id} class="about-carousel-slide">
                <div class="bg-gray-900/60 border-none overflow-hidden">
                  <div class="flex flex-col">
                    {/* Image Section */}
                    <div class={`bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        class="w-48 h-48 object-contain"
                      />
                    </div>

                    {/* Content Section */}
                    <div class="px-6 py-6">
                      <h3 class="text-xl font-bold text-white mb-4 neon-text">{slide.title}</h3>
                      {slide.content}
                    </div>
                  </div>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel.Scroller>

          {/* Pagination Dots */}
          <div class="about-carousel-pagination">
            {slides.map((slide, index) => (
              <Carousel.Bullet
                key={slide.id}
                class="about-carousel-dot"
                data-active={currentSlide.value === index}
              >
                <span class="sr-only">Go to slide {index + 1}</span>
              </Carousel.Bullet>
            ))}
          </div>
        </Carousel.Root>
      </div>

      {/* Desktop: Stacked Sections */}
      <div class="hidden md:block space-y-1">
        {slides.map((slide) => (
          <div key={slide.id} class="bg-gray-900/60 border-none overflow-hidden">
            <div class={`flex flex-row ${slide.reverse ? 'flex-row-reverse' : ''}`}>
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

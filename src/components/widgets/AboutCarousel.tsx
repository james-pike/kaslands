import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const slides = [
    {
      id: 1,
      title: 'The Vision',
      image: '/images/vision.jpg',
      imageText: undefined,
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
      imageText: undefined,
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
  ];

  return (
    <div class="max-w-6xl mx-auto mb-1.5 px-2 md:px-0">
      {/* Stacked Sections - All Devices */}
      <div class="space-y-1.5">
        {slides.map((slide) => (
          <div key={slide.id} class="bg-gray-900/70 border-none overflow-hidden">
            <div class={`flex flex-col ${slide.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              {/* Image Section */}
              <div class={`md:w-1/3 bg-gradient-to-br ${slide.gradient} md:p-4 flex items-center justify-center`}>
                {slide.image.startsWith('/') ? (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    class="w-48 h-48 md:w-full md:h-auto object-contain"
                  />
                ) : (
                  <div class="text-center p-6">
                    <div class="text-6xl mb-2">{slide.image}</div>
                    {slide.imageText && <p class="text-white/80 text-lg">{slide.imageText}</p>}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div class="md:w-2/3 px-6 py-6 md:px-10 md:py-8">
                {slide.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

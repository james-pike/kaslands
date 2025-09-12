import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Carousel } from '@qwik-ui/headless';

const slides = [
  { src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-3.png', alt: 'Locksmith Service 1' },
  { src: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png', alt: 'Security Installation' },
  // Fallback or additional slide
];

export default component$(() => {
  useStyles$(`
    .carousel-root {
      height: 100%;
      width: 100%;
      position: relative;
    }
    .carousel-slide {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .carousel-slide img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .carousel-buttons {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
    }
    .carousel-button {
      pointer-events: auto;
      width: 50px; /* Increased from 40px */
      height: 50px; /* Increased from 40px */
      background: rgba(128, 128, 128, 0.7); /* Gray with transparency */
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.3s ease;
    }
    .carousel-button:hover {
      background: rgba(128, 128, 128, 1); /* Solid gray on hover */
    }
    .carousel-button i {
      font-size: 24px; /* Larger arrows */
    }
    .carousel-prev {
      margin-left: 10px;
    }
    .carousel-next {
      margin-right: 10px;
    }
    .carousel-conditional {
      height: 100%;
      width: 100%;
    }
  `);

  const isPlaying = useSignal<boolean>(false);

  useVisibleTask$(() => {
    isPlaying.value = true;
  });

  return (
    <Carousel.Root class="carousel-root" gap={30} autoPlayIntervalMs={4500} bind:autoplay={isPlaying}>
      {/* <div class="carousel-buttons">
        <Carousel.Previous class="carousel-button carousel-prev">
          <i class="fas fa-arrow-left" />/
        </Carousel.Previous>
        <Carousel.Next class="carousel-button carousel-next">
          <i class="fas fa-arrow-right" />
        </Carousel.Next>
      </div> */}
      <div class="carousel-conditional">
        {slides.map((slide, index) => (
          <Carousel.Slide key={index} class="carousel-slide">
            <img src={slide.src} alt={slide.alt} />
          </Carousel.Slide>
        ))}
      </div>
    </Carousel.Root>
  );
});
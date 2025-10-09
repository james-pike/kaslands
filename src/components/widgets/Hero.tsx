import { component$, useStylesScoped$ } from "@builder.io/qwik";

export default component$(() => {
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
  `);

  return (
    <section class="hidden md:block relative overflow-hidden py-0 -mt-4 md:py-8">
      <div class="absolute inset-0 opacity-20" aria-hidden="true"></div>

      <div class="grid grid-cols-1 md:grid-cols-1 items-center bg-transparent">
        <div class="relative z-10 order-1 md:col-span-2 md:-ml-16 flex items-center justify-center px-3 md:px-0 pt-4 pb-0 md:order-1">
          <div class="text-center md:text-left p-4 rounded-xl">
            <h1 class="neon-text text-5xl text-center md:text-8xl md:-mt-0">
              Kaslands
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
});
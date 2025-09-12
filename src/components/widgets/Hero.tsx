import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export default component$(() => {
  return (
    <section class="relative overflow-hidden">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 opacity-20" aria-hidden="true"></div>

      {/* Floating decorative elements */}
   
   
      

      <div class="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Mobile Logo */}
        <img
          src="/images/logo22.svg"
          alt="earthen vessels Logo"
          class="px-16 -mt-2 h-48 mx-auto md:hidden"
        />

        {/* Left Column (Desktop) / Text Content (Mobile) */}
        <div class="relative z-10 order-1 flex items-center justify-center px-4 pt-4 pb-10 md:px-8 md:py-12 md:order-1">
          <div class="text-center md:text-left px-2">
            {/* Headline (Desktop only) */}
            <h1 class=" md:block text-5.5xl md:text-7xl font-bold tracking-tight md:mb-4 mb-8 md:-mt-0 -mt-10 ">
              <span class="bg-gradient-to-r xdxd from-secondary-800 via-tertiary-500 to-secondary-800  bg-clip-text text-transparent">
                earthen vessels
              </span>
            </h1>
            {/* Slogan */}
            <h2 class="!text-2.5xl  md:!text-3xl xdxd font-bold -mx-4 md:mx-0 text-secondary-800 md:text-primary-600 mb-4 md:mb-8 mt-9 ">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Listening, Connecting & Creating
              </span>
            </h2>
            {/* Subtitle */}
            <p class="text-xl -mx-2 md:text-2xl font-light text-primary-800 mb-6 max-w-2xl md:mx-0">
              Here, we gather around clay, to listen deeply to one another, to ourselves, and to the earth as we shape earthen vessels.
            </p>
          </div>
        </div>

        {/* Mobile Image (Below Buttons) */}
        <div class="md:hidden px-6 pb-10 -mt-6 order-2">
          <Image
            src="/images/hero.webp"
            alt="earthen vessels Pottery"
            class="w-full max-h-64 object-contain rounded-lg shadow-xl border-half border-primary-300"
          />
        </div>

        {/* Desktop Right Column: Image */}
        <div class="hidden md:block relative order-3 md:order-2 py-12 pr-8">
          <img
            src="/images/hero.webp"
            alt="earthen vessels Pottery"
            class="w-full max-h-96 object-contain rounded-2xl shadow-xl border-2 border-primary-300"
          />
        </div>
      </div>
    </section>
  );
});












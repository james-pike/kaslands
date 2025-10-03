import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="relative overflow-hidden">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 opacity-20" aria-hidden="true"></div>

      {/* Floating decorative elements */}
   
             {/* <div class="absolute top-0 left-80 w-[600px] h-[600px]  bg-primary-200 rounded-full blur-xl animate-float" aria-hidden="true"></div> */}

      

      <div class="grid grid-cols-1 md:grid-cols-2 items-center bg-primary-300">
        {/* Mobile Logo */}
        <img
          src="/images/logo.jpg"
          alt="earthen vessels Logo"
          class=" h-auto border-x border-8 border-primary-300 border-t-0  w-full md:hidden"
        />

        {/* Left Column (Desktop) / Text Content (Mobile) */}
        <div class="relative z-10 order-1 flex items-center justify-center px-4 pt-4 pb-10 md:px-8 md:py-12 md:order-1">
          <div class="text-center md:text-left px-6">
            {/* Headline (Desktop only) */}
            <h1 class=" md:block text-4xl md:text-6xl font-bold tracking-tight md:mb-4 mb-8 md:-mt-0  ">
              <span class="bg-gradient-to-r  from-[#f29b10]  to-[#f29b10]  bg-clip-text text-transparent">
                BTC MAXI TEARS 
              </span>
            </h1>
            {/* Slogan */}
            {/* <h2 class="!text-2.5xl  md:!text-3xl xdxd font-bold -mx-4 md:mx-0 text-secondary-800 md:text-primary-600 mb-4 md:mb-8 mt-9 ">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Listening, Connecting & Creating
              </span>
            </h2> */}
            {/* Subtitle */}
            <p class="text-xl -mx-2 md:text-2xl font-light text-primary-800 mb-6 max-w-2xl md:mx-0">
No Team, No Utility. Straight meme! Laugh and Buy everytime we convert or get blocked by a BTC Maxi.            </p>
 <a
                href="#"
                class="w-full sm:w-auto my-1.5 mx-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Get $BMT
                  <svg class="w-5 h-5 -ml-0.5 transform group-hover:translate-x-0.75 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>

               <a
                href="#"
                class="w-full sm:w-auto bg-gradient-to-r my-1.5 mx-1 from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Join Telegram
                  <svg class="w-5 h-5 -ml-0.5 transform group-hover:translate-x-0.75 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>

                    <a
                href="#"
                class="w-full sm:w-auto bg-gradient-to-r my-1.5 mx-1 from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Follow Twitter
                  <svg class="w-5 h-5 -ml-0.5 transform group-hover:translate-x-0.75 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>
          </div>
          
        </div>

        

        {/* Mobile Image (Below Buttons) */}
        {/* <div class="md:hidden px-6 pb-10 -mt-6 order-2">
          <Image
            src="/images/hero.webp"
            alt="earthen vessels Pottery"
            class="w-full max-h-64 object-contain rounded-lg shadow-xl border-half border-primary-300"
          />
        </div> */}

        {/* Desktop Right Column: Image */}
        <div class="hidden md:block relative order-3 md:order-2 py-12 pr-8">
          <img
            src="/images/logo.jpg"
            alt="earthen vessels Pottery"
            class="w-full h-[600px] object-contain rounded-2xl shadow-xl border-2 border-primary-300"
          />
        </div>
      </div>
    </section>
  );
});












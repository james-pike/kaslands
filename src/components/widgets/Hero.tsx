import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="relative overflow-hidden py-0 -mt-3 md:py-32">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 opacity-20" aria-hidden="true"></div>

      {/* Floating decorative elements */}
   
             {/* <div class="absolute top-0 left-80 w-[600px] h-[600px]  bg-primary-200 rounded-full blur-xl animate-float" aria-hidden="true"></div> */}

      

      <div class="grid grid-cols-1 md:grid-cols-1 items-center bg-transparent">
        {/* Mobile Logo */}
        {/* <img
          src="/images/logo.jpg"
          class=" h-auto border-x border-8 border-primary-300 border-t-0  w-full md:hidden"
        /> */}

        {/* Left Column (Desktop) / Text Content (Mobile) - Takes up 2 columns on desktop */}
        <div class="relative z-10 order-1 md:col-span-2 md:-ml-16 flex items-center justify-center px-4 md:px-0 pt-4 pb-10   md:order-1">
          <div class="text-center md:text-left  bg-white/65 p-8 pt-12">
            {/* Headline (Desktop only) */}
            <h1 class="  text-5xl text-center md:text-8xl font-bold tracking-tight md:mb-4 mb-8 md:-mt-0  ">
              <span class="bg-teal-400  bg-clip-text text-transparent">
                KASLANDS
              </span>
            </h1>
            {/* Slogan */}
            {/* <h2 class="!text-2.5xl  md:!text-3xl xdxd font-bold -mx-4 md:mx-0 text-secondary-800 md:text-primary-600 mb-4 md:mb-8 mt-9 ">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Listening, Connecting & Creating
              </span>
            </h2> */}
            {/* Subtitle */}
            <p class="text-2xl -mx-2 md:text-2xl font-light text-primary-800 mb-6 max-w-2xl md:mx-0">

Uniting Kaspa projects & members to create the ultimate virtual community. All things Kaspa web3 related, Tokens, NFTs, Metaverse, Websites, & Games.      </p>
 <a
                href="#"
                class="w-full sm:w-auto my-1.5 mx-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Mint $LANDS
                    <img
        src="/images/sticker.webp"
        alt="Jar Icon"
        class="w-8 h-8 -ml-1 transform transition-transform duration-300 group-hover:-rotate-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
                </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>

               <a
                href="#"
                class="w-full sm:w-auto bg-gradient-to-r my-1.5 mx-1 from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1" >
                  Join Telegram
<svg width="30px" height="30px" viewBox="0 0 24 24" fill="#56a4c8" class="" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#ffffff"></path>
  </g>
</svg>   </span>
                <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
              </a>

                    <a
                href="#"
                class="w-full sm:w-auto bg-gradient-to-r my-1.5 mx-1 from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
                role="button"
                aria-label="Book a workshop"
              >
                <span class="relative z-10 flex items-center gap-1">
                  Follow 
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-twitter-x" viewBox="0 0 16 16" id="Twitter-X--Streamline-Bootstrap" height="24" width="24">
  <desc>
  </desc>
  <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
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

        {/* Desktop Right Column: Image - Takes up 1 column on desktop */}
        {/* <div class="hidden md:block relative order-3 md:order-2 md:col-span-1 pr-8 py-8 -ml-20 ">
          <img
            src="/images/logo.jpg"
            class="w-full h-[600px] object-contain rounded-2xl shadow-xl border-2 border-primary-300"
          />
        </div> */}
      </div>
    </section>
  );
});
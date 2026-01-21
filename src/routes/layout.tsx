import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { inject } from "@vercel/analytics";
import Header from "~/components/widgets/Header";
import Hero from "~/components/widgets/Hero";

export default component$(() => {
  useVisibleTask$(() => {
    inject(); // Runs only on client side
  });

  return (
    <div class="flex flex-col pt-1 pb-1 md:pt-0 md:pb-0">

      <Hero/>
      {/* Header: order-1 on mobile, order-2 on desktop - STICKY */}
      <div class="order-1 md:order-1 sticky top-0 z-20 mt-1 md:mt-0">
        <Header />
      </div>

      {/* Hero: order-2 on mobile, order-1 on desktop */}


      {/* Main content: always comes after header/hero with order-3 */}
      <main class="mt-0 order-3">
        <div class="relative  mx-auto max-w-7xl  overflow-x-hidden">
          <Slot />
        </div>
              {/* <Footer /> */}

      </main>
    </div>
  );
});
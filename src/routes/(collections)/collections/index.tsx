import { component$, Slot } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { SITE } from "~/config.mjs";
import Process from "~/components/Process";




export default component$(() => {
  return (
    <>
    <div class="flex flex-col">
      {/* Header: order-1 on mobile, order-2 on desktop - STICKY */}
      
      
      {/* Hero: order-2 on mobile, order-1 on desktop */}
      {/* <div class="order-2 md:order-2">
        <Hero />
      </div> */}


      {/* Main content: always comes after header/hero with order-3 */}
      <main class="mt-0 order-3">
        <div class="relative  mx-auto max-w-7xl  overflow-x-hidden">
          <Slot />
                <Process/>

        </div>
      </main>
      {/* <Footer /> */}
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
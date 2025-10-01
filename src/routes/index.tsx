import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import Hero from "~/components/widgets/Hero";

import LandingCards from "~/components/LandingCards";


export default component$(() => {
  return (
    <>
<div class="md:pt-5 pt-2">
  <div class="hidden md:block absolute top-8 left-[43%] -translate-x-[43%] w-[300px] h-[300px] border-[8px] border-primary-300/30 rounded-full blur-sm animate-float" aria-hidden="true"></div> 
 
   <div class="hidden md:block absolute top-10 left-[85%] -translate-x-[85%] w-[200px] h-[200px] border-[8px] border-tertiary-600/20 rounded-full blur-sm animate-floatx" aria-hidden="true"></div> 

  <div class="hidden md:block absolute top-60 left-[93%]  -translate-x-[93%] w-[100px] h-[100px] border-[8px] border-primary-300/50 rounded-full blur-sm animate-float" aria-hidden="true"></div> 
<div
  class="hidden  md:block absolute top-[15%] left-[60%] -translate-x-[60%] w-[300px] h-[300px] border-[8px] border-tertiary-600/15 rounded-full blur-sm animate-float"
  aria-hidden="true"
></div>
  <Hero />
  <LandingCards/>
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
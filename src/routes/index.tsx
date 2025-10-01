import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import Hero from "~/components/widgets/Hero";

import LandingCards from "~/components/LandingCards";


export default component$(() => {
  return (
    <>
<div class="md:pt-5 pt-2">
       <div class=" hidden md:block absolute top-10 left-[560px] w-[700px] h-[500px]  bg-primary-200/70 rounded-full blur-xl animate-float" aria-hidden="true"></div> 

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
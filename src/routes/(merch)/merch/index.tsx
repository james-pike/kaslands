import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Card } from "~/components/ui/Card";


import { SITE } from "~/config.mjs";

export default component$(() => {
  return (
    <>
    
     <Card.Root class="p-5 md:p-8 mb-4 pt-8 max-w-6xl text-white/80 rounded-xl rounded-t-none border-none md:mx-auto mx-3 bg-gray-900/50">
 
    <h1>2026</h1>
</Card.Root>
    
     
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
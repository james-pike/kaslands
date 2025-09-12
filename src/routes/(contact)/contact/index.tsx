import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Contact2 from "~/components/widgets/Contact2";


import { SITE } from "~/config.mjs";

export default component$(() => {
  return (
    <>
 <Contact2  
    
        
    
      
      />
    </>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - Contact`,
  meta: [
    {
      name: "description",
      content:
        " Contact Us",
    },
  ],
};
import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { inject } from "@vercel/analytics";
import Header from "~/components/widgets/Header";
import Hero from "~/components/widgets/Hero";

import { tursoClient } from "~/lib/turso";

interface Banner {
  length: number; id: number; title: string; subtitle: string; message: string; 
}

export const useBannerLoader = routeLoader$(async (event) => { 
  try { 
    const client = tursoClient(event); 
    const result = await client.execute("SELECT * FROM banners LIMIT 1"); 
    if (result.rows.length === 0) { 
      return null; 
    } 
    const row = result.rows[0]; 
    return { 
      id: Number(row.id) || 0, 
      title: String(row.title) || '', 
      subtitle: String(row.subtitle) || '', 
      message: String(row.message) || '', 
    } as Banner; 
  } catch (error) { 
    console.error("Error loading banner:", error); 
    return null; 
  } 
});

export default component$(() => {
  useVisibleTask$(() => {
    inject(); // Runs only on client side
  });
  
  return (
    <div class="flex flex-col">
      {/* Header: order-1 on mobile, order-2 on desktop - STICKY */}
      <div class="order-1 md:order-1 sticky top-0 z-20">
        <Header />
      </div>
      
      {/* Hero: order-2 on mobile, order-1 on desktop */}
      <div class="order-2 md:order-2">
        <Hero />
      </div>

      {/* Main content: always comes after header/hero with order-3 */}
      <main class="mt-0 order-3">
        <div class="relative md:border-x mx-auto max-w-7xl bg-white/70 overflow-x-hidden">
          <Slot />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
});
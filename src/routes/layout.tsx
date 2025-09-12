import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { inject } from "@vercel/analytics";


import Footer from "~/components/widgets/Footer";
import { tursoClient } from "~/lib/turso";
//

interface Banner { id: number; title: string; subtitle: string; message: string; }

export const useBannerLoader = routeLoader$(async (event) => { try { const client = tursoClient(event); const result = await client.execute("SELECT * FROM banners LIMIT 1"); if (result.rows.length === 0) { return null; } const row = result.rows[0]; return { id: Number(row.id) || 0, title: String(row.title) || '', subtitle: String(row.subtitle) || '', message: String(row.message) || '', } as Banner; } catch (error) { console.error("Error loading banner:", error); return null; } });

export default component$(() => {
   useVisibleTask$(() => {
    inject(); // Runs only on client sides
  });
  return (
    <>
      <main class="mt-20">
        <Slot />
      </main>
      <Footer />
      
    </>
  );
});

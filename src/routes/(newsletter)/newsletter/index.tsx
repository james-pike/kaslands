// src/routes/newsletter/index.tsx
import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SITE } from "~/config.mjs";
import type { Post } from "~/components/types";
import { newsletters } from "~/data/newsletters";

export default component$(() => {
  return (
    <section class="px-6 sm:px-6 py-12 sm:py-16 lg:py-20 mx-auto max-w-3xl bg-white/30">
      <header>
        <h1 class="text-center xdxd !text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-10 md:mb-16 font-heading">
           <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
              Newsletter
            </span>
        </h1>
      </header>
      <ul>
        {newsletters.map((post: Post) => (
          <li key={post.slug} class="mb-10 md:mb-16">
            <article
              class={`max-w-md mx-auto md:max-w-none grid gap-6 md:gap-8 ${post.image ? "md:grid-cols-2" : ""}`}
            >
              {post.image && (
                <a class="relative block group" href={`/newsletter/${post.slug}`}>
                  <div class="relative h-0 pb-[56.25%] md:pb-[75%] md:h-80 lg:pb-[56.25%] overflow-hidden bg-gray-400 dark:bg-slate-700 rounded shadow-lg">
                    <img
                      src={post.image}
                      class="absolute inset-0 object-cover w-full h-full mb-6 rounded shadow-lg bg-gray-400 dark:bg-slate-700"
                      sizes="(max-width: 900px) 400px, 900px"
                      alt={post.title}
                      width={900}
                      height={400}
                    />
                  </div>
                </a>
              )}
              <div>
                <header>
                  <h2 class="text-xl sm:text-2xl font-bold leading-snug mb-2 font-heading">
                    <a
                      class="hover:text-primary-600 underline underline-offset-4 decoration-1 decoration-dotted transition ease-in duration-200"
                      href={`/newsletter/${post.slug}`}
                    >
                      {post.title}
                    </a>
                  </h2>
                </header>
                <p class="text-md sm:text-lg flex-grow">{post.excerpt}</p>
                <footer class="mt-4">
                  <div>
                    <span class="text-gray-500 dark:text-slate-400">
                      <time dateTime={String(post.publishDate.getTime())}>
                        {post.publishDate.toLocaleDateString("en-us", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </time>
                    </span>
                  </div>
                  <div class="mt-4">{/* <PostTags tags={post.tags} /> */}</div>
                </footer>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Newsletter — Qwind",
  meta: [
    {
      name: "description",
      content: SITE.description,
    },
  ],
};
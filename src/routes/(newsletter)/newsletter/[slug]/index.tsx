// src/routes/newsletter/[slug]/index.tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead, StaticGenerateHandler } from "@builder.io/qwik-city";
import md from "markdown-it";
import type { Post } from "~/components/types";
import { newsletters } from "~/data/newsletters";
import { SITE } from "~/config.mjs";

export const useGetPostBySlug = routeLoader$<Post | null>(({ params, status }) => {
  const post = newsletters.find((p) => p.slug === params.slug);
  if (!post) {
    status(404);
    return null;
  }
  return post;
});

export default component$(() => {
  const signal = useGetPostBySlug();
  const post = signal.value;

  if (!post) {
    return <div>Newsletter not found</div>;
  }

  return (
    <section class="mx-auto py-8 sm:py-16 lg:py-20">
      <article>
        <header class={post.image ? "text-center" : ""}>
          <p class="mx-auto max-w-3xl px-4 sm:px-6">
            <time dateTime={String(post.publishDate.getTime())}>
              {post.publishDate.toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
          <h1 class="leading-tighter font-heading mx-auto mb-8 max-w-3xl px-4 text-4xl font-bold tracking-tighter sm:px-6 md:text-5xl">
            {post.title}
          </h1>
          {post.image ? (
            <img
              src={post.image}
              class="mx-auto mt-4 mb-6 max-h-56 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-6xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={post.excerpt}
              loading="eager"
              width={900}
              height={480}
            />
          ) : (
            <div class="mx-auto max-w-3xl px-4 sm:px-6">
              <div class="border-t dark:border-slate-700" />
            </div>
          )}
        </header>
        <div
          class="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
          dangerouslySetInnerHTML={md({ html: true }).render(post.content)}
        />
      </article>
    </section>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: newsletters.map(({ slug }) => ({ slug })),
  };
};

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(useGetPostBySlug);
  return {
    title: post ? `${post.title} — Qwind` : "Newsletter — Qwind",
    meta: [
      {
        name: "description",
        content: post ? post.excerpt : SITE.description,
      },
    ],
  };
};
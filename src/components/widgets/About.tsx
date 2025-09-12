import { component$, useTask$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import {
  LuHeart,
  LuFlower,
  LuLeaf,
  LuPalette,
  LuUsers,
  LuActivity,
} from "@qwikest/icons/lucide";
import { useLocation } from "@builder.io/qwik-city";
import Contact2 from "./Contact2";

export default component$(() => {
  const loc = useLocation();

  useTask$(({ track }) => {
    track(() => loc.url.pathname + loc.url.hash);
    const hash = loc.url.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "instant" }); // Changed to instant, removed setTimeout
      }
    }
  });

  const benefits = [
    {
      icon: LuHeart,
      title: "Reduce Stress and Anxiety",
      description:
        "Engaging with clay requires focus and mindfulness, naturally shifting attention from stressors to a place of relaxation.",
    },
    {
      icon: LuFlower,
      title: "Promote Mindfulness and Presence",
      description:
        "The slow, deliberate nature of clay encourages presence and self-awareness, creating lasting moments of awe.",
    },
    {
      icon: LuLeaf,
      title: "Foster Patience, Resilience, and Humility",
      description:
        "Moving beyond perfection, clay teaches patience and resilience, embracing the joy of wholeness.",
    },
    {
      icon: LuPalette,
      title: "Promote Self-Expression",
      description:
        "Clay offers a medium to express emotions and experiences, helping find words for self-expression.",
    },
    {
      icon: LuUsers,
      title: "Reduce Isolation & Loneliness",
      description:
        "Coming together around the creative table builds social connections and fosters community.",
    },
    {
      icon: LuActivity,
      title: "Find Your Flow State",
      description:
        "The flow of working with clay enhances mental well-being, improving mood and satisfaction.",
    },
  ];

  return (
    <div>
      <main class="isolate max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section class="relative overflow-hidden py-6 pt-3 md:py-16">
          <div id="space" class="relative">
            <div class="grid lg:grid-cols-2 gap-6 items-start">
              <div class="order-2 lg:order-1 self-start">
                <div class="bg-gradient-to-br from-white/90 via-primary-50/30 to-secondary-50/30 dark:from-gray-800/90 dark:via-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-secondary-200/50 dark:border-secondary-700/50 max-w-2xl">
                  <h1 class="text-4xl md:text-5xl font-bold font-serif tracking-tight text-center text-balance mb-8">
                    <span class="bg-gradient-to-r xdxd from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                      Our Space
                    </span>
                  </h1>
                  <p class="text-lg leading-7 text-primary-700 dark:text-primary-300">
                    earthen vessels studio is a grounding space where working with clay becomes a pathway to a deeper connection—with ourselves, the earth, and each other—through reflections, mindful creativity, play, and listening to the voice within.
                  </p>
                  <p class="mt-4 text-lg leading-7 text-primary-700 dark:text-primary-300">
                    In this nurturing space, creativity and exploration thrive, welcoming all. With our facilitators' gentle guidance, each participant can engage with the clay and set aside fears or anxieties about "not being able to do it right"—it's truly freeing!
                  </p>
                </div>
              </div>
              <div class="order-1 lg:order-2 self-start">
                <Image
                  src="/images/space.jpeg"
                  alt="earthen vessels studio"
                  class="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section class="relative overflow-hidden py-6 pt-12 md:py-12">
          <div class="relative">
            <div class="grid lg:grid-cols-2 gap-6 items-start">
              <div class="order-1 lg:order-1 self-start">
                <Image
                  src="/images/a2.webp"
                  alt="Workshops"
                  class="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-lg"
                />
              </div>
              <div class="order-2 lg:order-2 self-start">
                <div class="bg-gradient-to-br from-white/90 via-primary-50/30 to-secondary-50/30 dark:from-gray-800/90 dark:via-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-secondary-200/50 dark:border-secondary-700/50 max-w-2xl">
                  <h2 class="text-4xl md:text-5xl font-bold font-serif tracking-tight text-center text-balance mb-8">
                    <span class="bg-gradient-to-r xdxd from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                      Our Offerings
                    </span>
                  </h2>
                  <p class="text-lg leading-7 text-primary-700 dark:text-primary-300">
                    Our Offerings are unique and evolving. We currently offer themed workshops from our Touch the Clay series. We also design custom workshops for private and organizations. Contact us for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What To Expect Section */}
        <section id="what-to-expect" class="relative overflow-hidden py-6 pt-12 md:py-12">
          <div class="relative mt-16">
            <div class="grid lg:grid-cols-2 gap-6 items-start">
              <div class="order-2 lg:order-1 self-start">
                <div class="bg-gradient-to-br from-white/90 via-primary-50/30 to-secondary-50/30 dark:from-gray-800/90 dark:via-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-secondary-200/50 dark:border-secondary-700/50 max-w-2xl">
                  <h2 class="text-4xl md:text-5xl font-bold font-serif tracking-tight text-center text-balance mb-8">
                    <span class="bg-gradient-to-r xdxd from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                      What To Expect
                    </span>
                  </h2>
                  <p class="text-lg leading-7 text-primary-700 dark:text-primary-300">
                    Our clay workshops begin with guided meditations and reflections, leading a small group into a deeper self-awareness, followed by a hands-on, mindful clay experience.
                  </p>
                  <p class="mt-4 text-lg leading-7 text-primary-700 dark:text-primary-300">
                    Previous clay experience is not necessary for our programs. Our facilitators gently guide the process, allowing each participant to engage with the clay in a relaxed atmosphere.
                  </p>
                  <p class="mt-4 text-lg leading-7 text-primary-700 dark:text-primary-300">
                    Whether you're a beginner or experienced, working with clay offers a valuable experience for your body, mind, and heart. Our classes are designed to focus on the process. Check below for the benefits of clay.
                  </p>
                </div>
              </div>
              <div class="order-1 lg:order-2 self-start">
                <Image
                  src="/images/a3.jpg"
                  alt="Clay Experience"
                  class="w-full max-w-lg lg:max-w-none rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="clay" class="relative overflow-hidden mt-10 py-12 pb-20 md:py-16">
          <div class="relative max-w-7xl  mx-auto mt-8">
            <h2 class="!text-4xl md:!text-5xl  text-center font-bold font-serif tracking-tight xdxd mb-16">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                The Benefits of Clay
              </span>
            </h2>
            <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    class="bg-gradient-to-br from-white/90 via-primary-50/30 to-secondary-50/30 dark:from-gray-800/90 dark:via-primary-900/30 dark:to-secondary-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-secondary-200/50 dark:border-secondary-700/50"
                  >
                    <Icon class="w-6 h-6 text-secondary-600 dark:text-secondary-300 mb-2" />
                    <p class="text-lg font-semibold tracking-tight text-secondary-900 dark:text-secondary-100">
                      {benefit.title}
                    </p>
                    <p class="mt-2 text-lg leading-7 text-primary-700 dark:text-primary-300">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact2/>
      </main>
    </div>
  );
});
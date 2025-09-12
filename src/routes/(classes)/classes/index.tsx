import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getClasses } from '~/lib/turso';
import { SITE } from "~/config.mjs";

interface Workshop {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isActive?: boolean;
}

export const useClassesData = routeLoader$(async () => {
  try {
    const classes = await getClasses();
    return classes.map(classItem => ({
      id: classItem.id?.toString() || '',
      name: classItem.name?.toString() || '',
      description: classItem.description?.toString() || '',
      image: classItem.image?.toString() || '',
      url: classItem.url?.toString() || '',
      // ✅ Normalize number (0/1) into booleans
      isActive: classItem.isActive === 1,
    }));
  } catch (error) {
    console.error('Error fetching classes:', error);
  throw error; // or show fallback with reason
    }
});

export default component$(() => {
  const expandedWorkshop = useSignal<string | null>(null);
  const classesData = useClassesData();
  const workshops = useSignal<Workshop[]>([]);

  // Load classes data
  useVisibleTask$(() => {
    workshops.value = classesData.value;
  });

  // Show loading state if no workshops yet
  if (workshops.value.length === 0 && classesData.value.length === 0) {
    return (
      <section class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div class="text-center mb-12">
            <h1 class="!text-5xl md:!text-5xl xdxd font-bold mb-6">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
                Our Offerings
              </span>
            </h1>
            <p class="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
              Explore our workshops and courses designed to foster creativity and connection. From beginner sessions to advanced techniques, we offer a range of experiences tailored to all levels.
              Join us for guided sessions where you'll learn new skills, connect with others, and find joy in the creative process.
            </p>
          </div>
          <div class="text-center py-12">
            <p class="text-primary-700 dark:text-primary-300 text-lg">Loading classes...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section class="relative overflow-hidden py-12 md:py-16">
      <div class="relative max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header and Subtitle */}
        <div class="text-center mb-12">
          <h1 class="!text-5xl md:!text-5xl xdxd font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-700 bg-clip-text text-transparent">
              Our Offerings
            </span>
          </h1>
          <p class="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            Explore our workshops and courses designed to foster creativity and connection. From beginner sessions to advanced techniques, we offer a range of experiences tailored to all levels.
            Join us for guided sessions where you'll learn new skills, connect with others, and find joy in the creative process.
          </p>
        </div>

        {workshops.value.length === 0 ? (
          <div class="text-center py-12">
            <p class="text-primary-700 dark:text-primary-300 text-lg">No classes available at the moment.</p>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.value.map((workshop) => (
              <div
                key={workshop.id}
                class={[
                  "break-inside-avoid group backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:border-secondary-200 hover:bg-white/45",
                  expandedWorkshop.value === workshop.id
                    ? "bg-white/40 border-secondary-200"
                    : "bg-white/35 border-primary-200 dark:border-secondary-700",
                ]}
                style={{
                  minHeight: "280px",
                  transitionProperty:
                    "transform, opacity, margin, box-shadow, background-color, border-color",
                  transform: expandedWorkshop.value === workshop.id ? "scale(1.02)" : "scale(1)",
                }}
                role="button"
                tabIndex={0}
                aria-expanded={expandedWorkshop.value === workshop.id}
                onClick$={() => {
                  expandedWorkshop.value =
                    expandedWorkshop.value === workshop.id ? null : workshop.id;
                }}
              >
                {/* Image */}
                {workshop.image && (
                  <div
                    class="h-40 w-full rounded-t-2xl bg-gray-100 overflow-hidden"
                    style={{
                      backgroundImage: `url('${workshop.image}')`,
                      backgroundSize: "cover", // Ensures the image fills the space, cropping if needed
                      backgroundPosition: "center", // Centers the image
                      backgroundRepeat: "no-repeat", // Prevents tiling
                    }}
                    role="img"
                    aria-label={workshop.name}
                  />
                )}

                {/* Info */}
                <div class="flex flex-col p-4">
                  <div class="flex flex-row items-center justify-center gap-4 mb-3">
                    <h3 class="text-base font-bold text-secondary-900 dark:text-secondary-100 line-clamp-2">
                      {workshop.name}
                    </h3>
                    {workshop.isActive ? (
                      <a
                        href={workshop.url || "https://bookeo.com/earthenvessels"}
                        class="px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                        role="button"
                        aria-label={`Book ${workshop.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book
                      </a>
                    ) : (
                      <button
                        class="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-400 text-white text-sm font-medium rounded-xl transition-all duration-200"
                        aria-label={`Archived ${workshop.name}`}
                        disabled
                      >
                        Archived
                      </button>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    class={[
                      "text-primary-700 dark:text-primary-300 text-sm text-center transition-all duration-300 ease-in-out",
                      expandedWorkshop.value !== workshop.id && "line-clamp-4",
                    ]}
                    style={{
                      maxHeight: expandedWorkshop.value === workshop.id ? "1000px" : "6em",
                      overflow: "hidden",
                      transitionProperty: "max-height",
                    }}
                  >
                    {workshop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - Classes`,
  meta: [
    {
      name: "description",
      content:
        "Discover our community partners and learn about their role in fostering connection and creativity.",
    },
  ],
};

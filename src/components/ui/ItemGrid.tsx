import { component$, useVisibleTask$, useSignal, useId } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

interface Item {
  title?: string;
  description?: string;
  icon?: any;
  classes?: Record<string, string>;
}

interface Props {
  items?: Array<Item>;
  classes?: Record<string, string>;
  id?: string; // Optional custom ID for unique observer targeting
}

export const ItemGrid = component$((props: Props) => {
  const { items = [], classes = {}, id: customId } = props;

  // Generate a unique ID if none provided
  const uniqueId = useId();
  const gridId = customId || `item-grid-${uniqueId}`;

  const isVisible = useSignal(false);

  useVisibleTask$(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;
          observer.disconnect(); // Disconnect after first intersection
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`#${gridId}`);
    if (element) observer.observe(element);

    return () => observer.disconnect(); // Cleanup on unmount
  });

  const {
    container: containerClass = "md:grid-cols-2 ",
    panel: panelClass = "",
    title: titleClass = "",
    description: descriptionClass = "",
    icon: iconClass = "text-secondary-500 dark:text-secondary-700",
  } = classes as Record<string, string>;

  return (
    items.length > 0 && (
      <div id={gridId} class={twMerge("grid mx-auto gap-2", containerClass)}>
        {items.map(({ title, description, icon: Icon, classes: itemClasses = {} }, index) => (
          <div
            key={`${title}${index}`}
            class={twMerge(
              "flex flex-row max-w-lg",
              panelClass,
              itemClasses?.panel,
              "transition-all duration-500 ease-out rounded-base p-4",
              isVisible.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {Icon && (
              <div class="flex justify-center">
                <Icon class={twMerge("w-7 h-7 mr-2", iconClass, itemClasses?.icon)} />
              </div>
            )}
            <div>
              <h3 class={twMerge("text-xl font-bold text-balance", titleClass, itemClasses?.title)}>{title}</h3>
              {description && (
                <p
                  class={twMerge("text-gray-600 dark:text-slate-400 mt-3 text-balance", descriptionClass, itemClasses?.description)}
                  dangerouslySetInnerHTML={description}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    )
  );
});
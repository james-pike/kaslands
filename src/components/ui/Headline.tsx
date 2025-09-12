import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

interface Props {
  title?: string;
  subtitle?: string;
  highlight?: string;
  classes?: Record<string, string>;
  align?: "left" | "center" | "right";
  id?: string;
}

export const Headline = component$((props: Props) => {
  const { title = "", subtitle = "", highlight = "", align = "center", classes = {}, id = `headline-${Math.random().toString(36).substr(2, 9)}` } = props;

  const {
    container: containerClass = "max-w-3xl",
    title: titleClass = "text-4xl md:text-5xl",
    subtitle: subtitleClass = "text-xl",
  } = classes;

  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align] || "text-center";

  const isVisible = useSignal(false);

  // Ensure animation triggers only when in view
  useVisibleTask$(({ cleanup }) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id ${id} not found`);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    cleanup(() => observer.disconnect());
  });

  return (title || subtitle || highlight) ? (
    <div
      id={id}
      class={twMerge("mb-8 md:mx-auto md:mb-12", containerClass, alignmentClass)}
    >
      {highlight && (
        <p
          class={twMerge(
            "text-base text-primary font-bold tracking-wide uppercase opacity-0", // Always start hidden
            isVisible.value && "animate-[fadeSlideUp_0.5s_ease-out_0s_forwards]"
          )}
          dangerouslySetInnerHTML={highlight}
        />
      )}
      {title && (
        <h2
          class={twMerge(
            "font-bold leading-tighter tracking-tighter  font-heading text-heading opacity-0", // Always start hidden
            titleClass,
            isVisible.value && "animate-[fadeSlideUp_0.5s_ease-out_0.1s_forwards]"
          )}
          dangerouslySetInnerHTML={title}
        />
      )}
      {subtitle && (
        <p
          class={twMerge(
            "mt-4 text-muted-foreground text-balance opacity-0", // Always start hidden
            subtitleClass,
            isVisible.value && "animate-[fadeSlideUp_0.5s_ease-out_0.2s_forwards]"
          )}
          dangerouslySetInnerHTML={subtitle}
        />
      )}
    </div>
  ) : null;
});
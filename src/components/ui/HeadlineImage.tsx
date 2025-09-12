import { twMerge } from "tailwind-merge";

interface Props {
  title?: string;
  subtitle?: string;
  highlight?: string;
  backgroundImage?: string;
  classes?: Record<string, string>;
  align?: "left" | "center" | "right";
}

export const HeadlineImage = (props: Props) => {
  const { 
    title = "", 
    subtitle = "", 
    highlight = "", 
    backgroundImage,
    align = "center", 
    classes = {} 
  } = props;

  const {
    container: containerClass = "w-full mx-0", // Changed from max-w-3xl to w-full
    title: titleClass = "text-4xl md:text-5xl",
    subtitle: subtitleClass = "text-xl",
  } = classes;

  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align] || "text-center";

  const backgroundStyles = backgroundImage 
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (title || subtitle || highlight) ? (
    <div 
      class={twMerge(
        "w-full mb-8 md:mb-12 relative", // Removed mx-auto and text-center from here
        containerClass
      )}
      style={backgroundStyles}
    >
      {/* Optional overlay for better text readability */}
      {backgroundImage && (
        <div class="absolute inset-0 bg-black/30" />
      )}
      
      {/* Inner container to maintain content width and alignment */}
      <div class={twMerge(
        "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12",
        alignmentClass
      )}>
        {highlight && (
          <p
            class="text-base text-primary-800 font-bold tracking-wide uppercase"
            dangerouslySetInnerHTML={highlight}
          />
        )}
        {title && (
          <h2
            class={twMerge(
              "font-bold leading-tighter tracking-tighter font-heading text-heading",
              titleClass,
              backgroundImage ? "text-white" : ""
            )}
            dangerouslySetInnerHTML={title}
          />
        )}
        {subtitle && (
          <p 
            class={twMerge(
              "mt-4 text-muted",
              subtitleClass,
              backgroundImage ? "text-white" : ""
            )} 
            dangerouslySetInnerHTML={subtitle} 
          />
        )}
      </div>
    </div>
  ) : null;
};
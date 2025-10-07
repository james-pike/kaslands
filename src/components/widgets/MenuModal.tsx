import { component$, useSignal, $, Signal, useVisibleTask$ } from "@builder.io/qwik";
import { LuX, LuChevronDown } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import { useLocation } from "@builder.io/qwik-city";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";
import { useBannerLoader } from "~/routes/layout";

const CustomAccordion = component$(({ items, show }: { items: any[]; show: Signal<boolean> }) => {
  const openIndex = useSignal<number | null>(null);
  const location = useLocation();

  useVisibleTask$(({ track }) => {
    track(() => show.value);
    if (!show.value) {
      openIndex.value = null;
    }
  });

  const closeModal = $(() => (show.value = false));

  // Normalize paths to handle trailing slashes
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  return (
    <div class="border-t border-primary-200">
      {items.map((item, index) => {
        // Check if the current route matches the item or any subitem
        const currentPath = normalizePath(location.url.pathname);
        const isActive =
          normalizePath(item.href) === currentPath ||
          (item.hasSubmenu &&
            item.subitems?.some((subitem: any) =>
              normalizePath(subitem.href.split("#")[0]) === currentPath
            ));
        return (
          <div
            key={index}
            class={cn(
              index > 0 && "border-t border-primary-200",
              index === items.length - 1 && "border-b-0"
            )}
          >
            {item.hasSubmenu ? (
              <>
                <button
                  class={cn(
                    "!text-xl font-medium text-gray-700 dark:text-gray-200 flex items-center justify-between w-full p-2.5 px-5",
                    isActive &&
                      "bg-primary-100 dark:bg-primary-100/80 !important text-primary-800 dark:text-secondary-800 !important font-bold !important",
                    "hover:bg-primary-100 dark:hover:bg-primary-100/80 transition-all duration-200"
                  )}
                  onClick$={() => (openIndex.value = openIndex.value === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <LuChevronDown
                    class={cn(
                      "h-6 w-6 text-gray-500 transition-transform duration-200",
                      openIndex.value === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  class={cn(
                    "text-xl text-muted-foreground transition-all duration-500 ease-in-out max-h-0 overflow-hidden",
                    openIndex.value === index && "max-h-96"
                  )}
                >
                  <ul class="flex flex-col gap-0 pl-5">
                    {item.subitems!.map((subitem: any) => {
                      // Updated logic: Compare full href (including hash) with current pathname + hash
                      const isSubitemActive =
                        normalizePath(subitem.href) ===
                        normalizePath(location.url.pathname + (location.url.hash || ""));
                      return (
                        <li key={subitem.title} class="flex items-center">
                          <span class="text-primary-300 !text-2xs mr-3">✦</span>
                          <a
                            href={subitem.href}
                            class={cn(
                              "block text-gray-700 dark:text-gray-200 !text-xl p-3 pl-1 font-medium transition-all duration-200",
                              isSubitemActive &&
                                "bg-primary-100 dark:bg-primary-100/80 !important text-primary-800 dark:text-secondary-800 !important font-bold !important",
                              "hover:bg-primary-100 dark:hover:bg-primary-100/80"
                            )}
                            onClick$={closeModal}
                          >
                            {subitem.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <a
                href={item.href}
                class={cn(
                  "block lg text-gray-700 !text-xl dark:text-gray-200 p-3 px-5 font-medium transition-all duration-200",
                  isActive &&
                    " dark:bg-primary-100/80 !important text-primary-800 dark:text-secondary-800 !important font-bold !important",
                  "hover:bg-primary-100 dark:hover:bg-primary-100/80"
                )}
                onClick$={closeModal}
              >
                <span>{item.title}</span>
                {item.badge}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
});



// ... CustomAccordion component unchanged ...

export default component$(() => {
  const show = useSignal(false);
  const banners = useBannerLoader(); // Ensure the banner loader is invoked

  const menuItems = [
    { title: "Story", href: "/", hasSubmenu: false },
    // {
    //   title: "About",
    //   href: "/about/",
    //   hasSubmenu: true,
    //   subitems: [
    //     { title: "Our Space", href: "/about" },
    //     { title: "What To Expect", href: "/about#what-to-expect" },
    //     { title: "Newsletter", href: "/newsletter" },
    //         { title: "Gallery", href: "/gallery/", badge: null },

    //     { title: "FAQ", href: "/faq" },
    //   ],
    // },
    // {
    //   title: "Classes",
    //   href: "/classes/",
    //   hasSubmenu: true,
    //   subitems: [
    //     { title: "Our Offerings", href: "/classes" },
    //     { title: "Gift Cards", href: "https://bookeo.com/earthenvessels/buyvoucher" },
    //   ],
    // },
            { title: "Roadmap", href: "/", badge: null },
    { title: "Exchanges", href: "/", badge: null },
    { title: "Media", href: "/", badge: null },
    { title: "FAQ", href: "/", badge: null },

  ];

  return (
    <>
      <Modal.Root bind:show={show}>
        <Modal.Trigger
          class={cn(
            "p-2 py-1.5 mt-1  transition-all duration-300",
            "bg-white/70 mb-1 mr-0.75 dark:border-primary-500 hover:shadow-xl hover:bg-white/45"
          )}
        >
          <IconHamburger class="w-6 h-7 text-teal-400 dark:text-secondary-200" />
        </Modal.Trigger>

        <Modal.Panel
          position="left"
          class="dark:bg-gray-950 border-r border-primary-200 overflow-y-auto max-h-[100vh]"
        >
          <div class="rounded-t-none border-primary-200 bg-white/50 dark:bg-gray-900 p-2">
            <Modal.Title class="pt-3 pb-2 pl-2.5">
              <a href="/" class="focus:outline-none">
                <div class="flex -ml-2 flex-row"  style=" height: 40px;">
                                    {/* <img src="/images/sticker.webp" alt="Logo" /> */}

                                  <h1 class="text-xl text-teal-800 ml-1 pt-2"> KASLANDS</h1>

                </div>
              </a>
            </Modal.Title>
            {/* <Modal.Description class="!text-md !font-bold px-2.5 py-1 pb-2 dark:text-gray-200">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Listening, Connecting & Creating
              </span>
            </Modal.Description> */}
          </div>

          <nav class="mt-0 space-y-4 bg-white/50 dark:bg-gray-800">
            <CustomAccordion items={menuItems} show={show} />
          </nav>

          <div class="rounded-b-2xl border-t border-primary-200 bg-white/20 dark:bg-gray-900 pb-5">
            <div class="sm:max-w-md px-5 pt-4 flex flex-row items-center justify-between gap-4 lg:justify-start lg:max-w-7xl">
              <div class="flex-shrink-0">
                <a
    href="#"
    class="w-full sm:w-auto bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 group relative inline-flex items-center justify-center px-3 pl-5 py-2.5 text-xl font-semibold text-white rounded-xl shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500 hover:scale-102 hover:bg-gradient-to-r hover:from-primary-400 hover:via-primary-400 hover:to-primary-300"
    role="button"
    aria-label="Book a workshop"
  >
    <span class="relative z-10 flex items-center gap-1">
      Mint $LANDS
      <img
        src="/images/sticker.webp"
        alt="Jar Icon"
        class="w-6 h-6 -ml-1 transform transition-transform duration-300 group-hover:-rotate-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </span>
    <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover:opacity-90 transform group-hover:translate-x-full transition-all duration-500"></div>
  </a>
              </div>
              <div class="flex-shrink-0 flex gap-6">
                <a
                  href="#"
                  // target="_blank"
                  // rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-200 hover:text-primary-800 dark:hover:text-primary-400 transition-colors"
                >
<svg width="30px" height="30px" viewBox="0 0 24 24" fill="#" class="" xmlns="http://www.w3.org/2000/svg">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#"></path>
  </g>
</svg>                 </a>
                <a
                  href="#"
                  // target="_blank"
                  // rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-200 hover:text-primary-800 dark:hover:text-primary-400 transition-colors"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#" class="bi bi-twitter-x" viewBox="0 0 16 16" id="Twitter-X--Streamline-Bootstrap" height="28" width="28">
               b3cce4
                 <desc>
  </desc>
  <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
</svg>
                </a>
              </div>
            </div>
            {/* Banner with Added Border */}
            {/* Dynamic Open House Banner */}
        {banners.value && (
          <div class="mt-4 pt-5 px-5 border-t border-primary-200">
            <div class="w-full px-5 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gradient-to-r from-white/40 via-tertiary-100/40 to-white/40 dark:from-gray-900/40 dark:via-tertiary-900/40 dark:to-gray-900/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-2">
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-800 dark:text-gray-200">
                  {banners.value.title || "Open House"}
                </h3>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {banners.value.subtitle}
                </p>
                <p class="text-sm mt-1">{banners.value.message}</p>
              </div>
              {/* Uncomment if you add a "More Info" link */}
              {/* <a href="mailto:hello@earthenvessels.ca" ... >More Info</a> */}
            </div>
          </div>
        )}
      </div>

          <Modal.Close
            class={cn(
              buttonVariants({ size: "icon", look: "link" }),
              "absolute right-8 top-5 text-primary-300 hover:text-primary-800 dark:text-white dark:hover:bg-gray-900"
            )}
            type="submit"
          >
            <LuX class="h-5 w-5" />
          </Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});
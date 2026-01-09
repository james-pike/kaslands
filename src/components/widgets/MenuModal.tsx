import { component$, useSignal, $, Signal, useVisibleTask$ } from "@builder.io/qwik";
import { LuX, LuChevronDown } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";
import { useBannerLoader } from "~/routes/layout";
import { useTabContext, type TabId } from "~/contexts/TabContext";
import { GunIcon } from "~/components/icons/GunIcon";

const CustomAccordion = component$(({ items, show }: { items: any[]; show: Signal<boolean> }) => {
  const openIndex = useSignal<number | null>(null);
  const { activeTab } = useTabContext();

  useVisibleTask$(({ track }) => {
    track(() => show.value);
    if (!show.value) {
      openIndex.value = null;
    }
  });

  const closeModal = $(() => (show.value = false));

  const switchTab = $((tab: TabId) => {
    activeTab.value = tab;
    closeModal();
  });

  // Normalize paths to handle trailing slashes

  return (
    <div class="border-t border-black/50">
      {items.map((item, index) => {
        // Check if the current tab matches the item
        const isActive = activeTab.value === item.href;
        return (
          <div
            key={index}
            class={cn(
              index > 0 && "border-t border-black/50",
              index === items.length - 1 && "border-b-0"
            )}
          >
            {item.hasSubmenu ? (
              <>
                <button
                  class={cn(
                    "!text-2xl font-medium neon-text text-white/90 dark:text-gray-200 flex items-center justify-between w-full p-2 px-5 relative",
                    isActive &&
                      "!text-pink-600 brightness-125 font-bold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:bg-pink-500 before:shadow-[0_0_8px_rgba(236,72,153,0.8)]",
                    "hover:!text-pink-600 transition-all duration-200"
                  )}
                  onClick$={() => (openIndex.value = openIndex.value === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <LuChevronDown
                    class={cn(
                      "h-7 w-7 text-gray-500 transition-transform duration-200",
                      openIndex.value === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  class={cn(
                    "text-2xl text-muted-foreground transition-all duration-500 ease-in-out max-h-0 overflow-hidden",
                    openIndex.value === index && "max-h-96"
                  )}
                >
                  <ul class="flex flex-col gap-0 pl-5">
                    {item.subitems!.map((subitem: any) => {
                      const isSubitemActive = activeTab.value === subitem.href;
                      return (
                        <li key={subitem.title} class="flex items-center">
                          <span class="text-primary-300 !text-2xs mr-3">✦</span>
                          <button
                            class={cn(
                              "block neon-text text-white/90 dark:text-gray-200 !text-2xl p-2 pl-1 font-medium transition-all duration-200 text-left w-full",
                              isSubitemActive &&
                                "!text-pink-600 brightness-125 font-bold",
                              "hover:!text-pink-600"
                            )}
                            onClick$={() => switchTab(subitem.href as TabId)}
                          >
                            {subitem.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <button
                class={cn(
                  "block lg neon-text text-white/90 !text-2xl dark:text-gray-200 p-2 px-5 font-medium transition-all duration-200 text-left w-full relative",
                  isActive &&
                    "!text-pink-600 brightness-125 font-bold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:bg-pink-500 before:shadow-[0_0_8px_rgba(236,72,153,0.8)]",
                  "hover:!text-pink-600"
                )}
                onClick$={() => switchTab(item.href as TabId)}
              >
                <span>{item.title}</span>
                {item.badge}
              </button>
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
  const { activeTab } = useTabContext();

  const switchTab = $((tab: TabId) => {
    activeTab.value = tab;
    show.value = false;
  });

  const menuItems = [
    { title: "About", href: "about", hasSubmenu: false },
    { title: "Collection", href: "collection", hasSubmenu: false },
    { title: "Merch", href: "merch", hasSubmenu: false },
    { title: "FAQ", href: "faq", hasSubmenu: false },
  ];

  return (
    <>
      <Modal.Root bind:show={show}>
        <Modal.Trigger
          class={cn(
            "btn bg-white/10 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-white/20 transition-all"
          )}
        >
          <IconHamburger class="w-6 h-6 text-white/90" />
        </Modal.Trigger>

        <Modal.Panel
          position="left"
          class="dark:bg-gray-950 border-r border-primary-200 overflow-y-auto max-h-[100vh]"
        >
          <div class="rounded-t-none border-primary-200 bg-gray-900/80 dark:bg-gray-900 p-2">
            <Modal.Title class="pt-3 pb-2 pl-2.5">
              <button onClick$={() => switchTab('collection')} class="focus:outline-none">
                <div class="flex -ml-2 flex-row"  style=" height: 40px;">
                                    {/* <img src="/images/sticker.webp" alt="Logo" /> */}

                                  <h1 class="text-2xl neon-text text-teal-800 ml-1 pt-2 brightness-100"> KASLANDS</h1>

                </div>
              </button>
            </Modal.Title>
            {/* <Modal.Description class="!text-md !font-bold px-2.5 py-1 pb-2 dark:text-gray-200">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Listening, Connecting & Creating
              </span>
            </Modal.Description> */}
          </div>

          <nav class="mt-0 space-y-4 bg-gray-900/80 dark:bg-gray-800">
            <CustomAccordion items={menuItems} show={show} />
          </nav>

          <div class="rounded-b-2xl border-t border-black/50 border-primary-200 bg-gray-900/80 dark:bg-gray-900 pb-5">
            <div class="sm:max-w-md px-5 pt-4 flex flex-row items-center justify-between gap-4 lg:justify-start lg:max-w-7xl">
              <div class="flex-shrink-0">
                <a
                  href="#"
                  class="bg-pink-600/40 hover:bg-pink-600/60 group relative inline-flex items-center justify-center px-3 pl-4 py-2 rounded-md shadow-lg hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-pink-600 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-white before:opacity-0 before:transform before:-translate-x-full group-hover:before:opacity-100 group-hover:before:translate-x-0 before:transition-all before:duration-500"
                  role="button"
                  aria-label="Mint NFT"
                >
                  <span class="relative z-10 flex items-center gap-1 neon-text text-2xl tracking-[0.01rem] font-medium text-white/70 brightness-100">
                    MINT
                    <div class="transform transition-transform duration-300 group-hover:-rotate-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <GunIcon />
                    </div>
                  </span>
                  <div class="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
                </a>
              </div>
              <div class="flex-shrink-0 flex gap-2">
                <a
                  href="#"
                  class="btn bg-black/20 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-black/30 transition-all"
                  aria-label="Telegram"
                >
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="white"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  class="btn bg-black/20 border-gray-300 dark:bg-gray-800 dark:border-gray-900 rounded-sm py-2 px-2 font-semibold shadow-none text-md hover:bg-black/30 transition-all"
                  aria-label="X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="bi bi-twitter-x" viewBox="0 0 16 16" height="24" width="24">
                    <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
                  </svg>
                </a>
              </div>
            </div>
            {/* Banner with Added Border */}
            {/* Dynamic Open House Banner */}
        {banners.value && (
          <div class="mt-4 pt-5 px-5 border-t border-black/50 ">
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
              "absolute right-8 top-5 text-white hover:text-white/70 dark:text-white dark:hover:bg-gray-900"
            )}
            type="submit"
          >
            <LuX class="h-6 w-6" />
          </Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});
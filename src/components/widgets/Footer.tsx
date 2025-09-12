import { component$, type JSXOutput, type JSXNode } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  LuMail,
  LuClock,
  LuMapPin,
  LuFacebook,
  LuInstagram,
} from "@qwikest/icons/lucide";
import type { SVGProps } from "@builder.io/qwik";

interface Item {
  title: string | JSXNode | JSXOutput;
  href: string | null;
  icon?: (props: SVGProps<SVGSVGElement>) => JSXNode<unknown>;
}

interface LinkSection {
  title: string;
  items: Item[];
}

export default component$(() => {
  const links: LinkSection[] = [
    {
      title: "About",
      items: [
        { title: "Our Space", href: "/about" },
        { title: "What To Expect", href: "/about#what-to-expect" },
        { title: "Benefits Of Clay", href: "/about#clay" },
        { title: "Gallery", href: "/gallery" },
        { title: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Community",
      items: [
        { title: "Classes", href: "/classes" },
        { title: "Facilitators", href: "/team" },
        { title: "Connections", href: "/connections" },
        { title: "Reviews", href: "/reviews" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Contact",
      items: [
        {
          title: "hello@earthenvessels.ca",
          href: "mailto:hello@earthenvessels.ca",
          icon: LuMail,
        },
        {
          title: "Hours: By appointment",
          href: null,
          icon: LuClock,
        },
        {
          title: (
            <span class="block leading-tight">
              <span class="block">36 Rosemount Ave</span>
              <span class="block">Ottawa, ON</span>
              <span class="block">K1Y 1P4</span>
            </span>
          ),
          href: "https://www.google.com/maps/search/?api=1&query=36+Rosemount+Ave,+K1Y+1P4,+Ottawa,+ON",
          icon: LuMapPin,
        },
      ],
    },
    {
      title: "Connect",
      items: [
        {
          title: "Instagram",
          href: "https://www.instagram.com/earthenvesselsgathering/",
          icon: LuInstagram,
        },
        {
          title: "Facebook",
          href: "https://www.facebook.com/p/earthen-vessels-61562702795370/",
          icon: LuFacebook,
        },
      ],
    },
  ];

  return (
    <footer class="relative border-t pl-1 border-half border-primary-200 dark:border-secondary-700 overflow-hidden">
      {/* Background with pottery textures */}
      <div class="absolute inset-0 bg-pottery-texture opacity-10" aria-hidden="true"></div>
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-primary-100/10 via-tertiary-50/15 to-secondary-50/50" aria-hidden="true"></div>

      <div class="relative max-w-7xl mx-auto px-4 md:mr-4 sm:px-6 md:px-8">
        <div class="grid grid-cols-12 gap-4 gap-y-4 sm:gap-4 py-8 md:pt-12 md:pb-2">
          {/* First Column: Logo, Description, Newsletter */}
          <div class="col-span-12 lg:col-span-5 md:pr-8">
            <div class="mb-4">
              <Link class="inline-block xdxd font-bold !text-3xl" href={"/"}>
                <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                  earthen vessels
                </span>
              </Link>
            </div>
            <div class="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">
              earthen vessels offers a welcoming space where mindfulness and creativity come together. The process invites us to slow down, listen inwardly and discover new ways to express ourselves.
            </div>
            {/* Newsletter Signup */}
            <div class="mt-6">
              <div class="text-sm font-semibold mb-3 ml-1">
                <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent flex items-center gap-2">
                  Join Our Newsletter
                </span>
              </div>
              <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                  <form
                    action="https://earthenvessels.us11.list-manage.com/subscribe/post?u=42dda59e7d3d6747a12a99b52&amp;id=f9ccff90d2&amp;f_id=00edd6e3f0"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    class="validate flex w-full max-w-md"
                    target="_self"
                    noValidate
                  >
                    <div id="mc_embed_signup_scroll" class="flex w-full">
                      <input
                        type="email"
                        name="EMAIL"
                        class="required email flex-1 px-4 py-2 !text-sm border border-primary-200 dark:border-secondary-800 rounded-l-xl bg-white/50 dark:bg-secondary-800/80 backdrop-blur-sm text-primary-900 dark:text-primary-100 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        id="mce-EMAIL"
                        placeholder="Enter your email"
                        aria-label="Enter email for newsletter"
                        required
                        value=""
                      />
                      <div aria-hidden="true" style="position: absolute; left: -5000px;">
                        <input
                          type="text"
                          name="b_42dda59e7d3d6747a12a99b52_f9ccff90d2"
                          tabIndex={-1}
                          value=""
                        />
                      </div>
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        class="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-base font-medium rounded-r-full hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                        value="Subscribe"
                        role="button"
                        aria-label="Subscribe to newsletter"
                      />
                    </div>
                    <div id="mce-responses" class="clear foot mt-2">
                      <div class="response" id="mce-error-response" style="display: none;"></div>
                      <div class="response" id="mce-success-response" style="display: none;"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Sitemap Columns */}
          {links.map(({ title, items }, index) => (
            <div
              key={index}
              class={`
                col-span-6 sm:col-span-6 md:col-span-3 mt-1
                ${index === 0 ? 'lg:col-span-2'
                  : index === 1 ? 'lg:col-span-2'
                    : index === 2 ? 'lg:col-span-2'
                      : 'lg:col-span-1'}
              `}
            >
              <div class="text-sm font-semibold mb-4 mt-2">
                <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </div>
              {Array.isArray(items) && items.length > 0 && (
                <ul class="text-sm space-y-2">
                  {items.map(({ title, href, icon: Icon }, index2) => (
                    <li key={index2} class="flex items-start gap-2">
                      {Icon && <Icon class="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      {href ? (
                        <Link
                          class="text-primary-700 hover:text-secondary-800 dark:text-primary-300 dark:hover:text-secondary-300 transition-colors duration-200 ease-in-out"
                          href={href}
                          target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined}
                          rel={href.startsWith("http") || href.startsWith("mailto") ? "noopener noreferrer" : undefined}
                        >
                          {title}
                        </Link>
                      ) : (
                        <span class="text-primary-700 dark:text-primary-300">{title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between -mt-8 md:pt-8 pb-2 md:pb-4 border-t border-half border-secondary-200/50 dark:border-secondary-700/50">
          <div class="inline-flex pb-2 items-center text-sm text-primary-700 mt-2 dark:text-primary-300 order-2 md:order-1">
            <img
              src="/images/logo22.svg"
              alt="earthen vessels Logo"
              class="w-20 h-20 md:w-120 md:h-30 mr-4 rounded-sm"
              width={80}
              height={80}
            />
            <span>
              © 2025 earthen vessels · All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});
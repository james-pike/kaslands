import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { FileQuestionIcon, MountainIcon } from "lucide-qwik";

// Define the SVG as a Qwik component
const GunIcon = component$(() => {
  return (
    <svg
      height="36px"
      width="36px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.461 512.461"
      xml:space="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g transform="translate(1 1)">
          <path
            style={{ fill: "#fd08d0" }}
            d="M40.421,208.297c23.893,0,40.107,25.6,29.013,46.933l-56.32,114.347 c-8.533,18.773-5.973,40.96,8.533,58.027c10.24,12.8,26.453,19.627,43.52,19.627h96.427c26.453,0,40.96-31.573,23.04-51.2 l-11.093-12.8c-2.56-3.413-4.267-8.533-3.413-12.8l51.2-162.133H40.421z"
          ></path>
          <g>
            <path
              style={{ fill: "#ff0aa5" }}
              d="M48.955,208.297c23.893,0,40.107,25.6,29.013,46.933l-56.32,114.347 c-8.533,18.773-5.973,40.96,8.533,58.027c10.24,12.8,26.453,19.627,43.52,19.627h70.827c26.453,0,40.96-31.573,23.04-51.2 l-11.093-12.8c-2.56-3.413-4.267-8.533-3.413-12.8l51.2-162.133H48.955z"
            ></path>
            <path
              style={{ fill: "#ff0aa5" }}
              d="M33.595,88.831v25.6l8.533,12.8c8.533,12.8,8.533,29.867,0,42.667l-8.533,12.8v25.6h332.8v-17.067 c0-13.653,10.24-25.6,23.04-25.6h87.893v-76.8H33.595z"
            ></path>
          </g>
          <path
            style={{ fill: "#9561b8" }}
            d="M42.128,169.897c8.533-12.8,8.533-29.867,0-42.667l-8.533-12.8v-25.6h-25.6v25.6l9.387,12.8 c9.387,12.8,9.387,29.867,0,42.667l-9.387,12.8v25.6h25.6v-25.6L42.128,169.897z"
          ></path>
          <polygon
            style={{ fill: "#fd08d0" }}
            points="477.328,165.631 502.928,165.631 502.928,88.831 477.328,88.831 "
          ></polygon>
          <g>
            <polygon
              style={{ fill: "#c708fd" }}
              points="426.128,88.831 477.328,88.831 477.328,63.231 426.128,63.231 "
            ></polygon>
            <polygon
              style={{ fill: "#c708fd" }}
              points="59.195,88.831 110.395,88.831 110.395,63.231 59.195,63.231 "
            ></polygon>
          </g>
          <path
            style={{ fill: "#fd08d0" }}
            d="M477.328,199.764H366.395v-8.533c0-13.653,11.093-25.6,25.6-25.6h85.333V199.764z"
          ></path>
          <path
            style={{ fill: "#c708fd" }}
            d="M451.728,199.764h-85.333v-8.533c0-13.653,11.093-25.6,25.6-25.6h59.733V199.764z"
          ></path>
          <g>
            <path
              style={{ fill: "#ff0aa5" }}
              d="M274.235,265.471c-0.853,0-1.707,0-2.56-0.853c-27.307-9.387-37.547-18.773-45.227-40.96 c-1.707-4.267,0.853-9.387,5.12-11.093c4.267-1.707,9.387,0.853,11.093,5.12c4.267,14.507,9.387,21.333,34.133,29.867 c4.267,1.707,6.827,5.973,5.12,11.093C281.061,262.911,277.648,265.471,274.235,265.471z"
            ></path>
            <path
              style={{ fill: "#ff0aa5" }}
              d="M256.315,302.164h-61.44c-2.56,0-5.12-1.707-6.827-3.413c-1.707-1.707-1.707-5.12-0.853-7.68 l27.307-85.333c0.853-3.413,4.267-5.973,8.533-5.973h95.573c5.12,0,8.533,3.413,8.533,8.533v24.747 C325.435,271.444,293.861,302.164,256.315,302.164z M205.968,285.097h49.493c29.013,0,52.053-23.04,52.053-52.053v-16.213h-80.213 L205.968,285.097z"
            ></path>
          </g>
          <g>
            <path
              style={{ fill: "#c708fd" }}
              d="M187.195,208.297h-68.267L43.835,384.084c-3.413,7.68-1.707,16.213,3.413,22.187 c4.267,4.267,10.24,6.827,17.92,6.827h40.96c7.68,0,14.507-5.12,17.067-11.947L187.195,208.297z"
            ></path>
            <polygon
              style={{ fill: "#c708fd" }}
              points="204.261,140.031 323.728,140.031 323.728,88.831 204.261,88.831 "
            ></polygon>
          </g>
          <path
            d="M323.728,148.564H204.261c-5.12,0-8.533-3.413-8.533-8.533v-51.2c0-5.12,3.413-8.533,8.533-8.533h119.467 c5.12,0,8.533,3.413,8.533,8.533v51.2C332.261,145.151,328.848,148.564,323.728,148.564z M212.795,131.497h102.4V97.364h-102.4 V131.497z"
          ></path>
          <path
            d="M161.595,455.764H65.168c-20.48,0-39.253-8.533-51.2-23.04c-15.36-18.773-19.627-45.227-9.387-67.413l57.173-114.347 c3.413-7.68,3.413-16.213-0.853-23.04c-4.267-6.827-11.947-11.093-20.48-11.093c-5.12,0-8.533-3.413-8.533-8.533 c0-5.12,3.413-8.533,8.533-8.533h180.907c2.56,0,5.12,1.707,6.827,3.413c1.707,2.56,1.707,5.12,1.707,7.68l-51.2,161.28 c0,1.707,0.853,4.267,1.707,5.973l11.093,12.8c10.24,11.947,12.8,28.16,5.973,41.813 C190.608,446.377,176.955,455.764,161.595,455.764z M73.701,216.831c0.853,0.853,0.853,1.707,1.707,2.56 c7.68,11.947,8.533,27.307,1.707,40.107l-56.32,113.493c-6.827,16.213-4.267,34.987,6.827,49.493 c8.533,10.24,22.187,17.067,37.547,17.067h96.427c9.387,0,16.213-5.12,20.48-12.8c3.413-8.533,2.56-17.067-3.413-23.893 l-11.093-12.8c0,0,0-0.853-0.853-0.853c-4.267-5.12-5.973-11.947-5.12-18.773c0-0.853,0-0.853,0-1.707l47.787-151.893H73.701z"
          ></path>
          <path
            d="M106.128,421.631h-40.96c-10.24,0-18.773-4.267-24.747-10.24c-6.827-8.533-9.387-20.48-5.12-30.72l75.093-174.933 c1.707-3.413,4.267-5.12,7.68-5.12h68.267c2.56,0,5.12,1.707,6.827,3.413c1.707,2.56,1.707,5.12,0.853,7.68l-64,192.853 C127.461,414.804,117.221,421.631,106.128,421.631z M124.901,216.831L51.515,387.497c-1.707,4.267-0.853,9.387,2.56,13.653 c1.707,1.707,5.973,3.413,11.093,3.413h40.96c4.267,0,7.68-2.56,9.387-5.973l59.733-181.76H124.901z"
          ></path>
          <path
            d="M263.995,265.471c-0.853,0-1.707,0-2.56-0.853c-27.307-9.387-37.547-18.773-45.227-40.96 c-1.707-4.267,0.853-9.387,5.12-11.093c4.267-1.707,9.387,0.853,11.093,5.12c4.267,14.507,9.387,21.333,34.133,29.867 c4.267,1.707,6.827,5.973,5.12,11.093C270.821,262.911,267.408,265.471,263.995,265.471z"
          ></path>
          <path
            d="M477.328,208.297H366.395c-5.12,0-8.533-3.413-8.533-8.533v-8.533c0-18.773,15.36-34.133,34.133-34.133h85.333 c5.12,0,8.533,3.413,8.533,8.533v34.133C485.861,204.884,482.448,208.297,477.328,208.297z M374.928,191.231h93.867v-17.067h-76.8 C382.608,174.164,374.928,181.844,374.928,191.231L374.928,191.231z"
          ></path>
          <path
            d="M477.328,97.364h-51.2c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-5.12,3.413-8.533,8.533-8.533h51.2 c5.12,0,8.533,3.413,8.533,8.533v25.6C485.861,93.951,482.448,97.364,477.328,97.364z M434.661,80.297h34.133v-8.533h-34.133 V80.297z"
          ></path>
          <path
            d="M110.395,97.364h-51.2c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-5.12,3.413-8.533,8.533-8.533h51.2 c5.12,0,8.533,3.413,8.533,8.533v25.6C118.928,93.951,115.515,97.364,110.395,97.364z M67.728,80.297h34.133v-8.533H67.728V80.297z "
          ></path>
          <path
            d="M246.075,302.164h-52.053c-2.56,0-5.12-1.707-6.827-3.413c-1.707-1.707-1.707-5.12-0.853-7.68l27.307-85.333 c0.853-3.413,4.267-5.973,8.533-5.973h85.333c5.12,0,8.533,3.413,8.533,8.533v24.747 C315.195,271.444,284.475,302.164,246.075,302.164z M205.968,285.097h40.107c29.013,0,52.053-23.04,52.053-52.053v-16.213h-70.827 L205.968,285.097z"
          ></path>
          <path
            d="M110.395,361.897c0-9.387-7.68-17.067-17.067-17.067s-17.067,7.68-17.067,17.067c0,9.387,7.68,17.067,17.067,17.067 S110.395,371.284,110.395,361.897"
          ></path>
          <path
            d="M144.528,276.564c0-9.387-7.68-17.067-17.067-17.067s-17.067,7.68-17.067,17.067c0,9.387,7.68,17.067,17.067,17.067 S144.528,286.804,144.528,276.564"
          ></path>
          <path
            d="M161.595,182.697h-102.4c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h102.4 c5.12,0,8.533,3.413,8.533,8.533C170.128,179.284,166.715,182.697,161.595,182.697z"
          ></path>
          <path
            d="M161.595,148.564h-102.4c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h102.4 c5.12,0,8.533,3.413,8.533,8.533C170.128,145.151,166.715,148.564,161.595,148.564z"
          ></path>
          <path
            d="M366.395,216.831H7.995c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-1.707,0.853-3.413,1.707-5.12l9.387-12.8 c6.827-9.387,6.827-23.04,0-32.427l-9.387-12.8c-0.853-0.853-1.707-2.56-1.707-5.12v-25.6c0-5.12,3.413-8.533,8.533-8.533h494.933 c5.12,0,8.533,3.413,8.533,8.533v76.8c0,5.12-3.413,8.533-8.533,8.533H391.995c-9.387,0-17.067,7.68-17.067,17.067v17.067 C374.928,213.417,371.515,216.831,366.395,216.831z M16.528,199.764h341.333v-8.533c0-18.773,15.36-34.133,34.133-34.133h102.4 V97.364H16.528v14.507l7.68,10.24c11.947,15.36,11.947,37.547,0,52.907l-7.68,11.093V199.764z"
          ></path>
        </g>
      </g>
    </svg>
  );
});

interface Faq {
  id: number;
  question: string;
  answer: string;
  icon: any; // You can make this more specific if needed
  isHtml?: boolean;
}

export default component$(() => {
  const faqs = useSignal<Faq[]>([
    {
      id: 1,
      question: "Who I am?",
      answer: `I’m Jules, I love 80s music, I enjoy being with family & friends. Health enthusiast. I love traveling, nature, gardening, hiking, shooting guns, white water rafting, good games & good food.`,
      icon: MountainIcon,
    },
    {
      id: 2,
      question: "What I do?",
      answer: `I have & will continue to hire various artists & skilled professionals to bring my visions to web3. I fair launch NFT projects that I’ve been working on, some created from photography, some from sketches. In the works include more art collections & brand merch. More to be discussed.`,
      icon: GunIcon, // Use the Qwik component here
      isHtml: true,
    },
    {
      id: 3,
      question: "Why?",
      answer: `I do this to bring excitement and fun to the ecosystem and build a legacy. I believe we are in the early stages of kaspa still, similarly to ethereum. I hope you enjoy the vibe.`,
      icon: FileQuestionIcon,
    },
    {
      id: 4,
      question: "What's next?",
      answer: `Upcoming plans include more art collections, brand merchandise, and community engagement. Expect collaborations and exclusive drops to build a lasting presence in web3.`,
      icon: MountainIcon,
    },
  ]);

  const openItems = useSignal<number | null>(null);
  const isMobile = useSignal(false);

  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    isMobile.value = mediaQuery.matches;

    if (isMobile.value) {
      openItems.value = faqs.value[0]?.id || null;
    } else {
      const randomFaq = faqs.value[Math.floor(Math.random() * faqs.value.length)];
      openItems.value = randomFaq?.id || null;
    }

    const handler = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches;
      if (isMobile.value) {
        openItems.value = faqs.value[0]?.id || null;
      } else {
        const randomFaq = faqs.value[Math.floor(Math.random() * faqs.value.length)];
        openItems.value = randomFaq?.id || null;
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  });

  const toggleItem = $((id: number) => {
    openItems.value = openItems.value === id ? null : id;
  });

  const leftColumn = faqs.value.filter((_, i) => i % 2 === 0);
  const rightColumn = faqs.value.filter((_, i) => i % 2 === 1);

  const renderFaqItem = (item: Faq) => {
    const Icon = item.icon;
    return (
      <div key={item.id} class="group">
        <div class="bg-black/40 dark:from-gray-800/90 rounded-md border-2 border-black/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <button
            onClick$={() => toggleItem(item.id)}
            class="w-full px-6 py-5 flex items-center justify-between text-left transition-all"
            aria-expanded={openItems.value === item.id}
            aria-controls={`faq-answer-${item.id}`}
          >
            <div class="flex items-center gap-3">
              <Icon class="w-5 h-5 text-pink-500" />
              <h3 class="!text-xl md:neon-text font-semibold text-white/80 dark:text-secondary-100">
                {item.question}
              </h3>
            </div>
            <div
              class={`w-8 h-8 rounded-full border-pink-500/80 border flex items-center justify-center transition-all ${
                openItems.value === item.id
                  ? "bg-pink-500/80 text-white"
                  : "bg-white/80"
              }`}
            >
              <svg
                class={`w-5 h-5 transition-transform text-pink-500 ${
                  openItems.value === item.id ? "rotate-180 text-white" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          <div
            id={`faq-answer-${item.id}`}
            class={`overflow-hidden transition-all duration-300 ${
              openItems.value === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div class="px-6 pb-5 text-white dark:text-secondary-300">
              {item.isHtml ? (
                <div dangerouslySetInnerHTML={item.answer} />
              ) : (
                <p>{item.answer}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section class="faq-section relative overflow-hidden py-12 md:py-16">
      <div class="relative max-w-5xl mx-auto px-5 sm:px-6">

            <h1 class="block text-2xl -mt-4 md:hidden pb-6 text-center md:neon-text ">FAQs </h1>

        <div class="flex flex-col md:flex-row md:gap-8">
          <div class="flex-1 flex flex-col gap-4">
            {leftColumn.map(renderFaqItem)}
          </div>
          <div class="flex-1 flex flex-col gap-4 mt-4 md:mt-0">
            {rightColumn.map(renderFaqItem)}
          </div>
        </div>
      </div>
    </section>
  );
});
import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/common/RouterHead";
import styles from "~/assets/styles/global.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        {/* Preload Dancing Script weight 400 only */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=block"
          as="style"
        />
        {/* Load all Dancing Script weights as stylesheet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;700&display=block"
          rel="stylesheet"
        />
        {/* Define font-face for weight 400 with font-display: block */}
        <style>
          {`
            @font-face {
              font-family: 'Dancing Script';
              font-style: normal;
              font-weight: 600;
              src: url('https://fonts.gstatic.com/s/dancingscript/v24/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSo3Sup5.ttf') format('truetype');
              font-display: block;
            }
          `}
        </style>
        {/* Load Della Respira normally */}
        <link href="https://fonts.googleapis.com/css2?family=Della+Respira&display=swap" rel="stylesheet" />
        <RouterHead />
        <ServiceWorkerRegister />
        {/* Video preload */}
        <link rel="preload" href="/images/hero4.mp4" as="video" type="video/mp4" />
        {/* Image preloads with correct types */}
        <link rel="preload" href="/images/logo22.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/logo2-cropped.svg" as="image" type="image/svg+xml" />
      </head>
  <body class="antialiased overflow-x-hidden">
  {/* Background video layer - fixed with 100svh to prevent zoom */}
  <div class="fixed inset-0 opacity-80 h-screen" style="height: 100svh;" aria-hidden="true">
    <video
      autoplay
      loop
      muted
      playsInline
      class="w-full h-full object-cover"
    >
      <source src="/images/hero4.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Content layer */}
  <div class="relative z-10">
    <RouterOutlet />
  </div>
</body>
    </QwikCityProvider>
  );
});
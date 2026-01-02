import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/common/RouterHead";
import { useAudioProvider } from "~/contexts/AudioContext";
import { useVideoProvider } from "~/contexts/VideoContext";
import { useTabProvider } from "~/contexts/TabContext";
import styles from "~/assets/styles/global.css?inline";

export default component$(() => {
  useStyles$(styles);

  // Provide audio context at the root level
  // Audio element is created imperatively in the context to persist across navigation
  useAudioProvider();

  // Provide video context at the root level
  // Video element is created imperatively in the context to persist across navigation
  useVideoProvider();

  // Provide tab context for tab-based navigation
  useTabProvider();

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
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap" rel="stylesheet"/>

      </head>
  <body class="antialiased overflow-x-hidden text-lg" style="font-family: 'Tilt Neon', sans-serif;">
  {/* Background video is created imperatively via VideoContext and persists across navigation */}

  {/* Content layer */}
  <div class="relative z-10">
    <RouterOutlet />
  </div>
</body>
    </QwikCityProvider>
  );
});
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { LuChevronLeft, LuChevronRight, LuPause, LuPlay } from "@qwikest/icons/lucide";
import { SITE } from "~/config.mjs";
import { tursoClient } from "~/lib/turso";
import confetti from 'canvas-confetti';

// Interface for gallery images
interface GalleryImage {
  id: number;
  title: string;
  src: string;
  alt: string;
}

// Helper function to get MIME type from file extension
function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
  };
  return mimeTypes[extension] || 'image/jpeg';
}

// Helper function to convert various blob formats to base64
function convertBlobToBase64(imageData: any, filename: string): string {
  try {
    const extension = filename.split('.').pop()?.toLowerCase() || 'jpeg';
    const mimeType = getMimeType(extension);
    let base64String = '';

    if (imageData instanceof Uint8Array) {
      // Convert Uint8Array to base64
      base64String = btoa(String.fromCharCode(...imageData));
    } else if (imageData instanceof ArrayBuffer) {
      // Convert ArrayBuffer to base64
      const uint8Array = new Uint8Array(imageData);
      base64String = btoa(String.fromCharCode(...uint8Array));
    } else if (typeof imageData === 'string') {
      // Handle case where it might already be base64 or binary string
      if (imageData.startsWith('data:')) {
        // Already a data URL
        return imageData;
      } else if (imageData.match(/^[A-Za-z0-9+/]*={0,2}$/)) {
        // Looks like base64, use as is
        base64String = imageData;
      } else {
        // Treat as binary string
        base64String = btoa(imageData);
      }
    } else if (Array.isArray(imageData)) {
      // Convert array to Uint8Array then to base64
      const uint8Array = new Uint8Array(imageData);
      base64String = btoa(String.fromCharCode(...uint8Array));
    } else {
      console.error('Unknown image data format:', typeof imageData, imageData);
      return '';
    }

    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error('Error converting blob to base64:', error, 'for file:', filename);
    return '';
  }
}

// ---- Loader ----
export const useGalleryLoader = routeLoader$(async (event) => {
  try {
    const client = tursoClient(event);

    // Debug: Check what columns exist in your table
    const schemaResult = await client.execute("PRAGMA table_info(gallery_images)");
    console.log('Table schema:', schemaResult.rows);

    const result = await client.execute("SELECT * FROM gallery_images ORDER BY id ASC");
    console.log('Query result count:', result.rows.length);

    if (result.rows.length === 0) {
      console.log('No rows found in gallery_images table');
      return [];
    }

    // Debug: Log the first row to see the structure
    console.log('First row structure:', Object.keys(result.rows[0] || {}));
    console.log('First row sample:', result.rows[0]);

    const processedImages = result.rows.map((row: any, index: number) => {
      const filename = String(row.filename || row.name || `image_${row.id || index}.jpg`);
      const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      console.log(`Processing image ${index + 1}:`, filename);
      console.log('Image data type:', typeof row.image);
      console.log('Image data length:', row.image?.length || 'N/A');

      // Convert blob to base64 data URL
      let src = '';
      if (row.image) {
        src = convertBlobToBase64(row.image, filename);
        if (!src) {
          console.error(`Failed to convert image data for ${filename}`);
          // Fallback to filesystem path
          src = `/images/${filename}`;
        } else {
          console.log(`Successfully converted ${filename} to data URL (length: ${src.length})`);
        }
      } else {
        console.log(`No image data found for ${filename}, using filesystem fallback`);
        // Fallback to filesystem path
        src = `/images/${filename}`;
      }

      return {
        id: Number(row.id) || index,
        title,
        src,
        alt: `Gallery image: ${title}`,
      };
    });

    console.log(`Processed ${processedImages.length} images`);
    return processedImages as GalleryImage[];
  } catch (error) {
    console.error("Error loading gallery images:", error);
    // Return some dummy data for testing if database fails
    return [
      {
        id: 1,
        title: "Test Image",
        src: "/images/placeholder.jpg",
        alt: "Test gallery image"
      }
    ] as GalleryImage[];
  }
});

export default component$(() => {
  const loaderData = useGalleryLoader();
  const galleryImages = useSignal<GalleryImage[]>([]);
  const currentIndex = useSignal(0);
  const selectedImage = useSignal<GalleryImage | null>(null);
  const autoPlay = useSignal(false);
  const isFullscreen = useSignal(false);
  const bookButtonRef = useSignal<HTMLAnchorElement>();
  const didClickSig = useSignal(false);

  // Load data from the loader
  useVisibleTask$(() => {
    console.log('Loader data received:', loaderData.value.length, 'images');
    galleryImages.value = loaderData.value;
  });

  // Auto-play logic
  useVisibleTask$(({ cleanup, track }) => {
    track(() => autoPlay.value);
    track(() => galleryImages.value.length);

    let interval: NodeJS.Timeout | null = null;
    if (autoPlay.value && galleryImages.value.length > 0) {
      interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % galleryImages.value.length;
      }, 5000);
    }

    cleanup(() => {
      if (interval) clearInterval(interval);
    });
  });

  // Navigation functions
  const toggleAutoPlay = $(() => {
    autoPlay.value = !autoPlay.value;
  });

  const goToPrev = $(() => {
    if (galleryImages.value.length === 0) return;
    currentIndex.value = (currentIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length;
  });

  const goToNext = $(() => {
    if (galleryImages.value.length === 0) return;
    currentIndex.value = (currentIndex.value + 1) % galleryImages.value.length;
  });

  const selectImage = $((index: number) => {
    currentIndex.value = index;
  });

  const toggleFullscreen = $(async () => {
    const elem = document.querySelector(".lightbox-content") as HTMLElement;
    if (!isFullscreen.value) {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
        isFullscreen.value = true;
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        isFullscreen.value = false;
      }
    }
  });

  const handleBookClick = $(async () => {
    didClickSig.value = true;
    if (!bookButtonRef.value) return;

    const rect = bookButtonRef.value.getBoundingClientRect();
    if (!rect) return;

    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = rect.top / window.innerHeight;

    await confetti({
      colors: ['#02B9FC', '#B57DFC'],
      origin: { x, y },
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    window.location.href = "https://www-1562q.bookeo.com/bookeo/b_earthenvessels_start.html?ctlsrc2=EjHpdqQ7gHCdolqaOg29kaDObVPz%2FLbyB4LaSA8fiEI%3D&src=02h&type=41562UHUKUC196793426E6";
  });

  // Show loading or error state
  if (galleryImages.value.length === 0) {
    return (
      <section class="relative overflow-hidden py-12 md:py-16">
        <div class="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div class="text-center mb-12">
            <h1 class="!text-5xl md:!text-5xl font-bold xdxd mb-6">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Studio Gallery
              </span>
            </h1>
          </div>
          <div class="text-center">
            <p class="text-xl text-primary-700 dark:text-primary-300">
              Loading gallery images...
            </p>
            <p class="text-sm text-primary-600 dark:text-primary-400 mt-2">
              Check browser console for debugging information
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section class="relative overflow-hidden py-12 md:py-16">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      <div class="relative max-w-6xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h1 class="!text-5xl md:!text-5xl font-bold xdxd mb-6">
            <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
              Studio Gallery
            </span>
          </h1>
          {/* <p class="text-sm text-primary-600 dark:text-primary-400">
            Showing {galleryImages.value.length} images
          </p> */}
        </div>

        {/* Image Player */}
        <div class="gallery-player relative w-full max-w-4xl mx-auto">
          <div class="image-container relative w-full rounded-2xl overflow-hidden shadow-xl">
            {galleryImages.value[currentIndex.value] && (
              <>
                <img
                  src={galleryImages.value[currentIndex.value].src}
                  alt={galleryImages.value[currentIndex.value].alt}
                  class="w-full max-h-[80vh] object-contain transition-opacity duration-500"
                  onError$={(event) => {
                    console.error('Image failed to load:', galleryImages.value[currentIndex.value].src);
                    // You could set a fallback image here
                    (event.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {/* Image title overlay */}
                {/* <div class="absolute bottom-4 left-4 text-white">
                  <h3 class="text-xl font-semibold">
                    {galleryImages.value[currentIndex.value].title}
                  </h3>
                </div> */}
              </>
            )}
          </div>

          <div class="flex gap-2 mt-4 justify-end">
            <button
              class="px-4 py-2 bg-white/80 dark:bg-secondary-800/80 text-secondary-900 dark:text-secondary-100 rounded-full shadow-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200"
              onClick$={goToPrev}
              aria-label="Previous slide"
            >
              <LuChevronLeft class="w-5 h-5" />
            </button>
            <button
              class="px-4 py-2 bg-white/80 dark:bg-secondary-800/80 text-secondary-900 dark:text-secondary-100 rounded-full shadow-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200"
              onClick$={toggleAutoPlay}
              aria-label={autoPlay.value ? "Pause carousel" : "Play carousel"}
            >
              {autoPlay.value ? <LuPause class="w-5 h-5" /> : <LuPlay class="w-5 h-5" />}
            </button>
            <button
              class="px-4 py-2 bg-white/80 dark:bg-secondary-800/80 text-secondary-900 dark:text-secondary-100 rounded-full shadow-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200"
              onClick$={goToNext}
              aria-label="Next slide"
            >
              <LuChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lightbox/Modal */}
        {selectedImage.value && (
          <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div class="relative max-w-4xl w-full bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden lightbox-content">
              <button
                class="absolute top-4 right-4 text-white hover:text-primary-300 transition-colors z-10"
                onClick$={() => (selectedImage.value = null)}
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                class="absolute top-4 left-4 text-white hover:text-primary-300 transition-colors z-10"
                onClick$={toggleFullscreen}
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5m11 11v-4m0 0h-4m4 0l-5-5m-6 6v4m0 0h4m-4 0l5-5" />
                </svg>
              </button>
              <img
                src={selectedImage.value.src}
                alt={selectedImage.value.alt}
                class="w-full h-auto max-h-[80vh] object-contain"
              />
              <div class="p-6 text-center">
                <h3 class="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                  {selectedImage.value.title}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Image Carousel - Hidden on mobile */}
        {galleryImages.value.length > 0 && (
          <div class="mt-8 hidden md:block">
            <div class="relative w-full max-w-4xl mx-auto overflow-hidden">
              <div
                class="flex space-x-4 pb-4"
                style={{ transform: `translateX(-${currentIndex.value * 144}px)`, transition: 'transform 0.3s ease' }}
              >
                {galleryImages.value.map((image, index) => (
                  <div
                    key={image.id}
                    class={`flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === currentIndex.value
                        ? "border-4 border-primary-500 shadow-lg scale-105"
                        : "border-2 border-transparent hover:border-primary-300"
                    }`}
                    onClick$={() => selectImage(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      class="w-full h-full object-cover"
                      width={128}
                      height={128}
                      loading="lazy"
                      onError$={(event) => {
                        console.error('Thumbnail failed to load:', image.src);
                        (event.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Come Join Us CTA */}
        <div class="text-center mt-12">
          <div class="bg-gradient-to-r max-w-xl mx-auto from-secondary-50/40 via-tertiary-50/40 to-primary-50/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-primary-200 dark:border-secondary-700 shadow-2xl">
            <h3 class="!text-3xl md:!text-4xl xdxd font-bold text-secondary-900 dark:text-secondary-100 mb-4">
              Come Join Us!
            </h3>
            <a
              ref={bookButtonRef}
              href="https://bookeo.com/earthenvessels"
              onClick$={handleBookClick}
              class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-secondary-800 via-tertiary-600 to-secondary-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span class="relative z-10">Book a Class</span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-500 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: `${SITE.title} - Gallery`,
  meta: [
    {
      name: "description",
      content: "Discover our stunning collection of handcrafted pottery images, showcasing the beauty of gathering, listening, connecting, and creating.",
    },
  ],
};
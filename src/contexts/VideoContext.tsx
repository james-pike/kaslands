import { useVisibleTask$ } from "@builder.io/qwik";

// Global video element and state stored outside of Qwik's reactivity
let globalVideo: HTMLVideoElement | null = null;
let videoContainer: HTMLDivElement | null = null;
const videoState = {
  isInitialized: false
};

const getOrCreateVideo = (): HTMLVideoElement => {
  if (!globalVideo) {
    // Create container div
    videoContainer = document.createElement('div');
    videoContainer.className = 'fixed inset-0 opacity-80 h-screen';
    videoContainer.style.height = '100svh';
    videoContainer.setAttribute('aria-hidden', 'true');

    // Create video element with all necessary attributes for autoplay
    globalVideo = document.createElement('video');
    globalVideo.setAttribute('autoplay', '');
    globalVideo.setAttribute('loop', '');
    globalVideo.setAttribute('muted', '');
    globalVideo.setAttribute('playsinline', '');
    globalVideo.autoplay = true;
    globalVideo.loop = true;
    globalVideo.muted = true;
    globalVideo.playsInline = true;
    globalVideo.defaultMuted = true; // Important for autoplay
    globalVideo.className = 'w-full h-full object-cover';

    // Set source directly on video element
    globalVideo.src = '/images/hero4.mp4';
    globalVideo.load(); // Explicitly load the video

    // Append video to container
    videoContainer.appendChild(globalVideo);

    // Insert container at the beginning of body
    if (document.body.firstChild) {
      document.body.insertBefore(videoContainer, document.body.firstChild);
    } else {
      document.body.appendChild(videoContainer);
    }

    console.log('Created new global video element');

    // Try to play immediately
    const playPromise = globalVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log('Video auto-play prevented, will retry on user interaction:', err);

        // Retry on any user interaction
        const startVideo = () => {
          if (globalVideo && globalVideo.paused) {
            globalVideo.play().then(() => {
              console.log('Video started after user interaction');
              document.removeEventListener('click', startVideo);
              document.removeEventListener('touchstart', startVideo);
              document.removeEventListener('keydown', startVideo);
            }).catch(e => console.log('Video play failed:', e));
          }
        };

        document.addEventListener('click', startVideo, { once: true });
        document.addEventListener('touchstart', startVideo, { once: true });
        document.addEventListener('keydown', startVideo, { once: true });
      });
    }

    videoState.isInitialized = true;
  }
  return globalVideo;
};

export const useVideoProvider = () => {
  // Initialize video on client
  useVisibleTask$(({ cleanup }) => {
    const video = getOrCreateVideo();

    // Ensure video is playing
    if (video.paused) {
      video.play().catch(err => {
        console.log('Video auto-play prevented:', err);
      });
    }

    cleanup(() => {
      // Don't remove the video element on cleanup
      // It should persist across navigations
    });
  });
};

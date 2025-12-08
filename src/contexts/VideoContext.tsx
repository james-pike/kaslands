import { useVisibleTask$ } from "@builder.io/qwik";

// Global video element stored outside of Qwik's reactivity
let globalVideo: HTMLVideoElement | null = null;
let videoContainer: HTMLDivElement | null = null;

const getOrCreateVideo = (): HTMLVideoElement => {
  if (!globalVideo) {
    // Create container div
    videoContainer = document.createElement('div');
    videoContainer.className = 'fixed inset-0 opacity-80 h-screen';
    videoContainer.style.height = '100svh';
    videoContainer.setAttribute('aria-hidden', 'true');

    // Create video element
    globalVideo = document.createElement('video');
    globalVideo.autoplay = true;
    globalVideo.loop = true;
    globalVideo.muted = true;
    globalVideo.playsInline = true;
    globalVideo.className = 'w-full h-full object-cover';

    // Create source element
    const source = document.createElement('source');
    source.src = '/images/hero4.mp4';
    source.type = 'video/mp4';
    globalVideo.appendChild(source);

    // Append video to container
    videoContainer.appendChild(globalVideo);

    // Insert container at the beginning of body
    if (document.body.firstChild) {
      document.body.insertBefore(videoContainer, document.body.firstChild);
    } else {
      document.body.appendChild(videoContainer);
    }

    console.log('Created new global video element');

    // Try to play
    globalVideo.play().catch(err => {
      console.log('Auto-play prevented:', err);
    });
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

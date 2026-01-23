import { createContextId, useSignal, useContextProvider, useContext, $, Signal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface AudioContextState {
  isPlaying: Signal<boolean>;
  toggleAudio: QRL<() => Promise<void>>;
}

export const AudioContext = createContextId<AudioContextState>('audio-context');

export const useAudioContext = () => {
  return useContext(AudioContext);
};

// Global audio element and state stored outside of Qwik's reactivity
let globalAudio: HTMLAudioElement | null = null;
const audioState = {
  hasAttemptedAutoplay: false
};

const getOrCreateAudio = (): HTMLAudioElement => {
  if (!globalAudio) {
    globalAudio = new Audio('/images/hero1.mp3');
    globalAudio.preload = 'auto';
    globalAudio.loop = true;
    console.log('Created new global audio element');
  }
  return globalAudio;
};

export const useAudioProvider = () => {
  const isPlaying = useSignal(false);

  // Initialize audio on client
  useVisibleTask$(({ cleanup }) => {
    const audio = getOrCreateAudio();

    const handleEnded = () => {
      isPlaying.value = false;
    };

    const handlePlay = () => {
      isPlaying.value = true;
    };

    const handlePause = () => {
      isPlaying.value = false;
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Sync initial state
    isPlaying.value = !audio.paused;

    // Try to auto-play (will likely be blocked by browser)
    if (audio.paused && !audioState.hasAttemptedAutoplay) {
      audioState.hasAttemptedAutoplay = true;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Audio auto-play prevented (expected in production):', err);

          // Set up one-time user interaction handler to start audio
          const startAudioOnInteraction = () => {
            if (audio.paused) {
              audio.play().then(() => {
                console.log('Audio started after user interaction');
              }).catch(e => {
                console.log('Audio play failed even after user interaction:', e);
              });
            }
            // Remove all listeners after first interaction
            document.removeEventListener('click', startAudioOnInteraction);
            document.removeEventListener('touchstart', startAudioOnInteraction);
            document.removeEventListener('keydown', startAudioOnInteraction);
          };

          // Listen for any user interaction to start audio
          document.addEventListener('click', startAudioOnInteraction, { once: true });
          document.addEventListener('touchstart', startAudioOnInteraction, { once: true });
          document.addEventListener('keydown', startAudioOnInteraction, { once: true });
        });
      }
    }

    cleanup(() => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    });
  });

  const toggleAudio = $(async () => {
    const audio = getOrCreateAudio();

    if (audio.paused) {
      try {
        await audio.play();
        console.log("Audio playing");
      } catch (error) {
        console.error("Failed to play audio:", error);
      }
    } else {
      audio.pause();
      console.log("Audio paused");
    }
  });

  const contextValue: AudioContextState = {
    isPlaying,
    toggleAudio,
  };

  useContextProvider(AudioContext, contextValue);

  return contextValue;
};

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

// Global audio element stored outside of Qwik's reactivity
let globalAudio: HTMLAudioElement | null = null;

const getOrCreateAudio = (): HTMLAudioElement => {
  if (!globalAudio) {
    globalAudio = new Audio('/images/hero1.mp3');
    globalAudio.preload = 'auto';
    globalAudio.loop = false;
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

    // Try to auto-play
    if (audio.paused) {
      audio.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
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

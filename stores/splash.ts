import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSplashStore = defineStore('splash', () => {
  const isRendered = ref(false);

  function setRendered() {
    isRendered.value = true;
  }

  function onRendered(callback: () => void) {
    const unwatch = watch(isRendered, (newValue) => {
      if (newValue) {
        callback();
        unwatch(); // Stop watching after the callback is called
      }
    });
  }

  return {
    isRendered,
    setRendered,
    onRendered,
  };
});

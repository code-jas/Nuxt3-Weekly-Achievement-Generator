import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useViewport() {
  const isMdAndAbove = ref<boolean>(false);

  const checkViewport = (): void => {
    if (typeof window !== 'undefined') {
      isMdAndAbove.value = window.innerWidth >= 768;
    }
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      checkViewport(); // Initial check when the component mounts
      window.addEventListener('resize', checkViewport);
    }
  });

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkViewport);
    }
  });

  return { isMdAndAbove };
}

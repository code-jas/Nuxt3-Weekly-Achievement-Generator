<template>
  <div class="flex items-center justify-center flex-col">
    <div ref="lottieContainer" style="width: 128px; height: 128px"></div>
    <p class="loading-text font-semibold text-xl">Generating...</p>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import lottie from 'lottie-web';
  import animationData from '@/data/animation-loading.json'; // Ensure you have a valid Lottie animation JSON file

  const lottieContainer = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    if (lottieContainer.value) {
      lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  });
</script>

<style scoped>
  .loading-text {
    background: linear-gradient(
      90deg,
      var(--branding) 25%,
      var(--branding-secondary) 50%,
      var(--branding) 75%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    color: transparent;
    animation: skeleton-loading 3s infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>

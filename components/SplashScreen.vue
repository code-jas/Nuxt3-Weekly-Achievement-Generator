<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useSplashStore } from '@/stores/useSplashStore';
  import warContent from '@/data/war-content.json';

  const splashStore = useSplashStore();
  const isVisible = ref(true);

  onMounted(() => {
    splashStore.onRendered(() => {
      isVisible.value = false;
    });
  });
</script>

<template>
  <div v-if="isVisible" class="splash-screen">
    <img :src="warContent.logo['192x192']" alt="Logo" class="logo" />
    <h1 class="font-krona text-2xl text-branding font-bold my-2">{{ warContent.title }}</h1>
    <h2 class="text-lg text-branding font-semibold">{{ warContent.description }}</h2>
  </div>
</template>

<style scoped>
  .splash-screen {
    @apply fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-background text-white z-50;
  }

  .logo {
    @apply w-32 h-32;
  }
</style>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useSplashStore } from '~/stores/useSplashStore';

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
    <img src="@/assets/images/logo/android-chrome-512x512.png" alt="Logo" class="logo" />
    <h1 class="font-krona text-2xl text-branding font-bold my-2">War Generator</h1>
    <h2 class="text-lg text-branding font-semibold">Report Success Weekly, Excel Daily</h2>
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

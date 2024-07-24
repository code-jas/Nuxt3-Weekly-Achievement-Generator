<script setup lang="ts">
const splashStore = useSplashStore();

onMounted(() => {
  splashStore.setRendered();
});
</script>

<template>
  <SplashScreen />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

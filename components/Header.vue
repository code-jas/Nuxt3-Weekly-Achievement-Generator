<template>
  <Toaster />
  <header class="bg-white bg-opacity-10 backdrop-blur-lg py-4 shadow-sm z-10">
    <div class="container mx-auto flex justify-between items-center px-6">
      <div class="flex items-center justify-center space-x-1">
        <img :src="warContent.logo['192x192']" alt="Logo" class="logo" />
        <div class="font-krona text-base text-branding hidden md:block">{{ warContent.title }}</div>
      </div>

      <div class="flex items-center justify-center space-x-3 pr-2">
        <RegisterModal />
        <ThemeButton />
      </div>
    </div>
  </header>
</template>

<script setup>
  import warContent from '@/data/war-content.json';
  import RegisterModal from './modals/RegisterModal.vue';
</script>

<style scoped>
  .logo {
    @apply w-10 h-10;
  }
</style>

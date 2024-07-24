<template>
  <header class="bg-white bg-opacity-10 backdrop-blur-lg py-4 rounded-lg shadow-sm">
    <div class="container mx-auto flex justify-between items-center px-6">
      <div class="flex items-center justify-center space-x-1">
        <img src="@/assets/images/logo/android-chrome-192x192.png" alt="Logo" class="logo" />
        <div class="font-krona text-base text-branding">War Generator</div>
      </div>

  
      <div class="flex items-center justify-center space-x-3 pr-2">
        <Button>Sign in</Button>
        <ThemeButton />
      </div>
    </div>
  </header>
</template>

<script setup>
import Logo from '~/components/Logo.vue'
</script>

<style scoped>
.logo {
  @apply w-10 h-10;
}
</style>

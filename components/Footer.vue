<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useFetch } from '@vueuse/core';
  import dayjs from 'dayjs';

  const serverTime = ref<string | null>(null);
  const error = ref(null);

  async function fetchServerTime() {
    const { data, error: fetchError }: any = await useFetch('/api/v1/clockify/server-time');

    if (fetchError.value) {
      console.error('Failed to fetch server time:', fetchError.value);
      error.value = fetchError.value;
    } else {
      try {
        const parsedData = JSON.parse(data.value || '{}');
        serverTime.value = dayjs(parsedData.time).format('MMM D, YYYY HH:mm:ss');
      } catch (e) {
        console.error('Failed to parse server time:', e);
        serverTime.value = null;
      }
    }
  }

  onMounted(() => {
    // Fetch the server time initially
    fetchServerTime();

    // Update the server time every 1 second
    const intervalId = setInterval(fetchServerTime, 1000);

    // Cleanup interval on component unmount
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });
  });
</script>

<template>
  <footer>
    <div class="flex flex-col items-center">
      <div class="flex items-center justify-between w-full">
        <div class="flex-grow border-t border-border"></div>
        <img src="@/assets/images/logo/android-chrome-512x512.png" alt="Logo" class="h-7 mx-4" />
        <div class="flex-grow border-t border-border"></div>
      </div>
      <div class="flex items-center justify-between w-full pt-3 pb-6 px-8">
        <div class="flex space-x-4 items-center">
          <h3 class="font-inter text-sm">Built with:</h3>
          <a href="#" aria-label="Nuxt">
            <img src="@/assets/images/nuxt.svg" alt="Nuxt" class="h-5" />
          </a>
        </div>
        <div class="text-sm" v-if="serverTime">Current server time: {{ serverTime }}</div>
        <div class="text-sm" v-else>Loading...</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { computed, watch, watchEffect } from 'vue';
  import { columns } from './columns-time-entries';
  import { useTimeEntriesStore } from '~/stores/useTimeEntriesStore';
  import DataTable from './DataTable.vue';

  const timeEntriesStore = useTimeEntriesStore();

  // Access reactive data from the store
  const timeEntries = computed(() => timeEntriesStore.timeEntries);
  const loading = computed(() => timeEntriesStore.loading);

  // Watch for changes in the error state and show a toast
  watch(
    () => timeEntriesStore.error,
    async (newError: any) => {
      console.log(`Title: ${newError?.title}, Description: ${newError?.description}`);
    },
  );

  // Optionally, fetch data when this component is mounted
  watchEffect(() => {
    if (!timeEntriesStore.timeEntries.length) {
      // Fetch with an initial date range or trigger an event to fetch
      // timeEntriesStore.fetchTimeEntries({ startDate, endDate });
    }
  });
</script>

<template>
  <div class="flex h-full flex-1 flex-col space-y-8 py-8 max-w-5xl mx-auto px-6">
    <DataTable :data="timeEntries" :columns="columns" :loading="loading" />
  </div>
  <Toaster />
</template>

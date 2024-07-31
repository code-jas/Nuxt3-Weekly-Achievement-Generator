<script setup lang="ts">
import { useTimeEntriesStore } from '~/stores/useTimeEntriesStore';
import DataTable from './DataTable.vue';
import { columns } from './columns-time-entries';
import { computed, watch, watchEffect } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();
const timeEntriesStore = useTimeEntriesStore();

// Access reactive data from the store
const timeEntries = computed(() => timeEntriesStore.timeEntries);
const loading = computed(() => timeEntriesStore.loading);
const error = computed(() => timeEntriesStore.error);

// Watch for changes in the error state and show a toast
watch(
  () => timeEntriesStore.error,
  async (newError: any) => {
    let errorMessage = '';
    if (newError?.response) {
      try {
        const response = await newError.response.json();
        errorMessage = response.message || response.error || 'An unexpected error occurred.';
      } catch (parseError) {
        errorMessage = 'An unexpected error occurred.';
      }
    } else {
      errorMessage = newError.message || 'An unexpected error occurred.';
    }
    toast({ title: 'Failed', description: errorMessage });
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
  <div class="flex h-full flex-1 flex-col space-y-8 py-8 max-w-7xl mx-auto">
    <template v-if="error">
      <p>Error: {{ error.message }}</p>
    </template>
    <DataTable :data="timeEntries" :columns="columns" :loading="loading" />
  </div>
  <Toaster />
</template>

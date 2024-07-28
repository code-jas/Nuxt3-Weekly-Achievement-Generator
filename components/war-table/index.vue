<script setup lang="ts">
import { useTimeEntriesStore } from '~/stores/useTimeEntriesStore';
import DataTable from './DataTable.vue';
import { columns } from './columns-time-entries';
import { computed, watchEffect } from 'vue';

const timeEntriesStore = useTimeEntriesStore();

// Access reactive data from the store
const timeEntries = computed(() => timeEntriesStore.timeEntries);
const loading = computed(() => timeEntriesStore.loading);
const error = computed(() => timeEntriesStore.error);

// Optionally, fetch data when this component is mounted
watchEffect(() => {
  if (!timeEntriesStore.timeEntries.length) {
    // Fetch with an initial date range or trigger an event to fetch
    // timeEntriesStore.fetchTimeEntries({ startDate, endDate });
  }
});
</script>

<template>
  <div class="flex h-full flex-1 flex-col space-y-8 p-8">
    <template v-if="loading">
      <p>Loading...</p>
    </template>
    <template v-else-if="error">
      <p>Error: {{ error.message }}</p>
    </template>
    <template v-else>
      <pre>time entries: {{ timeEntries }}</pre>
    </template>
    <DataTable :data="timeEntries" :columns="columns" />
  </div>
</template>

<!-- <script setup lang="ts">
import timeEntries from '~/data/time-entries.json'
import DataTable from './DataTable.vue'
// import { columns } from './columns'
import { columns } from './columns-time-entries'
</script>

<template>
  <div class="flex h-full flex-1 flex-col space-y-8 p-8">
    <DataTable :data="timeEntries" :columns="columns" />
  </div>
</template> -->

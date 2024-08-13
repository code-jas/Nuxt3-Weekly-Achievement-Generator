<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getLocalTimeZone, type DateValue } from '@internationalized/date';

  import type { Table } from '@tanstack/vue-table';
  import type { TimeEntry } from '~/types/time-entry';
  import type { DateRange } from 'radix-vue';

  import warContent from '@/data/war-content.json';

  import { useTimeEntriesStore } from '~/stores/useTimeEntriesStore';
  import { useLogger } from '~/composables/useLogger';

  import DataTableViewOptions from './DataTableViewOptions.vue';
  import ExportPreview from '../modals/ExportPreview.vue';
  import type { DateRangeQuery } from '~/types/clockify-time-entry';

  interface DataTableToolbarProps {
    table: Table<TimeEntry>;
  }
  defineProps<DataTableToolbarProps>();

  const value = ref<DateRange>();
  const popoverOpen = ref(false);

  const query = ref<DateRangeQuery>({ start: '', end: '' });

  const timeEntriesStore = useTimeEntriesStore();
  const { logDateRange } = useLogger();
  watch(value, (newValue) => {
    console.log('watch  popover:>> ', popoverOpen.value);
    if (newValue && newValue.start && newValue.end) {
      const { start, end } = newValue;
      const formatToEndOfDay = (date: DateValue): DateValue => {
        let endOfDay = date.add({ days: 1 });
        return endOfDay;
      };

      const q = {
        start: start.toDate(getLocalTimeZone()).toISOString(),
        end: formatToEndOfDay(end).toDate(getLocalTimeZone()).toISOString(),
      };

      query.value = q;
      timeEntriesStore.fetchTimeEntries(q);
      logDateRange(q);
      popoverOpen.value = false;
    }
  });
</script>

<template>
  <div class="flex items-center justify-between space-y-2">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{{ warContent.reports.title }}</h2>
      <p class="text-muted-foreground">{{ warContent.reports.description }}</p>
    </div>
    <div class="flex items-center space-x-3">
      <DateRangePicker v-model="value" v-model:open="popoverOpen" />
      <DataTableViewOptions :table="table" />
      <ExportPreview :table="table" :dateRange="query" />
    </div>
  </div>
</template>

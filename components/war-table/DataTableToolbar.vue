<script setup lang="ts">
  import { ref, watch } from 'vue';
  import {
    getLocalTimeZone,
    parseDate,
    ZonedDateTime,
    type DateValue,
  } from '@internationalized/date';

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
    if (newValue && newValue.start && newValue.end) {
      const { start, end } = newValue;
      console.log('newValue :>> ', newValue);

      const formatToEndOfDay = (date: DateValue): DateValue => {
        // Adjust manually to end of day considering timezone
        const endOfDay = date.add({ days: 1 });
        return endOfDay.subtract({ seconds: 1 }); // Set to the end of the previous day
      };

      const toISOStringWithTimezone = (date: DateValue): string => {
        const localTime = new Date(date.toDate(getLocalTimeZone()).getTime());
        const timezoneOffset = 8 * 60 * 60 * 1000; // 8 hours offset for Asia/Manila
        const adjustedTime = new Date(localTime.getTime() + timezoneOffset);
        return adjustedTime.toISOString();
      };

      const q = {
        start: toISOStringWithTimezone(start),
        end: toISOStringWithTimezone(formatToEndOfDay(end)),
      };

      console.log('q :>> ', q);

      query.value = q;
      timeEntriesStore.fetchTimeEntries(q);
      logDateRange(q);
      popoverOpen.value = false;
    }
  });
</script>

<template>
  <div
    class="flex flex-col text-center md:flex-row md:text-left items-center justify-between gap-6 md:gap-4"
  >
    <div>
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight">{{ warContent.reports.title }}</h2>
      <p class="text-muted-foreground">{{ warContent.reports.description }}</p>
    </div>
    <div class="flex w-full justify-between md:w-auto md:justify-right items-center gap-x-3">
      <DateRangePicker v-model="value" v-model:open="popoverOpen" />
      <div class="flex items-center gap-x-3">
        <DataTableViewOptions :table="table" />
        <ExportPreview :table="table" :dateRange="query" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';

import { Calendar as CalendarIcon } from 'lucide-vue-next';
import type { DateRange } from 'radix-vue';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { useTimeEntriesStore } from '~/stores/useTimeEntriesStore';

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

const value = ref<DateRange>();
const popoverOpen = ref(false);
const timeEntriesStore = useTimeEntriesStore();

watch(value, (newValue) => {
  if (newValue && newValue.start && newValue.end) {
    popoverOpen.value = false;

    const { start, end } = newValue;
    const formatToEndOfDay = (date: DateValue): DateValue => {
      let endOfDay = date.add({ days: 1 });
      return endOfDay;
    };

    const query = {
      start: start.toDate(getLocalTimeZone()).toISOString(),
      end: formatToEndOfDay(end).toDate(getLocalTimeZone()).toISOString(),
    };

    timeEntriesStore.fetchTimeEntries(query);

    logFormat(query);
  }
});

const logFormat = (query: { start: string; end: string }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Manila',
    hour12: false,
  };
  const formattedStart = new Intl.DateTimeFormat('en-US', options).format(new Date(query.start));
  const formattedEnd = new Intl.DateTimeFormat('en-US', options).format(new Date(query.end));

  console.log('Start:', formattedStart);
  console.log('End:', formattedEnd);
};
</script>

<template>
  <Popover v-model:open="popoverOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn('justify-start text-left font-normal', !value ? 'text-muted-foreground' : '')"
      >
        <CalendarIcon class="mr-2 h-4 w-4 text-foreground" />
        <template v-if="value && value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>
          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Select date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="
          (startDate) =>
            value ? (value.start = startDate) : (value = { start: startDate, end: undefined })
        "
        @update:end-value="
          (endDate: DateValue | undefined) =>
            (value && (value.end = endDate)) || (value = { start: value?.start, end: endDate })
        "
      />
    </PopoverContent>
  </Popover>
</template>

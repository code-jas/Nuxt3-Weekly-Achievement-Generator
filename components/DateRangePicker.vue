<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { cn } from '@/lib/utils';
  import { Calendar as CalendarIcon } from 'lucide-vue-next';
  import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';

  import type { DateRange } from 'radix-vue';

  import { RangeCalendar } from '@/components/ui/range-calendar';
  import { Button } from '@/components/ui/button';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

  const df = new DateFormatter('en-US', {
    dateStyle: 'medium',
  });

  const value = defineModel<DateRange>();
  const open = defineModel<boolean>('open');

</script>

<template>
  <Popover v-model:open="open">
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

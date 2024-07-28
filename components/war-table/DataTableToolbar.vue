<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import { computed } from 'vue';
import { CloudDownload } from 'lucide-vue-next';

import DataTableViewOptions from './DataTableViewOptions.vue';
import { Button } from '@/components/ui/button';
import type { TimeEntry } from '~/types/time-entry';

interface DataTableToolbarProps {
  table: Table<TimeEntry>;
}

const props = defineProps<DataTableToolbarProps>();

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>

<template>
  <div class="flex items-center justify-between space-y-2">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Your Reports</h2>
      <p class="text-muted-foreground">Here&apos;s a list of your tasks for this week!</p>
    </div>
    <div class="flex items-center space-x-3">
      <DateRangePicker />
      <DataTableViewOptions :table="table" />
      <Button> <CloudDownload class="mr-2 text-sm w-4 h-4" /> Export </Button>
      <!-- <UserNav /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import timeEntries from '@/data/time-entries.json'
import DataTable from './DataTable.vue'
// import { columns } from './columns'
import { columns } from './columns-time-entries'
import { CloudDownload } from 'lucide-vue-next';
</script>

<template>
  <div class="flex h-full flex-1 flex-col space-y-8 p-8">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">
          Your Reports
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your tasks for this week!
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button >
          <CloudDownload class="mr-2 text-sm w-4 h-4" /> Export
        </Button>
        <!-- <UserNav /> -->
      </div>
    </div>
    <!-- <pre>{{ timeEntries }}</pre>
    <pre>{{ columns }}</pre> -->
    <DataTable :data="timeEntries" :columns="columns" />
  </div>
</template>

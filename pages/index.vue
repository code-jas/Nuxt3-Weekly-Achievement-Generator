<script setup lang="ts">
import { CloudDownload } from 'lucide-vue-next';
</script>

<template>
  <Header />
  <!-- <RangePicker/> -->

  <div class="flex-col md:flex">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          Your Reports
        </h2>
        <div class="flex items-center space-x-4">
          <DateRangePicker />
          <Button >
            <CloudDownload class="mr-2 text-sm w-4 h-4" />
            Export
          </Button>
        </div>

      </div>
      <ReportTable/>
    </div>
  </div>


</template>
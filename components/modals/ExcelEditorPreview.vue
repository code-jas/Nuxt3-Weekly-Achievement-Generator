<script setup lang="ts">
  import { ref, defineModel } from 'vue';
  import type { RecordType, ColumnType } from '~/types/vue-excel-editor';

  const records = defineModel<RecordType[]>('records', { default: [] });
  const originalRecords = defineModel<RecordType[]>('originalRecords', { default: [] });
  const columns = defineModel<ColumnType[]>('columns', {
    default: [
      { field: 'date', label: 'Date', type: 'string', width: '100px' },
      { field: 'description', label: 'Activities/Tasks', type: 'string', width: '300px' },
      { field: 'startTime', label: 'Start Time', type: 'string', width: '100px' },
      { field: 'endTime', label: 'End Time', type: 'string', width: '100px' },
      { field: 'duration', label: 'No. of Hours', type: 'number', width: '100px' },
      { field: 'remarks', label: 'Remarks', type: 'string', width: '100px' },
    ],
  });

  const getHeaderLabel = (col: ColumnType) => {
    return col.label;
  };

  const onUpdate = (updatedRecords: RecordType[]) => {
    console.log('Records updated:', updatedRecords);
  };

  records.value = [
    {
      date: '2024-07-01',
      activities: 'Task 1',
      startTime: '09:00',
      endTime: '10:00',
      hours: 1,
      remarks: 'Done',
    },
  ];
</script>

<template>
  {{ columns }}
  <ClientOnly>
    <vue-excel-editor v-model="records" @update="onUpdate" ref="excelEditor">
      <vue-excel-column v-for="(item, index) in columns" :key="index" v-bind="item" />
    </vue-excel-editor>
  </ClientOnly>
</template>

<style>
  /* Custom styles for the editor */
  .vue-excel-editor-header,
  .vue-excel-editor-cell {
    border: 1px solid #000;
  }

  .vue-excel-editor-header {
    background-color: #f0f0f0;
    font-weight: bold;
  }

  .vue-excel-editor-cell {
    padding: 5px;
    text-align: center;
  }
</style>

import type { ColumnDef } from '@tanstack/vue-table';
import type { TimeEntry } from '~/types/time-entry';
import DataTableColumnHeader from './DataTableColumnHeader.vue';
import { h } from 'vue';

export const columns: ColumnDef<TimeEntry>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Date' }),
    cell: ({ row }) => h('div', {}, row.getValue('date')),
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Description' }),
    cell: ({ row }) => h('div', { class: 'max-w-[800px] truncate' }, row.getValue('description')),
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Start Time' }),
    cell: ({ row }) => h('div', {}, row.getValue('startTime')),
    enableSorting: true,
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'End Time' }),
    cell: ({ row }) => h('div', {}, row.getValue('endTime')),
    enableSorting: true,
  },
  {
    accessorKey: 'formattedDuration',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Duration' }),
    cell: ({ row }) => h('div', {}, row.getValue('formattedDuration')),
    enableSorting: true,
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
  //   cell: ({ row }) => {
  //     const status = row.getValue('status')
  //     const badgeColor = status === 'entry' ? 'blue' : status === 'day' ? 'green' : 'gray'

  //     return h(Badge, { color: badgeColor }, () => status)
  //   },
  //   enableSorting: true,
  // },
];

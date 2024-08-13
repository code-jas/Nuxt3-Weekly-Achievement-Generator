<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';

  import { memeSvgs } from '@/data/meme';
  import warContent from '@/data/war-content.json';

  import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
  } from '@tanstack/vue-table';
  import type { TimeEntry } from '@/types/time-entry';

  import {
    FlexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
  } from '@tanstack/vue-table';
  import DataTablePagination from './DataTablePagination.vue';
  import DataTableToolbar from './DataTableToolbar.vue';
  import { valueUpdater } from '@/lib/utils';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

  interface DataTableProps {
    columns: ColumnDef<TimeEntry, any>[];
    data: TimeEntry[];
    pageSize?: number;
    loading?: boolean;
  }
  const props = defineProps<DataTableProps>();

  // const memeImages = [
  //   '/images/meme/01.svg',
  //   // '/images/meme/02.svg',
  //   // '/images/meme/03.svg',
  //   // '/images/meme/04.svg',
  //   // '/images/meme/05.svg',
  // ];

  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref({});
  const pagination = ref({
    pageIndex: 0,
    pageSize: props.pageSize ?? 20,
  });

  const table = useVueTable({
    get data() {
      return props.data;
    },
    get columns() {
      return props.columns;
    },
    state: {
      get sorting() {
        return sorting.value;
      },
      get columnFilters() {
        return columnFilters.value;
      },
      get columnVisibility() {
        return columnVisibility.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
      get pagination() {
        return pagination.value;
      },
    },
    enableRowSelection: true,
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
    onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, pagination),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const randomMemeImage = computed(() => {
    const randomIndex = Math.floor(Math.random() * memeSvgs.length);
    return memeSvgs[randomIndex];
  });
</script>

<template>
  <div class="space-y-6">
    <DataTableToolbar :table="table" />
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" :loading>
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center space-y-6 p-12">
              <div class="flex flex-col items-center justify-center w-full">
                <div class="h-full">
                  <div
                    v-html="randomMemeImage"
                    class="svg-container"
                    style="fill: var(--branding)"
                  ></div>
                </div>
              </div>
              <p class="text-lg text-muted-foreground">{{ warContent.reports.tableEmpty }}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>

<style>
  .svg-container svg {
    width: 180px;
    height: 180px;
    display: block;
  }
</style>

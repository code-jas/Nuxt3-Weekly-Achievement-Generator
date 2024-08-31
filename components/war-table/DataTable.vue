<script setup lang="ts">
  import { computed, defineComponent, onMounted, reactive, ref, type Directive } from 'vue';

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
                <TooltipProvider
                  :delay-duration="100"
                  v-if="cell.column.id === 'description'"
                  class="tooltip-responsive"
                >
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <div
                        class="max-w-[280px] sm:max-w-[420px] md:max-w-[600px] lg:max-w-[700px] truncate"
                      >
                        {{ cell.getValue() }}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {{ cell.getValue() }}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <FlexRender
                  v-else
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center space-y-6 p-12">
              <div class="flex flex-col items-center justify-center w-1/2 sm:w-full">
                <div class="h-full">
                  <div
                    v-html="randomMemeImage"
                    class="svg-container"
                    style="fill: var(--branding)"
                  ></div>
                </div>
              </div>
              <p class="text-lg text-muted-foreground w-1/2 sm:w-full">
                {{ warContent.reports.tableEmpty }}
              </p>
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
  .tooltip-responsive {
    max-width: 90vw; /* Makes sure the tooltip doesn't exceed 90% of the viewport width */
    white-space: normal; /* Allows text to wrap to new lines */
    word-wrap: break-word; /* Breaks long words to fit within the container */
    padding: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 4px;
  }

  @media (min-width: 1024px) {
    .tooltip-responsive {
      max-width: 50vw; /* Adjust the width for larger screens */
    }
  }
</style>

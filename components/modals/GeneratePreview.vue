<script setup lang="ts">
  import { ref, computed, toValue, onMounted, watch } from 'vue';
  import { CloudDownload, X } from 'lucide-vue-next';

  import type { Table } from '@tanstack/vue-table';
  import type { TimeEntry } from '~/types/time-entry';
  import type { DateRangeQuery } from '~/types/clockify-time-entry';

  import { useToast } from '@/components/ui/toast/use-toast';
  import { useFetch } from '@vueuse/core';

  const { toast } = useToast();

  interface DataTableViewOptionsProps {
    table: Table<TimeEntry>;
    dateRange: DateRangeQuery | null;
  }

  const props = defineProps<DataTableViewOptionsProps>();

  const thumbnailUrl = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const userInvalid = ref<boolean>(true);
  const dialogOpen = ref<boolean>(false);

  const fetchUserData = async () => {
    try {
      const { data: res } = await useFetch('/api/v1/user');
      const data = JSON.parse(toValue(res));
      userInvalid.value = !data.data;
      console.log('userInvalid.value :>> ', userInvalid.value);
    } catch (error) {
      userInvalid.value = true;
    }
  };

  onMounted(() => {
    fetchUserData();
    console.log('userInvalid :>> ', userInvalid);
  });

  watch(
    () => props.dateRange,
    (newVal) => {
      fetchUserData();
    },
    { immediate: true },
  );

  // Computed property to check if dateRange is null or empty
  const isExportDisabled = computed(() => {
    const dateRangeInvalid = !props.dateRange || !props.dateRange.start || !props.dateRange.end;
    return dateRangeInvalid || toValue(userInvalid);
  });

  const tooltipContent = computed(() => {
    console.log('tooltipContent userInvalid :>> ', userInvalid);
    if (toValue(userInvalid)) return 'User not found. Please register.';

    if (!props.dateRange || !props.dateRange.start || !props.dateRange.end)
      return 'Please select a date range to export';

    return 'Export the data to Excel';
  });

  const previewExcel = async () => {
    if (!props.table || !props.table.options || !props.table.options.data) {
      toast({
        title: 'Error',
        description: 'No data available for export.',
      });
      return;
    }

    if (!props.dateRange) {
      toast({
        title: 'Error',
        description: 'Invalid date range.',
      });
      return;
    }

    const requestBody = {
      entries: props.table.options.data,
      periodCovered: props.dateRange,
    };

    console.log('requestBody :>> ', requestBody);

    isLoading.value = true;
    dialogOpen.value = true;

    try {
      const { url }: { url: string } = await $fetch(`/api/v1/clockify/generate-war`, {
        method: 'POST',
        body: requestBody,
      });

      // Assuming the URL is returned from the API
      thumbnailUrl.value = url;
    } catch (error: any) {
      console.error('Error occurred while previewing the Excel:', error);
      toast({
        title: 'Error',
        description: 'Failed to Preview the Excel',
      });
    } finally {
      isLoading.value = false;
    }
  };

  const onClose = () => {
    console.log('closed');
    dialogOpen.value = false;
    thumbnailUrl.value = null;
  };

  const handleOutsideClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
</script>

<template>
  <div>
    <Toaster />
    <div>
      <TooltipProvider :delayDuration="100">
        <Tooltip>
          <TooltipTrigger as-child>
            <div>
              <Button @click="previewExcel" :disabled="isLoading || isExportDisabled">
                <CloudDownload class="mr-2 text-sm w-4 h-4" />
                <span v-if="isLoading">Loading...</span>
                <span v-else>Export</span>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ tooltipContent }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Dialog v-model:open="dialogOpen" :disableOutsidePointerEvents="true">
      <DialogContent
        class="sm:max-w-[1110px]"
        :disableOutsidePointerEvents="true"
        :trapFocus="true"
        @pointerDownOutside="handleOutsideClick"
      >
        <DialogHeader>
          <DialogTitle>Export Weekly Report</DialogTitle>
          <DialogDescription>
            Download your Weekly Achievement Report (WAR) in Excel format.
          </DialogDescription>
          <div class="flex items-center justify-center w-full h-[600px]">
            <v-motion
              v-if="isLoading"
              class="w-full h-full flex items-center justify-center"
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1 }"
              :leave="{ opacity: 0 }"
              transition="{ duration: 0.8 }"
            >
              <Loading />
            </v-motion>
            <v-motion
              v-if="thumbnailUrl"
              class="w-full h-full rounded-lg overflow-hidden"
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1 }"
              :leave="{ opacity: 0 }"
              transition="{ duration: 0.8 }"
              style="margin-top: 20px"
            >
              <iframe
                :src="thumbnailUrl"
                width="100%"
                height="100%"
                frameborder="0"
                class="zoom-out-iframe"
              />
            </v-motion>
          </div>
        </DialogHeader>

        <DialogFooter as="div" class="mt-4 space-x-2">
          <DialogClose as-child>
            <Button type="button" variant="secondary" @click="onClose">Cancel</Button>
          </DialogClose>
          <Button @click="() => {}">Download</Button>
        </DialogFooter>
        <DialogClose
          class="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          as="button"
          @click="onClose"
        >
          <X class="w-6 h-6" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
  .zoom-out-iframe {
    transform: scale(0.924); /* Adjust the scale value as needed */
    transform-origin: 0 0;
    width: 120%; /* 100% / 0.75 to compensate for the scaling */
    height: 120%;
    border: none;
  }
</style>

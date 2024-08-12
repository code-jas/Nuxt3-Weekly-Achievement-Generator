<script setup lang="ts">
  import { ref, computed, toValue, onMounted, watch, reactive } from 'vue';
  import { CloudDownload, X } from 'lucide-vue-next';
  import { useFetch } from '@vueuse/core';

  import type { Table } from '@tanstack/vue-table';
  import type { TimeEntry } from '~/types/time-entry';
  import type { DateRangeQuery } from '~/types/clockify-time-entry';
  import type { ApiResponse } from '~/types/api';

  import { useToast } from '@/components/ui/toast/use-toast';
  import { useErrorHandler } from '@/composables/useErrorHandler';
  import { useUserStore } from '~/stores/useUserStore';

  const { toast } = useToast();
  const { handleError } = useErrorHandler();
  const userStore = useUserStore();

  interface DataTableViewOptionsProps {
    table: Table<TimeEntry>;
    dateRange: DateRangeQuery | null;
  }

  interface FormExport {
    filename?: string;
    folderId: string | null;
    fileId: string | null;
    previewUrl: string | null;
    emailReport: boolean;
    driveLink: boolean;
    slackReport: boolean;
  }

  const props = defineProps<DataTableViewOptionsProps>();

  let formExport = reactive<FormExport>({
    fileId: null,
    filename: 'weekly-achievement-report.xlsx',
    folderId: null,
    previewUrl: null,
    emailReport: false,
    driveLink: false,
    slackReport: false,
  });

  const isLoading = ref<boolean>(false);
  const isExportLoading = ref<boolean>(false);
  const userInvalid = ref<boolean>(true);
  const dialogOpen = ref<boolean>(false);

  // const fetchUserData = async () => {
  //   try {
  //     const { data: res } = await useFetch('/api/v1/user');
  //     const data = JSON.parse(toValue(res) as string);
  //     userInvalid.value = !data.data;
  //     console.log('userInvalid.value :>> ', userInvalid.value);
  //   } catch (error) {
  //     userInvalid.value = true;
  //   }
  // };

  // onMounted(() => {
  //   fetchUserData();
  //   console.log('userInvalid :>> ', userInvalid);
  // });

  // watch(
  //   () => props.dateRange,
  //   (newVal) => {
  //     fetchUserData();
  //   },
  //   { immediate: true },
  // );

  // Computed property to check if dateRange is null or empty
  const isExportDisabled = computed(() => {
    const dateRangeInvalid = !props.dateRange || !props.dateRange.start || !props.dateRange.end;
    return dateRangeInvalid || userStore.userInvalid;
  });

  const tooltipContent = computed(() => {
    // console.log('tooltipContent userInvalid :>> ', userInvalid);
    if (userStore.userInvalid) return 'User not found. Please register.';

    if (!props.dateRange || !props.dateRange.start || !props.dateRange.end)
      return 'Please select a date range to export';

    return 'Export the data to Excel';
  });

  const previewFile = async () => {
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
      const response: ApiResponse = await $fetch(`/api/v1/clockify/generate-war`, {
        method: 'POST',
        body: requestBody,
      });

      if (!response.data || !response.data.fileId) {
        throw new Error('Invalid response from the API');
      }

      const { fileId, filename, folderId } = response.data;

      // Assuming the URL is returned from the API
      formExport.filename = filename;
      formExport.fileId = fileId;
      formExport.folderId = folderId;
      formExport.previewUrl = `https://docs.google.com/spreadsheets/d/${fileId}/preview`;
    } catch (error: any) {
      const { title, description } = handleError(error);
      isLoading.value = false;
      dialogOpen.value = false;

      // You can manually trigger the toast here if needed
      console.log(`Title: ${title}, Description: ${description}`);
    } finally {
      isLoading.value = false;
    }
  };

  const exportReport = async () => {
    try {
      isExportLoading.value = true;
      const response = await fetch(`/api/v1/clockify/export-war`, {
        method: 'POST',
        body: JSON.stringify(formExport),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response :>>  ', response);
      if (response.ok) {
        const blob = await response.blob();
        console.log('Blob size:', blob.size);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = formExport.filename || 'weekly-achievement-report.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        toast({
          title: 'Success',
          description: 'Exported successfully',
        });
        onClose();
      } else {
        toast({
          title: 'Error',
          description: 'Failed to export',
        });
      }
    } catch (error) {
      console.error('Error occurred while exporting the Excel:', error);
      toast({
        title: 'Error',
        description: 'Failed to export the Excel',
      });
    } finally {
      isExportLoading.value = false;
    }
  };

  const onClose = () => {
    console.log('closed');
    dialogOpen.value = false;
    formExport.previewUrl = null;
  };

  const handleOutsideClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
</script>

<template>
  <div>
    <Toaster />
    <div>
      <TooltipProvider :delay-duration="100">
        <Tooltip>
          <TooltipTrigger as-child>
            <div>
              <Button :disabled="isLoading || isExportDisabled" @click="previewFile">
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
        :disable-outside-pointer-events="true"
        :trap-focus="true"
        @pointerDownOutside="handleOutsideClick"
      >
        <DialogHeader>
          <DialogTitle>Export Weekly Report</DialogTitle>
          <DialogDescription>
            Download your Weekly Achievement Report (WAR) in Excel format.
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col justify-center w-full h-[600px] px-6 space-y-6">
          <div v-if="isLoading" class="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
          <div v-if="formExport.previewUrl" class="w-full h-full rounded-lg overflow-hidden">
            <iframe
              :src="formExport.previewUrl"
              width="100%"
              height="100%"
              frameborder="0"
              class="zoom-out-iframe"
            />
          </div>
          <div class="flex items-top space-x-2">
            <Checkbox v-model:checked="formExport.emailReport" />
            <div class="grid gap-1.5 leading-none">
              <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Send report to email
              </label>
              <p class="text-sm text-muted-foreground">
                This will send your report to the HR department. Please verify that you are using a
                company email address.
              </p>
            </div>
          </div>
          <div class="flex items-top space-x-2">
            <Checkbox v-model:checked="formExport.driveLink" />
            <div class="grid gap-1.5 leading-none">
              <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Save to Google Drive & Email Link
              </label>
              <p class="text-sm text-muted-foreground">
                Saves the report to Google Drive and emails a link to HR for access to all generated
                reports.
              </p>
            </div>
          </div>
          <div class="flex items-top space-x-2">
            <Checkbox v-model:checked="formExport.slackReport" :disabled="true" />
            <div class="grid gap-1.5 leading-none">
              <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Send report to Slack
              </label>
              <p class="text-sm text-muted-foreground">
                Under maintenance. Please use the email option for now.
                <!-- This will send your report to the designated Slack channel. Ensure you have the
                necessary permissions to post in this channel. -->
              </p>
            </div>
          </div>
        </div>

        <DialogFooter as="div" class="mt-4 space-x-2">
          <DialogClose as-child>
            <Button type="button" variant="secondary" @click="onClose"> Cancel </Button>
          </DialogClose>
          <Button :disabled="isExportLoading" @click="exportReport">
            {{ isExportLoading ? 'Loading...' : 'Download' }}
          </Button>
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

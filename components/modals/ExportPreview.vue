<script setup lang="ts">
  import { ref, computed, toValue, onMounted, watch, reactive } from 'vue';
  import { CloudDownload, X } from 'lucide-vue-next';

  import warContent from '@/data/war-content.json';

  import type { Table } from '@tanstack/vue-table';
  import type { TimeEntry } from '@/types/time-entry';
  import type { DateRangeQuery } from '@/types/clockify-time-entry';
  import type { ApiResponse } from '@/types/api';

  import { useToast } from '@/components/ui/toast/use-toast';
  import { useErrorHandler } from '@/composables/useErrorHandler';
  import { useUserStore } from '~/stores/useUserStore';

  import { useViewport } from '~/composables/useViewPort';

  const { toast } = useToast();
  const { handleError } = useErrorHandler();
  const userStore = useUserStore();

  interface DataTableViewOptionsProps {
    table: Table<TimeEntry>;
    dateRange: DateRangeQuery | null;
  }

  interface FormExport {
    [key: string]: string | boolean | null | undefined;
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
    filename: 'weekly-accomplishment-report.xlsx',
    folderId: null,
    previewUrl: null,
    emailReport: false,
    driveLink: false,
    slackReport: false,
  });

  const { isMdAndAbove } = useViewport();

  const isLoading = ref<boolean>(false);
  const isIframeLoading = ref<boolean>(false);
  const isExportLoading = ref<boolean>(false);
  const iframeLoadError = ref(false);
  // const userInvalid = ref<boolean>(true);
  const dialogOpen = ref<boolean>(false);

  const checkboxOptions = reactive([
    {
      model: 'emailReport',
      label: 'Send report to email',
      description:
        'This will send your report to the HR department. Please verify that you are using a company email address.',
      disabled: false,
    },
    {
      model: 'driveLink',
      label: 'Save to Google Drive & Email Link',
      description:
        'Saves the report to Google Drive and emails a link to HR for access to all generated reports.',
      disabled: false,
    },
    {
      model: 'slackReport',
      label: 'Send report to Slack',
      description: 'Under maintenance. Please use the email option for now.',
      disabled: true,
    },
  ]);

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
    isIframeLoading.value = true;
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

  const onIframeLoad = () => {
    console.log('called onIframeLoad');
    isIframeLoading.value = false;
  };

  const onIframeError = () => {
    iframeLoadError.value = true;
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
                <CloudDownload class="text-sm w-4 h-4" />
                <span v-if="isMdAndAbove" class="ml-2">{{
                  isLoading ? 'Loading...' : 'Export'
                }}</span>
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
        class="overflow-y-auto max-h-full md:max-w-[86%] xl:max-w-[1168px] md:max-h-[calc(100vh-6rem)]"
        :disable-outside-pointer-events="true"
        :trap-focus="true"
        @pointerDownOutside="handleOutsideClick"
      >
        <DialogHeader>
          <DialogTitle>{{ warContent.reports.export.title }}</DialogTitle>
          <DialogDescription>
            {{ warContent.reports.export.description }}
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col justify-center w-full h-[600px] px-6 space-y-6">
          <div
            v-if="isLoading && isIframeLoading"
            class="w-full h-full flex items-center justify-center"
          >
            <Loading />
          </div>
          <div v-if="formExport.previewUrl" class="w-full h-full rounded-lg overflow-hidden">
            <iframe
              :src="formExport.previewUrl"
              width="100%"
              height="100%"
              frameborder="0"
              class="zoom-out-iframe"
              @load="onIframeLoad"
              @error="onIframeError"
              v-show="!isIframeLoading"
            />
          </div>
          <div v-if="iframeLoadError" class="error-message">
            <p>Failed to load the document. Please try again later.</p>
          </div>
          <div
            v-for="option in checkboxOptions"
            :key="option.model"
            class="flex items-top space-x-2"
          >
            <Checkbox v-model:checked="formExport[option.model]" :disabled="option.disabled" />
            <div class="grid gap-1.5 leading-none">
              <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {{ option.label }}
              </label>
              <p class="text-sm text-muted-foreground">{{ option.description }}</p>
            </div>
          </div>
        </div>

        <DialogFooter as="div" class="mt-4 flex gap-2">
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
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Mobile screens */
  @media (max-width: 768px) {
    .zoom-out-iframe {
      transform: scale(0.4); /* Scale down to 40% */
      transform-origin: 0 0;
      width: 250%; /* 100% / 0.4 to compensate for the scaling */
      height: 250%;
    }
  }
  /* Larger screens */
  @media (min-width: 769px) {
    .zoom-out-iframe {
      transform: scale(0.7);
      transform-origin: 0 0;
      width: 142.86%;
      height: 142.86%;
    }
  }

  @media (min-width: 1024px) {
    .zoom-out-iframe {
      transform: scale(0.924);
      transform-origin: 0 0;
      width: 120%;
      height: 120%;
    }
  }
</style>

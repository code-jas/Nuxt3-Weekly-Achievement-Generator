// composables/useErrorHandler.ts
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();
export function useErrorHandler() {
  const handleError = (
    error: any,
    defaultTitle = 'Error',
    defaultMessage = 'An unexpected error occurred.',
    showToast = true,
  ) => {
    let title = defaultTitle;
    let description = defaultMessage;

    if (error.response && error.response._data && error.response._data.message) {
      // Handling specific error messages from the H3Error
      console.log('Error message from H3Error:', error.response._data.message);
      title = error.response._data.message;
      description = error.response._data.data.error;
    } else if (error.message) {
      // Handling generic error messages
      console.log('Generic error message:', error.message);
      description = error.message;
    }

    if (showToast) {
      // Display the error using a toast notification
      toast({
        title,
        description,
      });
    }

    return { title, description };
  };

  return { handleError };
}

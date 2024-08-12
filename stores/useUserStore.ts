import { defineStore } from 'pinia';
import { ref, toValue } from 'vue';
import { useErrorHandler } from '@/composables/useErrorHandler';
import { useFetch } from '@vueuse/core';
import type { ApiResponse } from '@/types/api';
import type { User } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const { handleError } = useErrorHandler();
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<any>(null);
  const userInvalid = ref(false);

  /**
   * Fetches the current user data from the server.
   */
  const fetchUserData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data: res } = await useFetch<ApiResponse>('/api/v1/user');
      const data = JSON.parse(toValue(res) as unknown as string);

      if (data.data) {
        user.value = data.data;
        userInvalid.value = false;
      } else {
        userInvalid.value = true;
      }

      console.log('store userInvalid.value :>> ', userInvalid.value);
    } catch (err: any) {
      userInvalid.value = true;
      const processedError: any = handleError(err, '', '', false);
      error.value = processedError;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    userInvalid,
    fetchUserData,
  };
});

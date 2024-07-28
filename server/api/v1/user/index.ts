import { defineEventHandler, H3Event } from 'h3';
import { useUser } from '@/composables/useUser';

export default defineEventHandler(async (event: H3Event) => {
  const user = useUser(event);

  if (!user.success) {
    // Handle the error as needed, for example:
    // return { success: false, message: 'Unauthorized' };
    throw new Error(user.message);
  }

  // Proceed with your logic, now that you have the user data
  return {
    success: true,
    data: user.data,
  };
});

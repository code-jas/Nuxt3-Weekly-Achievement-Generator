import { defineEventHandler, H3Event } from 'h3';
import { useUser } from '@/composables/useUser';

export default defineEventHandler(async (event: H3Event) => {
  const user = useUser(event);

  return {
    success: true,
    data: user.data,
  };
});

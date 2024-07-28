import { H3Event, sendError, readBody, setCookie, defineEventHandler } from 'h3';
import { useEncryption } from '@/composables/useEncryption';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw new Error('Invalid request body');
    }

    const { userData } = body;
    const { encryptData } = useEncryption();

    // Validate userData if necessary
    if (!userData) {
      throw new Error('No user data provided');
    }

    // Encryption key (should be securely managed)
    const clockifyUser = encryptData(JSON.stringify(userData));

    console.log('Clockify User Encrypted Data:', clockifyUser);

    // Set the cookie
    setCookie(event, 'clockify-user', clockifyUser, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: true, // Set to true if serving over HTTPS
      sameSite: 'strict',
      path: '/',
    });

    return {
      success: true,
      message: 'User data encrypted and stored successfully',
    };
  } catch (error: any) {
    console.log('error :>> ', error);
    sendError(event, new Error(error.message));
  }
});

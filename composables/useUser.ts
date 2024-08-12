import { H3Event, getCookie } from 'h3';
import { useEncryption } from '@/composables/useEncryption';

/**
 * Retrieves and decrypts user data from a cookie.
 * @param event - The H3Event object.
 * @returns An object with the decrypted user data.
 *          If successful, the object will have a `success` property set to `true` and a `data` property containing the user data.
 *          If an error occurs, the object will have a `success` property set to `false` and a `message` property containing the error message.
 */
export function useUser(event: H3Event) {
  const { decryptData } = useEncryption();

  try {
    // Retrieve the cookie
    const encryptedData = getCookie(event, 'clockify-user');

    if (!encryptedData) {
      throw new Error('No user data found.');
    }

    // Decrypt the user data
    const userData = decryptData(encryptedData);
    const user = JSON.parse(userData);

    // console.log('Decrypted User Data:', user);

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    console.error('Error retrieving user:', error);
    throw error;
  }
}

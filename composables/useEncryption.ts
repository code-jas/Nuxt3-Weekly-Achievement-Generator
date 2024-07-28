import CryptoJS from 'crypto-js';

export function useEncryption() {
  const secretKey = 'cli3nt'; // Replace with a securely managed key

  /**
   * Encrypts the given data using AES encryption algorithm.
   *
   * @param data - The data to be encrypted.
   * @returns The encrypted data as a string.
   */
  function encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  /**
   * Decrypts the given encrypted data using the secret key.
   *
   * @param encryptedData - The data to be decrypted.
   * @returns The decrypted data as a string.
   */
  function decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  return { encryptData, decryptData };
}

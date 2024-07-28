import Cookies from 'js-cookie';

export function useCookies() {
  /**
   * Sets a cookie with the specified name, value, and expiration days.
   *
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param days - The number of days until the cookie expires.
   * @param onSuccess - Optional callback function to be called on successful cookie setting.
   * @param onError - Optional callback function to be called if an error occurs while setting the cookie.
   */
  function setCookie(
    name: string,
    value: string,
    days: number,
    onSuccess?: () => void,
    onError?: (error: Error) => void,
  ) {
    try {
      Cookies.set(name, value, { expires: days });
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error as Error);
    }
  }

  /**
   * Retrieves the value of a cookie by its name.
   *
   * @param name - The name of the cookie.
   * @param onSuccess - Optional callback function to be called with the cookie value if retrieval is successful.
   * @param onError - Optional callback function to be called with an error object if an error occurs during retrieval.
   */
  function getCookie(
    name: string,
    onSuccess?: (value: string | undefined) => void,
    onError?: (error: Error) => void,
  ): void {
    try {
      const value = Cookies.get(name);
      if (onSuccess) onSuccess(value);
    } catch (error) {
      if (onError) onError(error as Error);
    }
  }

  /**
   * Deletes a cookie with the specified name.
   *
   * @param name - The name of the cookie to delete.
   * @param onSuccess - Optional callback function to be called if the cookie is deleted successfully.
   * @param onError - Optional callback function to be called if an error occurs while deleting the cookie.
   */
  function deleteCookie(name: string, onSuccess?: () => void, onError?: (error: Error) => void) {
    try {
      Cookies.remove(name);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error as Error);
    }
  }

  return { setCookie, getCookie, deleteCookie };
}

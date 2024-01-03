import "client-only";

/**
 * Retrieves a value from local storage with a specified key.
 * @param key - The key for the value in local storage.
 * @param defaultValue - The default value to be returned if the key does not exist in local storage.
 * @returns The retrieved value from local storage or the default value if not found.
 */
const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  const stickyValue = localStorage.getItem(key);
  const parsedValue =
    stickyValue !== null && stickyValue !== "undefined"
      ? JSON.parse(stickyValue)
      : defaultValue;
  return parsedValue as T;
};

/**
 * Sets a value in local storage with a specified key.
 * @param key - The key for the value in local storage.
 * @param value - The value to be stored in local storage.
 */
const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export { getLocalStorage, setLocalStorage };

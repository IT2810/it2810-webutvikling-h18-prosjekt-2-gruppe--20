/**
 * The cacheApi uses localStorage to persist the data in the browser,
 * This enables a user to have the data stored in the browser, making
 * it only necessary to fetch the data once, unless the browser cache is deleted.
 *
 * We haven't introduced any lifetime to the data,
 * as we can consider the data as static (non-changing).
 * */

/**
 * Writes some value to cache
 * @param {string} key
 * @param {string} value
 * */
export function flushToCache(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Checks if a key exists in storage, with an associated value.
 * @param {string} key
 * @return {boolean}
 * */
export function cacheContainsKey(key) {
  return !!localStorage.getItem(key);
}

export function getFromCache(key) {
  return localStorage.getItem(key);
}

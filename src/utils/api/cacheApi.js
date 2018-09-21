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
  try {
    localStorage.setItem(key, value);
  } catch(e) {
    // Safari might fail in some cases with error QuotaExceededError.
    // This is not critical in our case, but will result in
    // that we fail to cache some data after just one request. Thus we have to fetch it again.
    // However, this problem is on Apple's side and is not related to the "Private browser issue" in Safari.
    console.warn(`Could not save ${key} to localStorage. ${e.message}`);
  }
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

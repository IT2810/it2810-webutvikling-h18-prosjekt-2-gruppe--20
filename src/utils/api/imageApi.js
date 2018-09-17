import { getFromCache, flushToCache, cacheContainsKey } from './cacheApi';

const createKey = filename => `img_${filename}`;

async function fetchImage(filename) {
  return fetch(`/db/${filename}`).then(res => res.text());
}

/**
 * Fetches a file from cache, if already stored.
 * Will fetch the content from the server, if not in cache.
 * @param {string} filename
 * @return {string} SVG content as string
 * */
export default async function fetchImageByCache(filename) {
  const key = createKey(filename);

  if (cacheContainsKey(key)) {
    return getFromCache(key);
  }

  const svg = await fetchImage(filename);

  if (svg) {
    flushToCache(key, svg);
  }

  return svg;
}

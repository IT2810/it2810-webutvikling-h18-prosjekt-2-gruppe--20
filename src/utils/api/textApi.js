import { cacheContainsKey, flushToCache, getFromCache } from './cacheApi';

const createKey = index => `txt_${index}`;

async function fetchText(index) {
  const poems = await fetch('/db/poems.json').then(res => res.json());

  // The content is static and known,
  // so input checking is redundant
  return poems[index];
}

export default async function fetchTextByCache(index) {
  const key = createKey(index);

  if (cacheContainsKey(key)) {
    return JSON.parse(getFromCache(key));
  }

  const text = await fetchText(index);

  // Prevent us from saving undefined content into cache.
  if (text !== undefined) {
    flushToCache(key, JSON.stringify(text));
  }

  return text;
}

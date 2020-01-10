/* global self */
/* eslint-disable no-restricted-globals */

const WWCD_CACHE = 'wwcd_cache_v1';

(function() {
  self.addEventListener('fetch', (e) => {
    e.respondWith(async () => {
      const cache = await caches.open(WWCD_CACHE);
      const targetHref = new URL(e.request.url);

      if (targetHref.hostname === 'api.dmsiparty.com') {
        console.log(e);
      } else {
        const res = await cache.match(e.request);

        if (!res) {
          const data = await fetch(e.request);

          if (e.request.url.includes('http')) {
            cache.put(e.request.url, data.clone());
          }

          return data;
        }

        return res;
      }
    })
  });
})();

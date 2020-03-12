var cacheName = 'my-cache';
var cacheList = ['index.html',
  'main.css',
  'youhun.jpg']
self.addEventListener('install',e =>{
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  );
});
// 监听service worker fetch
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
        .then(function(response) {
            // 在缓存中查找到匹配的请求，就从缓存返回
            if (response) {
                console.log(response)
                return response;
            }
            // 缓存中没有查找到对应请求，继续网络请求
            return fetch(event.request);
        }
    )
  );
});
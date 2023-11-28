'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "899f5ac8cd64124ed5f134085b6892a5",
"assets/assets/alfa_kurt.mp4": "3354a88cf4b5ca265030480af8cc31ad",
"assets/assets/bir_kral_varsa.mp4": "8775a0c82c49d36f003677e17ae47449",
"assets/assets/cagla.jpg": "a03779dddf574ef1ca84905db3266420",
"assets/assets/cagri.png": "da2b13a42b447b63d94cd4bf5a617c6e",
"assets/assets/cato_bas.jpg": "dba2f0ebde3a4cfbdd6a5268c23d3c6f",
"assets/assets/cato_cat_cat.mp4": "ba362a219c958fa04df679326c3ba1d1",
"assets/assets/ceket_cato.mp4": "c9728c9d656ef5644d188c67532322f9",
"assets/assets/gfcato.png": "9e0066dd1552e4ee1b72908efe437081",
"assets/assets/goat_cato.mp4": "ae4c7b6dd42abe389e38a1b2528dbd78",
"assets/assets/hasna_kapida.png": "6a6ca0796328a6ef9bd49fd52b0bdc15",
"assets/assets/image.jpg": "92fe86544cb98a132ed0be6431bf3e5b",
"assets/assets/kegri_peri.png": "8836cd72c52e3482ec41c5f94267e729",
"assets/assets/koc_cato.mp4": "d8a64be9943ba5d48f32874d37c8eef9",
"assets/assets/komutan.png": "b61635715412938bc1ffe266af60e936",
"assets/assets/liseler_cato.mp4": "8b5e319bcad8b4ce0c740776a86924d3",
"assets/assets/nuriben_pankart.png": "a96557ec23982fa5ca9a7b3e31c8f881",
"assets/assets/olani_gizliyoruz.mp4": "183b90c16489f9bebc13e405b515c9f5",
"assets/assets/prezident.png": "11d028371d89987cc04cb738a02ae587",
"assets/assets/pusula.png": "335546e391825a3331df6da78442c8d5",
"assets/assets/putin_cato.png": "a8a4d6a532fd91fb49e1e9a488d02cee",
"assets/assets/recebim_cato.mp4": "216808d7dd1baf84aec552b9ec2a5123",
"assets/assets/reddit.png": "427a27e1dc4c7c9a04794599aaa17599",
"assets/assets/secim_arac.mp4": "dd24cce7197bf6bec00f41ff1cf04f33",
"assets/assets/secim_araci.gif": "fc3084de29c2f375359d5bf81a6351d8",
"assets/assets/sefir_cato.mp4": "e29ac7f7775f971185f91b3346d64ec4",
"assets/assets/selama.png": "4e41d2f5ff9a41280e92cca1c07e0cc9",
"assets/assets/sivaci_dayi.png": "7793b24296ecfbd40c6c5a8a0399e1bd",
"assets/assets/sivaci_pankart.png": "ba5996fccf7ba18368ca02c593ae328d",
"assets/assets/tek_ask.jpg": "975d70ab1aa953a4c8ec87a408fd3fe4",
"assets/assets/uncle_cato.png": "512f03b3ff8bb870cf3f9211b09ffa16",
"assets/assets/uykusuz_cato.png": "380847c06dda3bda34e06c5478782b58",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7dfcf25d369ed1f5a2c2478d37c9ebff",
"assets/NOTICES": "e22c6b4eb684db8b2d4f06ea8ced9936",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "727b2436d872643637e235ad9b674746",
"/": "727b2436d872643637e235ad9b674746",
"main.dart.js": "5df5d1e1d5baf3a2e32410c97ed3ecb3",
"manifest.json": "2e0c8afaef5630c5d56ea2108960d2e7",
"version.json": "09eaacd41d3c6f1ba1887befd6f3fafb"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

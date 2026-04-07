# Fetch API

আমরা এখন পর্যন্ত `fetch` সম্পর্কে অনেক কিছু জেনেছি।

এবার চলুন বাকি API গুলো দেখে নেই, যাতে এটির সব সক্ষমতা কভার করতে পারি।

```smart
মনে রাখবেন: এই অপশনগুলোর বেশিরভাগ খুব কমই ব্যবহার করা হয়। আপনি এই অধ্যায়টি না পড়েও `fetch` ভালোভাবে ব্যবহার করতে পারবেন।

তবুও, এটা ভালো যে আমরা জানি `fetch` কি কি করতে পারে, তাহলে কখনো প্রয়োজন হলে, আমরা ফিরে এসে বিস্তারিত দেখতে পারবো।
```

এখানে সব সম্ভাব্য `fetch` অপশনগুলোর সম্পূর্ণ তালিকা দেওয়া হলো তাদের ডিফল্ট ভ্যালু সহ (কমেন্টে বিকল্পগুলো দেখানো হয়েছে):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, ইত্যাদি
  headers: {
    // content type header ভ্যালু সাধারণত অটো-সেট হয়
    // request body এর উপর নির্ভর করে
    "Content-Type": "text/plain;charset=UTF-8"
  },
<<<<<<< HEAD
  body: undefined // string, FormData, Blob, BufferSource, বা URLSearchParams
  referrer: "about:client", // বা "" কোনো Referer header পাঠানোর জন্য,
  // বা বর্তমান origin এর একটি url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
=======
  body: undefined, // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // or "" to send no Referer header,
  // or an url from the current origin
  referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, বা only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // একটি হ্যাশ, যেমন "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // request বাতিল করার জন্য AbortController
  window: window // null
});
```

অসাধারণ একটা তালিকা, তাই না?

আমরা <info:fetch> অধ্যায়ে `method`, `headers` এবং `body` সম্পূর্ণভাবে কভার করেছি।

`signal` অপশন <info:fetch-abort> এ কভার করা হয়েছে।

<<<<<<< HEAD
এবার চলুন বাকি সক্ষমতাগুলো এক্সপ্লোর করি।

## referrer, referrerPolicy

এই অপশনগুলো নিয়ন্ত্রণ করে কিভাবে `fetch` HTTP `Referer` হেডার সেট করবে।
=======
Now let's explore the remaining capabilities.

## referrer, referrerPolicy

These options govern how `fetch` sets the HTTP `Referer` header.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

সাধারণত এই হেডার অটোমেটিকভাবে সেট হয় এবং request দেওয়া পেজের url ধারণ করে। বেশিরভাগ পরিস্থিতিতে, এটি একেবারেই গুরুত্বপূর্ণ নয়, কখনো কখনো, নিরাপত্তার জন্য, এটি সরিয়ে ফেলা বা ছোট করা যুক্তিসঙ্গত হয়।

<<<<<<< HEAD
**`referrer` অপশন আমাদের বর্তমান origin এর মধ্যে যেকোনো `Referer` সেট করতে বা সরিয়ে ফেলতে দেয়।**

কোনো referer পাঠানোর জন্য, একটি খালি স্ট্রিং সেট করুন:

=======
**The `referrer` option allows to set any `Referer` (within the current origin) or remove it.**

To send no referrer, set an empty string:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
```js
fetch('/page', {
*!*
  referrer: "" // no Referer header
*/!*
});
```

বর্তমান origin এর মধ্যে অন্য একটি url সেট করতে:

```js
fetch('/page', {
  // ধরে নিচ্ছি আমরা https://javascript.info এ আছি
  // আমরা যেকোনো Referer header সেট করতে পারি, কিন্তু শুধু বর্তমান origin এর মধ্যে
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**`referrerPolicy` অপশন `Referer` এর জন্য সাধারণ নিয়ম সেট করে।**

Request গুলো ৩ ধরনের হয়ে থাকেঃ

1. একই origin এ request।
2. অন্য origin এ request।
3. HTTPS থেকে HTTP এ request (নিরাপদ থেকে অনিরাপদ প্রোটোকলে)।

<<<<<<< HEAD
`referrer` অপশনের মতো যেটি সঠিক `Referer` ভ্যালু সেট করতে দেয়, `referrerPolicy` ব্রাউজারকে প্রতিটি request টাইপের জন্য সাধারণ নিয়ম বলে দেয়।
=======
Unlike the `referrer` option that allows to set the exact `Referer` value, `referrerPolicy` tells the browser general rules for each request type.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

সম্ভাব্য ভ্যালুগুলো [Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/) এ বর্ণনা করা হয়েছে:

<<<<<<< HEAD
- **`"no-referrer-when-downgrade"`** -- ডিফল্ট ভ্যালু: সবসময় পুরো `Referer` পাঠানো হয়, যদি না আমরা HTTPS থেকে HTTP এ request পাঠাই (কম নিরাপদ প্রোটোকলে)।
- **`"no-referrer"`** -- কখনো `Referer` পাঠাবে না।
- **`"origin"`** -- শুধু origin পাঠাবে `Referer` এ, পুরো পেজ URL না, যেমন শুধু `http://site.com` পাঠাবে `http://site.com/path` এর বদলে।
- **`"origin-when-cross-origin"`** -- একই origin এ পুরো `Referer` পাঠাবে, কিন্তু cross-origin request এর জন্য শুধু origin অংশ (উপরের মতো)।
- **`"same-origin"`** -- একই origin এ পুরো `Referer` পাঠাবে, কিন্তু cross-origin request এর জন্য কোনো `Referer` নেই।
- **`"strict-origin"`** -- শুধু origin পাঠাবে, HTTPS→HTTP request এর জন্য `Referer` পাঠাবে না।
- **`"strict-origin-when-cross-origin"`** -- একই origin এর জন্য পুরো `Referer` পাঠাবে, cross-origin এর জন্য শুধু origin পাঠাবে, যদি না এটি HTTPS→HTTP request হয়, তাহলে কিছুই পাঠাবে না।
- **`"unsafe-url"`** -- সবসময় `Referer` এ পুরো url পাঠাবে, HTTPS→HTTP request এর জন্যও।
=======
- **`"strict-origin-when-cross-origin"`** -- the default value: for same-origin send the full `Referer`, for cross-origin send only the origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"no-referrer-when-downgrade"`** -- full `Referer` is always sent, unless we send a request from HTTPS to HTTP (to the less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send the full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send the full `Referer` to the same origin, but no `Referer` for cross-origin requests.
- **`"strict-origin"`** -- send only the origin, not the `Referer` for HTTPS→HTTP requests.
- **`"unsafe-url"`** -- always send the full url in `Referer`, even for HTTPS→HTTP requests.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

এখানে সব কম্বিনেশনের একটি টেবিল দেওয়া হলো:

<<<<<<< HEAD
| ভ্যালু                                          | একই origin এ | অন্য origin এ | HTTPS→HTTP |
| ----------------------------------------------- | ------------ | ------------- | ---------- |
| `"no-referrer"`                                 | -            | -             | -          |
| `"no-referrer-when-downgrade"` বা `""` (ডিফল্ট) | পুরো         | পুরো          | -          |
| `"origin"`                                      | origin       | origin        | origin     |
| `"origin-when-cross-origin"`                    | পুরো         | origin        | origin     |
| `"same-origin"`                                 | পুরো         | -             | -          |
| `"strict-origin"`                               | origin       | origin        | -          |
| `"strict-origin-when-cross-origin"`             | পুরো         | origin        | -          |
| `"unsafe-url"`                                  | পুরো         | পুরো          | পুরো       |

ধরা যাক আমাদের একটি অ্যাডমিন জোন আছে যার URL structure সাইটের বাইরে থেকে জানা উচিত না।
=======
| Value | To same origin | To another origin | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` | full | full | - |
| `"origin"` | origin | origin | origin |
| `"origin-when-cross-origin"` | full | origin | origin |
| `"same-origin"` | full | - | - |
| `"strict-origin"` | origin | origin | - |
| `"strict-origin-when-cross-origin"` or `""` (default) | full | origin | - |
| `"unsafe-url"` | full | full | full |

Let's say we have an admin zone with a URL structure that shouldn't be known from outside of the site.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

আমরা যদি একটি `fetch` পাঠাই, তাহলে ডিফল্টভাবে এটি সবসময় `Referer` হেডার পাঠায় আমাদের পেজের পুরো url সহ (যদি না আমরা HTTPS থেকে HTTP এ request করি, তাহলে কোনো `Referer` নেই)।

যেমন `Referer: https://javascript.info/admin/secret/paths`।

<<<<<<< HEAD
আমরা যদি চাই অন্য ওয়েবসাইটগুলো শুধু origin অংশটা জানুক, URL-path না, তাহলে আমরা অপশনটি সেট করতে পারি:
=======
If we'd like other websites know only the origin part, not the URL-path, we can set the option:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js
fetch("https://another.com/page", {
  // ...
  referrerPolicy: "origin-when-cross-origin", // Referer: https://javascript.info
});
```

আমরা এটি সব `fetch` কলে ব্যবহার করতে পারি, হয়তো আমাদের প্রজেক্টের JavaScript লাইব্রেরিতে ইন্টিগ্রেট করে যে সব request করে এবং ভিতরে `fetch` ব্যবহার করে।

ডিফল্ট বিহেভিয়ারের সাথে এর একমাত্র পার্থক্য হলো যে অন্য origin এ request এর জন্য `fetch` শুধু URL এর origin অংশটা পাঠায় (যেমন `https://javascript.info`, path ছাড়া)। আমাদের origin এ request এর জন্য আমরা এখনো পুরো `Referer` পাই (ডিবাগিংয়ের জন্য হয়তো কাজে লাগে)।

```smart header="Referrer policy শুধু `fetch`এর জন্য না"
[specification](https://w3c.github.io/webappsec-referrer-policy/) এ বর্ণিত Referrer policy, শুধু`fetch` এর জন্য না, বরং আরো গ্লোবাল।

<<<<<<< HEAD
বিশেষ করে, `Referrer-Policy` HTTP হেডার ব্যবহার করে পুরো পেজের জন্য ডিফল্ট পলিসি সেট করা সম্ভব, বা প্রতি-লিংকে, `<a rel="noreferrer">` দিয়ে।

````
=======
In particular, it's possible to set the default policy for the whole page using the `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.
```
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

## mode

`mode` অপশনটি এমন একটি সুরক্ষা ব্যবস্থা যা মাঝে মাঝে cross-origin অনুরোধগুলিকে প্রতিরোধ করে:

<<<<<<< HEAD
- **`"cors"`** -- ডিফল্ট, cross-origin request অনুমতি প্রাপ্ত, যেমন <info:fetch-crossorigin> এ বর্ণনা করা হয়েছে,
- **`"same-origin"`** -- cross-origin request নিষিদ্ধ,
- **`"no-cors"`** -- শুধু সাধারণ cross-origin request অনুমতি প্রাপ্ত।
=======
- **`"cors"`** -- the default, cross-origin requests are allowed, as described in <info:fetch-crossorigin>,
- **`"same-origin"`** -- cross-origin requests are forbidden,
- **`"no-cors"`** -- only safe cross-origin requests are allowed.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

এই অপশনটি কাজে লাগে যখন `fetch` এর জন্য URL একটি 3rd-party থেকে আসে, এবং আমরা cross-origin ক্ষমতাগুলো সীমিত করার জন্য একটি "পাওয়ার অফ সুইচ" চাই।

## credentials

`credentials` অপশনটি নির্দিষ্ট করে যে `fetch` request এর সাথে কুকিজ এবং HTTP-Authorization হেডার পাঠাবে কিনা।

<<<<<<< HEAD
- **`"same-origin"`** -- ডিফল্ট, cross-origin request এর জন্য পাঠাবে না,
- **`"include"`** -- সবসময় পাঠাবে, cross-origin সার্ভার থেকে `Accept-Control-Allow-Credentials` প্রয়োজন যাতে JavaScript response অ্যাক্সেস করতে পারে, এটি <info:fetch-crossorigin> চ্যাপ্টারে কভার করা হয়েছে,
- **`"omit"`** -- কখনো পাঠাবে না, একই origin request এর জন্যও না।

## cache

ডিফল্টভাবে, `fetch` request গুলো স্ট্যান্ডার্ড HTTP-caching ব্যবহার করে। অর্থাৎ, এটি `Expires`, `Cache-Control` হেডার মেনে চলে, `If-Modified-Since` পাঠায়, এবং এরকম অন্যান্য। ঠিক যেমন সাধারণ HTTP-request গুলো করে।
=======
- **`"same-origin"`** -- the default, don't send for cross-origin requests,
- **`"include"`** -- always send, requires `Access-Control-Allow-Credentials` from cross-origin server in order for JavaScript to access the response, that was covered in the chapter <info:fetch-crossorigin>,
- **`"omit"`** -- never send, even for same-origin requests.

## cache

By default, `fetch` requests make use of standard HTTP-caching. That is, it respects the `Expires` and `Cache-Control` headers, sends `If-Modified-Since` and so on. Just like regular HTTP-requests do.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

`cache` অপশন HTTP-cache উপেক্ষা করতে বা এর ব্যবহার ফাইন-টিউন করতে দেয়:

<<<<<<< HEAD
- **`"default"`** -- `fetch` স্ট্যান্ডার্ড HTTP-cache নিয়ম এবং হেডার ব্যবহার করে,
- **`"no-store"`** -- সম্পূর্ণভাবে HTTP-cache উপেক্ষা করে, এই মোডটি ডিফল্ট হয়ে যায় যদি আমরা একটি হেডার `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, বা `If-Range` সেট করি,
- **`"reload"`** -- HTTP-cache থেকে রেজাল্ট নেবে না (যদি থাকে), কিন্তু response দিয়ে cache পপুলেট করবে (যদি response হেডার অনুমতি দেয়),
- **`"no-cache"`** -- যদি ক্যাশেড response থাকে তাহলে একটি কন্ডিশনাল request তৈরি করবে, অন্যথায় একটি সাধারণ request। HTTP-cache কে response দিয়ে পপুলেট করবে,
- **`"force-cache"`** -- HTTP-cache থেকে একটি response ব্যবহার করবে, যদিও এটি স্টেল হয়ে গেছে। যদি HTTP-cache এ কোনো response না থাকে, তাহলে একটি রেগুলার HTTP-request করবে, সাধারণভাবে আচরণ করবে,
- **`"only-if-cached"`** -- HTTP-cache থেকে একটি response ব্যবহার করবে, যদিও এটি স্টেল হয়ে গেছে। যদি HTTP-cache এ কোনো response না থাকে, তাহলে এরর। শুধু তখনই কাজ করে যখন `mode` হলো `"same-origin"`।
=======
- **`"default"`** -- `fetch` uses standard HTTP-cache rules and headers,
- **`"no-store"`** -- totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`,
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate the cache with the response (if the response headers permit this action),
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

## redirect

সাধারণত, `fetch` স্বচ্ছভাবে HTTP-redirect গুলো ফলো করে, যেমন 301, 302 ইত্যাদি।

`redirect` অপশন এটি পরিবর্তন করতে দেয়:

<<<<<<< HEAD
- **`"follow"`** -- ডিফল্ট, HTTP-redirect গুলো ফলো করবে,
- **`"error"`** -- HTTP-redirect এর ক্ষেত্রে এরর,
- **`"manual"`** -- HTTP-redirect ফলো করবে না, কিন্তু `response.url` হবে নতুন URL, এবং `response.redirected` হবে `true`, যাতে আমরা নতুন URL এ ম্যানুয়ালি রিডাইরেক্ট করতে পারি (যদি প্রয়োজন হয়)।
=======
- **`"follow"`** -- the default, follow HTTP-redirects,
- **`"error"`** -- error in case of HTTP-redirect,
- **`"manual"`** -- allows to process HTTP-redirects manually. In case of redirect, we'll get a special response object, with `response.type="opaqueredirect"` and zeroed/empty status and most other properies.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

## integrity

`integrity` অপশনটি চেক করতে দেয় যে response আগে থেকে জানা checksum এর সাথে মেলে কিনা।

<<<<<<< HEAD
[specification](https://w3c.github.io/webappsec-subresource-integrity/) এ বর্ণিত হিসাবে, সাপোর্টেড হ্যাশ-ফাংশন গুলো হলো SHA-256, SHA-384, এবং SHA-512, ব্রাউজারের উপর নির্ভর করে অন্যান্যও থাকতে পারে।

উদাহরণ হিসাবে, আমরা একটি ফাইল ডাউনলোড করছি, এবং আমরা জানি যে এর SHA-256 checksum হলো "abcdef" (আসল checksum অবশ্যই দীর্ঘ)।
=======
As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on the browser.

For example, we're downloading a file, and we know that its SHA-256 checksum is "abcdef" (a real checksum is longer, of course).
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

আমরা এটি `integrity` অপশনে রাখতে পারি, এভাবে:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
````

তারপর `fetch` SHA-256 নিজে থেকে ক্যালকুলেট করবে এবং এটি আমাদের স্ট্রিং এর সাথে তুলনা করবে। মিসম্যাচ হলে, একটি এরর ট্রিগার হবে।

## keepalive

`keepalive` অপশনটি নির্দেশ করে যে request টি এটি শুরু করা ওয়েবপেজটি থেকে "বেঁচে থাকতে" পারে।

<<<<<<< HEAD
উদাহরণ হিসাবে, আমরা পরিসংখ্যান সংগ্রহ করি যে বর্তমান ভিজিটর আমাদের পেজ কিভাবে ব্যবহার করে (মাউস ক্লিক, পেজ ফ্র্যাগমেন্ট যেগুলো সে দেখে), বিশ্লেষণ এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করার জন্য।

যখন ভিজিটর আমাদের পেজ ছাড়ে -- আমরা সার্ভারে ডেটা সংরক্ষণ করতে চাই।

আমরা এর জন্য `window.onunload` ইভেন্ট ব্যবহার করতে পারি:
=======
For example, we gather statistics on how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve the user experience.

When the visitor leaves our page -- we'd like to save the data to our server.

We can use the `window.onunload` event for that:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

<<<<<<< HEAD
সাধারণত, যখন একটি ডকুমেন্ট আনলোড হয়, সব সংশ্লিষ্ট নেটওয়ার্ক request বাতিল হয়ে যায়। কিন্তু `keepalive` অপশন ব্রাউজারকে বলে যে পেজ ছাড়ার পরেও রিকুয়েস্টটি ব্যাকগ্রাউন্ডে সম্পাদন করতে হবে। তাই এই অপশনটি আমাদের request সফল হওয়ার জন্য অপরিহার্য।
=======
Normally, when a document is unloaded, all associated network requests are aborted. But the `keepalive` option tells the browser to perform the request in the background, even after it leaves the page. So this option is essential for our request to succeed.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

এটির কিছু সীমাবদ্ধতা আছে:

<<<<<<< HEAD
- আমরা মেগাবাইট পাঠাতে পারবো না: `keepalive` request এর জন্য body লিমিট ৬৪কেবি।
  - যদি আমাদের ভিজিট সম্পর্কে অনেক পরিসংখ্যান সংগ্রহ করতে হয়, আমাদের এটি নিয়মিত প্যাকেটে পাঠাতে হবে, যাতে শেষ `onunload` request এর জন্য অনেক কিছু না থাকে।
  - এই লিমিট সব `keepalive` request একসাথে প্রয়োগ হয়। অন্য কথায়, আমরা একাধিক `keepalive` request প্যারালেলে সম্পাদন করতে পারি, কিন্তু তাদের body length এর যোগফল ৬৪কেবি ছাড়তে পারবে না।
- আমরা সার্ভার response হ্যান্ডেল করতে পারবো না যদি ডকুমেন্ট আনলোড হয়ে যায়। তাই আমাদের উদাহরণে `fetch` `keepalive` এর কারণে সফল হবে, কিন্তু পরবর্তী ফাংশনগুলো কাজ করবে না।
  - বেশিরভাগ ক্ষেত্রে, যেমন পরিসংখ্যান পাঠানো, এটি কোনো সমস্যা না, কারণ সার্ভার শুধু ডেটা গ্রহণ করে এবং সাধারণত এমন request এর জন্য একটি খালি response পাঠায়।
=======
- We can't send megabytes: the body limit for `keepalive` requests is 64KB.
    - If we need to gather a lot of statistics about the visit, we should send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - This limit applies to all `keepalive` requests together. In other words, we can perform multiple `keepalive` requests in parallel, but the sum of their body lengths should not exceed 64KB.
- We can't handle the server response if the document is unloaded. So in our example `fetch` will succeed due to `keepalive`, but subsequent functions won't work.
    - In most cases, such as sending out statistics, it's not a problem, as the server just accepts the data and usually sends an empty response to such requests.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

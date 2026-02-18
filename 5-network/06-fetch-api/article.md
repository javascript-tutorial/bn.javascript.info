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
  body: undefined // string, FormData, Blob, BufferSource, বা URLSearchParams
  referrer: "about:client", // বা "" কোনো Referer header পাঠানোর জন্য,
  // বা বর্তমান origin এর একটি url
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
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

এবার চলুন বাকি সক্ষমতাগুলো এক্সপ্লোর করি।

## referrer, referrerPolicy

এই অপশনগুলো নিয়ন্ত্রণ করে কিভাবে `fetch` HTTP `Referer` হেডার সেট করবে।

সাধারণত এই হেডার অটোমেটিকভাবে সেট হয় এবং request দেওয়া পেজের url ধারণ করে। বেশিরভাগ পরিস্থিতিতে, এটি একেবারেই গুরুত্বপূর্ণ নয়, কখনো কখনো, নিরাপত্তার জন্য, এটি সরিয়ে ফেলা বা ছোট করা যুক্তিসঙ্গত হয়।

**`referrer` অপশন আমাদের বর্তমান origin এর মধ্যে যেকোনো `Referer` সেট করতে বা সরিয়ে ফেলতে দেয়।**

কোনো referer পাঠানোর জন্য, একটি খালি স্ট্রিং সেট করুন:

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

`referrer` অপশনের মতো যেটি সঠিক `Referer` ভ্যালু সেট করতে দেয়, `referrerPolicy` ব্রাউজারকে প্রতিটি request টাইপের জন্য সাধারণ নিয়ম বলে দেয়।

সম্ভাব্য ভ্যালুগুলো [Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/) এ বর্ণনা করা হয়েছে:

- **`"no-referrer-when-downgrade"`** -- ডিফল্ট ভ্যালু: সবসময় পুরো `Referer` পাঠানো হয়, যদি না আমরা HTTPS থেকে HTTP এ request পাঠাই (কম নিরাপদ প্রোটোকলে)।
- **`"no-referrer"`** -- কখনো `Referer` পাঠাবে না।
- **`"origin"`** -- শুধু origin পাঠাবে `Referer` এ, পুরো পেজ URL না, যেমন শুধু `http://site.com` পাঠাবে `http://site.com/path` এর বদলে।
- **`"origin-when-cross-origin"`** -- একই origin এ পুরো `Referer` পাঠাবে, কিন্তু cross-origin request এর জন্য শুধু origin অংশ (উপরের মতো)।
- **`"same-origin"`** -- একই origin এ পুরো `Referer` পাঠাবে, কিন্তু cross-origin request এর জন্য কোনো `Referer` নেই।
- **`"strict-origin"`** -- শুধু origin পাঠাবে, HTTPS→HTTP request এর জন্য `Referer` পাঠাবে না।
- **`"strict-origin-when-cross-origin"`** -- একই origin এর জন্য পুরো `Referer` পাঠাবে, cross-origin এর জন্য শুধু origin পাঠাবে, যদি না এটি HTTPS→HTTP request হয়, তাহলে কিছুই পাঠাবে না।
- **`"unsafe-url"`** -- সবসময় `Referer` এ পুরো url পাঠাবে, HTTPS→HTTP request এর জন্যও।

এখানে সব কম্বিনেশনের একটি টেবিল দেওয়া হলো:

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

আমরা যদি একটি `fetch` পাঠাই, তাহলে ডিফল্টভাবে এটি সবসময় `Referer` হেডার পাঠায় আমাদের পেজের পুরো url সহ (যদি না আমরা HTTPS থেকে HTTP এ request করি, তাহলে কোনো `Referer` নেই)।

যেমন `Referer: https://javascript.info/admin/secret/paths`।

আমরা যদি চাই অন্য ওয়েবসাইটগুলো শুধু origin অংশটা জানুক, URL-path না, তাহলে আমরা অপশনটি সেট করতে পারি:

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

বিশেষ করে, `Referrer-Policy` HTTP হেডার ব্যবহার করে পুরো পেজের জন্য ডিফল্ট পলিসি সেট করা সম্ভব, বা প্রতি-লিংকে, `<a rel="noreferrer">` দিয়ে।

````

## mode

`mode` অপশনটি এমন একটি সুরক্ষা ব্যবস্থা যা মাঝে মাঝে cross-origin অনুরোধগুলিকে প্রতিরোধ করে:

- **`"cors"`** -- ডিফল্ট, cross-origin request অনুমতি প্রাপ্ত, যেমন <info:fetch-crossorigin> এ বর্ণনা করা হয়েছে,
- **`"same-origin"`** -- cross-origin request নিষিদ্ধ,
- **`"no-cors"`** -- শুধু সাধারণ cross-origin request অনুমতি প্রাপ্ত।

এই অপশনটি কাজে লাগে যখন `fetch` এর জন্য URL একটি 3rd-party থেকে আসে, এবং আমরা cross-origin ক্ষমতাগুলো সীমিত করার জন্য একটি "পাওয়ার অফ সুইচ" চাই।

## credentials

`credentials` অপশনটি নির্দিষ্ট করে যে `fetch` request এর সাথে কুকিজ এবং HTTP-Authorization হেডার পাঠাবে কিনা।

- **`"same-origin"`** -- ডিফল্ট, cross-origin request এর জন্য পাঠাবে না,
- **`"include"`** -- সবসময় পাঠাবে, cross-origin সার্ভার থেকে `Accept-Control-Allow-Credentials` প্রয়োজন যাতে JavaScript response অ্যাক্সেস করতে পারে, এটি <info:fetch-crossorigin> চ্যাপ্টারে কভার করা হয়েছে,
- **`"omit"`** -- কখনো পাঠাবে না, একই origin request এর জন্যও না।

## cache

ডিফল্টভাবে, `fetch` request গুলো স্ট্যান্ডার্ড HTTP-caching ব্যবহার করে। অর্থাৎ, এটি `Expires`, `Cache-Control` হেডার মেনে চলে, `If-Modified-Since` পাঠায়, এবং এরকম অন্যান্য। ঠিক যেমন সাধারণ HTTP-request গুলো করে।

`cache` অপশন HTTP-cache উপেক্ষা করতে বা এর ব্যবহার ফাইন-টিউন করতে দেয়:

- **`"default"`** -- `fetch` স্ট্যান্ডার্ড HTTP-cache নিয়ম এবং হেডার ব্যবহার করে,
- **`"no-store"`** -- সম্পূর্ণভাবে HTTP-cache উপেক্ষা করে, এই মোডটি ডিফল্ট হয়ে যায় যদি আমরা একটি হেডার `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, বা `If-Range` সেট করি,
- **`"reload"`** -- HTTP-cache থেকে রেজাল্ট নেবে না (যদি থাকে), কিন্তু response দিয়ে cache পপুলেট করবে (যদি response হেডার অনুমতি দেয়),
- **`"no-cache"`** -- যদি ক্যাশেড response থাকে তাহলে একটি কন্ডিশনাল request তৈরি করবে, অন্যথায় একটি সাধারণ request। HTTP-cache কে response দিয়ে পপুলেট করবে,
- **`"force-cache"`** -- HTTP-cache থেকে একটি response ব্যবহার করবে, যদিও এটি স্টেল হয়ে গেছে। যদি HTTP-cache এ কোনো response না থাকে, তাহলে একটি রেগুলার HTTP-request করবে, সাধারণভাবে আচরণ করবে,
- **`"only-if-cached"`** -- HTTP-cache থেকে একটি response ব্যবহার করবে, যদিও এটি স্টেল হয়ে গেছে। যদি HTTP-cache এ কোনো response না থাকে, তাহলে এরর। শুধু তখনই কাজ করে যখন `mode` হলো `"same-origin"`।

## redirect

সাধারণত, `fetch` স্বচ্ছভাবে HTTP-redirect গুলো ফলো করে, যেমন 301, 302 ইত্যাদি।

`redirect` অপশন এটি পরিবর্তন করতে দেয়:

- **`"follow"`** -- ডিফল্ট, HTTP-redirect গুলো ফলো করবে,
- **`"error"`** -- HTTP-redirect এর ক্ষেত্রে এরর,
- **`"manual"`** -- HTTP-redirect ফলো করবে না, কিন্তু `response.url` হবে নতুন URL, এবং `response.redirected` হবে `true`, যাতে আমরা নতুন URL এ ম্যানুয়ালি রিডাইরেক্ট করতে পারি (যদি প্রয়োজন হয়)।

## integrity

`integrity` অপশনটি চেক করতে দেয় যে response আগে থেকে জানা checksum এর সাথে মেলে কিনা।

[specification](https://w3c.github.io/webappsec-subresource-integrity/) এ বর্ণিত হিসাবে, সাপোর্টেড হ্যাশ-ফাংশন গুলো হলো SHA-256, SHA-384, এবং SHA-512, ব্রাউজারের উপর নির্ভর করে অন্যান্যও থাকতে পারে।

উদাহরণ হিসাবে, আমরা একটি ফাইল ডাউনলোড করছি, এবং আমরা জানি যে এর SHA-256 checksum হলো "abcdef" (আসল checksum অবশ্যই দীর্ঘ)।

আমরা এটি `integrity` অপশনে রাখতে পারি, এভাবে:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
````

তারপর `fetch` SHA-256 নিজে থেকে ক্যালকুলেট করবে এবং এটি আমাদের স্ট্রিং এর সাথে তুলনা করবে। মিসম্যাচ হলে, একটি এরর ট্রিগার হবে।

## keepalive

`keepalive` অপশনটি নির্দেশ করে যে request টি এটি শুরু করা ওয়েবপেজটি থেকে "বেঁচে থাকতে" পারে।

উদাহরণ হিসাবে, আমরা পরিসংখ্যান সংগ্রহ করি যে বর্তমান ভিজিটর আমাদের পেজ কিভাবে ব্যবহার করে (মাউস ক্লিক, পেজ ফ্র্যাগমেন্ট যেগুলো সে দেখে), বিশ্লেষণ এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করার জন্য।

যখন ভিজিটর আমাদের পেজ ছাড়ে -- আমরা সার্ভারে ডেটা সংরক্ষণ করতে চাই।

আমরা এর জন্য `window.onunload` ইভেন্ট ব্যবহার করতে পারি:

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

সাধারণত, যখন একটি ডকুমেন্ট আনলোড হয়, সব সংশ্লিষ্ট নেটওয়ার্ক request বাতিল হয়ে যায়। কিন্তু `keepalive` অপশন ব্রাউজারকে বলে যে পেজ ছাড়ার পরেও রিকুয়েস্টটি ব্যাকগ্রাউন্ডে সম্পাদন করতে হবে। তাই এই অপশনটি আমাদের request সফল হওয়ার জন্য অপরিহার্য।

এটির কিছু সীমাবদ্ধতা আছে:

- আমরা মেগাবাইট পাঠাতে পারবো না: `keepalive` request এর জন্য body লিমিট ৬৪কেবি।
  - যদি আমাদের ভিজিট সম্পর্কে অনেক পরিসংখ্যান সংগ্রহ করতে হয়, আমাদের এটি নিয়মিত প্যাকেটে পাঠাতে হবে, যাতে শেষ `onunload` request এর জন্য অনেক কিছু না থাকে।
  - এই লিমিট সব `keepalive` request একসাথে প্রয়োগ হয়। অন্য কথায়, আমরা একাধিক `keepalive` request প্যারালেলে সম্পাদন করতে পারি, কিন্তু তাদের body length এর যোগফল ৬৪কেবি ছাড়তে পারবে না।
- আমরা সার্ভার response হ্যান্ডেল করতে পারবো না যদি ডকুমেন্ট আনলোড হয়ে যায়। তাই আমাদের উদাহরণে `fetch` `keepalive` এর কারণে সফল হবে, কিন্তু পরবর্তী ফাংশনগুলো কাজ করবে না।
  - বেশিরভাগ ক্ষেত্রে, যেমন পরিসংখ্যান পাঠানো, এটি কোনো সমস্যা না, কারণ সার্ভার শুধু ডেটা গ্রহণ করে এবং সাধারণত এমন request এর জন্য একটি খালি response পাঠায়।

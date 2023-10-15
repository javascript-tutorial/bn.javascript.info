
# Scripts: async, defer

মডার্ন ওয়েবসাইট গুলোতে আমাদের script সমূহের সাইজ HTML Document এর চেয়ে বড় হয়, ফলে এরা লোড হতে সময়ও বেশি নেয়।

একটি পেজ লোড হওয়ার সময় যখন `<script>...</script>` ট্যাগ দেখে তখন এটি DOM বিল্ড থামিয়ে `<script>` কে পার্স করে, এক্সিকিউট করে। অনুরূপভাবে এক্সটার্নাল `<script src="..."></script>` এর ক্ষেত্রে প্রথমে রিসোর্সটি ডাওনলোড করে এবং ডাওনলোড হওয়া পর্যন্ত এটি বাকী ডম পার্সিংকে ব্লক করে রাখে।

যার ফলে দুটি গুরত্বপূর্ণ ব্যাপার ঘটে:

1. script তার নিচের DOM কে পড়তে পারে না এবং হ্যান্ডেল করতে পারে না।
2. পেজের শুরুতে যদি কোন একটি বড় সাইজের script থাকে তাহলে এটি ডাওনলোড না হওয়া পর্যন্ত DOM পার্সিং ব্লক হয়ে থাকে:

```html run height=100
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- script ডাওনলোড না হওয়া পর্যন্ত এটি দেখাবে না -->
<p>...content after script...</p>
```

এক্ষেত্রে আমরা একটি কাজ করতে পারি, script কে পেজের একদম নিচে লোড করতে পারি। ফলে সম্পূর্ণ DOM পার্স হয় এবং এটি কোন কন্টেন্টকে ব্লক করে না:

```html
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

এভাবে আমরা আমাদের সমস্যাটি সমাধান করতে পারি। ব্রাউজার সম্পূর্ণ HTML ডকুমেন্ট পার্স করে script কে পার্স করে। তবে দীর্ঘ HTML ডকুমেন্টের জন্য কিছুটা সময় লাগতে পারে।

দ্রুত গতির ইন্টারনেট কানেকশনের জন্য এই সমস্যাটি প্রায় অদৃশ্যই থেকে যায়, তবে আমাদের পৃথিবীতে এখনো ইন্টারনেট সহজলভ্য না হওয়ায় অনেকেই স্বল্প গতির ইন্টারনেট যেমন মোবাইল ইন্টারনেট কানেকশন ব্যবহার করে।

সৌভাগ্যক্রমে, `<script>` আমাদের দুটি অ্যাট্রিবিউট প্রদান করে যার সাহায্যে এই সমস্যা সমাধান করতে পারি: `defer` এবং `async`।

## defer

script এ `defer` অ্যাট্রিবিউট করার ফলে ব্রাউজার script ডাওনলোড হওয়ার জন্য অপেক্ষা করবে না। তার পরিবর্তে এটি DOM কে পার্স করতে থাকবে এবং ব্যাকগ্রাউন্ডে script টি লোড হবে, এবং সম্পূর্ণ DOM বিল্ট হওয়ার পর এটি রান হবে।

এখানে উপরের উদাহরণটি আবার লিখা হয়েছে, তবে এখানে আমরা `defer` ব্যবহার করেছি:

```html run height=100
<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- script ডাওনলোড হওয়ার আগেই এটি দেখাবে -->
<p>...content after script...</p>
```

সুতরাং বলা যায়:

- Scripts এ `defer` ব্যবহার করা হলে তা পেজকে ব্লক করে রাখে না।
- Scripts এ `defer` ব্যবহার করা হলে তা এক্সিকিউট হবে DOM রেডি হওয়ার পর (তবে `DOMContentLoaded` ইভেন্ট ট্রিগার হবে Scripts এক্সিকিউট হওয়ার পর)।

এখানে `DOMContentLoaded` ইভেন্ট ট্রিগার হওয়ার একটি উদাহরণ দেখুন:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

1. HTML কন্টেন্ট সমূহকে শুরুতে দেখাবে।
2. `DOMContentLoaded` ইভেন্ট deferred script সমূহ ডাওনলোড হয়ে এক্সিকিউট হওয়ার পর ট্রিগার হবে।

**Deferred scripts সমূহ রেগুলার scripts এর মত DOM এর ক্রম অনুসারে এক্সিকিউট হয়**

মনে করুন, আমাদের দুটি deferred scripts আছে: `long.js` এবং `small.js`:

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

পারফরম্যান্সের জন্য ব্রাউজার দুটি স্ক্রিপ্টস সমান্তরালে ডাওনলোড করবে। উপরের উদাহরণে দুটি স্ক্রিপ্টস সমান্তরালে ডাওনলোড হবে এবং সম্ভবত `small.js` এ প্রথমে ডাওনলোড সম্পন্ন করবে, যেহেতু এটির সাইজ কম।

...তবে `defer` অ্যাট্রিবিউট DOM পার্সিং ব্লক না করার পাশাপাশি আরো একটি ব্যাপার নিশ্চিত করে তা হল এরা ক্রম অনুসারে এক্সিকিউট হয়। এখানে যদিও `small.js` প্রথমে ডাওনলোড হবে তারপরও এটি এক্সিকিউট হবে `long.js` ডাওনলোড হয়ে এক্সিকিউট হওয়ার পর।

যখন আমরা কোন একটি জাভাস্ক্রিপ্ট লাইব্রেরী ব্যবহার করি এবং তার উপর অন্য একটি স্ক্রিপ্টস নির্ভর করে তখন এই ব্যাপারটি আমাদের মনে রাখতে হবে।

```smart header="`defer` অ্যাট্রিবিউটটি শুধুমাত্র এক্সটার্নাল script এর জন্য"
যদি `<script>` এ কোন `src` না থাকে তাহলে `defer` অ্যাট্রিবিউটটি ইগনোর হবে।
```

## async

`async` অ্যাট্রিবিউটের কাজ অনেকটা `defer` এর মতই। এটিও DOM পার্সিংকে ব্লক করেনা। তবে defer এর সাথে একটি গুরুত্বপূর্ন পার্থক্য আছে।

`async` অ্যাট্রিবিউট বুঝায় আমাদের script টি সম্পূর্ণ স্বাধীন, অর্থাৎ এটি অন্য script এর উপর নির্ভর করবে না:

- script এ `async` ব্যবহার করা হলে তা DOM পার্সিং ব্লক করে না (`defer` এর মত)।
- অন্য script সমূহ `async` script ডাওনলোড হওয়ার জন্য অপেক্ষা করে না, এবং `async` scripts ও অন্য script এর জন্য অপেক্ষা করে না।
- `DOMContentLoaded` এবং async scripts এক্সিকিউট হওয়ার জন্য একে অন্যের জন্য অপেক্ষা করে না:
    - async script এক্সিকিউট হওয়ার আগেই `DOMContentLoaded` ট্রিগার হতে পারে (যদি async script টি DOM পার্সিংয়ের শেষে ডাওনলোড হয়)
    - ...অথবা async script এর পর (যদি async script টি ছোট বা HTTP-cache এ থাকে)

অন্য ভাবে বলা যায়, `async` scripts ব্যাকগ্রাউন্ডে লোড হবে এবং ডাওনলোড হওয়ার সাথে সাথে এটি এক্সিকিউট হবে। DOM পার্সিং বা অন্যান্য scripts এর জন্য এর এক্সিকিউশন থেমে থাকে না।

নিচে উপরের উদাহরণটি আবার লিখা হল তবে এখানে আমরা `defer` এর বদলে `async` ব্যবহার করেছি।

এখানে প্রতিটি script স্বাধীন।যেটি প্রথমে ডাওনলোড (`small.js` হতে পারে) হবে সেটিই প্রথমে এক্সিকিউট হবে:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

- HTML কন্টেন্ট সমূহ দেখাবে: কেননা `async` DOM পার্সিং ব্লক করে রাখে না।
- `DOMContentLoaded` বা `async` যে কোনটি আগে এক্সিকিউট হতে পারে।
- এরপর `small.js` এক্সিকিউট হতে পারে, কেননা সম্ভবত এটি `long.js` এর পূর্বেই ডাওনলোড সম্পন্ন করতে পারে, সুতরাং `small.js` এক্সিকিউট হবে। এছাড়াও, `long.js` ও প্রথমে লোড হতে পারে, যদি এটি cached হয়, তখন `long.js` এক্সিকিউট হবে। সুতরাং বলা যায় যেটি প্রথমে ডাওনলোড সম্পন্ন করবে সেটিই আগে এক্সিকিউট হবে।

যখন আমরা কোন থার্ড পার্টি script ইন্টিগ্রট করতে চাই, যারা অন্য কোন script এর উপর নির্ভর করে না তখন Async scripts ব্যবহার সুবিধাজনক:

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

## Dynamic scripts

আমরা আরো একটি উপায়ে script সংযুক্ত করতে পারি।

আমরা ডায়নামিক script এলিমেন্ট তৈরি করে তা `document.body` তে সংযুক্ত করতে পারি:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

যখন এটি `document.body` তে সংযুক্ত হবে সাথে সাথে script টি ডাওনলোড হওয়া শুরু করবে `(*)`।

**ডিফল্টভাবে ডায়নামিক script "async" এর মত কাজ করে**

অর্থাৎ:
- script টি অন্য কোন script এর জন্য অপেক্ষা করে না।
- যে script টি প্রথমে ডাওনলোড সম্পন্ন করবে সেটিই আগে এক্সিকিউট হবে ("load-first" ক্রম অনুযায়ী)।

তবে আমরা চাইলে বিহেভিয়ারটি পরিবর্তন করতে পারি `script.async=false` সেটের মাধ্যমে। তখন এটি `defer` এর মত কাজ করবে।

নিচের উদাহরণে, `loadScript(src)` টির মাধ্যমে আমরা Dynamic scripts সংযুক্ত করি এবং `async` কে `false` সেট করি।

সুতরাং `long.js` সর্বদা প্রথমে এক্সিকিউট হবে:

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js runs first because of async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

`script.async=false` ছাড়া ("load-first" ক্রম অনুযায়ী) এক্সিকিউট হবে।

যদি আমাদের script একটি অন্যটির উপর নির্ভর করে তাহলে `defer`এর মত কাজ করাতে হবে।


## সারাংশ

`async` এবং `defer` উভয়ের বৈশিষ্ট্য হল পেজ রেন্ডারিংয়ের সময় এরা DOM পার্সিংকে ব্লক করে না। তাই পেজ লোড হওয়ার সময়ই ইউজার পেজ কন্টেন্ট দেখতে পায়।

তবে তাদের মধ্যে কিছু পার্থক্য আছে:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | script সমূহ যেটি আগে লোড হবে সেটি প্রথমে এক্সিকিউট হবে অর্থাৎ *Load-first order* এ এক্সিকিউট হয় |  DOM ট্রি বিল্ড হওয়ার সাথে সাথেই `DOMContentLoaded` ট্রিগার হবে। |
| `defer` | *Document order* অনুযায়ী অর্থাৎ script সমূহ যে ক্রমে থাকবে সে অনুসারে এক্সিকিউট হয় |  সকল script এক্সিকিউট হওয়ার পর `DOMContentLoaded` ট্রিগার হবে। |

সাধারণত, `defer` ব্যবহার করা হয় যখন script সমূহ একে অন্যের উপর নির্ভর করে।

এবং  `async` ব্যবহার করা হয় যখন কোন script অন্য script এর উপর নির্ভর করে না, যেমন counter বা ads স্ক্রিপ্ট সমূহ।

```warn header="script ব্যতীত পেজ কন্টেন্ট সমূহ ব্যবহার করা যায়"
আমাদের মনে রাখা উচিত: যদি আমরা `defer` বা `async` ব্যবহার করে script লোড করি, তাহলে ইউজার script লোড হওয়ার আগেই পেজের কন্টেন্ট সমূহ দেখবে।

এক্ষেত্রে, আমাদের কিছু কম্পোনেট বা এলিমেন্ট থাকতে পারে যারা ঐ script সমূহের উপর নির্ভর করে।

এক্ষেত্রে "loading" স্টেটে কম্পোনেন্ট বা এলিমেন্ট সমূহকে আমাদের disable রাখা উচিত। তাহলে ইউজার বুঝতে পারবে কোন কম্পোনেন্ট সমূহ ব্যবহার করতে পারবে আর কোন গুলো লোড হচ্ছে।
```

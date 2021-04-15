# Page: DOMContentLoaded, load, beforeunload, unload

একটি HTML পেজের লাইফসাইকেলে তিনটি গুরুত্বপূর্ণ ইভেন্ট আছে:

- `DOMContentLoaded` -- সকল HTML কন্টেন্ট লোড হয়ে DOM ট্রি বিল্ট হলে এটি ট্রিগার হয়, তবে এক্সটার্নাল রিসোর্স যেমন `<img>` ট্যাগ এর সোর্স বা `<iframe>` সোর্স লোড হওয়ার আগেই এই ইভেন্টটি ট্রিগার হয়।
- `load` -- HTML কন্টেন্ট লোড এবং সকল এক্সটার্নাল রিসোর্স লোড হওয়ার পর এই ইভেন্টটি ট্রিগার হয়।
- `beforeunload/unload` -- ইউজার পেজ লিভ করার পূর্বে।

নিম্নোক্ত কাজে ইভেন্টসমূহ কাজে আসতে পারে:

- `DOMContentLoaded` event -- DOM রেডি, সুতরাং আমরা হ্যান্ডেলারের মাধ্যমে DOM নোডকে পরিবর্তন করতে পারি।
- `load` event -- এক্সটার্নাল রিসোর্স লোড হওয়ার কারণে স্ট্যাইল বা ইমেজ সাইজ প্রভৃতি নিয়ে কাজ করতে পারি।
- `beforeunload` event -- ইউজার পেজ হতে লিভ হওয়ার পূর্বে কল হয়: সুতরাং আমরা পেজ হতে লিভ হওয়ার পূর্বে ইউজার হতে ডাটা সংরক্ষণ বা অন্যান্য ব্যাপারে নিশ্চায়ন করতে পারি।
- `unload` -- ইউজার প্রায় পেজ হতে লিভ হয়ে গেছে, তবে ইউজারের বিভিন্ন পরিসংখ্যান সংরক্ষনের জন্য আমরা এটি ব্যবহার করতে পারি।

চলুন ইভেন্ট সমূহ সম্পর্কে আরো বিস্তারিত জানি।

## DOMContentLoaded

`document` নোডে `DOMContentLoaded` ইভেন্টটি সংগঠিত হয়।

এবং অবশ্যই `addEventListener` এর মাধ্যমে হ্যান্ডালার অ্যাসাইন করতে হবে:

```js
document.addEventListener("DOMContentLoaded", ready);
// not "document.onDOMContentLoaded = ..."
```

যেমন:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // যেহেতু এক্সটার্নাল রিসোর্স লোড হওয়ার পূর্বে এটি ট্রিগার হয় সাইজ দেখাবে 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

উপরের উদাহরণে `DOMContentLoaded` হ্যান্ডালার এক্সিকিউট হবে DOM ট্রি বিল্ড হওয়ার পর, সুতরাং আমরা সকল এলিমেন্ট অ্যাক্সেস করতে পারব, এমনকি `<img>` ও।

কিন্তু এটির সোর্স ডাওনলোড না হওয়ায় সাইজ শূন্য দেখাবে।

প্রথম দেখাতে `DOMContentLoaded` ইভেন্টকে সাধারন মনে হয়। DOM ট্রি রেডি হলেই ইভেন্ট ট্রিগার হবে। তবে এর কিছু ভিন্নতা আছে।

### DOMContentLoaded এবং scripts

যখন ব্রাউজার HTML-document কে প্রসেস করে তখন যদি `<script>` ট্যাগ এক্সিকিউট হয় তখন এদেরকে DOM ট্রি বিল্ডের পূর্বে এরা `<script>` কে এক্সিকিউট করে।  একারণে `<script>` সমূহ এক্সিকিউট না হওয়া পর্যন্ত `DOMContentLoaded` ট্রিগার হবে না।

সুতরাং হ্যান্ডেলার অবশ্যই সবার শেষে এক্সিকিউট হবে:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
```

উপরের উদাহরণে আমরা দেখেছি, প্রথমে "Library loaded..." দেখাবে, তারপর "DOM ready!"

```warn header="Scripts that don't block DOMContentLoaded"
তবে এক্ষেত্রে দুটি ভিন্নতা আছে:
1. `async` অ্যাট্রিবিউট সহ স্ক্রিপ্টস সমূহ `DOMContentLoaded` কে ব্লক করবে না, বিস্তারিত পরবর্তী অধ্যায়ে (info:script-async-defer)।
2. ডায়নামিক্যালি জেনারেট স্ক্রিপ্টস সমূহ যেমন: `document.createElement('script')` এর মাধ্যমে সংযুক্ত স্ক্রিপ্টস সমূহ ইভেন্টকে ব্লক করে না।
```

### DOMContentLoaded এবং styles

এক্সটার্নাল স্ট্যাইলশীট DOM এ কোন প্রভাব ফেলে না, সুতরাং `DOMContentLoaded` এদের জন্য অপেক্ষা করবে না।

তবে একটি ব্যাপার জেনে রাখা উচিত। যদি স্ট্যাইল শীটের পরে স্ক্রিপ্ট থাকে, তাহলে স্ক্রিপ্টটি স্ট্যাইল শীট লোড হওয়া পর্যন্ত অপেক্ষা করবে:

```html run
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // the script doesn't not execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
```

উপরে বর্ণিত উদাহরণের মত অনেক সময় আমাদের এলিমেন্টের বিভিন্ন স্ট্যাইল প্রপার্টি সম্পর্কে জানা লাগে তখন আমরা স্ট্যাইলশীট প্রথমে লোড করি। সুতরাং এটি স্ট্যাইল লোড হওয়ার জন্য অপেক্ষা করবে।

সুতরাং `DOMContentLoaded` যেভাবে স্ক্রিপ্টস এর জন্য অপেক্ষা করে তেমনি স্ট্যাইলশীটের জন্যও করে।

### Built-in browser autofill

`DOMContentLoaded` এর মাধ্যমে ফায়ারফক্স, ক্রোম এবং অপেরাতে স্বয়ংক্রিয়ভাবে ফর্ম ভ্যালু *autofill* সাপোর্ট করে।

উদাহরণস্বরূপ, যদি কোন লগিন পেজে লগিন এবং পাসওয়ার্ড ফর্ম থাকে, এবং আপনি যদি *remember me* জাতীয় কোন ভ্যালু সেভ করে রাখেন তাহলে ব্রাউজার মানগুলো মনে রাখে এবং `DOMContentLoaded` ইভেন্টের মাধ্যমে ইনপুট ফিল্ডগুলো স্বয়ংক্রিয়ভাবে ফিল আপ করে।

সুতরাং যদি কোন বড় স্ক্রিপ্টস এর জন্য যদি `DOMContentLoaded` ইভেন্ট ট্রিগার হতে দেরি হয়, তাহলে autofill হতে দেরি হবে। আপনি হয়তো অনেক সাইট দেখেছেন, যেখানে ব্রাউজার অটোফিল সাপোর্ট করার পরও লগিন ফিল্ড গুলো ফুল পেজ লোড না হওয়া পর্যন্ত ফিল আপ হয় না। এটি ঘটে `DOMContentLoaded` ইভেন্ট এর কারণে, কেননা ফুল পেজ লোড না হওয়া পর্যন্ত `DOMContentLoaded` ইভেন্ট ট্রিগার হয় না।


## window.onload [#window-onload]

ওয়েব পেজের সকল ধরণের রিসোর্স যেমন ইমেজ, স্ট্যাইল ইত্যাদি লোড হওয়ার পর `window` অবজেক্টের `load` ইভেন্ট ট্রিগার হয়। এবং এটিকে আমরা `onload` প্রপার্টির মাধ্যমে অ্যাক্সেস করতে পারি।

নিচের উদাহরণে ইমেজের সাইজ, স্ট্যাইল ইত্যাদি সঠিকভাবে দেখাবে, কেননা `window.onload` সকল রিসোর্স লোড হওয়া পর্যন্ত অপেক্ষা করে:

```html run height=200 refresh
<script>
  window.onload = function() { // window.addEventListener('load', (event) => { এভাবেও ডিফাইন করতে পারি
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

ইউজার পেজ হতে লিভ হওয়ার পূর্বে `window` এর `unload` ইভেন্টটি ট্রিগার হয়। তবে এক্ষেত্রে আমরা কনফার্মেশন বা পপ আপ দেখাতে পারব না।

তবে আমরা চাইলে ইউজারের ব্যবহৃত পরিসংখ্যান সংরক্ষন করতে পারি।

আমরা বিভিন্ন ভাবে ডাটা সংগ্রহ করতে পারি যেমন মাউস ক্লিক, স্ক্রল ইত্যাদি।

সাধারণত ইউজার যখন পেজ হতে লিভ নেয়, তখন আমরা ডাটা সংরক্ষন করতে চায় এবং `unload` ইভেন্টটি ট্রিগার করি।

এজন্য একটি বিশেষ মেথড আছে `navigator.sendBeacon(url, data)`, বিস্তারিত <https://w3c.github.io/beacon/>।

এটি ব্যাকগ্রাউন্ডে ডাটা সেন্ড করে। পেজ হতে লিভ হওয়ার পরও `sendBeacon` কাজ করে।

উদাহরণস্বরূপ:
```js
let analyticsData = { /* object with gathered data */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
};
```

- রিকুয়েস্ট মেথডটি হল POST।
- আমরা স্ট্রিং ছাড়াও অন্যান্য ফরম্যাটে ডাটা পাঠাতে পারি, বিস্তারিত এখানে <info:fetch>, ্তবে সাধারণত এটি stringify অবজেক্ট হয়।
- ডাটা সাইজ সর্বোচ্চ 64kb।

`sendBeacon` রিকুয়েস্ট যখন সমাপ্ত হয়, ততক্ষণে আমরা পেজটি থেকে লিভ নিয়ে নেই, সুতরাং সার্ভার হতে কোন রেস্পেন্স পাব না।

এছাড়াও জেনেরিক নেটওয়ার্ক রিকুয়েস্ট সমূহের [fetch](info:fetch) এর `keepalive` নামের একটি ফ্ল্যাগ আছে । আরো বিস্তারিত জানতে পারব এই অধ্যায়ে <info:fetch-api>।


যদি আমরা পেজ লিভ করার আগে ইউজারকে কোন কনফার্মেশন দেখাতে চাই, তাহলে `unload` এর সাহায্যে পারব না, তবে আরেকটি ইভেন্ট আছে -- `onbeforeunload`।

## window.onbeforeunload [#window.onbeforeunload]

যদি ভিজিটর এক পেজ হতে অন্য পেজে নেভিগেশন করে অথবা পেজ হতে লিভ নিতে চায় তখন `beforeunload` ইভেন্ট ট্রিগার হয়।

এটির সাহায্যে ইউজারকে কনফার্মেশন মেসেজ দেখাতে পারি।

নিচের কোডটি রান করে ব্রাউজার রিলোড করার ট্রাই করুন:

```js run
window.onbeforeunload = function() {
  return false;
};
```

কোন non-empty স্ট্রিং রিটার্নের মাধ্যমেও আমরা ইভেন্ট ক্যান্সেল করতে পারি। পূর্বে এটি কাস্টম মেসেজ দেখাতে ব্যবহার হত তবে মডার্ন ব্রাউজার কাস্টম কনফার্মেশন মেসেজ সাপোর্ট করে না [modern specification](https://html.spec.whatwg.org/#unloading-documents)।

উদাহরণস্বরূপ:

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

এই ইভেন্টটির মাধ্যমে অনেক ডেভলাপার ইউজার কে বিভিন্ন রকমের মেসেজ দেখিয়ে বিভ্রান্তি করার কারণে এটি পরিবর্তন করা হয়েছে। তবে ব্রাউজারগুলোর পুরনো ভার্সনগুলোতে এটি কাজ করতে পারে, তবে মেসেজটি কাস্টমাইজ করার কোন উপায় নেই।

## readyState

যদি আমরা ডকুমেন্ট লোড হওয়ার পর `DOMContentLoaded` হ্যান্ডালার সেট করি তাহলে কি ঘটবে?

সাধারণত, এটি এক্সিকিউট হবে না।

অনেক সময় ডকুমেন্ট কি লোড হয়ে গেছে নাকি লোডিং ধাপে আছে তার উপর নির্ভর করে আমাদের কোন কার্য সম্পাদন করা লাগে, এটি আমরা কিভাবে করতে পারি?

সৌভাগ্যক্রমে `document` অবজেক্টের একটি প্রপার্টি আছে `document.readyState` নামের যা আমাদের পেজ লোডিং এর ধাপসমূহ রিটার্ন করে।

এর ৩টি ভ্যালু আছে:

- `"loading"` -- ডকুমেন্ট লোডিং।
- `"interactive"` -- সম্পূর্ন ডকুমেন্টটি পার্স করে পড়া হয়েছে।
- `"complete"` -- সম্পূর্ন ডকুমেন্টটি পার্স করে পড়া হয়েছে এবং সকল ধরণের রিসোর্স যেমন (img) ও লোড হয়েছে।

সুতরাং আমরা `document.readyState` এর উপর ভিত্তি করে হ্যান্ডেলার সেট করতে পারি।

উদাহরণস্বরূপ:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  // still loading, wait for the event
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM is ready!
  work();
}
```

এছাড়াও `readystatechange` নামের একটি ইভেন্ট আছে যেটি `readyState` এর ভ্যালু পরিবর্তনের সাথে সাথে ট্রিগার হয়:

```js run
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

অনেক আগে থেকে `readystatechange` ইভেন্টটি ডকুমেন্ট এর স্টেট ট্রাকিংয়ের জন্য ব্যবহার করা হচ্ছিল, তবে বর্তমানে এর তেমন ব্যবহার নেই।

চলুন সম্পূর্ণ লাইফসাইকেল টা দেখি।

এখানে `<iframe>`, `<img>` আছে ইভেন্ট লগের জন্য একটি `log()` ফাংশন আছে:

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

উদাহরণটি এখানে দেখুন [in the sandbox](sandbox:readystate)

এটির আউটপুট হবে অনেকটা এমন:
1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

তৃতীয় বন্ধনীর সংখ্যাটি বুঝায় ইভেন্ট সমূহ ট্রিগার আনুমানিক কত সময় লেগেছে।

- এখানে দেখছি `DOMContentLoaded` এর আগে `document.readyState` এর মান `interactive` দেখাচ্ছে। এখানে দুটিই একই সময়ে ঘটে তাই সময় একই দেখাচ্ছে।
- সকল রিসোর্স (`iframe` and `img`) লোড হওয়ার পর `document.readyState` এর মান `complete` হবে। যার কারণে ৫,৬,৭ নং ধাপের সময় একই দেখাচ্ছে। `document.readyState` এর মান `complete` এবং `window onload` উভয়ই একই স্টেট নির্দেশ করে।

## সারাংশ

পেজ লোড ইভেন্ট সমূহ:

  - পেজ লোডিংয়ের সময় DOM রেডি হলে `document` এর `DOMContentLoaded` ইভেন্টটি ট্রিগার হয়। এই ধাপে আমরা যেকোন এলিমেন্ট নোড কে অ্যাক্সেস করতে পারি।
  - `<script>...</script>` বা `<script src="..."></script>` স্ক্রিপ্টস সমূহ DOMContentLoaded কে ব্লক করে রাখে, স্ক্রিপ্টস সমূহ এক্সিকিউট হওয়ার পর DOMContentLoaded ট্রিগার হয়।
  - ইমেজ বা অন্যান্য এক্সটার্নাল রিসোর্স যেমন `iframe` লোড হতে থাকে।
  - সকল ধরণের রিসোর্স লোড হওয়ার পর `window` এর `load` ইভেন্টটি ট্রিগার হয়। তবে এটি খুব কমই ব্যবহার করা হয় কেননা বেশিরভাগ সময় আমাদের এলিমেন্টে বিভিন্ন ধরণের অপারেশন চালানো লাগে DOM ট্রি রেডি হওয়ার পরপরই।
  - ইউজার যখন ব্রাউজার হতে লিভ করতে চাই তখন `window` অবজেক্টের `beforeunload` ইভেন্টটি ট্রিগার হয়, এবং যদি ইভেন্টটি ক্যান্সেল করা হয় তখন এটি ইউজারকে একটি কনফার্মেশন মেসেজ দেখায়(যেমন we have unsaved changes).
  - এবং ইউজার যখন পেজ হতে লিভ করবে তখন `window` অবজেক্টের `unload` ইভেন্টটি ট্রিগার হবে, এবং এটির সাহায্যে কোন ধরণের পপ আপ বা অন্য কোন মেসেজ দেখাতে পারব না, তবে অ্যানালাইসিসের জন্য ইউজারের ডাটা `navigator.sendBeacon` এর মাধ্যমে সংরক্ষন করতে পারি।
  - `document.readyState` ডকুমেন্টের কারেন্ট স্টেট রিটার্ন করে, `readystatechange` ইভেন্টের মাধ্যমে আমরা স্টেট ট্র্যাক করতে পারি:
  - `loading` -- ডকুমেন্ট স্টেট লোডিং।
  - `interactive` -- সম্পূর্ন ডকুমেন্টটি পার্স করে পড়া হয়েছে, এবং সাথে সাথে `DOMContentLoaded` ইভেন্টটি ট্রিগার হবে, তবে `interactive` প্রথমে ট্রিগার হয়।
  - `complete` -- সম্পূর্ন ডকুমেন্টটি পার্স করে পড়া হয়েছে এবং সকল ধরণের রিসোর্স যেমন (img) ও লোড হয়েছে, এবং সাথে সাথে `window.onload` ইভেন্টটি ট্রিগার হবে।

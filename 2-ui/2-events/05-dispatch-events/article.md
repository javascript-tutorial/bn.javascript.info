# Dispatching কাস্টম ইভেন্ট

জাভাস্ক্রিপ্টে শুধুমাত্র হ্যান্ডালার অ্যাসাইন করা ছাড়াও আমরা কাস্টম ইভেন্ট লিখতে পারি।

"graphical components" তৈরিতে আমরা কাস্টম ইভেন্টের সহায়তা নিতে পারি। উদাহরণস্বরূপ, একটি কাস্টম মেনু যার মধ্যে কি ধরণের ইভেন্ট সংগঠিত হচ্ছে তা আমরা ট্র্যাক করতে চাই: `open` (menu open), `select` (একটি আইটেম সিলেক্ট) ইত্যাদি। যার ফলে আমরা অন্যান্য কোডেও আমরা মেনুর মধ্যে কি ইভেন্ট সংগঠিত হচ্ছে তা ট্র্যাক করতে পারব।

সম্পূর্ন নতুন ইভেন্ট লিখার পরিবর্তে আমরা বিল্ট ইন ইভেন্টসমূহ যেমন, `click`, `mousedown` ইত্যাদি গুলোও লিখতে পারি। অটোমেটেড টেস্টিংয়ের জন্য এটি সহায়ক।

## Event constructor

DOM ইলিমেন্ট ক্লাসের মত বিল্ট-ইন ইভেন্টের ক্লাস হায়ার্য়াকি আছে। বিল্ট-ইন রুট ইভেন্ট ক্লাস [Event](http://www.w3.org/TR/dom/#event)।

`Event` অবজেক্ট এভাবে তৈরি করি:

```js
let event = new Event(type[, options]);
```

আর্গুমেন্টস:

- *type* -- ইভেন্ট টাইপ, স্ট্রিং `"click"` অথবা আমাদের নিজস্ব ইভেন্ট নাম `"my-event"`।
- *options* -- একটি অবজেক্ট যার দুটি প্রপার্টি আছে:
  - `bubbles: true/false` -- যদি `true` হয়, ইভেন্ট bubbles হবে.
  - `cancelable: true/false` -- যদি `true` হয়, তাহলে "default action"  বাদাপ্রাপ্ত হতে পারে। কাস্টম ইভেন্টে এটি দ্বারা কি বুঝায় তা আমরা পরে দেখব।

  ডিফল্টভাবে উভয়ই `false`: `{bubbles: false, cancelable: false}`.

## dispatchEvent

`Event` অবজেক্ট তৈরির পর, আমাদের কোন একটি এলিমেন্টের মেথড হিসেবে এটিকে "run" করাতে হবে এভাবে `elem.dispatchEvent(event)`।

এরপর রেগুলার ব্রাউজার ইভেন্টের মত এর জন্য আমরা হ্যান্ডালার অ্যাসাইন করতে পারি। যদি আমরা `bubbles` ফ্ল্যাগ `true` পাঠায়, তাহলে এটি bubbles হবে।

নিচের উদাহরণটিতে `click` ইভেন্টটি জাভাস্ক্রিপ্টের সাহায্যে ইনিশিয়ালাইজ হবে। এছাড়াও বাটনে ক্লিক করলেও হ্যান্ডালারটি কাজ করবে:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
ইভেন্ট কি অটোমেটেড নাকি "real" ইউজারের মাধ্যমে কল হচ্ছে তা আমরা পার্থক্য করতে পারি।

`event.isTrusted` এটি "real" ইউজারের জন্য `true` হবে অন্যথায় স্ক্রিপ্ট জেনারেটর ইভেন্টের জন্য `false` হবে।
```

## Bubbling এর উদাহরণ

আমরা একটি কাস্টম ইভেন্ট `"hello"` লিখব যা bubbling হবে এবং আমরা এটি `document` এ ক্যাচ করব।

এজন্য আমাদের `bubbles` প্রপার্টি এর মান `true` পাঠাতে হবে:

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // document এর মাধ্যমে ধরা...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...elem থেকে dispatch!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // হ্যান্ডেলারটি ডকুমেন্ট হতে ক্যাচ করব।

</script>
```


নোট:

1. কাস্টম ইভেন্টের জন্য আমরা অবশ্যই `addEventListener` ব্যবহার করব, কেননা `on<event>` শুধুমাত্র বিল্ট-ইনের জন্য কাজ করে, এছাড়াও `document.onhello` ও কাজ করবে না।
2. অবশ্যই `bubbles:true` সেট করুন, অন্যথায় bubbling হবে না।

bubbling মেকানিজম বিল্ট-ইন (`click`) এবং কাস্টম ইভেন্ট উভয়ের জন্য (`hello`) একইভাবে কাজ করে। উভয়ই ক্ষেত্রে capturing and bubbling ধাপ আছে।

## MouseEvent, KeyboardEvent এবং অন্যান্য

এখানে UI রিলেটেড কিছু ইভেন্ট ক্লাস বর্ণিত হল [UI Event specification](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

আমাদের এধরণের কোন UI ইভেন্ট লিখা লাগলে আমরা `new Event` এর পরিবর্তে UI ইভেন্ট ক্লাসগুলো লিখব। যেমন, `new MouseEvent("click")`।

কনস্ট্রাকটর সমূহে আমরা স্ট্যান্ডার্ড অনুযায়ী প্রপার্টি সেট করতে পারি।

যেমন মাউস ইভেন্টের জন্য `clientX/clientY`:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

দয়া কর মনে রাখুন: সাধারণ `Event` কন্সট্রাক্টর এটি সাপোর্ট করে না।

চলুন চেষ্টা করা যাক:

```js run
let event = new Event("click", {
  bubbles: true, // শুধুমাত্র bubbles ও cancelable কাজ করবে
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, অচেনা প্রপার্টি ইগনোর হবে!
*/!*
```

তবে টেকনিক্যালি, আমরা ইভেন্ট অবজেক্ট তৈরির পর এভাবে অ্যাসাইন করতে পারি `event.clientX=100`। সুতরাং এভাবে লিখা সুবিধাজনক।

UI ইভেন্ট সম্পর্কে আরো বিস্তারিত জানতে স্পেসিফিকেশন দেখুন, যেমন [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## কাস্টম ইভেন্টস

আমাদের কাস্টম ইভেন্ট তৈরিতে `new CustomEvent` ক্লাস ব্যবহার করা উচিত যেমন `"hello"` এর জন্য। টেকনিক্যালি [CustomEvent](https://dom.spec.whatwg.org/#customevent) `Event` এর মত, তবে এর একটি পার্থক্য আছে।

দ্বিতীয় আর্গুমেন্ট (object) এ আমরা অতিরিক্ত একটি প্রপার্টি `detail` সেট করতে পারি, যার মাধ্যমে আমরা ইভেন্ট এ কাস্টম ডাটা পাঠাতে পারি।

উদাহরণস্বরূপ:

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // হ্যান্ডালারে ইভেন্ট অবজেক্টে আমরা একটি অতিরিক্ত প্রপার্টি detail পাই
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

`detail` প্রপার্টিতে যেকোন ডাটা সেট করতে পারি। টেকনিক্যালি আমরা `CustomEvent` ছাড়াও `new Event` অবজেক্ট ইনিশিয়ালাইজের পর নতুন কোন প্রপার্টিতে ডাটা সেট করতে পারি। কিন্তু `CustomEvent` আমাদের একটি স্পেশাল ইউনিক প্রপার্টি `detail` দেই যার ফলে আমরা প্রপার্টির নাম কনফ্লিক্ট হওয়া এড়াতে পারি।

পাশাপাশি, স্পেসিফিক ইভেন্ট ক্লাস সমূহের দ্বারা ইভেন্ট ডিক্লেয়ার করলে তা আমাদের কাছে সহজে বোধগম্য, এবং ইভেন্ট যদি কাস্টম ইভেন্ট হয়, তাহলে আমাদের `CustomEvent` ব্যবহার করা উচিত যার ফলে আমরা বুঝতে পারি এটি কি কাজ করছে।

## event.preventDefault()

অনেক ব্রাউজার ইভেন্টের কিছু "default action" আছে, যেমন লিংক নেভিগেশন, সিলেকশন, ইত্যাদি।

তবে কাস্টম ইভেন্টের জন্য, কোন ধরণের ব্রাউজার "default action" নেই, কিন্তু কাস্টম ইভেন্টের জন্য ইভেন্ট সংগঠিত হওয়ার পর ব্রাউজার কি আচরণ করবে তা আমরা নির্ধারণ করতে চাই।

`event.preventDefault()` কলের মাধ্যমে, হ্যান্ডেলারে একটি সংকেত পাঠাতে পারি যা দ্বারা আমরা অ্যাকশনসমূহ ক্যান্সেল করতে পারি।

এজন্য `elem.dispatchEvent(event)` কল করুন যা `false` রিটার্ন করে। এবং আমরা এর উপর ভিত্তি করে পরবর্তী কোড রান হবে কি হবে না তা সিদ্ধান্ত নিতে পারি।

একটি বাস্তবিক উদাহরণ দেখা যাক - hiding rabbit।

নিচে আমরা একটি `#rabbit` এলিমেন্ট এবং `hide()` ফাংশন দেখছি যা `"hide"` ইভেন্টের মাধ্যমে dispatches হয়। যার মাধ্যমে আমরা ইউজার থেকে নিশ্চিত হয়ে নিতে পারি আমরা কি খরগোশকে দেখাব নাকি হাইড করব।

`rabbit.addEventListener('hide',...)` এর মাধ্যমে আমাদের অ্যাকশন বাধাপ্রাপ্ত হবে কিনা তা আমরা যাচাই করব, এবং যদি `preventDefault` এর প্রয়োজন হয়, তাহলে `event.preventDefault()` কল করুন। অন্যথায় খরগোশটি হাইড হবে না:

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // এটি ছাড়া preventDefault কাজ করবে না
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('The action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

দয়া কর মনে রাখুন: এজন্য আমাদের `cancelable: true` প্রপার্টি সেট করতে হবে, অন্যথায় `event.preventDefault()` কাজ করবে না।

## Events-in-events are synchronous

সাধারণত ইভেন্ট সমূহ কিউ হিসেবে রান হয়। যেমন: ব্রাউজারে `onclick` ইভেন্ট সংগঠিত হওয়ার পর `mousemove` ইভেন্ট সংগঠিত হল, তাহলে `onclick` হ্যান্ডালার প্রসেস হওয়ার পর `mousemove` হ্যান্ডেলার কল হবে।

তবে ব্যতিক্রম হল যখন একটি ইভেন্ট থেকে অন্য একটি ইভেন্ট কল করা হয়, যেমন `dispatchEvent` এর মাধ্যমে। এই ধরণের ইভেন্ট এর হ্যান্ডেলার সাথে সাথে প্রসেসড হয় এবং এটি শেষ হওয়ার পর ঐ হ্যান্ডেলারের বাকী কোড এক্সিকিউট হয়।

উদাহরণস্বরূপ, নিচের কোডে `onclick` হ্যান্ডেলার কল হওয়ার সময় `menu-open` ইভেন্ট dispatch হয়।

এবং `onclick` ইভেন্টের হ্যান্ডেলার প্রসেসিং শেষ হওয়ার পূর্বে `menu-open` ইভেন্টের হ্যান্ডেলার সাথে সাথে এক্সিকিউট হবে:


```html run autorun
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // 1 এবং 2 এর মাঝে এটি এক্সিকিউট হবে
  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

আউটপুট হবে: 1 -> nested -> 2।

দয়া করে নোট করুন নেস্টেড ইভেন্ট `menu-open` এ ইভেন্ট bubble হবে এবং `document` হতে একে ধরা হবে। এবং হ্যান্ডেলারটি রান হওয়ার পর (`onclick`) এর বাকি কোড প্রসেস হবে।

এটি শুধুমাত্র `dispatchEvent` এর জন্য না অন্যান্য ক্ষেত্রেও এভাবে কাজ করে। যদি ইভেন্ট হ্যান্ডেলার কোন মেথড কল করে এবং এটি অন্য ইভেন্ট ট্রিগার করে তাহলে তারাও সিঙ্ক্রোনাসলি প্রসেসড হয়।

এখন ধরুন আমরা এভাবে প্রসেসড করতে চাই না। আমরা চাই `onclick` সম্পূর্ন প্রসেস হওয়ার পর, `menu-open` ইভেন্ট হ্যান্ডেলার কল হবে।

তাহলে আমরা `dispatchEvent` কে `onclick` হ্যান্ডেলারের শেষে কল করব অথবা আমরা এটিকে `setTimeout` ফাংশনের মাধ্যমে জিরো-সেকেন্ড ডিলে এর মাধ্যমে কল করব:

```html run
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

এখন `dispatchEvent` অ্যাসিঙ্ক্রোনাসলি কল হবে, সুতরাং `mouse.onclick` সম্পূর্ন প্রসেস হওয়ার পর `menu-open` ইভেন্ট হ্যান্ডেলার কল হবে।

আউটপুট হবে: 1 -> 2 -> nested.

## সারাংশ

কাস্টম ইভেন্টের জন্য আমাদের একটি ইভেন্ট অবজেক্ট তৈরি করতে হবে।

`Event(name, options)` ক্লাস এর দুটি আর্গুমেন্টস আছে একটি স্ট্রিং যা ইভেন্টের নাম নির্দেশ করে অন্যটি একটি অবজেক্ট `options` যার দুটি প্রপার্টি:
- `bubbles: true` হলে ইভেন্টটি বাবল হবে।
- `cancelable: true` হলে `event.preventDefault()` কাজ করবে।

অন্যান্য UI ইভেন্ট যেমন `MouseEvent`, `KeyboardEvent` ইত্যাদি স্পেসিফিকেশন অনুযায়ী প্রপার্টি অ্যাক্সেপ্ট করে। যেমন, মাউস ইভেন্টের জন্য `clientX`।

কাস্টম ইভেন্টের জন্য আমরা `CustomEvent` কনস্ট্রাকটর ব্যবহার করি। এর একটি স্পেশাল প্রপার্টি আছে `detail`, যার মাধ্যমে আমরা ডাটা পাঠাতে পারি এবং হ্যান্ডেলারে ডাটা `event.detail` ধরতে পারি।

ব্রাউজার ইভেন্ট যেমন `click` বা `keydown` এই টাইপের ইভেন্ট গুলো স্ক্রিপ্টের মাধ্যমে রান করানোর সময় আমাদের সতর্ক থাকতে হবে।

ব্রাউজার ইভেন্টগুলো স্ক্রিপ্টের মাধ্যমে রান করানো থেকে যথাসম্ভব বিরত থাকতে হবে, কেননা এটি বেশিরভাগ সময় *bad architecture* হিসেবে গণ্য হয়।

নেটিভ ইভেন্টসমূহ এভাবে জেনারেট হতে পারে:

- 3rd-party লাইব্রেরি গুলোর জন্য।
- অটোমেটেড টেস্টিংয়ের জন্য, স্ক্রিপ্টের মাধ্যমে "click the button" রান করিয়ে দেখব আমাদের ইন্টারফেস সঠিকভাবে কাজ করছে কিনা।

কাস্টম ইভেন্ট সমূহ জেনারেট করা হয় *good architecture* এর জন্য, আমাদের কম্পোনেন্টে কি ঘটছে তা আমরা জানতে পারি।

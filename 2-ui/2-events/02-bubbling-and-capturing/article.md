# Bubbling এবং capturing

একটি উদাহরণ দিয়ে শুরু করা যাক।

`<div>` এর মধ্যে একটি হ্যান্ডেলার অ্যাসাইন করলাম, কিন্তু যদি `<em>` বা `<code>` এ ক্লিক করা হয় তাহলেও এটি রান করবে:

```html autorun height=60
<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>
```

এটি কিছুটা অদ্ভুত না? কেন `<em>` ক্লিকে `<div>` এর হ্যান্ডেলারটি রান হয়?

## Bubbling

এর প্রধান কারণ *bubbling*।

**যখন কোন এলিমেন্টে ইভেন্ট সংগঠিত হয়, প্রথমে এলিমেন্টটির হ্যান্ডেলার রান হবে, তারপর তার প্যারেন্টটি রান হবে, এভাবে তার উপরের এলিমেন্টটি রান হবে**

দেখা যাক আমাদের ৩ টি নেস্টেড এলিমেন্ট `FORM > DIV > P` আছে এবং তাদের প্রতিটিতে একটি হ্যান্ডেলার আছে:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

`<p>` এলিমেন্টে ক্লিক হলে প্রথমে তার `onclick` রান হবে:
1. প্রথমে `<p>` দেখাবে।
2. তারপর এর উপরের `<div>`।
3. তারপর এর উপরের `<form>`।
4. এভাবে `document` অবজেক্ট পর্যন্ত।

![](event-order-bubbling.svg)

সুতরাং আমরা যদি `<p>` তে ক্লিক করি, তাহলে আমরা ৩টি অ্যালার্ট দেখব: `p` -> `div` -> `form`।

এই প্রক্রিয়ায়টিকে বলে "bubbling", কেননা ইভেন্ট সমূহ "bubble" আকারে উপরের দিকে উঠে অনেকটা পানির বুদবুদের মত।

```warn header="*প্রায়* সকল ইভেন্ট bubble"
এখানে আমরা "প্রায়" ব্যবহার করছি।

যেমন, `focus` ইভেন্ট bubble হয় না। এছাড়াও আরো কিছু উদাহরণ আছে, পরবর্তী আমরা তাদের দেখব। কিন্তু এরা ব্যতীক্রম, বেশিরভাগ ইভেন্ট bubble হয়।
```

## event.target

প্যারেন্ট এলিমেন্টের হ্যান্ডেলার থেকে আমরা সর্বদা কোথা হতে ইভেন্টটি সংগঠিত হচ্ছে তার বিস্তারিত জানতে পারি।

**যে এলিমেন্ট হতে আমাদের ইভেন্ট সংগঠিত হয় তাকে বলা হয় *target element* এটি `event.target` দ্বারা এক্সেস করা যায়**

পার্থক্যটি নোট করুন  `this` (=`event.currentTarget`):

- `event.target` -- হল "target" এলিমেন্ট যেখানে ইভেন্টটি সংগঠিত হয়, bubbling এর মাধ্যমে এটি পরিবর্তিত হয় না।
- `this` -- এটি দ্বারা "বর্তমান" এলিমেন্টটি বুঝায়, যেখান হতে হ্যান্ডেলারটি রান হচ্ছে।

যেমন, যদি আমাদের একটি হ্যান্ডেলার `form.onclick` এ থাকে, তাহলে এটি তার সকল চাইল্ড এলিমেন্ট এ ক্লিকের জন্য কাজ করবে। কোথায় ক্লিক হচ্ছে এটি ব্যাপার না, ইভেন্টটি *bubble* আকারে `<form>` এ এসে হ্যান্ডেলারটি রান করবে।

`form.onclick` হ্যান্ডেলারে:

- `this` (=`event.currentTarget`) এটি হল `<form>` এলিমেন্টটি, হ্যান্ডেলারটি এখানে রান হচ্ছে।
- `event.target` form এর যে এলিমেন্টটি ক্লিকড হচ্ছে।

লাইভ উদাহরণ দেখুন:

[codetabs height=220 src="bubble-target"]

যখন `<form>` এলিমেন্টে ক্লিকড হবে `event.target` এবং `this`উভয়ই সমান হবে।

## bubbling কে থামানো

ইভেন্ট *bubbling* টার্গেট এলিমেন্ট পর্যন্ত যায়। সাধারণত এটি `<html>` এ এবং তারপর শেষ পর্যন্ত `document` অবজেক্ট পর্যন্ত যায়, এবং কিছু ইভেন্ট `window` পর্যন্ত যায়।

তবে আমরা চাইলে হ্যান্ডেলারের মাধ্যমে bubbling থামাতে পারি।

এজন্য একটি মেথড আছে `event.stopPropagation()`।

যেমন, এখানে `body.onclick` কাজ করবে না যদি `<button>` এ ক্লিক করা হয়:

```html run autorun height=60
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
যদি কোন এলিমেন্টে একটি ইভেন্টের জন্য একাধিক হ্যান্ডেলার থাকে, তাহলে যদি একটির মাধ্যমে bubbling থামানো হয়, অন্যান্য গুলো এক্সিকিউট হবে।

অন্যভাবে বলতে পারি, `event.stopPropagation()` প্যারেন্ট এলিমেন্টের হ্যান্ডেলার এক্সিকিউশন থামায়, কিন্তু ঐ এলিমেন্টের বাকী সব হ্যান্ডেলার রান হবে।

যদি আমরা কোন একটি হ্যান্ডেলার রান হওয়ার পর অন্য সকল হ্যান্ডেলারের এক্সিকিউশন থামাতে চায় এজন্য আমাদের আরেকটি মেথড আছে `event.stopImmediatePropagation()`।
```

```warn header="প্রয়োজন ছাড়া Bubbling থামাবেন না!"
Bubbling একটি সুবিধাজনক উপায়। কোন ধরণের সুস্পষ্ট কারণ ছাড়াই এটি থামাবেন না।

অনেক সময় `event.stopPropagation()` কিছু অদৃশ্য অদ্ভুত আচরণ করে যা আমাদের জন্য বিপদজনক হতে পারে।

যেমন:

1. আমরা একটি নেস্টেড মেনু তৈরি করব। প্রতিটি সাবমেনুর একটি ক্লিক হ্যান্ডেল করে এবং তারপর এটি  `stopPropagation` কল করে যার ফলে প্যারেন্ট মেনু কল হবে না।
2. পরবর্তীতে আমরা সিদ্ধান্ত নিলাম আমরা সম্পূর্ন window এর জন্য ক্লিক ইভেন্ট অ্যাসাইন করব, ইউজারের বিহেভিয়ারের জন্য (কোন এলিমেন্টে ক্লিক হচ্ছে তা জানতে চায়)। এধরণের কিছু অ্যানালিটিক্স সিস্টেম আছে। এজন্য আমরা এভাবে কোড লিখি `document.addEventListener('click'…)` সকল ক্লিক ক্যাচ করার জন্য।
3. আমাদের অ্যানালিটিক্স এক্ষেত্রে কাজ করবে না কেননা মেনু তে আমরা `stopPropagation` দ্বারা *bubbling* কে থামিয়ে দেয়। এক্ষেত্রে মেনুটি "dead zone" এ পরিণত হবে।

আসলে আমাদের *bubbling* এর জন্য ইভেন্ট prevent করা লাগবে না। এ ধরণের সমস্যা গুলো আমরা অন্যভাবে সমাধান করতে পারি, যার একটি উপায় হল কাস্টম ইভেন্ট, পরবর্তী অধ্যায়ে এ ব্যাপারে জানব।
```


## Capturing

ইভেন্ট প্রসেসিংয়ের আরেকটি ধাপ হল "capturing"। এটি বাস্তবিক ক্ষেত্রে আমরা খুব কমই ব্যবহার করি, কিন্তু অনেক সময় এটি ব্যবহার সুবিধাজনক।

<<<<<<< HEAD
স্ট্যান্ডার্ড [DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) ইভেন্ট চলাকালীন ৩টি ধাপ সম্পন্ন করে:
=======
The standard [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) describes 3 phases of event propagation:
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

1. Capturing phase -- ইভেন্ট DOM রুট হতে নিচের দিকে এলিমেন্ট পর্যন্ত পৌঁছায়।
2. Target phase -- ইভেন্ট টার্গেট এলিমেন্ট পর্যন্ত পৌঁছায়।
3. Bubbling phase -- ইভেন্ট টার্গেট *bubble* আকারে উপরের দিকে যায়।

<<<<<<< HEAD
এখানে *table* এর `<td>` তে ক্লিকে ৩টি ধাপ কিভাবে সম্পন্ন হচ্ছে দেখানো হল:
=======
Here's the picture, taken from the specification, of the capturing `(1)`, target `(2)` and bubbling `(3)` phases for a click event on a `<td>` inside a table:
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

![](eventflow.svg)

`<td>` তে ক্লিকে (capturing phase) এ DOM এর রুট নোড হতে নিচের দিকে হ্যান্ডেলার এলিমেন্ট পর্যন্ত যায়, তারপর এটি টার্গেট এলিমেন্টে পৌঁছায় এবং (target phase) ট্রিগার হয়, এবং তারপর এটি (bubbling phase) সম্পন্ন করে, এবং হ্যান্ডেলার কল হয়।

<<<<<<< HEAD
**capturing phase আমরা খুব কমই ব্যবহার করি, তাই উপরে আমরা শুধু bubbling নিয়ে আলোচনা করেছি।**

আমরা `on<event>` এর জন্য অ্যাট্রিবিউট বা প্রপার্টি অথবা `addEventListener(event, handler)` এর মাধ্যমে হ্যান্ডেলার অ্যাসাইন করি যেখানে *Capturing phase* টি রান হয় না, এটি শুধুমাত্র ২য় এবং ৩য় ধাপটি রান করে।
=======
Until now, we only talked about bubbling, because the capturing phase is rarely used.

In fact, the capturing phase was invisible for us, because handlers added using `on<event>`-property or using HTML attributes or using two-argument `addEventListener(event, handler)` don't know anything about capturing, they only run on the 2nd and 3rd phases.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

ক্যাপচারিং ধাপটির আমাদের আরো একটি অতিরিক্ত প্যারামিটার `capture` এর ভ্যালু `true` পাঠাতে হয়:

```js
elem.addEventListener(..., {capture: true})
<<<<<<< HEAD
// অথবা শুধুমাত্র true
=======

// or, just "true" is an alias to {capture: true}
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10
elem.addEventListener(..., true)
```

`capture` option এর দুটি মান হতে পারে:

- এটি ডিফল্ট `false`, তখন এটি *bubbling phase* এ কাজ করে।
- যদি `true` হয়, তখন এটি *capturing phase* এ কাজ করে।


আমাদের ৩টি ধাপ আছে, ১ম বা ৩য় উভয় ধাপের জন্য দ্বিতীয় ধাপটি ("target phase": ইভেন্ট হ্যান্ডেলার এলিমেন্ট পর্যন্ত পৌঁছায়)।

এখানে একটি উদাহরণ দেখানো হল:

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

এখানে আমরা *প্রতিটি* এলিমেন্টের জন্য হ্যান্ডেলার সেট করেছি।

যদি আপনি `<p>` তে ক্লিক করেন তাহলে, এটি এমন দেখাবে:

<<<<<<< HEAD
1. `HTML` -> `BODY` -> `FORM` -> `DIV` (প্রথম listener টিতে capturing phase `true`):
2. `P` (target phase, দুইবার ট্রিগার হবে, যেহেতু আমরা দুটি listener সেট করেছি: capturing and bubbling)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, দ্বিতীয় listener)।
=======
1. `HTML` -> `BODY` -> `FORM` -> `DIV -> P` (capturing phase, the first listener):
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we've set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

*event* এর একটি প্রপার্টি আছে `event.eventPhase` যার মাধ্যমে আমরা জানতে পারি কোন ধাপটি সম্পন্ন হচ্ছে। কিন্তু এটি খুব কম ব্যবহার করি কেননা আমরা হ্যান্ডেলারের মাধ্যমেই এটি জানতে পারি।

```smart header="To remove the handler, `removeEventListener` এর জন্য হ্যান্ডেলারের phase একই হতে হবে"
যদি আমাদের phase এভাবে সেট করি `addEventListener(..., true)`, তাহলে removeEventListener এর জন্যই `removeEventListener(..., true)` লিখতে হবে অন্যথায় এটি কাজ করবে না।
```

<<<<<<< HEAD
````smart header="একই এলিমেন্ট এবং একই phase এর জন্য Listeners অর্ডার অনুযায়ী কাজ করে"
যদি আমাদের কোন এলিমেন্টের জন্য একই phase এর জন্য একাধিক হ্যান্ডেলার অ্যাসাইন করি, তাহলে তারা যেই অর্ডারে লিখা হয়েছে সেভাবেই রান হবে:
=======
````smart header="Listeners on the same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

```js
elem.addEventListener("click", e => alert(1)); // এটি প্রথমে রান হবে
elem.addEventListener("click", e => alert(2));
```
````

```smart header="The `event.stopPropagation()` during the capturing also prevents the bubbling"
The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down ("capturing") and then up ("bubbling"). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur.
```


## সারাংশ

যখন কোন ইভেন্ট সংগঠিত হয় -- এটি নেস্টেড যে এলিমেন্ট হতে কল হয় তাকে বলা হয় "target element" (`event.target`)।

<<<<<<< HEAD
- তারপর এটি document root নোড হতে নিচের দিকে `event.target` পর্যন্ত যায়, যখন হ্যান্ডেলারটি `addEventListener(..., true)` এভাবে কল করা হয় (`{capture: true}` এর সংক্ষিপ্তরূপ `true`)।
- তারপর "target element" কল হয়।
- আবার যদি আমরা হ্যান্ডেলারটি ৩য় প্যারামিটারটি ছাড়া অথবা (`{capture: false}`/`true`) এভাবে কল করি তখন এটি bubbles আকারে `event.target` এর উপর হতে document root নোড পর্যন্ত যায়।
=======
- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(..., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` to the root, calling handlers assigned using `on<event>`, HTML attributes and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

সকল ক্ষেত্রেই আমরা `event` অবজেক্টটি পাব:

- `event.target` -- যে এলিমেন্টে ইভেন্টটি সংগঠিত হয়েছে।
- `event.currentTarget` (=`this`) -- যেখানে ইভেন্টটি অ্যাসাইন করা হয়েছে (এখানে আমরা হ্যান্ডেলারটিও অ্যাসাইন করি)।
- `event.eventPhase` -- current phase (capturing=1, target=2, bubbling=3)।

হ্যান্ডেলারে `event.stopPropagation()` কল করার মাধ্যমে আমরা ইভেন্ট কে থামাতে পারি, তবে এই ব্যাপারে আমাদের সতর্ক থাকতে হবে, কেননা এর ফলে আমাদের পরবর্তী মোডিফিকেশন জটিল হয়ে যেতে পারে।

<<<<<<< HEAD
সাধারণত আমরা ক্যাপচারিং ধাপটি তেমন ব্যবহার করি না, আমরা bubbling এর মধ্যমেই লজিক ঠিক করতে পারি।
=======
The capturing phase is used very rarely, usually we handle events on bubbling. And there's a logical explanation for that.
>>>>>>> d694e895efe89922a109702085b6ca1efeffea10

আমাদের বাস্তবিক ক্ষেত্রে কোন দূর্ঘটনা ঘটলে প্রথমে স্থানীয় কর্তৃপক্ষকে জানায়। কেননা তারাই প্রথমে এটি দেখভাল করতে পারে। তারপর দরকার হলে উর্ধদন কর্তৃপক্ষকে জানায়।

ইভেন্ট হ্যান্ডেলারকেও আপনি অনুরূপ বিবেচনা করতে পারেন, এজন্য আমাদের জন্য *capturing phase* এর চেয়ে *bubbling phase* টিই বেশি সুবিধাজনক।

"event delegation" একটি অত্যন্ত শক্তিশালী ইভেন্ট হ্যান্ডলিং প্যাটার্ন এর মূল ভিত্তিই হল Bubbling এবং capturing  পরবর্তী অধ্যায়ে আমরা এ সম্পর্কে জানব।

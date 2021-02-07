# Searching: getElement*, querySelector*

DOM নেভিগেশনসমূহ একই সিব্লিং বা নিকট এলিমেন্ট সমূহের জন্য অনেক কাজের। কিন্তু যদি এভাবে না থাকে? কিভাবে আমরা একটি স্বতন্ত্র এলিমেন্ট পেতে পারি?

এজন্য আমাদের কিছু সার্চিং মেথড আছে।

## document.getElementById বা শুধু id

যদি এলিমেন্টে শুধু `id` অ্যাট্রিবিউট থাকে, তাহলে আমরা এলিমেন্টটি এভাবে `document.getElementById(id)` মেথডের সাহায্যে খুঁজে পেতে পারি, এটি DOM এর কোন অবস্থানে আছে তা মূখ্য নয়।

যেমন:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // এলিমেন্টটি খোঁজা
*!*
  let elem = document.getElementById('elem');
*/!*

  // ব্রাকগ্রাউন্ড লাল সেট করা
  elem.style.background = 'red';
</script>
```

এছাড়াও, গ্লোভাল ভ্যারিয়েবল হিসেবে শুধু `id` এর নাম দ্বারাও এলিমেন্টকে রেফারেন্স করতে পারি:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  // elem দ্বারা DOM-elemnet এর id="elem" কে রেফারেন্স করা হয়
  elem.style.background = 'red';

  // id="elem-content" এর মাঝে হাইফেন আছে, এটি ভেরিয়েবল নাম হতে পারে না
  // ...কিন্তু আমরা স্কয়ার ব্রাকেটের সাহায্যে একে অ্যাক্সেস করতে পারি: window['elem-content']
</script>
```

...এটি কাজের নয়, যদি আমরা একই নামের একটি জাভাস্ক্রিপ্ট ভ্যারিয়েবল ডিক্লেয়ার করি, এটি প্রিসিডেন্স অনুযায়ী কাজ করবে:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // এখানে elem হল 5, এটি দ্বারা একে রেফারেন্স করা হবে না <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="দয়া করে এলিমেন্ট এক্সেস করতে id কে গ্লোবাল ভ্যারিয়েবল হিসেবে ব্যবহার করবেন না"
আরো বিস্তারিত জানতে [in the specification](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), সুতরাং এটি স্ট্যান্ডার্ড। কিন্তু এটি *compatibility* সমর্থনের জন্য।

ব্রাউজার JS এবং DOM এর ভ্যারিয়েবল সমূহকে মিক্সিং করে আমাদের সহায়তা করে। এটি সাধারণ স্ক্রিপ্ট, ইনলাইন HTML এর জন্য ভালো হতে পারে, কিন্তু আসলেই এটি তেমন কাজের নয়। এখানে ভ্যারিয়েবলের নামের কনফ্লিক্ট হতে পারে। এছাড়াও যখন কেউ জাভাস্ক্রিপ্ট কোড পড়বে এবং ভিউতে HTML থাকবে না, ভ্যারিয়েবলটি কোথা থেকে এসেছে বোধগম্য হবে না।

এখানে আমরা `id` দ্বারা সরাসরি এলিমেন্টকে রেফারেন্স করব সংক্ষিপ্তকরনের জন্য, এবং এলিমেন্টটি আমাদের কাছে সুস্পষ্ট।

তবে বাস্তবিক ক্ষেত্রে `document.getElementById` ব্যবহার করা উচিত।
```

```smart header="`id` অবশ্যই স্বতন্ত্র হতে হবে"
`id` অবশ্যই স্বতন্ত্র হতে হবে। ডকুমেন্টে `id` দ্বারা শুধুমাত্র একটি এলিমেন্টকে নির্দেশিত করে।

যদি একই `id` দ্বারা অনেক এলিমেন্ট ডিক্লেয়ার করা হয়, তাহলে মেথডসমূহ অপ্রত্যাশিত কাজ করবে, যেমন `document.getElementById` যেকোন একটি এলেমেন্টকে রিটার্ন করতে পারে। সুতরাং আমাদের অবশ্যই মনে রাখতে হবে `id` হবে স্বতন্ত্র।
```

```warn header="`anyElem.getElementById` না, শুধু `document.getElementById`"
`getElementById` মেথডটি শুধুমাত্র `document` অবজেক্টের মেথড। এটি সমস্ত ডকুমেন্ট `id` দ্বারা নির্দেশিত এলিমেন্টটির খোঁজ করবে।
```

## querySelectorAll [#querySelectorAll]

এখনো পর্যন্ত সবচেয়ে বেশি কাজের মেথডটি হল `elem.querySelectorAll(css)`, যা CSS সিলেক্টরস দ্বারা ম্যাচ করা সকল `elem` কে রিটার্ন করবে।

এখানে আমরা সকল শেষ `<li>` এলিমেন্ট কে খোঁজব:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

মেথডটি অনেক কাজের, কেননা আমরা যেকোন CSS সিলেক্টরস ব্যবহার করতে পারব।

```smart header="আমরা সুডো ক্লাস সমূহ ব্যবহার করতে পারব"
CSS সিলেক্টরস সুডো-ক্লাস যেমন `:hover` এবং `:active` সাপোর্ট করবে। যেমন, `document.querySelectorAll(':hover')` পয়েন্টার করা এলিমেন্টের কালেকশন রিটার্ন করবে।
```

## querySelector [#querySelector]

`elem.querySelector(css)` CSS সিলেক্টরস দ্বারা ম্যাচ করা প্রথম `elem` কে রিটার্ন করবে।

অন্য কথায় বলা যায়, `elem.querySelector(css)`এবং `elem.querySelectorAll(css)[0]` একই, কিন্তু দ্বিতীয়টি *সকল* এলিমেন্ট হতে একটিকে রিটার্ন করবে, যেখানে `elem.querySelector` শুধুমাত্র প্রথমটি রিটার্ন করে, সুতরাং এটি দ্রুত কাজ করে এবং কোডও সংক্ষিপ্ত।

## matches

পূর্ববর্তী মেথড সমূহ DOM এ সার্চ করে।

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) এট কোন এলিমেন্ট রিটার্ন করে না, `elem` এটি কেবল CSS সিলেক্টরস দ্বারা `elem` টি আছে কিনা যাচাই করে। এটি কেবল `true` বা `false` রিটার্ন করে।

মেথডটি কোন কালেকশনে ফিল্টার করতে কাজে আছে।

উদাহরণ:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // document.body.children এর পরিবর্তে যে কোন কালেকশন হতে পারে
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

*Ancestors* এলিমেন্ট সমূহ হল: প্যারেন্ট এলিমেন্ট, প্যারেন্ট এলিমেন্টের প্যারেন্ট, পূর্বের এলিমেন্টের প্যারেন্ট এভাবে।  এলিমেন্ট সমূহ দ্বারা এভাবে এলিমেন্ট ট্রি তৈরি করে।

`elem.closest(css)` তার CSS-selector দ্বারা নিকটতম প্যারেন্ট এলিমেন্ট কে খুঁজে। `elem` নিজেও সার্চিংয়ে অন্তর্ভুক্ত।

অন্যথায় বলা যায়, `closest` মেথডটি এলিমেন্ট এর নিকটতম প্যারেন্ট এলিমেন্টকে খুঁজে। যদি এটি সিলেক্টরস এর সাথে ম্যাচ করে, তারপর সার্চিংটি থেমে যাবে এবং প্যারেন্ট এলিমেন্টটি রিটার্ন করবে।

যেমন:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (কেননা h1 প্যারেন্ট নোড না)
</script>
```

## getElementsBy*

এছাড়াও আরো কিছু এলিমেন্ট দ্বারা নোড সার্চ করা যায় যেমন ট্যাগ, ক্লাস ইত্যাদি।

বর্তমানে মেথড সমূহ তেমন ব্যবহার হয় না, কেননা `querySelector` আরো বেশি দ্রুত এবং সংক্ষেপে লিখা যায়।

এখানে আমরা জেনে রাখার জন্য এদের আলোচনা করছি, মর্ডান জাভাস্ক্রিপ্টে এদের তেমন ব্যবহার নেই, তবে পুরনো স্ক্রিপ্ট বা লাইব্রেরী সমূহে এদের আমরা দেখতে পায়।

- `elem.getElementsByTagName(tag)` ট্যাগের নামানুসারে এলিমেন্টে খুঁজে এবং কালেকশন সমূহ রিটার্ন করে। `tag` এর প্যারামিটার হিসেবে যেকোন ট্যাগের জন্য `"*"` পাঠাতে পারি।
- `elem.getElementsByClassName(className)` CSS ক্ল্যাস অনুযায়ী এলিমেন্ট সমূহ রিটার্ন করে।
- `document.getElementsByName(name)` `name` অ্যাট্রিবিউট অনুযায়ী এলিমেন্ট সমূহ রিটার্ন করে।

উদাহরণস্বরূপ:
```js
// DOM এর সকল divs
let divs = document.getElementsByTagName('div');
```

চলুন *table* থেকে সকল `input` ট্যাগ কে খুঁজি:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="সিঙ্গুলার এবং প্লুরাল ভুলবেন না `\"getElement\"` এবং `\"getElements\"`!"
নতুন ডেভলাপাররা `\"getElement\"` এবং `\"getElements\"`নিয়ে ভুল করে ফেলে। যেমন <code>getElement<b>s</b>ByTagName</code> এর বদলে `getElementByTagName`।

`"s"` ছাড়া `getElementById`, এটি একটি সিঙ্গেল এলিমেন্ট রিটার্ন করবে। কিন্তু `getElementsByTagName` এলিমেন্টের কালেকশন রিটার্ন করবে।
```

````warn header="সিঙ্গেল এলিমেন্ট এর বদলে কালেকশন রিটার্ন!"
বেশিরভাগ সময় নতুন ডেভলাপাররা আরো একটি সাধারণ ভুল করে থাকে:

```js
// এটি কাজ করবে না
document.getElementsByTagName('input').value = 5;
```

এটি কাজ করবে না, কেননা এটি একটি ইনপুট এর *collection* রিটার্ন করে।

আমরা ইটারেট এর মাধ্যমে অথবা ইন্ডেক্স এর মাধ্যমে কালেকশনটি অ্যাক্সেস করতে পারি:

```js
// এটি কাজ করবে (যদি ইনপুট এলিমেন্ট থাকে)
document.getElementsByTagName('input')[0].value = 5;
```
````

`.article` এলিমেন্ট খোঁজা:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // name attribute এর সাহায্যে খুঁজা
  let form = document.getElementsByName('my-form')[0];

  // form এর মধ্যে ক্ল্যাস দ্বারা খুঁজা
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, "article" ক্লাস দ্বারা দুটি এলিমেন্ট খুঁজে পাই
</script>
```

## Live collections

`"getElementsBy*"` মেথড সমূহ সর্বদা একটি *live* কালেকশন রিটার্ন করবে। এই ধরণের কালেকশনসমূহ DOM এ সর্বদা কোন পরিবর্তন হলে "অটো-আপডেট" হয়।

নিচের উদাহরণে, দুটি স্ক্রিপ্ট আছে।

1. প্রথমটিতে আমরা `<div>` এর একটি কালেকশন পায়, সুতরাং এর এলিমেন্ট হল `1`।
2. দ্বিতীয় স্ক্রিপটির পূর্বে নতুন `<div>` সংযোজন হয়, সুতরাং এর এলিমেন্ট হবে `2`।

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

বিপরীতে, `querySelectorAll` রিটার্ন করবে একটি *static* কালেকশন। এটি এলিমেন্ট সমূহের একটি ফিক্সড অ্যারে রিটার্ন করবে।

নিম্নের উদাহরণে উভয়ই ক্ষেত্রে `1` রিটার্ন করবে:


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

উভয় উদাহরণের পার্থক্য থেকে বুঝতে পারি। স্ট্যাটিক কালেকশনে DOM এ নতুন `div` আসলেও কোন পরিবর্তন হবে না।

## সারাংশ

DOM এ নোড খুঁজার জন্য প্রধান ৬টি মেথড আছে:

<table>
<thead>
<tr>
<td>মেথড</td>
<td>সার্চ করার উপায়...</td>
<td>এলিমেন্ট কল করা যায়?</td>
<td>লাইভ?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

বহুল ব্যবহৃত মেথড হল `querySelector` এবং `querySelectorAll`, কিন্তু অনেক সময় `getElementBy*` ও কাজে আসে অথবা আমরা পুরনো স্ক্রিপ্ট সমূহেও এদের ব্যবহার দেখি।

এছাড়াও:

- `elem.matches(css)` দ্বারা কোন `elem` CSS selector দ্বারা মেলে কিনা যাচাই করে।
- `elem.closest(css)` দ্বারা CSS-selector এর এলিমেন্ট এর নিকটতম প্যারেন্ট নোডকে খুঁজা হয়। `elem` টির মধ্যেও যাচাই করে।

চাইল্ড-প্যারেন্ট খুঁজার জন্য আরো একটি মেথড আছে, যা অনেক সময় কাজে দেয়:
-  `elemA.contains(elemB)` *true* রিটার্ন করবে যদি `elemB`, `elemA` এর মধ্যে থাকে (`elemA` এর চাইল্ড) অথবা যখন `elemA==elemB`।

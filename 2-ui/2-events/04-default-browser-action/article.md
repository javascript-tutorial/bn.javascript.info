# ব্রাউজারের ডিফল্ট অ্যাকশন

অনেক ইভেন্ট আছে তা কিভাবে সংগঠিত হবে তা ব্রাউজারে নির্দেশ করা থাকে।

যেমন:

- কোন লিংকে ক্লিক - URL নেভিগেশন হয়।
- ফর্মের সাবমিট বাটনে ক্লিকড হলে - সার্ভারে ডাটা সাবমিশন শুরু হয়।
- কোন টেক্সটে মাউস ক্লিক করে মুভ করলে - টেক্সট সিলেক্ট হয়।

ইভেন্ট হ্যান্ডেলিং করার সময় অনেক সময় ব্রাউজারের ডিফল্ট বিহেভিয়ারের পরিবর্তে আমরা আমাদের চাহিদামত ইভেন্টগুলো প্রসেস করতে চাই।

## ব্রাউজারের অ্যাকশনকে বাধাপ্রদান

দুইভাবে আমরা ব্রাউজারের ডিফল্ট বিহেভিয়ার থামাতে পারি:

- সাধারণত `event` অবজেক্টের মাধ্যমে, এর একটি মেথড আছে যাকে কল করার মাধ্যমে `event.preventDefault()` ।
- আর যদি ইভেন্টটি (`addEventListener`) এর পরিবর্তে `on<event>` এর মাধ্যমে অ্যাসাইন করা হয়, তাহলে `false` রিটার্নের মাধ্যমে।

নিচের উদাহরণটিতে ব্রাউজারের URL নেভিগেশন কাজ করবে না:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

পরবর্তী মেন্যু উদাহরণটিতে আমরা জাভাস্ক্রিপ্টের এই কৌশলটি ব্যবহার করব।

```warn header="হ্যান্ডালের `false` রিটার্নের মাধ্যমে একটি এক্সেপশন থ্রো হয়"
সাধারণত ইভেন্ট হ্যান্ডালারে কোন ভ্যালু রিটার্ন হলে তা ইগনোরড করে।

 `on<event>` দ্বারা কোন হ্যান্ডালার অ্যাসাইন করা হলে `return false` এক্সেপশন থ্রো করে।

অন্য সকল ক্ষেত্রে, `return` ভ্যালু ইগনোরড হয়। বিশেষত, `true` রিটার্নের আলাদা কোন সুবিধা নেই।
```

### Example: the menu

এইরকম একটি মেন্যু বিবেচনা করুন:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

কিছু CSS রুলস সহ এটি দেখতে এমন:

[iframe height=70 src="menu" link edit]

মেন্যু আইটেম সমূহ `<button>` এর পরিবর্তে `<a>` দ্বারা লিখা। এর অনেক কারণ আছে যেমন:

- অনেকে "right click" এর মাধ্যমে -- "নতুন উইন্ডোতে লিংক খুলে"।`<button>` বা `<span>` ব্যবহারে এই সুবিধা পাবে না।
- SEO এর জন্য `<a href="...">` লিংক ট্যাগ গুরুত্বপূর্ণ।

তাই আমাদের স্ট্রাকচারটি `<a>` দ্বারা লিখি। এবং আমরা ক্লিকড ইভেন্ট টি ব্রাউজারের ডিফল্ট অ্যাকশনের পরিবর্তে আমাদের প্রয়োজনমত কাজ করতে চাই।

যেমন এখানে:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...নতুন কোন ডাটা সার্ভার থেকে আসতে পারে, অথবা অন্য কোন UI পরিবর্তন

*!*
  return false; // ব্রাউজারের ডিফল্ট অ্যাকশন রোধ (নতুন URL ওপেন হবে না) তবে লেফট ক্লিকের মাধ্যমে নতুন উইন্ডোতে লিংক খুলবে
*/!*
};
```

যদি আমরা `return false` না লিখি, তাহলে ক্লিকড ইভেন্টের ফলে হ্যান্ডালারের কাজ শেষ হওয়ার পর ব্রাউজারে "ডিফল্ট অ্যাকশন" অনুযায়ী নতুন লিংকটি খুলবে। যা আমরা এখানে চাই না আমরা চাই আমাদের প্রয়োজনমত হ্যান্ডেলার ইভেন্টটি সংগঠিত হোক।

এছাড়াও এখানে ইভেন্ট ডেলিগেশনের ফলে আমাদের কোডটি অনেক ফ্লেক্সিবল, আমরা নেস্টেড লিস্ট তৈরি করতে পারি, এবং এদের CSS এর মাধ্যমে "slide down" স্ট্যাইল দিতে পারি।

````smart header="Follow-up events"
অনেক সময় ইভেন্টসমূহ একটি আরেকটির উপর নির্ভর করে। যদি আমরা প্রথম ইভেন্ট কে `prevent` করি, তাহলে দ্বিতীয় ইভেন্টটি আর সংগঠিত হবে না।

যেমন, একটি `<input>` ফিল্ডে `mousedown` ইভেন্ট আছে, এবং সাথে `focus` ইভেন্টও। যদি আমরা `mousedown` ইভেন্ট কে `prevent` করি, তাহলে focus কাজ করবে না।

নিচের প্রথম `<input>` কে ক্লিক করুন -- তাহলে `focus` ইভেন্ট সংগঠিত হবে। কিন্তু যদি দ্বিতীয়টিতে ক্লিক করেন তাহলে তা কাজ করবে নাহ।

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

`mousedown` ইভেন্টের ফলে দ্বিতীয় focus ইভেন্ট কাজ করে না। আমরা যদি `key:Tab` চাপার মাধ্যমে input ফিল্ড পরিবর্তন করি তখন onfocus কাজ করবে। কিন্তু মাউস ক্লিকের জন্য এটি কাজ করবে না।
````

## "passive" অপশন

ঐচ্ছিক `passive: true` অপশনটির মাধ্যমে আমরা `addEventListener` হ্যান্ডেলারে নিশ্চিত করতে পারি এটি `preventDefault()` কে কল করবে না।

এটি কেন করা প্রয়োজন?

কিছু ইভেন্ট আছে যেমন মোবাইল ডিভাইসে `touchmove` (ইউজার যখন স্ক্রিন স্ক্রল করতে চাইবে), এটি ডিফল্ট ভাবে স্ক্রল করবে, কিন্তু আমরা চাইলে `preventDefault()` এর মাধ্যমে এটিকে রোধ করতে পারি।

সুতরাং যখন এই ধরণের কোন ইভেন্ট ব্রাউজার ডিটেক্ট করে, এটি প্রথমে সকল হ্যান্ডেলারকে প্রসেস করে, এবং যদি কোন খানে `preventDefault` ডিফাইন করা হয়, তাহলে স্ক্রল কাজ করবে। এবং স্ক্রলিংয়ের সময় কিছুটা সময় নিবে এবং UI তে "কিছুটা বিদঘুটে" আচরণ হবে।

`passive: true` এর মাধ্যমে আমরা নিশ্চিত করতে পারি হ্যান্ডেলারের কারণে স্ক্রলিং বন্ধ হবে না। এবং স্ক্রল ইফেক্ট যথেষ্ট সাবলীল ভাবে কাজ করে এভাবেই ইভেন্ট কে হ্যান্ডেল করা হয়।

কিছু ব্রাউজার যেমন (Firefox, Chrome), `touchstart` এবং `touchmove` ইভেন্টের জন্য ডিফল্ট `passive: true` থাকে।

## event.defaultPrevented

`event.defaultPrevented` `true` হবে যদি ডিফল্ট অ্যাকশন prevented হয়, অন্যথায় `false` হবে।

এটির একটি মজার ব্যবহারিক প্রয়োগ আছে।

আপনার নিশ্চয় <info:bubbling-and-capturing> এই অধ্যায়ের `event.stopPropagation()` এর মাধ্যমে bubbling কে stop করা বিপজ্জনক বলা হয়েছিল তা  মনে আছে।

Sometimes we can use `event.defaultPrevented` instead, to signal other event handlers that the event was handled.

চলুন উদাহরণের সাহায্যে বুঝি।

ডিফল্ট ভাবে `contextmenu` ইভেন্ট সংগঠিত হয় (মাউসের ডানের বাটনে প্রেস করলে) যা কিছু অপশন দেখায়। তবে আমরা চাইলে আমাদের ইচ্ছামত এটিকে পরিবর্তন করতে পারি:

```html autorun height=50 no-beautify run
<button>Right-click shows browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click shows our context menu
</button>
```

এখন আমরা এটিকে গ্লোবালি ডিক্লেয়ার করি।

কোন কন্টেন্টে ডানের বাটনে প্রেস করলে আমরা একটি অ্যালার্ট দেখতে পারব।

```html autorun height=80 no-beautify run
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

তবে এখানে `elem` এর জন্য একটি সমস্যা দেখা যাচ্ছে, এটির জন্য দুটি অ্যালার্ট দেখায়: একটি button-level এবং অন্যটি document-level।

কিভাবে এটি ফিক্স করা যায়? একটি সমাধান এভাবে হতে পারে: "যখন আমরা বাটনে ডানের বাটনে প্রেস, তখন `event.stopPropagation()` এর মাধ্যমে bubbling কে থামাতে পারি":

```html autorun height=80 no-beautify run
<p>Right-click for the document menu</p>
<button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

এখন এটি শুধুমাত্র button-level এর জন্য কাজ করছে। তবে এর জন্য আমাদের চরম মূল্য দেয়া লাগতে পারে। এর জন্য আমাদের অন্যান্য লেভেলের ইভেন্ট গুলো আর কাজ করবে না, সুতরা এভাবে করা বোকামি।

তবে আমাদের কাছে একটি বিকল্প ব্যবস্থা আছে যার মাধ্যমে আমরা এটি সমাধান করতে পারি। আমরা `document` হ্যান্ডেলারে যাচাই করব আমাদের ইভেন্ট কি `defaultPrevented` হয়েছে কিনা? যদি হয়ে থাকে, তাহলে ইভেন্ট টি আগে সংগঠিত হয়েছে, এর ফলে document-level এ কোন কিছু আর ঘটবে না।


```html autorun height=80 no-beautify run
<p>Right-click for the document menu (added a check for event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

উপরের কোডটি নির্ভুল্ভাবে কাজ করবে। যদি আমাদের নেস্টেড এলিমেন্ট থাকে এবং প্রতিটির নিজস্ব কনট্যাক্স মেন্যু থাকে, তাও কাজ করবে। তবে আমাদের শুধু নিশ্চিত হতে হবে যেন প্রতিটি `contextmenu` হ্যান্ডালারে যেন `event.defaultPrevented` যাচায় করা হয়।

```smart header="event.stopPropagation() এবং event.preventDefault()"
আমাদের কাছে এখন পরিষ্কার, `event.stopPropagation()` এবং `event.preventDefault()` (`return false`) দুটি ভিন্ন মেথড যাদের ব্যবহার আলাদা।
```

```smart header="নেস্টেড কনট্যাক্স মেন্যু আর্কিটেকচার"
নেস্টেড কনট্যাক্স মেন্যু লিখার বিকল্প উপায়ও আছে। এদের মধ্যে একটি হল `document.oncontextmenu` এর জন্য একটি একক গ্লোবাল অবজেক্ট এবং চাইল্ড এলিমেন্ট প্রত্যেকের জন্য আলাদা আলাদা হ্যান্ডেলার ব্যবহার।

প্রতিবার *right-click* এর জন্য অবজেক্টটি কল হবে এবং এলিমেন্ট অনুযায়ী নির্দিষ্ট হ্যান্ডেলার কল হবে।

```

## সারাংশ

ব্রাউজারের কিছু নির্দিষ্ট ডিফল্ট অ্যাকশন আছে:

- `mousedown` -- সিলেকশন (মাউস মুভ করলে কোন কিছু সিলেক্ট হবে)।
- `click` `<input type="checkbox">` -- ক্লিকে `input` এর checks/unchecks হয়।
- `submit` -- form এর মধ্যে `<input type="submit">` এ ক্লিকে বা `key:Enter` প্রেসে ইভেন্টটি সংগঠিত হয়, এবং এর পরে ফর্মটি সাবমিট হয়।
- `keydown` -- কী-বোর্ডে কোন বাটনে ক্লিক হলে ক্যারাক্টার অ্যাড হবে অথবা অন্য কোন অ্যাকশন সংগঠিত হবে।
- `contextmenu` -- মাউসের right-click এ ইভেন্টটি সংগঠিত হয়, এবং এটি ব্রাউজারের context menu দেখায়।
- ...এবং আরো অনেক...

ব্রাউজারের সকল ডিফল্ট অ্যাকশন আমরা জাভাস্ক্রিপ্টের মাধ্যমে রোধ করতে পারি।

সকল ডিফল্ট অ্যাকশন রোধ করতে `event.preventDefault()` বা  `return false` ব্যবহার করতে পারি। দ্বিতীয়টি শুধুমাত্র `on<event>` এর সাথেই কাজ করে।

`addEventListener` এ `passive: true` অপশনটি দ্বারা বুঝায় ইভেন্টটি কোনখানে রোধ হবে না। কিছু টাচস্ক্রিন ইভেন্টের জন্য এটি ব্যবহার সুবিধাজনক, যেমন `touchstart` এবং `touchmove`, যা ব্রাউজারকে নির্দেশ করে হ্যান্ডেলারের কারণে স্ক্রলিংয়ে কোন বাধাপ্রাপ্ত হবে না।

যদি ডিফল্ট অ্যাকশন বাধাপ্রাপ্ত হয়, তাহলে `event.defaultPrevented` এর ভ্যালু `true` হবে, অন্যথায় `false`।

```warn header="Stay semantic, don't abuse"
টেকনিক্যালি, আমরা জাভাস্ক্রিপ্টের মাধ্যমে যে কোন ডিফল্ট অ্যাকশন রোধ করতে পারি এবং যেকোন এলিমেন্টকে কাস্টমাইজ করতে পারি। যেমন, আমরা লিংক ট্যাগ `<a>` কে বাটন হিসেবে বা `<button>` কে অ্যাংকর লিংক হিসেবে ব্যবহার করতে পারি।

তবে আমাদের HTML এলিমেন্ট সমূহের যথাযথ অর্থ বোঝায় এমন ট্যাগ ব্যবহার করা উচিত। যেমন, `<a>` কে নেভিগেশনের এর বদলে বাটনের জন্য ব্যবহার করব না।

এটি ভাল প্রাকটিসের পাশাপাশি আপনার HTML কোড কে আরো পঠনযোগ্য করে তুলে।

এছাড়াও আরো একটি ব্যাপার খেয়াল করুন, `<a>` ট্যাগের ফলে আমরা কোন একটি লিংক নতুন ট্যাগে খুলার সুযোগ পায়, এবং অনেক ইউজার এভাবে ব্যবহারে অভ্যস্ত। যদি আমরা কোন বাটন কে নেভিগেশনের জন্য ব্যবহার করি তাহলে এই অপশন পাবে না, যা ইউজারের সাইট ব্যবহারে একটি খারাপ প্রভাব পড়ে।
```

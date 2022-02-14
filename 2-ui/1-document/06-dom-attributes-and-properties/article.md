# অ্যাট্রিবিউটস এবং প্রপার্টিস

ব্রাউজার যখন পেজ লোড করে, এটি HTML ডকুমেন্ট টিকে পড়ে (অর্থাৎ পার্স) করে এবং ডকুমেন্ট অবজেক্ট ট্রি বানায়। এলিমেন্ট নোডের জন্য বেশিরভাগ HTML অ্যাট্রিবিউট সমূহ DOM অবজেক্টের প্রপার্টি হিসেবে থাকে।

যেমন, `<body id="page">` ট্যাগের জন্য, DOM অবজেক্ট এর `id` প্রপার্টি থাকবে `body.id="page"`।

তবে অ্যাট্রিবিউট-প্রপার্টি সর্বদা ম্যাপিং হয় না। এই অধ্যায়ে আমরা এই বিষয়টি নিয়ে আলোচনা করব, কিভাবে তাদের নিয়ে কাজ করা যায়, কখন উভয়ই একই এবং কখন আলাদা।

## DOM প্রপার্টিস

ইতোমধ্যে আমরা বিল্ট-ইন DOM প্রপার্টি দেখেছি। তবে সেখানে আরো অনেক আছে, ট্যাকনিক্যালি এর কোন সীমা নেই, আমরা আমাদের নিজস্ব প্রপার্টি অ্যাড করতে পারি।

DOM নোড সমূহ রেগুলার জাভাস্ক্রিপ্ট অবজেক্ট। আমরা তাদের পরিবর্তন করতে পারি।

যেমন, চলুন `document.body` এ একটি নতুন প্রপার্টি সংযুক্ত করি:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

আমরা মেথড ও সংযুক্ত করতে পারি:

```js run
document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (এখানে "this" দ্বারা document.body কে নির্দেশিত করছে)
```

আমরা চাইলে বিল্ট ইন প্রটোটাইপকে মডিফাই করতে পারি `Element.prototype` এবং সকল এলিমেন্ট এর জন্য নতুন মেথড সংযুক্ত করতে পারি:

```js run
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

সুতরাং, DOM প্রপার্টিস এবং মেথড সমূহ রেগুলার জাভাস্ক্রিপ্ট অবজেক্টের মত কাজ করবে:

- এদের যেকোন ভ্যালু হতে পারে।
- এরা কেস সেনসিটিভ (`elem.nodeType` ও `elem.NoDeTyPe` একই না)।

## HTML অ্যাট্রিবিউটস

HTML এ ট্যাগসমূহের অ্যাট্রিবিউট থাকতে পারে। যখন ব্রাউজার HTML কে পার্স করবে এবং DOM ট্রি বানানোর সময় এটি স্টান্ডার্ড অ্যাট্রিবিউট সমূহকে চিহ্নিত করবে এবং তাদের DOM এর প্রপার্টিতে সেট করবে।

সুতরাং এলিমেন্ট যখন `id` বা অন্য যেকোন *স্টান্ডার্ড* অ্যাট্রিবিউট থাকবে, এটি প্রপার্টি হিসেবে সেট হবে। কিন্তু নন-স্টান্ডার্ড অ্যাট্রিবিউট সমূহ প্রপার্টি হিসেবে সেট হবে নাহ।

উদাহরণস্বরূপ:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    // নন-স্টান্ডার্ড অ্যাট্রিবিউট সুতরাং প্রপার্টি হিসেবে সেট হবে নাহ
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

দয়া করে মনে রাখুন, এক এলিমেন্টের স্টান্ডার্ড অ্যাট্রিবিউট অন্য এলিমেন্টের জন্য স্টান্ডার্ড নাও হতে পারে। যেমন `"type"` হল `<input>` এর জন্য ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), `<body>` এর জন্য এটি স্টান্ডার্ড না ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement))। স্টান্ডার্ড অ্যাট্রিবিউট সমূহ স্পেসিফিকেশনে বিস্তারিত আছে।

এখানে দেখুন:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM প্রপার্টিতে নাই, কেননা এটি নন-স্ট্যান্ডার্ড
*/!*
  </script>
</body>
```

তাহলে, আমরা কি নন-স্ট্যান্ডার্ড অ্যাট্রিবিউট সমূহ অ্যাক্সেস করতে পারব না? যদি পারি তাহলে তা কিভাবে?

সুভাগ্যক্রমে আমাদের কিছু মেথড আছে যার সাহায্যে নন-স্ট্যান্ডার্ড অ্যাট্রিবিউট সমূহ অ্যাক্সেস করতে পারি:

- `elem.hasAttribute(name)` -- অ্যাট্রিবিউটটি আছে কিনা যাচাই করে।
- `elem.getAttribute(name)` -- অ্যাট্রিবিউটটির ভ্যালু পাই।
- `elem.setAttribute(name, value)` -- অ্যাট্রিবিউটটির ভ্যালু সেট করতে পারি।
- `elem.removeAttribute(name)` -- এলিমেন্ট হতে অ্যাট্রিবিউটটি বাদ দেয়া।

মেথড সমূহ স্ট্যান্ডার্ড, নন-স্ট্যান্ডার্ড উভয় অ্যাট্রিবিউটের সাথে কাজ করে।

এছাড়াও আমরা সকল ধরণের স্ট্যান্ডার্ড অ্যাট্রিবিউট সমূহের কালেকশন পেতে পারি `elem.attributes`: [Attr](https://dom.spec.whatwg.org/#attr) ক্লাস `name` এবং `value` প্রপার্টি সহ।

নন-স্ট্যান্ডার্ড অ্যাট্রিবিউট পড়ার একটি উদাহরণ:

```html run
<body something="non-standard">
  <script>
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

HTML অ্যাট্রিবিউটসের নিম্নলিখিত বৈশিষ্ট্য আছে:

- নাম হল কেস-ইন্সেসিটিভ (`id` এবং `ID` একই)।
- ভ্যালু সর্বদা স্ট্রিং।

চলুন অ্যাট্রিবিউট নিয়ে আরো কিছু উদাহরণ দেখি:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', অ্যাট্রিবিউট পড়া

    elem.setAttribute('Test', 123); // (2), অ্যাট্রিবিউট সেট

    alert( elem.outerHTML ); // (3),এলিমেন্টে অ্যাট্রিবিউটটি সেট (yes)

    for (let attr of elem.attributes) { // (4) list all
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

দয়া করে মনে রাখবেন:

1. `getAttribute('About')` -- এখানে প্রথম অক্ষরটি বড় হাতের, এবং HTML এ সব কিছু ছোট হাতের। এখানে এটি কোন সমস্যা করবে না: কেননা এরা কেস-ইন্সেসিটিভ।
2. আমরা যে কোন কিছু সেট করতে পারি, তবে এটি সর্বদা স্ট্রিং হিসেবে সেট হবে। সুতরাং আমরা `"123"` কে স্ট্রিং ভ্যালু হিসেবে পাব।
3. নতুন কোন অ্যাট্রিবিউট সেট করলে তা আমরা `outerHTML` এ দেখব।
4. `attributes` কালেকশনটি ইটারেবল এবং সকল ধরণের অ্যাট্রিবিউট পাব (স্ট্যান্ডার্ড এবং নন-স্ট্যান্ডার্ড) অবজেক্ট হিসেবে যার প্রপার্টি থাকবে `name` এবং `value`।

## Property-attribute সিঙ্ক্রোনাইজ

যখন কোন একটি স্ট্যান্ডার্ড অ্যাট্রিবিউট পরিবর্তন হবে, তার সাথে সাথে প্রপার্টিও অটো-আপডেট হবে তবে কিছু ব্যতীক্রমও আছে।

নিচের উদাহরণে আমরা অ্যাট্রিবিউট `id` কে পরিবর্তন করব, এবং আমরা দেখব প্রপার্টিও পরিবর্তন হয়, আবার এর বিপরীতেও হয় অর্থাৎ প্রপার্টি পরিবর্তন হলে অ্যাট্রিবিউট ও পরিবর্তন হবে:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('id', 'id');
  alert(input.id); // id (আপডেট)

  // property => attribute
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (আপডেট)
</script>
```

তবে ব্যতীক্রমও আছে, যেমন `input.value` সিঙ্ক্রোনাইজ হয় শুধুমাত্র অ্যাট্রিবিউট হতে -> প্রপার্টি তে, এর বিপরীত হবে নাহ:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // attribute => property
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NOT property => attribute
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (আপডেট হবে না!)
*/!*
</script>
```

উপরের উদাহরণটিতে:
- অ্যাট্রিবিউট `value` পরিবর্তন হলে প্রপার্টি পরিবর্তন হয়।

- কিন্তু প্রপার্টিতে পরিবর্তন হলে তা অ্যাট্রিবিউটে অ্যাফেক্ট হয় না।

এই ফিচারটি কাজের হতে পারে, যেমন ইউজার এর কোন অ্যাকশনের জন্য আমরা প্রপার্টির `value` পরিবর্তন করে কোন একটি কাজ সম্পন্ন করতে চাই, এবং পরে আমরা আসল ভ্যালু টা রিকোভার করতে চাই, তাহলে আমরা তা করতে পারব কেননা এটি অ্যাট্রিবিউটে অপরিবর্তীত থাকবে।
## DOM প্রপার্টির টাইপ

DOM প্রপার্টি সর্বদা স্ট্রিং হবে না। যেমন `input.checked` প্রপার্টিটি (checkboxes এর জন্য) বুলিয়ান টাইপের:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // অ্যাট্রিবিউটের ভ্যালু হবে: empty স্ট্রিং
  alert(input.checked); // প্রপার্টি ভ্যালু হবে: true
</script>
```

আরেকটিও ব্যতীক্রম উদাহরণ। `style` অ্যাট্রিবিউট হল একটি স্ট্রিং, কিন্তু `style` প্রপার্টি একটি অবজেক্ট:

```html run
<div id="div" style="color:red;font-size:120%">Hello</div>

<script>
  // স্ট্রিং
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // অবজেক্ট
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

বেশিরভাগ প্রপার্টি স্ট্রিং।

তবে আরো কিছু ব্যতীক্রম আছে, যদিও DOM প্রপার্টি স্ট্রিং হয়, তবে এটি অ্যাট্রিবিউট হতে ভিন্ন হতে পারে। যেমন, `href` DOM প্রপার্টি সর্বদা একটি *full URL* রিটার্ন করে, যদিও অ্যাট্রিবিউট এ  শুধুমাত্র রিলেটিভ বা `#hash` URL থাকে।

এখানে একটি উদাহরণ দেখুন:

```html height=30 run
<a id="a" href="#hello">link</a>
<script>
  // attribute
  alert(a.getAttribute('href')); // #hello

  // property
  alert(a.href ); // full URL in the form http://site.com/page#hello
</script>
```

যদি আমাদের `href` এ লিখিত অ্যাট্রিবিউটটি অথবা অন্য কোন অ্যাট্রিবিউট HTML এ যেভাবে আছে সেভাবে পেতে চায় আমরা `getAttribute` টি ব্যবহার করতে পারি।


## নন-স্ট্যান্ডার্ড অ্যাট্রিবিউট, dataset

আমরা HTML লিখার সময় অনেক স্ট্যান্ডার্ড অ্যাট্রিবিউট ব্যবহার করি। কিন্তু কেন আমাদের নন-স্ট্যান্ডার্ড কাস্টম অ্যাট্রিবিউটের দরকার পড়ে? প্রথমে আমরা দেখি এসব ব্যবহার কি আমাদের জন্য উপকারী কিনা? এবং কেন?

অনেক সময় HTML হতে জাভাস্ক্রিপ্টে ডাটা পাঠাতে আমাদের কাস্টম অ্যাট্রিবিউট এর সাহায্য নেয়া লাগে, অথবা HTML এলিমেন্ট কে জাভাস্ক্রিপ্টে "mark" করতে।

যেমন:

```html run
<!-- "name" দ্বারা চিহ্নিত -->
<div *!*show-info="name"*/!*></div>
<!-- and age here -->
<div *!*show-info="age"*/!*></div>

<script>
  // কোডটি অ্যাট্রিবিউট অনুযায়ী এলিমেন্ট কে চিহ্নিত করবে এবং মান পরিবর্তন করবে
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // insert the corresponding info into the field
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // প্রথমে "name" এর জন্য Pete , তারপর "age" এর জন্য 25
  }
</script>
```

এছাড়াও এলিমেন্টে স্ট্যাইল এর জন্য এটি কার্যকরী।

যেমন, এখানে আমরা `order-state` এর সাহায্যে বিভিন্ন কালার সেট করতে পারি:

```html run
<style>
  /* styles rely on the custom attribute "order-state" */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```

কেন ক্লাসের পরিবর্তে অ্যাট্রিবিউট ব্যবহার বেশি উপযোগী `.order-state-new`, `.order-state-pending`, `order-state-canceled`?

কারণ অ্যাট্রিবিউট ম্যানাজ করা সুবিধাজনক। এর সাহায্যে সহজেই স্টেট ম্যানাজ করতে পারি:

```js
// নতুন ক্লাস অ্যাড এবং পুরনো ক্লাস রিমুভের পরিবর্তে এটি সিম্পল
div.setAttribute('order-state', 'canceled');
```

কিন্তু কাস্টম অ্যাট্রিবিউটে একটি সম্ভাব্য সমস্যা রয়েছে। যদি আমরা একটি নন-স্ট্যান্ডার্ড কাস্টম অ্যাট্রিবিউট লিখি কিন্তু এটি পরে স্ট্যান্ডার্ড হিসেবে বিবেচিত হয় তখন কি হবে? কেননা HTML একটি ওপেন স্ট্যান্ডার্ড ল্যাংগুয়েজ, ডেভলাপারদের চাহিদা অনুযায়ী এটিতে সর্বদা নতুন নতুন ফিচার সংযুক্ত হচ্ছে। সুতরাং এর হলে কিছু অপ্রত্যাশিত ভুল দেখা দিতে পারে।

কনফ্লিক্ট এড়াতে, বর্তমান অ্যাট্রিবিউট গুলো দেখুন [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes)ক

**"data-" প্রিফিক্স দ্বারা সকল অ্যাট্রিবিউট ডেভলাপারদের জন্য সংরক্ষিত। আমরা `dataset` প্রপার্টিতে এদের পাব।**

যেমন, যদি কোন `elem` এর অ্যাট্রিবিউট এর নাম হয় `"data-about"`, এটি `elem.dataset.about` এর মধ্যে পাব।

এভাবে:

```html run
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

একাধিক শব্দ সম্বলিত অ্যাট্রিবিউট সমূহ যেমন: `data-order-state` হবে কেমেল-কেসড অনুযায়ী: `dataset.orderState`।

পূর্বের "order state" উদাহরণটি আবার লিখি:

```html run
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // read
  alert(order.dataset.orderState); // new

  // modify
  order.dataset.orderState = "pending"; // (*)
</script>
```

`data-*` অ্যাট্রিবিউট সমূহ ভ্যালিড, এবং এটি ডাটা পাসিংয়ের জন্য একটি নিরাপদ উপায়।

দয়া করে মনে রাখুন এটি শুধুমাত্র পড়তে ব্যবহৃত হয় না, সাথে সাথে আমরা মোডিফাইও করতে পারব। CSS টি এই অনুযায়ী কাজ করে `(*)` এই লাইনটির ফলে এলিমেন্ট এর কালার নীল হচ্ছে।

## সারাংশ

- অ্যাট্রিবিউটস -- HTML এ এলিমেন্টে যা লিখা হয়।
- প্রপার্টিস -- DOM অবজেক্টে যা থাকে।

পার্থক্য:

|            | Properties | Attributes |
|------------|------------|------------|
|Type|যে কোন ভ্যালু, স্ট্যান্ডার্ড প্রপার্টির টাইপ সমূহ স্পেসিফিকেশন অনুযায়ী হয়|স্ট্রিং|
|Name|Name কেস-সেন্সিটিভ|Name is কেস-ইনসেন্সিটিভ|

অ্যাট্রিবিউট নিয়ে কাজ করার মেথড সমূহ হল:

- `elem.hasAttribute(name)` -- অ্যাট্রিবিউটটি আছে কিনা যাচাই করে।
- `elem.getAttribute(name)` -- অ্যাট্রিবিউটটির ভ্যালু পাই।
- `elem.setAttribute(name, value)` -- অ্যাট্রিবিউটটির ভ্যালু সেট করতে পারি।
- `elem.removeAttribute(name)` -- এলিমেন্ট হতে অ্যাট্রিবিউটটি বাদ দেয়া।
- `elem.attributes` -- এলিমেন্টের সকল অ্যাট্রিবিউটের কালেকশন।

বেশির ভাগ ক্ষেত্রে DOM প্রপার্টির মাধ্যমে কাজ করা ভাল। কিন্তু যখন DOM প্রপার্টির মাধ্যমে আমাদের কাজ সম্পন্ন হবে না তখন আমরা অ্যাট্রিবিউট ব্যবহার করব, যেমন:

- আমাদের যখন একটি নন-স্ট্যান্ডার্ড অ্যাট্রিবিউট দরকার পড়বে। আমরা `data-` প্রিফিক্স দিয়ে অ্যাট্রিবিউট লিখতে পারি, তাহলে আমরা `dataset` এর মাধ্যমে কাজ করতে পারব।
- আমরা ভ্যালু HTML এ যেভাবে লিখেছি সেভাবে পেতে চায়। কিন্তু DOM প্রপার্টির ভ্যালু ভিন্ন হতে পারে, যেমন `href` সর্বদা *full URL* রিটার্ন করে, তবে আমরা "original" ভ্যালু টা পেতে চাই।

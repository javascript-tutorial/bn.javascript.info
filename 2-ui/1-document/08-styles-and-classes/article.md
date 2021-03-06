# Styles এবং classes

জাভাস্ক্রিপ্টের সাহায্যে style এবং class নিয়ে কাজ করার সময় আমাদের কিছু গুরুত্বপূর্ণ রুল জেনে রাখা উচিত। যদিও আমাদের কাছে অনেক কিছু সুস্পষ্ট, তারপরও কিছু বিষয় জেনে রাখা উচিত।

দুইটি উপায়ে আমরা এলিমেন্টে স্ট্যাইল করতে পারি:

1. CSS ক্লাস এর মাধ্যমে: `<div class="...">`
2. সরাসরি `style` প্রপার্টির মাধ্যমে : `<div style="...">`।

জাভাস্ক্রিপ্টের মাধ্যমে ক্লাস এবং `style` প্রপার্টিকে উভয়ভাবে আমরা পরিবর্তন করতে পারি।

তবে আমাদের `style` এর জন্য CSS ক্লাস ব্যবহার করাই বেশি উপযোগী। তবে যদি ক্লাসের মাধ্যমে সম্পূর্ন ব্যাপারটি কন্ট্রোল করতে না পারি তাহলে দ্বিতীয়টির মাধ্যমে করা উচিত।

যেমন, আমরা জাভাস্ক্রিপ্টের মাধ্যমে ডায়নামিক্যালি কো-অর্ডিনেট ক্যালকুলেশন করে `style` এ সেট করতে পারি, এভাবে:

```js
let top = /* জটিল ক্যালকুলেশন */;
let left = /* জটিল ক্যালকুলেশন */;

elem.style.left = left; // যেমন '123px', রানটাইমে ক্যালকুলেশন
elem.style.top = top; // যেমন '456px'
```

অন্যান্য ক্ষেত্রে, যেমন টেক্সট কালার লাল, বা আইকন পরিবর্তন ইত্যাদি আমরা জাভাস্ক্রিপ্টের মাধ্যমে *CSS class* সংযুক্ত করণের দ্বারা করতে পারি। এটি আরো বেশি সহজ এবং উপযোগী।

## className এবং classList

জাভাস্ক্রিপ্টের মাধ্যমে আমরা প্রায়সই ক্লাসের নাম পরিবর্তন করে থাকি।

পূর্বে জাভাস্ক্রিপ্টের কিছু সীমাবদ্ধতা ছিল: `"class"` একটি রিসার্ভড ওয়ার্ড হওয়ায় এটি অবজেক্টের প্রপার্টি হতে পারত না। তবে সীমাবদ্ধতাটি এখন আর নেই, কিন্তু অই সময় `"class"` নামের প্রপার্টি অ্যাসাইন করা সম্ভব হত নাহ, যেমন `elem.class`।

ক্লাসের জন্য আমাদের অনুরূপ একটি প্রপার্টি ছিল `"className"`: `elem.className` দ্বারা `"class"` অ্যাট্রিবিউটকে নির্দেশ করে।

উদাহরণস্বরূপ:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

যদি আমরা `elem.className` এ কিছু অ্যাসাইন করি তাহলে এটি সম্পূর্ন ক্লাস স্ট্রিংটিকে রিপ্লেস করে। মাঝে মাঝে আমাদের এটি দরকার হয়, কিন্তু বেশিরভাগ সময় আমাদের একটি সিংগেল ক্লাস সংযুক্ত/বাদ দেয়া লাগে।

এজন্য আমাদের আরেকটি প্রপার্টি আছে: `elem.classList`।

`elem.classList` একটি স্পেশাল অবজেক্ট যার কিছু মেথড আছে `add/remove/toggle`।

উদাহরণস্বরূপ:

```html run
<body class="main page">
  <script>
*!*
    // নতুন একটি ক্লাস সংযুক্ত
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // main page article
  </script>
</body>
```

সুতরাং আমরা উভয়ই ব্যবহার করতে পারি, সম্পূর্ন ক্লাসের জন্য `className` অথবা নির্দিষ্ট একটি ক্লাসের জন্য `classList`। আমাদের প্রয়োজনমত আমরা এটি ব্যবহার করব।

`classList` এর মেথডসমূহ:

- `elem.classList.add/remove("class")` -- নতুন ক্লাস সংযুক্ত/বাদ দেয়ার জন্য।
- `elem.classList.toggle("class")` -- ক্লাসটি না থাকলে সংযুক্ত হবে অন্যথায় বাদ যাবে।
- `elem.classList.contains("class")` -- ক্লাসটি এলিমেন্টে আছে কিনা যাচাই করে, `true/false` রিটার্ন করে।

এছাড়াও, `classList` একটি ইটারেবল অবজেক্ট, সুতরাং আমরা `for..of` লুপের মাধ্যমেও ইটারেট করতে পারি, এভাবে:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, and then page
    }
  </script>
</body>
```

## এলিমেন্ট স্ট্যাইল

`elem.style` প্রপার্টিটি একটি অবজেক্ট এবং CSS `style` অ্যাট্রিবিউট সমূহ এর প্রপার্টি। `elem.style.width="100px"` এটি  ও `style` অ্যাট্রিবিউটের `width:100px` এর কাজ একই।

একাধিক শব্দ দ্বারা গঠিত প্রপার্টিসমূহ ক্যামেল কেসে লিখা হয়:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

উদাহরণস্বরূপ:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Prefixed properties"
Browser-prefixed প্রপার্টি সমূহ যেমন `-moz-border-radius`, `-webkit-border-radius` একই নিয়ম অনুসরণ করে: ড্যাসের স্থলে বড় হাতের অক্ষর হবে।

উদাহরণস্বরূপ:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## style প্রপার্টি পুনরায় সেট

অনেক সময় আমাদের কোন একটি প্রপার্টি অ্যাসাইন করে, পরে এটি বাদ দেয়া লাগে।

যেমন, কোন একটি এলিমেন্টকে অদৃশ্য করতে `elem.style.display = "none"`.

এবং পরে আমরা `style.display` এর অবস্থান পুনরায় আগের মত করতে চাই। এক্ষেত্রে `delete elem.style.display` এর পরিবর্তে ঐ প্রপার্টিতে এম্পটি স্ট্রিং অ্যাসাইন করব: `elem.style.display = ""`।

```js run
// যদি আমরা এট রান করি, <body> ব্লিংক করবে
document.body.style.display = "none"; // hide

setTimeout(() => document.body.style.display = "", 1000); // পূর্বের অবস্থায় ফেরত
```

যদি আমরা `style.display` কে এম্পটি স্ট্রিং দ্বারা সেট করি, তাহলে ব্রাউজার বিল্ট ইন CSS ক্লাস সমূহ অ্যাপ্লাই করবে এবং স্ট্যাইলটি পূর্বের মত হবে, `style.display` প্রপার্টি নরমাল বিহেভ করবে।

````smart header="পুনরায় সম্পুর্ন লিখা `style.cssText` এর মাধ্যমে"
সাধারণত, আমরা একক স্ট্যাইল অ্যাসাইন করতে `style.*` এর প্রপার্টি সমূহতে অ্যাসাইন করি। কিন্তু আমরা চাইলে একাধিক স্ট্যাইল একসাথে সেট করতে পারিনা, এভাবে `div.style="color: red; width: 100px"`, কেননা `div.style` একটি অবজেক্ট, এবং এটি শুধুমাত্র read-only।

একাধিক স্ট্যাইল স্ট্রিং হিসেবে সেট করতে, একটি স্পেশাল প্রপার্টি আছে `style.cssText`:

```html run
<div id="div">Button</div>

<script>
  // আমরা এখানে স্পেশাল ফ্ল্যাগও অ্যাসাইন করতে পারি যেমন "important"
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

প্রপার্টিটি কদাচিৎ ব্যবহার হয়, কেননা এর ফলে বিদ্যমান সকল স্ট্যাইল রিমুভ হয়ে যায়: এটি পুরনো স্ট্যাইল টিকে সম্পুর্ন পরিবর্তন করে দেয়, এর ফলে অনেক সময় আমাদের প্রয়োজনীয় স্ট্যাইলও ডিলিট হয়ে যায়। তবে নতুন কোন এলিমেন্টে একাধিক স্ট্যাইল সেটের জন্য এটি উপযোগী, যখন আমরা জানি প্রয়োজনীয় কোন স্ট্যাইল এখনো সেট হয়নি।

আমরা এভাবেও করতে পারি: `div.setAttribute('style', 'color: red...')`।
````

## Mind the units

CSS ইউনিট ভ্যালু লিখতে ভুলবেন না।

উদাহরণস্বরূপ, আমাদের `elem.style.top` কে শুধুমাত্র `10` দ্বারা লিখলে হবে না, তার পরিবর্তে ইউনিট লিখা লাগবে যেমন `10px`। অন্যথায় এটি কাজ করবে না:

```html run height=100
<body>
  <script>
  *!*
    // এটি কাজ করবে না!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (empty স্ট্রিং, অ্যাসাইমেন্ট ইগনোর হবে)
  */!*

    // এখন CSS unit (px) অ্যাড করলাম - এবং এটি কাজ করবে
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

দয়া করে নোট করুন: ব্রাউজার `style.margin` প্রপার্টিটি "unpacks" করে যার ফলে আমরা `style.marginLeft` এবং `style.marginTop` এ ইউনিটটি দেখি।

## Computed styles: getComputedStyle

সুতরাং, স্ট্যাইল মোডিফাই করা সহজ। কিন্তু আমরা ভ্যালু কিভাবে জানতে পারি?

উদাহরণস্বরূপ, কোন এলিমেন্টের সাইজ, মার্জিন, কালার ইত্যাদি জানা লাগতে পারে। কিভাবে জানতে পারি?

**`style` প্রপার্টি CSS cascade শুধুমাত্র `"style"` অ্যাট্রিবিউটের ভ্যালু সমূহ পড়তে পারে।**

সুতরাং আমরা এলিমেন্টের কোন ক্লাসের ভ্যালুসমূহ `elem.style` এর মাধ্যমে পড়তে পারব না।

যেমন, এখানে `style` এর মাধ্যমে আমরা মার্জিন পাব না:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // empty
    alert(document.body.style.marginTop); // empty
*/!*
  </script>
</body>
```

...কিন্তু আমাদের যদি মার্জিন `20px` বাড়ানো লাগে তাহলে কি করব? এজন্য আমাদের বর্তমান ভ্যালু জানা দরকার।

এজন্য আরেকটি মেথড আছে: `getComputedStyle`.

সিন্ট্যাক্স হবে:

```js
getComputedStyle(element, [pseudo])
```

element
: এলিমেন্ট হল যার মান পড়া দরকার

pseudo
: এটি প্রয়োজন হয় যদি সুডো মান জানা লাগে, যেমন `::before`। এটি ঐচ্ছিক।

রেজাল্ট হবে style প্রপার্টি সমূহের অবজেক্ট, অনেকটা `elem.style` এর মত, তবে এখন এটি এলিমেন্টের সর্বশেষ মানটি পাবে।

উদাহরণস্বরূপ:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // এখন আমরা ইন্টারনাল CSS এর মান পাচ্ছি

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Computed এবং resolved ভ্যালু"
এর দুটি ধারণা আছে [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. *CSS cascade* এর ফলে *computed* স্ট্যাইল এর মান পাব আমরা সকল CSS রুলস এবং CSS ইনহেরিটেন্স অ্যাপ্লাই হওয়ার পর। যেমন `height:1em` অথবা `font-size:125%`।
2. *resolved* এর মান পাব এলিমেন্টে সর্বশেষ রুলস অ্যাপ্লাই হওয়ার পর।  যেমন  `1em` অথবা `125%` মানসমূহ আপেক্ষিক। ব্রাউজার *computed* মানটি নেয় এবং সকল সকল ইউনিটকে পরমমানে নির্দিষ্ট করে, যেমন: `height:20px` বা `font-size:16px`। জ্যামিতিক প্রপার্টিসমূহের মান ভগ্নাংশ আকারে হতে পারে, যেমন `width:50.5px`।

পূর্বে `getComputedStyle` শুধুমাত্র *computed* স্ট্যাইল এর মানটি রিটার্ন করত, কিন্তু বর্তমানে এটি আরো সুবিধাজনক, *resolved* কৃতমান রিটার্ন করে।

সুতরাং বর্তমানে `getComputedStyle` *resolved* কৃতমান রিটার্ন করে, সাধারণত জ্যামিতিক প্রপার্টিসমূহকে `px` এ রিটার্ন করে।
```

````warn header="`getComputedStyle` এ সম্পূর্ণ প্রপার্টির নাম প্রয়োজন"
আমাদের অবশ্যই প্রপার্টির মান হুবহু লিখা উচিত, যেমন *padding*, *margin* বা *border* এর বদলে যথাক্রমে `paddingLeft`, `marginTop` বা `borderTopWidth` লিখতে হবে। অন্যথায় এটি সর্বদা সঠিক মান দিবে তা নিশ্চিত নয়।

যেমন, যদি আমরা `paddingLeft/paddingTop` এর মান জানতে চাই, তাহলে আমরা কি `getComputedStyle(elem).padding` এর মান পাব? এর কোন স্ট্যান্ডার্ড রুল নাই।

এটি ব্রাউজার অনুযায়ী অসংগতি আচরণ করে, যেমন (Chrome) এ দেখাবে `10px` এবং (Firefox) --  কোন মান দেখাবে না:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // Firefox এ খালি স্ট্রিং
</script>
```
````

```smart header="Styles applied to `:visited` লিংক অদৃশ্য!"
ভিজিটেড লিংক সমূহ হয়তবা CSS pseudoclass `:visited` এর জন্য একটি কালার দেখায়।

কিন্তু `getComputedStyle` এটি কোন কালারের মান রিটার্ন করে না কারণ এটির অ্যাক্সেস থাকে না, কেননা একটি স্বতন্ত্র পেজে স্ট্যাইল যাচাইয়ের মাধ্যমে সহজেই জানা যাবে কোন কোন পেজ ভিজিট করা হয়েছে।

তাই জাভাস্ক্রিপ্টের মাধ্যমে `:visited` এর মান জানা সম্ভব না। এটি আমাদের গোপনীয়তার নিশ্চয়তা প্রদান করে।
```

## সারাংশ

ক্লাস ম্যানিপুলেসনের জন্য, দুটি DOM প্রপার্টি আছে:

- `className` -- ক্লাস অ্যাট্রিবিউটের সকল ক্লাস স্ট্রিং হিসেবে রিটার্ন করে, এলিমেন্টের সকল ক্লাসের জন্য এটি উপযোগী।
- `classList` -- একটি অবজেক্ট যার মেথডসমূহ `add/remove/toggle/contains`, সিংগেল ক্লাসের জন্য উপযোগী।

স্ট্যাইল পরিবর্তনের জন্য:

- `style` প্রপার্টি একটি অবজেক্ট যার প্রপার্টি সমূহ ক্যামেল কেসের হয়ে থাকে। প্রতিটি একক প্রপার্টি পড়তে এবং অ্যাসাইন করতে এটি উপযোগী। কিভাবে আমরা `important` এবং অন্যান্য কদাচিৎ ব্যবহৃত বিষয়গুলো ব্যবহার করতে পারি -- তা জানতে এটি দেখুন [MDN](mdn:api/CSSStyleDeclaration)।
- `style.cssText` এর সাহায্যে আমরা একাধিক `"style"` অ্যাট্রিবিউট সেট করতে পারি।

কোন  এলিমেন্টের প্রয়োগকৃত সর্বশেষ সকল স্ট্যাইল জানতে:

- `getComputedStyle(elem, [pseudo])` সকল প্রপার্টি রিটার্ন করবে. এটি Read-only।

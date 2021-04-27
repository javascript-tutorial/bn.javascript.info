libs:
  - d3
  - domtree

---


# DOM এ নেভিগেশন

DOM আমাদের সকল এলিমেন্ট এবং তাদের কন্টেন্ট কে পরিবর্তন, পরিমার্জন করতে দেয়,কিন্তু প্রথমে আমাদের DOM অবজেক্ট টির কাছে পৌঁছাতে হবে।

DOM এর সকল অপারেশন `document` অবজেক্ট এর মাধ্যমে করতে হয়। এটিই DOM এর "entry point"। এর সাহায্যে আমরা যেকোন নোড অ্যাক্সেস করতে পারি।

এখানে দেখুন কিভাবে আমরা DOM নোডে ট্রাভার্স করতে পারি:

![](dom-links.svg)

চলুন এ সম্পর্কে আরো বিস্তারিত জানি।

## শুরুতে: documentElement এবং body

ট্রি নোডের একদম উপরের নোড সমূহ সরাসরি `document` এর প্রপার্টি হিসেবে থাকে:

`<html>` = `document.documentElement`
: একদম উপরের নোডটি হল `document.documentElement`। এটি দ্বারা `<html>` ট্যাগকে নির্দেশিত করে।

`<body>` = `document.body`
: আরেকটি বহুল ব্যবহৃত নোড হল `<body>` এলিম্যান্ট -- `document.body`.

`<head>` = `document.head`
: `<head>` ট্যাগকে `document.head` এর মাধ্যমে অ্যাক্সেস করতে পারি।

````warn header="`document.body` এর একটি ইরোর এটি `null` হতে পারে"
স্ক্রিপ্ট যেসব এলিমেন্ট থাকে না তাদের অ্যাক্সেস করতে পারে না।

যেমন, যদি `<head>` এ স্ক্রিপ্ট ট্যাগের সাহায্যে আমাদের `document.body` কে অ্যাক্সেস করতে চাওয়া, কেননা ব্রাউজার আদৌ `body` ট্যাগ রেন্ডার করে না।

সুতরাং, নিচের উদাহরণে `alert` এর মান হবে `null`:

```html run
<html>

<head>
  <script>
*!*
    alert( "From HEAD: " + document.body ); // null, কেননা body ট্যাগ রেন্ডার হয়নি
*/!*
  </script>
</head>

<body>

  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement, এখন এটি রেন্ডার হয়েছে
  </script>

</body>
</html>
```
````

```smart header="DOM এ `null` বলতে বুঝায় \"DOM এ এর অস্তিত্ব নেই\""
DOM এ `null` বলতে বুঝায় \"DOM এ এর অস্তিত্ব নেই\" অথবা "এমন কোন নোড নেই"।
```

## Children: childNodes, firstChild, lastChild

এদের দুই ধরণের টার্ম আছে যা আমরা এখন দেখব:

- **Child nodes (or children)** -- যা কোন এলিমেন্টের সরাসরি চাইল্ড এলিমেন্ট। অন্যথায় বলা যায়, অন্য একটির নেস্টেড হিসেবে থাকবে। যেমন, `<head>` এবং `<body>` হল `<html>` এর চাইল্ড এলিমেন্ট।
- **Descendants** -- সকল এলিমেন্ট, যারা একটার মধ্যে একটা তারমধ্যে আরেকটা এভাবে থাকে।

যেমন, এখানে `<body>` এর চাইল্ড নোড `<div>` এবং `<ul>` এবং তাদেরও চাইল্ড নোড আছে:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>
      <b>Information</b>
    </li>
  </ul>
</body>
</html>
```

...এবং এখানে `<body>` এর সরাসরি চাইল্ড নোড `<div>`, `<ul>` না এখানে আরো নেস্টেড এলিমেন্ট আছে, যেমন `<li>` (হল `<ul>` এর চাইল্ড) এবং `<b>` (হল `<li>` এর চাইল্ড) -- এভাবেই ট্রি গঠিত হয়।

**`childNodes` কালেকশনে টেক্সট নোড সহ সকল চাইল্ড নোড থাকে**

নিচের উদাহরণে `document.body` এর সকল চাইল্ড নোড দেখব:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
*/!*
  </script>
  ...more stuff...
</body>
</html>
```

দয়া করে একটি গুরুত্বপূর্ন তথ্য মনে রাখুন। যদি আমরা উপরের উদাহরণটি রান করি, তাহলে শেষ এলিমেন্ট হবে `<script>`। যদিও ডকুমেন্টটির আরো কিছু নোড আছে, কিন্তু শেষ নোড দেখায় `<script>`, কেননা `<script>` টি লোড না হওয়ায় পরের অংশগুলো পড়তে পারেনা।

**`firstChild` এবং `lastChild` প্রথম এবং শেষ চাইল্ড নোড অ্যাক্সেস করতে পারি।**

এটি একটি সংক্ষিপ্ত পদ্ধতি। আর যদি চাইল্ড নোড থাকে, নিম্নোক্ত কোড সমূহ সর্বদা সত্য হবে:
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

নোডে কোন চাইল্ড নোড আছে কিনা তা চেক করতে `elem.hasChildNodes()` এর সাহায্য নেয়া যায়।

### DOM কালেকশনস

আমরা দেখেছি, `childNodes` দেখতে অ্যারের মত। কিন্তু এটি অ্যারে না এটি একটি *কালেকশন* -- যা একটি ইটারেবল অবজেক্ট।

এর দুটি গুরুত্বপূর্ণ বিষয় আছে:

১. আমরা `for..of` এর সাহায্যে ইটারেট করতে পারি:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // shows all nodes from the collection
  }
  ```
  কেননা এটি একটি ইটারেবল (যা `Symbol.iterator` প্রপার্টি প্রোভাইড করে)।

২. অ্যারে মেথড কাজ করবে না, কেননা এটি অ্যারে না:
  ```js run
  alert(document.body.childNodes.filter); // undefined (there's no filter method!)
  ```

প্রথম ব্যাপারটি সুন্দর। এবং দ্বিতীয়টির জন্য আমরা চাইলে অ্যারেতে কনভার্ট করতে পারি `Array.from` মেথড এর সাহায্যে:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // function
  ```

```warn header="DOM কালেকশন সমূহ read-only"
DOM collections, এবং এই চ্যাপ্টারের *সকল* নেভিগেশন প্রপার্টি সমূহ read-only।

আমরা চাইল্ড সমূহকে চাইলে এভাবে রিপ্লেস করতে পারব না `childNodes[i] = ...`।

DOM কে রিপ্লেস করতে আমাদের অন্য মেথড প্রয়োজন, যা পরবর্তী চ্যাপ্টারে দেখব।
```

```warn header="DOM collections are live"
কিছু ব্যতিক্রম ছাড়া সকল DOM কালেকশনসমূহ *live*। অন্য কথায় বলা যায়, এরা DOM এর অবস্থাকে প্রকাশ করে।

যদি আমরা `elem.childNodes` কে রেফারেন্স করি, এবং কোন নোড DOM এ add/remove করি, তাহলে কালেকশনটি স্বয়ংক্রিয়ভাবে পরিবর্তন হবে।
```

````warn header="কালেকশন ইটারেট করতে `for..in` লুপ ব্যবহার করবেন না"
কালেকশন সমূহ `for..of` এর সাহায্যে ইটারেট করা হয়। মাঝেমাঝে অনেকে `for..in` ব্যবহারের চেষ্টা করে।

দয়া করে, এটি করবেন না। কেননা `for..in` লুপ সকল `enumerable` প্রপার্টি সমুহ সহ ইটারেট করে। এবং কালেকশনে কিছু অতিরিক্ত প্রপার্টি আছে যা আমাদের ব্যবহারের দরকার থাকেনা:

```html run
<body>
<script>
  // দেখাবে 0, 1, length, item, values এবং আরো অনেক কিছু।
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>
````

## Siblings এবং Parent

*Siblings* হল একই প্যারেন্টের চাইল্ড নোডসমূহ।

যেমন, এখানে `<head>` এবং `<body>` হল *Siblings*:

```html
<html>
  <head>...</head><body>...</body>
</html>
```

- `<body>` কে বলা হবে `<head>` এর "next" অথবা "right" *sibling*,
- `<head>` কে বলা হবে `<body>` এর "previous" or "left" *sibling*।

`nextSibling` প্রপার্টিতে আমরা "next sibling" কে পায়, এবং `previousSibling` এ  "previous sibling" কে পায়।

এবং `parentNode` প্রপার্টিতে প্যারেন্টকে পায়।

যেমন:

```js run
// <body> এর প্যারেন্ট হল <html>
alert( document.body.parentNode === document.documentElement ); // true

//  <head> এর পর <body>
alert( document.head.nextSibling ); // HTMLBodyElement

//  <body> এর আগে <head>
alert( document.body.previousSibling ); // HTMLHeadElement
```

## এলিমেন্ট সমূহ শুধু নেভিগেশন করা যায়

নেভিগেশন প্রপার্টি সমূহ *সকল* নোডকে রেফার করে। যেমন, `childNodes` এর প্রপার্টিতে আমরা টেক্সট নোড, এলিমেন্ট নোড এমনকি কমেন্ট নোড সমূহ পায়।

কিন্তু বেশিরভাগ ক্ষেত্রে আমাদের টেক্সট বা কমেন্ট নোডের দরকার পড়ে না। বেশিরভাগ ক্ষেত্রে আমরা এলিমেন্ট নোড সমূহকে ম্যানিপুলেট করি।

চলুন আরো কিছু নেভিগেশন প্রপার্টি দেখি যা শুধুমাত্র *element nodes* নিয়ে কাজ করে:

![](dom-links-elements.svg)

এরা উপরের মতই কাজ করে, এবং প্রতিটি প্রপার্টিতে `Element` শব্দটি থাকে:

- `children` -- শুধুমাত্র এলিমেন্ট নোডের চিলড্রেন।
- `firstElementChild`, `lastElementChild` -- প্রথম এবং শেষ এলিমেন্টের চিলড্রেন।
- `previousElementSibling`, `nextElementSibling` -- sibling এলিমেন্ট নোড।
- `parentElement` -- প্যারেন্ট এলিমেন্ট।

````smart header="`parentElement` কেন? প্যারেন্ট কি সর্বদা একটি এলিমেন্ট নই?"
`parentElement` প্রপার্টি সর্বদা প্যারেন্ট "element" রিটার্ন করে, যেখানে `parentNode` যেকোন ধরণের প্যারেন্ট নোড রিটার্ন করে। আসলে দুটি প্রপার্টিই সাধারণত প্যারেন্টকে রিটার্ন করে।

`document.documentElement` এর ব্যাতিক্রম আছে:

```js run
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

কেননা `document.documentElement` (`<html>`) এর রুট নোড হচ্ছে `document` এবং এটিই তার প্যারেন্ট। কিন্তু `document` এলিমেন্ট নোড না, সুতরাং `parentNode` *document* রিটার্ন করে আর `parentElement` *null* রিটার্ন করে।

এখানে আমরা দেখছি `elem` তার প্যারেন্ট element হিসেবে `<html>` পর্যন্ত যাবে, কিন্তু `document` দেখাবে না:
```js
while(elem = elem.parentElement) { // go up till <html>
  alert( elem );
}
```
````

চলুন উপরের উদাহরণটিতে `childNodes` এর পরিবর্তে `children` ব্যবহার করি। এখন এটি শুধু *elements* দেখাবে:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## আরো প্রপার্টি: tables [#dom-navigation-tables]

এখনো পর্যন্ত আমরা প্রাথমিক নেভিগেশন প্রপার্টি দেখেছি।

কিছু নির্দিষ্ট DOM এলিমেন্টের নির্দিষ্ট প্রপার্টি আছে, যা দ্বারা আরো নির্দিষ্ট তথ্য জানতে পারি।

*table* এলিমেন্ট এর একটি বাস্তবিক উদাহরন হতে পারে:

**`<table>`** এর কিছু অতিরিক্ত প্রপার্টি আছে:
- `table.rows` -- *table* এর `<tr>` এলিমেন্টের কালেকশন।
- `table.caption/tHead/tFoot` -- `<caption>`, `<thead>`, `<tfoot>` এলিমেন্টের কালেকশন।
- `table.tBodies` -- `<tbody>` এলিমেন্টের কালেকশন (কমপক্ষে ১ টি এলিমেন্ট থাকবে, কেননা ব্রাউজার স্বয়ংক্রিয়ভাবে DOM এ *tbody* জেনারেট করে)।

**`<thead>`, `<tfoot>`, `<tbody>`** এলিমেন্ট সমূহ `rows` প্রপার্টি নির্দেশ করে:
- `tbody.rows` -- ভিতরের `<tr>` এলিমেন্টের কালেকশন.

**`<tr>`:**
- `tr.cells` -- `<tr>` এর মধ্যকার`<td>` এবং `<th>` সমূহ.
- `tr.sectionRowIndex` -- `<thead>/<tbody>/<tfoot>` এর মধ্যকার `<tr>` এর অবস্থান।
- `tr.rowIndex` -- *table* এ `<tr>` এর অবস্থান।

**`<td>` and `<th>`:**
- `td.cellIndex` -- `<tr>` এর মধ্যকার `<td>` অবস্থান.

একটি উদাহরণ:

```html run height=100
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // প্রথম রো এর এর দ্বিতীয় এলিমেন্ট
  let td = table.*!*rows[0].cells[1]*/!*;
  td.style.backgroundColor = "red"; // ব্যাকগ্রাউন্ড পরিবর্তন হবে
</script>
```

আরো বিস্তারিত জানতে: [tabular data](https://html.spec.whatwg.org/multipage/tables.html)।

এছাড়াও *HTML form* এরও নেভিগেশন প্রপার্টি আছে। পরবর্তীতে আমরা বিস্তারিত জানব এ ব্যাপারে।

## সারাংশ

DOM নোডে আমরা নেভিগেশন প্রপার্টি সমূহ দ্বারা অ্যাক্সেস করতে পারি।

এদের প্রধান দুটি সেট হল:

- সকল নোডের জন্য: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- শুধুমাত্র এলিমেন্ট নোডের জন্য: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

এছাড়াও স্পেসিফিক কিছু DOM এলিমেন্টের কিছু নির্দিষ্ট প্রপার্টি আছে, যেমন: *table*, *form*।

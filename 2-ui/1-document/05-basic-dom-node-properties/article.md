# Node properties: type, tag এবং contents

DOM নোড সম্পর্কে আরো বিস্তারিত জানা যাক।

এই অধ্যায়ে আমরা এদের কিভাবে ব্যবহার করতে হয় এবং তাদের বহুল ব্যবহৃত প্রপার্টি সম্পর্কে জানব।

## DOM node classes

বিভিন্ন DOM নোডের বিভিন্ন ধরণের প্রপার্টি আছে। যেমন এলিমেন্ট নোড `<a>` ট্যাগের লিংক সম্পর্কিত প্রপার্টি আছে, এবং `<input>` ট্যাগের ইনপুট সম্পর্কিত প্রপার্টি আছে। টেক্সট নোড আবার এলিমেন্ট নোডের মত না। তবে এটির কিছু প্রপার্টিও একই, কেননা সকল DOM নোড ক্লাস একই প্যারেন্ট ক্লাস হতে আছে।

প্রতিটি DOM নোড সংশ্লিষ্ট বিল্ট ইন ক্লাসের সাথে সম্পর্কিত।

হায়ার্য়াকি অনুযায়ী রুট ক্লাস হল [EventTarget](https://dom.spec.whatwg.org/#eventtarget), একে ইনহেরিট করে  [Node](http://dom.spec.whatwg.org/#interface-node), এবং অন্যান্য DOM নোড তাদের ইনহেরিট করে।

নিচের ছবিটি দেখুন, বিস্তারিত আলোচনা করা হল:

![](dom-class-hierarchy.svg)

ক্লাসগুলো হল:

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- এটি রুট "abstract" ক্লাস। এই ক্লাসের অবজেক্ট তৈরি হয়না। এটি বেস ক্লাস হিসেবে কাজ করে, এজন্য আমরা সকল ধরণের DOM নোডের সাথে বিভিন্ন ধরণের "events" পায়, পরবর্তীতে এ সম্পর্কে আরো বিস্তারিত জানব।
- [Node](http://dom.spec.whatwg.org/#interface-node) -- এটিও একটি DOM নোডের "abstract" ক্লাস হিসেবে কাজ করে। এটির কিছু কোর ফাংশনালটি আছে: `parentNode`, `nextSibling`, `childNodes` ইত্যাদি (এরা getters)। এই ক্লাসেরও অবজেক্ট তৈরি হয়না। তবে কংক্রিট নোড ক্লাস সমূহ এটি থেকে ইনহেরিট হয়। যেমন: টেক্সট নোডের জন্য `Text`, এলিমেন্ট নোডের জন্য `Element` এবং অদ্ভুতুড়ে কমেন্ট নোডের জন্য `Comment`।
- [Element](http://dom.spec.whatwg.org/#interface-element) -- এটি DOM এলিমেন্টের বেস ক্লাস। এলিমেন্ট সমূহ নেভিগেশনের জন্য `nextElementSibling`, `children` এবং সার্চিংয়ের জন্য `getElementsByTagName`, `querySelector` ইত্যাদি মেথড প্রভাইড করে। ব্রাউজার শুধুমাত্র HTML ছাড়াও XML এবং SVG ও সাপোর্ট করে। `Element` ক্লাস `SVGElement`, `XMLElement` এবং `HTMLElement` এর বেস ক্লাস হিসেবে কাজ করে।
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- এবং সকল HTML এলিমেন্টের বেস ক্লাস এটি, এর কিছু চাইল্ড ক্লাস আছে:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- `<input>` এলিমেন্টের জন্য,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) --`<body>` এলিমেন্টের জন্য,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- `<a>` এলিমেন্টের জন্য,
    - ...এইরকম, প্রতিটি ট্যাগের স্পেসিফিক নিজস্ব ক্লাস এবং কিছু স্পেসিফিক প্রপার্টি এবং মেথড আছে।

সুতরাং, প্রতিটি নোড তাদের প্যারেন্ট ক্লাস সমূহের এর সকল প্রপার্টি এবং মেথড সমূহও ইনহেরিট করে।

যেমন, DOM এর একটি `<input>` এলিমেন্ট আছে। যেটির ক্লাস হল [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement)।

এটি তার প্যারেন্ট ক্লাস সমূহের এর সকল প্রপার্টি এবং মেথড সমূহও এর অন্তর্ভুক্ত হবে:

- `HTMLInputElement` -- এটি ইনপুট-স্পেসিফিক প্রপার্টি প্রভাইড করে,
- `HTMLElement` -- এটি HTML এলিমেন্টের কমন মেথড সমূহ প্রভাইড করে(getters/setters),
- `Element` -- এটি জেনেরিক এলিমেন্ট মেথড সমূহ প্রভাইড করে,
- `Node` -- এটি কমন DOM নোড মেথড সমূহ প্রভাইড করে,
- `EventTarget` -- ইভেন্ট সমূহ প্রভাইড করে (এ সম্পর্কে পরবর্তীতে জানব),
- ...এবং সর্বশেষে এরা `Object` হতে ইনহেরিট হয়, সুতরাং অবজেক্ট মেথড যেমন `hasOwnProperty` সাপোর্ট করে।

অবজেক্ট এর `constructor` প্রপার্টি দ্বারা DOM নোডের ক্লাস নাম দেখতে পারি। `constructor.name` দ্বারা নাম দেখাবে:

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...অথবা `toString`:

```js run
alert( document.body ); // [object HTMLBodyElement]
```

আমরা `instanceof` ও ব্যবহার করতে পারি:

```js run
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

আমরা দেখতে পাচ্ছি, DOM নোড সমূহ রেগুলার জাভাস্ক্রিপ্ট অবজেক্ট। এরা প্রোটোটাইপ বেসড ক্লাস ব্যবহার করে।

আমরা ব্রাউজারে `console.dir(elem)` এর সাহায্যে খুব সহজে এলিমেন্ট এর বিস্তারিত দেখি। কনসোলে আমরা `HTMLElement.prototype`, `Element.prototype` ইত্যাদির প্রটোটাইপ দেখব।

```smart header="`console.dir(elem)` বনাম `console.log(elem)`"
বেশিরভাগ ব্রাউজার এই দুটি কমান্ড সাপোর্ট করে: `console.log` এবং `console.dir`। আমরা আর্গুমেন্টটির আউটপুট কনসোলে দেখব। জাভাস্ক্রিপ্ট অবজেক্টের জন্য দুটিই একই।

কিন্তু DOM এলিমেন্টের জন্য এটি আলাদা:

- `console.log(elem)` DOM এলিমেন্টের ট্রি দেখাবে।
- `console.dir(elem)` shows the element as a DOM object, good to explore its properties.

`document.body` টি চেষ্টা করে দেখুন।
```

````smart header="IDL স্পেসিফিকেশন"
স্পেসিফিকেশনে জাভাস্ক্রিপ্ট এর মাধ্যমে DOM ক্লাস সমূহ আলোচনা করা হয়নি [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL), তবে এটি বুঝা সহজ।

IDL এ সকল প্রপার্টি তাদের টাইপ অনুযায়ী প্রিপেন্ডেড থাকে। যেমন, `DOMString`, `boolean` ইত্যাদি।

নিচে দেখানো হল:

```js
// Define HTMLInputElement
*!*
// কোলন ":" দ্বারা বুঝায় HTMLInputElement এর প্যারেন্ট HTMLElement
*/!*
interface HTMLInputElement: HTMLElement {
  // এখানে <input> এলিমেন্টের প্রপার্টি এবং মেথড থাকে

*!*
  // "DOMString" দ্বারা বুঝায় প্রপার্টি সমূহ হল স্ট্রিং
*/!*
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

*!*
  // প্রপার্টি সমূহ হল স্ট্রিং বুলিয়ান (true/false)
  attribute boolean autofocus;
*/!*
  ...
*!*
  // এখানে: "void" মেথড দ্বারা বুঝানো হচ্ছে এটি কোন ভ্যালু রিটার্ন করবে না
*/!*
  void select();
  ...
}
```
````

## "nodeType" প্রপার্টি

পূর্বে আমরা `nodeType` প্রপার্টি এর সাহায্যে DOM নোড যাচাই করতে পারতাম।

এটির একটি মান আছে:
- `elem.nodeType == 1` এলিমেন্ট নোড,
- `elem.nodeType == 3` টেক্সট নোড,
- `elem.nodeType == 9` ডকুমেন্ট অবজেক্ট,
- আরো বিস্তারিত জানতে দেখুন [the specification](https://dom.spec.whatwg.org/#node)।

উদাহরণস্বরূপ:

```html run
<body>
  <script>
  let elem = document.body;

  // আসুন এটি কি ধরণের নোড যাচাই করি?
  alert(elem.nodeType); // 1 => element

  // এবং এটি হল...
  alert(elem.firstChild.nodeType); // 3 => text

  // ডকুমেন্ট অবজেক্ট এর মান
  alert( document.nodeType ); // 9
  </script>
</body>
```

মডার্ন জাভাস্ক্রিপ্টে, আমরা `instanceof` এর সাহায্যে নোড টাইপ যাচাই করতে পারি, কিন্তু অনেক সময় `nodeType` ও কাজে আসে। `nodeType` হল রিড-অনলি, এটি পরিবর্তনযোগ্য নয়।

## ট্যাগ: nodeName এবং tagName

DOM নোড হতে, আমরা ট্যাগ নামটি `nodeName` বা `tagName` প্রপার্টির সাহায্যে পড়তে পারি:

উদাহরণস্বরূপ:

```js run
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

`tagName` এবং `nodeName` এর মাঝে কি কোন পার্থক্য আছে?

হ্যাঁ, প্রপার্টিগুলোর পার্থক্য নামগুলোতেই প্রতিফলিত হয়, তবে এছাড়াও কিছুটা সূক্ষ্ম পার্থক্য আছে।

- `tagName` প্রপার্টি শুধুমাত্র `Element` নোড এ থাকে।
- `nodeName` প্রপার্টি যে কোন `Node` এর জন্য:
    - এলিমেন্টের জন্য `tagName` একই।
    - অন্যান্য নোড টাইপের জন্য যেমন (text, comment, ইত্যাদি)।

অন্যভাবে বলা যায়, `tagName` শুধুমাত্র এলিমেন্ট নোডের জন্য কাজ করে (অর্থাৎ `Element` ক্লাসের জন্য), অন্যদিকে `nodeName` এ যেকোন নোড টাইপের নাম পেতে পারি।

উদাহরণস্বরূপ, চলুন `document` এবং *comment* node এর জন্য `tagName` এবং `nodeName` এর পার্থক্য দেখি:


```html run
<body><!-- comment -->

  <script>
    // কমেন্টের জন্য
    alert( document.body.firstChild.tagName ); // undefined (যেহেতু এটি এলিমেন্ট না)
    alert( document.body.firstChild.nodeName ); // #comment

    // ডকুমেন্টের জন্য
    alert( document.tagName ); // undefined (যেহেতু এটি এলিমেন্ট না)
    alert( document.nodeName ); // #document
  </script>
</body>
```

যদি আমরা এলিমেন্ট নিয়ে কাজ করি, তাহলে `tagName` এবং `nodeName` উভয়ই ব্যবহার করতে পারব - তাদের মাঝে কোন পার্থক্য নাই।

```smart header="XML মোড ব্যাতীত ট্যাগ নাম সর্বদা বড় হাতের হয়"
The browser has two modes of processing documents: HTML and XML. Usually the HTML-mode is used for webpages. XML-mode is enabled when the browser receives an XML-document with the header: `Content-Type: application/xml+xhtml`.

In HTML mode `tagName/nodeName` is always uppercased: it's `BODY` either for `<body>` or `<BoDy>`.

In XML mode the case is kept "as is". Nowadays XML mode is rarely used.
```


## innerHTML: কন্টেন্ট

[innerHTML](https://w3c.github.io/DOM-Parsing/#widl-Element-innerHTML) প্রপার্টিতে এলিমেন্টের কন্টেন্ট স্ট্রিং হিসেবে নেই।

আমরা এর সাহায্যে কন্টেন্ট পরিবর্তনও করতে পারি। সুতরাং DOM এ পরিবর্তনের অন্যতম উপায় হল এটি।

নিচের উদাহরণে `document.body` এর কন্টেন্ট দেখি এবং একে পরিবর্তন করি:

```html run
<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // বর্তমান কন্টেন্ট দেখি
    document.body.innerHTML = 'The new BODY!'; // একে পরিবর্তন করি
  </script>

</body>
```

আমরা ভুল HTML এলিমেন্ট সংযুক্ত করতে চাইলে ব্রাউজার স্বয়ংক্রিয়ভাবে সংশোধন করে দেয়:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // ক্লোজিং ট্যাগ দেয়া হয়নি
    alert( document.body.innerHTML ); // <b>test</b> (স্বয়ংক্রিয়ভাবে সংশোধন হয়ে গেছে)
  </script>

</body>
```

```smart header="স্ক্রিপ্টস এক্সিকিউট হয় না"
যদি ডকুমেন্টে `innerHTML` এর সাহায্যে `<script>` সংযুক্ত করি -- এটি এক্সিকিউট হবে নাহ, HTML এর একটি অংশ হিসেবে থাকবে।
```

### সতর্কীকরণ: "innerHTML+=" দ্বারা সম্পূর্ন প্রতিস্থাপন হয়

আমরা এভাবে এলিমেন্টে নতুন কন্টেন্ট সংযুক্ত করতে পারি `elem.innerHTML+="more html"`।

যেমন:

```js
chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "How goes?";
```

কিন্তু এটি করার সময় আমাদের সতর্ক থাকা উচিত, কেননা এটি দ্বারা নতুন ডাটা অ্যাপেন্ড হয় না, সম্পূর্ণ এলিমেন্ট প্রতিস্থাপিত হয়।

এখানে, এই দুটি লাইন একই কাজ করে:

```js
elem.innerHTML += "...";
// is a shorter way to write:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

`innerHTML+=` নিম্নোক্ত পদ্ধতিতে কাজ করে:

1. পূর্বের কন্টেন্ট রিমুভ করবে।
2. `innerHTML` পূর্বের কন্টেন্ট এবং নতুন কন্টেন্ট সংযুক্ত হয়ে DOM এ প্রতিস্থাপিত হবে ।

**যেহেতু সম্পূর্ন কন্টেন্টটি ্মুছে আবার নতুন করে লিখা হয়, সমস্ত ইমেজ এবং অন্যান্য রিসোর্স পুনরায় লোড হবে**.

উপরের `chatDiv` উদাহরণে এই লাইনে `chatDiv.innerHTML+="How goes?"` পুনরায় HTML কন্টেন্ট এবং `smile.gif` রিলোড হবে(এটি ব্রাউজারে cached থাকতে পারে)। যদি `chatDiv` এলিমেন্টে উল্লেখ পরিমাণ পরিমাণ টেক্সট এবং ইমেজ থাকে রিলোড হওয়াটি আমাদের কাছে দৃশ্যমান হবে।

এটির আরো একটি সাইড ইফেক্ট আছে। For instance, if the existing text was selected with the mouse, then most browsers will remove the selection upon rewriting `innerHTML`. And if there was an `<input>` with a text entered by the visitor, then the text will be removed. And so on.

তবে, আমরা `innerHTML` ছাড়াও অন্য উপায়ে কন্টেন্ট অ্যাড করতে পারি, আমরা সামনে এ ব্যাপারে জানব।

## outerHTML: এলিমেন্টের সম্পূর্ন HTML

`outerHTML` প্রপার্টি এলিমেন্টের সম্পূর্ন কন্টেন্ট সংরক্ষণ করে। অর্থাৎ `innerHTML` এবং এলিমেন্টের নিজস্ব কন্টেন্ট।

এখানে একটি উদাহরণ দেখুন:

```html run
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

**সতর্কীকরণ: এটি `innerHTML` এর মত না, `outerHTML` এ কিছু লিখলে এটি এলিমেন্টটি পরিবর্তন করে না। ্তার পরিবর্তে, DOM এ প্রতিস্থাপিত হয়।**

হ্যাঁ, শুনতে অদ্ভুত লাগলেও, এটিই ঘটে, এজন্য আমাদের এ ব্যাপারটি আলাদা ভাবে জেনে রাখা উচিত।

উদাহরণস্বরূপ:

```html run
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

*!*
  // div.outerHTML এর সাহায্যে <p>...</p> প্রতিস্থাপন
*/!*
  div.outerHTML = '<p>A new element</p>'; // (*)

*!*
  // Wow! 'div' এখনো আগের মত!
*/!*
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```

অদ্ভুত, তাই না?

`(*)` এই লাইনে আমরা `div` কে `<p>A new element</p>` দ্বারা প্রতিস্থাপন করি। আউটার ডকুমেন্টে আমরা `<div>` এর বদলে নতুন কন্টেন্ট দেখি। কিন্তু, `(**)` এই লাইনে আমরা দেখছি, পুরাতন `div` ভ্যারিয়েবলের মান পরিবর্তন হয়নি।

`outerHTML` এ অ্যাসাইমেন্টে DOM এলিমেন্ট মোডিফাই হয়না (এইখানে রেফারেন্স করা অবজেক্টটি হল 'div'), কিন্তু এটিকে DOM হতে রিমুভ করে নতুন HTML এতে প্লেস হয়।

সুতরাং চলুন দেখি `div.outerHTML=...` এর ক্ষেত্রে কি হয়:
- ডকুমেন্ট হতে `div` টি রিমুভ হবে।
- তার স্থলে আরেকটি নতুন HTML `<p>A new element</p>` প্রতিস্থাপিত হবে।
- `div` still has its old value. The new HTML wasn't saved to any variable.

এই জন্য আমরা সহজে ভুল করতে পারি: `div.outerHTML` কে পরিবর্তন করব এবং পরবর্তীতে `div` নিয়ে কাজ চালিয়ে যাব, এমন হবে নাহ। কেননা আমরা এইভাবে `innerHTML` এর সাহায্যে কাজ করতে পারব, `outerHTML` দ্বারা সম্ভব নয়।

আমরা কন্টেন্ট `elem.outerHTML` এর সাহায্যেও লিখতে পারি, তবে আমাদের সর্বদা মাথায় রাখতে এটি আমাদের ('elem') কে চ্যাঞ্জ করছে না। তার পরিবর্তে এটি নতুন HTML সংযুক্ত করে। আমরা DOM সার্চিং মেথড সমূহ দ্বারা নতুন এলিমেন্টকে রেফারেন্স করতে পারি।

## nodeValue/data: text node content

`innerHTML` প্রপার্টি শুধুমাত্র এলিমেন্ট নোডের সাথে কাজ করে।

অন্যান্য নোড টাইপ, যেমন টেক্সট নোড, এরও অনুরূপ প্রপার্টি আছে যেমন: `nodeValue` এবং `data`। প্রাক্টিক্যাল ইউজ কেসে দুইটির কাজ একই, তবে কিছু সামান্য পার্থক্য আছে। আমরা এখানে `data` প্রপার্টি ব্যবহার করব, কেননা এটি সংক্ষিপ্তরূপ।

কমেন্ট এবং টেক্সট নোডের কন্টেন্ট পড়ার একটি উদাহরণ দেখুন:

```html run height="50"
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Hello
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Comment
*/!*
  </script>
</body>
```

আমাদের টেক্সট নোডের পরিবর্তন করার দরকার হতে পারে, তবে কমেন্ট নোডের কন্টেন্ট কেন পরিবর্তন করা লাগতে পারে?

অনেক সময় ডেভলাপাররা টেমপ্লেট ইন্সট্রাকশনের জন্য কমেন্টও এমবেড করে, যেমন:

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

...তারপরে জাভাস্ক্রিপ্ট এটি `data` প্রপার্টির সাহায্যে পড়তে পারে এবং এম্বেড থাকা এর নিয়ম হতে প্রসেস করতে পারে।

## textContent: শুধুই টেক্সট

`textContent` এলিমেন্টে থাকা শুধু টেক্সট রিটার্ন করে: শুধুই টেক্সট, সকল `<tags>` বাদ দেয়।

উদাহরনস্বরূপ:

```html run
<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  // Headline! Martians attack people!
  alert(news.textContent);
</script>
```

এখানে আমরা দেখছি শুধু টেক্সট রিটার্ন হচ্ছে, সকল `<tags>` ফিল্টার হয়ে শুধুমাত্র টেক্সট থাকবে।

সাধারণত, আমাদের এই ধরণের টেক্সট পড়ার দরকার হয় না।

**তবে `textContent` এর সাহায্যে কোন কিছু লিখা অনেক উপকারী, এর সাহায্যে আমরা "নিরাপদ উপায়ে" কন্টেন্ট DOM এ সংযুক্ত করতে পারি।**

ধরুন আমাদের একটি স্বতন্ত্র স্ট্রিং আছে, যা ইউজারের ইনপুট দেয়, এবং এটি দেখাতে চাই।

- `innerHTML` এর মাধ্যমে আমরা "HTML" হিসেবে সংযুক্ত করতে পারি, HTML ট্যাগ সহ।
- `textContent` এর মাধ্যমে আমরা "text" হিসেবে সংযুক্ত করতে পারি, সকল সিম্বল টেক্সট হিসেবে কাউন্ট হবে।

এখানে দেখুন:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. প্রথমটিতে `<div>` নামটি "HTML" আকারে দেখি: সকল ট্যাগ রেন্ডার হয়, যার জন্য আমরা নামটি বোল্ড দেখি।
2. দ্বিতীয়টিতে `<div>` নামটি "text" আকারে দেখি, এজন্য আমরা এটি এভাবে দেখি `<b>Winnie-the-Pooh!</b>`।

বেশিরভাগ ক্ষেত্রে, আমরা ইউজার থেকে ইনপুট হিসেবে শুধু টেক্সট আশ করি। আমরা কোন ধরণের অপ্রয়োজনীয় HTML দেখতে চায় না। এই ক্ষেত্রে `textContent` আমাদের কাজে আসবে।

## "hidden" প্রপার্টি

"hidden" অ্যাট্রিবিউট দ্বারা DOM এ কোন এলিমেন্ট প্রদর্শিত হবে কি হবে না তা কন্ট্রোল করতে পারি।

আমরা এটি HTML বা JavaScript  এর সাহায্যে কন্ট্রোল করতে পারি:

```html run height="80"
<div>উভয়ই এলিমেন্ট হাইড থাকবে</div>

<div hidden>অ্যাট্রিবিউটের মাধ্যমে "hidden"</div>

<div id="elem">JavaScript  এর সাহায্যে "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

আসলে, `hidden` প্রপার্টি `style="display:none"` এর মত কাজ করে। কিন্তু এটি সংক্ষেপে লিখা যায়।

এখানে একটি ব্লিংক এলিমেন্ট দেখুন:


```html run height=50
<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## আরো প্রপার্টি

DOM এলিমেন্টের আরো কিছু প্রপার্টি আছে, এবং আলাদা আলাদা ক্লাস এর আলাদা আলাদা বৈশিষ্ট্য আছে:

- `value` --  `<input>`, `<select>` এবং `<textarea>` এর ভ্যালু (`HTMLInputElement`, `HTMLSelectElement`...)।
- `href` -- `<a href="...">` এর "href"  (`HTMLAnchorElement`)।
- `id` -- "id" অ্যাট্রিবিউট, সকল এলিমেন্টের জন্য (`HTMLElement`)।
- ...এবং আরো অনেক...

যেমন:

```html run height="80"
<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
```

বেশিরভাগ HTML অ্যাট্রিবিউট সম্পর্কিত DOM প্রপার্টি আছে, এবং আমরা এদের এক্সেস করতে পারি।

যদি আমরা কোন নির্দিষ্ট ক্লাসের সাপোর্টেড প্রপার্টি সমূহ পেতে চাই, তাহলে আমরা তাদের স্পেসিফিকশন দেখতে পারি। যেমন `HTMLInputElement` সম্পর্কে জানতে <https://html.spec.whatwg.org/#htmlinputelement>।

অথবা যদি আমরা আরো দ্রুত এবং বিশদ জানতে চাই ব্রাউজারের ডেভ টুলসের সাহায্য নিতে পারি -- `console.dir(elem)` এর মাধ্যমে আমরা কোন এলিমেন্টের প্রপার্টি এবং মেথড সমূহ বিস্তারিত জানতে পারি। অথবা ব্রাউজার ডেভ টুলসের এলিমেন্ট ট্যাব এ "DOM properties" দেখতে পারি।

## সারাংশ

প্রতিটি DOM নোড একটি নির্দিষ্ট ক্লাসের অন্তর্গত। ক্লাসগুলো একটি হায়ার্য়াকি অনুযায়ী থাকে। ফলে সকল প্যারেন্ট ক্লাসের প্রপার্টি এবং মেথড সমূহও ইনহেরিট হয়।

প্রধান DOM নোড প্রপার্টি হল:

`nodeType`
: এর সাহায্যে আমরা নোড যাচাই করতে পারি। এটির নিউমেরিক ভ্যালু আছে: `1` দ্বারা বুঝায় এলিমেন্ট,`3` দ্বারা বুঝায় টেক্সট নোড, এবং অন্যান্য নোড টাইপের জন্য আলাদা আলাদা ভ্যালু। এটি Read-only।

`nodeName/tagName`
: এলিমেন্ট বা ট্যাগ নাম (XML-mode) ব্যাতীত বড় হাতের। এলিমেন্ট ব্যতীত অন্যান্য নোডের নামের জন্য `nodeName` প্রপার্টি ব্যবহার হয়। এটিও Read-only।

`innerHTML`
: এলিমেন্টের HTML কন্টেন্ট। এটি পরিবর্তনযোগ্য।

`outerHTML`
: সম্পুর্ন এলিমেন্ট সহ কন্টেন্ট। `elem.outerHTML` দ্বারা কিছু সংযোজন করলে তা `elem` কে প্রতিস্থাপিত করে না। তার পরিবর্তে এটি নতুন কন্টেন্ট সংযোজন করে এবং পুরাতন টি রিমুভ হয়।

`nodeValue/data`
: নন-এলিমেন্ট নোডের কন্টেন্ট এর জন্য (text, comment)। দুটিই প্রায় একই, তবে বেশিরভাগ ক্ষেত্রে `data` ব্যবহার করি। কন্টেন্ট পরিবর্তনযোগ্য।

`textContent`
: এলিমেন্টের মধ্যের টেক্সট: সকল ধরণের HTML `<tags>` ব্যাতীত। কন্টেন্ট সংযোজনের সময় প্লেন টেক্সট হিসেবে সংযুক্ত হয়, যার ফলে স্পেশাল ক্যারাক্টার বা ট্যাগ সমূহ টেক্সট আকারে দেখাবে। ইউজার ইনপুট কন্টেন্ট এস্কেপিংয়ে এটি কার্যকর।

`hidden`
: যদি `true` হয় তাহলে CSS `display:none` এর মত কাজ করবে।

DOM নোডের বিভিন্ন ক্লাস অনুযায়ী বিভিন্ন প্রপার্টি আছে, যেমন `<input>` (`HTMLInputElement`) এলিমেন্টের `value`, `type`, `<a>` (`HTMLAnchorElement`) এলিমেন্টের `href` ইত্যাদি। বেশিরভাগ HTML অ্যাট্রিবিউট সম্পর্কিত বিভিন্ন DOM প্রপার্টি আছে।

যাইহোক, HTML অ্যাট্রিবিউট এবং DOM প্রপার্টি সবসময় এক হয় না, বিস্তারিত আমরা পরবর্তী অধ্যায়ে দেখব।

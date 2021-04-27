# ডকুমেন্টকে পরিবর্তন

DOM মোডিফিকেশনের মাধ্যমে আমরা আমাদের পেইজ কে আরো "ডায়নামিক প্রাণবন্ত" করতে পারি।

এখানে আমরা দেখব কিভাবে বিদ্যমান পেজের কন্টেন্ট সমূহকে "স্বতঃস্ফুর্তভাবে" পরিবর্তন করতে পারি।

## উদাহরণ: একটি মেসেজ দেখানো

চলুন একটি উদাহরণের সাহায্যে এটি বুঝি। আমরা একটি মেসেজ এলিমেন্ট লিখব যা `alert` এর মত দেখায়।

এটি দেখতে এমন হবে:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Hi there!</strong> You've read an important message.
</div>
*/!*
```

এটি একটি HTML উদাহরণ। চলুন পুরো ব্যাপারটি আমরা প্রোগ্রামাটিক্যালি জাভাস্ক্রিপ্ট এর সাহায্যে করি (ধরে নিই আমাদের ইতোমধ্যে CSS স্ট্যাইল করা আছে)।

## এলিমেন্ট তৈরি

DOM নোড তৈরির জন্য দুটি মেথড আছে:

`document.createElement(tag)`
: ট্যাগ অনুযায়ী একটি নতুন *এলিমেন্ট নোড* তৈরি করা:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: টেক্সট অনুযায়ী একটি নতুন *টেক্সট নোড* তৈরি করা:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

বেশিরভাব ক্ষেত্রে আমাদের এলিমেন্ট নোড তৈরি করা লাগে, যেমন মেসেজ দেখাতে `div` এলিমেন্ট।

### মেসেজ এলিমেন্ট তৈরি

DIV মেসেজটি তৈরিতে আমাদের তিনটি ধাপের প্রয়োজন:

```js
// 1. <div> এলিমেন্ট তৈরি
let div = document.createElement('div');

// 2. "alert" ক্লাশ নামটি সংযোগ
div.className = "alert";

// 3. কন্টেন্ট সংযোগ
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

আমরা এলিমেন্ট তৈরি করেছি। কিন্তু এখনো শুধুমাত্র `div` নামের একটি ভ্যারিয়েবল, এটি পেজে সংযুক্ত হবে না। তাই একে দেখতেও পারব না।

## পেজে সংযুক্তের মেথড

`div` টি দেখাতে, আমাদের এটি `document` এর কোন একটি জায়গায় এটি সংযুক্ত করতে হবে। যেমন, `<body>` এলিমেন্ট, যা `document.body` দ্বারা সূচিত করা হয়।

এটির একটি স্পেশাল মেথড আছে `append`: `document.body.append(div)`.

এখানে সম্পুর্ন কোডটি দেখুন:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

*!*
  document.body.append(div);
*/!*
</script>
```

এখানে আমরা `document.body` তে `append` কল করেছি, কিন্তু আমরা চাইলে অন্য এলিমেন্টে সংযুক্ত করতে ঐ এলিমেন্ট সমূহেও `append` কল করতে পারি। যেমন, আমরা `<div>` এ অন্য এলিমেন্ট সংযুক্ত করতে পারি `div.append(anotherElement)`।

এখানে আমরা আরো কিছু ইনসার্ট মেথড দেখব:

- `node.append(...nodes or strings)` -- *নোডের শেষে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
- `node.prepend(...nodes or strings)` -- *নোডের শুরুতে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
- `node.before(...nodes or strings)` –- *নোডের পূর্বে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
- `node.after(...nodes or strings)` –- *নোডের পরে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
- `node.replaceWith(...nodes or strings)` –- `node` কে অন্য নোড বা স্ট্রিং দ্বারা রিপ্লেস।

মেথডসমূহের আর্গুমেণ্টটি যেকোন স্বতন্ত্র DOM নোড অথবা টেক্সট স্ট্রিং(যা স্বয়ংক্রিয়ভাবে টেক্সট নোড হবে) হতে পারে।

চলুন উদাহরণের সাহায্যে দেখি।

এখানে একটি লিস্ট আছে, এখানে আমরা ইনসার্শন মেথড সমূহ সংযুক্ত করব:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // <ol> নোডের পূর্বে "before" স্ট্রিং
  ol.after('after'); //  <ol> নোডের পর "after" স্ট্রিং

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // <ol> এর শুরুতে একটি লিস্ট

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // <ol> এর শেষে একটি লিস্ট
</script>
```

মেথডগুলো কিভাবে কাজ করে তার একটি চিত্র এখানে দেখুন:

![](before-prepend-append-after.svg)

সুতরাং সর্বশেষে আমাদের DOM টি হবে এমন:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

ইতোমধ্যে আমরা জেনেছি আমরা একাধিক নোড বা স্ট্রিং একবার কলের মাধ্যমে সংযুক্ত করতে পারি।

যেমন, এখানে আমরা একটি স্ট্রিং এবং একটি এলিমেন্ট সংযুক্ত করছি:

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

দয়া করে নোট করুন: এখানে টেক্সটি একটি স্ট্রিং হিসেবেই সংযুক্ত হবে, "HTML" হিসেবে নয়, প্রপারলি ক্যারাক্টার `<`, `>` সমূহ এস্কেপ হবে।

সুতরাং সর্বশেষ আউটপুটটি হবে এমন:

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

অন্য ভাবে বলা যায়, স্ট্রিং সমূহ নিরাপদ ভাবে সংযুক্ত হয়, `elem.textContent` এর মত।

সুতরাং, মেথডসমূহ DOM নোড অথবা টেক্সট হিসেবে সংযুক্ত হয়।

কিন্তু যদি আমরা কোন স্ট্রিংকে "HTML" কন্টেন্ট হিসেবে সংযুক্ত করতে চায়, যা সকল ট্যাগ এবং অন্যান্য ব্যাপার গুলো সহ কাজ করবে অনেকটা `elem.innerHTML` এর মত, এভাবে করা কি সম্ভব?
## insertAdjacentHTML/Text/Element

এজন্য আমরা আরেকটি বহুরূপী মেথড ব্যবহার করতে পারি: `elem.insertAdjacentHTML(where, html)`।

যার প্রথম প্যারামিটারটি হবে পজিশন, অর্থাৎ `elem` এর কোন অবস্থানে সংযুক্ত হবে। নিচে এদের সম্পর্কে আলোচনা করা হল:

- `"beforebegin"` -- `elem` শুরুর পূর্বে `html` টি সংযুক্ত হবে,
- `"afterbegin"` -- `elem` এর শুরুতে `html` টি সংযুক্ত হবে,
- `"beforeend"` -- `elem` টি শেষ হওয়ার পূর্বে `html` টি সংযুক্ত হবে,
- `"afterend"` -- `elem` টি শেষ হওয়ার পর `html` টি সংযুক্ত হবে।

দ্বিতীয় প্যারামিটারটি হবে একটি HTML ট্রিং, যা "HTML" হিসেবে সংযুক্ত হবে।

উদাহরণস্বরূপ:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

...যা দেখতে এমন হবে:

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

এভাবেই আমরা স্বতন্ত্র HTML পেজে সংযুক্ত করতে পারি।

এখানে সংযুক্তকরণের চিত্রটি দেখুন:

![](insert-adjacent.svg)

এখানে আমরা পূর্বের এবং বর্তমান ছবিটি লক্ষ্য করলে বুঝতে পারি, দুইটি ছবিই একই পজিশন নির্দেশ করে, তবে পার্থক্য হল এই মেথডটির সাহায্যে আমরা স্ট্রিংকে HTML কন্টেন্ট হিসেবে সংযুক্ত করতে পারি।

অনুরূপ আরো দুটি মেথড আছে:

- `elem.insertAdjacentText(where, text)` -- পূর্বের মত, তবে এটি স্ট্রিং হিসেবে `text` নিবে এবং "টেক্সট" হিসেবে সংযুক্ত হবে,
- `elem.insertAdjacentElement(where, elem)` -- একই কাজ করবে, তবে শুধুমাত্র এলিমেন্ট সংযুক্ত হবে।

তবে বেশিরভাগ ক্ষেত্রে এদের আলাদা করে ব্যবহার করা হয়না। বাস্তবিক ক্ষেত্রে আমরা বেশিরভাগ সময় শুধুমাত্র `insertAdjacentHTML` ব্যবহার করব। কেননা এলিমেন্ট এবং টেক্সটের জন্য আমাদের `append/prepend/before/after` মেথড সমূহ আছে -- টেক্সট ইনসার্শনের জন্য এরা বেশি সুবিধাজনক।

আমরা এভাবেও মেসেজটি দেখাতে পারি:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

## Node removal

কোন নোড রিমুভ করতে একটি মেথড আছে - `node.remove()`।

চলুন আমাদের মেসেজটিকে এক সেকেন্ড পর DOM হতে রিমুভ করি:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

দয়া করে নোট করুন: যদি আমরা এলিমেন্টটিকে অন্য আরেক এলিমেন্টের মধ্যে *move* করাতে চাই -- তাহলে আমাদের পূর্বের নোডটি *remove* করতে হবে না।

**সকল ইনসার্শন মেথড স্বয়ংক্রিয়ভাবে পুরনো নোডটি DOM হতে রিমুভ করে দেয়।**

উদাহরণস্বরূপ, এলিমেন্টকে অদল বদল করি:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // remove কল করা লাগবে না
  second.after(first); // #second টির মধ্যে #first টি সংযুক্ত হবে
</script>
```

## Cloning nodes: cloneNode

কিভাবে আমরা অনূরূপ আরেকটি মেসেজ সংযুক্ত করত্র পারি?

আমরা একটি ফাংশন তৈরির মাধ্যমে এটি করতে পারি। কিন্তু আমাদের বিকল্প আরেকটি উপায় আছে *clone* যা বর্তমান `div` কে ক্লোন করবে এবং আমরা চাইলে একে পরিবর্তন করতে পারি (যদি আমাদের প্রয়োজন হয়)।

অনেক সময় আমাদের অনেক বড় এলিমেন্ট থাকতে পারে, এক্ষেত্রে এটি সহজে এবং দ্রুত কাজ করবে।

- `elem.cloneNode(true)` কলে এলিমেন্টটির একটি "ডীপ" ক্লোন তৈরি করে -- সকল সাব এলিমেন্ট এবং অ্যাট্রিবিউট সহ। যদি আমরা `elem.cloneNode(false)` এভাবে ক্রিয়েট করি, তাহলে সাব এলিমেন্ট ব্যতীত ক্লোন হবে।

মেসেজ কপি করার একটি উদাহরণ:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong> You've read an important message.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // মেসেজ ক্লোন
  div2.querySelector('strong').innerHTML = 'Bye there!'; // ক্লোন করা এলিমেন্টের strong এলিমেন্টকে পরিবর্তন

  div.after(div2); // div এর পরে ক্লোন করা এলিমেন্টটি দেখানো হল
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` হল একটি বিশেষ DOM নোড যা একটি র‍্যাপার হিসেবে কাজ করে, এবং একে আমরা অন্য নোডে সংযুক্ত করতে পারি।

আমরা অন্যান্য নোড এর মধ্যে সংযুক্তকরণের সময়, এটি সংযুক্ত হওয়ার পরিবর্তে এর কন্টেন্ট সমূহ সংযুক্ত হয়।

যেমন, `getListContent` ফাংশনটি `<li>` আইটেমের একটি ফ্রাগমেন্ট তৈরি করে, এবং এর পর `<ul>` এর মধ্যে সংযুক্ত করলাম:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

দয়া করে নোট করুন, শেষ লাইনে `(*)` আমরা `DocumentFragment` সংযুক্ত করলাম, কিন্তু এটি "মিশ্রিত" অবস্থায় আছে, সুতরাং আউটপুটটি হবে:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` কদাচিৎ ব্যবহার হয়। কেন আমাদের এই ধরণের বিশেষ নোডের দরকার হয়, যখন আমরা এটি এভাবে করতে পারি? নিচের উদাহরণটি দেখুন:

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operator = friends!
*/!*
</script>
```

পূর্বেই উল্লেখ করেছি `DocumentFragment` আমাদের বিশেষ কিছু কন্সেপ্টের জন্য দরকার হয়, যেমন [template](info:template-element) এলিমেন্ট, যা পরবর্তীতে আমরা আলোচনা করব।

## পুরনো উপায়ে insert/remove মেথডস

[old]

এছাড়াও কিছু "পুরনো" DOM ম্যানিপুলেশন মেথড আছে, যা এখনো বিদ্যমান।

মেথডগুলো পুরনো জাভাস্ক্রিপ্টে ব্যবহার হত। বর্তমানে, মডার্ন জাভাস্ক্রিপ্টে আমাদের ঐ মেথড সমূহ ব্যবহারের দরকার পড়ে না, যেমন `append`, `prepend`, `before`, `after`, `remove`, `replaceWith` এই মেথড সমূহ অনেক বেশি কার্যকরী।

এখানে এদের নিয়ে আলোচনার একটি কারণ হল, পুরনো অনেক স্ক্রিপ্টে আমরা এদের ব্যবহার দেখতে পায়:

`parentElem.appendChild(node)`
: `parentElem` এর সবার শেষে `node` সংযুক্তকরণে।

    নিচের উদাহরণে `<ol>` এর একদম শেষে নতুন একটি `<li>` আইটেম সংযুক্তকরণ করা হল:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: `parentElem` এর নির্দিষ্ট অবস্থানে `node` সংযুক্তকরণ।

    নিচের উদাহরণে দ্বিতীয় অবস্থানে `<li>` আইটেমটি সংযুক্ত হবে:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    `newLi` কে প্রথম এলিমেন্ট হিসেবে সংযুক্ত করতে পারি এভাবে:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: `parentElem` এ `oldChild` কে `node` দ্বারা পরিবর্তন।

`parentElem.removeChild(node)`
: `parentElem` হতে `node` কে বাদ দিতে (ধরে নিন `node` হল `parentElem` এর একটি চাইল্ড)।

    নিচের উদাহরণে `<ol>` হতে প্রথম `<li>` কে বাদ দেয়া দেখানো হল:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

সকল মেথড inserted/removed নোডটিকে রিটার্ন করবে। অন্যভাবে বলা যায়, `parentElem.appendChild(node)` মেথডটি `node` টিকে রিটার্ন করে। তবে সাধারণত আমরা রিটার্ন ভ্যালু ব্যবহার করিনা, বেশিরভাগ ক্ষেত্রে শুধুমাত্র মেথডটি রান হয়।

## "document.write" সম্পর্কে কিছু আলোচনা

এছাড়াও আরো একটি পুরনো উপায় আছে, যার মাধ্যমে আমরা পেজে কিছু দেখায়: `document.write`।

সিন্ট্যাক্সটি হল:

```html run
<p>Somewhere in the page...</p>
*!*
<script>
  document.write('<b>Hello from JS</b>');
</script>
*/!*
<p>The end</p>
```

`document.write(html)` কলের মাধ্যমে আমরা `html` এ "নির্দিষ্ট অবস্থানে" লিখতে পারি। `html` স্ট্রিং ডায়নামিক্যালি জেনারেট হয়, সুতরাং এটি আরো বেশি কার্যকরী। আমরা জাভাস্ক্রিপ্টের সাহায্যে একটি সম্পূর্ন ওয়েবপেজ লিখতে পারি।

মেথডটি অনেক পুরনো যখন কোন স্পেসিফিক DOM ছিল না, বা কোন স্ট্যান্ডার্ড ছিল না। এবং এটি এখনো ব্যবহার হয়, কেননা স্ক্রিপ্টে এটি ব্যবহৃত।

মডার্ন স্ক্রিপ্টে এটি তেমন ব্যবহার করা হয় না, কেননা এর কিছু লিমিটেশন আছে:

**`document.write` কাজ করে শুধুমাত্র পেজ লোডিংয়ের সময়।**

যদি আমরা পরে এটি কল করি, বর্তমান ডকুমেন্ট কন্টেন্টটি মুছে যাবে।

উদাহরণস্বরূপ:

```html run
<p>After one second the contents of this page will be replaced...</p>
*!*
<script>
  // ১ সেকেন্ড পর document.write
  // পেজ লোড হওয়ার পর, এক্সিক্টেন্ট কন্টেন্ট মুছে যাবে
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
*/!*
```

সুতরাং এটি পেজ "লোড সম্পন্ন" হওয়ার পর আর ব্যবহার উপযোগী নয়, এটি উপরে আলোচিত অন্যান্য DOM মেথডের মত না।

এটিই এর খারাপ দিক।

তবে এর ভালো দিকও আছে। ট্যাকনিক্যালি, `document.write` কল হয় যখন ব্রাউজার ইনকামিং HTML কে পার্স করে, এবং আমরা ডায়নামিক্যালি কিছু লিখতে পারি, ব্রাউজার এটি অন্যান্য HTML টেক্সটের মত মনে করে।

সুতরাং এটি অন্যান্য স্ক্রিপ্ট থেকে অনেক দ্রুত কাজ করে, কেননা এক্ষেত্রে কোন *DOM modification* হয়না। এটি সরাসরি পেইজে টেক্সট হিসেবে লিখে, এবং ঐ মূহুর্তেও DOM টিও সম্পুর্ণ বিল্ট হয়না।

সুতরাং যদি আমাদের লোডিং টাইমে কোন কন্টেন্ট ডায়নামিক্যালি লিখার দরকার হয়, যেখানে আমাদের দ্রুত করা লাগে, তখন এটি কাজে আসতে পারে। তবে এই ধরণের পরিস্থিতি তেমন আসে না। তারপরও আমাদের এই মেথডসমূহ সম্পর্কে জেনে রাখা উচিত।

## সারাংশ

- নতুন নোড তৈরির মেথড:
    - `document.createElement(tag)` -- প্রদত্ত ট্যাগ অনুযায়ী একটি নতুন *এলিমেন্ট নোড* তৈরি করে,
    - `document.createTextNode(value)` -- একটি নতুন *টেক্সট নোড* তৈরি করে(কদাচিৎ ব্যবহার হয়),
    - `elem.cloneNode(deep)` -- এলিমেন্টের ক্লোন করে, যদি `deep==true` হয় তাহলে সকল সাব এলিমেন্ট সহ ক্লোন হয়।

- ইনসার্শন এবং রিমুভাল:
    - `node.append(...nodes or strings)` -- *নোডের শেষে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
    - `node.prepend(...nodes or strings)` -- *নোডের শুরুতে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
    - `node.before(...nodes or strings)` –- *নোডের পূর্বে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
    - `node.after(...nodes or strings)` –- *নোডের পরে* কোন নোড অথবা স্ট্রিং সংযুক্ত,
    - `node.replaceWith(...nodes or strings)` –- `node` কে অন্য নোড বা স্ট্রিং দ্বারা রিপ্লেস।
    - `node.remove()` –- `node` রিমুভ।

    স্ট্রিং সমূহ "text" হিসেবেই সংযুক্ত হয়।

- এছাড়াও কিছু "পুরনো" মেথড আছে:
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    সকল মেথড `node` টিকে ভ্যালু হিসেবে রিটার্ন করে।

- এছাড়াও `html` আকারে কোন কিছু সংযুক্ত করতে আছে, `elem.insertAdjacentHTML(where, html)` এবং `where` নির্দেশ করে এটি এলিমেন্টের কোন পজিশনে ইনসার্ট হবে:
    - `"beforebegin"` -- `elem` শুরুর পূর্বে `html` টি সংযুক্ত হবে,
    - `"afterbegin"` -- `elem` এর শুরুতে `html` টি সংযুক্ত হবে,
    - `"beforeend"` -- `elem` টি শেষ হওয়ার পূর্বে `html` টি সংযুক্ত হবে,
    - `"afterend"` -- `elem` টি শেষ হওয়ার পর `html` টি সংযুক্ত হবে।

    এছাড়াও অনুরূপ আরো দুটি মেথড আছে, `elem.insertAdjacentText` এবং `elem.insertAdjacentElement`, যা যথাক্রমে টেক্সট এবং এলিমেন্টকে স্ট্রিং হিসেবে নেয়, তবে এদের ব্যবহার কদাচিৎ।

- পেজ লোডিং টাইমে কিছু সংযুক্ত করতে:
    - `document.write(html)`

    পেজ লোড হওয়ার পর পুনরায় এটি কল করলে ডকুমেন্টটি মুছে যায়। পুরনো স্ক্রিপ্টে আমরা এদের দেখি।

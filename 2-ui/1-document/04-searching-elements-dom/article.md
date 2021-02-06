# Searching: getElement*, querySelector*

DOM নেভিগেশনসমূহ একই সিব্লিং বা নিকট এলিমেন্ট সমূহের জন্য অনেক কাজের। কিন্তু যদি এভাবে না থাকে? কিভাবে আমরা একটি স্বতন্ত্র এলিমেন্ট পেতে পারি?

এজন্য আমাদের কিছু সার্চিং মেথড আছে।

## document.getElementById বা শুধু id

যদি এলিমেন্টে শুধু `id` অ্যাট্রিবিউট থাকে, তাহলে আমরা এলিমেন্টটি এভাবে `document.getElementById(id)` মেথডের সাহায্যে খুঁজে পেতে পারি, এটি DOM এর কোন অবস্থানে তা মূখ্য নয়।

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
  // elem is a reference to DOM-element with id="elem"
  elem.style.background = 'red';

  // id="elem-content" has a hyphen inside, so it can't be a variable name
  // ...but we can access it using square brackets: window['elem-content']
</script>
```

...এটি কাজের নয়, যদি আমরা একই নামের একটি জাভাস্ক্রিপ্ট ভ্যারিয়েবল ডিক্লেয়ার করি, এটি প্রিসিডেন্স অনুযায়ী কাজ করবে:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // now elem is 5, not a reference to <div id="elem">

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

```smart header="Can use pseudo-classes as well"
Pseudo-classes in the CSS selector like `:hover` and `:active` are also supported. For instance, `document.querySelectorAll(':hover')` will return the collection with elements that the pointer is over now (in nesting order: from the outermost `<html>` to the most nested one).
```

## querySelector [#querySelector]

The call to `elem.querySelector(css)` returns the first element for the given CSS selector.

In other words, the result is the same as `elem.querySelectorAll(css)[0]`, but the latter is looking for *all* elements and picking one, while `elem.querySelector` just looks for one. So it's faster and also shorter to write.

## matches

Previous methods were searching the DOM.

The [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) does not look for anything, it merely checks if `elem` matches the given CSS-selector. It returns `true` or `false`.

The method comes in handy when we are iterating over elements (like in an array or something) and trying to filter out those that interest us.

For instance:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // can be any collection instead of document.body.children
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

*Ancestors* of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.

The method `elem.closest(css)` looks the nearest ancestor that matches the CSS-selector. The `elem` itself is also included in the search.

In other words, the method `closest` goes up from the element and checks each of parents. If it matches the selector, then the search stops, and the ancestor is returned.

For instance:

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

  alert(chapter.closest('h1')); // null (because h1 is not an ancestor)
</script>
```

## getElementsBy*

There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. Very rarely used.

For instance:
```js
// get all divs in the document
let divs = document.getElementsByTagName('div');
```

Let's find all `input` tags inside the table:

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

```warn header="Don't forget the `\"s\"` letter!"
Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of <code>getElement<b>s</b>ByTagName</code>.

The `"s"` letter is absent in `getElementById`, because it returns a single element. But `getElementsByTagName` returns a collection of elements, so there's `"s"` inside.
```

````warn header="It returns a collection, not an element!"
Another widespread novice mistake is to write:

```js
// doesn't work
document.getElementsByTagName('input').value = 5;
```

That won't work, because it takes a *collection* of inputs and assigns the value to it rather than to elements inside it.

We should either iterate over the collection or get an element by its index, and then assign, like this:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Looking for `.article` elements:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Live collections

All methods `"getElementsBy*"` return a *live* collection. Such collections always reflect the current state of the document and "auto-update" when it changes.

In the example below, there are two scripts.

1. The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2. The second scripts runs after the browser meets one more `<div>`, so its length is `2`.

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

In contrast, `querySelectorAll` returns a *static* collection. It's like a fixed array of elements.

If we use it instead, then both scripts output `1`:


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

Now we can easily see the difference. The static collection did not increase after the appearance of a new `div` in the document.

## Summary

There are 6 main methods to search for nodes in DOM:

<table>
<thead>
<tr>
<td>Method</td>
<td>Searches by...</td>
<td>Can call on an element?</td>
<td>Live?</td>
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

By far the most used are `querySelector` and `querySelectorAll`, but `getElementBy*` can be sporadically helpful or found in the old scripts.

Besides that:

- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.
- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `elem` itself is also checked.

And let's mention one more method here to check for the child-parent relationship, as it's sometimes useful:
-  `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.

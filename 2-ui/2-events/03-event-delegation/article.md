
# ইভেন্ট ডেলিগেশন

<<<<<<< HEAD
Capturing এবং bubbling এর মাধ্যমে ইভেন্ট সমূহকে সহজে হ্যান্ডেল করার একটি উপায় হল  *event delegation*।
=======
Capturing and bubbling allow us to implement one of the most powerful event handling patterns called *event delegation*.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9


<<<<<<< HEAD
আইডিয়াটি হল যদি আমাদের একই ধরণের অনেক এলিমেন্ট কোন একটি প্যারেন্ট এলিমেন্টের অধীনে থাকে এবং তাদের একইভাবে হ্যান্ডেল করা লাগে তাহলে আমরা একটি হ্যান্ডেলারের মাধ্যমে তাদের হ্যান্ডেল করতে পারি।
=======
In the handler we get `event.target` to see where the event actually happened and handle it.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

হ্যান্ডেলারে আমরা `event.target` কে পাব, যার মাধ্যমে আমরা জানতে পারব কোন এলিমেন্টে ইভেন্টটি সংগঠিত হয়েছে এবং তার উপর ভিত্তি করে আমরা এটিকে হ্যান্ডেল করতে পারব।

একটি উদাহরণ দেখি -- [Ba-Gua diagram](http://en.wikipedia.org/wiki/Ba_gua) এটি একটি চাইনিজ ফিলোসপি।

এখানে দেখুন:

[iframe height=350 src="bagua" edit link]

HTML পেজটি হবে এমন:

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 more lines of this kind...</tr>
  <tr>...2 more lines of this kind...</tr>
</table>
```

এখানে টেবল টিতে ৯ টি ঘর আছে, কিন্তু এখানে ৯৯ বা ৯৯৯ টি থাকতে পারে, এটি আমাদের জন্য ব্যাপার না।

**আমাদের টাস্ক হল `<td>` তে ক্লিক হলে তা হাইলাইট হবে**

আমরা প্রতিটি `<td>` তে `onclick` হ্যান্ডেলার অ্যাসাইনের মাধ্যমে এটি করতে পারি -- তবে তার পরিবর্তে আমরা এটি এমন ভাবে করব যার মাধ্যমে `<table>` এলিমেন্ট হতে একটি হ্যান্ডেলারের মাধ্যমে সব তার সকল চাইল্ড এলিমেন্ট কে অ্যাক্সেস করব।

আমরা `event.target` এর মাধ্যমে কোন এলিমেন্টটি ক্লিকড হয়েছে তা জানতে পারি।

কোডটি হবে:

```js
let selectedTd;

*!*
table.onclick = function(event) {
  let target = event.target; // যেখানে ইভেন্টটি ঘটেছে

  if (target.tagName != 'TD') return; // TD ট্যাগ যাচাই

  highlight(target); // এলিমেন্টটিকে হাইলাইট
};
*/!*

function highlight(td) {
  if (selectedTd) { // পূর্বের হাইলাইট এলিমেন্টটি রিমুভড
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // নতুন হাইলাইট এলিমেন্টটি
}
```

এখানে টেবল এ কতটি ঘর আছে তা আমাদের চিন্তা করা লাগবে না, আমাদের কোডটি ডায়নামিক্যালি *table* এর সকল ঘরকে হাইলাইটেড করতে পারবে।

কিন্তু, এটির কিছু সীমাবদ্ধতা আছে।

`<td>` এর মধ্যে আরো কোন এলিমেন্ট থাকতে পারে, এবং আমাদের ক্লিকড `<td>` এর চাইল্ড এলিমেন্টে সংগঠিত হতে পারে।

উপরে বর্ণিত HTML এ আমরা দেখছি `<td>` এর মধ্যে `<strong>` ট্যাগ:

```html
<td>
*!*
  <strong>Northwest</strong>
*/!*
  ...
</td>
```

বাস্তবে, আমরা যখন `<strong>` এ ক্লিক করি তখন এটিই `event.target`।

![](bagua-bubble.svg)

আমাদের হ্যান্ডেলারটি `table.onclick` এমন ভাবে লিখতে হবে যাতে `event.target` টি কোন `<td>` এর চাইল্ড এলিমেন্টে ক্লিক হয়েছে তা কিনা জানতে পারি।

এখানে পরিমার্জিত কোডটি দেখানো হল:

```js
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```

ব্যাখ্যা:
1. `elem.closest(selector)` এর সাহয্যে কোন এলিমেন্ট কি ঐ সিলেক্টরের চাইল্ড এলিমেন্ট কিনা জানতে পারি। এক্ষেত্রে আমরা এলিমেন্টটি কি `<td>` এর অধীনে কিনা যাচাই করছি।
2. `event.target` যদি `<td>` এর অধীনে না হয়, তাহলে হ্যান্ডেলারটি আর এক্সিকিউট হবে না।
3. অনেক সময় টেবলটি নেস্টেড হতে পারে, এক্ষেত্রে আমরা যাচাই করব `event.target` কি আমাদের টেবল এর কিনা।
4. সর্বশেষে এটি হাইলাইট ফাংশনটি কল করবে।

এর ফলে আমাদের কোডটি হবে সহজবোধ্য, পরিবর্তনযোগ্য এবং দ্রুত।
## ইভেন্ট ডেলিগেশনের আরো উদাহরণ:

ইভেন্ট ডেলিগেশনের আরো বিভিন্ন ব্যবহার আছে।

ধরুন, আমরা মেনু বাটন বানাতে চাই যেমন "Save", "Load", "Search" ইত্যাদি, এবং আমাদের একটি অবজেক্ট আছে যার মেথড সমূহ হল `save`, `load`, `search`... কিভাবে তাদের মিলাতে পারি?

আমাদের মাথায় প্রথমে যে আইডিয়াটি আসতে পারে সেটি হল প্রত্যেক বাটনের জন্য আলাদা হ্যান্ডেলার। কিন্তু এটির আরো সহজবোধ্য এবং পরিবর্তনযোগ্য সমাধান আছে। মেন্যুটির জন্য একটি হ্যান্ডেলার অ্যাসাইনের মাধ্যমেই আমরা এটি করতে পারে এবং `data-action` অ্যাট্রিবিউটের সাহায্যে মেথডের নামটি অ্যাসাইন করে দিতে পারি:

```html
<button *!*data-action="save"*/!*>Click to Save</button>
```

হ্যান্ডেলার অ্যাট্রিবিউট হতে মেথডটি অ্যাক্সিকিউট করবে। এখানের কোডটি দেখুন:

```html autorun height=60 run untrusted
<div id="menu">
  <button data-action="save">Save</button>
  <button data-action="load">Load</button>
  <button data-action="search">Search</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('saving');
    }

    load() {
      alert('loading');
    }

    search() {
      alert('searching');
    }

    onClick(event) {
*!*
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
*/!*
    };
  }

  new Menu(menu);
</script>
```

দয়া করে মনে রাখুন `(*)` লাইনে `this.onClick` এর সাথে আমাদের `this` কে `bind` করতে হবে। এটি সম্পর্কে আমাদের জেনে রাখা উচিত, অন্যথায় `this` আমাদের *Menu* অবজেক্ট কে নির্দেশিত করার পরিবর্তে (`elem`) কে রেফারেন্স করবে, এবং `this[action]` এটি কাজ করবে না।

এখানে ইভেন্ট ডেলিগেশনের ফলে আমাদের কি সুবিধা হচ্ছে?

```compare
+ আমাদের প্রতিটি বাটনের জন্য আলাদা করে হ্যান্ডেলার অ্যাসাইন করতে হচ্ছে না। শুধুমাত্র *Menu* তে অ্যাট্রিবিউট অনুসারে মেথড সংযুক্ত করলেই হবে।
+ HTML স্ট্রাকচারটি আরো বেশি পরিবর্তনযোগ্য, আমরা চাইলে যে কোন সময় বাটন add/remove করতে পারি।
```

আমরা চাইলে ক্লাস ধরেও এটি করতে পারি `.action-save`, `.action-load`, কিন্তু `data-action` এই অ্যাট্রিবিউটটিই বেশি মানানসই। এবং আমরা এটি ধরে CSS অ্যাপ্লাই করতে পারি।

## "behavior" প্যাটার্ন

স্পেশাল অ্যাট্রিবিউট এবং ক্লাসের সাহায্যে আমরা আরো সহজে এলিমেন্টে হ্যান্ডেলার সংযুক্ত করতে পারি, এটিকে "behavior" প্যাটার্ন বলে।

প্যাটার্নটির দুটি অংশ:
1. আমরা এলিমেন্টে একটি কাস্টম অ্যাট্রিবিউট সংযুক্ত করব।
2. একটি গ্লোবাল হ্যান্ডেলার এটিকে হ্যান্ডেল করবে, এবং অ্যাট্রিবিউট অনুযায়ী যদি কোন ইভেন্ট সংগঠিত হয় -- তাহলে ব্লকটি এক্সিকিউট হবে।

### Behavior: Counter

উদাহরণস্বরূপ, এখানে `data-counter` অ্যাট্রিবিউটের সাহায্যে আমরা একটি *behavior* সংযুক্ত করব: "ক্লিক হলে বাটনের মান বাড়বে":

```html run autorun height=60
Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // যদি অ্যাট্রিবিউটটি থাকে...
      event.target.value++;
    }

  });
</script>
```

যদি আমরা কোন বাটনে ক্লিক করি, তাহলে এর মান বাড়বে। এখানে কাজটি কিভাবে সংগঠিত হচ্ছে তা আমাদের বুঝা গুরুত্বপূর্ন।

এখানে `data-counter` এর মত আরো অনেক অ্যাট্রিবিউট থাকতে পারে। আমরা আমাদের চাহিদামত নতুন কোন অ্যাট্রিবিউট সংযুক্ত করতে পারি, এবং নতুন অ্যাট্রিবিউট অনুযায়ী আমরা নতুন *behavior* সংযুক্ত করতে পারি।

```warn header="document-level হ্যান্ডেলারের জন্য সর্বদা `addEventListener`"
যখন আমরা `document` অবজেক্ট এ কোন হ্যান্ডেলার অ্যাসাইন করব, সর্বদা `document.on<event>` এর বদলে `addEventListener` ব্যবহার করব, কেননা পরবর্তীতে কোডে কনফ্লিক্ট হতে পারে: নতুন হ্যান্ডেলার পূর্ববর্তীটিকে রিপ্লেস করে দিতে পারে।

বাস্তব ক্ষেত্রে আমাদের `document` এ বিভিন্ন কাজের জন্য আলাদা আলাদা হ্যান্ডেলার অ্যাসাইন করব।
```

### Behavior: Toggler

Behavior এর আরো একটি উদাহরণ। কোন একটি এলিমেন্টের অ্যাট্রিবিউট `data-toggle-id` এবং এতে ক্লিক হলে অ্যাট্রিবিউটের ভ্যালু অনুযায়ী আরেকটি এলিমেন্টকে show/hide করবে:

```html autorun run height=60
<button *!*data-toggle-id="subscribe-mail"*/!*>
  Show the subscription form
</button>

<form id="subscribe-mail" hidden>
  Your mail: <input type="email">
</form>

<script>
*!*
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
*/!*
</script>
```

চলুন দেখি এখানে আমরা কি করেছি। এখন, ধরুন আরো একটি এলিমেন্টে আমরা toggle ফাংশনালিটি সংযুক্ত করব -- এজন্য, আমরা শুধু `data-toggle-id` এর ভ্যালু পরিবর্তন করলেই হবে।

এবং এটি আসলেই অনেক কাজের -- একই ধরণের Behavior এর জন্য আমাদের আলাদা করে আর জাভাস্ক্রিপ্ট কোড করা লাগছে না। document-level handler পেজের যেকোন এলিমেন্টের জন্য এটি এক্সিকিউট হবে।

আমরা একটি এলিমেন্টের জন্য একাধিক Behavior সেট করতে পারি।

"behavior" প্যাটার্ন জাভাস্ক্রিপ্টের mini-fragments এর বিকল্প হতে পারে।

## সারাংশ

ইভেন্ট ডেলিগেশন অনেক মজার একটি ফিচার! এটির সাহায্যে DOM events কে আমরা সহজে হ্যান্ডেল করতে পারি।

এটির সাহায্যে একই এলিমেন্ট বা একই ফাংশনালিটি আমরা সহজেই নিয়ন্ত্রণ করতে পারি, তবে শুধু এটিই নয়।

আর কিছু ব্যাপার আছে:

1. কোন কন্টেনার এলিমেন্টের জন্য শুধুমাত্র একটি হ্যান্ডেলার।
2. হ্যান্ডেলারে -- আমরা সোর্স এলিমেন্টটি জানতে পারি `event.target`।
3. যদি কোন এলিমেন্টে ইভেন্ট সংগঠিত হয় এবং এটির উপর কোন কিছু অ্যাপ্লাই করার দরকার পড়ে তাহলে তা করব।

সুবিধাসমূহ:

```compare
+ সহজেই ইনিশিয়ালাইজ করা যায় এবং আলাদা কোন মেমোরি লাগে না: এবং একাধিক হ্যান্ডেলার লাগে নাহ।
+ কোড সংক্ষিপ্তকরণ: কোন এলিমেন্ট add/remove এর জন্য, আলাদা করে add/remove হ্যান্ডেলার লাগে না।
+ DOM পরিবর্তন: আমরা সহজেই DOM এ পরিবর্তন করতে পারি।
```

তবে ইভেন্ট ডেলিগেশন এর কিছু সীমাবদ্ধতাও আছে:

```compare
- প্রথমত, event অবশ্যই bubbling করতে হবে। কিছু ইভেন্ট bubbling সাপোর্ট করে না, এছাড়াও, low-level হ্যান্ডেলার `event.stopPropagation()` ব্যবহার করে না।
- দ্বিতীয়ত, ডেলিগেশন সামান্য CPU load করতে পারে, কেননা যেকোন এলিমেন্টের ইভেন্টের জন্য আমাদের হ্যান্ডেলারটি এক্সিকিউট হয়। তবে এটি খুব সামান্যই যা আমরা বিবেচনা না করলেও হবে।
```

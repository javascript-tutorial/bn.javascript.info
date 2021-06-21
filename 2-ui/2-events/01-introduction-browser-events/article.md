# browser events এর সূচনা

*event* হল কোন কিছু ঘটার একটি সংকেত। সকল DOM নোড এই ধরণের সংকেত জেনারেট করতে পারে(কিন্তু event শুধুমাত্র এর মধ্যই সীমাবদ্ধ না)।

নিচে গুরুত্বপূর্ণ কিছু DOM ইভেন্ট নিয়ে আলোচনা করা হল:

**Mouse events:**
- `click` -- যখন কোন এলিমেন্টে ক্লিক করা হয় (টাচস্ক্রীন ডিভাইসে ট্যাপ করলে)।
- `contextmenu` -- এলিমেন্টে মাউসের  ডানের বাটনটি ক্লিক হলে।
- `mouseover` / `mouseout` -- কোন এলিমেন্টে মাউসের কার্সর আসলে অথবা এলিমেন্ট হতে ছেড়ে গেলে।
- `mousedown` / `mouseup` -- যখন কোন একটি এলিমেন্টে মাউস বাটন ক্লিক হয় বা ছাড়া হয়।
- `mousemove` -- যখন মাউস নাড়াচড়া করা হয়।

**Keyboard events:**
- `keydown` এবং `keyup` -- যখন কি-বোর্ডে কোন বাটন প্রেস হয়, এবং বাটন প্রেস সম্পন্ন হয়।

**Form element events:**
- `submit` -- যখন কোন একটি `<form>` সাবমিট হয়।
- `focus` --  যখন কোন একটি এলিমেন্টে ফোকাস হয় যেমন, `<input>`।

**Document events:**
- `DOMContentLoaded` -- যখন DOM সম্পূর্ণ বিল্ট হয় এবং HTML লোড প্রসেসড হয়।

**CSS events:**
- `transitionend` -- যখন একটি CSS-animation সম্পন্ন হয়।

এছাড়াও আরো অনেক ইভেন্ট আছে। পরবর্তী অধ্যায় সমূহে আমরা আরো বিস্তারিত জানব।

## Event handlers

ইভেন্টগুলো কিভাবে সংগঠিত হবে তা অ্যাসাইন করা হয় *handler* দ্বারা -- এটি একটি ফাংশন।

হ্যান্ডেলার হল ইউজারের চাহিদামত জাভাস্ক্রিপ্ট কোড রান করার একটি উপায়, অন্য কথায় ইভেন্ট সংগঠিত হলে যে ফাংশনটি কল হয়।

বিভিন্নভাবে আমরা হ্যান্ডেলার অ্যাসাইন করতে পারি। চলুন, সবচেয়ে সহজটি দিয়ে শুরু করি।

### HTML-attribute

অ্যাট্রিবিউট আকারে হ্যান্ডেলার `on<event>` সেট করা।

যেমন, `input` এ একটি `click` হ্যান্ডেলার অ্যাসাইন করতে, আমরা `onclick` ব্যবহার করতে পারি, এভাবে:

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

মাউস ক্লিক হলে, `onclick` এর মধ্যের কোড রান হবে।

দয়া করে মনে রাখুন `onclick` এর মধ্যে আমাদের একক উদ্ধৃতি চিহ্ন *''* ব্যবহার করা লাগবে, কেননা অ্যাট্রিবিউটটি যুগল উদ্ধৃতি চিহ্ন *""* দ্বারা লিখা হয়েছে। যদি আমরা উভয়ই যুগল উদ্ধৃতি চিহ্ন ব্যবহার করি, এভাবে:  `onclick="alert("Click!")"`, তাহলে এটি কাজ করবে না।

HTML-attribute এ অনেক কোড লিখা তেমন সুবিধাজনক না। সুতরাং আমাদের জন্য সুবিধাজনক হবে আলাদা ফাংশনে কোড লিখে তাদের কল করলে।

**onclick এর মাধ্যমে ফাংশন কল** `countRabbits()`:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Count rabbits!">
```

আমরা জানি অ্যাট্রিবিউট কেস-সেনসিটিভ না, সুতরাং `ONCLICK`, `onClick` এবং `onCLICK`... সব কাজ করবে তবে আদর্শ হল সর্বদা ছোট হাতের লিখা: `onclick`।

### DOM property

আমরা DOM প্রপার্টির মাধ্যমেও হ্যান্ডেলার অ্যাসাইন করতে পারি `on<event>`।

যেমন, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Click me">
<script>
*!*
  elem.onclick = function() {
    alert('Thank you');
  };
*/!*
</script>
```

অ্যাট্রিবিটের সাহায্যে লিখিত হ্যান্ডেলারটি, একটি নতুন ফাংশন তৈরি করে এবং DOM প্রপার্টিতে এটি সেট করে।

সুতরাং এটি পূর্ববর্তী টির মত কাজ করে।

নিচের দুটি কোডের কাজ একই:

1. শুধুমাত্র HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Click!');
      };
    */!*
    </script>
    ```

প্রথম উদাহরণটিতে, অ্যাট্রিবিউটটি `button.onclick` ইনিশিয়ালাইজ করে, যেখানে দ্বিতীয় উদাহরণটি একটি -- স্ক্রিপ্ট, এটিই মূল পার্থক্য।

**এক্ষেত্রে শুধুমাত্র একটি `onclick` প্রপার্টি থাকবে, সুতরাং আমরা একের অধিক হ্যান্ডেলার সেট করতে পারব না।**

নিচের উদাহরণটিতে দেখুন স্ক্রিপ্টের ফাংশনটি অ্যাট্রিবিউট হ্যান্ডেলারকে ওভাররাইট করে:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
*!*
  elem.onclick = function() { // অ্যাট্রিবিউট হ্যান্ডেলারকে ওভাররাইট
    alert('After'); // শুধুমাত্র এটি দেখাবে
  };
*/!*
</script>
```

 হ্যান্ডেলার রিমুভ করতে -- `elem.onclick = null`।

## this এর মাধ্যমে এলিমেন্টকে অ্যাক্সেস

হ্যান্ডেলারের মধ্যে `this` দ্বারা এলিমেন্টটিকে মির্দেশ করে। অর্থাৎ যে এলিমেন্টটি হ্যান্ডেলারে লিখা হয়েছে।

নিচের কোডটি রান হলে এটি `button` এর কন্টেন্টটি দেখাবে `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```

## Possible mistakes

যখন আমরা ইভেন্ট নিয়ে কোন কাজ করব --আমাদের কিছু ব্যপার মনে রাখতে হবে।

আমরা কোন এক্সিটিং ফাংশনকে এভাবে হ্যান্ডেলার হিসেবে সেট করতে পারি:

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

কিন্তু সাবধান! আমাদের ফাংশনটি এভাবে অ্যাসাইন করতে হবে `sayThanks`, `sayThanks()` কাজ করবে না।

```js
// সঠিক
button.onclick = sayThanks;

// ভুল
button.onclick = sayThanks();
```

যদি আমরা প্যারেন্টেসিস সহকারে লিখি, তাহলে `sayThanks()` একটি ফাংশন কল হবে। শেষেরটি *result*ঠিসেবে নতুন আরেকটি ফাংশন এক্সিকিউশন হিসেবে নেয়, যা `undefined`, এবং এটি  `onclick` অ্যাসাইন করে। তাই এটি কাজ করবে না।

...আবার অন্যদিকে, এলিমেন্ট হতে কল করলে প্যারেন্টেসিস সহকারে করতে হবে:

```html
<input type="button" id="button" onclick="sayThanks()">
```

এটি নিচের কোডটি দেখলে আমরা সহজেই বুঝতে পারব, ব্রাউজার অ্যাট্রিবিউট হতে কন্টেন্ট নিয়ে ফাংশনটিকে এভাবে কল করে:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- অ্যাট্রিবিউটের কন্টেন্ট এখানে সেট হয়
*/!*
};
```

**হ্যান্ডেলার সেট করতে `setAttribute` ব্যবহার করবেন না**

এটি কাজ করবে না:

```js run no-beautify
// বডিতে ক্লিক করলে <body> ইরোর দেখাবে,
// কেননা অ্যাট্রিবিউট সমূহ সর্বদা স্ট্রিং হিসেবে সেট হয়
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM-property এর ক্ষেত্রে কেস গুরুত্বপূর্ন**

হ্যান্ডেলার অ্যাসাইন করতে `elem.onclick` কাজ করবে, কিন্তু `elem.ONCLICK` কাজ করবে না, কেননা DOM প্রপার্টি সমূহ কেস-সেনসিটিভ।

## addEventListener

উপরোল্লিখিত নিয়ম অনুযায়ী হ্যান্ডেলার অ্যাসাইনের মূল সমস্যা হল -- আমরা একাধিক হ্যান্ডেলার অ্যাসাইন করতে পারব না।

যেমন ধরা যাক, আমরা বাটন ক্লিকে আমরা তা হাইলাইট করতে চায়, এবং তারপর ঐ ক্লিকে একটি মেসেজ দেখাব।

আমরা এজন্য দুটি হ্যান্ডেলার অ্যাসাইন করতে চাই। কিন্তু DOM প্রপার্টি বিদ্যমান হ্যান্ডেলারকে নতুনটি দ্বারা প্রতিস্থাপন করে দেয়:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // পূর্ববর্তী হ্যান্ডেলারকে নতুনটি দ্বারা প্রতিস্থাপন
```

এজন্য ডেভলাপাররা এই সমস্যা সমাধানের জন্য আরো দুটি বিশেষ মেথড নিয়ে আসে `addEventListener` এবং `removeEventListener`। এদের সাহায্যে আমরা এই সমস্যার সমাধান করতে পারি।

হ্যান্ডেলার অ্যাসাইনের সিনট্যাক্সটি হল:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: ইভেন্টের নাম, যেমন `"click"`।

`handler`
: হ্যান্ডেলার ফাংশন

`options`
: কিছু ঐচ্ছিক প্রপার্টির একটি অবজেক্ট:
    - `once`: যদি `true` হয়, তাহলে এটি একবার কল হওয়ার পর স্বয়ংক্রিয়ভাবে রিমুভ হয়ে যাবে।
    - `capture`: এই ব্যাপারে আমরা পরবর্তী অধ্যায়ে জানব <info:bubbling-and-capturing>। তবে জেনে রাখুন, `options` টি `false/true` হতে পারে, অর্থাৎ `{capture: false/true}`।
    - `passive`: যদি `true` হয়, তাহলে হ্যান্ডেলার `preventDefault()` কে কল করবে না, আরো বিস্তারিত জানব এই অধ্যায়ে <info:default-browser-action>।

হ্যান্ডেলার রিমুভের জন্য, `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
```

````warn header="রিমুভ করা যায় একই ফাংশনকে"
হ্যান্ডেলারকে ফাংশনকে রিমুভের জন্য অ্যাসাইকৃত ফাংশনটিই পাস করতে হবে।

এটি কাজ করবে না:

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

হ্যান্ডেলার রিমুভ কাজ করবে না, কেননা `removeEventListener` ফাংশনটি একই কোডের আরেকটি ফাংশন, কিন্তু এটি কোন ব্যাপার না, কেননা এটি ভিন্ন ফাংশন অবজেক্ট।

এটি কাজ করবে:

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

সুতরাং আমরা বলতে পারি -- কোন ধরণের অ্যানোনিমাস ফাংশনকে আমরা রিমুভ করতে পারব না।
````

`addEventListener` এর মাধ্যমে একাধিক হ্যান্ডেলার কল করার উপায়টি, এমন:

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

উপরের উদাহরণে আমরা দেখছি, আমরা  DOM-property এবং `addEventListener` এর মাধ্যমে হ্যান্ডেলার অ্যাসাইন করছি। তবে সাধারণত আমরা যেকোন এক উপায়ে হ্যান্ডেলার সেট করব।

````warn header="কিছু ইভেন্ট আছে শুধু `addEventListener` এর সাথে কাজ করে"
কিছু ইভেন্ট আছে যারা DOM-property এর সাথে কাজ করে না, শুধুমাত্র `addEventListener` এর মাধ্যমে কাজ করে।

যেমন, `DOMContentLoaded` ইভেন্ট, এটি ট্রিগার হয় যখন সম্পূর্ন DOM লোড হয়ে DOM অবজেক্টটি তৈরি হয়।

```js
// এটি রান হবে না
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// এটি কাজ করবে
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
```
সুতরাং `addEventListener` আরো বেশি সুবিধাজনক। এছাড়াও, এই ধরণের ইভেন্ট সমূহ কিছু ব্যতিক্রম।
````

## Event object

ইভেন্ট নিয়ে কাজ করার সময় আমাদের অনেক ব্যাপার জানা লাগে, এটি শুধু "ক্লিক" বা "কী প্রেসে" সীমাবদ্ধ না, আমাদের জানা লাগতে পারে কোন কী প্রেস করা হয়েছে বা কোন স্থানাংকে মাউস ক্লিক হয়েছে।

যখন কোন ইভেন্ট সংগঠিত হয়, ব্রাউজার *event object* তৈরি করে, এবং সকল বিস্তারিত প্রপার্টি নিয়ে *event object* টি হ্যান্ডেলারে পাস হয়।

এখানে কোন স্থানাংকে মাউস ক্লিক হয়েছে তার একটি উদাহরণ দেখানো হল:

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // মাউস ক্লিকে ইভেন্ট টাইপ, এলিমেন্ট এবং স্থানাংক দেখানো হয়
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

`event` অবজেক্ট এর কিছু প্রপার্টি:

`event.type`
: ইভেন্ট টাইপ, এখানে এটি `"click"`।

`event.currentTarget`
: যে এলিমেন্টে ইভেন্টটি সংগঠিত হয়। এটি এলিমেন্টের `this` এর মত, যতক্ষন হ্যান্ডেলারটি অ্যারো ফাংশনের সাহায্যে কল করা হয়, অন্যথায় `this` অন্য কোন কনট্যাক্স কে বুঝায়।

`event.clientX / event.clientY`
: windows এর সাপেক্ষে কার্সরের স্থানাংক।

এছাড়াও আরো অনেক প্রপার্টি আছে। বেশিরভাগ ইভেন্টের ধরণের উপর নির্ভর করে: কী-বোর্ড ইভেন্টের প্রপার্টি এক ধরণের, পয়েন্টার ইভেন্টের প্রপার্টি অন্য ধরণের, পরবর্তী অধ্যায় সমূহে আমরা ইভেন্টের ধরণ অনুযায়ী বিস্তারিত জানব।

````smart header="HTML অ্যাট্রিবিউট হ্যান্ডেলারেও ইভেন্ট অবজেক্ট অ্যাক্সেস করা যায়"
যদি আমরা HTML এ কোন হ্যান্ডেলার অ্যাসাইন করি, আমরা `event` অবজেক্টটি এভাবে ব্যবহার করতে পারি:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

এটি সম্ভব হয় কেননা যখন ব্রাউজার অ্যাট্রিবিউট হতে হ্যান্ডেলার ফাংশনটি এভাবে তৈরি করে:  `function(event) { alert(event.type) }`। সুতরাং প্রথম আর্গুমেন্টটি হয় `"event"`।
````


## Object handlers: handleEvent

আমরা চাইলে `addEventListener` এ কোন অবজেক্টকেও হ্যান্ডেলার হিসেবে পাস করতে পারি। যখন কোন ইভেন্ট সংগঠিত হয়, এটি `handleEvent` মেথডকে কল করে।

যেমন:


```html run
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

এক্ষেত্রে আমরা দেখছি, `addEventListener` হ্যান্ডেলার হিসেবে একটি অবজেক্ট নিচ্ছে, এবং এক্ষেত্রে এটি `obj.handleEvent(event)` কে কল করে।

আমরা চাইলে ES-6 class সিনট্যাক্স ব্যবহার করতে পারি:


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

এখানে একটি অবজেক্টকে আমরা উভয়ই ইভেন্টের হ্যান্ডেলার হিসেবে ব্যবহার করছি। দয়া করে নোট করুন `addEventListener` এর জন্য আমাদের অবজেক্টটিকে সঠিকভাবে সেটাপ করতে হবে। এক্ষেত্রে `menu` অবজেক্টটি শুধুমাত্র `mousedown` এবং `mouseup` এর সাথে কাজ করবে, অন্যান্য ইভেন্টের জন্য এটি কাজ করবে না।

আমরা `handleEvent` মেথডটিকে চাইলে এভাবে ডায়নামিক্যালি ব্যবহার করতে পারি:

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

এখানে আমরা হ্যান্ডেলার ফাংশনকে আলাদা করে নিলাম, কোডটি পড়তে এবং পরিবর্তন করা সহজ হবে।

## সারাংশ

তিনভাবে আমরা ইভেন্ট হ্যান্ডেলার অ্যাসাইন করতে পারি:

1. HTML attribute: `onclick="..."`।
2. DOM property: `elem.onclick = function`।
3. মেথডের সাহায্যে: `elem.addEventListener(event, handler[, phase])` হ্যান্ডেলার সংযুক্ত করতে, `removeEventListener` হ্যান্ডেলার রিমুভ করতে।

HTML attribute এর সাহায্যে ইভেন্ট খুব কম লিখা হয়, কেননা HTML এ জাভাস্ক্রিপ্ট দেখতে বিদঘুটে লাগে। এছাড়াও আমরা অনেক কোড একসাথে লিখতে পারি না।

আমরা DOM প্রপার্টির সাহায্যে হ্যান্ডেলার অ্যাসাইন করতে পারি, কিন্তু এর একটি সীমাবদ্ধতা আছে, আমরা শুধুমাত্র একটি হ্যান্ডেলার অ্যাসাইন করতে পারি।

এবং শেষেরটি ব্যবহার আমাদের জন্য সুবিধাজনক, তবে এটি অন্য দুটি থেকে দেখতে কিছুটা বড়। এছাড়াও কিছু ইভেন্ট আছে যা এটি ছাড়া অন্য কোনভাবে কাজ করবে না, যেমন `transitionend` এবং `DOMContentLoaded` (যা পরবর্তীতে আমরা দেখব)। এছাড়াও `addEventListener` হ্যান্ডেলার হিসেবে অবজেক্ট নিতে পারে। এক্ষেত্রে এটি ডায়নামিক্যালি `handleEvent` মেথড কে কল করে।

আপনি যেভাবেই হ্যান্ডেলার অ্যাসাইন করুন না কেন -- প্রথম আর্গুমেন্টটি সর্বদা একটি *event object* হয়। যা ইভেন্ট সম্পর্কিত সকল তথ্য ধারণ করে।

এছাড়াও আমরা নির্দিষ্ট ইভেন্ট সম্পর্কিত বিস্তারিত পরবর্তী অধ্যায় সমূহে জানব।

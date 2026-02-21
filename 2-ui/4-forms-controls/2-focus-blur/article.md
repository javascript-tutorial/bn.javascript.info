# ফোকাসিং: focus/blur

কোন এলিমেন্টে ক্লিক বা কি বোর্ডের `key:Tab` প্রেসের মাধ্যমে নেভিগেশনের সময় ফোকাস ইভেন্ট সংগঠিত হয়। এছাড়াও HTML এ `autofocus` নামের একটি অ্যাট্রিবিউট আছে যা পেজ লোড হওয়ার সময় এলিমেন্টকে ফোকাস করে।

কোন এলিমেন্টে ফোকাস বলতে বুঝায়: "এটির মধ্যে ডাটা যোগ করা সম্ভব", সুতরাং এর দ্বারা বোঝায় এলিমেন্টটিতে ডাটা নেয়ার জন্য প্রস্তুত।

যখন কোন এলিমেন্ট ফোকাস হারায় তখন তাকে বলে ("blur") এবং এটি সম্পর্কেও জেনে রাখা গুরুত্বপূর্ন। যখন ইউজার অন্য কোথাও ক্লিক করে অথবা `key:Tab` প্রেস করে তখন এটি সংগঠিত হয়।

ফোকাস হারানো দ্বারা বুঝায়: "ডাটা সংযুক্ত করা হয়েছে", সুতরাং আমরা কোডের মাধ্যমে ডাটা যাচাই বাছাই করে তা সার্ভারে পাঠাতে পারি।

ফোকাস ইভেন্ট নিয়ে কাজ করার সময় আমরা কিছুটা ব্যতিক্রম ব্যপার দেখব। তবে এই অধ্যায়ে আমরা এই নিয়ে বিস্তারিত আলোচনা করব।

## ইভেন্টস focus/blur

যখন কোন এলিমেন্টকে ফোকাস করা হয় তখন `focus` ইভেন্ট সংগঠিত হয়, এবং যখন এলিমেন্ট ফোকাস হারায় তখন `blur` ইভেন্ট সংগঠিত হয়।

চলুন ভ্যালিডেশনের জন্য এদের ব্যবহার করি।

নিচের উদাহরণে:

- `blur` হ্যান্ডেলার চেক করবে ইনপুট কি ইমেইল? যদি না হয় তাহলে এরর দেখাবে।
- আবার অই ফিল্ডে ফোকাস হলে `focus` হ্যান্ডেলার এরর মেসেজ হাইড করবে (এবং যদি ফোকাস হারায় আবারো `blur` হ্যান্ডেলার কল হবে):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // ইমেইল যাচাই
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // "error" হাইড হবে, কেননা ইউজার কোন কিছু পুনরায় লিখতে চাচ্ছে
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

তবে মডার্ন জাভাস্ক্রিপ্টে ভ্যালিডেশন চেকের জন্য অনেক ধরণের ইনপুট অ্যাট্রিবিউট আছে: `required`, `pattern` ইত্যাদি। এবং অনেক সময় এদের সাহায্যেই আমাদের কাজ হয়ে যায়। যখন আমাদের আরো বেশি ফ্লেক্সিবিটি দরকার পড়ে তখন জাভাস্ক্রিপ্ট ব্যবহার করি। এবং আমরা চাইলে স্বয়ংক্রিয়ভাবে ভ্যালু সার্ভারেও পাঠাতে পারি।


## মেথডস focus/blur

`elem.focus()` এবং `elem.blur()` এলিমেন্টে ফোকাস সেট/আনসেট এর জন্য ব্যবহার করি।

উদাহরণস্বরূপ, চলুন এমন একটি ফাংশন করি যা কোন এলিমেন্টে ইনভ্যালিড ইনপু্টের জন্য ঐ এলিমেন্টের ফোকাস হারাবে না:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // ইমেইল যাচাই
      // এরর দেখাবে
      this.classList.add("error");
*!*
      // ...এরর এর জন্য পুনরায় ঐ এলিমেন্টে ফোকাস
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

ফায়ারফক্স ব্যতীত অন্য সকল ব্রাউজারে এটি কাজ করে ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579))।

যদি আমরা অন্য কোন এলিমেন্টে ফোকাস করতে চায় `key:Tab` বা ক্লিকের মাধ্যমে `<input>`, তাহলে `onblur` হ্যান্ডেলার পুনরায় ঐ এলিমেন্টে ফোকাস করে।

দয়া করে নোট করুন `onblur` এ `event.preventDefault()` কলের মাধ্যমে আমরা ঐ ইভেন্টকে বাধাপ্রাপ্ত করতে পারব না, কেননা `onblur` কল হয় কোন এলিমেন্ট ফোকাস হারানোর পর।

```warn header="JavaScript-initiated focus loss"
কোন এলিমেন্ট বিভিন্ন কারণে ফোকাস হারাতে পারে।

সবচেয়ে প্রচলিত ব্যপারটি হল যদি ভিজিটর এলিমেন্ট ব্যাতীত অন্য কোথাও ক্লিক করে। তবে জাভাস্ক্রিপ্টের কিছু কন্ট্রোলের জন্যও হতে পারে, যেমন:

- যখন `alert` কল হয় তখন ফোকাস অ্যালার্টে সংগঠিত হয়। সুতরাং তখন ঐ এলিমেন্টে (`blur` event) কল হয়, এবং আবার যখন `alert` ডিসমিস করা হয় তখন আবার ফোকাস ঐ এলিমেন্টে দেখায় এবং (`focus` ইভেন্ট সংগঠিত হয়)।
- DOM হতে কোন এলিমেন্ট রিমুভড হলে ফোকাস লস হয়। যদি পুনরায় এটি প্রদর্শিত হয়, তখন ফোকাস ঐ এলিমেন্টে দেখায় না।

এই সব বৈশিষ্টের কারণে অনেক সময় `focus/blur` হ্যান্ডেলার সমূহ সঠিকভাবে কাজ করে না।

সুতরাং এই ইভেন্ট গুলো ব্যবহারের সময় আমাদের সর্বোচ্চ সতর্ক থাকতে হবে।
```
## যেকোন এলিমেন্টকে ফোকাসেবল করা: tabindex

ডিফল্টভাবে অনেক এলিমেন্টে ফোকাস ফিচার কাজ করে না।

ব্রাউজারভেদে এরা বিভিন্ন এলিমেন্ট হতে পারে, তবে সব ব্রাউজার `<button>`, `<input>`, `<select>`, `<a>` এই এলিমেন্ট সমূহের সাথে  `focus/blur` সাপোর্ট করে।

কিছু এলিমেন্ট আছে যেমন `<div>`, `<span>`, `<table>` ইত্যাদিতে ডিফল্টভাবে ফোকাস ফিচার কাজ করে না। `elem.focus()` মেথড এখানে কাজ করেনা তাই `focus/blur` ইভেন্টসমূহও ট্রিগার হবে না।

HTML-attribute `tabindex` এর সাহায্যে আমরা এটি পরিবর্তন করতে পারি।

কোন এলিমেন্টে `tabindex` থাকলে তা ফোকাসেবল হিসেবে কাজ করবে। `tabindex` এর ভ্যালু অনুযায়ী `key:Tab` প্রেসে এলিমেন্ট সমূহে ফোকাস নেভিগেশন হয়।

মনে করুন আমাদের দুটি এলিমেন্ট আছে, প্রথমটির মান `tabindex="1"`, এবং দ্বিতীয়টির `tabindex="2"`, তাহলে প্রথম এলিমেন্টে `key:Tab` প্রেসে ফোকাস দ্বিতীয় এলিমেন্টে মুভ হয়।

ফোকাসের ক্রম এভাবে পরিবর্তন হয়: `tabindex` এলিমেন্ট সমূহ উর্দ্ধক্রম অনুযায়ী ফোকাস পরিবর্তন করে, এবং তারপর `tabindex` ছাড়া এলিমেন্টসমূহ সাধারণভাবেই কাজ করে।

`tabindex` সহ এলিমেন্টস সমূহে উর্দ্ধক্রম অনুসারেই ফোকাস নেভিগেশন হবে।

তবে এটির দুটি বিশেষ মান আছে:

- `tabindex="0"` ফোকাস `tabindex` এর উর্দ্ধক্রম অনুযায়ী নেভিগেশন হয়। তবে `tabindex=0` সবার শেষে ফোকাস হয়।
- `tabindex="-1"` যা শুধুমাত্র স্ক্রিপ্টের মাধ্যমে ফোকাসের জন্য কাজ করবে। `key:Tab` এর জন্য ফোকাস কাজ করবে না, কিন্তু `elem.focus()` মেথড কাজ করবে।

উদাহরণস্বরূপ, নিচের লিস্টে প্রথমে ক্লিক করন তারপর `key:Tab` এর সাহায্যে নেভিগেশন করুন:

```html autorun no-beautify
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

নেভিগেশন ক্রমটি হবে: `1 - 2 - 0`। সাধারণত, `<li>` ফোকাস সাপোর্ট করে না, কিন্তু `tabindex` এর জন্য এটি এখন ফোকাসেবল এর ফলে আমরা ইভেন্ট সমূহ ও ফোকাস স্ট্যাইল `:focus` নিয়েও কাজ করতে পারি।

```smart header="`elem.tabIndex` এটিও কাজ করবে"
আমরা জাভাস্ক্রিপ্টের সাহায্যেও `tabindex` প্রপার্টিটি কোন এলিমেন্টে `elem.tabIndex` এভাবে সেট করতে পারি।
```

## ডেলিগেশন: focusin/focusout

`focus` এবং `blur` ইভেন্ট bubbling সাপোর্ট করে না।

যেমন, আমরা `<form>` এলিমেন্ট হতে `onfocus` এর জন্য এলিমেন্ট কে এভাবে হাইলাইট করতে পারব না:

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

এটি কাজ করবে না, কেননা যখন আমরা কোন `<input>` ফোকাস করি, তখন `focus` ইভেন্টটি শুধুমাত্র ঐ ইনপুটে ট্রিগার হয়। এটি bubble হয় না। সুতরাং `form.onfocus` কখনো ট্রিগার হবে না।

এটি আমরা দুভাবে সমাধান করতে পারি।

তবে এদের একটি মজার ফিচার আছে: `focus/blur` যদিও bubbling সাপোর্ট করে না, তবে capturing phase সাপোর্ট করে যার ফলে ইভেন্ট নিচের দিকে যায়

এটি কাজ করবে:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // put the handler on capturing phase (last argument true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

দ্বিতীয়টি হল, `focus/blur` এর পরিবর্তে `focusin` এবং `focusout` ইভেন্টস, এরা bubbling সাপোর্ট করে।

তবে এদের অবশ্যই `elem.addEventListener` এর মাধ্যমে অ্যাসাইন করতে হবে, `on<event>` কাজ করবে না।

সুতরাং আমরা এটি এভাবেও করতে পারি:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## সারাংশ

কোন এলিমেন্ট ফোকাস হলে বা ফোকাস হারালে `focus` এবং `blur` ইভেন্ট  ট্রিগার হয়।

কিছু বিশেষ বৈশিষ্ট্য:
- `focus/blur` bubbling সাপোর্ট করে না।এর পরিবর্তে আমরা `focusin/focusout` ব্যবহার করতে পারি।
- বেশিরভাগ এলিমেন্ট ডিফল্টভাবে ফোকাস সাপোর্ট করে না। কোন এলিমেন্টকে ফোকাসেবল করার জন্য আমরা `tabindex` ব্যবহার করি।

কারেন্ট ফোকাস এলিমেন্ট অ্যাক্সেস করতে পারি `document.activeElement` এর মাধ্যমে।

# ইন্টারেকশন: alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
টিউটোরিয়ালের এই পর্যায়ে আমরা কোনো বিশেষ পরিবেশ সমন্বয় ছাড়া জাভাস্ক্রিপ্ট দেখবো।

কিন্তু আমরা এখনো ব্রাউজার ব্যবহার করবো আমাদের ডেমো পরিবেশ হিসেবে, এখন আমাদের জানা উচিত এর কিছু ব্যবহারকারী ইন্টারফেস ফাংশন সম্পর্কে। এই চ্যাপ্টারে আমরা পরিচিত হবো ব্রাউজার ফাংশন `alert`, `prompt` এবং `confirm` এর সাথে।

## alert

গঠন:

```js
alert(message);
```

এটি একটি বার্তা প্রদর্শন করে বাকি স্ক্রিপ্ট আটকে রাখে ব্যবহারকারী OK প্রেস করার আগ পর্যন্ত।
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to press "OK".
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d:1-js/02-first-steps/06-alert-prompt-confirm/article.md

যেমন:

```js run
alert("হ্যালো");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
বার্তা সহ ছোট উইন্ডোকে *মডাল উইন্ডো* বলে। মডাল মানে হলো, ব্যবহারকারী যতক্ষণ না এই উইন্ডো এর কাজ না করছেন ততক্ষন বাকি পেজ এর কোনো কাজ করতে পারবেন না, অন্য কোনো বাটন চাপতে পারবেন না ইত্যাদি। এইক্ষেত্রে, --যতক্ষণ না তিনি OK চাপছেন।
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

এই `prompt` ফাংশন দুটি আর্গুমেন্ট নেয়।

```js no-beautify
result = prompt(title, [default]);
```

এটি একটি মডাল উইন্ডো, যা একটি বার্তা, একটি ইনপুট ফিল্ড এবং OK/Cancel বাটন দেখায়।

`title`
: যে বার্তা ব্যবহারকারীকে দেখাতে চান। 

`default`
: এটি একটি ঐচ্ছিক প্যারামিটার, এর প্রাথমিক মান ইনপুট ফিল্ড হতে প্রাপ্ত মান।

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
ব্যবহারকারী চাইলে ইনপুট ফিল্ডে কিছু টাইপ করে OK চাপতে পারে। অথবা চাইলে ইনপুট টি বাতিল করতে পারে Cancel চেপে অথবা `key:Esc` চেপে। 
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter is optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d:1-js/02-first-steps/06-alert-prompt-confirm/article.md

`prompt` ফাংশন ইনপুট ফিল্ড এর লেখা রিটার্ন করে অথবা `null` রিটার্ন করে যদি ইনপুট বাতিল করা হয়।

যেমন:

```js run
let age = prompt('তোমার বয়স কত?', 100);

alert(`তোমার বয়স ${age} বছর!`); // তোমার বয়স ১০০ বছর!
```

````warn header="ইন্টারনেট এক্সপ্লোরার এ সব সময় `default` দিয়ে দিন"
দ্বিতীয় প্যারামিটারটি ঐচ্ছিক কিন্তু যদি আমরা এটি না দেই তাহলে ইন্টারনেট এক্সপ্লোরার লেখাটিকে প্রম্পটের মধ্যে `"undefined"` সেট করে দিবে।

এই কোডটা ইন্টারনেট এক্সপ্লোরারে রান করে দেখুন:

```js run
let test = prompt("পরীক্ষা");
```

তাই, প্রমপ্টকে ইন্টারনেট এক্সপ্লোরারে সুন্দর দেখানোর জন্য আমরা সুপারিশ করছি সবসময় দ্বিতীয় আর্গুমেন্টটি দেয়ার জন্য। 

```js run
let test = prompt("পরীক্ষা", ''); // <-- ইন্টারনেট এক্সপ্লোরারের জন্য। 
```

## confirm

গঠন:

```js
result = confirm(question);
```

`confirm` ফাংশন একটি মডাল, একটি দেখায় যেখানে একটি `question` এবং দুইটি OK ও Cancel বাটন আছে।

যদি Ok চাপা হয় তাহলে ফলাফল `true`, অন্যথায় `false` হয়ে থাকে।

যেমন:

```js run
let isBoss = confirm("আপনি কি বস?");

alert( isBoss ); // true যদি Ok চেপে থাকেন। 
```

## সারমর্ম

আমরা আজকে ব্যবহারকারীদের সাথে মতবিনিময় করার জন্য ব্রাউজার-নির্দিষ্ট তিনটি ফাংশন সম্পর্কে জানলাম।

`alert`
: একটি বার্তা দেখায়। 

`prompt`
: একটি বার্তা দেখায় যাতে ব্যবহারকারী কিছু `input`দিতে পারে। এটি `input` টিকে স্ট্রিং হিসেবে রিটার্ন করে অথবা `Cancel` বা `key:Esc` চাপ দিলে `null` রিটার্ন করে।

`confirm`
: একটি বার্তা দেখায় এবং ব্যবহারকারীর নির্দেশের অপেক্ষা করে। যদি Ok চাপা হয় তাহলে `true` রিটার্ন করে। আর Cancel/`key:Esc` চাপলে `false` রিটার্ন করে।

এই সব পদ্ধতি-ই মডাল। তারা স্ক্রিপ্ট চালানো বন্ধ রাখে এবং ব্যবহারকারীকে অন্যকিছু করতে দেয় না, যতক্ষণ না এই মডাল বাতিল করা না হচ্ছে।

উপরে উল্লিখিত পদ্ধতি গুলোতে দুইটি সীমাবদ্ধতা আছে:

১. মডাল উইন্ডো প্রদর্শন এর স্থান নির্দেশিত হয় ব্রাউজার দ্বারা। সাধারণত এটি মাঝখানে হয়।
২. মডাল এর ডিজাইনও ব্রাউজারের উপর নির্ভর করে।  আমরা চাইলে এটি বদলাতে পারি না। 

ব্যবহারকারীর সাথে মতবিনিময় করার এটিই সবচেয়ে সহজ উপায় তাই কিছুতো ছাড় দিতেই হবে। তবে যদি খুব বেশি সমস্যা না থাকে আপনি এগুলো ব্যবহার করতে পারেন। অবশ্য আরো অনেক পদ্ধতি আছে আরো সুন্দর ও সমৃদ্ধ উইন্ডো তৈরী করে ব্যবহারকারীর সাথে মতবিনিময় করার।

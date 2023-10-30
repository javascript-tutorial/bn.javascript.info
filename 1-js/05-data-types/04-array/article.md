# অ্যারে

আমরা দেখেছি অবজেক্ট এর কালেকশনসমূহ কী এবং ভ্যালু হিসেবে থাকে।

কিন্তু প্রায় সময় আমাদের *ordered collection* এরও দরকার হয়, যেখানে এলিমেন্টসমূহ ক্রম অনুযায়ী ১ম, ২য়, ৩য় এভাবে থাকবে। উদাহরণস্বরূপ users, goods, HTML elements ইত্যাদির লিস্ট।

এক্ষেত্রে অবজেক্ট ব্যবহার করা তেমন সুবিধাজনক না, কেননা অবজেক্ট ক্রম নিয়ন্ত্রণের কোন মেথড প্রদান করে না। এভং আমরা দুটি এলিমেন্টের মাঝে নতুন কোন উপাদান সংযুক্ত করতে পারব না।

তবে জাভাস্ক্রিপ্টে এই ধরণের ক্রম কালেকশন নিয়ন্ত্রণের জন্য আরেকটি বিশেষ ডাটা স্ট্রাকচার আছে যার নাম `Array`।

## অ্যারে ডিক্লেয়ার

আমরা দুইভাবে অ্যারে ডিক্লেয়ার করতে পারি:

```js
let arr = new Array();
let arr = [];
```

বেশিরভাগ সময় আমরা দ্বিতীয় সিন্ট্যাক্সটি ব্যবহার করি। আমরা শুরুতে এলিমেন্ট সমূহও অ্যাসাইন করে দিতে পারি:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

অ্যারের এলিমেন্ট সমূহ ক্রম নাম্বার অনুসারে থাকে, এবং এটি শুন্য থেকে শুরু হয়, এদের বলা হয় *index*।

আমরা তৃতীয় বন্ধনীতে *index* নাম্বার লিখার মাধ্যমে এলিমেন্ট সমূহ অ্যাক্সেস করতে পারি:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

আমরা কোন একটি এলিমেন্টের মান পরিবর্তনও করতে পারি:

```js
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
```

...অথবা নতুন একটি এলিমেন্ট সংযুক্ত করতে পারি:

```js
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
```

কোন অ্যারেতে সর্বমোট কতটি এলিমেন্ট আছে তা অ্যারের `length` প্রপার্টির মাধ্যমে জানতে পারি:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

এছাড়াও `alert` এর মাধ্যমে সম্পূর্ণ অ্যারেটি দেখতে পারি।

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

অ্যারেতে যেকোন টাইপের এলিমেন্ট রাখতে পারি।

উদাহরণস্বরূপ:

```js run no-beautify
// বিভিন্ন টাইপের এলিমেন্ট
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// অ্যারের দ্বিতীয় এলিমেন্টটি একটি অবজেক্ট যার একটি প্রপার্টি name
alert( arr[1].name ); // John

// index 3 একটি ফাংশন চলুন আমরা এটিকে এভাবে এক্সিকিউট করতে পারি
arr[3](); // hello
```


````smart header="Trailing comma"
অ্যারে অবজেক্টের মত, যার শেষে কমা থাকতে পারে, এটিকে বলা হয় "trailing comma" রুলস বা স্ট্যাইল:
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

"trailing comma" স্ট্যাইল এর জন্য কোন আইটেম সংযোগ বা বাদ দেয়া সহজ হয়।
````

## Get last elements with "at"

[recent browser="new"]

Let's say we want the last element of the array.

Some programming languages allow the use of negative indexes for the same purpose, like `fruits[-1]`.

Although, in JavaScript it won't work. The result will be `undefined`, because the index in square brackets is treated literally.

We can explicitly calculate the last element index and then access it: `fruits[fruits.length - 1]`.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[fruits.length-1] ); // Plum
```

A bit cumbersome, isn't it? We need to write the variable name twice.

Luckily, there's a shorter syntax: `fruits.at(-1)`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum
```

In other words, `arr.at(i)`:
- is exactly the same as `arr[i]`, if `i >= 0`.
- for negative values of `i`, it steps back from the end of the array.

## pop/push, shift/unshift মেথডস

কিউ হল অ্যারের সবচেয়ে বেশি ব্যবহৃত একটি ডাটা স্ট্রাকচার [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))। কম্পিউটার সায়েন্সে, এটি দ্বারা বুঝায় কোন ক্রম এলিমেন্টে এর দুটি অপারেশন আছে:

- `push` কালেকশনে সবার শেষে একটি এলিমেন্ট যোগ করা।
- `shift` কালেকশনের প্রথম এলিমেন্টটি রিটার্ন করবে, সুতরাং দ্বিতীয় এলিমেন্টটি প্রথম এলিমেন্ট হিসেবে বিবেচিত হবে।

![](queue.svg)

অ্যারে উভয়ই অপারেশন সাপোর্ট করে।

এটি আমরা প্রায়ই ব্যবহার করি। উদাহরণস্বরপ, স্ক্রীনে কোন মেসেজ কিউ হিসেবে দেখাতে।

আরো একটি ডাটা স্ট্রাকচার আছে [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) এটিও অ্যারের সাহায্যে ইমপ্লিমেন্ট করা যায়।

এরও দুটি অপারেশন আছে:

- `push` সবার শেষে একটি এলিমেন্ট সংযুক্ত করে।
- `pop` সবার শেষ হতে একটি এলিমেন্ট গ্রহন করে।

সুতরাং এটি অ্যারের সর্বশেষে একটি এলিমেন্ট সংযুক্ত বা গ্রহন করে।

স্ট্যাককে আপনে কার্ডের প্যাকেটের সাথে তুলনা করতে পারেন: নতুন কার্ড সবার উপরে থাকবে অথবা কোন একটি কার্ড নেয়া লাগলে সবার উপর হতে নেয়া লাগবে:

![](stack.svg)

স্ট্যাক LIFO (Last-In-First-Out) প্রিন্সিপাল অনুসারে কাজ করে, অন্যদিকে কিউ  FIFO (First-In-First-Out) অনুসারে কাজ করে।

<<<<<<< HEAD
জাভাস্ক্রিপ্টে অ্যারের সাহায্যে স্ট্যাক বা কিউ উভয়ই ইমপ্লিমেন্ট করা যায়। কেননা অ্যারেতে সবার শেষে বা শুরুতে কোন আইটেম সংযুক্ত বা বাদ করা যায়।

কম্পিউটার সায়েন্সে এই ধরণের ডাটা স্ট্রাকচার সমূহকে বলা হয় [deque](https://en.wikipedia.org/wiki/Double-ended_queue)ওঁ।
=======
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

In computer science, the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

**অ্যারের শেষ এলিমেন্ট নিয়ে কাজ করে মেথডদুটি হল:**

`pop`
: অ্যারের শেষ এলিমেন্টটি রিমুভড করে এবং এলিমেন্টটি রিটার্ন করে:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // অ্যারে হতে "Pear" রিমুভড হবে এবং "Pear" রিটার্ন করবে

    alert( fruits ); // Apple, Orange
    ```

    Both `fruits.pop()` and `fruits.at(-1)` return the last element of the array, but `fruits.pop()` also modifies the array by removing it.

`push`
: অ্যারেতে সবার শেষে নতুন একটি এলিমেন্ট যোগ করবে:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    `fruits.push(...)` এর পরিবর্তে `fruits[fruits.length] = ...` এভাবেও এলিমেন্ট যোগ করতে পারি।

**অ্যারের শুরুর এলিমেন্ট নিয়ে কাজ করে মেথডদুটি হল:**

`shift`
: অ্যারের প্রথম এলিমেন্টটি রিমুভড করে এবং এলিমেন্টটি রিটার্ন করে:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // অ্যারে হতে "Apple" রিমুভড হবে এবং "Apple" রিটার্ন করবে

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: অ্যারেতে সবার শুরুতে নতুন একটি এলিমেন্ট যোগ করবে:

    ```js run
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

`push` এবং `unshift` এর সাহায্যে একবারে একাধিক এলিমেন্ট যোগ করতে পারি:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## ইন্টারনাল

অ্যারে হল একটি বিশেষ ধরণের অবজেক্ট। সাধারণত অ্যারের কোন প্রপার্টি আমরা এভাবে অ্যাক্সেস করি  `arr[0]`, আসলে এটি অবজেক্ট অ্যাক্সেসের একটি সিনট্যাক্স `obj[key]` এর মত। এখানে `arr` হল একটি অবজেক্ট আর *index* হল তার `key`.

এটি অবজেক্ট কে এক্সট্যান্ড করে বিভিন্ন বিশেষ মেথড ডিক্লেয়ার করে এবং সাথে `length` প্রপার্টিও।

মনে রাখুন, জাভাস্ক্রিপ্টে শুধুমাত্র বেসিক আটটি ডাটা টাইপ আছে (আরো বিস্তারিত এখানে দেখুন [Data types](info:types))। যেহেতু অ্যারে একটি অবজেক্ট সুতরাং এরা অবজেক্টের মত আচরণ করে।

উদাহরণস্বরূপ, অ্যারে কপি হয় রেফারেন্স অনুসারে:

```js run
let fruits = ["Banana"]

let arr = fruits; // copy by reference (এখানে দুটি ভ্যারিয়েবলই একই রেফারেন্স নির্দেশ করে)

alert( arr === fruits ); // true

arr.push("Pear"); // modify the array by reference

alert( fruits ); // Banana, Pear - 2 items now
```

<<<<<<< HEAD
...তবে ইন্টারনাল রিফ্রেশেন্টেশন অ্যারেকে বিশেষ সুবিধা দেয়। জাভাস্ক্রিপ্ট ইঞ্জিন এলিমেন্ট সমূহকে মেমোরিতে পাশাপাশি ক্রম অনুসারে সংরক্ষণ করে, যার ফলে এদের মধ্যে বিভিন্ন অপারেশন অপ্টিমাইজ করে চালানো যায়, এবং এরা দ্রুত কাজ করে।
=======
...But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another, just as depicted on the illustrations in this chapter, and there are other optimizations as well, to make arrays work really fast.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

তবে যদি আমরা কোন একটি অ্যারের "ordered collection" কে নষ্ট করে ফেলি, এবং এদের সাধারণ অবজেক্ট হিসেবে ডিক্লেয়ার করি তাহলে অ্যারের সুবিধাগুলো থেকে আমরা বঞ্চিত হব।

উদাহরণস্বরূপ, এটি করা সম্ভব:

```js
let fruits = []; // make an array

fruits[99999] = 5; // আমরা ইন্ডেক্স হিসেবে একটি প্রপার্টি সেট করেছি যার length অনেক বড়

fruits.age = 25; // এবং এখানে কী হিসেবে একটি স্ট্রিং সেট করেছি
```

এটি করা সম্ভব, কেননা অ্যারে হল একটি অবজেক্ট। সুতরাং আমরা চাইলে এভাবে প্রপার্টি সেট করতে পারি।

এক্ষেত্রে ইঞ্জিন দেখবে আমরা অ্যারেকে রেগুলার অবজেক্ট হিসেবে ব্যবহার করছি, যার ফলে অ্যারেটি আর অপ্টিমাইজ উপায়ে কাজ করবে না, তখন এটি সাধারণ অবজেক্টের মত কাজ করবে, এবং আমরা অ্যারের সুবিধা সমূহ আর পাব না।

নিম্নোক্ত কারনে অ্যারে অপ্টিমাইজ উপায়ে কাজ করবে না:

- প্রপার্টি হিসেবে সংখ্যা ব্যাতীত অন্য কিছু অ্যাসাইন করা `arr.test = 5`।
- যথাযথ ইনডেক্সিং না করা, যেমন: `arr[0]` এর পর `arr[1000]` (এখানে মাঝখানে আর কোন ইনডেক্স ব্যবহারকরা হয়নি)।
- অ্যারের ইন্ডেক্সিংকে কে অধঃক্রমে সাজালে, যেমন `arr[1000]`, `arr[999]` এভাবে।

আমাদের মনে রাখতে হবে জাভাস্ক্রিপ্টে অ্যারে একটি স্পেশাল স্ট্রাকচার যা আমাদের ডাটাকে উর্ধক্রমে সংরক্ষণ করতে দেয়। এবং এটি কিছু বিশেষ মেথড প্রদান করে। যেহুতু জাভাস্ক্রিপ্ট ইঞ্জিন অ্যারের ডাটাগুলো মেমোরিতে পাশাপাশি সংরক্ষণ করে সুতরাং এদের এভাবেই ব্যবহার করা উচিত, অন্যথায় আমরা বিশেষ সুবিধাসমূহ পাব না, যদি আমাদের কী ভ্যালু অনুযায়ী কালেকশন লাগে তাহলে আমরা রেগুলার অবজেক্ট `{}` ব্যবহার করব।

## পারফরম্যান্স

`push/pop` মেথড দুটি দ্রুত কাজ করে, অন্যদিকে `shift/unshift` এর পারফরম্যান্স ধীরগতির।

![](array-speed.svg)

কেন অ্যারের শুরুর দিকের এলিমেন্ট সমূহ নিয়ে চালানো অপারেশনসমূহের পারফরম্যান্স ধীরগতির? চলুন এক্সিকিউশন টাইমে কিভাবে কাজ করে তা দেখি:

```js
fruits.shift(); // take 1 element from the start
```

<<<<<<< HEAD
এটি শুধুমাত্র অ্যারের `0` নং ইনডেক্স প্রদান করে রিমুভ করে না পাশাপাশি অ্যারের বাকী এলিমেন্ট সমূহকে পুনরায় ইনডেক্সিং করে।
=======
It's not enough to take and remove the element with the index `0`. Other elements need to be renumbered as well.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

`shift` অপারেশনে ৩টি ব্যাপার ঘটে:

1. `0` নং ইনডেক্স এর এলিমেন্টটি রিমুভড করে।
2. বাকী এলিমেন্ট সমূহকে পুনরায় ইনডেক্সিং করে, ইনডেক্স `1`  হবে `0`, ইনডেক্স `2` হবে `1` এভাবে শেষ এলিমেন্টটি পর্যন্ত চলতে থাকে।
3. `length` প্রপার্টিটি আপডেট করে।

![](array-shift.svg)

**অসংখ্য এলিমেন্টের জন্য সম্পূর্ণ অ্যারেটি পুনরায় ইন্ডেক্সিং হয়, যার ফলে মেমোরিতে অসংখ্য অপারেশন চলে**

`unshift` এর ক্ষেত্রেও একই ব্যাপার ঘটে: অ্যারের শুরুর ইনডেক্স কে প্রতিস্থাপন করে, এবং বাকী এলিমেন্ট সমূহকে প্রতিটিকে ডানে এক ঘর করে সরায়।

`push/pop` এর ক্ষেত্রে কি ঘটে? এক্ষেত্রে এলিমেন্ট সমূহকে সরানো লাগেনা। `push` মেথডের জন্য অ্যারের `length` প্রপার্টির মান এক বাড়াবে এবং নতুন ইনডেক্স এ একটি এলিমেন্ট সংযুক্ত করবে। `pop` মেথডের জন্য অ্যারের শেষ এলিমেন্টটি নির্ণয় করে অ্যারে হতে ডিলিট করবে, এবং `length` প্রপার্টির মান এক কমাবে।

`pop` মেথডটি এভাবে কাজ করে:

```js
fruits.pop(); // শেষ হতে একটি এলিমেন্ট নেয়
```

![](array-pop.svg)

**`push/pop` মেথডের ক্ষেত্রে এলিমেন্ট সমূহের ইনডেক্স এ কোন পরিবর্তন হয় না, ফলে এই অপারেশন দুটি দ্রুতগতির**

## Loops

কোন একটি অ্যারের আইটেম সমূহকে `for` লুপে অ্যাক্সেস করার উপায় হল ইনডেক্স ব্যবহার করা:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

তবে আমরা আরো একটি উপায়ে ইটারেট করতে পারি, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
```

`for..of` এটি আমাদের কারেন্ট এলিমেন্ট এর ইনডেক্স রিটার্ন এর পরিবর্তে শুধুমাত্র ভ্যালু টা রিটার্ন করে, এবং বেশিরভাগ ক্ষেত্রে এটি দ্বারাই কাজ হয়ে যায়, এবং এটি শর্টহ্যান্ডও।

আবার, যেহেতু অ্যারে একটি অবজেক্ট, সুতরাং `for..in` এর সাহায্যেও আমরা একে ইটারেট করতে পারি:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

তবে এই উপায়টি খুব ভাল না, এটির কিছু সমস্যা হতে পারে:

1. The loop `for..in` iterates over *all properties*, not only the numeric ones.

    There are so-called "array-like" objects in the browser and in other environments, that *look like arrays*. That is, they have `length` and indexes properties, but they may also have other non-numeric properties and methods, which we usually don't need. The `for..in` loop will list them though. So if we need to work with array-like objects, then these "extra" properties can become a problem.

2. The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it's still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.

Generally, we shouldn't use `for..in` for arrays.


## "length" নিয়ে বিস্তারিত

যখন আমরা অ্যারেতে কোন পরিবর্তন করি তখন `length` প্রপার্টিটি পরিবর্তন হয়। তবে একটি ব্যাপার এটি আমাদের অ্যারের মোট এলিমেন্ট নির্দেশ করে না, তবে সবচেয়ে বড় ইনডেক্স এর সাথে ১ যোগ করে মানটি `length` প্রপার্টিটি সেট হয়।

উদাহরণস্বরূপ, কোন একটি খালি অ্যারেকে র‍্যান্ডম একটি সংখ্যা দ্বারা ইনডেক্স করলাম:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

তবে সাধারণত অ্যারেকে আমরা এভাবে ব্যবহার করিনা।

এছাড়াও আরো একটি মজার ব্যাপার হল আমরা `length` প্রপার্টিকে পরিবর্তন করতে পারব।

যদি আমরা `length` প্রপার্টির মান বৃদ্ধি করি তাহলে কিছু ঘটবে না, তবে যদি আমরা মানটি হ্রাস করি, তখন অ্যারেটি কেটে যাবে। এবং এটি অপরিবর্তনীয়, নিচের উদাহরণটি দেখুন:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // অ্যারের শুরুর দুটি উপাদান কেটে নিলাম
alert( arr ); // [1, 2]

arr.length = 5; // পুনরায় আপডেট করলাম
alert( arr[3] ); // পূর্বের ভ্যালু আর ফেরত পাব না
```

সুতরাং কোন অ্যারেকে ক্লিয়ার করার সহজ উপায় হল: `arr.length = 0;` সেট করা।


## new Array() [#new-array]

অ্যারে ডিক্লেয়ার করার আরো একটি উপায় আছে:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

<<<<<<< HEAD
এটির ব্যবহার কদাচিৎ, কেননা স্কয়ার ব্রাকেট সংক্ষিপ্ত `[]`। Also there's a tricky feature with it.
=======
It's rarely used, because square brackets `[]` are shorter. Also, there's a tricky feature with it.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

`new Array` একটি `number` টাইপ আর্গুমেন্ট নিতে পারে, যদি আমরা `number` প্রদান করি তাহলে অ্যারেটি এভাবে তৈরি হবে: *একটি নির্দিষ্ট length থাকবে তবে  কোন আইটেম থাকবে না*।

<<<<<<< HEAD
উদাহরণস্বরূপ:
=======
Let's see how one can shoot themselves in the foot:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2
```

<<<<<<< HEAD
উপরের কোডে, `new Array(number)` এর সকল ইনডেক্স এর মান `undefined` দেখাবে।

এই ধরণের সারপ্রাইজ এড়াতে আমরা স্কয়ার ব্রাকেট ব্যবহার করি।
=======
To avoid such surprises, we usually use square brackets, unless we really know what we're doing.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

## Multidimensional arrays

অ্যারের এলিমেন্টসমূহ অ্যারে হতে পারে, এদের বলা হয় মাল্টিডাইমেনশন অ্যারে।  মাল্টিডাইমেনশন অ্যারের সাহায্যে আমরা ম্যাট্রিক্স ডিক্লেয়ার করতে পারি:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 5, the central element
```

## toString

অ্যারের একটি নিজস্ব `toString` মেথড আছে যা অ্যারের ভ্যালু সমূহকে কমা-সেপারেটেড স্ট্রিং হিসেবে রিটার্ন করে।

উদাহরণস্বরূপ:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

এছাড়াও, এটি দেখুন:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

অ্যারেতে `Symbol.toPrimitive` বা `valueOf` মেথড নেয়, শুধুমাত্র `toString` মেথড আছে, যার ফলে `[]` হয়ে যায় এম্পটি স্ট্রিং, `[1]` হয় `"1"` এবং `[1,2]` হয় `"1,2"`।

যখন আমরা `"+"` এর সাহায্যে দুটি স্ট্রিং কনক্যাটেনাইট করি, এরা এভাবে কাজ করে:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## দুটি অ্যারের মধ্যে তুলনা ==

জাভাস্ক্রিপ্টে দুটি অ্যারের মধ্যে `==` এর সাহায্যে তুলনা করা যায় না।

অ্যারের জন্য এই অপারেটরটি আলাদা কোন বৈশিষ্ট্য প্রদান করে না, অন্যান্য অবজেক্টের মত এটিও  `==` এর সাহায্যে তুলনা করা যায় না।

চলুন পুনরায় অবজেক্ট তুলনার নিয়মগুলো দেখি:

<<<<<<< HEAD
- দুটি অবজেক্ট `==` সমান হবে যদি তারা একই অবজেক্ট কে রেফারেন্স করে।
- `==` এর সাহায্যে তুলনা করার সময় যদি একটি অবজেক্ট হয় এবং অন্যটি primitive হয়, তাহলে অবজেক্টটি primitive ভ্যালুতে পরিবর্তন হয়ে যায়, বিস্তারিত এই অধ্যায়ে <info:object-toprimitive>।
- ...তবে `null` এবং `undefined` এরা সমান হবে `==`।

strict comparison `===` আর সহজবোধ্য, এটি ডাটা টাইপও তুলনা করে।
=======
- Two objects are equal `==` only if they're references to the same object.
- If one of the arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter <info:object-toprimitive>.
- ...With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn't convert types.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

সুতরাং আমরা যদি দুটি অ্যারের তুলনা `==` করতে চায়, তাহলে তারা সমান হবে না, যদিনা অ্যারে দুটির রেফারেন্স একই হয়।

উদাহরণস্বরূপ:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

এখানে দুটি অ্যারেই আলাদা আলাদা দুটি অবজেক্ট, সুতরাং তারা একই হবে না। এবং `==` অপারেটর false রিটার্ন করবে।

তবে primitives তুলনার সময় অদ্ভুত ফলাফল পেতে পারি:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

<<<<<<< HEAD
এখানে উভয়ই ক্ষেত্রে আমরা একটি primitive ভ্যালু কে একটি অবজেক্টের সাথে তুলনা করছি। সুতরাং অবজেক্টটি `[]` primitive এ পরিবর্তন হয়ে একটি এম্পটি `''` স্ট্রিং এ রুপান্তর হবে।
=======
Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

এবং তুলনাটি দুটি primitive ভ্যালুতে করা হয়, বিস্তারিত এই অধ্যায়ে <info:type-conversions>:

```js run
// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```

তাহলে, আমরা দুটি অ্যারের তুলনা করব কিভাবে?

`==` অপারেটরের সাহায্যে তুলনা করব না। তার পরিবর্তে দুটি অ্যারের আইটেম সমূহকে লুপের সাহায্যে তুলনা করব অথবা ইটারেশনের সাহায্যে যা বিস্তারিত পরবর্তী অধ্যয়ে জানতে পারব।

## সারাংশ

অ্যারে হল একটি বিশেষ ধরণের অবজেক্ট, যার সাহায্যে আমরা ডাটা কে উর্ধক্রমে রাখতে পারি।

<<<<<<< HEAD
- অ্যারে ডিক্লেয়ার করার উপায়:
=======
The declaration:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js
// square brackets (usual)
let arr = [item1, item2...];

// new Array (exceptionally rare)
let arr = new Array(item1, item2...);
```

<<<<<<< HEAD
    `new Array(number)` এর আর্গুমেন্ট number পাস করলে তাহলে এটি অ্যারের length বুঝায়, তবে কোন এলিমেন্ট থাকবে না।
=======
The call to `new Array(number)` creates an array with the given length, but without elements.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- `length` প্রপার্টি দ্বারা অ্যারের দৈর্ঘ্য বুঝায়, নির্দিষ্ট করে বলতে গেলে শেষ ইনডেক্সে এর সাথে ১ যোগ। অ্যারের মেথড সমূহের জন্য এটি স্বয়ংক্রিয়ভাবে পরিবর্তন হয়।
- If we shorten `length` manually, the array is truncated.

<<<<<<< HEAD
আমরা অ্যারেকে deque হিসেবে ব্যবহার করতে পারব, এর জন্য নিম্নোক্ত মেথডসমূহ আছে:
=======
Getting the elements:

- we can get element by its index, like `arr[0]`
- also we can use `at(i)` method that allows negative indexes. For negative values of `i`, it steps back from the end of the array. If `i >= 0`, it works same as `arr[i]`.

We can use an array as a deque with the following operations:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- `push(...items)` কালেকশনে সবার শেষে একটি `items` যোগ করে।
- `pop()` সবার শেষ এলিমেন্টটি রিটার্ন করে এবং অ্যারে হতে এলিমেন্টটি বাদ দেয়।
- `shift()` কালেকশনের প্রথম এলিমেন্টটি রিটার্ন করবে এবং অ্যারে হতে এলিমেন্টটি বাদ দেয়।
- `unshift(...items)` কালেকশনের প্রথমে একটি `items` যোগ করে।

অ্যারের এলিমেন্ট সমূহকে অ্যাক্সেস করতে:
  - `for (let i=0; i<arr.length; i++)` -- দ্রুত কাজ করে, এবং পুরনো ব্রাউজার গুলো সাপোর্ট করে।
  - `for (let item of arr)` -- শুধুমাত্র আইটেমকে অ্যাক্সেস করতে।
  - `for (let i in arr)` -- অ্যারের জন্য এটি ব্যবহার করা উচিত নয়।

অ্যারেকে কম্পেয়ার করতে কম্পারিশন এবং লজিকাল অপারেটর গুলো ব্যবহার করা উচিত নয়, কেননা অ্যারে একটি অবজেক্ট, এবং অবজেক্ট কে আমরা এভাবে তলনা করতে পারি না।

তার পরিবর্তে আমরা `for..of` এর সাহায্যে প্রতিটি আইটেমকে তুলনা করতে পারি।

পরবর্তী অধ্যায়ে আমরা অ্যারের আরো বিভিন্ন মেথড সম্পর্কে জানতে পারব <info:array-methods>।

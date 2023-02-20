# অ্যারে মেথডস

অ্যারের বিল্ট-ইন আরো কিছু মেথড আছে, যার সাহায্যে আমরা সহজে অনেক অপারেশন চালাতে পারি।

## এলিমেন্ট সংযুক্ত করা বা বাদ দেয়া

পূর্বের অধ্যায়ে আমরা দেখেছি কিভাবে অ্যারের শুরুতে বা শেষে কোন এলিমেন্ট যুক্ত করতে বা বাদ দিতে পারি:

- `arr.push(...items)` -- অ্যারের শেষে এলিমেন্ট যুক্ত করতে,
- `arr.pop()` -- অ্যারের শেষে এলিমেন্টটি বাদ দিতে,
- `arr.shift()` -- অ্যারের শুরুর এলিমেন্টটি বাদ দিতে,
- `arr.unshift(...items)` -- অ্যারের শুরুতে এলিমেন্ট যুক্ত করতে.

এছাড়াও আরো কিছু মেথড আছে

### splice

অ্যারের কোন একটি এলিমেন্ট কিভাবে ডিলিট করা যায়?

যেহেতু অ্যারে একটি অবজেক্ট, সুতরাং এলিমেন্ট রিমুভ করতে `delete` ব্যবহার করতে পারি:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

যদিওবা আমরা এলিমেন্টটি রিমুভ করেছি তারপরও অ্যারেতে ৩টি এলিমেন্ট আছে, ইতোমধ্যে যা আমরা দেখেছি `arr.length == 3`।

এটি স্বাভাবিক, কেননা `delete obj.key` এর দ্বারা আমরা `key` এর মান রিমুভ করি। এবং এটি অবজেক্টের জন্য ঠিক আছে। কিন্তু অ্যারের জন্য আমাদের অ্যারেটিকে পুনরায় সাজাতে হবে।

এজন্য, আমরা একটি বিশেষ মেথডের সাহায্য নেব।

[arr.splice](mdn:js/Array/splice) মেথড যার সাহায্যে অ্যারেতে আমরা বিভিন্ন অপারেশন চালাতে পারি। যেমন: কোন এলিমেন্ট insert, remove বা replace।

সিনট্যাক্সটি হল:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

এখানে `start` দ্বারা বুঝায় কোন index হতে এলিমেন্ট ডিলিট হবে: এরপর `deleteCount` দ্বারা বুঝায় কতটি এলিমেন্ট ডিলিট হবে এরপর `elem1, ..., elemN` দ্বারা বুঝায় ঐ ইনডেক্সে নতুন এলিমেন্ট যুক্ত হবে। এবং মেথডটি রিমুভড হওয়া এলিমেন্টসমূহ রিটার্ন করে।

চলুন উদাহরণের সাহায্যে শিখি:

চলুন, প্রথমে এলিমেন্ট ডিলিট করা দেখি:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // ১ নং ইনডেক্স হতে ১ টি এলিমেন্ট ডিলিট
*/!*

alert( arr ); // ["I", "JavaScript"]
```

সহজ, তাই না? এখানে আমরা ১ নং ইনডেক্স হতে ১ টি এলিমেন্ট ডিলিট করেছি।

পরবর্তী উদাহরণে আমরা প্রথম ৩টি এলিমেন্ট ডিলিট করব, এবং ঐ ইনডেক্সে নতুন দুটি এলিমেন্ট সংযুক্ত করব:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// প্রথম ৩টি এলিমেন্ট বাদ যাবে এবং নতুন ২টি এলিমেন্ট ঐ ইনডেক্সে যুক্ত হবে
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // পরিবর্তিত অ্যারেটি [*!*"Let's", "dance"*/!*, "right", "now"]
```

এখন আমরা দেখি `splice` রিটার্ন হওয়া এলিমেন্ট রিটার্ন করে:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // ডিলিট হওয়া এলিমেন্ট "I", "study"
```

এছাড়াও `splice` এর সাহায্যে আমরা কোন এলিমেন্ট ডিলিট না করে নির্দিষ্ট ইনডেক্সে নতুন এলিমেন্ট সংযুক্ত করতে পারি এক্ষেত্রে আমরা `deleteCount` এর মান `0` সেট করব:

```js run
let arr = ["I", "study", "JavaScript"];

// 2 নং ইনডেক্স হতে
// 0 ডিলেট হবে এবং 
// "complex" এবং "language" যুক্ত হবে
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="নেগেটিভ ইনডেক্স"
অ্যারে মেথডসমূহে নেগেটিভ ইনডেক্স ব্যবহার করতে পারি। নেগেটিভ ইনডেক্স দ্বারা বুঝায় গণনা অ্যারের শেষ হতে শুরু হবে, যেমন:

```js run
let arr = [1, 2, 5];

// এখানে -1 দ্বারা বুঝাচ্ছে অ্যারের শেষ পজিশনের পরের পজিশন,
// এখানে কোন এলিমেন্ট ডিলেট হবে না,
// ২টি নতুন এলিমেন্ট `3, 4` যুক্ত হবে।
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

[arr.slice](mdn:js/Array/slice) মেথড অনেকটা `arr.splice` এর মত।

এর সিনট্যাক্স হল:

```js
arr.slice([start], [end])
```

এটি অ্যারের `start` হতে `end` ইনডেক্স পর্যন্ত এলিমেন্ট সমূহকে অ্যারে হিসেবে রিটার্ন করে। `start` এবং `end` এর ইনডেক্স মান নেগেটিভ হতে পারে, যা দ্বারা রিভার্স কাউন্ট করে।

এটি `str.slice` এর মত, তবে সাবস্ট্রিংয়ের পরিবর্তে এটি সাবঅ্যারে রিটার্ন করে।

যেমন:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
```

এছাড়াও আমরা কোন একটি অ্যারেকে কপি করতে `arr.slice()` মেথডটি কোন আর্গুমেন্ট ছাড়া কল করতে পারি। যার ফলে এটি একটি নতুন অ্যারে রিটার্ন করবে এবং আমরা একে পরিবর্তন করলে অরিজিনাল অ্যারেতে কোন পরিবর্তন হবে না।

### concat

দুই বা ততোধিক অ্যারে যোগ করার জন্য [arr.concat](mdn:js/Array/concat) মেথড ব্যবহার করা হয়।

এর সিনট্যাক্স হল:

```js
arr.concat(arg1, arg2...)
```

এটি এক বা একাধিক অ্যারে বা ভ্যালু আর্গুমেন্ট হিসবে নেই।

যার ফলে নতুন অ্যারের এলিমেন্টগুলো হবে `arr` এবং `arg1`, `arg2` ইত্যাদি সকল এলিমেন্টের সমষ্টি।

যদি একটি আর্গুমেন্ট `argN` একটি অ্যারে হয়, তবে সেই অ্যারের সকল এলিমেন্ট কপি হবে। অন্যথায়, আর্গুমেন্টটি নিজেই কপি হবে।

যেমন:

```js run
let arr = [1, 2];

// নতুন অ্যারেটি হবে দুটি অ্যারের সমষ্টি [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// নতুন অ্যারেটি হবে তিনটি অ্যারের সমষ্টি [3,4] এবং [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// নতুন অ্যারেটি হবে একটি অ্যারে [3,4], এবং দুটি ভ্যালু  5 এবং 6 এর সমষ্টি
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

সাধারণত, এটি শুধুমাত্র অ্যারে বা প্রিমিটিভ ভ্যালুগুলো কপি করে। যদি কোন অবজেক্টের আর্কিটেকচার অ্যারের মত হয় তাহলে এটি অবজেক্টটিকেই সংযুক্ত করে:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

...কিন্তু যদি অব্জেক্টটি দেখতে অ্যারের মত হয় এবং এর মধ্যে একটি বিশেষ প্রপার্টি `Symbol.isConcatSpreadable` থাকে, তাহলে `concat` এ এরা অ্যারের মত সংযুক্ত হবে:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Iterate: forEach

[arr.forEach](mdn:js/Array/forEach) মেথডটি আর্গুমেন্ট হিসেবে একটি কলব্যাক ফাংশন নেয়, এবং প্রতিটি এলিমেন্টের জন্য এটি কল হয়।

এর সিনট্যাক্স হল:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

যেমন, নিচের কোডটিতে প্রতিটি এলিমেন্ট এর জন্য একটি অ্যালার্ট কল হবে:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

এখানে আমরা এলিমেন্টের পজিশন নিয়ে আরো বিস্তারিত জানতে পারি:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

যদি ফাংশন কোন কিছু রিটার্ন করে তাহলে এটি তা অগ্রাহ্য করে।


## অ্যারেতে অনুসন্ধান

এখন আমরা অ্যারের বিভিন্ন সার্চ মেথড সম্পর্কে জানব।

### indexOf/lastIndexOf and includes

<<<<<<< HEAD
[arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) এবং [arr.includes](mdn:js/Array/includes) এদের সিনট্যাক্স এবং কাজ স্ট্রিং এর মেথডগুলোর মত, তবে এখানে আর্গুমেন্ট হিসেবে ক্যারাক্টারের পরিবর্তে এলিমেন্ট নেয়:

- `arr.indexOf(item, from)` -- অ্যারেতে `from` ইনডেক্স হতে একটি `item` অনুসন্ধান করে, যদি পাই তাহলে ইনডেক্সটি রিটার্ন করে, অন্যথায় `-1`।
- `arr.lastIndexOf(item, from)` -- একই তবে এটি রিভার্স হতে অনুসন্ধান চালায়।
- `arr.includes(item, from)` -- অ্যারেতে `from` ইনডেক্স হতে একটি `item` অনুসন্ধান করে, যদি পাই তাহলে `true`  রিটার্ন করে।

যেমন:
=======
The methods [arr.indexOf](mdn:js/Array/indexOf) and [arr.includes](mdn:js/Array/includes) have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:

- `arr.indexOf(item, from)` -- looks for `item` starting from index `from`, and returns the index where it was found, otherwise `-1`.
- `arr.includes(item, from)` -- looks for `item` starting from index `from`, returns `true` if found.

Usually these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.

For instance:
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

<<<<<<< HEAD
এরা কম্পারিশনের সময় `===` ব্যবহার করে। সুতরাং , যদি আমরা একটি স্ট্রিং `'0'` খুঁজি, তাহলে এটি এলিমেন্ট ডাটা টাইপ একই না হওয়ায় `-1` রিটার্ন করবে।

যদি অ্যারেতে কোন একটি এলিমেন্ট আছে কিনা নিশ্চিত হতে চায়, তাহলে `arr.includes` ব্যবহার করা শ্রেয়।

এছাড়াও `includes` এর একটি পার্থক্য আছে যা সঠিকভাবে `NaN` কে হ্যান্ডেল করে, যা `indexOf/lastIndexOf` পারে না:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (0 রিটার্ন করা উচিত, কিন্তু === NaN এর জন্য কাজ করে না)
=======
Please note that `indexOf` uses the strict equality `===` for comparison. So, if we look for `false`, it finds exactly `false` and not the zero.

If we want to check if `item` exists in the array, and don't need the index, then `arr.includes` is preferred.

The method [arr.lastIndexOf](mdn:js/Array/lastIndexOf) is the same as `indexOf`, but looks for from right to left.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
```

````smart header="The `includes` method handles `NaN` correctly"
A minor, but noteworthy feature of `includes` is that it correctly handles `NaN`, unlike `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f
alert( arr.includes(NaN) );// true (correct)
```
That's because `includes` was added to JavaScript much later and uses the more up to date comparison algorithm internally.
````

<<<<<<< HEAD
### find এবং findIndex
=======
### find and findIndex/findLastIndex
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

মনে করুন আমাদের অ্যারের এলিমেন্টগুলো অবজেক্ট। কিভাবে কোন একটি নির্দিষ্ট শর্তের জন্য আমরা অবজেক্ট খুঁজতে পারি?

এক্ষেত্রে [arr.find(fn)](mdn:js/Array/find) মেথড ব্যবহার করি।

এর সিনট্যাক্স হল:
```js
let result = arr.find(function(item, index, array) {
  // যদি শর্ত পূরন হয়, তাহলে এলিমেন্টটি রিটার্ন করবে এবং ইটারেশন বন্ধ হয়ে যাবে
  // falsy এর জন্য রিটার্ন হবে undefined
});
```

প্রতিটি এলিমেন্টের জন্য ফাংশনটি কল হবে :

- `item` এলিমেন্টটি।.
- `index` এলিমেন্টের ইনডেক্স
- `array` অ্যারেটি

যদি `true` রিটার্ন করে, তাহলে অনুসন্ধানটি বন্ধ হয়ে যাবে, এবং `item` টি রিটার্ন করবে। যদি কোন এলিমেন্ট না পাই, তাহলে `undefined` রিটার্ন করবে।

যেমন, আমাদের `users` এর একটি অ্যারে আছে, যার প্রপার্টিগুলো হল `id` এবং `name`। এখন চলুন আমরা একটি এলিমেন্ট খুঁজি যার `id` হল `1`, `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

বাস্তবিকক্ষেত্রে আমাদের প্রায় সময় অ্যারের অবজেক্ট নিয়ে কাজ করতে হয়, এক্ষেত্রে এই ধরণের অ্যারেতে অবজেক্ট অনুসন্ধানে `find` মেথডটি ব্যবহার করতে পারি।

নোট: বেশিরভাগক্ষেত্রে কলব্যাক ফাংশনটিতে আমরা শুধুমাত্র একটি আর্গুমেন্ট পাস করি `item => item.id == 1`। অন্যান্য আর্গুমেন্টগুলো তেমন ব্যবহার করিনা।

<<<<<<< HEAD
[arr.findIndex](mdn:js/Array/findIndex) মেথডটিও অনুরূপ, তবে এটি এলিমেন্টের পরিবর্তে এলিমেন্টের `index` রিটার্ন করে।
=======
The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax, but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.

The [arr.findLastIndex](mdn:js/Array/findLastIndex) method is like `findIndex`, but searches from right to left, similar to `lastIndexOf`.

Here's an example:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

### filter

`true` রিটার্নের জন্য `find` মেথডটি শুধুমাত্র একটি (প্রথম) এলিমেন্ট রিটার্ন করে।

অনেক সময় আমাদের কোন একটি শর্তের জন্য একাধিক এলিমেন্ট থাকতে পারে, এক্ষেত্রে আমরা ব্যবহার করি [arr.filter(fn)](mdn:js/Array/filter)।

এর সিনট্যাক্স হল `find` এর মত, তবে `filter` যেসকল এলিমেন্ট শর্ত পূরণ করে তাদের সকলকে রিটার্ন করে:

```js
let results = arr.filter(function(item, index, array) {
  // যদি শর্ত পূরন হয়, তাহলে এলিমেন্টটি results এ push করবে এবং ইটারেশন চালিয়ে যাবে
  // কোন এলিমেন্ট না পেলে এম্পটি অ্যারে রিটার্ন করবে
});
```

উদাহরনস্বরূপ:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// প্রথম দুইটি এলিমেন্টকে রিটার্ন করবে
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## অ্যারের রূপান্তর

চলুন অ্যারে রূপান্তর করার মেথডগুলো দেখি।

### map

[arr.map](mdn:js/Array/map) মেথডটি আমাদের প্রায় দরকার হয় এবং প্রায় ব্যবহার করে থাকি।

এটি অ্যারের প্রতিটি এলিমেন্টের জন্য কলব্যাক ফাংশনটি কল করবে এবং প্রতিটি এলিমেন্ট `results` এ `push` করবে।

এর সিনট্যাক্স হল:

```js
let result = arr.map(function(item, index, array) {
  // নতুন একটি এলিমেন্ট রিটার্ন করবে
});
```

যেমন, এখানে আমরা প্রতিটি এলিমেন্টে যতটি ক্যারেক্টার আছে তা রিটার্ন করছি, এবং আমাদের নতুন `results` অ্যারেটি হবে এলিমেন্টের ক্যারেক্টার সংখ্যা:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

[arr.sort()](mdn:js/Array/sort) অ্যারের এলিমেন্টগুলো বিভিন্ন ক্রমে যেমন উর্ধক্রম বা অধঃক্রমে সাজাতে আমরা এই মেথডটি ব্যবহার করি।

এটি পুনর্বিন্যাস্ত অ্যারে রিটার্ন করে, কিন্তু সাধারণত আমরা এটি অগ্রাহ্য করি, কেননা `arr` ভ্যারিয়েবলটি নিজেই পুনর্বিন্যস্ত হয়।

যেমন:

```js run
let arr = [ 1, 2, 15 ];

// arr এর এলিমেন্টগুলো পুনর্বিন্যাস্ত হয়
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

অ্যারেটিকে কি গোলমেলে লাগছে?

এখানে পুনর্বিন্যাস্ত ক্রমটি ভুল `1, 15, 2` । কিন্তু কেন?

**এলিমেন্টগুলো ডিফল্ট স্ট্রিং হিসাবে তুলনা করে পুনর্বিন্যাস্ত হয়**

সাধারণত, তুলনা করার জন্য সকল এলিমেন্টকে স্ট্রিংয়ে রূপান্তর করা হয়। প্রকৃতপক্ষে, স্ট্রিংয়ের জন্য লেক্সিগ্রাফিকক্রমে তুলনা করা হয় `"2" > "15"`।

আমাদের নিজস্ব ক্রম অনুযায়ী সাজাতে, `arr.sort()` এ আর্গুমেন্ট হিসেবে একটি ফাংশন পাঠাতে পারি।

<<<<<<< HEAD
ফাংশনটি দুটি ভ্যালুর মধ্যে তুলনা করে:
=======
The function should compare two arbitrary values and return:

>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f
```js
function compare(a, b) {
  if (a > b) return 1; // যদি প্রথম ভ্যালুটি দ্বিতীয়টি থেকে বড় হয়
  if (a == b) return 0; // যদি ভ্যালু দুটি সমান হয়
  if (a < b) return -1; // যদি প্রথম ভ্যালুটি দ্বিতীয়টি থেকে ছোট হয়
}
```

উদাহরণস্বরূপ, উপরের উদাহরণটি আবার দেখি:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

এখন এটি সঠিকভাবে কাজ করছে।

চলুন এটি কিভাবে কাজ করছে তা বুঝার চেষ্টা করি। `arr` এর এলিমেন্টগুলো যেকোন ডাটাটাইপের হতে পারে, তাই না? এলিমেন্টগুলো হতে পারে নাম্বার বা স্ট্রিং কিংবা অবজেক্ট অথবা যেকোন কিছু। আমাদের *কিছু এলিমেন্টের* একটি সেট আছে। পুনর্বিন্যাস্ত করার জন্য এলিমেন্টগুলোকে কিভাবে তুলনা করবে তার জন্য একটি *ordering function* লাগবে। যা সাধারণত ডিফল্ট স্ট্রিং হিসাবে পুনর্বিন্যাস্ত হয়।

`arr.sort(fn)` মেথডটি একটি জেনেরিক সর্টিং অ্যালগরিদম ইমপ্লিমেন্ট করে। ইন্টারনালি এটি কিভাবে কাজ করে তা আমাদের জানা লাগবে না ([quicksort](https://en.wikipedia.org/wiki/Quicksort) বা [Timsort](https://en.wikipedia.org/wiki/Timsort))। এটি অ্যারের মধ্যে ইটারেট করবে, প্রদত্ত ফাংশন অনুযায়ী এলিমেন্টগুলোর মধ্যে তুলনা করবে এবং অ্যারেটিকে পুনর্বিন্যস্ত করবে, আমাদের জানা লাগবে আমাদের প্রদত্ত `fn` কিভাবে তুলনা করছে।

যা হোক, আমরা যদি জানতে চাই কোন এলিমেন্টেগুলোর মধ্যে তুলনা করা হচ্ছে -- তাহলে এভাবে জানতে পারি:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

সর্টিংয়ের সময় একটি এলিমেন্ট একাধিক এলিমেন্টের সাথে তুলনা করতে পারে, তবে এটি যথাসম্ভব সর্টিং টিকে অপ্টিমাইজ করার চেষ্টা করে।

````smart header="কম্পারিজন ফাংশন যেকোন নাম্বার রিটার্ন করতে পারে"
সাধারণত, তুলনা করার সময় কাস্টম ফাংশনটি "বড়" বুঝাতে ধনাত্নক সংখ্যা এবং "ছোট" বুঝাতে ঋনাত্নক সংখ্যা রিটার্ন করে।

আমরা আরো সংক্ষিপ্তভাবে ফাংশনটিকে লিখতে পারি:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="আরো সংক্ষেপের জন্য অ্যারো ফাংশন"
[arrow functions](info:arrow-functions-basics) সিনট্যাক্স মনে আছে? আরো সংক্ষেপের জন্য আমরা এটি ব্যবহার করতে পারি:

```js
arr.sort( (a, b) => a - b );
```

এটি রেগুলার ফাংশনের মতই কাজ করে।
````

````smart header="স্ট্রিংয়ের জন্য `localeCompare`"
[strings](info:string#correct-comparisons) তুলনার অ্যালগরিদমটি মনে আছে? এটি ডিফল্টভাবে তাদের কোড অনুসারে তুলনা করে।

অনেক বর্ণমালার জন্য , সঠিকভাবে সর্টিংয়ের জন্য `str.localeCompare`  মেথডটি ব্যবহার করা উচিত, যেমন `Ö`।

উদাহরণস্বরূপ, চলুন আমরা জার্মান বর্ণমালা দ্বারা তৈরি একটি অ্যারেকে পুনর্বিন্যস্ত করি:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (ভুল)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (সঠিক!)
```
````

### reverse

[arr.reverse](mdn:js/Array/reverse) মেথডটি `arr` এর এলিমেন্টগুলোকে উল্টোভাবে পুনর্বিন্যস্ত করে।

উদাহরণস্বরুপ:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

এটিও `arr` এর রিভার্স অ্যারেটি রিটার্ন করে।

### split এবং join

একটি বাস্তব সমস্যার কথা চিন্তা করুন। আমরা একটি মেসেজিং অ্যাপ ডেভলাপ করছি, এখন একজন ইউজার মেসেজটি যাদের পাঠাবে তাদের নাম কমা দ্বারা আলাদা আলাদা করে লিখল: `John, Pete, Mary`। এখন আমাদের রিসিভারের নামগুলো স্ট্রিংয়ের তুলনায় অ্যারে দ্বারা ইটারেট করা সহজ। এখন একটি স্ট্রিংকে কিভাবে অ্যারেতে রূপান্তর করতে পারি?

[str.split(delim)](mdn:js/String/split) মেথড স্ট্রিংকে অ্যারেতে রূপান্তর করে। এটি স্ট্রিংকে কোন একটি ডেলিমিটারের `delim` সাপেক্ষে অ্যারেতে রূপান্তর করে।

নিচের উদাহরণে আমরা একটি কমা এবং একটি স্পেসের সাপেক্ষে স্ট্রিংকে অ্যারেতে বিভক্ত করব:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

`split` মেথডের দ্বিতীয় আর্গুমেন্টটি অপশনাল -- যা অ্যারের length নির্ধারণ করে দেয়। যদি `length` নির্দিষ্ট করে দেয়া হয়, তাহলে অতিরিক্ত এলিমেন্টগুলো উপেক্ষা করবে। তবে বাস্তবিক ক্ষেত্রে এটি খুব কম ব্যবহার করা হয়:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="স্ট্রিংয়ের প্রতিটি বর্নমালার অ্যারে"
যদি আমরা একটি এম্পটি স্ট্রিং ডেলিমিটার `s` হিসেবে পাঠায়  `split(s)` তাহলে স্ট্রিংটির বর্ণমালা গুলো দ্বারা একটি অ্যারে তৈরি হবে:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

`split` এর বিপরীত মেথডটি হল [arr.join(glue)](mdn:js/Array/join)। এটি `arr` এর এলিমেন্ট সমূহকে একটি গ্লু `glue` সাপেক্ষে স্ট্রিংয়ে রূপান্তর করে।

উদাহরণস্বরুপ:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // অ্যারেকে ; সাপেক্ষে জোড়া দিয়ে স্ট্রিংয়ে রূপান্তর

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

কোন একটি অ্যারেকে ইটারেট করতে আমরা ব্যবহার করতে পারি `forEach`, `for` বা `for..of`।

ইটারেটের সময় আমাদের প্রতিটি এলিমেন্ট রিটার্ন করতে ব্যবহার করি `map`।

[arr.reduce](mdn:js/Array/reduce) এবং [arr.reduceRight](mdn:js/Array/reduceRight) মেথডগুলোও একই ভাবে অ্যারের প্রতিটি এলিমেন্ট ইটারেট করে, তবে এটি কিছুটা জটিল। অ্যারের সাপেক্ষে আমরা কোন একটি ভ্যালুর মান গণনা করতে পারি।

এর সিনট্যাক্স হল:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

অ্যারের প্রতিটি এলিমেন্টের জন্য ফাংশনটি কল হবে এবং পূর্বের মানটি সংরক্ষন করে পরবর্তী কলে আগের মানটি প্রদান করে।

আর্গুমেন্টস:

- `accumulator` -- পূর্ববর্তী ফাংশন কলের রিটার্নকৃত মানটি, প্রথম এলিমেন্টের জন্য `initial` মানটি (যদি `initial` ডিক্লেয়ার করা হয়)।
- `item` -- ইটারেটকৃত এলিমেন্টটি।
- `index` -- ইটারেটকৃত এলিমেন্টের পজিশন।
- `array` -- অ্যারেটি।

ফাংশন কল হলে, পূর্ববর্তী ফাংশন কলের রিটার্নকৃত মানটি পরবর্তী কলের জন্য প্রথম আর্গুমেন্ট হিসেবে পাস হবে।

সুতরাং, প্রথম আর্গুমেন্টটি মূলত আমাদের পূর্ববর্তী সকল এক্সিকিউশনের মানটি ফলাফল হিসেবে সংরক্ষণ করে। এবং সর্বশেষে এটি `reduce` এর রেজাল্ট হয়।

জটিল মনে হচ্ছে?

চলুন, উদাহরণের সাহায্যে বুঝার চেষ্টা করি।

নিচের উদাহরণে আমরা অ্যারের সকল এলিমেন্টের যোগফল বের করছি:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

সাধারণত `reduce` ফাংশনের দুটি আর্গুমেন্ট।

চলুন এটি কিভাবে কাজ করছে তা বিস্তারিত দেখি।

1. ১ম বার কল হলে, `sum` হল `initial` মানটি (`reduce` এর ২য় আর্গুমেন্টটি), অর্থাৎ `0`, এবং `current` হল ১ম এলিমেন্টটি, অর্থাৎ `1`। সুতরাং ১ম বার এক্সিকিউশনে এর মান হবে `1`।
2. ২য় এক্সিকিউশনে, `sum = 1`, এখন `sum` এর সাথে ২য় এলিমেন্টটি (`2`) যোগ হবে (`2+1`) এবং মানটি রিটার্ন করবে।
3. ৩য় এক্সিকিউশনে, `sum = 3` এবং পূর্বের মত ৩য় এলিমেন্টটি যোগ হবে, এভাবে প্রতিটি এলিমেন্ট ইটারেট করবে...

ক্যালকুলেশন ফ্লো:

![](reduce.svg)

এখানে আরো বিস্তারিত আলোচনা করা হল:

|   |`sum`|`current`|ফলাফল|
|---|-----|---------|---------|
|১ম এক্সিকিউশনে|`0`|`1`|`1`|
|২য় এক্সিকিউশনে|`1`|`2`|`3`|
|৩য় এক্সিকিউশনে|`3`|`3`|`6`|
|৪র্থ এক্সিকিউশনে|`6`|`4`|`10`|
|৫ম এক্সিকিউশনে|`10`|`5`|`15`|

এখানে আমরা দেখছি কিভাবে প্রতিবার এক্সিকিউশনের রিটার্নকৃত মানটি এর পরের এক্সিকিউশনে যাচ্ছে।

দ্বিতীয় আর্গুমেন্টটি অপশনাল:

```js run
let arr = [1, 2, 3, 4, 5];

// প্রাথমিক মানটি পাস করছি না
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

ফলাফল একই আসবে। কেননা এখানে কোন প্রাথমিক মান নাই। যদি কোন প্রাথমিক মান না থাকে, তাহলে `reduce` প্রথম এলিমেন্টকে প্রাথমিক মান হিসেবে ধরে নিবে এবং ইটারেশন শুরু হবে ২য় এলিমেন্ট হতে।

উপরের ক্যালকুলেশন টেবলের মত তবে এক্ষেত্রে দ্বিতীয় সারি হতে।

তবে এটি ব্যবহারে সময় আমাদের সতর্ক থাকতে হবে। যদি অ্যারেটিতে কোন এলিমেন্ট না থাকে, তাহলে `reduce` কোন প্রাথমিক মান ছাড়া কল হবে এবং এরর থ্রো করবে।

যেমন, এখানে দেখুন:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// যদি প্রাথমিক মানটি পাস করি, তাহলে খালি অ্যারের জন্য প্রাথমিক মানটি রিটার্ন করবে
arr.reduce((sum, current) => sum + current);
```

সুতরাং অনাকাঙ্ক্ষিত এরর এড়াতে সবসময় প্রাথমিক মানটি আর্গুমেন্টে পাস করা উচিত।

[arr.reduceRight](mdn:js/Array/reduceRight) মেথডটিও একই কাজ করে, তবে এটি অ্যারের উল্টোদিক হতে ইটারেট করে।

## Array.isArray

পূর্বের অধ্যায়ে জেনেছি জাভাস্ক্রিপ্টে অ্যারে আলাদা কোন টাইপ না। এটি মূলত একটি বিশেষ ধরণের অবজেক্ট।

সুতরাং `typeof` অ্যারে ও অবজেক্টের মধ্যে পার্থক্য করতে পারে না:

```js run
alert(typeof {}); // object
alert(typeof []); // object (same)
```

...তবে এর জন্য আমাদের আরেকটি বিশেষ মেথড আছে: [Array.isArray(value)](mdn:js/Array/isArray)। যদি `value` একটি অ্যারে হয় তাহলে `true` রিটার্ন করবে, অন্যথায় `false`।

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## বেশিরভাগ মেথড "thisArg" সাপোর্ট করে

বেশিরভাগ অ্যারে মেথড -- যেমন `find`, `filter`, `map` ইত্যাদি আরেকটি অপশনাল আর্গুমেন্ট `thisArg` নিতে পারে।

উপরে আমরা প্যারামিটারটি সম্পর্কে আলোচনা করিনি, কেননা এটি কদাচিৎ ব্যবহার হয়। তবে আমাদের এটিও জেনে রাখা উচিত।

মেথডগুলোর সিনট্যাক্স হবে:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg হল একটি অপশনাল আর্গুমেন্ট
```

`thisArg` প্যারামিটারের মান হবে ঐ `func` এর `this`।

যেমন, অ্যারের অবজেক্টকে ফিল্টার করতে `army` অবজেক্টের একটি মেথড ব্যবহার করছি, এবং এটিকে `thisArg` এর দ্বারা কন্টেক্সে পাস করছি:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// যেসব users এর জন্য army.canJoin এর true রিটার্ন করে
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

উপরের উদাহরণে আমরা যদি শুধুমাত্র `users.filter(army.canJoin)` দ্বারা চেষ্টা করি, তাহলে `army.canJoin` একটি স্বতন্ত্র ফাংশন কল করবে যেখানে `this=undefined`, এবং প্রোগ্রামটি একটি এরর থ্রো করবে।

`users.filter(army.canJoin, army)` এর বদলে এভাবেও `users.filter(user => army.canJoin(user))` কল করতে পারি, যা একই কাজ করে। পরবর্তী নিয়মেই বেশিরভাগ কল করা হয়, এবং এটি পড়তে ও বুঝতেও বেশি সুবিধাজনক।

## সারাংশ

অ্যারের মেথডের চিটশীট:

- এলিমেন্ট add/remove এর জন্য:
  - `arr.push(...items)` -- অ্যারের শেষে এলিমেন্ট যুক্ত করতে,
  - `arr.pop()` -- অ্যারের শেষে এলিমেন্টটি বাদ দিতে,
  - `arr.shift()` -- অ্যারের শুরুর এলিমেন্টটি বাদ দিতে,
  - `arr.unshift(...items)` -- অ্যারের শুরুতে এলিমেন্ট যুক্ত করতে.
  - `splice(pos, deleteCount, ...items)` -- `pos` ইনডেক্স হতে `deleteCount` অনুযায়ী এলিমেন্ট ডিলিট করে এবং `items` যুক্ত করে।
  - `slice(start, end)` -- অ্যারের `start` হতে `end` ইনডেক্স পর্যন্ত এলিমেন্ট সমূহকে একটি নতুন অ্যারে হিসেবে রিটার্ন করে।
  - `concat(...items)` -- কোন একটি অ্যারের সাথে আরেকটি নতুন অ্যারে বা নতুন `items` সংযুক্ত করে, এটিও একটি নতুন অ্যারে রিটার্ন করে।

- এলিমেন্ট অনুসন্ধানের মেথড:
  - `indexOf/lastIndexOf(item, pos)` -- কোন একটি নির্দিষ্ট পজিশন `pos` থেকে একটি `item` অনুসন্ধান করে, এলিমেন্ট পাওয়া গেলে `index` পাওয়া না গেলে `-1` রিটার্ন করে।
  - `includes(value)` -- অ্যারেতে `value` টি থাকলে `true` রিটার্ন করবে, অন্যথায় `false`।
  - `find/filter(func)` -- এলিমেন্ট সমূহকে কাস্টম ফাংশনের উপর ভিত্তি করে অনুসন্ধান চালায়, ফাংশনের `true` রিটার্নের জন্য প্রথম/সকল এলিমেন্ট রিটার্ন করে।
  - `findIndex` -- এটি `find` এর মত, তবে এটি ভ্যালুর পরিবর্তে `index` রিটার্ন করে।

- প্রতিটি এলিমেন্ট ইটারেট করতে:
  - `forEach(func)` -- প্রতিটি এলিমেন্টের জন্য একটি `func` কল হয়, কোন কিছু রিটার্ন করে না।

- অ্যারের রুপান্তরের জন্য:
  - `map(func)` -- প্রতিটি এলিমেন্টের জন্য একটি `func` কল হয় এবং রূপান্তরিত এলিমেন্টগুলো অ্যারে হিসেবে রিটার্ন করে।
  - `sort(func)` -- অ্যারেকে সর্ট করতে, সর্টিং অ্যারেটি রিটার্ন করে।
  - `reverse()` -- অ্যারের এলিমেন্টসমূহকে বিপরীতক্রমে পেতে।
  - `split/join` -- স্ট্রিংকে অ্যারেতে আর অ্যারেকে স্ট্রিংয়ে রূপান্তর করতে।
  - `reduce/reduceRight(func, initial)` -- অ্যারের প্রতিটি এলিমেন্টের জন্য `func` কল হবে এবং পূর্বের মানটি সংরক্ষন করে পরবর্তী কলে আগের মানটি প্রদান করে এবং সর্বশেষে একটি ফলাফল রিটার্ন করে।

<<<<<<< HEAD
- অতিরিক্ত:
  - `Array.isArray(arr)` এটি `arr` কে যাচাই করে অ্যারে কিনা।
=======
- Additionally:
  - `Array.isArray(value)` checks `value` for being an array, if so returns `true`, otherwise `false`.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

দয়া করে মনে রাখুন `sort`, `reverse` এবং `splice` অরিজিনাল অ্যারেকে রূপান্তর করে।

প্রাত্যহিকক্ষেত্রে বেশিরভাগ সময় এই মেথড সমূহ ব্যবহার করি। তবে আরো কিছু মেথড আছে:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) অ্যারেটিকে যাচাই করে।

<<<<<<< HEAD
  `fn` ফাংশনটি `map` এর মত সকল এলিমেন্টকে ইটারেট করে। যদি কোন/সকল রেজাল্ট `true` হয়, তাহলে `true` রিটার্ন করবে, অন্যথায় `false`।

  মেথডগুলো `||` এবং `&&` অপারেটরের মত কাজ করে: যদি `fn`  কোন একটি এলিমেন্টের জন্য `true` রিটার্ন করে, `arr.some()` সাথে সাথে ইটারেশন থামিয়ে `true` রিটার্ন করবে অর্থাৎ `arr.some()` অ্যারের কোন একটি এলিমেন্টের জন্য শর্ত পূরণ হলে `true` রিটার্ন করে। আবার যদি `fn`  কোন একটি এলিমেন্টের জন্য `false` রিটার্ন করে `arr.every()` সাথে সাথে ইটারেশন থামিয়ে `false` রিটার্ন করবে অর্থাৎ `arr.every()` অ্যারের প্রতিটি এলিমেন্টের জন্য শর্ত পূরণ হলে `true` রিটার্ন করে।

  দুটি অ্যারেকে তুলনা করতে ব্যবহার করতে পারি `every` মেথড:
=======
  The function `fn` is called on each element of the array similar to `map`. If any/all results are `true`, returns `true`, otherwise `false`.

  These methods behave sort of like `||` and `&&` operators: if `fn` returns a truthy value, `arr.some()` immediately returns `true` and stops iterating over the rest of items; if `fn` returns a falsy value, `arr.every()` immediately returns `false` and stops iterating over the rest of items as well.

  We can use `every` to compare arrays:

>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- ইনডেক্স `start` হতে `end` পর্যন্ত `value` দ্বারা পূর্ন হবে।

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- অ্যারের নিজের এলিমেন্ট ঐ অ্যারের অন্য একটি পজিশনে কপি করতে এই মেথডটি ব্যবহার করি, `target` (বর্তমান ভ্যালুকে প্রতিস্থাপন করবে) `start` যে পজিশন থেকে কপি হবে এবং যে পজিশন পর্যন্ত `end` কপি হবে।

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) মাল্টিডাইমেনশনাল অ্যারে থেকে ফ্লাট অর্থাৎ একমাত্রিক অ্যারেতে রূপান্তর।

অ্যারের সম্পূর্ণ মেথডের তালিকাটি দেখতে, [manual](mdn:js/Array)।

প্রথম দেখায় মনে হতে পারে অনেক মেথড আছে, এবং এদের মনে রাখা কঠিন। আসলে এটি তেমন কঠিন কিছু না।

চিটশীটটি আবার লক্ষ্য করুন। তারপর এই অধ্যায়ের সমস্যাগুলো সমাধান করুন, তাহলে মেথডসমূহ সম্পর্কে আপনার ধারণা হবে।

এরপর যখন আপনি অ্যারে নিয়ে কাজ করবেন, এবং কিভাবে করবেন তা জানেন না তখন এখানে আসুন, এবং চিটশীটটি আবার দেখুন এবং সঠিক মেথডটি ব্যবহার করুন। উদাহরণগুলো আপনাকে সঠিকভাবে মেথডগুলোর ব্যবহার শিখতে সাহায্য করবে। এভাবে ব্যবহার করতে করতে আপনি মেথডগুলো শিখে যাবেন, দয়া করে একবার পড়েই মেথডগুলো মুখস্থ করতে যাবেন না, ব্যবহার করতে করতেই এগুলো শিখা হয়ে যাবে।


# ইটারেবলস

<<<<<<< HEAD
*Iterable* অবজেক্ট হল একধরণের অ্যারের ধারণা। এটি এমন একটি ধারণা যার সাহায্যে আমরা কোন একটি অবজেক্টকে `for..of` লুপের সাহায্যে অ্যাক্সেস করতে পারব।
=======
*Iterable* objects are a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

আমরা ইতোমধ্যে জানি অ্যারে ইটারেবল। এছাড়াও আরো বিভিন্ন বিল্ট-ইন ইটারেবল অবজেক্ট আছে। যেমন: স্ট্রিং।

যদি কোন একটি অবজেক্ট অ্যারে না হয়, কিন্তু এটি একটি কালেকশনকে প্রকাশ করে যেমন:list, set ইত্যাদি, তাহলে আমরা `for..of` লুপের সাহায্যে প্রপার্টিগুলো অ্যাক্সেস করতে পারি, চলুন দেখি এটি কিভাবে করা যায়।


## Symbol.iterator

আমরা নিজেরা একটি ইটারেবল অবজেক্ট বানানোর মাধ্যমে ধারণাটি নিতে পারি।

উদাহরণস্বরূপ, আমাদের একটি অবজেক্ট আছে যা ইটারেবল নই, এখন এটিকে আমরা `for..of` এর জন্য ইমপ্লিমেন্ট করব।

যেমন নিচের `range` অবজেক্টটি দুটি নাম্বারের ব্যবধান দেখায়:

```js
let range = {
  from: 1,
  to: 5
};

// আমরা চায় এখানে for..of কাজ করুক:
// for(let num of range) ... num=1,2,3,4,5
```

<<<<<<< HEAD
`range` কে ইটারেবল করতে (এবং `for..of` লুপ কে কাজ করাতে) আমাদের একটি মেথড যুক্ত করতে হবে `Symbol.iterator` (একটি বিশেষ বিল্ট-ইন সিম্বল)।

1. যখন `for..of` শুরু হয়, তখন মেথডটিকে একবার কল করে (অথবা না পেলে এরর থ্রো করে)। মেথডটি একটি *iterator* অবজেক্ট রিটার্ন করে -- যার `next` নামের একটি মেথড থাকে।
2. এরপর, `for..of` কাজ করবে *ঐ রিটার্নকৃত অবজেক্টটি নিয়ে*।
3. যখন `for..of` পরবর্তী মানটি জানতে চাইবে, তখন এটি ঐ অবজেক্টের `next()` মেথডকে কল করে।
4. `next()` এর রিটার্নকৃত মান হবে এভাবে `{done: Boolean, value: any}`, যেখানে `done=true` দ্বারা বুঝায় আমাদের ইটারেশনটি সম্পন্ন হয়েছে।
=======
To make the `range` object iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true` means that the loop is finished, otherwise `value` is the next value.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

নিচে `range` অবজেক্টকে আমরা ইটারেবল হিসেবে ইমপ্লিমেন্ট করেছি:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. for..of প্রথমবার এটিকে কল করবে
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // ...এটি ইটারেটর অবজেক্ট রিটার্ন করে:
  // 2. এরপর, for..of শুধুমাত্র এই ইটারেটরটি নিয়ে কাজ করবে, এবং পরবর্তী মানটি জানতে চাইবে
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
  return {
    current: this.from,
    last: this.to,

    // 3. প্রতিবার for..of এর ইটারেশনে next() মেথডটি কল হবে
    next() {
      // 4. এটি এই ফর্মে একটি অবজেক্ট রিটার্ন করে  {done:.., value :...} এবং ইটারেশন শেষ হলে রিটার্ন করে  {done: true}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// এখন এটি কাজ করবে!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

দয়া করে ইটারেবলের কোর ফিচার সম্পর্কে জেনে রাখুন।

- `range` এর নিজের কোন `next()` মেথড নেই।
- তার পরিবর্তে অন্য একটি ইটারেটর অবজেক্ট তৈরি করা হয়েছে `range[Symbol.iterator]()` এর দ্বারা, এবং এর `next()` মেথডটি প্রতিবার ইটারেশনে মানটি রিটার্ন করে।

সুতরাং ইটারেটর অবজেক্টটি ইটারেশন শেষে `range` অবজেক্টটি হতে আলাদা।

আমরা কোড কে আরো সহজবোধ্য করতে এদের একসাথে লিখতে পারি।

এভাবে:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

এখন `range[Symbol.iterator]()` রিটার্ন করবে `range` অবজেক্টটিকেই:  এটির `next()` মেথড থাকে এবং এটি কারেন্ট ইটারেশন সংরক্ষণ করবে `this.current` এ। এটি আরো সংক্ষিপ্ত তাই না? হ্যাঁ। অনেক সময় এভাবে করা ভাল।

তবে এটির একটি সীমাবদ্ধতা আছে, আমরা একইসাথে দুটি `for..of` লুপ চালাতে পারব না: তারা তাদের ইটারেশন স্টেট শেয়ার করবে কেননা এখানে অবজেক্টটিতে শুধুমাত্র একটি ইটারেটর আছে। তবে বাস্তব ক্ষেত্রে একইসাথে দুটি `for..of` ব্যবহার করা হয় না বললেই চলে, এমনকি অ্যাসিঙ্ক্রোনাসও।

```smart header="ইনফিনিট ইটারেটর"
ইনিফিনিট ইটারেটর তৈরি করাও সম্ভব। যেমন `range.to = Infinity` এর জন্য `range` ইনফিনিট ইটারেটর হবে। অথবা এমন একটি ইটারেবল অবজেক্ট তৈরি করতে পারি যা ইনিফিনিট সিক্যুয়েন্সে র‍্যান্ডম নাম্বার জেনারেট করবে।

`next` এর কোন নির্দিষ্ট সীমা নেই, এটি একের পর এক ভ্যালু রিটার্ন করতে পারে, এটি স্বাভাবিক।

অবশ্যই, আমরা `for..of` লুপকে ইনিফিনিট হিসেবে তৈরি করতে পারি, তবে অন্যান্য লুপের মত এটিকেও `break` এর সাহায্যে থামাতে পারি।
```


## স্ট্রিংও ইটারেবল

সবচেয়ে বেশি ব্যবহৃত ইটারেবল হল অ্যারে এবং স্ট্রিং।

একটি স্ট্রিংয়ের জন্য, `for..of` এর সাহায্যে এর ক্যারেক্টারকে ইটারেট করতে পারি:

```js run
for (let char of "test") {
  // ৪ বার ইটারেশন হবে: প্রতিটি ক্যারেক্টারের জন্য
  alert( char ); // t, তারপর e, তারপর s, তারপর t
}
```

এছাড়াও এটি *surrogate pairs* এর জন্যও কাজ করবে!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## অন্য ভাবে ইটারেটরকে কল

<<<<<<< HEAD
ইটারেটর কীভাবে কাজ করে তা আরো গভীরভাবে বুঝতে চলুন অন্যভাবে একটি স্ট্রিংকে ইটারেশন করি।
=======
For deeper understanding, let's see how to use an iterator explicitly.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

আমরা একটি স্ট্রিংকে `for..of` এর মত করে ইটারেট করব, তবে সরাসরি কলের মাধ্যমে। নিচে কোডটি একটি স্ট্রিং ইটারেটর তৈরি করবে এবং এর মান আমরা ম্যানুয়ালি ইটারেট করব:

```js run
let str = "Hello";

// কাজ করবে এটির মত
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // প্রতিটি ক্যারেক্টারের একের পর এক দেখাবে
}
```

এটি কদাচিৎ প্রয়োজন হতে পারে, তবে এভাবে `for..of` এর চেয়ে বেশি কন্ট্রোল থাকে। যেমন, আমরা আমাদের ইটারেশন প্রসেসকে বিভক্ত করে নিতে পারি: কয়েকবার ইটারেশন চালিয়ে, তারপর থামাব, এরপর অন্যান্য কাজ করে ইটারেটরটি পুনরায় চালু করব।

## ইটারেবলস এবং array-likes [#array-like]

<<<<<<< HEAD
ইটারেবল এবং অ্যারে দুটিই দেখতে একই, তবে তাদের মধ্যে ভিন্নতা রয়েছে। বিভ্রান্তি এড়াতে নিশ্চিত হন আপনি এদের পার্থক্যটি ভালোভাবে বুঝতে পেরেছেন।
=======
Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

- *Iterables* একটি অবজেক্ট যার `Symbol.iterator` মেথড আছে।
- *Array-likes* একটি অবজেক্ট যার প্রপার্টিগুলো নিউমেরিক ইনডেক্স আকারে এবং `length` প্রপার্টি আছে, সুতরাং এটি দেখতে অ্যারের মত।

<<<<<<< HEAD
বাস্তবক্ষেত্রে জাভাস্ক্রিপ্ট ব্যবহারের সময় আমরা এই ধরণের অবজেক্ট নিয়ে কাজ করি যারা হয়ত ইটারেবল অথবা দেখতে অ্যারের মত, অথবা উভয়ই।
=======
When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

যেমন, স্ট্রিং ইটারেবল আবার এটি দেখতে অ্যারের মতও  (কেননা এর numeric index ও `length` আছে)।

<<<<<<< HEAD
কিন্তু একটি ইটারেবল দেখতে অ্যারের মত নাও হতে পারে। আবার অন্য দিকে অ্যারের মত হলেও এটি ইটারেবল নাও হতে পারে।
=======
But an iterable may not be array-like. And vice versa an array-like may not be iterable.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

যেমন, উপরের `range` উদাহরণটি ইটারেবল, কিন্তু এটি দেখতে অ্যারের মত না কেননা এর numeric index ও `length` প্রপার্টি নেই।

এবং নিচে একটি অবজেক্ট ডিক্লেয়ার করা হয়েছে যা দেখতে অ্যারের মত, কিন্তু ইটারেবল না:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

ইটারেবল এবং *array-likes* সাধারণত *array* না, কেননা এদের মধ্যে অ্যারের মেথডগুলো পাব না যেমন `push`, `pop` ইত্যাদি। এটি কিছুটা অসুবিধাজনক, মনে করুন আমাদের একটি ইটারেবল অবজেক্ট আছে যাকে আমরা অ্যারের মত ব্যবহার করতে চাই। যেমন উপরের `range` এর মধ্যে অ্যারের মেথডগুলো ইমপ্লিমেন্ট করা। কিভাবে আমরা এটি করতে পারি?

## Array.from

এক্ষেত্রে একটি মেথড আছে [Array.from](mdn:js/Array/from) যা একটি ইটারেবল বা একটি অ্যারের মত ভ্যালু নিবে এবং একে `Array` হিসেবে রিটার্ন করে। তাহলে আমরা অ্যারের সকল ফিচার এর মধ্যে পাব।

যেমন:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (method works)
```

`(*)` লাইনে `Array.from` একটি অবজেক্ট নেয়, তারপর এটির স্ট্রাকচার অ্যারের মত বা ইটারেবল হলে একটি নতুন অ্যারে তৈরি করে তার মধ্যে সকল আইটেম কপি করে।

ইটারেবলের ক্ষেত্রেও এটি ঘটবে:

<<<<<<< HEAD
```js
// মনে করুন এখানের range একটি ইটারেবল
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (অ্যারে থেকে toString কনভার্শন কাজ করছে)
```

`Array.from` অপশনাল আর্গুমেন্ট "mapping" ফাংশন আছে:
```js
Array.from(obj[, mapFn, thisArg])
```

দ্বিতীয় আর্গুমেন্ট `mapFn` প্রতিটি এলিমেন্ট নতুন অ্যারেতে সংযুক্ত হওয়ার পূর্বে কল হবে, এবং `thisArg` এটির জন্য `this` সেট করতে দেয়।

উদাহরণস্বরূপ:

<<<<<<< HEAD
```js
// মনে করুন এখানের range ভ্যারিয়েবলটা নেয়া হচ্ছে
=======
```js run
// assuming that range is taken from the example above
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

// প্রতিটি নাম্বারের বর্গ
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

`Array.from` এর সাহায্যে স্ট্রিংয়ের প্রতিটি ক্যারেকটারকে অ্যারের আইটেমে রূপান্তর:

```js run
let str = '𝒳😂';

// স্ট্রিংয়ের ক্যারেক্টারকে অ্যারের এলিমেন্ট হিসেবে নেয়া
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

`str.split` আলাদা, এটি স্ট্রিংয়ের ইটারেবলের উপর নির্ভর করে, ঠিক `for..of` এর মত, সঠিকভাবে *surrogate pairs* এর সাথে কাজ করে।

এটি এভাবে কাজ করে:

```js run
let str = '𝒳😂';

let chars = []; // ইন্টারনালি Array.from এভাবে কাজ করে
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

<<<<<<< HEAD
...তবে এটি সংক্ষিপ্ত।
=======
...But it is shorter.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

আমরা surrogate-pairs এর জন্য `slice` তৈরি করতে পারি:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// বিল্ট ইন মেথড surrogate pairs সাপোর্ট করে না
alert( str.slice(1, 3) ); // garbage (দুটি আলাদা surrogate pairs এর অংশ)
```


## সারাংশ

যেসব অবজেক্টে `for..of` লুপ কাজ করে তাদের বলা হয় *iterable*।

<<<<<<< HEAD
- ইটারেবল অবজেক্টে `Symbol.iterator` নামের একটি মেথড অবশ্যই থাকা লাগবে।
    - `obj[Symbol.iterator]()` এর ফলে এটি একটি *iterator* কল করবে। এটি অন্যান্য ইটারেশন প্রসেস গুলো হ্যান্ডেল করবে।
    - ইটারেটর অবজেক্টে অবশ্যই `next()` নামের একটি মেথড থাকতে হবে যা রিটার্ন করবে একটি অবজেক্ট `{done: Boolean, value: any}`, এখানে `done:true` দ্বারা বুঝায় ইটারেশন সম্পন্ন হয়েছে, অন্যথায় `value` টি হবে পরবর্তী ভ্যালু।
- `Symbol.iterator` মেথডটি `for..of` এর জন্য স্বয়ংক্রিয়ভাবে কল হয়, তবে আমরা এটি ম্যানুয়ালিও করতে পারব।
- বিল্ট ইন ইটারেটর যেমন স্ট্রিং বা অ্যারে এরাও `Symbol.iterator` ইমপ্লিমেন্ট করে।
- স্ট্রিংয়ের ইটারেটর *surrogate pairs* সম্পর্কে জানে।
=======
- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19


যেসব অবজেক্টের প্রপার্টি হল ক্রমিক সংখ্যা এবং `length` প্রপার্টি আছে তাদের বলা হয় *array-like*। যদিও এরা দেখতে অ্যারের মত তারপরও আমরা এদের মধ্যে অ্যারের বিল্ট-ইন মেথড গুলো ব্যবহার করতে পারব না।

যদি আমরা স্পেসিফিকেশন দেখি তাহলে দেখব বেশিরভাগ বিল্ট ইন মেথড "real" অ্যারের পরিবর্তে কাজ করে ইটারেবল বা *array-like* এর মত। কেননা এরা আরো বেশি অ্যাবস্ট্রাক্ট।

ইটারেবল বা *array-like* এর মত অবজেক্ট সমূহকে `Array` তে কনভার্ট করতে আমরা ব্যবহার করি `Array.from(obj[, mapFn, thisArg])`, তাহলে আমরা অ্যারের মেথডসমূহ ব্যবহার করতে পারব। অপশনাল আর্গুমেন্ট `mapFn` ফাংশন প্রতিটি এলিমেন্ট অ্যারেতে সংযুক্ত হওয়ার আগে ফাংশনটি কল করে এবং `thisArg` এটির জন্য `this` সেট করতে দেয়।

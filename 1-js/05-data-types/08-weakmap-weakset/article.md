<<<<<<< HEAD
# WeakMap এবং WeakSet

জাভাস্ক্রিপ্ট ইঞ্জিন কোন একটি মানকে সংরক্ষন করে যতক্ষণ মানটি রিচেবল হয়, এই সম্পর্কে বিস্তারিত জেনেছিলাম এখানে <info:garbage-collection>।

উদাহরণস্বরূপ:
=======

# WeakMap and WeakSet

As we know from the chapter <info:garbage-collection>, JavaScript engine keeps a value in memory while it is "reachable" and can potentially be used.

For instance:

>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
```js
let john = { name: "John" };

// john অবজেক্টটিকে রেফারেন্স হিসেবে ব্যবহার করার কারণে অবজেক্টটি অ্যাক্সেস করা যাবে

// রেফারেন্সকে null করা হল
john = null;

*!*
// অবজেক্টটি মেমোরি হতে মুছে যাবে
*/!*
```

সাধারণত, কোন অবজেক্টের প্রপার্টি বা অ্যারের এলিমেন্টকে বা অন্যান্য ডাটা স্ট্রাকচারকে রিচেবল হিসেবে গন্য করা হয় যতক্ষন ডাটা স্ট্রাকচারটি মেমোরিতে থাকে।

যেমন, যদি আমরা অ্যারেতে কোন একটি অবজেক্ট রাখি, তাহলে যতক্ষণ অ্যারেটি রিচেবল হবে ততক্ষণ অবজেক্টটিও রিচেবল হবে, যদিও আমরা রেফারেন্সটি রিমুভড করে দেয় তাও অবজেক্টটিও রিচেবল থাকবে।

যেমন:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // রেফারেন্সকে null করা হল

*!*
<<<<<<< HEAD
// যেহেতু john অ্যারেতে আছে, সুতরাং একে গার্বেজ কালেক্টর মেমোরি থেকে মুছবে না
// array[0] এর সাহায্যে একে অ্যাক্সেস করতে পারি
=======
// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
*/!*
```

একই ভাবে, যদি আমরা কোন একটি অবজেক্টকে `Map` এর কী(key) হিসেবে ব্যবহার করি, তাহলে যতক্ষণ `Map` টি রিচেবল হবে ততক্ষন অবজেক্টটিকেও কালেক্ট করা যাবে। এটি মেমোরিতে থেকে যাবে, সুতরাং একে গার্বেজ কালেক্টর মেমোরি থেকে মুছবে না।

যেমন:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // রেফারেন্সকে null করা হল

*!*
// john এর মান map এ সংরক্ষিত আছে,
// map.keys() এর সাহায্যে একে অ্যাক্সেস করতে পারি
*/!*
```

<<<<<<< HEAD
`WeakMap` এবং `WeakSet` এদের থেকে ভিন্ন। কেননা এরা আনরিচেবল অবজেক্টসমূহের মান সংরক্ষন করে না।
=======
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is fundamentally different in this aspect. It doesn't prevent garbage-collection of key objects.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

উদাহরণের সাহায্যে বুঝার চেষ্টা করি।

## WeakMap

<<<<<<< HEAD
`Map` এবং `WeakMap` এর প্রধান পার্থক্য হলো `WeakMap` এর কী(key) কখনো প্রিমিটিভ টাইপ হতে পারবে না শুধুমাত্র অবজেক্ট হবে:
=======
The first difference between [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is that keys must be objects, not primitive values:
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // (কী হিসেবে object) কাজ করবে

*!*
// কী হিসেবে string ব্যবহার করতে পারব না
weakMap.set("test", "Whoops"); // এরর, কেননা "test" এর টাইপ অবজেক্ট না
*/!*
```

এখন, যদি আমরা কোন অবজেক্টকে কী(key) হিসেবে ব্যবহার করি এবং এটির রেফারেন্স রিমুভড করে দেয়া হয়, তাহলে এটি মেমোরি (এবং map) হতেও রিমুভড হয়ে যাবে।

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // reference কে ওভাররাইট করা হল

// মেমোরি হতে john মুছে যাবে
```

উপরের উদাহরণটিকে `Map` এর সাথে তুলনা করে দেখুন। যদিও `john` শুধুমাত্র `WeakMap` এর কী(key) হিসেবে উপস্থিত থাকবে, তবে এটি স্বয়ংক্রিয়ভাবে weakMap এবং মেমোরি হতে মুছে যাবে।

`WeakMap` ইটারেশন মেথডগুলো সাপোর্ট করে না, যেমন `keys()`, `values()`, `entries()`, সুতরাং আমরা কোনভাবে সকল কী(key) বা ভ্যালুকে ইটারেট করতে পারব না।

`WeakMap` এর মেথড:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

মেথডের এই সীমাবদ্ধতাটি প্রযুক্তিগত কারণে। যদি কোন অবজেক্ট তার রেফারেন্স হারিয়ে ফেলে (যেমন উপরের কোডে `john` এর মত)। তাহলে গার্বেজ কালেক্টেড স্বয়ংক্রিয়ভাবে হবে। তবে এটি নির্দিষ্ট নয় কখন গার্বেজ কালেকশন সম্পন্ন হবে।

<<<<<<< HEAD
কখন গার্বেজ কালেক্টর প্রসেস হবে এই সিদ্ধান্তটি জাভাস্ক্রিপ্ট ইঞ্জিন নেয়। তাই আমরা `WeakMap` এর এলিমেন্টকে গণনা করতে পারব না। একারণে keys/values অ্যাক্সেসের মেথডগুলো সাপোর্ট করে না।

এখন কথা হল কী ধরণের কাজে এদের ব্যবহার করতে পারি?
=======
The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically, the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now, where do we need such a data structure?
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## ব্যবহারের ক্ষেত্র: অতিরিক্ত ডাটা সংরক্ষণ

অতিরিক্ত ডাটা সংরক্ষণ করতে আমরা `WeakMap` ব্যবহার করে থাকি।

যখন আমরা কোন একটি অবজেক্ট নিয়ে কাজ করি যা অন্য কোডের সাথে সম্পর্ক রাখে, হতে পারে কোন একটি থার্ড-পার্টি লাইব্রেরী, যা এর সাথে সম্পর্কিত কিছু ডাটা সংরক্ষণ করতে চায়, তাহলে অবজেক্টটিকে ততক্ষণ পর্যন্ত মেমোরিতে সংরক্ষণ রাখা উচিত যতক্ষণ অবজেক্টটি রিচেবল হয়, এক্ষেত্রে আমরা `WeakMap` ব্যবহার করি।

আমরা `WeakMap` এ কিছু ডাটা সংরক্ষণ করব, অবজেক্টকে কী(key) হিসেবে ব্যবহার করব, এবং যখন অবজেক্টটির রেফারেন্স মুছে যাবে তখন গার্বেজ কালেক্টরের কারণে weakMap এ ঐ অবজেক্টের ডাটাও স্বয়ংক্রিয়ভাবে মুছে যাবে।

```js
weakMap.set(john, "secret documents");
// john এর রেফারেন্স মুছে গেলে, স্বয়ংক্রিয়ভাবে john কী(key) এবং ভ্যালু মুছে যাবে
```

চলুন একটি উদাহরণ দেখি।

যেমন, আমাদের ভিজিটর কাউন্টের জন্য একটি ফাংশন আছে। এবং আমরা ডাটাগুলোকে `Map` এ সংরক্ষণ করি: অবজেক্টকে কী(key) হিসেবে এবং ভ্যালু হিসেবে ভিজিটের মান সংরক্ষন করছি। যখন অবজেক্টটি `null` হবে (অবজেক্টটি গার্বেজ কালেক্টরে যাবে), এইক্ষেত্রে আমরা ঐ অবজেক্টের মান আর `map` এ সংরক্ষন রাখতে চায় না।

এখানে `Map` এর সাহায্যে ডাটা সংরক্ষন করা হচ্ছে:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

এবং এখানে একটি অবজেক্টের ডাটা সংরক্ষন করা হচ্ছে:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // ভিজিট গননা

// রেফারেন্স মুছে দেয়া হল
john = null;
```

<<<<<<< HEAD
এখন `john` অবজেক্টটি গার্বেজ কালেক্টরে যাবে হবে, তবে অবজেক্টটিকে মেমোরিতে সংরক্ষণ করা হবে, যেহেতু এটি `visitsCountMap` এর কী(key)।
=======
Now, `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

আমাদের users রিমুভ হলে `visitsCountMap` এর কী(key) টিকেও ডিলিট করা লাগবে, অন্যথায় মেমোরির মান বৃদ্ধি পেতে থাকবে। এইক্ষেত্রে মেমোরি ম্যানেজমেন্টের কাজ বিরক্তিকর এবং কিছুটা জটিল।

তবে `WeakMap` এর সাহায্যে এটি খুব সহজে প্রয়োগ করা যায়:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// ভিজিট কাউন্ট ফাংশনালিটি
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
এখন আমাদের `visitsCountMap` কে ম্যনুয়ালী ম্যানেজ করা লাগবে না। কেননা `john` আনরিচেবল হলে আমরা `WeakMap` হতে কী(key) টাকে আর কোন ভাবে অ্যাক্সেস করতে পারব না, `WeakMap` হতে আনরিচেবল হওয়ার সাথে সাথে মেমোরি হতেও রিমুভড হয়ে যাবে।
=======
Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable, by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## ব্যবহারের ক্ষেত্র: caching

<<<<<<< HEAD
আমাদের প্রায় সময় ডাটা cache করা লাগে: যদি কোন একটি মান ("cached") করে রাখি তাহলে পরবর্তীতে একই অবজেক্টকে পুনরায় ব্যবহার করতে পারি।

এক্ষেত্রে আমরা ডাটা সংরক্ষণ করতে `Map` ব্যবহার করি:
=======
Another common example is caching. We can store ("cache") results from a function, so that future calls on the same object can reuse it.

To achieve that, we can use `Map` (not optimal scenario):
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
// 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

*!*
// Now we use process() in another file:
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

একই অবজেক্ট দ্বারা `process(obj)` কে একাধিকবার এক্সিকিউট করা করা হলে এটি প্রথম এক্সিকিউশনে `cache` এ ঐ অবজেক্টের ডাটা সংরক্ষণ করবে, এবং পরবর্তী এক্সিকিউশনগুলোর জন্য `cache` হতে ঐ অবজেক্টের ডাটা রিটার্ন করবে। তবে এর একটি সীমাবদ্ধতা রয়েছে, ভেবে দেখুন তো যদি কোন কারণে অবজেক্টটি ডিলিট করে দিই তাহলে কি ঐ অবজেক্টের মান `cache` এ সংরক্ষণ করার প্রয়োজন আছে কি?

<<<<<<< HEAD
এটি সমাধানের জন্য আমরা `Map` এর বদলে `WeakMap` ব্যবহার করব, তাহলে আমাদের অপ্রয়োজনীয় ডাটা মেমোরিতে সংরক্ষণ নিয়ে চিন্তা করতে হবে না, যখন কোন অবজেক্ট ডিলিট করা হবে তখন গার্বেজ কালেক্টর প্রসেসের কারণে ঐ অবজেক্টের ডাটা স্বয়ংক্রিয়ভাবে মুছে যাবে।
=======
If we replace `Map` with `WeakMap`, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
```

## WeakSet

<<<<<<< HEAD
`WeakSet` এর বৈশিষ্ট্য:

- এটি `Set` এর সাথে সদৃশপূর্ণ, তবে `WeakSet` এ প্রিমিটিভ টাইপ ডাটা সংরক্ষণ করা যায় না শুধুমাত্র অবজেক্ট সংরক্ষন করা যায়।
- যতক্ষন পর্যন্ত কোন অবজেক্ট রিচেবল থাকে ততক্ষন অবজেক্টটি সেট এর মধ্যে উপস্থিত থাকবে, অন্যথায় ঐ অবজেক্টের ডাটা স্বয়ংক্রিয়ভাবে মুছে যাবে।
- `Set` এর মত, এর `add`, `has` এবং `delete` মেথড আছে, তবে ইটারেশন মেথড বা প্রপার্টি `size`, `keys()` নেই।

"weak" এর কারণে এটিকে আমরা অতিরিক্ত ডাটা সংরক্ষনের জন্য ব্যবহার করতে পারি। তবে যেকোন ধরণের ডাটার জন্য না, তার পরিবর্তে "yes/no" এই ধরণের তথ্য বুঝাতে। কোন একটি অবজেক্ট `WeakSet` এর এলিমেন্ট হওয়া দ্বারা এর সম্পর্কে কোন কিছু বুঝায়।
=======
[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) and [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete), but not `size`, `keys()` and no iterations.

Being "weak", it also serves as additional storage. But not for arbitrary data, rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

উদাহরণস্বরূপ, আমরা `WeakSet` এর সাহায্যে ভিজিটেড ইউজারদের ট্র্যাক করব:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet will be cleaned automatically
```

<<<<<<< HEAD
`WeakMap` এবং `WeakSet` এর উল্লেখযোগ্য পার্থক্যটি হল এরা কোন ধরনের ইটারশন সাপোর্ট করে না, আবার এর সকল ডাটাকে অ্যাক্সেস করতে পারি না। এটি অসুবিধাজনক মনে হতে পারে, তবে `WeakMap/WeakSet` এর মূল কাজের জন্য এটি তেমন সমস্যা নই, যা আমাদের কন্টেক্সটের অবজক্টের মান সংরক্ষন করার সুবিধা দেয়।
=======
The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

## সারাংশ

<<<<<<< HEAD
`WeakMap` হল `Map` এর মত একটি কালেকশন যা কী(key) হিসেবে শুধুমাত্র অবজেক্ট সাপোর্ট করে এবং যতক্ষন অবজেক্টটি রিচেবল থাকবে ততক্ষন ঐ অবজেক্টের কী(key) `WeakMap` এ সংরক্ষিত থাকবে, আর যখন অবজেক্টটি আনরিচেবল হবে তখন স্বয়ংক্রিয়ভাবে কী(key) টি মুছে যাবে।

`WeakSet` হল `Set`এর মত একটি কালেকশন সেট এর এলিমেন্ট হিসেবে শুধুমাত্র অবজেক্ট সাপোর্ট করে এবং যতক্ষন অবজেক্টটি রিচেবল থাকবে ততক্ষন ঐ অবজেক্টের মান `WeakSet` এ সংরক্ষিত থাকবে, আর যখন অবজেক্টটি আনরিচেবল হবে তখন স্বয়ংক্রিয়ভাবে এলিমেন্টটি মুছে যাবে।

`WeakMap` এবং `WeakSet` ইটারেশন মেথড বা প্রপার্টি সাপোর্ট করে না। শুধুমাত্র কিছু নির্দিষ্ট অপারেশন চালানো যায়।

`WeakMap` এবং `WeakSet` মূল অবজেক্টের সেকেন্ডারী ডাটা স্ট্রাকচার হিসেবে ব্যবহার করা হয়। যখন কোন অবজেক্ট মেমোরি হতে রিমুভ করা হয় তখন তা `WeakMap` বা `WeakSet` হতে স্বয়ংক্রিয়ভাবে মুছে যাবে।
=======
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

That comes at the cost of not having support for `clear`, `size`, `keys`, `values`...

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "primary" object storage. Once the object is removed from the primary storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

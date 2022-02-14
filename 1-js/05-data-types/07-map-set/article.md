
# Map এবং Set

এ পর্যন্ত আমরা নিম্নোক্ত কমপ্লেক্স ডাটা স্ট্রাকচার সমূহ শিখেছি:

- অবজেক্টস যা একটি কালেকশনকে কী/ভ্যালু আকারে সংরক্ষণ করে।
- অ্যারে যা একটি কালেকশনকে ইনডেক্সক্রমে সংরক্ষণ করে।

কিন্তু বাস্তবক্ষেত্রে এরা পর্যাপ্ত না। যার ফলে `Map` এবং `Set` নামের আরো দুটি ডাটা স্ট্রাকচার বিদ্যমান।

## Map

[Map](mdn:js/Map) হল `Object` এর মত কী/ভ্যালু আকারের একটি কালেকশন। তবে এর প্রধান পার্থক্যটি হল `Map` এ যেকোন টাইপের কী(Key) রাখা যায়।

এর মেথড এবং প্রপার্টিসমূহ হল:

- `new Map()` -- নতুন Map তৈরি।
- `map.set(key, value)` -- Map এ `key` অনুসারে নতুন একটি রেকর্ড সংযুক্ত করবে।
- `map.get(key)` --  Map এর কোন একটি রেকর্ড রিটার্ন করতে, যদি `key` টি Map এ না থাকে তাহলে `undefined` রিটার্ন করে।
- `map.has(key)` -- Map এ `key` বিদ্যমান থাকলে `true` রিটার্ন করবে অন্যথায় `false`।
- `map.delete(key)` -- Map এ `key` অনুসারে কোন একটি রেকর্ড ডিলিট করবে।
- `map.clear()` -- সম্পূর্ণ Map কালেকশনকে ডিলিট করবে।
- `map.size` -- Map এর টোটাল কালেকশন সংখ্যা রিটার্ন করে।

উদাহরণস্বরূপ:

```js run
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// অবজেক্টের ক্ষেত্রে কী হত মনে আছে? এক্ষেত্রে এটি স্ট্রিংয়ে কনভার্ট হত
// আর এখানে Map এটিকে অপরিবর্তনীয় রাখে, দুটির মূল পার্থক্য এটিই:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

এখানে আমরা দেখছি এটি কী(Key) কে অবজেক্টের মত স্ট্রিংয়ে রূপান্তর করে না। সুতরাং যেকোন ডাটা টাইপের কী রাখা সম্ভব।

```smart header=" `Map` এর মধ্যে `map[key]` ব্যবহার করা উচিত নই"
যদিও `map[key]` এটি কাজ করে, যেমন আমরা `map[key] = 2` সেট করতে পারি, এক্ষেত্রে ইঞ্জিন `map` কে plain JavaScript object হিসেবে বিবেচনা করে, সুতরাং এভাবে ব্যবহার করা উচিত নয়।

তার পরিবর্তে আমরা `map` মেথড সমূহঃ `set`, `get` ইত্যাদি ব্যবহার করবো।
```

**Map এ কী(Key) হিসেবে অবজেক্টও সেট করা যায়**

যেমন:

```js run
let john = { name: "John" };

// প্রতিটি ইউজারের ভিজিট এর গণনা সংরক্ষণ করি
let visitsCountMap = new Map();

// john হল কী(Key)
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

`Map` এর অন্যতম গুরুত্বপূর্ন সুবিধা হল আমরা অবজেক্টকে কী(Key) হিসেবে সংরক্ষন করতে পারি। আবার, `Object` এ আমরা কী(Key) হিসেবে একটি অবজেক্টকে সেট করতে পারি, তবে এটি অবজেক্ট কী(Key) হিসেবে কাজ করবে না।

চলুন দেখা যাক:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // একটি অবজেক্ট

visitsCountObj[john] = 123; // কী হিসেবে একটি অবজেক্ট সেট করছি

*!*
// এটি এভাবে সেট হয়
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

যেহেতু `visitsCountObj` একটি অবজেক্ট, এটি কোন একটি প্রপার্টি সেট হওয়ার সময় কী(Key) কে স্ট্রিংয়ে রূপান্তর করে নেয়, যেমন `john` অবজেক্টের স্ট্রিং কনভার্শন হবে `"[object Object]"`। যা আমাদের লক্ষ্য নয়।

```smart header="`Map` কীভাবে কী(Key) যাচাই করে"
দুটি কী(Key) কে যাচাই করতে, `Map` এই অ্যালগরিদমটি ব্যবহার করে [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)। এটি অনেকটা `===` এর মত, তবে এটি `NaN` এর ক্ষেত্রে ভিন্ন সাধারণত (`NaN` === `NaN`) এর মান হয় `false` তবে `Map` এ `NaN` কে যাচায় করতে পারে। সুতরাং কী(Key) হিসেবে `NaN` রাখা যাবে।

আমরা এই অ্যালগরিদমটি পরিবর্তন বা পরিমার্জন করতে পারব না।
```

````smart header="Chaining"
প্রতিটি `map.set` রিটার্ন করে বিদ্যমান `map` টিকে, তাই আমরা এদের চেইন করতে পারব:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## Map এর ইটারেশন

একটি `map` কে ইটারেট করতে ৩টি মেথড আছে:

- `map.keys()` -- কালেকশনের কী(Key) এর একটি ইটারেবল রিটার্ন করে।
- `map.values()` -- কালেকশনের ভ্যালু একটি ইটারেবল রিটার্ন করে।
- `map.entries()` -- কালেকশনের `[key, value]` এর একটি ইটারেবল রিটার্ন করে।

উদাহরণস্বরূপ:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// সকল কী কে ইটারেট (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// সকল ভ্যালুকে ইটারেট (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// সম্পূর্ণ কালেকশনকে [key, value] আকারে ইটারেট
for (let entry of recipeMap) { // এটি recipeMap.entries() এর মত
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="ইনশার্সন ক্রম হিসেবে মানগুলো দেখায়"
ইটারেশনের সময় মানগুলো দেখাবে যে ক্রমে ডাটা ইনসার্ট হয়েছিল সেভাবে। `Map` ক্রমটি সংরক্ষণ করে, এটি `Object` এর মত না।
```

এছাড়াও, `Map` এর `Array` এর মত বিল্ট-ইন `forEach` মেথড আছে:

```js
// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map from Object

`Map` ইনিশিয়ালাইজের সময় আমরা একটি অ্যারে (বা যেকোন ইটারেটর) key/value আকারে সেট করতে পারি, যেমন:

```js run
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

যদি আমরা কোন একটি `Object` হতে `Map` কে ইনিশিয়ালাইজ করতে চায়, সেক্ষেত্রে আমরা এই মেথডটি [Object.entries(obj)](mdn:js/Object/entries) ব্যবহার করতে পারি, কেননা এটি key/value আকারে একটি অ্যারে রিটার্ন করে।

সুতরাং আমরা `Object` হতে `Map` কে এভাবে তৈরি করতে পারি:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

এখানে, `Object.entries` রিটার্ন করে: `[ ["name","John"], ["age", 30] ]`। যা একটি key/value অ্যারে।


## Object.fromEntries: Map হতে Object এ রূপান্তর

আমরা দেখেছি কিভাবে `Object` হতে `Object.entries(obj)` এর সাহায্যে `Map` তৈরি করা যায়।

`Object` এর একটি মেথড আছে `Object.fromEntries` যা এর উল্টোটা করে: অর্থাৎ একটি `[key, value]` অ্যারেকে `Object` এ রূপান্তর করে:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

আমরা `Map` কে `Object` এ রূপান্তর করতে `Object.fromEntries` ব্যবহার করতে পারি।

যেমন আমরা কোন একটি ডাটা সংরক্ষণ করছি `Map` এ, কিন্তু সার্ভারে বা অন্য কোন থার্ড পার্টি কোডে আমাদের ডাটা পাস করতে পারি `Object` হিসেবে।

এখানে দেখুন:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // একটি Object (*)
*/!*

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

`map.entries()` রিটার্ন করে একটি key/value ইটারেবল, যার রূপটা হল `Object.fromEntries` এর মত।

আমরা `(*)` লাইনটিকে আরো ছোট করে লিখতে পারি:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

এটিও কাজ করবে, কেননা `Object.fromEntries` আর্গুমেন্ট হিসেবে একটি key/value ইটারেবল নেয়। অ্যারে হতে হবে এমন বাধ্যবাধকতা নেই। এবং `map` রিটার্ন করে `map.entries()` এর মত key/value ইটারেবল। সুতরাং আমরা `map` এর মত একটি `Object` পায়।

## Set

`Set` একটি বিশেষ কালেকশন - "ভ্যালুর সেট" (কী(Key) ছাড়া), যেখানে একটি ভ্যালু শুধুমাত্র একবার থাকবে।

এটির মেথডগুলো হল:

- `new Set(iterable)` -- সেট তৈরি, যদি কোন একটি `iterable` (অ্যারেও হতে পারে) আর্গুমেন্ট হিসেবে পাস করা হয়, তাহলে ইটারেবল এর ভ্যালুগুলো সেট এর ভ্যালু হবে।
- `set.add(value)` -- `value` টি সংযুক্ত করবে, বিদ্যমান সেটকে রিটার্ন করে।
- `set.delete(value)` -- `value` টি রিমুভ করবে, যদি `value` রিমুভড হয় তাহলে `true` অন্যথায় `false` রিটার্ন করবে।
- `set.has(value)` -- Set এ `value` বিদ্যমান থাকলে রিটার্ন করবে `true` অন্যথায় `false`।
- `set.clear()` -- সম্পূর্ণ Set এর কালেকশনকে রিমুভড করে।
- `set.size` -- Set এর টোটাল কালেকশন সংখ্যা রিটার্ন করে।

`Set` এর প্রধান সুবিধাটি হল `set.add(value)` এ একই ভ্যালু একের অধিক সংরক্ষন হয় না। যার ফলে `Set` এর প্রতিটি `value` হয় স্বতন্ত্র।

যেমন, আমাদের একটি ভিজিটর কাউন্ট সিস্টেম আছে, এবং আমরা সবার ভিজিট সংরক্ষণ করতে চায়। কিন্তু একজনকে শুধুমাত্র একবার কাউন্ট করবে।

এক্ষেত্রে `Set` এর সাহায্যে এটি করতে পারব:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// ভিজিট, একই ইউজার একাধিকবার আসতে পারে
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// `Set` এর প্রতিটি `value` স্বতন্ত্র
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

একটি ইউনিক অ্যারের জন্য `Set` ব্যবহার করা যেতে পারে, অন্যথায় ডুপ্লিকেট ভ্যালু এড়াতে আমাদের প্রতিবার [arr.find](mdn:js/Array/find) ব্যবহার করা লাগবে। তবে এটির পারফরম্যান্স `Set` এর তুলনায় অনেক খারাপ, কেননা প্রতিবার এলিমেন্ট সংযুক্ত করার আগে আমাদের অ্যারেটিকে ইটারেট করা লাগে এবং যাচাই করা লাগে ভ্যালুটি আছে কিনা। এক্ষেত্রে `Set` ইন্টারনালি ইউনিক ভ্যালু যাচায় করে।

## Set এ ইটারেশন

আমরা `Set` কে `for..of` বা `forEach` এর সাহায্যে ইটারেট করতে পারি:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

একটি মজার ব্যাপার লক্ষ্য করুন। কলব্যাকে আমরা ৩টি আর্গুমেন্ট পাস করছি `value`, `valueAgain`, `set` এখানে ২য় আর্গুমেন্ট `valueAgain` টিতে `value` পুনরায় পাস হচ্ছে। আসলে ১ম ও ২য় আর্গুমেন্টের মান একই।

`Map` এর সাথে সামঞ্জস্য রাখতে `forEach` এর কলব্যাকে ৩টি আর্গুমেন্ট পাস হয়। যদিও দেখতে কিছুটা অদ্ভুত তবে `Map` কে `Set` এ প্রতিস্থাপন করতে এটি সহায়তা করে বা এর উল্টোটা করতে।

`Map` এর মত `Set` ও কিছু ইটারেটর মেথড সাপোর্ট করে:

- `set.keys()` -- কালেকশনের ভ্যালু এর একটি ইটারেবল রিটার্ন করে
- `set.values()` -- `set.keys()` এর মত, `Map` এর সাথে সামঞ্জস্য রাখতে এটি ইমপ্লিমেন্ট করা হয়েছে
- `set.entries()` -- কালেকশনের `[key, value]` এর একটি ইটারেবল রিটার্ন করে, এটিও `Map` এর সাথে সামঞ্জস্য রাখতে এটি ইমপ্লিমেন্ট করা হয়েছে।

## সারাংশ

`Map` -- হল key/value এর কালেকশন

মেথডস এবং প্রপার্টি:

- `new Map()` -- নতুন Map তৈরি।
- `map.set(key, value)` -- Map এ নতুন একটি রেকর্ড সংযুক্ত করতে।
- `map.get(key)` --  Map এর কোন একটি রেকর্ড রিটার্ন করতে, যদি `key` টি Map এ না থাকে তাহলে `undefined` রিটার্ন করে।
- `map.has(key)` -- Map এ `key` বিদ্যমান থাকলে রিটার্ন করবে `true` অন্যথায় `false`।
- `map.delete(key)` -- Map এর কোন একটি রেকর্ড ডিলিট করতে।
- `map.clear()` -- সম্পূর্ণ Map কালেকশনকে ডিলিট করতে।
- `map.size` -- Map এর টোটাল কালেকশন সংখ্যা রিটার্ন করে।

রেগুলার `Object` এর সাথে পার্থক্য:

- যেকোন ডাটা টাইপ কী হতে পারে এমনকি অবজেক্টেও।
- এছাড়াও অতিরিক্ত কিছু মেথড এবং `size` প্রপার্টি।

`Set` -- স্বতন্ত্র ভ্যালু এর কালেকশন।

মেথডস এবং প্রপার্টি:

- `new Set(iterable)` -- সেট তৈরি, যদি কোন একটি `iterable` (অ্যারেও হতে পারে) আর্গুমেন্ট হিসেবে পাস করা হয়, তাহলে ইটারেবল এর ভ্যালুগুলো সেট এর ভ্যালু হবে।
- `set.add(value)` -- `value` টি সংযুক্ত করবে, বিদ্যমান সেটকে রিটার্ন করে।
- `set.delete(value)` -- `value` টি রিমুভ করবে, যদি `value` রিমুভড হয় তাহলে `true` অন্যথায় `false` রিটার্ন করবে।
- `set.has(value)` -- Set এ `value` বিদ্যমান থাকলে রিটার্ন করবে `true` অন্যথায় `false`।
- `set.clear()` -- সম্পূর্ণ সেটের কালেকশনকে রিমুভড করে।
- `set.size` -- Set এর টোটাল কালেকশন সংখ্যা রিটার্ন করে।

`Map` এবং `Set` সর্বদায় ইনশার্সন অর্ডার অনুযায়ী ইটারেট হবে, সুতরাং আমরা বলতে পারি এই কালেকশন সর্বদা একই ক্রমে থাকে, এবং আমরা এদের সরাসরি পুনরায় সাজাতে পারব না তাদের ক্রমতালিকা অনুযায়ী।

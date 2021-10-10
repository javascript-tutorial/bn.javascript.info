
# প্রপার্টি ফ্ল্যাগ এবং ডেস্ক্রিপ্টর

আমরা জানি, অবজেক্টে প্রপার্টি এবং ভ্যালু থাকে।

পূর্বের অধ্যায়গুলোতে আমরা শিখেছি প্রপার্টি হল "key-value" এর একটি জোড়া। তবে জাভাস্ক্রিপ্ট প্রপার্টি আরো বেশি ফ্লেক্সিবল এবং শক্তিশালী।

এই অধ্যায়ের এই অনুচ্ছেদে আমরা প্রপার্টির কনফিগারেশন সম্পর্কে জানব, পরবর্তী অধ্যায়ে getter/setter ফাংশন নিয়ে জানব।

## প্রপার্টি ফ্ল্যাগ

অবজেক্ট প্রপার্টিতে **`value`** এর পাশাপাশি আরো তিনটি বিশেষ অ্যাট্রিবিউট আছে এদের বলা হয় ফ্ল্যাগ:

- **`writable`** -- `true` হলে ভ্যালু পরিবর্তন করা যেতে পারে, অন্যথায় এটি শুধুমাত্র রিড-অনলি।
- **`enumerable`** -- `true` হলে এটি লুপের মধ্যে দেখাবে অন্যথায় লুপে প্রপার্টিটি দেখাবে না।
- **`configurable`** -- `true` হলে প্রপার্টি পরিবর্তন বা ডিলিট করা যায়, অন্যথায় করা যাবে না।

এইসব আমরা এখনো দেখিনি, কেননা সাধারণ নিয়মে কোন প্রপার্টি  তৈরি করার সময় এদের প্রয়োজন হয় না, এরা ডিফল্ট `true` থাকে। তবে আমরা এদের পরিবর্তন করতে পারি।

প্রথমত, চলুন কোন প্রপার্টির ফ্ল্যাগ কীভাবে দেখা যায় তা দেখি।

এই মেথডটি কোন একটি প্রপার্টির সকল তথ্য দেখাবে [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor)।

লিখার নিয়ম:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: যে অবজেক্ট এর প্রপার্টির মান জানতে চাই

`propertyName`
: প্রপার্টির নাম

রিটার্নকৃত মানকে বলা হয় "প্রপার্টি ডেস্ক্রিপ্টর"। এটি ঐ প্রপার্টির মান এবং ফ্ল্যাগগুলো দেখাবে।

যেমন:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

নিজস্ব ফ্ল্যাগ সেট করতে ব্যবহার করি [Object.defineProperty](mdn:js/Object/defineProperty)।

সিনট্যাক্স হল:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: অবজেক্ট এবং প্রপার্টির নাম

`descriptor`
: প্রপার্টি ডেস্ক্রিপ্টর একটি অবজেক্ট নেই।

যেটি অবজেক্টে প্রপার্টি ইতোমধ্যে বিদ্যমান থাকে, তাহলে `defineProperty` ফ্ল্যাগ সমূহকে আপডেট করবে। অন্যথায়, এটি ভ্যালু এবং ফ্ল্যাগ অনুযায়ী প্রপার্টি তৈরি করবে, আর যদি ফ্ল্যাগ পাস করা না হয় তাহলে ফ্ল্যাগসমূহের মান `false` ধরে নেই।

যেমন, এখানে `name` প্রপার্টির জন্য ফ্ল্যাগসমূহের মান `false` সেট হবে:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

সাধারণ নিয়মে `user.name` অবজেক্টের প্রপার্টি অ্যাসাইন করা আর উপরেরটির মধ্যে পার্থক্য হল এখানে সকল ফ্ল্যাগ এর মান falsy আর সাধারণ নিয়মে ফ্ল্যাগসমূহের মান `true` সেট হয়।

চলুন আরো কিছু উদাহরণের মাধ্যমে বিস্তারিত দেখি।

## অপরিবর্তিনীয়

চলুন `user.name` কে আমরা `writable` ফ্ল্যাগের মাধ্যমে কনস্ট্যান্ট হিসেবে সেট করি:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

এখন আমাদের `name` প্রপার্টিকে অন্য কোন অপারেশনের মাধ্যমে আর পরিবর্তন করা যাবে না, যতক্ষণ না আমরা `defineProperty` এর মাধ্যমে ফ্ল্যাগটিকে পুনরায় পরিবর্তন করব।

```smart header="শুধুমাত্র strict mode এ এরর দেখাবে"
non-strict mode এ কোন এরর দেখাবে না। তবে আমাদের রি-অ্যাসাইন অপারেশনও এক্সিকিউট হবে না। এক্ষেত্রে ফ্ল্যাগ ভায়োলেট এর এররগুলো শুধু উপেক্ষা করে যাবে।
```

আগের উদাহরনণটি পুনরায় দেখুন, তবে এখানে প্রপার্টি তৈরি করা হচ্ছে `defineProperty` এর মাধ্যমে:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // আমরা ফ্ল্যাগের মান false এভাবেও সেট করতে পারি। এখানে অন্য দুটি ফ্ল্যাগ true করার মাধ্যমে writable কে false সেট করা হচ্ছে
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
```

## অগণনাযোগ্য

এখন চলুন `user` এ একটি `toString` মেথড লিখি `toString`।

সাধারণত বিল্ট-ইন অবজেক্টসমূহে `toString` মেথড থাকে, তবে এটি non-enumerable। অর্থাৎ `for..in` লুপে এটি দেখায় না। কিন্তু যদি আমরা আমাদের নিজস্ব অবজেক্টে `toString` লিখি, তাহলে এটি লুপে দেখাবে, যেমন:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// ডিফল্টভাবে উভয়ই প্রপার্টির নাম লুপে দেখাবে
for (let key in user) alert(key); // name, toString
```

যদি আমরা এটি দেখাতে না চাই, তাহলে `enumerable:false` ফ্ল্যাগ সেট করব। তাহলে এটি বিল্ট-ইন অবজেক্টের মত `for..in` লুপে দেখাবে না:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// এখন toString এর নাম দেখাবে না:
*/!*
for (let key in user) alert(key); // name
```

Non-enumerable প্রপার্টি সমূহ `Object.keys` এও লিস্টেড হবে না:

```js
alert(Object.keys(user)); // name
```

## Non-configurable

এই non-configurable ফ্ল্যাগটি (`configurable:false`) কিছু বিল্ট-ইন অবজেক্টের প্রপার্টির জন্য সেট করা আছে।

non-configurable ফ্ল্যাগ সেট করা হলে প্রপার্টিটি ডিলিট করা সম্ভব না।

যেমন, `Math.PI` হল non-writable, non-enumerable এবং non-configurable:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
সুতরাং আপনি চাইলেও `Math.PI` এর মান পরিবর্তন বা ডিলিট করতে পারবেন না।

```js run
Math.PI = 3; // Error

// delete Math.PI এটিও কাজ করবে না
```

কোন একটি প্রপার্টিকে non-configurable হিসেবে শুধুমাত্র একবার সেট করতে পারবেন। আমরা পুনরায় এটিকে `defineProperty` এর মাধ্যমে পরিবর্তন করতে পারব না।

সুস্পষ্ট ভাবে বলতে গেলে non-configurability এর জন্য `defineProperty` এর মধ্যে কিছু বিধিনিষেধ তৈরি হয়:
1. `configurable`, `enumerable`, `writable` ফ্ল্যাগ কে `false` হতে `true` সেট করা যাবে না।
2. `get/set` দ্বারা পরিবর্তন করা যাবে না।

এখানে `user.name` non-configurable, তবে আমরা চাইলে একে রি-অ্যাসাইন করতে পারি:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // works fine
delete user.name; // Error
```

এবং এখানে আমরা `user.name` কে যদি একেবারে কনস্ট্যান্ট করে দিতে চাই:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// user.name এর ফ্ল্যাগ বা ভ্যালু আর পরিবর্তন করা সম্ভব না
// নিচের কোনটিই কাজ করবে না:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```


## Object.defineProperties

আরেকটি মেথড আছে যেটি দ্বারা একবারে একাধিক প্রপার্টি সেট করা যায় [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties)।

সিনট্যাক্সটি হল:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

যেমন:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

সুতরাং আমরা চাইলে একবারে একাধিক প্রপার্টি সেট করতে পারি।

## Object.getOwnPropertyDescriptors

অবজেক্টের সকল প্রপার্টির বর্ণনা পেতে আমরা ব্যবহার করতে পারি এই মেথডটি ব্যবহার করে [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors)।

এই `Object.getOwnPropertyDescriptors` এবং `Object.defineProperties` মেথডের এর মাধ্যমে আমরা প্রপার্টির ফ্ল্যাগ সহ ক্লোন অবজেক্ট তৈরি করতে পারি:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

সাধারণত আমরা কোন অবজেক্টকে ক্লোন করি এভাবে:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...কিন্তু এটি ফ্ল্যাগসমূহকে কপি করবে না। সুতরাং আমরা ফ্ল্যাগসহ ক্লোন করতে ব্যবহার করব `Object.defineProperties`।

আরেকটি পার্থক্য হল `for..in` সাধারণত সিম্বলিক প্রপার্টিসমূহ উপেক্ষা করে, তবে `Object.getOwnPropertyDescriptors` এর জন্য সকল প্রপার্টি (সিম্বল প্রপার্টি গুলো সহ) রিটার্ন হয়।

## গ্লোবালি কোন অবজেক্টকে সিল করা

প্রপার্টির ডেস্ক্রিপ্টর সকল আলাদা আলাদা প্রপার্টির জন্য কাজ করে।

এছাড়াও আরো কিছু মেথড আছে যাদের সাহায্যে *সম্পূর্ণ* অবজেক্টের জন্য কাজ করতে পারি:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: অবজেক্টে নতুন কোন প্রপার্টির সংযোজন করা যাবে না।

[Object.seal(obj)](mdn:js/Object/seal)
: সকল প্রপার্টিতে `configurable: false` সেট করতে। ফলে কোন প্রপার্টি ডিলিট বা সংযোজন করা যাবে না।

[Object.freeze(obj)](mdn:js/Object/freeze)
: কোন প্রপার্টি ডিলিট, সংযোজন, পরিবর্তন এড়াতে। সকল প্রপার্টিতে `configurable: false, writable: false` সেট হয়।

এছাড়াও অবজেক্টের অবস্থা যাচাইয়ের জন্যও কিছু মেথড আছে:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: যদি নতুন প্রপার্টির সংযোজন বন্ধ থাকে তাহলে `false` রিটার্ন করবে অন্যথায় `true`।

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: যদি কোন প্রপার্টি ডিলিট বা সংযোজন বন্ধ থাকে তাহলে `true` রিটার্ন করবে, এবং সকল প্রপার্টিতে `configurable: false` ফ্ল্যাগ সেট করা থাকে।

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: যদি কোন প্রপার্টি ডিলিট, সংযোজন, পরিবর্তন করার অপশন বন্ধ থাকে তাহলে `true` রিটার্ন করবে, এবং সকল প্রপার্টিতে `configurable: false, writable: false` ফ্ল্যাগ সেট করা থাকে।

তবে বাস্তবক্ষেত্রে এই মেথডসমূহ তেমন ব্যবহার করা হয় না।

# প্রটোটাইপল ইনহেরিটেন্স

প্রোগ্রামিংয়ের এ প্রায় সময় আমরা রিইউজেবল কোডবেস তৈরির জন্য অন্য কোডকে এক্সটেন্ড করি।

যেমন, আমাদের একটি প্রপার্টি এবং মেথড সম্বলিত `user` অবজেক্ট আছে, এবং আমরা এর উপর ভিত্তি করে আলাদা কিছু বৈশিষ্ট্যের জন্য `admin` এবং `guest` তৈরি করতে চাই। এজন্য নতুন করে `user` এর কোডকে পুনরায় `admin` এবং `guest` এর মধ্যে কপি-পেস্ট করা কোন ভাল বুদ্ধি না, তার চেয়ে যদি আমরা কোন ভাবে `user` কে এক্সটেন্ড করতে পারি সেক্ষেত্রে একটি রিইউজিবল কোড বেস তৈরি করতে পারব।

এক্ষেত্রে আমাদের জাভাস্ক্রিপ্টের *Prototypal inheritance* ফিচারটি সম্পর্কে জানা লাগবে।

## [[Prototype]]

জাভাস্ক্রিপ্টে অবজেক্টে একটি হিডেন প্রপার্টি আছে `[[Prototype]]` (স্পেসিকেশনে এটিকে এ নাম দেয়া হয়েছে), যেটি `null` অথবা কোন অবজেক্টকে রেফারেন্স করে। এ অবজেক্টকে বলা হয় প্রটোটাইপ:

![prototype](object-prototype-empty.svg)

<<<<<<< HEAD
যখন আমরা কোন `object` এর প্রপার্টি পড়তে চাই, এবং যদি এটি ঐ `object` এ অনুপস্থিত থাকে, তখন জাভাস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে প্রটোটাইপে অনুসন্ধান করে। একে বলা হয় "প্রটোটাইপল ইনহেরিটেন্স"। আমরা বিভিন্ন উদাহরণের সাহায্যে এই ব্যাপারটি শিখব, এছাড়াও আরো অনেক ল্যাংগুয়েজে এই ধরণের ফিচার সাপোর্ট করে।
=======
When we read a property from `object`, and it's missing, JavaScript automatically takes it from the prototype. In programming, this is called "prototypal inheritance". And soon we'll study many examples of such inheritance, as well as cooler language features built upon it.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

`[[Prototype]]` এটি অবজেক্টের ইন্টারনাল এবং হিডেন প্রপার্টি, তবে বিভিন্ন ভাবে আমরা একে অ্যাক্সেস করতে পারি।

তারমধ্যে একটি বিশেষ প্রপার্টি হল `__proto__`, এর সাহায্যে আমরা নিম্নোক্ত উপায়ে প্রটোটাইপ রেফারেন্স হিসেবে অন্য অবজেক্টকে সেট করতে পারি:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
*/!*
```

<<<<<<< HEAD
এখন আমরা যদি `rabbit` এর কোন প্রপার্টি পড়তে চাই, এবং এটি যদি এর মধ্যে অনুপস্থিত থাকে, তাহলে জাভাস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে `animal` এ একে অনুসন্ধান করে।

যেমন:
=======
Now if we read a property from `rabbit`, and it's missing, JavaScript will automatically take it from `animal`.

For instance:
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

```js
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal; // (*)
*/!*

// এখন আমরা rabbit এর মধ্যে দুইটি প্রপার্টিই অ্যাক্সেস করতে পারব:
*!*
alert( rabbit.eats ); // true (**)
*/!*
alert( rabbit.jumps ); // true
```

<<<<<<< HEAD
এখানে `(*)` চিহ্নিত লাইনে `animal` কে `rabbit` এর প্রটোটাইপ হিসেবে সেট করা হয়েছে।
=======
Here the line `(*)` sets `animal` to be the prototype of `rabbit`.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

এবং, যখন আমরা `alert` এ `rabbit.eats` কে পড়তে চাই `(**)` চিহ্নিত লাইনটি দেখুন, এটি দেখে `rabbit` এর মধ্যে এটি এটি অনুপস্থিত, তখন জাভাস্ক্রিপ্ট  `[[Prototype]]` রেফারেন্সের নিয়ম অনুসারে `animal` এর মধ্যে ঐ প্রপার্টি খুঁজে (নিচের ছবিটি দেখুন):

![](proto-animal-rabbit.svg)

এখানে আমরা বলতে পারি "`animal` হল `rabbit` এর প্রটোটাইপ" অথবা "`animal` থেকে `rabbit` প্রটোটাইপল ইনহেরিট হয়েছে"।

সুতরাং যদি `animal` এ একাধিক ব্যবহারযোগ্য প্রপার্টি এবং মেথড থাকে, তাহলে তাদের স্বয়ংক্রিয়ভাবে `rabbit` এর মেথড ও প্রপার্টি হিসেবে অ্যাক্সেস করা যাবে। এদের ইনহেরিটেড প্রপার্টি বলে।

সুতরাং যদি `animal` এ কোন মেথড থাকে তাহলে এটিকে `rabbit` থেকেও কল করা যাবে:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk কে প্রটোটাইপ হতে সংগ্রহ করা হয়েছে
*!*
rabbit.walk(); // Animal walk
*/!*
```

মেথডটি স্বয়ংক্রিয়ভাবে প্রটোটাইপ হতে অ্যাক্সেস হবে, নিচের ছবিটি দেখুন:

![](proto-animal-rabbit-walk.svg)

আমরা চাইলে প্রটোটাইপ চেইনও তৈরি করতে পারি:

```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
*!*
  __proto__: animal
*/!*
};

let longEar = {
  earLength: 10,
*!*
  __proto__: rabbit
*/!*
};

// এখানে walk প্রটোটাইপ চেইন হিসেবে animal হতে অ্যাক্সেস হবে
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (rabbit হতে অ্যাক্সেস করে)
```

![](proto-animal-rabbit-chain.svg)

<<<<<<< HEAD
এখন আমরা যদি `longEar` হতে কোন কিছু পড়তে চাই এবং এটি যদি তার মধ্যে অনুপস্থিত থাকে, জাভাস্ক্রিপ্ট প্রথমে `rabbit` এর মধ্যে খুঁজবে এবং তারপর `animal` এ খুঁজবে।

তবে এর দুটি সীমাবদ্ধতা রয়েছে:

1. আমরা রেফারেন্সকে চক্রকারে সেট করতে পারব না। এক্ষেত্রে চক্রকারে `__proto__` এ কোন অবজেক্ট অ্যাসাইন করতে চাইলে জাভাস্ক্রিপ্ট একটি এরর দিবে।
2. `__proto__` এর মান কেবলমাত্র `null` এবং অবজেক্ট হতে পারবে, অন্য টাইপগুলো ইগনোর হবে।
=======
Now if we read something from `longEar`, and it's missing, JavaScript will look for it in `rabbit`, and then in `animal`.

There are only two limitations:
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

যদিও এটি সুস্পষ্ট, কিন্তু এখানে শুধুমাত্র একটি `[[Prototype]]` হতে পারে। একটি অবজেক্ট একই সাথে দুটি অবজেক্টকে ইনহেরিট করতে পারে না।


```smart header="`__proto__` is a historical getter/setter for `[[Prototype]]`"
<<<<<<< HEAD
সাধারণত নতুন ডেভলাপাররা এই দুটির মধ্যে পার্থক্য না জেনে রাখায় প্রায় এই সাধারন ভুলটি করে।

দয়া করে মনে রাখবে `__proto__` ইন্টারনাল প্রপার্টি `[[Prototype]]` এর মত না। এটি `[[Prototype]]` এর একটি getter/setter। পরবর্তী অধ্যায়গুলোতে আমরা বিস্তারিত জানব, আপাতত এটি মনে রাখুন, যেহেতু এখনো আমরা জাভাস্ক্রিপ্টের ল্যাংগুয়েজ নিয়ে পড়াশোনা করছি।

তবে `__proto__` প্রপার্টি হল পুরনো জাভাস্ক্রিপ্টের একটি ফিচার। তবে মডার্ন জাভাস্ক্রিপ্টে আমাদের কিছু মেথড আছে `Object.getPrototypeOf/Object.setPrototypeOf` যার মাধ্যমে আমরা এই ধরণের কাজ করতে পারি।

স্পেসিফিকেশন অনুযায়ী, `__proto__` শুধুমাত্র ব্রাউজারের জন্য সাপোর্ট করে। তবে অন্যান্য এনভায়রনমেন্টের জন্যও `__proto__` সাপোর্ট করে, সুতরাং আমরা এদের নিশ্চিন্তে ব্যবহার করতে পারব।

যেহেতু `__proto__` নোটেশন কিছুটা সুস্পষ্ট, সামনের উদাহরণগুলোতেও আমরা এটি ব্যবহার করব।
```

## প্রটোটাইপ অ্যাসাইনিং এবং ডিলিটিং সাপোর্ট করে না
=======
It's a common mistake of novice developers not to know the difference between these two.

Please note that `__proto__` is *not the same* as the internal `[[Prototype]]` property. It's a getter/setter for `[[Prototype]]`. Later we'll see situations where it matters, for now let's just keep it in mind, as we build our understanding of JavaScript language.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead that get/set the prototype. We'll also cover these functions later.

By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we're quite safe using it.

As the `__proto__` notation is a bit more intuitively obvious, we use it in the examples.
```

## Writing doesn't use prototype
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

প্রটোটাইপ শুধুমাত্র কোন প্রপার্টি বা মেথড পড়তে ব্যবহৃত হয়।

অ্যাসাইন/ডিলিট অপারেশনগুলো সরাসরি অবজেক্টের সাথে কাজ করে।

নিচের উদাহরণে দেখুন আমরা `rabbit` এর মধ্যে `walk` মেথড লিখেছি:

```js run
let animal = {
  eats: true,
  walk() {
    /* এই মেথডটি rabbit এর জন্য ব্যবহার হবে না */
  }
};

let rabbit = {
  __proto__: animal
};

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

এখানে, `rabbit.walk()` সরাসরি `rabbit` অবজেক্টের মেথডকে কল করবে এবং একে এক্সিকিউট করবে, এখানে প্রটোটাইপ ব্যবহার হবে না:

![](proto-animal-rabbit-walk-2.svg)

তবে অ্যাক্সেসর প্রপার্টি সমূহ কিছুটা ব্যতিক্রম, এক্ষেত্রে ভ্যালু অ্যাসাইন করতে গেলে তা হ্যান্ডেল হয় `setter` ফাংশনের মাধ্যমে। এই ধরণের প্রপার্টি গুলো ফাংশনের মত কল হয়।

একারণে `admin.fullName` নিচের কোডের জন্য সঠিকভাবে কাজ করবে:

```js run
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith (*)

// setter কল হবে!
admin.fullName = "Alice Cooper"; // (**)

<<<<<<< HEAD
alert(admin.fullName); // Alice Cooper, পরিবর্তিত admin এর নাম
alert(user.fullName); // John Smith, অপরিবর্তিত কেননা user এর স্টেট protected
=======
alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8
```

এখানে `(*)` লাইনে `admin.fullName` হল `user` প্রটোটাইপ এর একটি getter প্রপার্টি, সুতরাং এটি কল হবে। এবং এই `(**)` লাইনে এটি প্রটোটাইপের একটি সেটার প্রপার্টি, তাই এটি কল হবে।

## "this" এর মান

উপরের উদাহরণটি দেখে আমাদের মনে একটি প্রশ্নের উদয় হয়: `set fullName(value)` এর মধ্যে `this` এর মান কি হবে? এবং `this.name` ও `this.surname` কোন অবজেক্টে `user` নাকি `admin` লিখা আছে?

সোজাভাবে বলতে গেলে: `this` এর মান প্রটোটাইপের জন্য প্রভাবিত হয় না।

**মেথডটি যেখানেই থাকুক না কেন অবজেক্টে বা প্রটোটাইপে `this` সর্বদা অবজেক্টকেই নির্দেশ করে**

সুতরাং, `admin.fullName=` এর জন্য `this` সর্বদা `admin` কে নির্দেশ করবে, `user` কে না।

এটি একটি গুরুত্বপূর্ণ ব্যাপার, মনে করুন আমাদের একটি অনেক মেথড সম্বলিত কমপ্লেক্স অবজেক্ট আছে, এবং একে ইনহেরিট করে নতুন একটি অবজেক্ট তৈরি করা হল। এখন আমরা যদি আমাদের অবজেক্টটিকে কল করি, এবং তার বিভিন্ন মেথডের সাহায্যে বিভিন্ন স্টেট পরিবর্তন করি তাহলে এক্ষেত্রে অবজেক্টের স্টেট পরিবর্তন হবে, প্রটোটাইপ অবজেক্টের কোন পরিবর্তন হবে না।

মনে করুন, এখানে `animal` এ একটি মেথড আছে, এবং `rabbit` এটিকে ব্যবহার করে।

`rabbit` অবজেক্টের মাধ্যমে `rabbit.sleep()` কে কল করে একটি প্রপার্টি সেট করছি `this.isSleeping`:

```js run
// মেথডগুলো animal এ লিখা হয়েছে
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// এখান থেকে একে সেট করা হল rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (প্রটোটাইপে এই ধরণের কোন অবজেক্ট পাবে না)
```

ফলাফলটি দেখতে এমন:

![](proto-animal-rabbit-walk-3.svg)

এখন যদি আমাদের অন্য অবজেক্ট থাকে যেমন `bird`, `snake`, ইত্যাদি, যা `animal` থেকে ইনহেরিট হয়, তারাও `animal` এর মেথডসমূহ অ্যাক্সেস করতে পারবে। কিন্তু `this` রেফার করবে আমাদের ঐ অবজেক্টকেই এক্ষেত্রে `animal` এর স্টেট অপরিবর্তিত থাকবে। সুতরাং আমরা যখন প্রটোটাইপ অবজেক্টে `this` কে কল করি, এটি ঐ অবজেক্টের স্টেটকে নির্দেশ করবে।

ফলশ্রুতিতে, মেথডগুলো পুনরায় ব্যবহারযোগ্য, কিন্তু প্রটোটাইপ অবজেক্টের স্টেট পরিবর্তন হয় না।

## for..in লুপ

`for..in` লুপ ইটারেটের সময় ইনহেরিটেড প্রপার্টিকেও ইটারেট করে।

যেমন:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// তবে Object.keys শুধুমাত্র object এর নিজস্ব কী রিটার্ন করে
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// for..in লুপ নিজস্ব এবং ইনহেরিটেড key কে দেখায়
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

<<<<<<< HEAD
এছাড়াও যদি আমরা চাই ইনহেরিটেড প্রপার্টিকে বাদ দিতে, তার জন্য একটি বিল্ট-ইন মেথড আছে [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): এটি `obj` এর নিজস্ব প্রপার্টির `key` এর জন্য `true` রিটার্ন করে।
=======
If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method [obj.hasOwnProperty(key)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

সুতরাং আমরা নিম্নোক্তভাবে কোন অবজেক্টকে ফিল্টার করতে পারি:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`); // Our: jumps
  } else {
    alert(`Inherited: ${prop}`); // Inherited: eats
  }
}
```

এখানে ইনহেরিটেন্সটি এভাবে সম্পন্ন হয়: `rabbit` ইনহেরিট হয় `animal` থেকে, এবং এটি ইনহেরিট হয় `Object.prototype` থেকে (কেননা `animal` হল একটি লিটারেল অবজেক্ট `{...}`, সুতরাং এটি ডিফল্ট), এবং এটির প্রটোটাইপ হবে `null`:

![](rabbit-animal-object.svg)

নোট: আমাদের মনে একটি মজার প্রশ্ন আসতে পারে `rabbit.hasOwnProperty` কোথা থেকে আসল? যেহেতু এটি আমরা ডিফাইন করিনি। উপরের ছবিটি দেখলে দেখবেন `hasOwnProperty` আসলে `Object.prototype` হতে এসেছে। সোজাভাবে বলতে গেলে এটি ইনহেরিটেড মেথড।

...তাহলে কেন `hasOwnProperty` মেথডটি `for..in` লুপে `eats` এবং `jumps` এর মত দেখায়নি? কেননা আমরা তো জেনেছি `for..in` লুপে ইনহেরিটেড প্রপার্টিসমূহও অ্যাক্সেস হয়।

এর কারণ সহজ: এটি একটি `enumerable` প্রপার্টি। `Object.prototype` এর অন্যান্য প্রপার্টির মত, এটির জন্য `enumerable:false` ফ্ল্যাগ ব্যবহার করা হয়েছে। এবং `for..in` শুধুমাত্র `enumerable` প্রপার্টিকে অ্যাক্সেস করতে পারে। একারণে `Object.prototype` এর অন্যান্য প্রপার্টিসমূহও অ্যাক্সেসবল না।

```smart header="প্রায় সকল অবজেক্ট সম্পর্কিত মেথড সমূহ ইনহেরিটেড প্রপার্টিকে উপেক্ষা করে"
প্রায় সকল অবজেক্ট সম্পর্কিত মেথড সমূহ ইনহেরিটেড প্রপার্টিকে উপেক্ষা করে, যেমন `Object.keys`, `Object.values` এর ইনহেরিটেড প্রপার্টিকে উপেক্ষা করে।

এইগুলো শুধুমাত্র অবজেক্টের নিজের প্রপার্টি এবং মেথড নিয়ে কাজ করে। প্রটোটাইপের প্রপার্টিসমূহ এই মেথডসমূহের জন্য অগ্রাহ্য।
```

## সারাংশ

- জাভাস্ক্রিপ্টের প্রতিটি অবজেক্টে একটি লুকায়িত প্রপার্টি `[[Prototype]]` আছে যেটির মান হতে পারে একটি অবজেক্ট অথবা `null`।
- আমরা একে `obj.__proto__` এর মাধ্যমে অ্যাক্সেস করতে পারি(পুরনো জাভস্ক্রিপ্ট অনুযায়ী getter/setter ব্যবহার করতে পারি, তবে আরো পদ্ধতি আছে, যা আমরা সামনে দেখব)।
- `[[Prototype]]` দ্বারা রেফারেন্সকৃত অবজেক্টটিকে বলা হয় "prototype"।
- যখন আমরা কোন `obj` এর কোন মেথড বা প্রপার্টিকে অ্যাক্সেস করতে চাই, যদি এটি ঐ `obj` এ অনুপস্থিত থাকে, তাহলে তার প্রটোটাইপে অনুসন্ধান করে।
- অ্যাসাইন/ডিলিট অপারেশন সরাসরি মূল অবজেক্টের মধ্যে সংগঠিত হয়, এরা প্রটোটাইপ এর স্টেট ব্যবহার করে না (এদের setter এর বদলে ডাটা প্রপার্টি হিসেবে ধরে নিন)।
- যদি আমরা `obj.method()` কে কল করি, এবং এটি প্রটোটাইপের `method` কে অ্যাক্সেস করে, তাহলে `this` রেফার করে `obj` এর স্টেটকে। সুতরাং মেথড সমূহ যদিও ইনহেরিট হয় এরা অবজেক্টের স্টেটের সাথে কাজ করে।
- `for..in` লুপ নিজস্ব এবং ইনহেরিটেড উভয়ই প্রপার্টিকে ইটারেট করে। এছাড়া `Object` সম্পর্কিত অন্যান্য মেথড যেমন `Object.keys`, `Object.values` তে প্রটোটাইপের প্রপার্টি অ্যাক্সেস হয় না।

# সিম্বল টাইপ

<<<<<<< HEAD
অবজেক্টের স্পেসিফিকেশন অনুযায়ী আমরা জেনেছি প্রপার্টি কি(key) হতে পারে স্ট্রিং অথবা সিম্বল টাইপ। নাম্বার, বুলিয়ান বা অন্য কোন ধরণের প্রিমিটিভ টাইপ কি(key) হিসেবে রাখা যায় না, শুধুমাত্র স্ট্রিং অথবা সিম্বল এই দুটি টাইপ অ্যাক্সেপ্টবেল।

পূর্বের অনুচ্ছেদগুলোতে আমরা প্রপার্টি হিসেবে শুধুমাত্র স্ট্রিং ব্যবহার করেছি, এই অনুচ্ছেদে আমরা সিম্বল টাইপ কিভাবে ব্যবহার করা যায় এবং এর ব্যবহারের সুবিধা কি তা নিয়ে আলোচনা করব।
=======
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

## সিম্বল

"সিম্বল (symbol)" একটি ইউনিক আইডেন্টিটির নিশ্চয়তা প্রদান করে।

এই ধরণের টাইপ তৈরি করতে আমরা ব্যবহার করি `Symbol()`:

```js
<<<<<<< HEAD
// এখানে id হল একটি symbol
let id = Symbol();
```

তৈরির সময়, আমরা সিম্বলের একটি নাম প্রদান করি, যা ডিবাগিংয়ের জন্য সুবিধাজনক:
=======
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

```js
// এখানে id হল একটি Symbol যার নাম হল "id"
let id = Symbol("id");
```

<<<<<<< HEAD
Symbol আমাদের নিশ্চয়তা প্রদান করে এর মান হবে ইউনিক। যদি আমরা একই নাম দ্বারা একাধিক সিম্বল তৈরি করি, তাদের প্রত্যেকের মান হবে আলাদা। সিম্বলের প্রদানকৃত নামটি শুধুমাত্র একটি লেভেল।
=======
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

যেমন, এখানে আমরা এখানে একই নামের দুটি সিম্বল তৈরি করেছি -- কন্ডিশনালি এদের মান সমান হবে না:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

রুবি বা অন্য যেকোন ল্যাংগুয়েজের "symbols" এর সাথে এটিকে গুলিয়ে ফেলবেন না। জাভাস্ক্রিপ্টের সিম্বল আলাদা।

<<<<<<< HEAD
````warn header="Symbols স্বয়ংক্রিয়ভাবে স্ট্রিং এ কনভার্ট হয়না"
জাভস্ক্রিপ্টের বেশিরভাগ মান স্ট্রিংয়ে টাইপ কাস্টিং হতে পারে। যেমন `alert` প্রায় সবধরণের মানকে স্ট্রিংয়ে রূপান্তর করতে পারে। তবে সিম্বল অটো কনভার্ট হতে পারে না।
=======
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

যেমন, নিচের কোডটিতে `alert` এর জন্য এরর দেখাবে:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

এটি একটি ল্যাংগুয়েজ ডিজাইন, কেননা স্ট্রিং এবং সিম্বল মৌলিকভাবে আলাদা যার জন্য এদের নিজেদের মধ্যে পরিবর্তন গ্রহণযোগ্য নয়।

<<<<<<< HEAD
যদি আমরা কোন একটি সিম্বল দেখাতে চাই, তাহলে `.toString()` মেথডের মাধ্যমে দেখাতে পারি, এভাবে:
=======
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), এখন এটি কাজ করবে
*/!*
```

<<<<<<< HEAD
অথবা নাম জানতে `symbol.description`:
=======
Or get `symbol.description` property to show the description only:

>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "হিডেন" প্রপার্টি

<<<<<<< HEAD
সিম্বল অবজেক্টের মধ্যে একটি "hidden" প্রপার্টি রাখার সুবিধা প্রদান করে, যাতে অনিচ্ছাকৃত কোন প্রপার্টি অ্যাক্সেস বা ওভাররাইট করা না যায়।
=======

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

যেমন, মনে করুন আমরা একটি প্যাকেজ ডেভলাপ করতেছি এবং আমরা আর্গুমেন্ট হিসেবে একটি অবজেক্ট নিয়ে তার মধ্যে আমাদের লজিকগুলো ইমপ্লিমেন্ট করি, যেমন একটি `user` অবজেক্ট আছে, এখন এটি আমরা আমাদের প্যাকেজে আর্গুমেন্ট হিসেবে। এখন আমরা আমাদের সুবিধার জন্য এর একটি আইডেন্টিফায়ার সেট করতে চাই।

চলুন এর জন্য একটি সিম্বল প্রপার্টি ব্যবহার করি:

```js run
let user = { // মূল অবজেক্ট এর কোড
  name: "John"
};

let id = Symbol("id"); // আমাদের প্যাকেজের কোড

user[id] = 1;

alert( user[id] ); // এখন আমরা এর ডাটাকে সিম্বল কী(Key) দ্বারা অ্যাক্সেস করতে পারব
```

এটিতো আমরা চাইলে স্ট্রিং প্রপার্টি `"id"` দ্বারাও করতে পারতাম তার পরিবর্তে `Symbol("id")` ব্যবহার সুবিধাজনক কেন?

<<<<<<< HEAD
যেহেতু `user` অবজেক্টটি অন্য আরেকটি স্ক্রিপ্ট হতে এসেছে এবং ঐ কোডটিও যেহেতু `user` অবজেক্ট নিয়ে কাজ করে, আমরা চাইনা এর মধ্যে আমাদের আইডেন্টিফিকেশনের জন্য ব্যবহার করা প্রপার্টিটি অন্য স্ক্রিপ্টে অ্যাক্সেসবল হোক। এবং নিরাপত্তার খাতিরে এটি ভিন্ন স্ক্রিপ্টের জন্য অ্যাক্সেসবল হওয়াও উচিত নয়, সিম্বল ব্যবহার করায় আমরা এই ব্যাপারে নিশ্চিত থাকতে পারি সিম্বল ডাটাসমূহ এক স্ক্রিপ্টের সাথে অন্য স্ক্রিপ্টের মধ্যে আদান প্রদান হবে না।

এছাড়াও, মনে করুন মূল স্ক্রিপ্টে আইডেন্টিফিকেশনের জন্য `user` অবজেক্টে একই নামের একটি আইডেন্টিটি সেট করে। এক্ষেত্রে আমরা নিশ্চিন্ত থাকতে পারি দুটি সিম্বলের নাম একই হওয়ার পরও স্ক্রিপ্টদুটির মধ্যে ডাটা লিক বা ওভাররাইড হবে না।
=======
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

এক্ষেত্রে মূল স্ক্রিপ্ট তার নিজস্ব আইডেন্টিটিরে জন্য সিম্বল তৈরি করতে পারে এভাবে, `Symbol("id")`:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

এক্ষেত্রে দুটি স্ক্রিপ্টের মধ্যে কোন কনফ্লিক্ট হবে না, কেননা সিম্বলের নাম এক হলেও সিম্বলসমূহ হবে ইউনিক,

...যদি তার পরিবর্তে আমরা প্রপার্টি হিসেবে স্ট্রিং`"id"` ব্যবহার করি, তাহলে উভয়ের মাঝে কনফ্লিক্ট হবে:

```js
let user = { name: "John" };

// আমাদের user এর "id" প্রপার্টি
user.id = "Our id value";

// ...অন্য আরেকটি স্ক্রিপ্টও কোন কারণে "id" প্রপার্টি ব্যবহার করছে

user.id = "Their id value"
// ওহহহ! আরেকটি স্ক্রিপ্ট দ্বারা ওভাররাইড হয়ে গেল :(
```

### অবজেক্ট লিটারেল এ `{...}` সিম্বল প্রপার্টি


যদি আমরা অবজেক্ট লিটারেলে `{...}` সিম্বল প্রপার্টি ব্যবহার করতে চাই, এর জন্য আমরা এটি তৃতীয় বন্ধনীর মধ্যে লিখতে হবে।

যেমন:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // not "id": 123
*/!*
};
```
কেননা এটি দ্বারা আমরা নিশ্চিত করতে পারি, এখানের `id` হল একটি সিম্বল টাইপের ভ্যারিয়েবল, প্রপার্টির নাম স্ট্রিং "id"  না।

### for..in লুপের মধ্যে সিম্বল প্রপার্টি অ্যাক্সেসিবল না

সিম্বল প্রপার্টি সমূহ `for..in` লুপের মধ্যে অ্যাক্সেসিবল না।

যেমন:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (সিম্বল প্রপার্টি দেখাবে না)
*/!*

<<<<<<< HEAD
// তবে সরাসরি এটি অ্যাক্সেসবল
alert( "Direct: " + user[id] );
```

`Object.keys(user)` এর জন্যও সিম্বল প্রপার্টি অ্যাক্সেসিবল না। কেননা এটি "হাইড সিম্বল প্রপার্টির" নিয়ম মেনে চলে। অন্যথায় অন্য আরেকটি স্ক্রিপ্ট হতে আমাদের অবজেক্টের মধ্যে লুপ চালিয়ে আমরা সিম্বল প্রপার্টির মান জেনে যেতে পারি, যা উচিত নয়।
=======
// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

তবে, [Object.assign](mdn:js/Object/assign) এর ক্ষেত্রে উভয় টাইপের প্রপার্টি কপি হয়, যেমন:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

তবে এ নিয়ে চিন্তিত হওয়া উচিত নই। কেননা এদের এমনভাবে ডিজাইন করা হয়েছে যেন আমরা কোন অবজেক্টকে ক্লোন বা মার্জ করতে পারি। সাধারণত এজন্য আমরা চাই সকল ধরণের প্রপার্টি(সিম্বল সহ) কপি হোক।

## গ্লোবাল সিম্বল

ইতোমধ্যে আমরা জেনেছি নাম একই হওয়া সত্বেও সিম্বল সমূহ প্রত্যেকেই আলাদা। কিন্তু অনেক সময় আমরা একই নামের জন্য একাধিক সিম্বল ব্যবহার করতে চাই। যেমন আমরা অ্যাপ্লিকেশনের আলাদা আলাদা অংশের `"id"` নামের প্রপার্টিকে অ্যাক্সেস করতে চাই।

এজন্য একটি পদ্ধতি আছে *global symbol registry*। যার মাধ্যমে আমরা সিম্বল তৈরি করতে পারি, এবং পরবর্তীতে একে অ্যাক্সেস করতে পারি যা আমাদের নিশ্চয়তা প্রদান করে একই নামের আরেকটি সিম্বল ডিক্লেয়ার হলেও এটি প্রথম সিম্বলটিকে রিটার্ন করে।

global symbol registry হতে সিম্বলের মান পড়তে ব্যবহার হয় `Symbol.for(key)`।

অর্থাৎ এটি প্রথমে গ্লোবাল রেজিস্ট্রিতে চেক করবে ঐ `key`(নামের) কোন সিম্বল ডিক্লেয়ার করা হয়েছে কিনা যদি ডিক্লেয়ার হয় তাহলে ঐ সিম্বলকে রিটার্ন করবে অন্যথায় ঐ `key` নামের একটি সিম্বল তৈরি করে তা রেজিস্ট্রিতে সংরক্ষন করবে।

যেমন:

```js run
// গ্লোবাল রেজিস্ট্রিতে আছে কিনা যাচাই করবে
let id = Symbol.for("id"); // যেহেতু এই নামের সিম্বল নাই তাই নতুন সিম্বল তৈরি হবে এবং রেজিস্ট্রিতে সংরক্ষন করবে

// গ্লোবাল রেজিস্ট্রিতে আছে কিনা যাচাই করবে (এটি হতে পারে অন্য কোন স্ক্রিপ্টের কোড)
let idAgain = Symbol.for("id");

// দুইটি সিম্বল একই
alert( id === idAgain ); // true
```

যেসব সিম্বল গ্লোবাল রেজিস্ট্রিতে স্টোর হবে তাদের বলা হয় *global symbols*। যদি আমরা কোন সিম্বলকে সকল স্ক্রিপ্টের জন্য অ্যাক্সেস দিতে চাই তাহলে *global symbols* ব্যবহার করব।

```smart header="শুনতে কী Ruby এর মত মনে হচ্ছে?"
কিছু প্রোগ্রামিং ল্যাংগুয়েজে যেমন Ruby তে একটি `key` শুধুমাত্র একটি সিম্বলের জন্য।

<<<<<<< HEAD
আমরা দেখেছি জাভাস্ক্রিপ্টে, গ্লোবাল সিম্বল ডিক্লেয়ার করতে পারি।
=======
In JavaScript, as we can see, that's true for global symbols.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f
```

### Symbol.keyFor

<<<<<<< HEAD
গ্লোবাল সিম্বলের জন্য `Symbol.for(key)` এর বিপরীতে আরেকটি মেথড আছে যা সিম্বলের নাম রিটার্ন করে `Symbol.keyFor(sym)`।
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

যেমন:

```js run
// সিম্বল ডিক্লেয়ার
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// সিম্বলের নাম
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` ব্যবহার করা হয় ইন্টারনালি ঐ নামের কোন গ্লোবাল ইতোমধ্যে সিম্বল ডিক্লেয়ার করা হয়েছে কিনা তা জানতে। সুতরাং এটি নন-গ্লোবাল সিম্বলের জন্য কাজ করবে না। যদি কোন গ্লোবাল সিম্বল না থাকে তাহলে `undefined` রিটার্ন করবে।

<<<<<<< HEAD
তবে সব সিম্বলের `description` প্রপার্টি আছে।
=======
That said, all symbols have the `description` property.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

যেমন:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```

## System symbols

এছাড়াও ইন্টারনালি অবজেক্টের বিভিন্ন বিষয় নিয়ে কাজ করতে সিম্বলের আরো কিছু মেথড আছে।

এ সম্পর্কে স্পেশিফিকেশনে আলোচনা করা হয়েছে [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...ইত্যাদি.

যেমন, `Symbol.toPrimitive` অবজেক্টকে প্রিমিটিভ কনভার্শন করতে ব্যবহার করা হয়। যা নিয়ে পরবর্তী অনুচ্ছেদে আলোচনা করা হয়েছে।

আমরা অন্যান্য সিম্বল সমূহ নিয়েও পরিচিত হয়ে যাব আরো ভিবিন্ন ল্যাংগুয়েজ ফিচার নিয়ে আলোচনার সময়।

## সারাংশ

`Symbol` হল ইউনিক আইডেন্টিফায়ারের একটি প্রিমিটিভ টাইপ।

সিম্বল তৈরি করা হয় `Symbol()` দ্বারা যেটির একটি অপশনাল প্যারামিটার(name) আছে।

প্রতিটি সিম্বল স্বতন্ত্র। এমনকি যদি দুটি সিম্বলের মান একইও হয়। এছাড়াও যদি আমরা কোন সিম্বলকে একই নামে ইনিশিয়ালাইজ করতে চাই তাহলে আমাদের গ্লোবাল রেজিস্ট্রি ব্যবহার করতে হবে: `Symbol.for(key)` এটি চেক করবে একই নামের আগে কোন সিম্বল ডিক্লেয়ার করা হয়েছে কিনা, যদি হয়ে থাকে তাহলে ঐ সিম্বলকে রেফারেন্স করে অন্যথায় `undefined`।

সিম্বলের দুটি প্রধান ব্যবহার হল:

<<<<<<< HEAD
1. "হিডেন" অবজেক্ট প্রপার্টি।
    যদি আমরা কোন একটি অবজেক্টে কোন প্রপার্টি সংযুক্ত করতে চাই যেটি অন্য আরেকটি স্ক্রিপ্ট বা লাইব্রেরিতে ব্যবহার হয়, এবং আমরা চাই প্রপার্টিসমূহ যেন উভয়ের মধ্যে হিডেন থাকে, তখন আমরা সিম্বল প্রপার্টি ব্যবহার করি। সিম্বলিক প্রপার্টিসমূহ `for..in` বা `Object.keys(user)` দ্বারা অ্যাক্সেসিবল না। এছাড়াও সরাসরিও এক স্ক্রিপ্টের সিম্বল অন্য স্ক্রিপ্ট থেকে অ্যাক্সেসিবল হবে না, কেননা অন্য স্ক্রিপ্টে সিম্বল অ্যাক্সেস হবে না। ফলে স্ক্রিপ্টের মধ্যে মধ্যে ডাটা লিক বা ওভাররাইড হওয়ার সম্ভাবনা থাকে না।
=======
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f

    সুতরাং অবজেক্টের কোন কিছু হিডেন রাখতে আমরা সিম্বল ব্যবহার করতে পারি।

2. এছাড়াও আরো অনেক সিম্বল সিস্টেম আছে যেগুলো জাভাস্ক্রিপ্টের সাহায্যে অ্যাক্সেসিবল `Symbol.*`।  অবজেক্টের কিছু বিহেভিয়ার পরিবর্তনের জন্য আমরা এদের ব্যবহার করি। যেমন [iterables](info:iterable) টিউটোরিয়ালে `Symbol.iterator` এবং [object-to-primitive conversion](info:object-toprimitive) এ `Symbol.toPrimitive` এর ব্যবহার দেখব।.

<<<<<<< HEAD
তবে, সিম্বল কিন্তু প্রকৃতপক্ষে ১০০% হিডেন না। একটি বিল্ট ইন মেথড আছে ` Object.getOwnPropertySymbols(obj)`যেটি সকল সিম্বলকে রিটার্ন করে, এছাড়াও আরেকটি মেথড আছে [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) যেটি সকল প্রপার্টি (সিম্বল সহ) রিটার্ন করে। সুতরাং বলা যায় এরা প্রকৃতপক্ষে হিডেন না। তবে বেশিরভাগ লাইব্রেরী এই মেথডগুলো নিয়ে কাজ করেনা।
=======
Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> fe1c4a241f12a0939d1e0977cec6504ccd67201f


# অবজেক্ট হতে প্রিমিটিভে রূপান্তর

দুটি অবজেক্টের মধ্যে যোগ `obj1 + obj2`, বিয়োগ `obj1 - obj2` বা অবজেক্টকে প্রিন্ট করার সময় `alert(obj)` কীভাবে কাজ করে?

<<<<<<< HEAD
এইক্ষেত্রে, অবজেক্ট শুরুতে প্রিমিটিভ ভ্যালুতে রূপান্তর হয়, এবং তারপর এদের মধ্যের অপারেশন গুলো সংগঠিত হয়।
=======
JavaScript doesn't exactly allow to customize how operators work on objects. Unlike some other programming languages, such as Ruby or C++, we can't implement a special object method to handle an addition (or other operators).

In case of such operations, objects are auto-converted to primitives, and then the operation is carried out over these primitives and results in a primitive value.

That's an important limitation, as the result of `obj1 + obj2` can't be another object!

E.g. we can't make objects representing vectors or matrices (or achievements or whatever), add them and expect a "summed" object as the result. Such architectural feats are automatically "off the board".

So, because we can't do much here, there's no maths with objects in real projects. When it happens, it's usually because of a coding mistake.

In this chapter we'll cover how an object converts to primitive and how to customize it.

We have two purposes:

1. It will allow us to understand what's going on in case of coding mistakes, when such an operation happened accidentally.
2. There are exceptions, where such operations are possible and look good. E.g. subtracting or comparing dates (`Date` objects). We'll come across them later.

## Conversion rules
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

এই অধ্যায়ে <info:type-conversions> আমরা স্ট্রিং, বুলিয়ান এবং সাংখ্যিক পদ্ধতির রূপান্তরের নিয়ম দেখেছি। তবে অবজেক্ট নিয়ে আলোচনা করা হয়নি। ইতোমধ্যে যেহেতু আমরা সিম্বল এবং মেথড সম্পর্কে পড়েছি সুতরাং আমরা অবজেক্ট রূপান্তর নিয়ে জানতে পারব।

1. বুলিয়ানের জন্য সকল অবজেক্ট `true` রিটার্ন করবে। এক্ষেত্রে শুধুমাত্র সাংখ্যিক এবং স্ট্রিং রূপান্তর আছে।
2. সাংখ্যিক রূপান্তর ঘটবে যখন দুটি অবজেক্টের মধ্যে বিয়োগ অপারেশন বা অন্যান্য গাণিতিক অপারেশন চালানো হয়। যেমন দুটি `Date` (এইখানে <info:date> আলোচনা করা হয়েছে) অবজেক্টের পার্থক্য নির্ণয়ে এবং এর ফলে দুটি তারিখ অবেজেক্টের `date1 - date2` পার্থক্য জানা যাবে।
3. সাধারণত স্ট্রিংয়ের রূপান্তর ঘটে যখন আমরা কোন অবজেক্টের মান দেখাতে চাই যেমন `alert(obj)` অথবা এই ধরণের অন্যান্য অপারেশনের জন্য।

<<<<<<< HEAD
## ToPrimitive

আমরা স্ট্রিং এবং সাংখ্যিক রূপান্তরকে বিশেষ অবজেক্ট মেথডের সাহায্যে নিয়ন্ত্রন করতে পারি।

৩ ধরণের টাইপ কাস্টিং আছে, এদের বলা হয় "hints", এখানে বিস্তারিত আলোচনা করা হয়েছে [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
=======
We can fine-tune string and numeric conversion, using special object methods.

There are three variants of type conversion, that happen in various situations.

They're called "hints", as described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

`"string"`
: অবজেক্ট হতে স্ট্রিংয়ে রূপান্তরের জন্য, যখন আমরা এমন কোন অপারেশন এক্সিকিউট করি যেটি মান হিসেবে স্ট্রিং আশা করে, যেমন `alert` বা অবজেক্টের প্রপার্টির নাম:

    ```js
    // আউটপুট
    alert(obj);

    // প্রপার্টি  হিসেবে স্ট্রিং নিতে পারে
    anotherObj[obj] = 123;
    ```

`"number"`
: অবজেক্ট হতে সাংখ্যিক রূপান্তর, যেমন বিভিন্ন গাণিতিক অপারেশনের জন্য:

    ```js
    // সরাসরি রূপান্তর
    let num = Number(obj);

    // গাণিতিক অপারেশন(বাইনারি যোগ ব্যাতিত অর্থাৎ obj1 + obj2 কাজ করবে না)
    let n = +obj; // ইউনারি যোগ
    let delta = date1 - date2;

    // বড়/ছোট যাচাই
    let greater = user1 > user2;
    ```

`"default"`
: যখন অপারেশনটি কী ধরনের মান আশা করে এ ব্যাপারে নিশ্চিত নই।

    যেমন স্ট্রিং কনক্যাটেনেশন বা যোগফল উভয়ের জন্য বাইনারি যোগ `+` অপারেশন ব্যবহার করা হয়, সুতরাং এটি স্ট্রিং বা নাম্বার যেকোনটার জন্য কাজ করে। সুতরাং যখন বাইনারি যোগ একটি অবজেক্টকে আর্গুমেন্ট হিসেবে নেয়, এটি `"default"` হিন্ট হিসেবে কনভার্ট হয়।

    এছাড়াও যখন আমরা সমান যাচাইয়ের জন্য `==` ব্যবহার করি এটি সংখ্যা বা নাম্বার উভয় টাইপের জন্য কাজ করে, এক্ষেত্রেও এটি "default"` হিন্ট ব্যবহার করে।

    ```js
    // বাইনারি যোগের জন্য ব্যবহার হয় "default" হিন্ট
    let total = obj1 + obj2;

    // obj == number এক্ষেত্রেও ব্যবহার হয় "default" হিন্ট
    if (user == 1) { ... };
    ```

    কম্পারিশন অপারেটর যেমন `<` `>`, এটিও নাম্বার এবং স্ট্রিংয়ের জন্য কাজ করে। তবে এটি `"default"` এর বদলে `"number"` হিন্ট ব্যবহার করে। ঐতিহাসিক কারণে এমন হয়।

    তবে প্রাত্যহিক কাজে, আমাদের এই সূক্ষ্ণ ব্যাপারগুলো এত বিশদ মনে রাখার কোন দরকার নেই, কেননা সকল বিল্ট-ইন অবজেক্টে (শুধুমাত্র `Date` অবজেক্ট ব্যাতীত) `"default"` আর `"number"` কে একই ধরা হয়েছে। এবং আমরাও আমাদের অবজেক্টে এভাবে করতে পারি।

```smart header="কোন `\"boolean\"` হিন্ট নেই"
দয়া করে মনে রাখুন, শুধুমাত্র উপরে উল্লেখিত তিনটি হিন্ট আছে।

কোন ধরণের "boolean" বা অন্য কোন ধরণের হিন্ট নেই, (বুলিয়ানের জন্য যেকোন অবজেক্টের জন্য `true` রিটার্ন করবে। এবং যদি আমরা `"default"` এবং `"number"` কে একটি হিন্ট ধরে নেই, তাহলে বলতে পারি শুধুমাত্র দুই ধরণের কনভার্শন আছে।
```

**এই কনভার্শনের জন্য জাভাস্ক্রিপ্ট ইঞ্জিন অবজেক্টের তিনটি মেথড কল করার চেষ্টা করে:**

1. প্রথমে কল করবে `obj[Symbol.toPrimitive](hint)` - যদি মেথডটি অবজেক্টে প্রপার্টি হিসেবে থাকে তাহলে এটি কল হবে এটি একটি সিম্বল কী(key) `Symbol.toPrimitive` (system symbol)।
2. অন্যথায় যদি হিন্ট `"string"` হয়
    - তাহলে `obj.toString()` কে কল করবে না হয় `obj.valueOf()`।
3. অন্যথায় যদি হিন্ট `"number"` বা `"default"` হয়
    - তাহলে প্রথমে `obj.valueOf()` কে কল করবে না হয় `obj.toString()`।

## Symbol.toPrimitive

চলুন প্রথম মেথডটি সম্পর্কে জানি। একটি বিল্ট-ইন সিম্বল আছে `Symbol.toPrimitive` যেটি টাইপ কনভার্শনের জন্য ব্যবহার করা হয়, এভাবে:

```js
obj[Symbol.toPrimitive] = function(hint) {
<<<<<<< HEAD
  // অবশ্যই রিটার্ন ভ্যালু প্রিমিটিভ হতে হবে
  // hint হতে পারে "string", "number" বা "default"
};
```

এখানে আমরা `user` অবজেক্ট এর জন্য এটি ইমপ্লিমেন্ট করছি:
=======
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};
```

If the method `Symbol.toPrimitive` exists, it's used for all hints, and no more methods are needed.

For instance, here `user` object implements it:
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

উপরের কোডে আমরা দেখেছি `user` এটি অটোমেটিক স্ট্রিং কনভার্শনে নাম বা গাণিতিক অপারেশনের জন্য টাকার পরিমান রিটার্ন করে। তিন ধরণের হিন্টকে একটিমাত্র `user[Symbol.toPrimitive]` মেথড দ্বারা নিয়ন্ত্রন করা হচ্ছে।


## toString/valueOf

<<<<<<< HEAD
পুরনো জাভাস্ক্রিপ্টে`toString` এবং `valueOf` নামের দুটি মেথড ছিল। `Symbol` মডার্ন জাভাস্ক্রিপ্টের একটি প্রিমিটিভ টাইপ। সুতরাং আমরা চাইলে es5 স্টাইলেও এটি ইমপ্লিমেন্ট করতে পারি।

যদি `Symbol.toPrimitive` ইমপ্লিমেন্ট করা না থাকে তখন ইঞ্জিন নিচের মেথডগুলো খুঁজ করে:

- `toString -> valueOf` "string" কনভার্শনের জন্য।
- অন্যথায় `valueOf -> toString`।
=======
If there's no `Symbol.toPrimitive` then JavaScript tries to find methods `toString` and `valueOf`:

- For the "string" hint: `toString`, and if it doesn't exist, then `valueOf` (so `toString` has the priority for string conversions).
- For other hints: `valueOf`, and if it doesn't exist, then `toString` (so `valueOf` has the priority for maths).

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

মেথডগুলো একটি প্রিমিটিভ ভ্যালু রিটার্ন করে। যদি `toString` বা `valueOf` কোন অবজেক্ট রিটার্ন করে, তাহলে এটি উপেক্ষা করে (অনেকটা কোন কনভার্শন মেথড না থাকার মত)।

ডিফল্টভাবে, একটি অবজেক্ট এভাবে কাজ করে প্রথমে `toString` মেথডকে কল করবে তারপর `valueOf` মেথড:

- `toString` মেথড একটি স্ট্রিং রিটার্ন করে `"[object Object]"`।
- আর `valueOf` মেথড অবজেক্টটিকে রিটার্ন করে।

এখানে দেখুন:

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

যখন আমরা কোন একটি অবজেক্টকে `alert` এর মাধ্যমে দেখাতে চাই, ডিফল্টভাবে এটি দেখাই `[object Object]`।

<<<<<<< HEAD
এবং `valueOf` কে দেখানো হয়েছে এটি কি রিটার্ন করছে দেখানোর জন্য। আমরা দেখছি এটি অবজেক্টটিকে রিটার্ন করে।

এবার চলুন মেথডসমূহকে ইমপ্লিমেন্ট করি।
=======
The default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods to customize the conversion.
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

যেমন, এখানে `user` এর জন্য `Symbol.toPrimitive` এর পরিবর্তে `toString` এবং `valueOf` ইমপ্লিমেন্ট করছি:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

এখানে আমরা দেখতে পাচ্ছি এরা `Symbol.toPrimitive` এর মতই কাজ করছে।

অনেক সময় সব ধরণের কনভার্শনের জন্য আমরা শুধুমাত্র একটি মান পেতে চাই। এক্ষেত্রে আমরা `toString` ব্যবহার করতে পারি, এভাবে:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

অর্থাৎ `Symbol.toPrimitive` না থাকলে এটি প্রিমিটিভ কনভার্শনের জন্য `valueOf`, `toString`  কে কল করে।

### A conversion can return any primitive type

সকল ধরণের প্রিমিটিভ কনভার্শনের জন্য একটি গুরুত্বপূর্ন ব্যাপার জেনে রাখা উচিত এটি হিন্ট অনুযায়ী মান রিটার্ন করবে এমন নিশ্চয়তা নেই।

যেমন `toString` এর জন্য স্ট্রিং রিটার্ন অথবা `Symbol.toPrimitive` মেথডটি সাংখ্যিক হিন্টের জন্য `"number"` রিটার্ন করবে এমন নই।

শুধুমাত্র একটি বিষয় আবশ্যক: এই মেথডসমূহ অবশ্যই একটি প্রিমিটিভ মান রিটার্ন করবে, কোন অবজেক্ট না।

```smart header="ঐতিহাসিক নোট"
পুরনো জাভাস্ক্রিপ্ট এ `toString` বা `valueOf` অবজেক্ট রিটার্ন করতে পারত, এজন্য কোন এরর দেখাত না। এর মানটি উপেক্ষা করত। কেননা আগে জাভাস্ক্রিপ্টের "error" হ্যান্ডেলিং তেমন স্মার্ট ছিল না।

বিপরীতে, `Symbol.toPrimitive` এ *অবশ্যই* একটি প্রিমিটিভ ভ্যালু রিটার্ন করতে হবে, অন্যথায় এরর দেখাবে।
```

## আরো কনভার্শন

ইতোমধ্যে আমরা জেনেছি, অনেক অপারেটর এবং ফাংশন এর জন্য টাইপ কনভার্শন কাজ করে, যেমন গুনফল `*` বের করতে টাইপ কনভার্শন হয়।

যদি আমরা কোন অবজেক্টকে আর্গুমেন্ট হিসেবে পাঠায়, তাহলে এটি দুটি ধাপ মেনে চলে:
1. উপরে বর্ণিত নিয়ম অনুযায়ী এটি প্রিমিটিভে রূপান্তর হবে।
2. যদি প্রিমিটিভের টাইপ সঠিক না হয় তাহলে এটি সঠিক টাইপে কনভার্ট হবে।

যেমন:

```js run
let obj = {
  // সকল ধরণের কনভার্শনের জন্য এটি কল হবে
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, প্রথমে এটি স্ট্রিংয়ে রূপান্তর হবে "2", তারপর নাম্বারে পরিবর্তন হয়ে গুনের কাজ করবে
```

1. প্রথম এটি প্রিমিটিভে রূপান্তর হবে `obj * 2` (যেটি একটি স্ট্রিং `"2"`)।
2. তারপর `"2" * 2` হবে `2 * 2` (স্ট্রিংটি নাম্বারে কনভার্ট হবে)।

বাইনারি যোগের জন্য স্ট্রিং কনক্যাট হবে, যেহেতু এটি স্ট্রিং গ্রহণ করে:

```js run
let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // 22 ("2" + 2), স্ট্রিং প্রিমিটিভে রূপান্তর হয়ে কনক্যাট হবে
```

## সারাংশ

অনেক বিল্ট-ইন ফাংশনের জন্য অবজেক্ট থেকে প্রিমিটিভ স্বয়ংক্রিয়ভাবে কল হয় এবং এরা ভ্যালু হিসেবে একটি প্রিমিটিভ আশা করে।

৩ ধরণের টাইপ(এদের হিন্ট বলা হয়) আছে:
- `"string"` (`alert` এবং অন্যান্য কিছু অপারেশনের জন্য স্ট্রিং প্রয়োজন হয় যেমন অবজেক্টে প্রপার্টি সেট করতে)
- `"number"` (গাণিতিক কাজে)
- `"default"` (কিছু অনিশ্চিত অপারেশন আছে যেমন বাইনারি যোগ কনক্যাট এবং যোগের জন্য ব্যবহার হয়)

বেশিরভাগ অপারেশন কী টাইপের অপারেটর প্রয়োজন তা সুনির্দিষ্টভাবে উল্লেখ আছে। তবে কিছু অপারেশন আছে যারা অপারেটর এর ব্যাপারে অনিশ্চিত এক্ষেত্রে `"default"` হিন্ট ব্যবহার হয়। সাধারণত বেশিরভাগ বিল্ট-ইন অবজেক্ট `"default"` এর জন্য `"number"` হিন্ট ব্যবহার করে, সুতরাং আমরাও এই দুটি টাইপকে একত্রে করে নিতে পারি।

কনভার্শন অ্যালগরিদম:

1. প্রথমে `obj[Symbol.toPrimitive](hint)` কে কল করবে, যদি এটি থাকে।
2. অন্যথায় যদি হিন্ট `"string"` হয়
    - তাহলে `obj.toString()` কে কল করবে না হয় `obj.valueOf()`।
3. অন্যথায় যদি হিন্ট `"number"` বা `"default"` হয়
    - তাহলে প্রথমে `obj.valueOf()` কে কল করবে না হয় `obj.toString()`।

<<<<<<< HEAD
তবে, প্রায়সময় সকল ধরণের হিন্টের জন্য `obj.toString()` কে ব্যবহার করতে পারি, কেননা এটি অবজেক্টের পঠনযোগ্য একটি মান প্রধানে সক্ষম, যার ফলে সহজে ডিবাগ বা লগ করা যায়।
=======
In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for string conversions that should return a "human-readable" representation of an object, for logging or debugging purposes.  

As for math operations, JavaScript doesn't provide a way to "override" them using methods, so real life projects rarely use them on objects.
>>>>>>> 2cca9a9d09fdd45819832294225aa3721fa5a2d4

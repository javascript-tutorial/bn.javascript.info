
# সিম্বল টাইপ

অবজেক্টের স্পেসিফিকেশন অনুযায়ী আমরা জেনেছি প্রপার্টি কি(key) হতে পারে স্ট্রিং অথবা সিম্বল টাইপ। নাম্বার, বুলিয়ান বা অন্য কোন ধরণের প্রিমিটিভ টাইপ কি(key) হিসেবে রাখা যায় না, শুধুমাত্র স্ট্রিং অথবা সিম্বল এই দুটি টাইপ অ্যাক্সেপ্টবেল।

পূর্বের অনুচ্ছেদগুলোতে আমরা প্রপার্টি হিসেবে শুধুমাত্র স্ট্রিং ব্যবহার করেছি, এই অনুচ্ছেদে আমরা সিম্বল টাইপ কিভাবে ব্যবহার করা যায় এবং এর ব্যবহারের সুবিধা কি তা নিয়ে আলোচনা করব।

## সিম্বল

"সিম্বল (symbol)" একটি একক বৈশিষ্ট্য প্রদানের নিশ্চয়তা প্রদান করে।

এই ধরণের টাইপ তৈরি করতে আমরা ব্যবহার করি `Symbol()`:

```js
// এখানে id হল একটি symbol
let id = Symbol();
```

তৈরির সময়, আমরা সিম্বলের একটি নাম প্রদান করি, যা ডিবাগিংয়ের জন্য সুবিধাজনক:

```js
// এখানে id হল একটি Symbol যার নাম হল "id"
let id = Symbol("id");
```

Symbol আমাদের নিশ্চয়তা প্রদান করে এর মান হবে অদ্বিতীয়। যদি আমরা একই নাম দ্বারা একাধিক সিম্বল তৈরি করি, তাদের মান হবে আলাদা। সিম্বলের প্রদানকৃত নামটি শুধুমাত্র একটি লেভেল।

যেমন, এখানে আমরা এখানে একই নামের দুটি সিম্বল তৈরি করেছি -- কন্ডিশনালি এদের মান সমান হবে না:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

রুবি বা অন্য যেকোন ল্যাংগুয়েজের "symbols" এর সাথে এটিকে গুলিয়ে ফেলবেন না। জাভাস্ক্রিপ্টের সিম্বল আলাদা।

````warn header="Symbols স্বয়ংক্রিয়ভাবে স্ট্রিং এ কনভার্ট হয়না"
জাভস্ক্রিপ্টের বেশিরভাগ মান স্ট্রিংয়ে টাইপ কাস্টিং হতে পারে। যেমন `alert` প্রায় সবধরণের মানকে স্ট্রিংয়ে রূপান্তর করতে পারে। তবে সিম্বল অটো কনভার্ট হতে পারে না।

যেমন, নিচের কোডটিতে `alert` এর জন্য এরর দেখাবে:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

That's a "language guard" against messing up, কেননা স্ট্রিং এবং সিম্বল মৌলিকভাবে আলাদা যার জন্য এদের নিজেদের মধ্যে পরিবর্তন গ্রহণযোগ্য নয়।

যদি আমরা কোন একটি সিম্বল দেখাতে চাই, তাহলে `.toString()` মেথডের মাধ্যমে দেখাতে পারি, এভাবে:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), এখন এটি কাজ করবে
*/!*
```

অথবা নাম জানতে `symbol.description`:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "হিডেন" প্রপার্টি

সিম্বল অবজেক্টের মধ্যে একটি "hidden" প্রপার্টি রাখার সুবিধা প্রদান করে, যাতে অনিচ্ছাকৃত কোন প্রপার্টি অ্যাক্সেস বা ওভাররাইট করা না যায়।

যেমন, আমাদের একটি `user` অবজেক্ট আছে, যেটি অন্য আরেকটি থার্ড-পার্টি কোডের সাথে সম্পর্কিত। এখন আমরা এর জন্য একটি আইডেন্টিফায়ার সেট করতে চাই।

চলুন এর জন্য একটি সিম্বল প্রপার্টি ব্যবহার করি:

```js run
let user = { // যা অন্য আরেকটি কোডের সাথে সম্পর্কিত
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // এখন আমরা এর ডাটাকে সিম্বল কী(Key) দ্বারা অ্যাক্সেস করতে পারব
```

এটিতো আমরা চাইলে স্ট্রিং প্রপার্টি `"id"` দ্বারা করতে পারতাম তার পরিবর্তে `Symbol("id")` ব্যবহার সুবিধাজনক কেন?

যেহেতু `user` অবজেক্টটি অন্য আরেকটি স্ক্রিপ্টের সাথেও সম্পর্কিত, এবং ঐ কোডটিও যেহেতু `user` অবজেক্ট নিয়ে কাজ করে, আমরা চাইনা এর মধ্যে নতুন আরেকটি ফিল্ড যুক্ত হোক। এবং নিরাপত্তার জন্য এটি থার্ড পার্টির জন্য অ্যাক্সেসবল হওয়াও উচিত নয়, সিম্বল ব্যবহার করায় আমরা এই ব্যাপারে নিশ্চিত থাকতে পারি সিম্বল ডাটাসমূহ এক স্ক্রিপ্টের সাথে অন্য স্ক্রিপ্টের মধ্যে আদান প্রদান হবে না।

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes. That may be another JavaScript library, so that the scripts are completely unaware of each other.

এক্ষেত্রে ঐ স্ক্রিপ্ট নিজস্ব সিম্বল তৈরি করতে পারে এভাবে, `Symbol("id")`:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

এক্ষেত্রে দুটি স্ক্রিপ্টের মধ্যে কোন কনফ্লিক্ট হবে না, কেননা সিম্বলের নাম এক হলেও সিম্বলসমূহ হবে ইউনিক,

...যদি তার পরিবর্তে আমরা প্রপার্টি হিসেবে স্ট্রিং`"id"` ব্যবহার করি, তাহলে উভয়ের মাঝে কনফ্লিক্ট হবে:

```js run
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

### for..in লুপের মধ্যে সিম্বল প্রপার্টি অ্যাক্সেসবল না

সিম্বল প্রপার্টি সমূহ `for..in` লুপের মধ্যে অ্যাক্সেসবল না।

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

// তবে সরাসরি এটি অ্যাক্সেসবল
alert( "Direct: " + user[id] );
```

`Object.keys(user)` এর জন্যও সিম্বল প্রপার্টি অ্যাক্সেসবল না। কেননা এটি "হাইড সিম্বল প্রপার্টির" নিয়ম মেনে চলে। অন্যথায় অন্য আরেকটি স্ক্রিপ্ট হতে আমাদের অবজেক্টের মধ্যে লুপ চালিয়ে আমরা সিম্বল প্রপার্টির মান জেনে যেতে পারি, যা উচিত নয়।

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

## Global symbols

As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.

To achieve that, there exists a *global symbol registry*. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.

That call checks the global registry, and if there's a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key)` and stores it in the registry by the given `key`.

For instance:

```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```

Symbols inside the registry are called *global symbols*. If we want an application-wide symbol, accessible everywhere in the code -- that's what they are for.

```smart header="That sounds like Ruby"
In some programming languages, like Ruby, there's a single symbol per name.

In JavaScript, as we can see, that's right for global symbols.
```

### Symbol.keyFor

For global symbols, not only `Symbol.for(key)` returns a symbol by name, but there's a reverse call: `Symbol.keyFor(sym)`, that does the reverse: returns a name by a global symbol.

For instance:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.

That said, any symbols have `description` property.

For instance:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
```

## System symbols

There exist many "system" symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion. We'll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.

## Summary

`Symbol` is a primitive type for unique identifiers.

Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.

Symbols have two main use cases:

1. "Hidden" object properties.
    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can "covertly" hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we'll use `Symbol.iterator` for [iterables](info:iterable), `Symbol.toPrimitive` to setup [object-to-primitive conversion](info:object-toprimitive) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. So they are not really hidden. But most libraries, built-in functions and syntax constructs don't use these methods.

# জেনারেটর

সাধারণ ফাংশনগুলো শুধুমাত্র একটি মান রিটার্ন করে (অথবা কিছুই রিটার্ন করে না)। 

জেনারেটরের মাধ্যমে আমরা চাহিদা অনুযায়ী একটির পর আরেকটি এভাবে অনেক মান রিটার্ন ("yield") করতে পারি। এরা [ইটারেবলের](info:iterable) সাথে দারুণ কাজ করে, এর মাধ্যমে সহজে ডাটা স্ট্রীম তৈরী করা যায়।

## জেনারেটর ফাংশন

জেনারেটর তৈরি করতে আমাদের একটি বিশেষ সিনট্যাক্স কন্সট্রাক্ট `function*` এর প্রয়োজন হয়, এদের বলা হয় "জেনারেটর ফাংশন"।

এরা দেখতে এমনঃ

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

জেনারেটর ফাংশন এর আচরণ সাধারণ ফাংশন গুলো থেকে ভিন্ন।
যখন এই ধরণের ফাংশন গুলো কল করা হয়, তখন এরা এদের কোড রান করে না।
তার পরিবর্তে এটি রিটার্ন করে একটি বিশেষ অবজেক্ট, এদের বলা হয় "জেনারেটর অবজেক্ট", এটি এক্সিকিউশন নিয়ন্ত্রন করে।

এখানে দেখুনঃ

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "জেনারেটর ফাংশন" তৈরি করে "জেনারেটর অবজেক্ট"
let generator = generateSequence();
*!*
alert(generator); // [object Generator]
*/!*
```

ফাংশনের কোড এক্সিকিউশন এখনো শুরু হয়নিঃ

![](generateSequence-1.svg)

জেনারেটরের প্রধান মেথডটি হল `next()`। যখন এটি কল হয়, এটি `yield <value>` স্টেটমেন্টের (`value` বাদ যেতে পারে, তারপর এটি `undefined` হয়) আগ পর্যন্ত সম্পাদিত হয়। তারপর ফাংশনের সম্পাদন থেমে যায় এবং ইয়েল্ডেড `value` টি বাইরেরে কোডে রিটার্ন করে।

`next()` হল একটি অবজেক্ট যার দুটি প্রোপার্টি আছে:
- `value`: ইয়েল্ডেড মানটি।
- `done`: `true` যদি ফাংশনের কোড শেষ হয়, অন্যথায় `false`।

উদাহরণস্বরুপ, এখানে আমরা জেনারেটর তৈরি করেছি এবং আমরা এটির প্রথম ইয়েল্ডেড মানটি পাওয়া যায়ঃ

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

এখন, আমরা শুধু প্রথম ইয়েল্ডেড মানটি পেয়েছি, এবং ফাংশনটি সম্পাদনের জন্য দ্বিতীয় লাইনে রয়েছেঃ

![](generateSequence-2.svg)

চলুন আবার `generator.next()` কে কল করি। আবার কোড সম্পাদন চালু হয় এবং রিটার্ন করে পরবর্তী `yield`:

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

এবং যখন আমরা তৃতীয়বারের মত কল করি, ফাংশন সম্পাদন পৌঁছে যায় `return` স্টেটমেন্টে যার দ্বারা ফাংশনটি শেষ হয়ঃ

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

এভাবে জেনারেটরটি সম্পন্ন হয়। সব শেষে আমরা দেখতে পাই `done:true` এবং প্রসেস `value:3`।

নতুন করে `generator.next()` কে কল করা আর তেমন কিছু বোঝায় না। যদি আমরা কল করি, তাহলে এটি একই অবজেক্ট রিটার্ন করে: `{done: true}`।

```smart header="`function* f(…)` or `function *f(…)`?"
উভয় সিনট্যাক্সই শুদ্ধ।

কিন্ত সাধারণত প্রথম সিনট্যাক্সটি বেশী ব্যবহৃত হয়, স্টার `*` চিহ্ন দ্বারা বোঝানো হয় এটি একটি জেনারেটর ফাংশন, এটি দ্বারা ফাংশনের ধরণ বুঝায়, নাম নয়, তাই এটি `function` কীওয়ার্ডের সাথে থাকা উচিত।
```

## জেনারেটরসমূহ ইটারেবল

আপনি সম্ভবত `next()` মেথডটি দেখে বুঝতে পেরেছেন জেনারেটর[ইটারেবল](info:iterable)।


আমরা মান গুলো `for..of` লুপের মাধ্যমে পেতে পারিঃ

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1 তারপর 2
}
```

`.next().value` এর চেয়ে এভাবে মানগুলো খুঁজা আরো বেশি সাবলীল, তাই না?

...বিঃদ্রঃ উপরের উদাহরণটিতে দেখায় `1`, তারপর `2` কিন্তু এটি `3` দেখায় না!

কারণ `for..of` ইটারেশন শেষের `value` টিকে দেখায় না, যখন `done: true` হয়ে যায়। তো, যদি আমরা `for..of` এর মাধ্যমে সব মান পেতে চাই তাহলে আমাদের অবশ্যই এদের `yield` এর সাথে রিটার্ন করতে হবেঃ

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, তারপর 2, তারপর 3
}
```


যেহেতু জেনারেটর ইটারেবল, তাই আমরা সকল ধরণের ইটারেবল ফাংশনালিটি কল করতে পারি, যেমনঃ স্প্রেড অপারেটর `...`:


```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

উপরের কোডে, `...generateSequence()` ইটারেবল জেনারেটর অবজেক্টটি অ্যারেতে রুপান্তরিত হয় (স্প্রেড অপারেটর সম্পর্কে আরো জানতে এটি পড়ুন [](info:rest-parameters-spread-operator#spread-operator))

## ইটারেবলের জন্য জেনারেটরের ব্যবহার

পূর্বে, ইটারেবল অধ্যায়ে [](info:iterable) আমরা তৈরি করেছি একটা `range` অবজেক্ট যেটি রিটার্ন করত `from..to` এর মানগুলো।

এখানে, আগের কোডটি দেখুনঃ

```js run
let range = {
  from: 1,
  to: 5,

  // for..of range কে কল করা হলে সবার শুরুতে এই মেথডটি এক্সিকিউট হবে
  [Symbol.iterator]() {
    // ...এটি রিটার্ন করে ইটারেটর অবজেক্ট:
    // পরবর্তীতে, for..of শুধু অবজেক্টির সাথে কাজ করে এবং এর মাধ্যমে আমরা মান গুলো জানতে পারি
    return {
      current: this.from,
      last: this.to,

      // for..of লুপের প্রতিবার ইটারেশনে next() কল হয় 
      next() {
        // এটি রিটার্ন করবে একটি অবজেক্ট {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// ইটারেশন শেষে range এর রিটার্ন মান হবে range.from হতে range.to পর্যন্ত
alert([...range]); // 1,2,3,4,5
```

জেনারেটর ফাংশনের মাধ্যমেও আমরা ইটারেশনের করতে পারি `Symbol.iterator`।

উপরের `range` টিকে আরো সহজভাবেঃ

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // সংক্ষিপ্তরূপ [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

এটিও কাজ করবে, কারণ `range[Symbol.iterator]()` জেনারেটর রিটার্ন করে, এবং জেনারেটর মেথডটি `for..of` এর মত কাজ করেঃ
- এর একটি মেথড আছে `.next()`
- এটি মানগুলো রিটার্ন করে এই ভাবে `{value: ..., done: true/false}`

অবশ্য, এটি কাকতালীয় না। জাভাস্ক্রীপ্টে জেনারেটর সংযুক্ত করা হয়েছে সহজে ইটারেবল অবজেক্ট তৈরি করতে।

পূর্বের ইটারেবল `range` কোডের চেয়েও আমারা এর বিকল্প হিসেবে জেনারেটর ব্যবহার করতে পারি এটি আরো বেশী সংক্ষিপ্ত এবং এর ফাংশানালিটি একই থাকে।

```smart header="জেনারেটর সবসময় জেনারেট ভ্যালু রিটার্ন করে"
উপরের উদাহরণে আমরা একটি ফিনিট সিক্যুয়েন্স জেনারেট করেছি, কিন্ত আমরা সবসময় মান রিটার্ন করে এমন জেনারেটরও তৈরি করতে পারি। উদাহরণস্বরূপ একটি ইনফিনিট সুডো-র‍্যান্ডম নাম্বার সিরিজ।

তবে এ ধরনের জেনারেটরের জন্য `for..of` এ একটি `break` (অথবা `return`) ব্যবহার করা উচিত। অন্যথায়, লুপটি অবিরাম চলতে থাকবে এবং হ্যাং করবে।
```

## জেনারেটর কম্পোজিশন

জেনারেটর কম্পোজিশন হল এমন একটি সুবিধা যার মাধ্যমে আমরা একটি জেনারেটরের মধ্যে আরেকটি জেনারেটর সহজে "embed" করতে পারি।

উদাহরণস্বরূপ, আমাদের একটি ফাংশন আছে এটি সিক্যুয়েন্স নাম্বার জেনারেট করেঃ

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

এখন আরো জটিল সিক্যুয়েন্স বানাতে আমরা এটি পুনরায় ব্যবহার করবঃ
- প্রথমত, নাম্বার `0..9` (ক্যারেক্টার কোড 48..57),
- তারপর বড় হাতের অক্ষর `A..Z` (ক্যারেক্টার কোড 65..90)
- তারপর ছোট হাতের অক্ষর `a..z` (ক্যারেক্টার কোড 97..122)

আমরা এই সিক্যুয়েন্স টা ব্যবহার করে উপরোল্লিখিত ক্যারেক্টার গুলো দিয়ে পাসওয়ার্ড তৈরি করতে পারি (এছাড়া সিম্বল ক্যারেক্টারও যুক্ত করতে পারি), চলুন প্রথমে এটা তৈরি করি।

সাধারন ফাংশনে, অনেকগুলো ফাংশনের মান একত্রিত করতে প্রথমে আমরা মানগুলো স্টোর করি এবং শেষে তাদের জয়েন করি। 

জেনারেটরে, একটি স্পেশাল `yield*` সিনট্যাক্স আছে যার মাধ্যমে একটি ফাংশন আরেকটি ফাংশনের মধ্যে "embed" (কম্পোজ) করা যায়।

কম্পোজিট জেনারেটরঃ

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

`yield*` ডিরেক্টিভটি দ্বারা *নির্দেশ করে* এটি অন্য একটি জেনারেটরের এক্সিকিউশন। `yield* gen` এটি দ্বারা বুঝায় জেনারেটরটি `gen` ইটারেটযোগ্য এবং আমরা সহজেই ইয়েল্ডটির মান অন্য আরেকটি আউটার জেনারেটরের মাধ্যমে পেতে পারি। 

উপরের রেজাল্ট একই থাকবে যদি আমরা নেস্টেড জেনারেটরে ইনলাইন কোড করিঃ

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

জেনারেটর কম্পোজিশন একটি স্বাভাবিক উপায় যার মাধ্যমে আমরা একটি ফাংশনের মধ্যে আরেকটি ফাংশন রাখতে পারি। এর ফলে মধ্যবর্তী মান স্টোরের জন্য অতিরিক্ত মেমোরি ব্যবহার হয় না।


## "yield" হল একটি টু-ওয়ে রোড

এখনো পর্যন্ত আমরা বুঝছি, জেনারেটর দেখতে ইটারেবল অবজেক্ট এর মত, যার জেনারেট ভ্যালুর জন্য স্পেশাল সিনট্যাক্স আছে। কিন্তু আসলে এটি আরো বেশি পাওয়ারফুল এবং ফ্লেক্সিবল। 


এখানে `yield` হল একটি টু-ওয়ে রোড: এটি শুধু মান রিটার্ন `yield` করে না আমরা জেনারেটরে ভ্যালুও পাস করতে পারি।


এজন্য আমাদের `generator.next(arg)` কে কল করা লাগবে যার একটি আর্গুমেন্ট থাকতে পারে। আর্গুমেন্টটি `yield` এর রেজাল্ট হয়।

একটা উদাহরণ দেখা যাকঃ

```js run
function* gen() {
*!*
  // এক্সিকিউশন কোডে একটি প্রশ্ন পাঠিয়ে উত্তরের জন্য অপেক্ষা করি
  let result = yield "2 + 2 = ?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- ইয়েল্ড ভ্যলু রিটার্ন করে

generator.next(4); // --> উত্তরটা জেনারেটরে পাঠাই
```

![](genYield2.svg)

1. প্রথমে `generator.next()`কোন আর্গুমেন্ট ছাড়া কল করি (আর্গুমেন্ট যাবে না যদি আমরা পাসও করি)। এটির এক্সিকিউশন শুরু হয় এবং প্রথম রিটার্নকৃত রেজাল্ট হবে `yield "2+2=?"`। এই মুহুর্তে জেনারেটরের এক্সিকিউশন `(*)` লাইনে থেমে যাবে।
2. তারপর, উপরের ছবির মত, কোডে `yield` এর ফলাফল `question` ভ্যারিয়েবল এর মধ্যে চলে আসে।
3. `generator.next(4)` এ, জেনারেটর থেমে যায়, এবং `4` কে রেজাল্ট এর মধ্যে পাই: `let result = 4`।


দয়া করে মনে রাখুন, এক্সিকিউশন কোডে আমাদের সাথে সাথে `next(4)` কে কল করতে হবে না। এটি কিছু সময় নিতে পারে। এটি সমস্যা নই জেনারেটর অপেক্ষা করবে।


উদাহরণস্বরূপ:

```js
// কিছু সময় পর জেনারেটর আবার শুরু হবে
setTimeout(() => generator.next(4), 1000);
```

আমরা দেখতে পাই যে, সাধারণ ফাংশনের বিপরীতে, জেনারেটর কল হলে ফলাফল বিনিময় করতে পারে `next/yield` মান পাসিং এর মাধ্যমে।

আরো ভালোভাবে বুঝতে, আরেকটি উদাহরণ দেখুন, একাধিক কলের জন্যঃ

```js run
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true
```

এক্সিকিউশনের ছবিঃ

![](genYield2-2.svg)

1. প্রথমে `.next()` এক্সিকিউশন শুরু হয়... এটি প্রথম `yield` এ পৌঁছায়।
2. রেজাল্ট বহিঃস্থ কোডে রিটার্ন করে।
3. দ্বিতীয়ত `.next(4)` এর মাধ্যমে প্রথম `yield` এর ফলাফল হিসেবে `4` জেনারেটরে যায়, এবং এক্সিকিউশন পুনরায় চালু হয়।
4. ...এটি দ্বিতীয় `yield` এ যায় এবং এর ফলে জেনারেটরের ফলাফল হয় `3 * 3 = ?`।
5. তৃতীয়ত `next(9)` এ `9` পাসের জন্য এটি দ্বিতীয় `yield` এর রেজাল্ট হয় এবং এক্সিকিউশন আবার শুরু হয়ে ফাংশনের শেষে পৌঁছায় এবং `done: true` হয়।

এটি অনেকটা "পিং-পং" খেলার মত. প্রতিটি `next(value)` (প্রথমটি বাদে) জেনারেটরে একটি ভ্যালূ পাস হয়, এর ফলে এটি বর্তমান `yield` এর রেজাল্ট হয়, এবং পরবর্তী `yield` টি রেজাল্টে চলে আসে।

## generator.throw

উপরের কোড হতে আমরা বুঝতে পারি, আমরা জেনারেটরে একটি ভ্যালু পাঠাতে পারি, যা `yield` এর রেজাল্ট হয়।

...কিন্ত আমরা চাইলে সেখানে একটি এরর (থ্রো) করতে পারি। এটি স্বাভাবিক কেননা ইরোরও একধরনের রেজাল্ট।

`yield` এ এরর পাস করতে চাইলে আমাদের `generator.throw(err)` কে কল করা লাগবে। এই ক্ষেত্রে, `err` টি যে লাইনে `yield` আছে সেখানে পাঠানো হবে।

উদাহরণস্বরূপ, এখানে `"2 + 2 = ?"` ইয়েল্ডটি একটি এররকে নির্দেশ করে:

```js run
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // এররটি দেখাবে
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("The answer is not found in my database")); // (2)
*/!*
```
লাইন `(2)` হতে জেনারেটরে একটি এরর এক্সেপশন থ্রো হয় যা  
`yield` এর মাধ্যমে লাইন `(1)` এ যায়। উপরের উদাহরনে `try..catch` এর মাধ্যমে এরর আমরা দেখাতে পারি।


যদি আমরা এটি ধরতে না পারি অন্যান্য এক্সেপশন এর মত, তাহলে এটি জেনারেটরের এক্সিকিউশন কোডে চলে আসবে.


আমরা `generator.throw` কে নিম্নোক্ত উপায়েও লিখতে পারি যা উপরের লাইন `(2)` এর মত। চাইলে আমরা এভাবেও এররটি ধরতে পারিঃ

```js run
function* generate() {
  let result = yield "2 + 2 = ?"; // এই লাইনে এরর হবে
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // এররটি দেখাবে
}
*/!*
```
যদি আমরা এররটি না ধরি তাহলে অন্যান্য এরর এর মত এটি আমাদের এক্সিকিউশন কোডের মধ্যে চলে যাবে এবং এর ফলে কোড এক্সিকিউশন বন্ধ হয়ে যাবে।

<<<<<<< HEAD
## সারাংশ
=======
If we don't catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

## generator.return

`generator.return(value)` finishes the generator execution and return the given `value`.

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
```

If we again use `generator.return()` in a completed generator, it will return that value again ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)).

Often we don't use it, as most of time we want to get all returning values, but it can be useful when we want to stop generator in a specific condition.

## Summary
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96

- জেনারেটর তৈরী হয় জেনারেটর ফাংশনের মাধ্যমে `function* f(…) {…}`।
- (শুধু) জেনারেটরের মধ্যে `yield` অপারেটর থাকে।
- এক্সিকিউশন কোড এবং জেনারেটর কোডের রেজাল্ট `next/yield` কলের মাধ্যমে বিনিময় হয়।

মডার্ন জাভাস্ক্রিপ্টে জেনারেটরের ব্যবহার কম। কিন্তু অনেক সময় এটি কাজে আসে, কারণ এক্সিকিউশন কোড এবং ফাংশন কোডে ডাটা বিনিময় টা অতুলনীয়। এবং এদের মাধ্যমে সহজে ইটারেবল অবজেক্ট তৈরি করা যায়।

এছাড়াও পরবর্তী অধ্যায়ে আমরা শিখব `async generators`, যার মাধ্যমে আমরা `for await ... of` এর মধ্যে অ্যাসিনক্রোনাস জেনারেটর ডাটা স্ট্রিম (যেমনঃ নেটওয়ার্কের মাধ্যমে পেজিনেশন)করতে পারি ।

ওয়েব-প্রোগ্রামিংয়ে আমরা প্রায় ডাটা স্ট্রিম নিয়ে কাজ করি, সুতরাং এটিও অন্য আরেকটি গুরত্বপূর্ণ ব্যবহারের ক্ষেত্র।

# Logical operators

<<<<<<< HEAD
জাভাস্ক্রিপ্টে তিনটি লজিক্যাল অপারেটর রয়েছে: `||` (OR), `&&` (AND), `!` (NOT).
=======
There are four logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT), `??` (Nullish Coalescing). Here we cover the first three, the `??` operator is in the next article.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

যদিও তাদের "লজিক্যাল" বলা হয়, সেগুলি কেবল বুলিয়ান নয়, যে কোনও ধরণের মানগুলিতে প্রয়োগ করা যেতে পারে। তাদের ফলাফলও যে কোনও ধরণের হতে পারে।

আসুন বিস্তারিত দেখি।

## || (OR)

"OR" অপারেটরটি দুটি উল্লম্ব লাইন চিহ্ন সহ উপস্থাপিত হয়:

```js
result = a || b;
```

ক্লাসিকাল প্রোগ্রামিংয়ে, লজিক্যাল OR বোঝানো হয় কেবল বুলিয়ান মানগুলি চালিত করার জন্য। যদি এর কোন যুক্তি থাকে `true`, এটি দেখাবে `true`, নতুবা এটি দেখাবে `false`.

জাভাস্ক্রিপ্টে অপারেটরটি কিছুটা কৌতুকপূর্ণ এবং আরও শক্তিশালী। তবে প্রথমে, আসুন দেখি বুলিয়ান মানগুলির সাথে কী ঘটে।

এখানে চারটি সম্ভাব্য যৌক্তিক সমন্বয় রয়েছে:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

যেমনটি আমরা দেখতে পাচ্ছি, ফলাফলটি সর্বদা `true` ক্ষেত্রে বাদে সর্বদা উভয় `true` হয় অথবা যখন উভয় অপারেশন `false` থাকে।

যদি কোনও অপারেন্ড বুলিয়ান না হয় তবে তা মূল্যায়নের জন্য বুলিয়ানে রূপান্তরিত হয়।

উদাহরণস্বরূপ, `1` সংখ্যাটিকে `true` হিসাবে গণ্য করা হয়, `0` সংখ্যাটিকে `false` হিসাবে ধরা হয়:

```js run
if (1 || 0) { // works just like if( true || false )
  alert( 'truthy!' );
}
```

অধিকাংশ সময়, OR `||` একটি `if` বিবৃতিতে ব্যবহৃত হয় পরীক্ষা যদি *any* প্রদত্ত শর্তগুলির মধ্যে `true` হয়।

উদাহরণ স্বরূপ:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' );
}
```

আমরা আরও শর্তগুলি পাস করতে পারি:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is the weekend
}
```

## OR "||" finds the first truthy value

উপরে বর্ণিত যুক্তি কিছুটা ক্লাসিকাল। এখন, জাভাস্ক্রিপ্টের "অতিরিক্ত" বৈশিষ্ট্যগুলি নিয়ে আসি।

বর্ধিত অ্যালগরিদম নিম্নলিখিত হিসাবে কাজ করে।

একাধিক OR'এর মান দেওয়া হয়েছে:

```js
result = value1 || value2 || value3;
```

OR `||` অপারেটর নিম্নলিখিতটি করে:

- বাম থেকে ডানে অপারেশনগুলির মূল্যায়ন করে।
- প্রতিটি অপারেন্ডের জন্য, এটিকে বুলিয়ান রূপান্তর করে। যদি ফলাফলটি `true` হয়, থামে এবং সেই অপারেন্ডের মূল মানটি প্রদান করে।
- যদি সমস্ত অপারেটর মূল্যায়ন করা হয় (যেমন সমস্তগুলি `false` ছিল), সর্বশেষ অপারেন্ডটি প্রদান করে।

কোনও মান রূপান্তর ছাড়াই মূল আকারে ফিরে আসে।

<<<<<<< HEAD
অন্য কথায়, OR `" || "` এর একটি শৃঙ্খলা truthy মান না পাওয়া গেলে প্রথম truthy মান বা শেষটি প্রদান করে।
=======
In other words, a chain of OR `||` returns the first truthy value or the last one if no truthy value is found.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

এই ক্ষেত্রে:

```js run
alert( 1 || 0 ); // 1 (1 is truthy)

alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)

alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)
```

এটি "pure, classical, boolean-only OR" এর তুলনায় কিছু আকর্ষণীয় ব্যবহারের দিকে নিয়ে যায়।

1. **ভেরিয়েবল বা এক্সপ্রেশনগুলির একটি তালিকা থেকে প্রথম truthy মান পাওয়া।**

<<<<<<< HEAD
    কল্পনা করুন যে আমাদের ভেরিয়েবলের একটি তালিকা রয়েছে যা হয় তথ্য ধারণ করতে পারে বা `null/undefined`। আমরা ডেটা সহ প্রথমটি কীভাবে খুঁজে পাব?

    আমরা OR ব্যবহার করতে পারি `||`:
=======
    For instance, we have `firstName`, `lastName` and `nickName` variables, all optional (i.e. can be undefined or have falsy values).

    Let's use OR `||` to choose the one that has the data and show it (or `"Anonymous"` if nothing set):
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

    ```js run
    let firstName = "";
    let lastName = "";
    let nickName = "SuperCoder";

    *!*
    alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
    */!*
    ```

<<<<<<< HEAD
    যদি `currentUser` এবং `defaultUser` উভয়ই মিথ্যা হয়ে থাকে তবে, `"unnamed"` ফলাফল হবে।
2. **শর্ট সার্কিট মূল্যায়ন।**

    অপারেন্ডগুলি কেবল মানগুলিই নয়, স্বেচ্ছাসেবী অভিব্যক্তি হতে পারে। বা তাদের বাম থেকে ডানে মূল্যায়ন করে এবং পরীক্ষা করে। সত্যবাদী মান পৌঁছালে মূল্যায়ন বন্ধ হয়ে যায় এবং মানটি ফিরে আসে। এই প্রক্রিয়াটিকে "একটি সংক্ষিপ্ত-সার্কিট মূল্যায়ন" বলা হয় কারণ এটি বাম থেকে ডানে যতটা সম্ভব সংক্ষিপ্ত হয়ে যায়।

    দ্বিতীয় আর্গুমেন্ট হিসাবে দেওয়া এক্সপ্রেশনটির একটি ভেরিয়েবল অ্যাসাইনমেন্টের মতো পার্শ্ব প্রতিক্রিয়া থাকলে এটি স্পষ্টভাবে দেখা যায়।

    নীচের উদাহরণে, `x` নির্ধারিত হয় না:
=======
    If all variables were falsy, `"Anonymous"` would show up.

2. **Short-circuit evaluation.**

    Another feature of OR `||` operator is the so-called "short-circuit" evaluation.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

    It means that `||` processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

    That importance of this feature becomes obvious if an operand isn't just a value, but an expression with a side effect, such as a variable assignment or a function call.

<<<<<<< HEAD
    alert(x); // undefined, because (x = 1) not evaluated
    ```

    পরিবর্তে, যদি প্রথম যুক্তিটি হল `false`, `|| one দ্বিতীয়টির মূল্যায়ন করে, সুতরাং এই নিয়োগটি চালাবেন:
=======
    In the example below, only the second message is printed:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

    ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
    ```

<<<<<<< HEAD
    একটি অ্যাসাইনমেন্ট একটি সহজ কেস। পার্শ্ব প্রতিক্রিয়া থাকতে পারে, মূল্যায়ন যদি না পৌঁছে যায় তবে তা প্রদর্শিত হবে না।

    আমরা দেখতে পাচ্ছি, এরকম ব্যবহারের কেসটি "`if`" করার ছোট উপায়। প্রথম অপারেন্ড বুলেয়ানে রূপান্তরিত হয়। যদি এটি মিথ্যা হয় তবে দ্বিতীয়টি মূল্যায়ন করা হয়।

    বেশিরভাগ সময়, কোডটি সহজেই বোঝার জন্য "নিয়মিত" `if` ব্যবহার করা আরও ভাল তবে কখনও কখনও এটি কার্যকরও হতে পারে।
=======
    In the first line, the OR `||` operator stops the evaluation immediately upon seeing `true`, so the `alert` isn't run.

    Sometimes, people use this feature to execute commands only if the condition on the left part is falsy.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## && (AND)

অ্যান্ড অপারেটরটি দুটি এম্পারস্যান্ডের সাথে প্রতিনিধিত্ব করে `&&`:

```js
result = a && b;
```

ক্লাসিকাল প্রোগ্রামিংয়ে, এবং উভয় অপারেন্ড truthy এবং অন্যথায় `মিথ্যা` যদি সত্য হয় - ফেরত দেয়:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

`If` এর সাথে একটি উদাহরণ:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'The time is 12:30' );
}
```

ঠিক যেমন OR এর সাথে, কোনও মান AND এর অপারেন্ড হিসাবে অনুমোদিত:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```


## AND "&&" finds the first falsy value

একাধিক AND'এর মান দেওয়া:

```js
result = value1 && value2 && value3;
```

AND `&&` অপারেটর নিম্নলিখিতগুলি করে:

- বাম থেকে ডানে অপারেশনগুলির মূল্যায়ন করে।
- প্রতিটি অপারেন্ডের জন্য, এটিকে বুলিয়ান রূপান্তরিত করে। যদি ফলাফলটি `false` হয় তবে থামিয়ে দেয় এবং সেই অপারেন্ডের মূল মানটি দেয়।
- যদি সমস্ত অপারেন্ডের মূল্যায়ন করা হয় (যেমন সমস্ত truthy ছিল), সর্বশেষ অপারেন্ডটি ফেরত দেয়।

অন্য কথায়, এবং যদি কোনওটি না পাওয়া যায় তবে প্রথম মিথ্যা মান বা শেষ মানটি প্রদান করে।

উপরের নিয়মগুলি OR এর মতো। পার্থক্যটি হল এবং প্রথম *falsy* মান প্রদান করে বা OR প্রথম *truthy* দেয়।

উদাহরণ:

```js run
// if the first operand is truthy,
// AND returns the second operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

আমরা একটি সারিতে বেশ কয়েকটি মান পাস করতে পারি। প্রথম falsy কীভাবে ফিরে আসে দেখুন:

```js run
alert( 1 && 2 && null && 3 ); // null
```

সমস্ত মান truthy হলে শেষ মানটি ফিরে আসে:

```js run
alert( 1 && 2 && 3 ); // 3, the last one
```

````smart header="Precedence of AND `&&` is higher than OR `||`"
এবং `&&` অপারেটরের অগ্রাধিকার OR `||` এর চেয়ে বেশি।

সুতরাং কোড `a && b || c && d` মূলত একই হিসাবে যদি `&&` এক্সপ্রেশনগুলি প্রথম বন্ধনে ছিল: `(a && b) || (c && d)`।````

<<<<<<< HEAD
=======
````warn header="Don't replace `if` with `||` or `&&`"
Sometimes, people use the AND `&&` operator as a "shorter way to write `if`".
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

ঠিক যেমন OR, এবং AND && অপারেটর কখনও কখনও `if` প্রতিস্থাপন করতে পারে।

এই ক্ষেত্রে:

```js run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

কেবল ডান অংশের ক্রিয়াটি `&&` এর তখনই চালিত হবে যদি মূল্যায়ন পৌছে যায়। এটি কেবলমাত্র যদি `(x> 0)` সত্য হয়।

সুতরাং আমাদের কাছে মূলত এর জন্য একটি অনুরূপ উদাহরণ রয়েছে:

```js run
let x = 1;

if (x > 0) alert( 'Greater than zero!' );
```

<<<<<<< HEAD
সংক্ষিপ্ত প্রদর্শিত হয় `&&` এর সঙ্গে ভিন্ন। তবে `if` আরও সুস্পষ্ট এবং কিছুটা বেশি পাঠযোগ্য।

সুতরাং আমরা প্রতিটি নির্মাণকে এর লক্ষ্যে ব্যবহার করার পরামর্শ দিচ্ছি: আমরা চাইলে `if` ব্যবহার করি এবং যদি আমরা চাইলে `&&` ব্যবহার করি।
=======
Although, the variant with `&&` appears shorter, `if` is more obvious and tends to be a little bit more readable. So we recommend using every construct for its purpose: use `if` if we want `if` and use `&&` if we want AND.
````

>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## ! (NOT)

বুলিয়ান `NOT` অপারেটরকে বিস্মৃত চিহ্ন হিসাবে উপস্থাপন করা হয় `!`।

বাক্য গঠনটি বেশ সহজ:

```js
result = !value;
```

অপারেটর একটি একক যুক্তি গ্রহণ করে এবং নিম্নলিখিতটি করে:

1. অপারেন্ডকে বুলিয়ান ধরণে রূপান্তর করে: `true/false`.
2. বিপরীত মান প্রদান করে।

এই ক্ষেত্রে:

```js run
alert( !true ); // false
alert( !0 ); // true
```

একটি ডাবল NOT `!!` কখনও কখনও বুলিয়ান ধরণের মান রূপান্তর করার জন্য ব্যবহৃত হয়:

```js run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

অর্থাত্‍, প্রথমটি NOT বুলিয়ানকে রূপান্তর করে এবং বিপরীতটি দেয় এবং দ্বিতীয়টি এটি আবার বিপরীত হয় না। শেষ পর্যন্ত, আমাদের কাছে বুলিয়ান রূপান্তর রয়েছে।

একই জিনিসটি করার জন্য আরও কিছু শব্দবহুল উপায় রয়েছে - একটি অন্তর্নির্মিত `Boolean` ফাংশন:

```js run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

NOT `!` এর নজির সমস্ত লজিকাল অপারেটরগুলির মধ্যে সর্বোচ্চ, সুতরাং এটি সর্বদা প্রথম `&&` অথবা `||` এর আগে কার্যকর করে।

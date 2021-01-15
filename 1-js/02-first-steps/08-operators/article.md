# বেসিক অপারেটর আর গণিত

আমরা স্কুলে অনেক অপারেটর সম্পর্কে জেনেছি। যেমন যোগ `+`, গুণ `*`, বিয়োগ `-`, এরকম আরও।

এই অধ্যায়ে আমরা সহজ কিছু অপারেটর দিয়ে শুরু করবো, তারপর জাভাস্ক্রিপ্ট এর অপারেটরের দিকে মনযোগ দিবো, যেগুলো স্কুলের গণিতে ছিল না।

## টার্ম: "ইউনারি", "বাইনারি", "অপারেন্ড"

শুরু করার আগে কিছু সাধারণ টার্মিনোলজি জেনে নিই।

- *অপারেন্ড* -- হচ্ছে অপারেটর যার বা যাদের ওপর কাজ করে। যেমন, `৫ * ২` এর গুণে দুইটি অপারেন্ড আছে: বামের অপারেন্ড হচ্ছে `৫` এবং ডানের অপারেন্ড হচ্ছে `২`। অনেকে অপারেন্ডকে আর্গুমেন্টও বলে থাকে।
- কোনো অপারেটরকে *ইউনারি* বলা হয় যদি এর শুধু একটিই অপারেটর থাকে। যেমন, ইউনারি নেগেশন `-` কোনো সংখ্যার চিহ্ন পরিবর্তন করে:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -১, ইউনারি নেগেশনের পর
    ```
- কোনো অপারেটরকে *বাইনারি* বলা হয় যদি এর দুইটি অপারেটর থাকে। একই মাইনাস চিহ্নর বাইনারি রূপ:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // ২, বাইনারি মাইনাস বিয়োগের কাজ করে
    ```

    ভালোভাবে বলতে গেলে, উপরের উদাহরণ দুটোয় আমরা দুইটি অপারেটর দেখিয়েছে যাদের চিন্ন একই: ইউনারি নেগেশন অপারেটর, যেই অপারেটর কোনো সংখ্যার চিহ্ন পরিবর্তন করে, এবং বিয়োগ অপারেটর, যেই বাইনারি অপারেটর একটি সংখ্যা থেকে অন্য সংখ্যা বিয়‌োগ করে।

## গণিত

নিচের গাণিতিক অপারেটরগুলো ব্যবহার করা যাবে:

- যোগ `+`,
- বিয়োগ `-`,
- গুণ `*`,
- ভাগ `/`,
- ভাগশেষ `%`,
- ঘাত `**`.

প্রথম চারটি অপারেশন দেখেই বুঝা যাচ্ছে, `%` আর `**` নিয়ে আরও কিছু বলার দরকার।

### ভাগশেষ %

ভাগশেষ অপারেটর `%`, দেখে শতকরার মতো মনে হলেও শতকরার সাথে এর কোনো সম্পর্ক নেই।

`a % b` এই অপারেশনের রেজাল্ট হচ্ছে `a` কে `b` দিয়ে ভাগ করার পর যা থাকে, বা [ভাগশেষ](https://en.wikipedia.org/wiki/Remainder)।

যেমন:

```js run
alert( 5 % 2 ); // ১, ৫ কে ২ দিয়ে ভাগ করার পর ভাগশেষ
alert( 8 % 3 ); // ২, ৮ কে ৩ দিয়ে ভাগ করার পর ভাগশেষ
```

### সূচক **

সূচক অপারেটর `a ** b`, `a` কে `b` বার নিজেকে নিজে গুণ করে।

যেমন:

```js run
alert( 2 ** 2 ); // ৪  (দুইকে দুইবার গুণ)
alert( 2 ** 3 ); // ৮  (২ * ২ * ২, ৩ বার)
alert( 2 ** 4 ); // ১৬ (২ * ২ * ২ * ২, ৪ বার)
```

গণিতে সূচক নন-ইন্টিজার বা অপূর্ণ সংখ্যার জন্যও প্রযোজ্য। যেমন, বর্গমূল হচ্ছে `১/২` দিয়ে ঘাত করা:

```js run
alert( 4 ** (1/2) ); // ২ (কোনো সংখ্যার সূচক ১/২ আর সংখ্যাটির বর্গমূল এক)
alert( 8 ** (1/3) ); // ২ (কোনো সংখ্যার সূচক ১/৩ আর সংখ্যাটির ঘনমূল এক)
```


## বাইনারি + দিয়ে স্ট্রিং জোড়া দেয়া

এবার আমরা জাভাস্ক্রিপ্ট অপারেটরের কিছু বিশেষত্ব দেখি যেগুলো স্কুলের পাটিগণিতের বাইরে।

সাধারণত, প্লাস অপারেটর `+` সংখ্যা যোগ করে।

কিন্তু যদি এই বাইনারি `+` স্ট্রিংয়ের সাথে ব্যবহার করা হয়, তাহলে এই অপারেটর স্ট্রিং দুটোকে জোড়া দেয়:

```js
let s = "my" + "string";
alert(s); // mystring
```

খেয়াল রাখতে হবে, যদি কোনো অপারেটর স্ট্রিং হয়, তাহলে অন্য অপারেটরটিও আগে স্ট্রিং এ রূপান্তরিত হবে।

যেমন:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

লক্ষ্য করুন, কোন অপারেন্ডটি স্ট্রিং সেটা কোনো বিষয় না।

আরেকটি একটু জটিল উদাহরণ:

```js run
alert(2 + 2 + '1' ); // "41", "221" না
```

এখানে অপারেটরগুলো একটির পর আরেকটি কাজ করেছে। প্রথম `+` দুইটি সংখ্যাকে যোগ করেছে, তাই এটা `4` রিটার্ন করে, তারপর পরের `+` এর সাথে স্ট্রিং `1` যোগ করে, তাই `4 + '1' = 41`।

বাইনারি `+` ই একমাত্র অপারেটর যেটি স্ট্রিং সাপোর্ট করে। অন্যন্য অপারেটর শুধু সংখ্যা নিয়ে কাজ করে আর সবসময় এর অপারেন্ডগুলোকে সংখ্যায় রূপান্তর করে নেয়।

এখানে বিয়োগ আর ভাগ করে দেখানো হলো:

```js run
alert( 6 - '2' ); // 4, '2' কে আগে সংখ্যায় রূপান্তর করে নিয়েছে
alert( '6' / '2' ); // 3, দুটো অপারেটরকেই সংখ্যায় রূপান্তর করে নিয়েছে
```

## গাণিতিক রূপান্তর, ইউনারি +

প্লাস `+` অপারেটরের দুইটি ফর্ম আছে: বাইনারি ফর্ম যা আমরা উপরে দেখলাম, আর ইউনারি ফর্ম।

ইউনারি প্লাস, বা, অন্য কথায়, প্লাস অপারেটর `+` যা একটি সংখ্যার সাথে ব্যবহার করা হয়, সংখ্যাটিকে কিছুই করে না। কিন্তু অপারেন্ড যদি সংখ্যা না হয়, তবে সেটিকে সংখ্যায় রূপান্তর করে।

উদাহরণ:

```js run
// সংখ্যার উপর কোনো প্রভাব নাই
let x = 1;
alert( +x ); // ২

let y = -2;
alert( +y ); // -২

*!*
// সংখ্যায় রূপান্তর করে
alert( +true ); // ১
alert( +"" );   // ০
*/!*
```

এটা আসলে `Number(...)` যা করে ঠিক তাই করে, শুধু সংক্ষিপ্ত রূপ।

প্রায় সময়ই স্ট্রিংকে নাম্বারে রূপান্তর করার দরকার হতে পারে। যেমন, যদি আমরা HTML এর ফর্ম ফিল্ড থেকে ভ্যালু নিই, সেগুলো বেশিরভাগ সময়ই স্ট্রিং হয়। কিন্তু যদি সেগুলো যোগ করার দরকার পড়ে?

বাইনারি `+` স্ট্রিং হিসেবেই যোগ করবে:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", বাইনারি প্লাস স্ট্রিং জোড়া দেয়
```

যদি আমরা এদেরকে সংখ্যা হিসেবে ব্যবহার করতে চাই, তাহলে আগে এদের সংখ্যায় রূপান্তর করতে হবে:

```js run
let apples = "2";
let oranges = "3";

*!*
// দুইটি মানই বাইনারি প্লাসের আগে সংখ্যায় রূপান্তরিত হয়েছে
alert( +apples + +oranges ); // ৫
*/!*

// একটু বড় ভার্সন
// alert( Number(apples) + Number(oranges) ); // ৫
```

একজন ম্যাথমেটিশিয়ানের দিক থেকে চিন্তা করলে, অযথা প্লাসের ব্যবহার অদ্ভুত লাগতে পারে। কিন্তু একজন প্রোগ্রামারের কাছে এটা তেমন কিছুই না: ইউনারি প্লাস আগে কাজ করে স্ট্রিংকে সংখ্যায় রূপান্তর করে, তারপর বাইনারি প্লাস তাদের যোগ করে।

কেন বাইনারি প্লাসের আগে ইউনারি প্লাস কাজ করে? আমরা যেমনটা দেখতে যাচ্ছি, এর কারণ ইউনারি প্লাসের *প্রিসিডেন্স বেশি*।

## অপারেটরের প্রিসিডেন্স

একটা এক্সপ্রেশনে যদি একাধিক অপারেটর থাকে, তবে তাদের এক্সিকিউশন অর্ডার তাদের *প্রিসিডেন্স* দিয়ে নির্ধারিত হয়, বা অন্য কথায়, অপারেটরদের ডিফল্ট প্রায়োরিটি অর্ডার অনুযায়ী।

স্কুলে আমরা শিখেছি `1 + 2 * 2` এক্সপ্রেশনের গুণ যোগের আগে করতে হবে। এই জিনিসটাই হচ্ছে প্রিসিডেন্স। গুণের প্রিসিডেন্স যোগের চেয়ে *বেশি*।

ব্র্যাকেট যেকোনো প্রিসিডেন্সকে ওভাররাইড করে, সেজন্য আমরা যদি ডিফল্ট প্রিসিডেন্স নিয়ে খুশি না হই, আমরা ব্র্যাকেট ব্যবহার করে সেটা বদলাতে পারি। যেমন লিখতে পারেন `(1 + 2) * 2`।

জাভাস্ক্রিপ্টে অনেক অপারেটর আছে। প্রত্যেক অপারেটরের একটি প্রিসিডেন্স নাম্বার আছে। যাদের নাম্বার বেশি তারা এক্সিকিউট হবে। প্রিসিডেন্স এক হলে বাম থেকে ডানে এক্সিকিউট হবে।

এটা [প্রিসিডেন্স টেবিলের](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) একটা অংশ (আপনার এটা মনে রাখতে হবে না, শুধু লক্ষ্য করুন ইউনারি অপারেটরদের প্রিসিডেন্স তাদের সংশ্লিষ্ট বাইনারি অপারেটরের চেয়ে বেশি প্রিসিডেন্স):

| প্রিসিডেন্স | নাম | চিহ্ন |
|------------|------|------|
| ... | ... | ... |
| ১৭ | ইউনারি প্লাস | `+` |
| ১৭ | ইউনারি নেগেশন | `-` |
| ১৬ | সূচক | `**` |
| ১৫ | গুণ | `*` |
| ১৫ | ভাগ | `/` |
| ১৩ | যোগ | `+` |
| ১৩ | বিয়োগ | `-` |
| ... | ... | ... |
| ৩ | অ্যাসাইনমেন্ট | `=` |
| ... | ... | ... |

আমরা দেখতে পাচ্ছি, "ইউনারি প্লাসের" প্রায়োরিটি `১৭` যা যোগের (বাইনারি প্লাস) `১৩` এর চেয়ে বেশি। এজন্য `"+apples + +oranges"` এক্সপ্রেশনে ইউনারি প্লাস বাইনারি প্লাসের আগে কাজ করেছিলো।

## অ্যাসাইনমেন্ট

খেয়াল রাখবেন অ্যাসাইনমেন্টও `=` একটি অপারেটর। এটা প্রিসিডেন্স টেবিলের প্রায় নিচের দিকে খুব কম প্রায়োরিটি `৩` নিয়ে অবস্থান করছে।

এজন্য যখন আমরা `x = 2 * 2 + 1` এভাবে ভ্যারিয়েবল অ্যাসাইন করি তখন ক্যালকুলেশন আগে করা হয় আর তারপর `=` এর কাজ হয় যা হলো `x` এ ফলাফলটা জমা রাখা।

```js
let x = 2 * 2 + 1;

alert( x ); // ৫
```

### অ্যাসাইনমেন্ট = একটা ভ্যালু রিটার্ন করা

`=` যে একট অপারেটর, কোনো জাদুকরি ল্যাঙ্গুয়েজ কনস্ট্রাকট না, তার একটা মজার প্রমাণ আছে।

জাভাস্ক্রিপ্টের বেশিরভাগ অপারেটরই একটি ভ্যালু রিটার্ন করে। আমরা `+` আর `-` এর ক্ষেত্রে তো বুঝতেই পারছি, কিন্তু এটা `=` এর জন্যও প্রযোজ্য।

`x = value` এক্সপ্রেশন কল `value` কে `x` এ লিখে *এবং তারপর সেটা রিটার্ন করে*।

এখানে আরেকটু জটিল এক্সপ্রেশনে অ্যাসাইনমেন্ট ব্যবহার করে দেখানো হলো:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // ৩
alert( c ); // ০
```

এই উদাহরণে, এক্সপ্রেশন `(a = b + 1)` এর ফলাফল হচ্ছে যেই ভ্যালুটি `a` তে অ্যাসাইন করা হলো (যা হচ্ছে `৩`)। এটা এরপর আরও ইভ্যালুয়েশনের জন্য ব্যবহার করা হয়েছে।

মজার কোড, তাই না? আমাদের এটা কীভাবে কাজ করে তা বুঝা উচিৎ, কারণ আমরা প্রায়ই এটা জাভাস্ক্রিপ্ট লাইব্রেরিগুলোতে দেখতে পাবো।

যদিও দয়া করে এরকম কোড লিখবেন না। এরকম ট্রিক কোড একদমই পরিষ্কার বা পড়ার মতো রাখে না।

### চেইনিং অ্যাসাইনমেন্ট

আরেকটা মজার বৈশিষ্ট্য হচ্ছে অ্যাসাইনমেন্ট চেইন করা:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // ৪
alert( b ); // ৪
alert( c ); // ৪
```

চেইন করা অ্যাসাইনমেন্ট ডান থেকে বামে ইভ্যালুয়েট হয়। প্রথমে, একদম ডানের এক্সপ্রেশন `2 + 2` ইভ্যালুয়েট হয় আর বামের ভ্যারিয়েবলগুলো: `c`, `b` এবং `a` তে অ্যাসাইন হয়। সবশেষে সবগুলো ভ্যারিয়েবল একটি ভ্যালুই শেয়ার করে।

আবারও, কোড রিডেবল রাখার জন্য এরকম কোডকে একাধিক লাইনে ভাগ করে নেয়া ভালো:

```js
c = 2 + 2;
b = c;
a = c;
```
এটা পড়তে সহজ, বিশেষ করে যখন কোড পড়ার আগে প্রথমে চোখ বুলিয়ে নিচ্ছেন।

## Modify-in-place

We often need to apply an operator to a variable and store the new result in that same variable.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using the operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=`, etc.

Such operators have the same precedence as a normal assignment, so they run after most other calculations:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (right part evaluated first, same as n *= 8)
```

## Increment/decrement

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for it:

- **Increment** `++` increases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Decrement** `--` decreases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
    ```

```warn
Increment/decrement can only be applied to variables. Trying to use it on a value like `5++` will give an error.
```

The operators `++` and `--` can be placed either before or after a variable.

- When the operator goes after the variable, it is in "postfix form": `counter++`.
- The "prefix form" is when the operator goes before the variable: `++counter`.

Both of these statements do the same thing: increase `counter` by `1`.

Is there any difference? Yes, but we can only see it if we use the returned value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is no exception. The prefix form returns the new value while the postfix form returns the old value (prior to increment/decrement).

To see the difference, here's an example:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

In the line `(*)`, the *prefix* form `++counter` increments `counter` and returns the new value, `2`. So, the `alert` shows `2`.

Now, let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

In the line `(*)`, the *postfix* form `counter++` also increments `counter` but returns the *old* value (prior to increment). So, the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, there is no difference in which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to increase a value *and* immediately use the result of the operator, we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment a value but use its previous value, we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
The operators `++/--` can be used inside expressions as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically okay, such notation usually makes code less readable. One line does multiple things -- not good.

While reading code, a fast "vertical" eye-scan can easily miss something like `counter++` and it won't be obvious that the variable increased.

We advise a style of "one line -- one action":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operators

Bitwise operators treat arguments as 32-bit integer numbers and work on the level of their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) chapter on MDN when a need arises.

## Comma

The comma operator `,` is one of the rarest and most unusual operators. Sometimes, it's used to write shorter code, so we need to know it in order to understand what's going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma `,`. Each of them is evaluated but only the result of the last one is returned.

For example:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Here, the first expression `1 + 2` is evaluated and its result is thrown away. Then, `3 + 4` is evaluated and returned as the result.

```smart header="Comma has a very low precedence"
Please note that the comma operator has very low precedence, lower than `=`, so parentheses are important in the example above.

Without them: `a = 1 + 2, 3 + 4` evaluates `+` first, summing the numbers into `a = 3, 7`, then the assignment operator `=` assigns `a = 3`, and the rest is ignored. It's like `(a = 1 + 2), 3 + 4`.
```

Why do we need an operator that throws away everything except the last expression?

Sometimes, people use it in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks. That's why we're mentioning them. But usually they don't improve code readability so we should think well before using them.

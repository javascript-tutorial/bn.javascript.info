# বেসিক অপারেটর আর গণিত

আমরা স্কুলে অনেক অপারেটর সম্পর্কে জেনেছি। যেমন যোগ `+`, গুণ `*`, বিয়োগ `-`, এরকম আরও।

এই অধ্যায়ে আমরা সহজ কিছু অপারেটর দিয়ে শুরু করবো, তারপর জাভাস্ক্রিপ্টের বিশেষ কিছু অপারেটরের দেখবো যেগুলো স্কুলের পাটিগণিতে ছিল না।

## টার্মস: "ইউনারি", "বাইনারি", "অপারেন্ড"

শুরু করার আগে সাধারণ কিছু টার্মিনোলজি জেনে নিই।

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

    ভালোভাবে বলতে গেলে, উপরের উদাহরণ দুটোয় আমরা দুইটি অপারেটর দেখিয়েছে যাদের চিহ্ন একই: ইউনারি নেগেশন অপারেটর, যেই অপারেটর কোনো সংখ্যার চিহ্ন পরিবর্তন করে, এবং বিয়োগ অপারেটর, যেই বাইনারি অপারেটর একটি সংখ্যা থেকে অন্য সংখ্যা বিয়োগ করে।

## গণিত

নিচের গাণিতিক অপারেটরগুলো ব্যবহার করা যাবে:

- যোগ `+`,
- বিয়োগ `-`,
- গুণ `*`,
- ভাগ `/`,
- ভাগশেষ `%`,
- সূচক `**`.

প্রথম চারটি অপারেশন দেখেই বুঝা যাচ্ছে, `%` আর `**` নিয়ে আরও কিছু বলার দরকার।

### ভাগশেষ %

ভাগশেষ অপারেটর `%`, দেখে শতকরার মতো মনে হলেও শতকরার সাথে এর কোনো সম্পর্ক নেই।

`a % b` এই অপারেশনের রেজাল্ট হচ্ছে `a` কে `b` দিয়ে ভাগ করার পর যা অবশিষ্ট থাকে, বা [ভাগশেষ](https://en.wikipedia.org/wiki/Remainder)।

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
alert( 4 ** (1/2) ); // ২ (কোনো সংখ্যার সূচক ১/২ আর সংখ্যাটির বর্গমূল একই)
alert( 8 ** (1/3) ); // ২ (কোনো সংখ্যার সূচক ১/৩ আর সংখ্যাটির ঘনমূল একই)
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
alert( +x ); // ১

let y = -2;
alert( +y ); // -২

*!*
// সংখ্যায় রূপান্তর করা
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

একজন গণিতবিদের দিক থেকে চিন্তা করলে, অযথা প্লাসের ব্যবহার অদ্ভুত লাগতে পারে। কিন্তু একজন প্রোগ্রামারের কাছে এটা তেমন কিছুই না: ইউনারি প্লাস আগে কাজ করে স্ট্রিংকে সংখ্যায় রূপান্তর করে, তারপর বাইনারি প্লাস তাদের যোগ করে।

কেন বাইনারি প্লাসের আগে ইউনারি প্লাস কাজ করে? আমরা যেমনটা দেখতে যাচ্ছি, এর কারণ ইউনারি প্লাসের *প্রিসিডেন্স বেশি*।

## অপারেটরের প্রিসিডেন্স

একটা এক্সপ্রেশনে যদি একাধিক অপারেটর থাকে, তবে তাদের এক্সিকিউশন অর্ডার তাদের *প্রিসিডেন্স* দিয়ে নির্ধারিত হয়, বা অন্য কথায়, অপারেটরদের ডিফল্ট প্রায়োরিটি অর্ডার অনুযায়ী।

স্কুলে আমরা শিখেছি `1 + 2 * 2` এক্সপ্রেশনের গুণের কাজ যোগের আগে করতে হয়। এই জিনিসটাই হচ্ছে প্রিসিডেন্স। গুণের প্রিসিডেন্স যোগের চেয়ে *বেশি*।

ব্র্যাকেট যেকোনো প্রিসিডেন্সকে ওভাররাইড করে, সেজন্য আমরা যদি ডিফল্ট প্রিসিডেন্স নিয়ে খুশি না হই, আমরা ব্র্যাকেট ব্যবহার করে সেটা বদলাতে পারি। যেমন লিখতে পারেন `(1 + 2) * 2`।

জাভাস্ক্রিপ্টে অনেক অপারেটর আছে। প্রত্যেক অপারেটরের একটি প্রিসিডেন্স নাম্বার আছে। যাদের নাম্বার বেশি তারা আগে এক্সিকিউট হবে। প্রিসিডেন্স এক হলে বাম থেকে ডানে এক্সিকিউট হবে।

এটা [প্রিসিডেন্স টেবিলের](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) একটা অংশ (আপনার এটা মনে রাখতে হবে না, শুধু লক্ষ্য করুন ইউনারি অপারেটরদের প্রিসিডেন্স তাদের সংশ্লিষ্ট বাইনারি অপারেটরের চেয়ে বেশি):

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

মজার কোড, তাই না? আমাদের এটা কীভাবে কাজ করে তা বুঝা উচিৎ, কারণ আমরা অনেক সময় এটা জাভাস্ক্রিপ্ট লাইব্রেরিগুলোতে দেখতে পাবো।

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

## ইন-প্লেসে মডিফাই করা

মাঝেমধ্যেই আমাদের একটি ভ্যারিয়েবলের উপর অপারেটর ব্যবহার করে আবার একই ভ্যারিয়েবলেই ফলাফলটি রাখা লাগতে পারে।

যেমন:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

এই নোটেশনটি `+=` আর `*=` অপারেটর ব্যবহার করে ছোট করা যেতে পারে:

```js run
let n = 2;
n += 5; // এখন n = 7 (n = n + 5 এর মতই)
n *= 2; // এখন n = 14 (n = n * 2 এর মতই)

alert( n ); // 14
```

সংক্ষিপ্ত "মডিফাই-এবং-অ্যাসাইন" অপারেটর আছে সব গাণিতিক ও বিটওয়াইজ অপারেটরের জন্যই: `/=`, `-=`, ইত্যাদি।

নরমাল অ্যাসাইনমেন্টের মতই এদের প্রিসিডেন্স, তাই এরা অন্যান্য ক্যালকুলেশনের পর কাজ করে:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (ডান অংশ আগে ইভ্যালুয়েট হয়, n *= 8 এর অনুরূপ)
```

## ইনক্রিমেন্ট/ডিক্রিমেন্ট

<!-- টাইটেলে -- ব্যবহার করা যাবে না, কারণ বিল্টইন পার্সার একে 'লং ড্যাশ' – এ রূপান্তর করে -->

কোনো সংখ্যাকে এক বাড়ানো বা কমানো কমন গাণিতিক অপারেশনগুলোর মধ্যে একটি।

এজন্য এর জন্য বিশেষ অপারেটর আছে:

- **ইনক্রিমেন্ট** `++` একটি ভ্যারিয়েবলকে ১ বাড়ায়:

    ```js run no-beautify
    let counter = 2;
    counter++;        // counter = counter + 1 এর মত একই কাজ করে, শুধু সংক্ষিপ্ত
    alert( counter ); // 3
    ```
- **ডিক্রিমেন্ট** `--` একটি ভ্যারিয়েবলকে ১ কমায়:

    ```js run no-beautify
    let counter = 2;
    counter--;        // counter = counter - 1 এর মত একই কাজ করে, শুধু সংক্ষিপ্ত
    alert( counter ); // 1
    ```

```warn
ইনক্রিমেন্ট/ডিক্রিমেন্ট শুধু ভ্যারিয়েবলের সাথে ব্যবহার করা যাবে। `5++` এর মত কোনো ভ্যালুর সাথে এটি ব্যবহার করলে এরর দিবে।
```

অপারেটর `++` and `--` কোনো ভ্যারিয়েবলের আগে বা পরে বসানো যাবে।

- যখন অপারেটরটি ভ্যারিয়েবলের পর বসে, তখন এটা "পোস্টফিক্স ফর্মে" আছে বলা হয়: `counter++`.
- "প্রিফিক্স ফর্ম হচ্ছে" যখন অপারেটরটি ভ্যারিয়েবলের আগে বসে: `++counter`.

দুইটি স্টেটমেন্টই একই কাজ করে: `counter` কে `১` বাড়ায়।

কোনো পার্থক্য আছে কি? হ্যাঁ, কিন্তু সেটা আমরা শুধু যখন `++/--` অপারেটরদের রিটার্ন ভ্যালু ব্যবহার করবো তখনই দেখতে পাবো।

পরিষ্কার করা যাক। আমরা যেমনটা জানি, সব অপারেটরই একটি ভ্যালু রিটার্ন করে। ইনক্রিমেন্ট/ডিক্রিমেন্টও কোনো ব্যতিক্রম নয়। প্রিফিক্স ফর্ম নতুন ভ্যালুটি রিটার্ন করে, অন্যদিকে পোস্টফিক্স ফর্ম পুরনো ভ্যালুটিই রিটার্ন করে (ইনক্রিমেন্ট/ডিক্রিমেন্ট করার আগে)।

উদাহরণ দিয়ে পার্থক্যটা বুঝা যাক:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

লাইন `(*)` এ, *প্রিফিক্স* ফর্ম `++counter` `counter` এর ভ্যালু এক বাড়ায় এবং নতুন ভ্যালু, `২` রিটার্ন করে। তাই, `alert` `2` দেখায়।

এখন আমরা পোস্টফিক্স ফর্মটি ব্যবহার করে দেখি:

```js run
let counter = 1;
let a = counter++; // (*) ++counter কে counter++ এ পরিবর্তন করেছি

alert(a); // *!*1*/!*
```

লাইন `(*)` তে, *পোস্টফিক্স* ফর্ম `counter++`ও `counter` এর মান `১` বাড়ায় কিন্তু *পুরনো* ভ্যালুটি রিটার্ন করে (ইনক্রিমেন্টের আগের)। তাই, `alert` `1` দেখায়।

সংক্ষেপে:

- যদি ইনক্রিমেন্ট/ডিক্রিমেন্টের রিটার্ন ভ্যালু ব্যবহার না করা হয়, দুই ফর্মের কোনো পার্থক্য নেই:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, উপরের লাইন দুটো একই কাজ করেছে
    ```
- যদি আমরা ভ্যালু বাড়াতে চাই *এবং* সাথে সাথে অপারেটরটির ফলাফল ব্যবহার করতে চাই, আমাদের দরকার হবে প্রিফিক্স ফর্ম:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- যদি আমরা ভ্যালু বাড়াতে চাই কিন্তু পুরনো ভ্যালু ব্যবহার করতে চাই তাহলে আমাদের লাগবে পোস্টফিক্স ফর্ম:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="অন্য অপারেটরদের মধ্যে ইনক্রিমেন্ট/ডিক্রিমেন্ট"
অপারেটর `++/--` এক্সপ্রেশনের মধ্যেও ব্যবহার করা যাবে। এদের প্রিসিডেন্স অন্যান্য গাণিতিক অপারেটরের চেয়ে বেশি।

উদাহরণস্বরূপ:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

এর সাথে তুলনা করুন:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, কারণ counter++ "পুরনো" ভ্যালু রিটার্ন করে
```

যদিও টেকনিকালি ঠিক, এইরকম নোটেশন কোড পড়া কঠিন করে। একটি লাইনে একাধিক কাজ হচ্ছে -- যা ভালো না.

কোড পড়ার সময়, দ্রুত "উপর থেকে নিচে" চোখ বুলানোর সময় `counter++` এর মতো কিছু সহজেই মিস করে যেতে পারে এবং এটা পরিষ্কার হবে না যে ভ্যারিয়েবলের মান বেড়েছে।

আমরা "একটি লাইন -- একটি কাজ" এই স্টাইল ব্যবহারের পরামর্শ দিই:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## বিটওয়াইজ অপারেটর

বিটওয়াইজ অপারেটর আর্গুমেন্টগুলোকে ৩২-বিট পূর্ণ সংখ্যা হিসেবে বিবেচনা করে এবং তাদের বাইনারি রূপের উপর কাজ করে।

এই অপারেটরগুলো জাভাস্ক্রিপ্ট-স্পেসিফিক নয়। বেশিরভাগ প্রোগ্রামিং ল্যাংগুয়েজেই এগুলো সাপোর্ট করবে।

অপারেটরের লিস্ট:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

এই অপারেটরগুলো খুব কম ক্ষেত্রে যখন আমাদের সংখ্যা নিয়ে খুব নিচের (বিটওয়াইজ) লেভেলে কাজ করতে হয় তখনই শুধু ব্যবহার হয়। আমাদের এই অপারেটরগুলো এরপর আর দরকার হচ্ছে না, যেহেতু ওয়েব ডেভেলপমেন্টে এদের খুব কম কাজই আছে, কিন্তু বিশেষ কিছু ক্ষেত্র, যেমন ক্রিপ্টোগ্রাফিতে এদের দরকার হবে। আপনি MDN এর [বিটওয়াইজ অপারেটর](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) অধ্যায়টি পড়তে পারেন যখন দরকার পড়বে।

## কমা

কমা অপারেটর `,` দুর্লভ আর সচরাচর দেখা যায় না এমন একটি অপারেটর। মাঝেমধ্যে সংক্ষিপ্ত কোড লিখতে এটি দরকার হয়, তাই আমাদের এটি জানতে হবে কী হচ্ছে বুঝার জন্য।

কমা অপারেটর আমাদের একাধিক এক্সপ্রেশন ইভ্যালুয়েট করতে দেয়, এদেরকে কমা `,` দিয়ে ভাগ করে। প্রত্যেকেই ইভ্যালুয়েট হয়, শুধু শেষটির ফলাফল রিটার্ন হয়।

যেমন:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (3 + 4 এর ফলাফল)
```

এখানে, প্রথম এক্সপ্রেশন `1 + 2` ইভ্যালুয়েট হয়েছে এবং এর ফলাফল ফেলে দেয়া হয়েছে। এরপর, `3 + 4` ইভ্যালুয়েট হয়েছে এবং ফলাফল হিসেবে রিটার্ন করা হয়েছে।

```smart header="কমার প্রিসিডেন্স খুব কম"
খেয়াল রাখবেন কমার প্রিসিডেন্স খুব কম, `=` এর চেয়েও কম, তাই উপরের উদাহরণগুলোতে ব্র্যাকেট ব্যবহার করা হয়েছে।

ব্র্যাকেট ছাড়া: `a = 1 + 2, 3 + 4` প্রথমে `+` ইভ্যালুয়েট করবে, সংখ্যাগুলো যোগ করে দাঁড়াবে `a = 3, 7`, তারপর অ্যাসাইনমেন্ট অপারেটর `=` `a = 3` অ্যাসাইন করবে, আর বাকিটা কোনো কাজেই আসবে না। অনেকটা এরকম `(a = 1 + 2), 3 + 4`.
```

কেন আমাদের এমন একটি অপারেটর দরকার হবে যেটি শেষ এক্সপ্রেশন বাদে সব ফেলে দেয়?

মাঝেমধ্যে অনেকে একে জটিল কনস্ট্রাক্টে ব্যবহার করে একাধিক কাজ এক লাইনে করতে।

যেমন:

```js
// এক লাইনে তিনটি কাজ
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

এরকম ট্রিক অনেক জাভাস্ক্রিপ্ট ফ্রেমওয়ার্কে দেখা যায়। যে কারণে আমরা এটার কথা বললাম। কিন্তু সচরাচর এটা কোডের রিডেবিলিটি বাড়ায় না তাই এটা ব্যবহারের আগে আমাদের একটু চিন্তা করে নেয়া উচিৎ।

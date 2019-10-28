# ফাংশন

একই প্রোজেক্টে এক রকমের কাজ আমাদের করা লাগতে পারে।

যেমন ধরুন, একটা মজাদার ম্যাসেজ দেখাতে হবে ইউজারকে, যখন লগ ইন করবে, লগ আউট করবে, বা অন্য কোনো জায়গায়।

ফাংশন হলো সেট অফ প্রোগ্রাম বা কিছু রিলেটেড কোডের সমষ্টি যা কোনো নির্দিষ্ট কাজ করতে পারে বার বার, প্রোজেক্টে লেখা পুরো কোডের সামগ্রিক স্ট্র্যাকচার ঠিক রেখে।

আমরা ইতোমধ্যে জাভাস্ক্রিপ্টের নিজস্ব কিছু ফাংশনের ব্যাবহার দেখেছি। যেমনঃ `alert(message)`, `prompt(message, default)` and `confirm(question)`। কিন্তু আমরা নিজেরাই এমন ফাংশন বানাতে পারি!

## ফাংশন ডিক্লিয়ার করা

পরিপূর্ণ ফাংশন বানাতে প্রথমে আমাদের ফাংশনের একটা প্রোটোটাইপ বা ডেমো বানাতে হবে।

যা দেখতে হবে এমনঃ

```js
function showMessage() {
  alert('Hello everyone!');
}
```

ফাংশন বানাতে প্রথমের `function` কীওয়ার্ডটা লিখে বুঝিয়ে দিতে হবে জাভাস্ক্রিপ্ট ইঞ্জিনকে যা এখন আমরা যা লিখতে যাচ্ছি তা একসাথে একটা কাজ সমাধান করতে যাচ্ছে। এরপরে _ফাংশনের নাম_ লিখে ফাংশনকে যে কোনো জায়গা থেকে ডাকার ব্যবস্থা করতে হবে। এরপর দুই প্রথম ব্রাকেটের মাঝে কিছু জিনিস দিতে হবে প্রয়োজন অনুসারে, যেটাকে বলে _প্যারামিটার_ (প্যারামিটার যে দিতেই হবে তার বাধ্যবাধকতা নেই। যেমন উপরের উদাহরণে দেওয়া হয় নাই। যদি প্যারামিটার লাগে তাহলে কমা দিয়ে আলাদা করে হয় প্যারামিটারগুলো। একটা ফাংশনে একাধিক প্যারামিটার থাকতে পারে।) সবশেষে দুই সেকেন্ড ব্রাকেটের মাঝে কোড লিখতে হয়, যা কিনা কোনো নির্দিষ্ট কাজ করতে সাহায্য করবে। এই অংশকে বলা হয় _ফাংশন বডি_।

```js
function name(parameters) {
  ...body...
}
```

কোনো ফাংশনকে কল করতে সেই ফাংশনকে তার নাম ধরে এইভাবে ডাকা লাগেঃ `showMessage()`।

যেমনঃ

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

এখানে আমরা `showMessage()` কে দুইবার ডেকেছি। আমাদের ফাংশনের কাজ একবার Hello everyone! লিখে এলার্ট দেওয়া। তাই দুইবার ডাকলে আমরা দুইবার এলার্ট দেখতে পাবো।

এই উদাহরণ একটা বিষয়কে স্পষ্ট করে, তাহলো- একই কোডের বহুব্যবহার (রিপিট) এড়ানো।

যদি আমাদের কখনো ম্যাসেজ পরিবর্তন করা লাগে তাহলে আমাদের কাজ শুধু ফাংশনের ভিতরের কোডটুকু পরিবর্তন করে দিলেই হয়ে যাবে।

## লোকাল ভ্যারিয়েবল

কোনো ফাংশনের ভিতরে ডিক্লিয়ার করা ভ্যারিয়েবল শুধুমাত্র সেই ফাংশনের ভিতরেই এক্সেস করা সম্ভব।

যেমনঃ

```js run
function showMessage() {
  *!*
  let message = "Hello, I'm JavaScript!"; // লোকাল ভ্যারিয়েবল
  */!*
  alert(message);
}

showMessage(); // এইটা Hello, I'm JavaScript! এলার্ট দিবে

alert(message); // <-- Error! এখানে meesage ভ্যারিয়েবলকে এক্সেস করা সম্ভব না।
```

## আউটার ভ্যারিয়েবল

কোনো ফাংশন নিজের ব্লকের বাইরের ভ্যারিয়েবলও এক্সেস করতে পারে। যেমনঃ

```js run no-beautify
let *!*userName*/!* = 'Rahim';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, Rahim
```

ফাংশনের যে আউটার ভ্যারিয়েবলের শুধু এক্সেস আছে তাই না, ফাংশন আউটার ভ্যারিয়েবলের মানও পরিবর্তন করতে পারে।

যেমনঃ

```js run
let *!*userName*/!* = 'Rahim';

function showMessage() {
  *!*userName*/!* = "Karim"; // (১) আউটার ভ্যারিয়েবলের মান পরিবর্তন করা হয়েছে

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // ফাংশন কল করার আগে *!*Rahim*/!* এলার্ট দিবে

showMessage();

alert( userName ); // *!*Karim*/!* এলার্ট দিবে। কারণ, ভ্যারিয়েবলের মান ফাবগশনের মধ্যে পরিবর্তন করা হয়েছে
```

যদি কোনো লোকাল ভ্যারিয়েবল না থাকে, সেক্ষেত্রেই কেবল আউটার ভ্যারিয়েবল ব্যবহার করা হয়।

যদি একই নামে লোকাল ও আউটার ভ্যারিয়েবল ডিক্লিয়ার করা হয়, তাহলে প্রোগ্রাম আউটার ভ্যারিয়েবলকে কম গুরুত্ব দেয়। যেমন, নিচের কোডে `userName` নামে ভ্যারিয়েবল নেওয়া হয়েছে। প্রোগ্রাম আউটার ভ্যারিয়েবলকে এড়িয়ে গেছে।

```js run
let userName = 'Rahim';

function showMessage() {
*!*
  let userName = "Karim"; // লোকাল ভ্যারিয়েবল declare করা হয়েছে ও initialize করা হয়েছে
*/!*

  let message = 'Hello, ' + userName; // *!*Karim*/!*
  alert(message);
}

// ফাংশন তার লোকাল ভ্যারিয়েবল রিটার্ণ করবে
showMessage();

alert( userName ); // *!*Rahim*/!*, অপরিবর্তনীয়, ফাংশন আউটার ভ্যারিয়েবল এড়িয়ে গেছে
```

```smart header="Global variables"
ফাংশনের বাইরে declare করা কোনো ভ্যারিয়েবলকে *গ্লোবাল* ভ্যারিয়েবলও বলা হয়।

গ্লোবাল ভ্যারিয়েবল যে কোনো জায়গা থেকে এক্সেস করা যায় (যদি না ফাংশনে লোকাল ভ্যারিয়েবল একই নামে থাকে)।

গ্লোবাল ভ্যারিয়েবল যত কম ব্যবহার ও ডিক্লিয়ার করা যায় ততই ভালো। বর্তমান সময়ের বেশিরভাগ প্রোগ্রামে গ্লোবাল ভ্যারিয়েবল খুব কম অথবা একদমই নাই। বেশিরভাগ ভ্যারিয়েবল স্ব স্ব ফাংশনেই ডিক্লিয়ার করা হয়। মাঝে মাঝে যদিও গ্লোবাল ভ্যারিয়েবল project-level ডাটা ধরে রাখতে ব্যবহার করা হয়।
```

## প্যারামিটার

আমরা প্রয়োজনীয় ডাটা প্যারামিটার এর মাধ্যমে কোনো ফাংশনে ব্যবহার করতে পারি। (এদেরকে _ফাংশন আর্গুমেন্টস_ ও বলা হয়)।

নিচের উদাহরণে দুইটা প্যারামিটার আছে। একটা `from` এবং অন্যটা `text`।

```js run
function showMessage(*!*from, text*/!*) { // আর্গুমেন্টসঃ from, text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

যখন ফাংশন লাইন `(*)` এবং `(**)` কল করে, ভ্যালুগুলো `from` এবং `text` এ এসাইন হয়। পরবর্তিতে প্রয়োজনানুসারে ফাংশন তাদেরকে ব্যবহার করে।

আরেকটা উদাহরণ দেখা যাকঃ ভ্যারিয়েবল `from` ফাংশনে ডিক্লিয়ার করলাম। নোটঃ ফাংশন `from` কে পরিবর্তন করে, কিন্তু এই পরিবর্তন বাইরে কোথাও দেখা যাবে না। কারণ, ফাংশন সবসময় ভ্যাল্যুর একটা কপি নিজের কাছে রেখে দিবে।

```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // "from" কে দেখতে সুন্দর লাগছে না এখন?
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// "from" এর ভেল্যু একই, ফাংশন শুধু লোকাল কপিকে মোডিফাই করেছে
alert( from ); // Ann
```

## ডিফল্ট ভ্যালু

যদি কোনো প্যারামিটার এর মান দেওয়া না থাকে, তাহলে সেটার ভ্যালু `undefined` ধরে নেওয়া হয়।

তাই একাধিক প্যারামিটারের ক্ষেত্রে `showMessage(from, text)` একটা আর্গুমেন্ট দিলেও প্রোগ্রাম চলবে। যেমনঃ

```js
showMessage('Ann');
```

এইখানে কোনো ভুল নেই। এমন ফাংশন কল `"Ann: undefined"` রিটার্ন করবে। এখানে `text` প্যারামিটারের মান বলে দেওয়া হয় নাই। তাই `text === undefined` ধরে নিবে প্রোগ্রাম।

যদি কোনো মান সেট না হলে ডিফল্টভাবে একটা মান ধরে নিয়ে প্রোগ্রাম চালাতে চাই, তাহলে প্যারামিটারেই মানটা এসাইন করে দিতে পারবো। যেমনঃ

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

এখানে যদি `text` প্যারামিটারের মান ইউজার না দেয়, তাহলে ডিফল্টভাবে `"no text given"` সেট হয়ে থাকবে।

এখানে `"no text given"` একটা স্ট্রিং। কিন্তু আমরা চাইলে এখানে যে কোনো কিছু ব্যবহার করতে পারি। এমনকি জটিল লজিক্যাল অপারেশনও। যদি প্যারামিটার মিসিং থাকে তাহলে বাই ডিফল্ট সেই অপারেশন কাজ করবে। যেমনঃ

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() কেবলমাত্র তখনই চলবে যখন কোনো প্যারামিটার ভ্যালু দেওয়া হবে না।
  // যদি দেওয়া হয়, তাহলে এই ফাংশন রিপ্লেস হয়ে ইউজার প্রদত্ত ভ্যালু সেট হয়ে যাবে।
}
```

```smart header="Evaluation of default parameters"
জাভাস্ক্রিপ্টে কোনো প্যারামিটারের বিপরীতে কোনো মান সেট করে না দিলে প্যারামিটারে ডিফল্টভাবে এসাইন করা মান কল হবে যতবার পুরো ফাংশন কল করা হবে।

উপরের উদাহরণ টেনে বলা যায়, `anotherFunction()` ততবার কল হবে যতবার `showMessage()` কল করা হবে `text` প্যারামিটারের মান দেওয়া ছাড়াই।
```

````smart header="Default parameters old-style"
জাভাস্ক্রিপ্টের আগের ভার্সনগুলো ডিফল্ট প্যারামিটার সাপোর্ট করে না। কিন্তু অন্যভাবে কাজ চালিয়ে নেওয়া যায়।

যেমন, `undefined` এর মান পরিবর্তন করেঃ

```js
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}
```

...Or the `||` operator:

```js
function showMessage(from, text) {
  // যদি `text` এর মান না দেওয়া হয় তাহলে "default" ভ্যালু সেট করে নিবে
  text = text || 'no text given';
  ...
}
```


````

## ভ্যালু রিটার্ন করা

ফাংশন যে কোনো ভ্যালু রিটার্ন করতে পারে।

যেমন, দুইটা ভ্যালু যোগ করতে তাদের যোগফল রিটার্ন করাঃ

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

`return` কীওয়ার্ড একটা ফাংশনের যে কোনো স্থানে ব্যবহার করা যেতে পারে। যখনই ফাংশন `return` খুঁজে পাবে, সাথে সাথে সেই ফাংশনের কাজ করা বন্ধ করে দিবে। এবং রেজাল্ট রিটার্ন করবে। (উপরে `result` এ রাখা হয়েছে রিটার্ন ভ্যালু)।

একটা ফাংশনে অনেক `return` কীওয়ার্ড থাকতে পারে। উদাহরণস্বরূপঃ

```js run
function checkAge(age) {
  if (age > 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

এমনকি `return` ইউজ করা যেতে পারে কোনো রকম ভ্যালু রিটার্ন করা ছাড়াই। এতে করে ফাংশন সাথে সাথেই থেমে যাবে।

যেমনঃ

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

উপরের প্রোগ্রামে, যদি `checkAge(age)` রিটার্ন করে `false`, তাহলে `showMovie` কখনোই `alert` অব্ধি যাবে না।

``smart header="A function with an empty `return` or without it returns `undefined`"
যদি কোনো ফাংশন কোনো ভ্যালু রিটার্ন না করে, তাহলে `undefined` রিটার্ন করবে।

```js run
function doNothing() {
  /* empty */
}

alert(doNothing() === undefined); // true
```

কোনো ফাঁকা `return` একদমই একই রকম আচরণ করে যেমন `return undefined` করে।

```js run
function doNothing() {
  return;
}

alert(doNothing() === undefined); // true
```

`````

````warn header="Never add a newline between `return` and the value"
যদি কোনো বড় এক্সপ্রেশন `return` করা লাগে সেক্ষেত্রে হয়তো পরের লাইনে লেখার প্রবণতা তৈরি হতে পারে। যেমনঃ

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
কিন্তু এভাবে কাজ করবে না, কারণ জাভাস্ক্রিপ্ট ধরে নিবে `return` এর পরে সেমিকোলন আছে। (জাভাস্ক্রিপ্ট কিন্তু সেমিকোলন বাদেও কাজ করে। সেক্ষেত্রে প্রতিটা লাইনের শেষে সেমিকোলন ধরে নেয় ডিফল্টভাবে। একারণেই রিটার্নের পরে পরের লাইনে চলে গেলে সেমিকোলন করে নিয়ে কাজ করবে ফাংশন।) এটা সেক্ষেত্রে এইভাবে কাজ করবেঃ

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

তাই স্বাভাবিকভাবেই পুরো প্রোগ্রাম ফাঁকা (undefined) রিটার্ন করবে।

যদি বড় কোনো এক্সপ্রেশন রিটার্ন করা লাগে তাহলে একই লাইনে লেখা জরুরি। অথবা প্রথম বন্ধনীর ভিতরে লিখতে হবে পুরো এক্সপ্রেশন। যেমনঃ

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
`````

## ফাংশনের নামকরণ [#function-naming]

প্রতিটা ফাংশন হলো এক একটা এ্যাকশন। তাই তাদের নাম "ক্রিয়া" বাচক হওয়া যুক্তিযুক্ত। একই সাথে বিস্তারিত ও অর্থপূর্ণ হওয়া অত্যন্ত জরুরি যেন প্রোগ্রামার (নিজেও) শুধু নাম দেখে বুঝে নিতে পারে পুরো ফাংশন কোন ধরনের কাজ করছে।

এটাই সবচেয়ে যুক্তিযুক্ত যে ফাংশনের নাম "ক্রিয়া বাচক" শব্দ দিয়ে শুরু করা। যখন কোনো টিমে কাজ করা হবে, তখন সবার মধ্যে একটা এগ্রিমেন্ট করে ফাংশনের নামের প্যাটার্ণ নির্ধারণ করা উচিৎ।

উদাহরণস্বরূপ, যে ফাংশন `"show"` দিয়ে শুরু হয় তা স্বাভাবিকভাবেই কিছু দেখাবে বলে ধরে নেওয়া যেতে পারে।

যদি ফাংশন নিম্নোক্ত শব্দ দিয়ে শুরু হয় তাহলে...

- `"get…"` -- কোনো ভ্যালু রিটার্ন করে,
- `"calc…"` -- কোনো ধরনের ক্যালকুলেশন করে থাকে,
- `"create…"` -- কিছু তৈরি করে,
- `"check…"` -- কোনো কিছু কম্পেয়ার করে বা বুলিয়ান টাইপের কিছু রিটার্ন করে।

কিছু নামের উদাহরণ দেখা যাকঃ

```js no-beautify
showMessage(..)     // কোনো ম্যাসেজ দেখায়
getAge(..)          // বয়স রিটার্ন করে
calcSum(..)         // যোগ করে
createForm(..)      // কোনো ফর্ম তৈরি করে (সাধারণত রিটার্ন করে)
checkPermission(..) // পারমিশন চেক করে, true/false রিটার্ন করে
```

ফাংশন যে ধরনের শব্দ দিয়ে শুরু হয় তা একনজরে বুঝিয়ে দেয় কী ধরনের ভ্যালু সেখান থেকে পাওয়া যেতে পারে।

```smart header="One function -- one action"
কোনো ফাংশনের নামে ও কাজে সম্পূর্নভাবে মিল থাকা লাগবে।

দুইটা কাজ অবশ্যই আলাদা আলাদা দুইটা ফাংশন দিয়ে করা যুক্তিযুক্ত। যদি দুইটাকে এক হয়ে একটা নির্দিষ্ট কাজ করা লাগে তাহলে তৃতীয় কোনো ফাংশনে তাদের কল করে কাজ করাটা অর্থপূর্ণ।

এই নিয়ম ভাঙ্গলে যে জটিলতা হতে পারে তার উদাহরণঃ

- `getAge` -- এটা খুব বাজে প্র্যাকটিস হবে যদি বয়স রিটার্ণ করে তা `alert` দেখায়। (শুধুই রিটার্ন করা উচিৎ ছিলো)
- `createForm` -- এইধরনের নামযুক্ত ফাংশন কোনো ডকুমেন্ট মডিফাই করা অযৌক্তিক, এমনকি কোনো কিছুতে কোনো ফর্ম এ্যাড করাও (শুধুই ফর্ম বানিয়ে রিটার্ন করে দেওয়া অব্ধিই এর কাজ চলা উচিৎ)
- `checkPermission` -- যদি এই ফাংশন `access granted/denied` ম্যাসেজ দেখায় তাহলে অযৌক্তিক হবে। (শুধুই পারমিশন চেক করে রিটার্ন করা উচিৎ)

এই উদাহরণ থেকে ফাংশনের নামেরর সূচনা শব্দ কেমন হওয়া উচিৎ সম্পর্কে ধারণা পাওয়া যায়। আপনি ও আপনার টিম মিলে নিজেরা কোনো নিয়ম বানাতে পারেন, কিন্তু খুব বেশি পার্থক্য হয়তো হবে না। একটা সূচনা শব্দ ফাংশনের অনেক কিছুই বলে দিতে পারে। প্রতিটা একই ধরনের সূচনা শব্দ একই ধরনের কাজ করবে।
```

```smart header="Ultrashort function names"
যে ফাংশনগুলো *খুব বেশি* কল করা হয়, তাকে মাঝে মাঝে স্পেশাল কিছু সূচনা নাম দেওয়া হয়ে থাকে।

যেমন, [jQuery](http://jquery.com) ফ্রেমওয়ার্ক `$` দিয়ে শুরু করে তাদের ফাংশন নাম। আবার [Lodash](http://lodash.com/) লাইব্রেরি `_` দিয়ে শুরু করে।

এগুলো এক্সেপশন। বেশিরভাগ সময় ফাংশন নাম অর্থপূর্ন ও বিস্তারিত হওয়া উচিৎ।
```

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as _self-describing_.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as parameters are copied to its local variables.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return a value. If it doesn't, then its result is `undefined`.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.

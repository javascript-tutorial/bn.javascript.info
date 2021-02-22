
# পুরাতন "var"

```smart header="This article is for understanding old scripts"
এই আর্টিকেল এর তথ্য গুলি পুরাতন স্ক্রিপ্ট বোঝার জন্য সাহায্য করবে।

এভাবে আমরা নতুন কোড লিখি না।
```

অধ্যায়ের প্রথম দিকে আমরা উল্লেখ করেছিলাম [variables](info:variables) কে তিন ভাবে ঘোষণা করা যায়।

১। `let`
২। `const`
৩। `var`

<<<<<<< HEAD
লেক্সিকাল এনভায়রনমেন্টের ক্ষেত্রে `let` এবং `const` ঠিক একইভাবে আচরণ করে।

কিন্তু `var` সম্পূর্ণ ভিন্ন, যা খুব পুরানো কাল থেকেই উদ্ভূত হয়েছিল। এটি সাধারণত আধুনিক স্ক্রিপ্টগুলিতে ব্যবহৃত হয় না তবে এটি পুরানো স্ক্রিপ্টগুলিতে সচরাচর দেখা যাবে।

আপনি যদি এই জাতীয় স্ক্রিপ্টগুলি সম্পর্কে জানার পরিকল্পনা না করেন তবে আপনি এই অধ্যায়টি এড়িয়ে যেতে পারেন, তবে তা আপনাকে পরে সমস্যায় ফেলতে পারে।

প্রথমদিকে দেখতে var ও let এর আচরণ একই রকম মনে হবে। সেটা হলো একটি ভেরিয়েবল ঘোষণা করাঃ

```js run
function sayHi() {
  var phrase = "Hello"; // লোকাল ভেরিয়েবল, "let" এর পরিবর্তে "var"

  alert(phrase); // Hello
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

<<<<<<< HEAD
...তবে এখানে পার্থক্য রয়েছে।
=======
On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

# "var" এর কোন ব্লক স্কোপ নেই।

<<<<<<< HEAD
যে সকল ভেরিয়েবল "var" দ্বারা ঘোষণা হয়, তারা হয় ফাংশন-ওয়াইড অথবা গ্লোবাল হয়ে থাকে।
=======
Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

এই ক্ষেত্রেঃ

```js run
if (true) {
  var test = true; // "let" এর পরিবর্তে "var"
}

*!*
alert(test); // true, "if" ব্লকের বাইরেও এটি বিদ্যমান। 
*/!*
```

`var` কোড ব্লকগুলিকে উপেক্ষা করার সাথে সাথে আমরা একটি গ্লোবাল `test` ভেরিয়েবল পেয়েছি.

যদি আমরা `var test` এর পরিবর্তে `let test` ব্যবহার করি, তবে ভেরিয়েবলটি কেবল `if` ব্লকের মধ্যে সীমাবদ্ধ থাকবেঃ 

```js run
if (true) {
  let test = true; // "let" এর ব্যবহার 
}

*!*
<<<<<<< HEAD
alert(test); // এরর: test নির্ধারণ করা নেই
=======
alert(test); // ReferenceError: test is not defined
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
*/!*
```

লুপের ক্ষেত্রেও একই রকমঃ  `var` লুপ অথবা ব্লকের লোকাল হতে পারে নাঃ 

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
<<<<<<< HEAD
alert(i); // 10, "i" লুপের পরেও বিদ্যমান, এটি একটি গ্লোবাল ভেরিয়েবল। 
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
*/!*
```

যদি কোন কোড ব্লক ফাংশনের ভিতরে থাকে, সেক্ষেত্রে `var` ফাংশন লেভেল ভেরিয়েবল হয়ে যায়। 

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // কাজ করবে 
}

sayHi();
<<<<<<< HEAD
alert(phrase); // এরর: phrase নির্ধারণ করা নেই (ডেভলপার কনসোল চেক করুন)
=======
alert(phrase); // ReferenceError: phrase is not defined
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
```

<<<<<<< HEAD
আমারা যেটা দেখলাম, `var` - `if`, `for` অথবা অন্য ব্লক ভেদ করে বাইরে আসতে পারে। তার কারন অনেক আগে জাভাস্ক্রিপ্টে কোন লেক্সিকাল এনভাইরমেন্ট ছিল না। এবং `var` তারই একটি অংশ।

## "var" ফাংশনের শুরুতেই ঘোষিত হয়।
=======
As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

ফাংশনের শুরুতেই `var` ঘোষিত হয়ে যায়(অথবা স্ক্রিপ্ট গ্লোবালের জন্য শুরু হয়)

অন্যভাবে বলা যায়, `var` ভেরিয়্যবল গুলো ফাংশনের শুরুতেই ঘোষিত হয়, সেটাকে যেখানেই সংজ্ঞায়িত করা হোক না কেন(ধরে নিলাম এটি কোন নেস্টেড ফাংশনের মধ্যে নয়)। 

তাহলেঃ 

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...টেকনিক্যালি এটির মতোই(`var phrase` উপরে স্থানান্তরিত করে দেয়)ঃ 

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...অথবা এটির মতো(কোড ব্লকগুলি উপেক্ষা করা হয়েছে)  

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

লোকেরা এ জাতীয় আচরণকে "hoisting" নামেও অভিহিত করে, কারণ সমস্ত var ফাংশনের শীর্ষে "hoisting" হয়।

সুতরাং উপরের উদাহরণে, `if(false)` কখনও কার্যকর হয় না, কিন্তু এতে কোন সমস্যা নেই। ফাংশনের শুরুতে এর অভ্যন্তরের `var` প্রসেস হয়ে যায়, সুতরং `(*)` মুহূর্তে ভেরিয়েবলটি বিদ্যমান থাকে। 

**ডিকলারেশন গুলো "hoisted" হলেও, কিন্তু "assignment" হয় না**

একটি উদাহরণ দিয়ে দিয়ে দেখা যাক, যেমনঃ 

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

`var phrase` = "Hello" লাইনটির মধ্যে দুটি কাজ রয়েছেঃ 

১। ভেরিয়েবল ঘোষণা `var`
২। ভেরিয়াবল আসাইনমেন্ট `=`।

ফাংশন এক্সিকিউশনের শুরুতেই ডিক্লেয়ার করা হয়ে থাকে ("hoisted"),তবে অ্যাসাইনমেন্টটি সর্বদা যেখানে প্রদর্শিত হবে সেখানে কাজ করে। সুতরাং কোডটি মূলত এই ভাবে কাজ করে:

```js run
function sayHi() {
*!*
  var phrase; // ভেরিয়েবল ডিক্লেয়ার শুরুতেই কাজ করে ...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...অ্যাসাইনমেন্ট - যখন এক্সিকিউশন এখানে পৌঁছায়।
*/!*
}

sayHi();
```

কারন সকল var ফাংশনের শুরুতেই ডিক্লেয়ার করা হয়, আমরা ওই ফাংশন স্কোপের যে কোন জায়গায় থেকে ভেরিয়েবল সমূহ কে ব্যবহার করতে পারি। কিন্তু অ্যাসাইনমেন্টের আগ পর্যন্ত ভেরিয়েবল গুলো আনডিফাইন অবস্থায় থাকে।

<<<<<<< HEAD
উপরের দুটি উদাহরণে `alert` কোন এরর ছাড়াই চলে, কারন ভেরিয়েবল `phrase` বিদ্যমান রয়েছে। তবে এর মান এখনও নির্ধারিত হয়নি, সুতরাং এটি আনডিফাইন দেখায়। 
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## সারাংশ

এখানে দুটি প্রধান পার্থক্য রয়েছে `var` এবং `let/const` এর মধ্যেঃ 

<<<<<<< HEAD
<<<<<<< HEAD
১। `var` ভেরিয়েবলের কোন ব্লক স্কোপ নেই, এগুলি সর্বনিম্ন ফাংশন লেভেল পর্যন্ত বিদ্যমান থাকে। 
২। ফাংশনের শুরুতেই `var` ঘোষিত হয়ে যায়(স্ক্রিপ্ট গ্লোবালের জন্য শুরু হয়)।
=======
1. `var` variables have no block scope; their visibility is scoped to current function, or global, if declared outside function.
=======
1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c
2. `var` declarations are processed at function start (script start for globals).
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

গ্লোবাল অবজেক্টের সাথে সম্পর্কিত আরও একটি ছোটখাটো পার্থক্য রয়েছে, আমরা পরবর্তী অধ্যায়ে এটি আলোচনা করব।

এই পার্থক্যগুলি `var` কে বেশিরভাগ সময় `let` এর চেয়ে খারাপ করে তোলে। ব্লক-লেভেলের ভেরিয়েবলগুলি একটি দুর্দান্ত জিনিস। এই জন্য `let` এর স্ট্যান্ডার্ড চালু হয় অনেক আগে, এবং ভেরিয়েবল ঘোষণার জন্য এখন এটি একটি প্রধান উপায় (`const` সহ)।
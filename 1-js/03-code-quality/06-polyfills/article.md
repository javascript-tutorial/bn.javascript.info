
<<<<<<< HEAD
# পলিফিল (Polyfills)
=======
# Polyfills and transpilers
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

জাভাস্ক্রিপ্ট ভাষাটি ধীরে ধীরে উন্নত হচ্ছে। নিয়মিত নতুন নতুন প্রস্তাবনা আসছে, সেগুলো বিশ্লেষণ করা হচ্ছে এবং, যদি যোগ্য বলে বিবেচিত হয় তাহলে এই তালিকাতে <https://tc39.github.io/ecma262/> নিবন্ধিত হচ্ছে, এবং তারপর [স্পেসিফিকেশন](http://www.ecma-international.org/publications/standards/Ecma-262.htm) এ উন্নীত হচ্ছে।

জাভাস্ক্রিপ্টের পেছনে যে দলটি কাজ করছে তারা তাদের মত বিবেচনা করছে কোনটিকে আগে বাস্তবায়ন করা দরকার। তারা হয়তো সিদ্ধান্ত নিতে পারে, যেগুলো খসড়া তালিকাভুক্ত সেগুলো আগে করার এবং যেগুলো ইতিমধ্যে স্পেসিফিকেশনে আছে সেগুলো পরে করার, কারণ সেগুলো কম আকর্ষণীয় বা করা কঠিন।

তাই প্রায়শ ইঞ্জিনগুলো স্ট্যান্ডার্ড এর শুধু আংশিক বাস্তবায়ন করে।

ভাষার কোন কোন বৈশিষ্ট্য বর্তমানে সমর্থিত সেটি জানার একটি ভাল পেইজ হল এটি <https://kangax.github.io/compat-table/es6/> (এটি অনেক বড়, আমাদের এখনও অনেককিছুই জানতে হবে)।

<<<<<<< HEAD
## ব্যাবেল (Babel)

যখন আমরা ভাষার আধুনিক ফিচারগুলো ব্যবহার করি, কিছু ইঞ্জিন হয়তো এধরণের কোড সমর্থন করবে না। যেমনটা কিচ্ছুক্ষণ আগে বলেছি, সব ফিচার সব যায়গায় সমর্থিত নয়।

এখানে ব্যাবেল আমাদের সাহায্য করতে পারে।

[ব্যাবেল](https://babeljs.io) একটি [ট্রান্সপাইলার](https://en.wikipedia.org/wiki/Source-to-source_compiler)। এটি আধুনিক জাভাস্ক্রিপ্ট কোডকে পুরাতন স্ট্যান্ডার্ড এ পুনরায় লিখে দেয়।

আসলে, ব্যাবেলের দুটি অংশ আছেঃ

1. প্রথমত, ট্রান্সপাইলার প্রোগ্রামটি, যেটি কোডকে পুনরায় লিখে। ডেভেলপার তার নিজের কম্পিউটারে এটি রান করে। এটি কোডকে পুরাতন স্ট্যান্ডার্ড এ পরিবর্তন করে। এবং তারপর কোডটি ইউজারদের জন্য ওয়েবসাইটে প্রেরণ করা হয়। আধুনিক প্রজেক্ট বিল্ড সিস্টেম যেমন [ওয়েবপ্যাক](http://webpack.github.io/) প্রতিবার কোড লেখার সাথে সাথে ট্রান্সপাইলারকে স্বয়ংক্রিয়ভাবে রান করে, তাই ডেভেলপমেন্টের সময় এটিকে ইন্টিগ্রেট করা সহজ হয়।

2. দ্বিতীয়ত, পলিফিল।

    ভাষার নতুন ফিচারে হয়তো নতুন কোন বিল্ড-ইন ফাংশন এবং সিনট্যাক্স কন্সট্রাক্ট থাকতে পারে। ট্রান্সপাইলার কোড পুনরায় লিখার সময়, সিনট্যাক্স কন্সট্রাক্টকে পুরাতন সিনট্যাক্সে পরিবর্তন করে। কিন্তু নতুন বিল্ড-ইন ফাংশনের ক্ষেত্রে, আমাদের সেগুলো ইমপ্লিমেন্ট করতে হবে। জাভাস্ক্রিপ্ট অত্যন্ত ডাইনামিক ভাষা, যেকোনো ফাংশনকে আধুনিক স্ট্যান্ডার্ডের মত আচরণ করানোর জন্য স্ক্রিপ্ট তাদের এড/মডিফাই করতে পারে।
    যে স্ক্রিপ্টটি নতুন ফাংশনকে আপডেট/এড করে থাকে তাকে "পলিফিল" বলা হয়। কারণ এটি "fills in" বা দূরত্বটি দূর করে এবং পুরাতন স্ট্যান্ডার্ড এ নেই এমন ইমপ্লিমেন্টেশন প্রদান করে।

    দুটি মজার পলিফিল হলঃ
    - [core js](https://github.com/zloirock/core-js) অনেককিছুই সমর্থন করে, শুধু যেটা প্রয়োজন সেটা ব্যবহার করা যায়। that supports a lot, allows to include only needed features.
    - [polyfill.io](http://polyfill.io) ফিচার এবং ইউজারের ব্রাউজারের উপর ভিতটি করে পলিফিলের স্ক্রিপ্ট প্রদান করার একটি সার্ভিস।

তাই, যদি আমরা ভাষার আধুনিক ফিচার ব্যবহার করতে চাই, তাহলে আমাদের একটি ট্রান্সপাইলার এবং পলিফিল ব্যবহার করতে হবে।

## এই টিউটেরিয়ালের উদাহরণসমূহ
=======
As programmers, we'd like to use most recent features. The more good stuff - the better!

On the other hand, how to make our modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
````online
অধিকাংশ উদাহরণ যেখানে আছে সেখানেই রান করা যাবে, যেমনঃ
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

<<<<<<< HEAD
যেসব উদাহরণে আধুনিক জাভাস্ক্রিপ্ট ব্যবহার করা হয়েছে সেগুলো শুধু আপনার ব্রাউজার সমর্থন করলেই রান করা যাবে।
````

```offline
এমনি যদি অফলাইন ভার্সনটি ব্যবহার করেন, পিডিএফ এর উদাহরণগুলো রান করা যাবে না। EPUB এ কিছু উদাহরণ রান করা যাবে।
```

গুগল ক্রোম সাধারণত ভাষার ফিচারগুলোর সাথে সবচাইতে বেশী আপ-টু-ডেট থাকে, এটি ব্লিডিং-এজ ডেমোগুলো ট্রান্সপাইলার ছাড়াই রান করার জন্য খুবই ভালো, কিন্তু যেকোনো আধুনিক ব্রাউজারই ভালভাবেই কাজ করবে।
=======
In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" language features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

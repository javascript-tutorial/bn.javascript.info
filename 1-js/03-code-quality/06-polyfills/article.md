
# পলিফিল (Polyfills)

জাভাস্ক্রিপ্ট ভাষাটি ধীরে ধীরে উন্নত হচ্ছে। নিয়মিত নতুন নতুন প্রস্তাবনা আসছে, সেগুলো বিশ্লেষণ করা হচ্ছে এবং, যদি যোগ্য বলে বিবেচিত হয় তাহলে এই তালিকাতে <https://tc39.github.io/ecma262/> নিবন্ধিত হচ্ছে, এবং তারপর [স্পেসিফিকেশন](http://www.ecma-international.org/publications/standards/Ecma-262.htm) এ উন্নীত হচ্ছে।

জাভাস্ক্রিপ্টের পেছনে যে দলটি কাজ করছে তারা তাদের মত বিবেচনা করছে কোনটিকে আগে বাস্তবায়ন করা দরকার। তারা হয়তো সিদ্ধান্ত নিতে পারে, যেগুলো খসড়া তালিকাভুক্ত সেগুলো আগে করার এবং যেগুলো ইতিমধ্যে স্পেসিফিকেশনে আছে সেগুলো পরে করার, কারণ সেগুলো কম আকর্ষণীয় বা করা কঠিন।

তাই প্রায়শ ইঞ্জিনগুলো স্ট্যান্ডার্ড এর শুধু আংশিক বাস্তবায়ন করে।

ভাষার কোন কোন বৈশিষ্ট্য বর্তমানে সমর্থিত সেটি জানার একটি ভাল পেইজ হল এটি <https://kangax.github.io/compat-table/es6/> (এটি অনেক বড়, আমাদের এখনও অনেককিছুই জানতে হবে)।

## ব্যাবেল (Babel)

When we use modern features of the language, some engines may fail to support such code. Just as said, not all features are implemented everywhere.

Here Babel comes to the rescue.

[Babel](https://babeljs.io) is a [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). It rewrites modern JavaScript code into the previous standard.

Actually, there are two parts in Babel:

1. First, the transpiler program, which rewrites the code. The developer runs it on their own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build systems like [webpack](http://webpack.github.io/) provide means to run transpiler automatically on every code change, so that very easy to integrate into development process.

2. Second, the polyfill.

    New language features may include new built-in functions and syntax constructs.
    The transpiler rewrites the code, transforming syntax constructs into older ones. But as for new built-in functions, we need to implement them. JavaScript is a highly dynamic language, scripts may add/modify any functions, so that they behave according to the modern standard.

    A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

    Two interesting polyfills are:
    - [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
    - [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.

So, if we're going to use modern language features, a transpiler and a polyfill are necessary.

## Examples in the tutorial


````online
Most examples are runnable at-place, like this:

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

Examples that use modern JS will work only if your browser supports it.
````

```offline
As you're reading the offline version, in PDF examples are not runnable. In EPUB some of them can run.
```

Google Chrome is usually the most up-to-date with language features, good to run bleeding-edge demos without any transpilers, but other modern browsers also work fine.

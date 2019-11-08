# কোডিং স্টাইল

আমাদের কোড যতটুকু সম্ভব পড়ার জন্য পরিচ্ছন্ন ও সহজ রাখতে হবে।

একটি জটিল কাজ নিয়ে এমনভাবে কোড করা যা একাধারে সঠিক ও মানুষের জন্য পাঠযোগ্য -- এটাই প্রোগ্রামিংয়ের আর্ট । একটি ভালো কোডিং স্টাইল এতে অনেকটাই সহযোগিতা করে । 

## শব্দবিন্যাস ( সিনট্যাক্স )

এখানে কিছু সাজেশন দেয়া হল (বিস্তারিত নিচে দেয়া দেখুন):

![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

এখন চলুন কিছু নিয়ম ও তার কারণ সম্বন্ধে জেনে নেইঃ

```warn header="There are no \"you must\" rules"
এখনে পাথরে খোদাই করে লিছু বলা নেই। এগুলো কোডিং স্টাইলের পছন্দ মাত্র, কোন ধর্মীয় মতবাদ নয়।
```

### দ্বিতীয় বন্ধনী

বেশিরভাগ জাভাস্ক্রিপ্ট প্রজেক্টেই দ্বিতীয় বন্ধনীগুলোকে "মিশরীয়" কায়দায় লেখা হয় যাতে শুরুর বন্ধনীটি অনুরূপ কিওয়ার্ডের সাথে একই লাইনে থাকে -- নতুন লাইনে নয়। তবে শুরুর বন্ধনীটি আগে একটি ফাঁকা স্পেস থাকা উচিৎ।
কিছুটা এমন ঃ 

```js
if (কন্ডিশন) {
  // কিছু কোড
  // ...আরও কিছু কোড
  // ...আরও কিছু কোড
}
```

একটি একলাইনের কনস্ট্রাকটর, যেমন `if (condition) doSomething()`, একটি গুরুত্বপূর্ণ কেইস। এখানে কি বন্ধনী দেয়া উচিৎ ?

এখানে বিভিন্ন টীকা যুক্ত করা হলো যাতে আপনি নিজেই পঠনযোগ্যতা যাচাই করতে পারেনঃ

1. 😠অনভিজ্ঞরা প্রায়ই এটা করে। বাজে! এখানে ২য় বন্ধনির দরকার নেই:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 দ্বিতীয় বন্ধনী ছাড়াই নতুন লাইনে চলে যাওয়া। কখনই এটা করবেন না, নতুন লাইন করতে গেলে ভুলের সম্বাবনা বেড়ে যায়:
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
3. 😏 দ্বিতীয় বন্ধনী ছাড়াই একলাইনের কোড - কোড ছোট হলে, গ্রহণযোগ্য:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 সবচেয়ে ভালো পন্থা:
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

সংক্ষিপ্ত কোডের জন্য একলাইনে লিখা গ্রহণযোগ্য, যথাঃ `if (cond) return null`. কিন্তু একটা কোড ব্লক (সবশেষে যেটা দেখলাম) সাধারণত বেশী পাঠযোগ্য।

### লাইনের দৈর্ঘ্য

কেউই লম্বা অনুভূমিক লাইন পড়তে পছন্দ করে না। একে ভাগ করে দেয়াই উত্তম।

উদাহারণস্বরুপ:
```js
// ব্যাকটিক কোট ` এর সাহায্যে একটা স্ট্রিংকে ভাগ করা যায়
let str = `
  Ecma International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

এবং  `if` স্টেট্মেন্টগুলোয় :

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

লাইনের দৈর্ঘ্য নিজেদের টিমের সাথে অলোচনা করে নেয়া উচিৎ। সাধারণত এটা ৮০ থেকে ১২০ অক্ষরের হয়।

### ইন্ডেন্ট (খাঁজ)

ইন্ডেন্ট ২ ধরণের হয়:

- **আনুভুমিক ইন্ডেন্ট: ২ অথবা ৪ টি স্পেস**

    একটি আনুভুমিক ইন্ডেন্ট ২ থেকে ৪ টি স্পেস নিয়ে গঠিত অথবা আনুভুমিক ট্যাব চিহ্ন (কী `key:Tab`)। কোনটা ভাল একটি বিতর্কের বিষয়। যদিও স্পেসের ব্যাবহার এখন বেশি।

    ইন্ডেন্টশনের ক্ষেত্রে ট্যাব চিহ্ন থেকে স্পেস ব্যাবহারের একটি বাড়তি সুবিধা হল এর বেশি ফ্ল্যাক্সিবল কনফিগারেশনের 

    যেমন, এভাবে আমরা আর্গুমেন্টগুলোকে  শুরুর ব্যাকেটের সাথে লম্বভাবে রাখতে পারি :

    ```js no-beautify
    show(parameters,
         aligned, // বামপাশে ৫টি স্পেস দেয়া
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **উল্লম্ব ইন্ডেন্ট : কোডকে লজিকাল ব্লকে ভাগ করতে ফাঁকা লাইন**

    এমনকি শুধুমাত্র একটা ফাংশনকে কয়েকটি লজিকাল ব্লকে ভাগ করা যেতে পারে। নিচে উদাহারনে, চলক নির্ধারণ করতে, প্রধান লুপ ও তার ফলাফল রিটার্নকে একাধিক উল্লম্ব খণ্ডে ভাগ করা হয়েছে:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    একটি বাড়তি লাইন এখানে কোডকে আরও পড়ার উপযোগী করেছে। There should not be more than nine lines of code without a vertical indentation.

### Semicolons

A semicolon should be present after each statement, even if it could possibly be skipped.

There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.

### Nesting Levels

Try to avoid nesting code too many levels deep.

For example, in the loop, it's sometimes a good idea to use the [`continue`](info:while-for#continue) directive to avoid extra nesting.

For example, instead of adding a nested `if` conditional like this:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- one more nesting level
  }
}
```

We can write:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- no extra nesting level
}
```

A similar thing can be done with `if/else` and `return`.

For example, two constructs below are identical.

Option 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Option 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.

## Function Placement

If you are writing several "helper" functions and the code that uses them, there are three ways to organize the functions.

1. Declare the functions *above* the code that uses them:

    ```js
    // *!*function declarations*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*the code which uses them*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Code first, then functions

    ```js
    // *!*the code which uses the functions*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*helper functions*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Mixed: a function is declared where it's first used.

Most of time, the second variant is preferred.

That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.

## Style Guides

A style guide contains general rules about "how to write" code, e.g. which quotes to use, how many spaces to indent, the maximal line length, etc. A lot of minor things.

When all members of a team use the same style guide, the code looks uniform, regardless of which team member wrote it.

Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.

Some popular choices:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (plus many more)

If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.

## Automated Linters

Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:

- [JSLint](http://www.jslint.com/) -- one of the first linters.
- [JSHint](http://www.jshint.com/) -- more settings than JSLint.
- [ESLint](http://eslint.org/) -- probably the newest one.

All of them can do the job. The author uses [ESLint](http://eslint.org/).

Most linters are integrated with many popular editors: just enable the plugin in the editor and configure the style.

For instance, for ESLint you should do the following:

1. Install [Node.js](https://nodejs.org/).
2. Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4. Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.

Here's an example of an `.eslintrc` file:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

Here the directive `"extends"` denotes that the configuration is based on the "eslint:recommended" set of settings. After that, we specify our own.

It is also possible to download style rule sets from the web and extend them instead. See <http://eslint.org/docs/user-guide/getting-started> for more details about installation.

Also certain IDEs have built-in linting, which is convenient but not as customizable as ESLint.

## Summary

All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.

Reading popular style guides will allow you to keep up to date with the latest ideas about code style trends and best practices.

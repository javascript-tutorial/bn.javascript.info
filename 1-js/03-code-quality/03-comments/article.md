# মন্তব্য

ইতপূর্বে আমরা কোডের গঠন চ্যাপ্টারে দেখেছি যে মন্তব্য এক লাইনের (সিংগেল লাইন) যা `//` দিয়ে শুরু এবং একাধিক লাইনের (মাল্টি লাইন) যা `/* ... */` শুরু হতে পারে.

সাধারণত আমরা কোডটি কিভাবে এবং কেনো কাজ করছে তার বর্ণনা দেবার জন্য মন্তব্য ব্যাবহার করে থাকি।

প্রাথমিকভাবে মন্তব্য সুস্পষ্ট মনে হতে পারে, তবে প্রোগ্রামিং এ নবাগতরা প্রায়শই মন্তব্য ভুলভাবে ব্যবহার করে থাকে।

## ত্রুটিপূর্ণ মন্তব্য

নবাগতদের মাঝে মন্তব্য ব্যবহার করে "এই কোডে কি ঘটছে" তা ব্যাখ্যা করার প্রবণতা দেখা যায়। এরকমঃ

```js
// This code will do this thing (...) and that thing (...)
// ...and who knows what else...
very;
complex;
code;
```

কিন্ত ভালো কোডে এরকম "ব্যাখ্যামূলক" মন্তব্যের উপস্থিতি হওয়া উচিৎ ন্যূনতম। মন্তব্য ছাড়াই কোড সহজবোধ্য হওয়াটা গুরুত্বপূর্ণ। 

এ ব্যাপারে একটি সুন্দর নিয়ম আছেঃ "কোডটি যদি এতটাই অস্পষ্ট হয় যে এর জন্য একটি মন্তব্য প্রয়োজন, তবে সম্ভবত মন্তব্যের পরিবর্তে এটি পুনরায় লেখা উচিত" 

### কৌশল: ফাংশন পুনর্গঠন

অনেক ক্ষেত্রে কোডের অংশবিশেষ এর বদলে ফাংশন ব্যবহার করাটা সুবিধাজনক। যেমনঃ

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // check if i is a prime number
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

 `isPrime` ফাংশন দিয়ে এর এর শ্রেয়তর বিকল্পঃ 

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

এখন আমরা খুব সহজেই কোডটি বুঝতে পারছি। ফাংশনটি নিজেই মন্তব্য হিসবে কাজ করছে। এ ধরনের কোড কে বলা হয় "স্ব-বর্ণনামূলক"

### কৌশলঃ ফাংশন তৈরি

এবং যদি আমাদের নিচের মত এরকম দীর্ঘ কোড শিট থাকেঃ

```js
// here we add whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// here we add juice
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

সেক্ষেত্রে শ্রেয়তর বিকল্পের জন্য কোডটি কে নিচের মত ফাংশনে পুনর্ঘঠন করা যেতে পারেঃ

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

ফাংশন নিজেরাই কি ঘটছে ব্যাখ্যা করে। এখানে মন্তব্য লেখার কিছু নেই। এছাড়াও আলাদা আলাদা থাকলে কোডের গঠন ভালো হয়। এটা সুপষ্ট যে প্রতিটি ফাংশন কি করে, কি গ্রহণ করে এবং কি রিটার্ন করে। 

বাস্তবে,আমরা সম্পুর্ণরূপে ব্যখ্যা সম্বলিত মন্তব্য পরিহার করতে পারি না। এখানে উৎকর্ষতা সাধনের জন্য অনেক জটিল অ্যালগরিদম এবং অনেক সুক্ষ্ম সমন্বয় করা হয়। কিন্ত সাধারণভাবে আমাদের উচিৎ কোড কে সহজ-সরল এবং স্ব-বর্ণ্নামূলক রাখার জন্য চেষ্টা করা ।  

## ভালো মন্তব্য 

সুতরাং, ব্যাখ্যামূলক মন্তব্য সাধারণত খারাপ। সেক্ষেত্রে কোন ধরণের মন্তব্য ভাল?

গঠনপ্রণালী বর্ণনা করুন
: Provide a high-level overview of components, how they interact, what's the control flow in various situations... In short -- the bird's eye view of the code. There's a special language [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) to build high-level architecture diagrams explaining the code. Definitely worth studying.

Document function parameters and usage
: There's a special syntax [JSDoc](http://en.wikipedia.org/wiki/JSDoc) to document a function: usage, parameters, returned value.

For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.

Why is the task solved this way?
: What's written is important. But what's *not* written may be even more important to understand what's going on. Why is the task solved exactly this way? The code gives no answer.

    If there are many ways to solve the task, why this one? Especially when it's not the most obvious one.

    Without such comments the following situation is possible:
    1. You (or your colleague) open the code written some time ago, and see that it's "suboptimal".
    2. You think: "How stupid I was then, and how much smarter I'm now", and rewrite using the "more obvious and correct" variant.
    3. ...The urge to rewrite was good. But in the process you see that the "more obvious" solution is actually lacking. You even dimly remember why, because you already tried it long ago. You revert to the correct variant, but the time was wasted.

    Comments that explain the solution are very important. They help to continue development the right way.

Any subtle features of the code? Where they are used?
: If the code has anything subtle and counter-intuitive, it's definitely worth commenting.

## Summary

An important sign of a good developer is comments: their presence and even their absence.

Good comments allow us to maintain the code well, come back to it after a delay and use it more effectively.

**Comment this:**

- Overall architecture, high-level view.
- Function usage.
- Important solutions, especially when not immediately obvious.

**Avoid comments:**

- That tell "how code works" and "what it does".
- Put them in only if it's impossible to make the code so simple and self-descriptive that it doesn't require them.

Comments are also used for auto-documenting tools like JSDoc3: they read them and generate HTML-docs (or docs in another format).

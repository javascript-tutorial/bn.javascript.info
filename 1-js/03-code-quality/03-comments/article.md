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

 `isPrime` ফাংশন দিয়ে এর শ্রেয়তর বিকল্পঃ 

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

গঠনপ্রণালী বর্ণনা করুনঃ কম্পোনেন্ট এর সার্বিক একটি রূপরেখা উল্লেখ করুন, এদের পারষ্পরিক মিথষ্ক্রিয়া এবং ভিন্ন ভিন্ন কন্ট্রোল ফ্লো সম্পর্কে বলুন। সংক্ষেপে, কোড এর বার্ডস আই ভিউ। কোড সহজবোধ্য উপস্থাপন করার জন্য সার্বিক রূপরেখা তৈরির বিশেষ ধরনের ল্যাংগুয়েজ [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) রয়েছে। 

ফাংশন এর প্যারামিটার এবং ব্যাবহার লিপিবদ্ধ করুনঃ ফাংশন এর প্যারামিটার, ব্যাবহার, রিটার্ন ভ্যালু লিপিবদ্ধ করার জন্য বিশেষ ধরনের ল্যাংগুয়েজ [JSDoc](http://en.wikipedia.org/wiki/JSDoc) রয়েছে।

উদাহরণস্বরূপঃ

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

এই ধরনের মন্তব্যের মাধ্যমে আমরা কোড না দেখেই ফাংশনটির কাজ এবং ব্যবহার বুঝতে পারি।

প্রসঙ্গত উল্লেখ্য, অনেক এডিটর যেমন [WebStorm](https://www.jetbrains.com/webstorm/) এই ধরনের ল্যাংগুয়েজ বুঝতে পারে এবং অটোকমপ্লিট ও স্বয়ংক্রিয় কোড-পরীক্ষায় তা ব্যবহার করে থাকে। 

এছাড়াও, মন্তব্য থেকে এইচটিএমএল-ডকুমেন্টেশন তৈরির জন্য [JSDoc 3](https://github.com/jsdoc3/jsdoc) এর মত টুল রয়েছে। JSDoc সম্পর্কে আরো জানতে <http://usejsdoc.org/> দেখতে পারেন।  

কাজটি কেনো এভাবে সমাধান করা হয়েছে? : যা লিখিত থাকে তা গুরুত্বপূর্ণ। তবে যা *অলিখিত* সেটা কি ঘটছে তা বোঝার জন্য অধিক গুরুত্বপূর্ণ হতে পারে। এই কাজটি কেনো ঠিক এইভাবেই সমাধান করা হয়েছে? এক্ষেত্রে কোড কোন উত্তর দেয় না।  

    যদি কাজটি সমাধানের অনেকগুলো উপায় থাকে, সেক্ষেত্রে কেনো এইটি? বিশেষভাবে যখন এটি আপাতদৃষ্টিতে সবচেয়ে সুস্পষ্ট সমাধান নয়  

    এইধরনের মন্তব্য ছাড়া নিম্নলিখিত পরস্থিতি হতে পারেঃ 
    ১। আপনি অথবা আপনার সহকর্মীরা কিছুক্ষণ পূর্বে লিখিত কোডটি দেখলেন এবং ভাবলেন কোডটি সাব-অপটিমাল 
    ২। আপনি ভাবলেনঃ " আমি কতটা বোকাটা ছিলাম,আর এখন কতটা বুদ্ধিমান ", এবং "আরো সুস্পষ্ট এবং সঠিক" বিকল্প ব্যবহার করে পুনরায় কোডটি লিখলেন  
    ৩। ... কোড পুনরায় লেখার তাগিদ থাকা ভালো। কিন্তু কাজকরার প্রক্রিয়াআপনি দেখলেন "অধিক সুস্পষ্ট" সমাধানটি তে আসলে ঘাটতি রয়েছে।  এমনকি আপনি খুব অস্পষ্টভাবে মনে করতে পারবেন কেনো এমন হচ্ছে, কারণ আপনি অনেক সময় আগে এই চেষ্টা করেছেন। আপনি আবার সঠিক বিকল্পে ফিরে আসবেন কিন্তু  এর মাঝে কিছু সময় অপচয় হলো। 

    সমাধান কে ব্যখ্যাকারী মন্তব্য খুব গুরুত্বপূর্ণ। এই ধরনের মন্তব্য সঠিক প্রক্রিয়ায় ডেভেলপমেন্ট করতে সাহাজ্য করে। 

কোড এ কোন সূক্ষ্ম বৈশিষ্ট রয়েছে? কেনো এই ধরনের বৈশিষ্ট ব্যবহার করা হয়েছে?:  If the code has anything subtle and counter-intuitive, it's definitely worth commenting.

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

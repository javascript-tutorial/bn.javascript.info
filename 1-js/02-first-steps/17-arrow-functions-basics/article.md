# এ্যারো ফাংশনের মূল বিষয়াবলি

এটা ফাংশন তৈরির আরেকটা খুব সহজ এবং সংক্ষিপ্ত কিন্তু খুবই কার্যকরী একটি রূপ, প্রায়ই দেখা যায়, সাধারণ যে ফাংশন আছে তার থেকে এটা ভাল।


একে "এ্যারো ফাংশন" বলা হয় কারণ এটা দেখতে অনেকটা এই রকমঃ

```js
let func = (arg1, arg2, ..., argN) => expression
```

এখানে `func` নামে একটা ফাংশন তৈরি করা হয়েছে যা `arg1..argN` আর্গুমেন্ট হিসেবে নিচ্ছে, তারপর ডানপাশের `expression` টি সম্পাদন করে তার যে রেজাল্ট হয় সেটা রিটার্ন করছে।

অন্যথায় বলতে গেলে, এটা নিম্নোক্ত কোডটির সংক্ষিপ্ত রূপ।

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

চলুন, একটা বাস্তবিক উদাহরণ দেখা যাকঃ

```js run
let sum = (a, b) => a + b;

/* এই এ্যারো ফাংশনটা নিচের কোডটির সংক্ষিপ্ত রূপঃ

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

এখানে আপনি যেমনটি দেখতে পাচ্ছেন, `(a, b) => a + b` ফাংশনটি দুইটা আর্গুমেন্ট নিচ্ছে যথাক্রমে `a` ও `b` এবং সম্পাদনের সময় এটি `a + b` এক্সপ্রেশনটির মান নির্ণয় করছে এবং তার রেজাল্টটি রিটার্ন করছে। 

- যদি আমাদের কেবল একটি মাত্র আর্গুমেন্ট থাকে তাহলে প্যারামিটারগুলোর দুই পাশে যে প্যারেন্থেসিস বা প্রথম বন্ধনী থাকে সেটি না দিলেও চলে, যেটা কোডটাকে আরও সংক্ষিপ্ত করে নিয়ে আসে। 

    উদাহরণ স্বরূপঃ

    ```js run
    *!*
    let double = n => n * 2;
    // এটা বলেতে গেলে let double = function(n) { return n * 2 } এর একটি অন্যরূপ।  
    */!*

    alert( double(3) ); // 6
    ```

- যদি ফাংশনের কোন আর্গুমেন্ট না থাকে তাহলে প্যারেন্থেসিস বা প্রথম বন্ধনীদ্বয় খালি থাকবে (কিন্তু তারা উপস্থিত থাকবে)  

    ```js run
    let sayHi = () => alert("হ্যালো!");

    sayHi();
    ```

এ্যারো ফাংশন, ফাংশন এক্সপ্রেশনের মত একই ভাবে ব্যবহার করা যায়। 

এই ক্ষেত্রে, ডাইন্যামিকভাবে একটা ফাংশন তৈরি করতে গেলেঃ 

```js run
let age = prompt("আপনার বয়স কত?", 18);

let welcome = (age < 18) ?
  () => alert('হ্যালো') :
  () => alert("অভিবাদন!");

welcome();
```

এ্যারো ফাংশন হয়ত শুরুর দিকে কিছুটা অন্য রকম এবং খুব একটা পাঠযোগ্য নাও লাগতে পারে, কিন্তু আমাদের এই মনোভাব খুব তাড়াতাড়ি বদলে যাবে যেহেতু খুব দ্রুতই আমরা এর গঠনের সাথে অভ্যস্থ হয়ে যাব।

এটা এক লাইনের কাজের জন্য খুবই সুবিধাজনক যখন আমরা খুব বেশি একটা লিখতে চাই না। 

## অনেক লাইনের এ্যারো ফাংশন

উপড়ের উদাহরণগুলোতে (`=>`) এই চিহ্নের বাম পাশে আর্গুমেন্ট সমূহ নিয়েছে এবং তাদের সাহায্যে ডান পাশের এক্সপ্রেশনটির মান নির্ধারন করেছে।

কিন্তু কখনো সখনো আমাদের এর থেকে কিছুটা বেশি জটিল কাজ করতে হয়, যেমন একের অধিক এক্সপ্রেশন অথবা স্টেটমেন্ট সম্পাদন করা। এটাও সম্ভব, কিন্তু তার জন্য তাদের কার্লি ব্র্যাসেস বা দ্বিতীয় বন্ধনীর ভিতরে লিখতে হবে। তারপর সেখানে একটা সাধারন `return` ব্যবহার করতে হবে।

অনেকটা এইরকমঃ

```js run
let sum = (a, b) => {  // এই কার্লি ব্র্যাসটা শুরু করে একটা বহুলাইন ফাংশনের।
  let result = a + b;
*!*
  return result; // যদি আমরা কার্লি ব্র্যাসেস ব্যবহার করি, তাহলে আমাদের আলাদাকরে একটা "return" ব্যবহার করা লাগবে। 
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
এখানে আমরা এ্যারো ফাংশনের "সংক্ষিপ্ত রূপের" প্রশংসা করলাম। কিন্তু এইটাই এর সবকিছু নয়! 

এ্যারো ফাংশনের আরও খুব মজার মজার অন্যান্য ফিচার রয়েছে।

এদের আরও গভীর ভাবে জানতে হলে প্রথমে আমাদের জাভাস্ক্রিপ্টের কিছু অন্যান্য বিষয়াবলি সম্পর্কে জানতে হবে। সুতরাং পরবর্তিতে আমরা <info:arrow-functions> এই চ্যাপ্টারে এ্যারো ফাংশন নিয়ে ফিরে আসব।

তো এখন পর্যন্ত দেখতে গেলে, আমরা এ্যারো ফাংশন ব্যবহার করে এক লাইনের কোন কাজ এবং কলব্যাক সম্পাদন করতে পারি। 
```

## Summary
## মূলকথা

এ্যারো ফাংশন এক লাইনের কাজের জন্য খুব সুবিধাজনক। এটা দুই প্রকার হতে পারেঃ 

1. কোন কার্লি ব্র্যাসেস ছাড়াঃ `(...args) => expression` -- ডান পাশের অংশটা একটা এক্সপ্রেশন এবং ফাংশনটি এই এক্সপ্রেশনের মান নির্ণয় করে এবং সেটা রিটার্ন করে।
2. কার্লি ব্র্যাসেস সহঃ `(...args) => { body }` -- বন্ধনীসমূহ ফাংশনের ভিতরে একের অধিক স্ট্যাটমেন্ট লিখতে দিচ্ছে, কিন্তু আমাদের কোন কিছু রিটার্ন করার জন্য আলাদা করে `return` ব্যবহার করতে হবে।
# অ্যাসিঙ্ক ইটারেশন এবং জেনারেটর

অ্যাসিঙ্ক্রোনাসলি আসা ডাটাগুলোকে অ্যাসিঙ্ক্রোনাস ইটারেশনের সাহায্যে আমরা আমাদের চাহিদা মত ইটারেট করতে পারি। উদাহরণস্বরূপ, যখন আমরা নেটওয়ার্কের মাধ্যমে ছোট ছোট অংশ ডাউনলোড করি। এটি অ্যাসিঙ্ক্রোনাস জেনারেটরের সাহায্যে আরো সহজে করা যায়।

চলুন প্রথমে একটি উদাহরণ দেখি, সিনট্যাক্সগুলো বুঝার চেষ্টা করি এবং পরে একটি বাস্তবিক ব্যবহার দেখব।

## পুনরায় ইটারেবল

আসুন পুনরায় ইটারেবলের টপিক্সটি দেখি।

আমাদের একটি অবজেক্ট আছে, যেমন `range`:
```js
let range = {
  from: 1,
  to: 5
};
```

...এবং আমরা `for..of` লুপ চালাব, যেমন `for(value of range)`, `1` হতে `5` পর্যন্ত মানগুলো পেতে।

অন্য কথায় বলা যায়, আমরা আমাদের অবজেক্টটিতে *iteration ability* সাপোর্ট করাব।

এটি আমরা করতে পারি একটি বিশেষ মেথডের সাহায্যে `Symbol.iterator`:

- for..of range কে কল করা হলে সবার শুরুতে এই মেথডটি এক্সিকিউট হবে, এবং এটি একটি অবজেক্ট রিটার্ন করবে যার একটি মেথড `next`।
- for..of লুপের প্রতিবার ইটারেশনে next() কল হয় পরবর্তী মানের জন্য।
- `next()` মেথডটি রিটার্ন করে একটি অবজেক্ট `{done: true/false, value:<loop value>}`, যেখানে `done:true` দ্বারা বুঝায় লুপের শেষ।

এখানে `range` এর জন্য একটি ইটারেবল ইমপ্লিমেন্ট করি:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // একবার কল হবে, for..of এর শুরুতে
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // প্রতিবার ইটারেশনে পরবর্তী মান টি পাব
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 তারপর 2, তারপর 3, তারপর 4, তারপর 5
}
```
যদি আপনি ইটারেটর নিয়ে আরো বিস্তারিত জানতে চান দয়া করে এটি দেখুন [ইটারেবল চ্যাপ্টার](info:iterable)।

## অ্যাসিঙ্ক ইটারেবল

যখন আমরা কোন মান অ্যাসিঙ্ক্রোনাসলি পেতে চাই তখন আমাদের অ্যাসিঙ্ক ইটারেটর লাগে: অনেকটা `setTimeout` বা এই ধরণের অন্যান্য ফাংশনের জন্য।

সাধারণত আমরা আমাদের নেটওয়ার্ক রিকুয়েস্টে পরবর্তী মানটি পাঠাতে এমন অবজেক্ট লাগে, পরবর্তীতে আমরা ব্যবহারিক উদাহরণের মাধ্যমে আরো ভালোভাবে বুঝব।

অ্যাসিঙ্ক্রোনাসলি ইটারেটরেবল অবজেক্ট তৈরি করতে:

১. আমাদের `Symbol.iterator` এর পরিবর্তে `Symbol.asyncIterator` ব্যবহার করা লাগবে।
২. `next()` অবশ্যই একটি প্রমিস রিটার্ন করবে (পরবর্তী মানের জন্য এটি fulfilled হবে)।
    - `async` কিওয়ার্ডটি এটি হ্যান্ডল করবে, সহজেই আমরা লিখতে পারি `async next()`।
৩. এইধরনের অবজেক্ট ইটারেট করতে, আমরা ব্যবহার করব `for await (let item of iterable)` লুপ।
    - `await` কিওয়ার্ডটি নোট করুন।

চলুন আগেরটির মত একটি ইটারেটরেবল `range` অবজেক্ট তৈরি করি কিন্তু এটি অ্যাসিঙ্ক্রোনাসলি প্রতি সেকেন্ডে একটি মান রিটার্ন করবে।

আমাদের পূর্বের কোডের কিছু জায়গায় পরিবর্তন লাগবে:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // নোট: আমরা async next এ  "await" ব্যবহার করতে পারি:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

আমরা দেখতে পাচ্ছি এটির স্ট্রাকচার অনেকটা সাধারণ ইটারেটরের মতঃ

১. একটি অ্যাসিঙ্ক্রোনাসলি ইটারেটরেবল অবজেক্ট তৈরি করতে `Symbol.asyncIterator` `(1)` মেথডটি অবশ্যই লাগবে।
২. মেথডটি `next()` মেথডে একটি প্রমিস এর মাধ্যমে অবজেক্টটি রিটার্ন করে `(2)`।
৩. The `next()` method doesn't have to be `async`, it may be a regular method returning a promise, but `async` allows to use `await`, so that's convenient. Here we just delay for a second `(3)`।
৪. ইটারেটের জন্য আমরা `for await(let value of range)` `(4)` ব্যবহার করি, লুপে "for" এর পর "await" ব্যবহার করুন। এটি প্রথমে কল করে `range[Symbol.asyncIterator]()` কে এবং পরে মানের জন্য `next()` কে।

এখানে এদের পার্থক্য দেয়া হল:

|       | ইটারেটর | অ্যাসিঙ্ক ইটারেটর |
|-------|-----------|-----------------|
| ইটারেটরে প্রদত্ত অবজেক্ট মেথড | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` এর রিটার্নকৃত মান              | যেকোন মান         | `Promise`  |
| ব্যবহৃত লুপ                          | `for..of`         | `for await..of` |


````warn header="স্প্রেড অপারেটর `...` অ্যাসিঙ্ক্রোনাসলি কাজ করে না"
এটি সিঙ্ক্রোনাস ইটারেটরের একটি ফিচার, অ্যাসিঙ্ক্রোনাসের সাথে কাজ করে না।


উদাহরণস্বরূপ, এখানে স্প্রেড অপারেটর কাজ করবে না:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

এটিই স্বাভাবিক, কেননা এটি `Symbol.iterator` এর সাথে কাজ করে, `Symbol.asyncIterator` এর সাথে করে না।

`for..of` এর জন্যও এটি কাজ করবে না: কেননা `await`, `Symbol.iterator` এর সাথে কাজ করে না।
````

## পুনরায় জেনারেটরস

চলুন আবার জেনারেটর ব্যবহার করি, এটির মাধ্যমে আমরা ইটারেশনের কোডকে আরো সংক্ষিপ্ত করতে পারি। বেশিরভাগ ক্ষেত্রে আমরা ইটারেবল অবজেক্ট তৈরিতে জেনারেটর ব্যবহার করি, বিস্তারিত এই অধ্যায়ে [](info:generators)।

জেনারেটর গুলো `function*` এভাবে লিখতে পারি এবং `yield` ব্যবহার করি মান জেনারেট করতে, তারপর `for..of` এদের ইটারেট করতে পারি।

উদাহরণটিতে একটি সিক্যুয়েন্স মান তৈরি করে `start` হতে `end` পর্যন্ত:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, তারপর 2, তারপর 3, তারপর 4, তারপর 5
}
```

ইতোমধ্যে আমরা জানি, ইটারেবল অবজেক্ট তৈরিতে, আমাদের অবশ্যই `Symbol.iterator` লাগবে।

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

`Symbol.iterator` এর অন্যতম প্রয়োগ হয় জেনারেটরে, এর মাধ্যমে আমরা কোডকে সংক্ষিপ্ত করতে পারি:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); //1, তারপর 2, তারপর 3, তারপর 4, তারপর 5
}
```

আরো বিস্তারিত জানতে এই অধ্যায়টি দেখুন [](info:generators)।

সাধারণ জেনারেটরে আমরা `await` ব্যবহার করতে পারি না। সকল মান সিঙ্ক্রোনাসলি আসে, এখানে `for..of` এ কোন লাইনে এ ডিলে হয় না, এটি একটি সিঙ্ক্রোনাস কন্সট্রাক্ট।

যদি আমরা মানগুলো অ্যাসিঙ্ক্রোনাসলি পেতে চাই যেমন নেটওয়ার্ক রিকুয়েস্টে তখন কি হবে?

চলুন অ্যাসিঙ্ক্রোনাস জেনারেটরের মাধ্যমে আমরা এটি ইমপ্লিমেন্ট করি।

## অ্যাসিঙ্ক জেনারেটর

আমাদের অ্যাপ্লিকেশনগুলোতে যখন আমরা অবজেক্ট এর মানসমূহকে অ্যাসিঙ্ক্রোনাসলি জেনারেট করতে চায়, তখন আমরা অ্যাসিঙ্ক্রোনাস জেনারেটর ব্যবহার করতে চায়।

এর সিনট্যাক্স সহজবোধ্য: `function*` এর পূর্বে `async` কিওয়ার্ড লিখা লাগবে। এভাবেই অ্যাসিঙ্ক্রোনাস জেনারেটর লিখা যায়।

এবং একে `for await (...)` ইটারেট করব:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); //1, তারপর 2, তারপর 3, তারপর 4, তারপর 5(প্রতিটির মধ্যে ১ সেকেন্ড পার্থক্য থাকে)
  }

})();
```

জেনারেটরটি অ্যাসিঙ্ক্রোনাস হওয়ায় আমরা এর মধ্যে `await`, `promise` এবং নেটওয়ার্ক কল ইত্যাদি করতে পারি।

````smart header="এদের ইন্টারনাল পার্থক্য"
টেকনিক্যালি, জেনারেটর এবং অ্যাসিঙ্ক জেনারেটরের মধ্যে ইন্টারনাল ডিফারেন্স আছে।

অ্যাসিঙ্ক জেনারেটরে, `generator.next()` মেথডটি অ্যাসিঙ্ক্রোনাস, এটি `promise` রিটার্ন করে।

সাধারণ জেনারেটরে আমরা মান এভাবে পাই `result = generator.next()`. কিন্তু অ্যাসিঙ্ক জেনারেটরে মান পেতে আমাদের `await` যুক্ত করতে হবে, এভাবে:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```
এজন্য অ্যাসিঙ্ক জেনারেটর `for await...of` লুপ লাগে।
````

### অ্যাসিঙ্ক ইটারেবল রেঞ্জ

সাধারণত জেনারেটরে `Symbol.iterator` ব্যবহার করে ইটারেশন কোডকে আমরা সংক্ষিপ্ত করতে পারি।

অনুরূপভাবে, অ্যাসিঙ্ক জেনারেটরে `Symbol.asyncIterator` ব্যবহার করে অ্যাসিঙ্ক্রোনাস ইটারেশন ইমপ্লিমেন্ট করতে পারি।

যেমন, আমরা `range` এর মানগুলো প্রতি সেকেন্ড হিসেব করে অ্যাসিঙ্ক্রোনাসলি জেনারেট করতে পারি, এজন্য `Symbol.iterator` এর বদলে `Symbol.asyncIterator` লাগবে:

```js run
let range = {
  from: 1,
  to: 5,

  // [Symbol.asyncIterator]: async function*() { এই লাইনটি  এর অনুরূপ
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // দুটি মানের মধ্যেবর্তী কিছুক্ষণের জন্য অপেক্ষা করবে
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, তারপর 2, তারপর 3, তারপর 4, তারপর 5
  }

})();
```

এখন মানগুলো ১ সেকেন্ড পর পর আসবে।

```smart
ট্যাকনিক্যালি, অবজেক্টটিতে `Symbol.iterator` এবং `Symbol.asyncIterator` উভয়ই ব্যবহার করতে পারি, এরা উভয়ই সিঙ্ক্রোনাসলি (`for..of`) এবং অ্যাসিঙ্ক্রোনাসলি (`for await..of`) ইটারেবল হবে।

<<<<<<< HEAD
বাস্তবে, এভাবে না করায় উচিত।
=======
In practice though, that would be a weird thing to do.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
```

## একটি বাস্তবিক উদাহরণ: paginated data

আমরা অনেক উদাহরণ দেখার সাহায্যে অ্যাসিঙ্ক ইটারেটর এবং জেনারেটর বুঝেছি। চলুন একটি বাস্তবিক উদাহরণ দেখি।

অনলাইনে অনেক সার্ভিস আছে যারা পেজিনেটেড ডাটা সরবরাহ করে। উদাহরণস্বরূপ, যখন আমাদের ইউজারদের একটি লিস্ট দরকার হয় এটি "এক পেজের" জন্য একটি রিকুয়েস্টে প্রি-ডিফাইন্ড (যেমনঃ ১০০ জন ইউজারের) ডাটা রিটার্ন করে , এবং পরবর্তী পেজে যাওয়ার জন্য একটি URL প্রদান করে।

এটি একটি কমন প্যাটার্ন। এটি শুধুমাত্র ইউজারের জন্য না, যেকোন কিছু হতে পারে।

উদাহরণস্বরূপ, গিটহাব হতে আমরা পেজিনেটেড উপায়ে কমিট নিয়ে আসতে পারি:

- এই জন্য আমাদের এই  `https://api.github.com/repos/<repo>/commits` URL এ একটি `fetch` রিকুয়েস্ট করা লাগবে।
- এটি জেসন ফরম্যাটে ৩০ টি কমিট রেসপন্ড করে, এবং পরবর্তী পেজে যাওয়ার জন্য `Link` হেডারের মাধ্যমে একটি লিঙ্ক প্রদান করে।
- তারপর আমরা পরবর্তী কমিটগুলোর জন্য লিঙ্কটির মাধ্যমে আরো রিকুয়েস্ট পাঠাতে পারি, এভাবে চলতে থাকবে।

আমরা কমিট নিয়ে আসার জন্য একটি `fetchCommits(repo)` ফাংশন তৈরি করি, যা প্রয়োজনমত রিকুয়েস্ট তৈরি করে। এবং পেজিনেশনের সকল ব্যাপার এটির মাধ্যমে নিয়ন্ত্রিত হয়। এটি একটি সিম্পল `for await..of`।

এখন আমরা একটি সিম্পল API চাই: যেটি কমিটগুলোর একটি ইটারেবল অবজেক্ট হয়, তো আমরা এভাবে করতে পারি:

```js
for await (let commit of fetchCommits("username/repository")) {
  // কমিটগুলো প্রসেস করি
}
```

চলুন অ্যাসিঙ্ক জেনারেটরটি ইমপ্লিমেন্ট করি:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // গিটহাবে User-Agent হেডার দরকার
    });

    const body = await response.json(); // (2) রেস্পন্স করবে জেসন (কমিটের অ্যারেসমূহ)

    // (3) পরবর্তী পেজের URL টি হেডার থেকে এক্সট্রাক্ট করি
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) কমিটগুলো একটির পর একটি আসবে পেজ শেষ না হওয়া পর্যন্ত
      yield commit;
    }
  }
}
```

এটি কিভাবে কাজ করছে বিস্তারিত দেখি:

<<<<<<< HEAD
১. আমরা রিমোট URL থেকে কিছু ডাউনলোডের জন্য ব্রাউজারের [fetch](info:fetch) মেথডটি ব্যবহার করতে পারি। এটির মাধ্যমে আমরা অথোরাইজেশন এবং অন্যান্য হেডার পাস করতে পারি -- গিটহাব API এ রিকুয়েস্টের জন্য আমাদের `User-Agent` হেডারটি পাঠানো প্রয়োজন
২. `fetch` এর মাধ্যমে আমরা একটি জেসন অবজেক্ট পাই, যা `fetch`এর একটি নির্দিষ্ট মেথড।
৩. আমরা পরবর্তী পেজের URL টি রেস্পন্সের `Link` হেডার হতে পাই।  এটি একটি স্পেশাল ফরম্যাটে থাকে তাই আমরা রেগুলার এক্সপ্রেশন  ব্যবহারের এর মাধ্যমে পরবর্তী পেজের লিঙ্কটি পায়। পরবর্তী পেজের URL টি দেখতে এমন হয় `https://api.github.com/repositories/93253246/commits?page=2`। এটি গিটহাবের মাধ্যমে জেনারেট হয়।
৪. তারপর আমরা `yield` এর মাধ্যমে কমিট গুলো রিসিভ করি এবং যখন এটি শেষ হয়, `while(url)` লুপ আবার রান হয় এবং এর ফলে আরো রিকুয়েস্ট জেনারেট হয়।
=======
    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that (we will learn this feature in [Regular expressions](info:regular-expressions)).
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

উদাহরণস্বরূপ (কনসোলে কমিটের অথরের নাম দেখায়):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // ১০০ কমিট আসার পর লুপ থেমে যায়
      break;
    }
  }

})();

// Note: If you are running this in an external sandbox, you'll need to paste here the function fetchCommits described above 
```

এটি আমাদের চাহিদামত কাজ করে। এখানে পেজিনেশেনের পুরো ব্যাপারটা ইন্টারনালি সংগঠিত হয় এবং অ্যাসিঙ্ক জেনারেটর আমাদের কমিটগুলো রিটার্ন করে।

## সারাংশ

সাধারণ ইটারেটর এবং জেনারেটর গুলো সিঙ্ক্রোনাস ডাটার সাথে ভালোভাবেই কাজ করে।

যখন আমাদের ডাটা গুলো অ্যাসিঙ্ক্রোনাসলি আসে তখন আমাদের `async` ব্যবহার করা উচিত এবং `for..of` এর বদলে `for await..of` ব্যবহার করতে হবে।

অ্যাসিঙ্ক এবং সাধারণ ইটারেটরের মধ্যে সিনট্যাক্সের পার্থক্য:

|       | ইটারেবল | অ্যাসিঙ্ক ইটারেবল |
|-------|-----------|-----------------|
| ইটারেটরে ব্যবহৃত মেথড | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` এর রিটার্ন ভ্যালু          | `{value:…, done: true/false}`         | `Promise` এর `resolve` রিটার্ন করে `{value:…, done: true/false}`  |

অ্যাসিঙ্ক এবং সাধারণ জেনারেটরের মধ্যে সিনট্যাক্সের পার্থক্যঃ

|       | জেনারেটর | অ্যাসিঙ্ক জেনারেটর |
|-------|-----------|-----------------|
| ডিক্লেয়ার করার নিয়ম | `function*` | `async function*` |
| `next()` এর রিটার্ন ভ্যালু          | `{value:…, done: true/false}`         | `Promise` এর `resolve` রিটার্ন করে `{value:…, done: true/false}`  |

ওয়েব ডেভলাপমেন্টে আমাদের প্রায়শই ছোট ছোট করে ডাটা স্ট্রীমের দরকার হয়। উদাহরনস্বরূন, একটি বড় ফাইল ডাউনলোড বা আপলোডের জন্য।


আমরা এই ধরনের ডাটার জন্য অ্যাসিঙ্ক জেনারেটর ব্যবহার করতে পারি। বিঃদ্রঃ কিছু এনভাইরনমেন্টে যেমন ব্রাউজারে একটি Streams API আছে, এটি ডাটাকে এক স্ট্রীম থেকে অন্য স্ট্রীমে পাঠাতে একটি বিশেষ ইন্টারফেস দেয় (যেমনঃ এক জায়গা হতে ডাউনলোড করে সাথে সাথে অন্য আরেক জায়গায় পাঠানো)।
# রেগুলার এক্সপ্রেশন এবং স্ট্রিংয়ের মেথড

এই অধ্যায়ে আমরা রেগুলার এক্সপ্রেশনের বিভিন্ন মেথড নিয়ে বিস্তারিত আলোচনা করব।

## str.match(regexp)

`str.match(regexp)` মেথডটি `str` স্ট্রিংয়ের মধ্যে এই `regexp` প্যাটার্নটি অনুসন্ধান করবে।

এটির ৩টি মোড আছে:

১. যদি `regexp` প্যাটার্নে `pattern:g` ফ্ল্যাগ না থাকে, তাহলে প্রথম ম্যাচটি অ্যারে আকারে রিটার্ন করে। এবং এতে `index` (ম্যাচের পজিশন), `input` (ইনপুট স্ট্রিং অর্থাৎ, `str`) এবং `groups` (প্যারেন্টেসিসের দ্বারা ক্যাপচার করা গ্রুপগুলো) প্রপার্টি থাকে:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (সম্পূর্ন মিলটি)
    alert( result[1] );     // Script (প্রথম ক্যাপচারিং গ্রুপস)
    alert( result.length ); // 2

<<<<<<< HEAD
    // আরো কিছু প্রপার্টি:
    alert( result.index );  // 7 (যে অবস্থান হতে মিলটি শুরু হয়)
    alert( result.input );  // I love JavaScript (সোর্স স্ট্রিং)
=======
    // Additional information:
    alert( result.index );  // 7 (match position)
    alert( result.input );  // I love JavaScript (source string)
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
    ```

২. যদি `regexp` প্যাটার্নে `pattern:g` ফ্ল্যাগ থাকে, মিলকৃত স্ট্রিংসমূহকে ক্যাপচারিং গ্রুপ এবং অন্যান্য প্রপার্টিসমূহ ছাড়া অ্যারে আকারে রিটার্ন করে।
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

৩. যদি কোন মিল না খুঁজে না পায়, ফ্ল্যাগ `pattern:g` থাক বা না থাক সর্বদা `null` রিটার্ন করে।

    এটি অবশ্যই একটি গুরুত্বপূর্ন বিষয়। যদি কোন মিল না খুঁজে না পায় তাহলে এটি `null` রিটার্ন করে, কোন এমপ্টি অ্যারে রিটার্ন করে না। সুতরাং আমরা যাচাইয়ের সময় ভুল করে ফেলতে পারি, যেমন:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // এটি Error দেখাবে। Error: Cannot read property 'length' of null
    ```

    যদি কোন মিল খুঁজে না পায় এবং রেজাল্ট অ্যারে আকারে পেতে চাই, তাহলে এভাবে লিখতে পারি:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

`str.matchAll(regexp)` মেথডটি `str.match` এর  "নতুন, আধুনিক" ভার্সন।

এটি ব্যবহার করা হয় ফ্ল্যাগ `pattern:g` ব্যবহার করে সকল মিলের রেজাল্ট গ্রুপসহ পেতে।

`match` এর সাথে এর ৩টি পার্থক্য আছে:

1. এটি মিলসমূহকে অ্যারের পরিবর্তে ইটারেবল অবজেক্ট হিসেবে রিটার্ন করে। `Array.from` এর সাহায্যে একে অ্যারেতে কনভার্ট করতে পারি।
2. প্রতিটি মিলকে ক্যাপচারিং গ্রুপসহ অ্যারে আকারে রিটার্ন করে ( `pattern:g` ফ্ল্যাগ ব্যতীত `str.match` এর মত)।
3. যদি কোন মিল খুঁজে না পায়, এটি `null` এর পরিবর্তে এম্পটি ইটারেবল অবজেক্ট রিটার্ন করে।

<<<<<<< HEAD
উদাহরণ:
=======
1. It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2. Every match is returned as an array with capturing groups (the same format as `str.match` without flag `pattern:g`).
3. If there are no results, it returns an empty iterable object instead of `null`.

Usage example:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], অ্যারে না, তবে একটি ইটারেবল অবজেক্ট

matchAll = Array.from(matchAll); // অ্যারেতে রূপান্তর

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

যদি আমরা `matchAll` এর রেজাল্ট কে `for..of` লুপের সাহায্যে ইটারেট করি তাহলে আমাদের একে অ্যারেতে কনভার্ট করতে হবে না।

## str.split(regexp|substr, limit)

রেগুলার এক্সপ্রেশন(বা সাবস্ট্রিং) ব্যবহার করে স্ট্রিংকে আমরা split (টুকরো টুকরো)  করতে পারি।

আমরা স্ট্রিংকে `split` করতে পারি, এভাবে:

```js run
alert('12-34-56'.split('-')) // array of ['12', '34', '56']
```

অনূরূপভাবে আমরা রেগুলার এক্সপ্রেশনের সাহায্যেও করতে পারি:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array of ['12', '34', '56']
```

## str.search(regexp)

`str.search(regexp)` মেথডটি মিল খুঁজে পেলে প্রথম মিলের অবস্থান আর কোন মিল খুঁজে না পেলে `-1` রিটার্ন করে:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (প্রথম মিলের অবস্থান)
```

**গুরুত্বপূর্ন সীমাবদ্ধতা: `search` শুধুমাত্র প্রথম মিলের অবস্থান রিটার্ন করে.**

যদি আমাদের আরো বেশি মিল যাচাই করা লাগে, তাহলে আমাদের `str.matchAll(regexp)` এর সাহায্য নিতে হবে।

## str.replace(str|regexp, str|func)

অনুসন্ধান করে প্রতিস্থাপনের জন্য এটিই সর্বাধিক ব্যবহৃত মেথড।

আমরা রেগুলার এক্সপ্রেশন প্যাটার্ন ছাড়া সাবস্ট্রিংয়ের সাহায্যেও রিপ্লেস করতে পারি:

```js run
// ড্যাশকে কোলনের সাহায্যে রিপ্লেস
alert('12-34-56'.replace("-", ":")) // 12:34-56, তবে শুধুমাত্র প্রথমটি রিপ্লেস হয়
```

তবে এটির একটি সীমাবদ্ধতা আছে।

**যখন প্রথম আর্গুমেন্ট দ্বারা আমরা স্ট্রিং কে `replace` করি, এটি শুধুমাত্র প্রথম মিলটিকে রিপ্লেস করে।**

উপরের উদাহরণে আমরা এটি দেখেছি: শুধুমাত্র প্রথম `"-"` হাইফেনটি `":"` কোলন দ্বারা রিপ্লেস হয়।

সকল হাইফেন খুঁজে পেতে, আমরা স্ট্রিংয়ের `"-"` পরিবর্তে প্যাটার্ন ব্যবহার করতে পারি `pattern:/-/g`, এবং অবশ্যই `pattern:g` ফ্ল্যাগটি লাগবে:

```js run
// সকল ড্যাশকে কোলনের সাহায্যে রিপ্লেস
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

<<<<<<< HEAD
দ্বিতীয় আর্গুমেন্টটি হল একটি স্ট্রিং যা দ্বারা আমরা রিপ্লেস করব। আমরা এখানে স্পেশাল ক্যারাক্টারও ব্যবহার করতে পারব:
=======
The second argument is a replacement string. We can use special characters in it:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

| সিম্বলস | রিপ্লসমেন্ট স্ট্রিংয়ে সংগঠিত অ্যাকশন |
|--------|--------|
|`$&`|পুরো মিলটিকে রিপ্লেস করে|
|<code>$&#096;</code>|মিলের আগ পর্যন্ত স্ট্রিংকে রিপ্লেস করে|
|`$'`|মিলের পরের স্ট্রিংকে রিপ্লেস করে|
|`$n`|যদি `n` ১-২ অঙ্কের সংখ্যা হয়, আমরা প্যারেন্টেসিস দ্বারা করা গ্রুপ সমূহ $n দ্বারা রিপ্লেস করতে পারি। বিস্তারিত এই অধ্যায়ে [](info:regexp-groups)
|`$<name>`|আমরা প্যারেন্টেসিস দ্বারা করা গ্রুপ সমূহের নামকরণ করলে `name` দ্বারা রিপ্লেস করতে পারি। বিস্তারিত এই অধ্যায়ে [](info:regexp-groups)
|`$$`| `$` দ্বারা রিপ্লেস হবে |

উদাহরণ:

```js run
let str = "John Smith";

// আমরা নামকে অদল বদল করলাম
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**কিছু কিছু সময় আমাদের রিপ্লেসম্যান্ট আরো "smart" ভাবে করা লাগে, তখন দ্বিতীয় আর্গুমেন্ট হিসেবে একটি ফাংশন পাঠাতে পারি**

প্রতিটি ম্যাচের জন্য ফাংশনটি কল হবে, এবং ফাংশনের রিটার্ন ভ্যালু দ্বারা ম্যাচটি রিপ্লেসড হবে।

ফাংশনটি এর আর্গুমেন্ট সমূহ হবে `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- প্রাপ্ত মিলটি,
2. `p1, p2, ..., pn` -- ক্যাপচারিং গ্রুপসমূহ (if there are any),
3. `offset` -- মিলের পজিশনটি,
4. `input` -- সোর্স স্ট্রিং,
5. `groups` -- groups অবজেক্ট।

যদি রেগুলার এক্সপ্রেশনে গ্রুপ না থাকে, তাহলে ফাংশনের আর্গুমেন্ট হবে ৩টি: `func(str, offset, input)`।

উদাহরণস্বরূপ, সকল মিলকে আমরা ক্যাপিটাল অক্ষরে রূপান্তর করব:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

ম্যাচ কে তাদের পজিশন দ্বারা রিপ্লেস:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

নিচের উদাহরণে আমরা ২টি গ্রুপ করছি, সুতরাং রিপ্লেসম্যান্ট ফাংশনটিতে ৫টি আর্গুম্যান্ট থাকবে: প্রথমটি হবে সম্পূর্ন মিলটি, তারপর ২টি গ্রুপ, এবং শেষে পজিশন এবং সোর্স স্ট্রিং (যদিও উদাহরণে আমরা এটি ব্যবহার করি নি):

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

যদি আমাদের একাধিক গ্রুপ থাকে, তাহলে আমরা rest parameters দ্বারা তাদের অ্যাক্সেস করতে পারি:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

অথবা, যদি আমরা গ্রুপের নামকরণ করি, তাহলে `groups` অবজেক্টটি সবার শেষে থাকবে, সুতরাং একে আমরা এভাবে লিখতে পারি:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

রিপ্লেসম্যান্ট আমরা যদি ফাংশন এর সাহায্যে করি তাহলে আমাদের কাছে পূর্ণ স্বাধীনতা থাকবে, কেননা এতে আমরা মিলের সকল ইনফরমেশন পাব, এছাড়াও অন্যান্য ভ্যারিয়েবলগুলোও অ্যাক্সেস করতে পারব।

## str.replaceAll(str|regexp, str|func)

This method is essentially the same as `str.replace`, with two major differences:

1. If the first argument is a string, it replaces *all occurrences* of the string, while `replace` replaces only the *first occurrence*.
2. If the first argument is a regular expression without the `g` flag, there'll be an error. With `g` flag, it works the same as `replace`.

The main use case for `replaceAll` is replacing all occurrences of a string.

Like this:

```js run
// replace all dashes by a colon
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## regexp.exec(str)

<<<<<<< HEAD
`regexp.exec(str)` মেথডটি `regexp` দ্বারা `str` এর মধ্যে মিল খুঁজা হয়।  তবে পূর্বেরটির সাথে এর পার্থক্য হল এটি স্ট্রিংয়ের সাথে কাজ করে শুধুমাত্র রেগুলার এক্সপ্রেশন দ্বারা কাজ করে।
=======
The `regexp.exec(str)` method returns a match for `regexp` in the string `str`.  Unlike previous methods, it's called on a regexp, not on a string.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

এটি `pattern:g` ফ্ল্যাগের উপর ভিত্তি করে ভিন্ন ভিন্ন আচরণ করে।

যদি `pattern:g` ফ্ল্যাগ না থাকে, তাহলে `regexp.exec(str)` রিটার্ন করবে প্রথম মিলটি, এটি `str.match(regexp)` এর অনুরূপ।

কিন্ত যদি `pattern:g` থাকে, তাহলে:
- `regexp.exec(str)` কল হলে এটি প্রথম মিলটি রিটার্ন করে এবং `regexp.lastIndex` এ এর পরবর্তী অবস্থানটি সংরক্ষণ করে।
- পরবর্তী কলে `regexp.lastIndex` থেকে অনুসন্ধানটি শুরু হয় এবং এর পরের মিলটি রিটার্ন করে এবং আগের মত `regexp.lastIndex` এ পরবর্তী অবস্থানটি সংরক্ষণ করে।
- ...এভাবেই চলতে থাকে।
- আর যদি কোন মিল না হয়, `regexp.exec` রিটার্ন করে `null` এবং `regexp.lastIndex` এর মান `0` তে রিসেট হয়।

সুতরাং প্রতিবার মেথডটি কল হলে এটি মিলগুলো একটির পর একটি রিটার্ন করে, এবং `regexp.lastIndex` এ অবস্থানটি সংরক্ষণ করে সেখান থেকে অনুসন্ধান চালিয়ে যায়।

`str.matchAll` মেথডটি জাভাস্ক্রিপ্টে সংযুক্ত হওয়ার পূর্বে লুপে `regexp.exec` চালিয়ে আমরা গ্রুপসহ সকল মিলগুলো খুঁজে বের করতাম:

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // ১১ তম অবস্থানে জাভাস্ক্রিপ্ট, তারপর
  // ৩৩ তম অবস্থানে জাভাস্ক্রিপ্ট
}
```

এটিও কাজ করবে, তবে মর্ডান ব্রাউজারে `str.matchAll` আরো বেশি সুবিধা জনক।

**তবে আমরা`regexp.exec` এ ম্যানুয়ালি `lastIndex` সেট করতে পারি।**

উদাহরণস্বরূপ:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // "g" ফ্ল্যাগ ছাড়া, lastIndex প্রপার্টি ইগনোর হবে
regexp.lastIndex = 5; // ৫ম তম অবস্থান হতে অনুসন্ধানটি শুরু হবে (কমা থেকে)

alert( regexp.exec(str) ); // world
```

যদি `pattern:y` ফ্ল্যাগটি থাকে, তাহলে এটি শুধুমাত্র `regexp.lastIndex` এ অনুসন্ধানটি চালাবে, এবং এর বেশি চালাবে না।

চলুন উপরের উদাহরণটিতে `pattern:g` এর বদলে `pattern:y` ফ্ল্যাগ ব্যবহার করি। এখানে কোন মিল পাবে না, কেননা `5` তম অবস্থানে কোন ওয়ার্ড ক্যারাক্টার নাই:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // ৫ম তম অবস্থানে অনুসন্ধান চালাবে

alert( regexp.exec(str) ); // null
```

এটি আমাদের দরকার পড়ে যখন আমরা একটি নির্দিষ্ট অবস্থানে কোন কিছু "পড়তে" চাই।

## regexp.test(str)

`regexp.test(str)` মেথডটি কোন একটি স্ট্রিংয়ে মিল পাওয়া না পাওয়ার উপর ভিত্তি করে `true/false` রিটার্ন করে।

উদাহরণস্বরূপ:

```js run
let str = "I love JavaScript";

// এখানে টেস্ট দুটি একই কাজ করে
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

মিল খুঁজে না পাওয়ার একটি উদাহরণ:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

যদি `pattern:g` ফ্ল্যাগটি থাকে, তাহলে `regexp.test` মেথডটি `regexp.lastIndex` প্রপার্টি হতে অনুসন্ধান শুরু করে, `regexp.exec` এর মত।

সুতরাং আমরা নির্দিষ্ট একটি অবস্থান হতে অনুসন্ধানটি চালাতে পারি:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// ১০ম তম অবস্থান হতে অনুসন্ধানটি শুরু হবে:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
```

````warn header="regexp.test(str) এ একই সোর্স দ্বারা দ্বিতীয়বার যাচাইয়ে ভুল রেজাল্ট আসতে পারে"
যদি আমরা একই সোর্স দ্বারা দুইবার রেগুলার এক্সপ্রেশন এ যাচাই করি এটি অনাকাংখিত রেজাল্ট দেখাতে পারে, কেননা `regexp.test` এ দ্বিতীয়বার যাচাইয়ে `regexp.lastIndex` এর মান শূন্য নয় এমন অবস্থান থেকে অনুসন্ধান শুরু করে।

উদাহরণস্বরূপ, এখানে আমরা একই সোর্স দ্বারা `regexp.test` এ দুই বার কল করি, এবং দ্বিতীয়বার যাচাইয়ে এটি ভুল false দেখায়:

```js run
let regexp = /javascript/g;  // (১ম বার regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (এখন regexp.lastIndex=10)
alert( regexp.test("javascript") ); // false
```

এটিই সঠিক কেননা দ্বিতীয়বার কলে `regexp.lastIndex` এর অবস্থান আর শূন্যতম অবস্থানে নেই।

এভাবে কাজ করার সময় আমাদের প্রতিবার যাচাইয়ের আগে `regexp.lastIndex` কে রিসেট করে নিব `regexp.lastIndex = 0` । অথবা আমরা `str.match/search/...` এর মাধ্যমেও যাচাই করতে পারি।
````

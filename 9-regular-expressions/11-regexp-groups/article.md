# গ্রুপ ক্যাপচারিং

প্যাটার্নের কোন একটা অংশকে প্যারেন্টেসিস `pattern:(...)` দ্বারা লিখাকে "গ্রুপ ক্যাপচারিং" বলে।

এর ফলে ফলাফলে দুটি পরিবর্তন আছে:

১. এটি দ্বারা লব্ধ ফলাফলের অ্যারেতে কোন একটা অংশকে আলাদা পজিশনে রাখা যায়।
২. যদি প্যারেন্টেসিসের পরে আমরা কোয়ান্টিফায়ার রাখি, এটি সম্পূর্ন গ্রুপের জন্য কাজ করবে।

## উদাহরণ

চলুন উদাহরণ দিয়ে দেখি গ্রুপ ক্যাপচারিং কিভাবে কাজ করে।

### উদাহরণ: gogogo

প্যারেন্টেসিস ছাড়া, এই প্যাটার্নটি `pattern:go+` দ্বারা বুঝায় `subject:g` এবং `subject:o` এই দুটি ক্যারাক্টার এক বা একাধিকবার পুনরাবৃত্তি হবে। উদাহরণস্বরুপ, `match:goooo` অথবা `match:gooooooooo`।

প্যারেন্টেসিস দ্বারা গ্রুপ ক্যারাক্টারগুলো একসাথে বুঝায়, সুতরাং `pattern:(go)+` দ্বারা প্রাপ্তমিলগুলো হতে পারে `match:go`, `match:gogo`, `match:gogogo` অনুরূপ আরো অনেক।

```js run
alert( 'Gogogo now!'.match(/(go)+/i) ); // "Gogogo"
```

### উদাহরণ: ডোমেন

চলুন আরো কঠিন কিছু করি -- রেগুলার এক্সপ্রেশন দ্বারা ওয়েবসাইটের ডোমেন খুঁজে বের করি।

যেমন:

```
mail.com
users.mail.com
smith.users.mail.com
```

এইক্ষেত্রে আমরা দেখছি, ডোমেনে শেষ শব্দটি ব্যতীত শব্দের শেষে একটি ডট থাকবে।

রেগুলার এক্সপ্রেশন আমরা এটি এভাবে লিখতে পারি `pattern:(\w+\.)+\w+`:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

এটি কাজ করছে, কিন্তু উপরের প্যাটার্নটি হাইফেনসহ ডোমেনের জন্য সঠিকভাবে কাজ করবে না, যেমন. `my-site.com`, কেননা `pattern:\w` এই ক্যারাক্টার ক্লাস দ্বারা হাইফেনকে নির্দেশিত করা যায় না।

`pattern:\w` এর পরিবর্তে `pattern:[\w-]` লিখার মাধ্যমে আমরা এটিকে নির্ভুল করতে পারি সুতরাং প্যাটার্নটি হবে: `pattern:([\w-]+\.)+\w+`।

### উদাহরণ: ইমেইল

পূর্ববর্তী উদাহরণটিকে কিছুটা বর্ধিত করে আমরা ইমেইল এর জন্য একটি রেগুলার এক্সপ্রেশন লিখতে পারি।

ইমেইল এর ফরম্যাট: `name@domain`। নামের মধ্যে ডট হাইফেন ইত্যাদি থাকতে পারে। সুতরাং রেগুলার এক্সপ্রেশনটি হবে `pattern:[-.\w]+`।

প্যাটার্ন:

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

এটি পুরোপুরি নির্ভুল নই, কিন্তু বেশিরভাগক্ষেত্রে অ্যাক্সিডেন্টালি ভুল টাইপিং এড়ানোর জন্য কাজের। আমরা একটি ইমেইল নির্ভুল কিনা তা যাচাই করতে পারি শুধুমাত্র ইমেইল প্রেরণের মাধ্যমে।

## ফলাফলে প্যারেন্টেসিসের কন্টেন্টগুলো কিভাবে থাকে

প্যারেন্টেসিসগুলোকে বাম থেকে ডানে হিসেব করা হয়। সার্চ ইঞ্জিন মিলকৃত সকল কন্টেন্টকে মনে রাখে এবং ফলাফলে এদের যুক্ত করে।

`str.match(regexp)` মেথড, যদি `regexp` কোন `g` ফ্ল্যাগ না থাকে, প্রথম মিলটি খুঁজে এবং এটি অ্যারে হিসেবে দেখায়:

১. `0` তম ইন্ডেক্সে: সম্পূর্ণ মিলটি।
২. `1` তম ইন্ডেক্সে: প্রথম প্যারেন্টেসিসের মিলগুলো।
৩. `2` তম ইন্ডেক্সে: দ্বিতীয় প্যারেন্টেসিসের মিলগুলো।
৪. ...এভাবেই চলতে থাকে...

উদাহরণস্বরূপ, আমরা এইচটিএমএল ট্যাগ `pattern:<.*?>` খুঁজে পেতে চাই, এবং এদের নিয়ে কাজ করতে চাই। এজন্য আমাদের ট্যাগগুলো এবং ট্যাগের নাম গুলো আলাদা আলাদা ভ্যারিয়েবলে রাখা সুবিধাজনক।

চলুন ট্যাগনামগুলোকে আমরা প্যারেন্টেসিসের দ্বারা আবদ্ধ করি, এভাবে: `pattern:<(.*?)>`।

এখন আমরা পুরো ট্যাগটি `match:<h1>` এবং ট্যাগ নামটি `match:h1` লব্ধ ফলাফলে অ্যারে হিসেবে পাব:

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

### নেস্টেড গ্রুপ

প্যারেন্টেসিসগুলো নেস্টেডও হতে পারে। এক্ষেত্রেও ফলাফলে এরা বাম থেকে ডানে আসবে।

উদাহরণস্বরূপ, যখন আমরা এই ধরণের ট্যাগে `subject:<span class="my">` অনুসন্ধান করব আমরা ফলাফলটিকে নিম্নোক্তভাবে রাখতে পারব:

১. পুরো কন্টেন্টটি: `match:span class="my"`।
২. ট্যাগ নামটি: `match:span`।
৩. ট্যাগ অ্যাট্রিবিউট: `match:class="my"`।

সুতরাং নেস্টেড প্যাটার্নটি হবে এমন: `pattern:<(([a-z]+)\s*([^>]*))>`।

দেখুন এরা কিভাবে ক্রম করে (বাম থেকে ডানে, প্যারেন্টেসিসের উপর ভিত্তি করে):

![](regexp-nested-groups-pattern.svg)

উদাহরণ:

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

`result` এর শূন্যতম ইন্ডেক্সে সম্পূর্ণ কন্টেন্টটি।

এরপর গ্রুপিং, ওপেনিং প্যারেন্টেসিসের এর উপর নির্ভর করে বাম থেকে ডানে। প্রথম গ্রুপটি হবে `result[1]`। এখানে পুরো ট্যাগ কন্টেন্টটি আসবে।

এরপর `result[2]` হল দ্বিতীয় ওপেনিং প্যারেন্টেসিসের  `pattern:([a-z]+)` কন্টেন্ট - ট্যাগ নাম, এরপর `result[3]` ট্যাগ অ্যাট্রিবিউট: `pattern:([^>]*)`।

স্ট্রিংয়ের প্রতিটি গ্রুপ:

![](regexp-nested-groups-matches.svg)

### Optional groups

Even if a group is optional and doesn't exist in the match (e.g. has the quantifier `pattern:(...)?`), the corresponding `result` array item is present and equals `undefined`.

For instance, let's consider the regexp `pattern:a(z)?(c)?`. It looks for `"a"` optionally followed by `"z"` optionally followed by `"c"`.

If we run it on the string with a single letter `subject:a`, then the result is:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (whole match)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

The array has the length of `3`, but all groups are empty.

And here's a more complex match for the string `subject:ac`:

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (whole match)
alert( match[1] ); // undefined, because there's nothing for (z)?
alert( match[2] ); // c
```

The array length is permanent: `3`. But there's nothing for the group `pattern:(z)?`, so the result is `["ac", undefined, "c"]`.

## Searching for all matches with groups: matchAll

```warn header="`matchAll` is a new method, polyfill may be needed"
The method `matchAll` is not supported in old browsers.

A polyfill may be required, such as <https://github.com/ljharb/String.prototype.matchAll>.
```

When we search for all matches (flag `pattern:g`), the `match` method does not return contents for groups.

For example, let's find all tags in a string:

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

The result is an array of matches, but without details about each of them. But in practice we usually need contents of capturing groups in the result.

To get them, we should search using the method `str.matchAll(regexp)`.

It was added to JavaScript language long after `match`, as its "new and improved version".

Just like `match`, it looks for matches, but there are 3 differences:

1. It returns not an array, but an iterable object.
2. When the flag `pattern:g` is present, it returns every match as an array with groups.
3. If there are no matches, it returns not `null`, but an empty iterable object.

For instance:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - is not an array, but an iterable object
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // let's turn it into array

alert(results[0]); // <h1>,h1 (1st tag)
alert(results[1]); // <h2>,h2 (2nd tag)
```

As we can see, the first difference is very important, as demonstrated in the line `(*)`. We can't get the match as `results[0]`, because that object isn't pseudoarray. We can turn it into a real `Array` using `Array.from`. There are more details about pseudoarrays and iterables in the article <info:iterable>.

There's no need in `Array.from` if we're looping over results:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // первый вывод: <h1>,h1
  // второй: <h2>,h2
}
```

...Or using destructuring:

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

Every match, returned by `matchAll`, has the same format as returned by `match` without flag `pattern:g`: it's an array with additional properties `index` (match index in the string) and `input` (source string):

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="Why is a result of `matchAll` an iterable object, not an array?"
Why is the method designed like that? The reason is simple - for the optimization.

The call to `matchAll` does not perform the search. Instead, it returns an iterable object, without the results initially. The search is performed each time we iterate over it, e.g. in the loop.

So, there will be found as many results as needed, not more.

E.g. there are potentially 100 matches in the text, but in a `for..of` loop we found 5 of them, then decided it's enough and make a `break`. Then the engine won't spend time finding other 95 mathces.
```

## Named groups

Remembering groups by their numbers is hard. For simple patterns it's doable, but for more complex ones counting parentheses is inconvenient. We have a much better option: give names to parentheses.

That's done by putting `pattern:?<name>` immediately after the opening paren.

For example, let's look for a date in the format "year-month-day":

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

As you can see, the groups reside in the `.groups` property of the match.

To look for all dates, we can add flag `pattern:g`.

We'll also need `matchAll` to obtain full matches, together with groups:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // first alert: 30.10.2019
  // second: 01.01.2020
}
```

## Capturing groups in replacement

Method `str.replace(regexp, replacement)` that replaces all matches with `regexp` in `str` allows to use parentheses contents in the `replacement` string. That's done using `pattern:$n`, where `pattern:n` is the group number.

For example,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

For named parentheses the reference will be `pattern:$<name>`.

For example, let's reformat dates from "year-month-day" to "day.month.year":

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## Non-capturing groups with ?:

Sometimes we need parentheses to correctly apply a quantifier, but we don't want their contents in results.

A group may be excluded by adding `pattern:?:` in the beginning.

For instance, if we want to find `pattern:(go)+`, but don't want the parentheses contents (`go`) as a separate array item, we can write: `pattern:(?:go)+`.

In the example below we only get the name `match:John` as a separate member of the match:

```js run
let str = "Gogogo John!";

*!*
// ?: exludes 'go' from capturing
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (full match)
alert( result[1] ); // John
alert( result.length ); // 2 (no more items in the array)
```

## Summary

Parentheses group together a part of the regular expression, so that the quantifier applies to it as a whole.

Parentheses groups are numbered left-to-right, and can optionally be named with  `(?<name>...)`.

The content, matched by a group, can be obtained in the results:

- The method `str.match` returns capturing groups only without flag `pattern:g`.
- The method `str.matchAll` always returns capturing groups.

If the parentheses have no name, then their contents is available in the match array by its number. Named parentheses are also available in the property `groups`.

We can also use parentheses contents in the replacement string in `str.replace`: by the number `$n` or the name `$<name>`.

A group may be excluded from numbering by adding `pattern:?:` in its start. That's used when we need to apply a quantifier to the whole group, but don't want it as a separate item in the results array. We also can't reference such parentheses in the replacement string.

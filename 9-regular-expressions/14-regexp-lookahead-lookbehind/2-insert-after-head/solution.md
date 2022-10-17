<<<<<<< HEAD
`<body>` ট্যাগ ভিতরে নতুন ট্যাগ স্থাপনের জন্য, আমাদের প্রথমে এটি খুঁজে বের করতে হবে। এজন্য আমরা এই রেগুলার এক্সপ্রেশনটি ব্যবহার করব `pattern:<body.*>`।

এই টাস্কের জন্য আমাদের `<body>` ট্যাগকে প্রতিস্থাপিত করা লাগবে না। আমাদের শুধুমাত্র ট্যাক্সটিকে সংযোগ করতে হবে।
=======
In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*?>` for that.

In this task, we don't need to modify the `<body>` tag. We only need to add the text after it.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

এখানে দেখুন আমরা কিভাবে এটি করতে পারি:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

<<<<<<< HEAD
=======
In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

রিপ্লেসমেন্ট স্ট্রিংয়ে `$&` দ্বারা বুঝায় মিলের কন্টেন্টটি অর্থাৎ সোর্সের ট্যাক্সটি `pattern:<body.*>`। মিলকৃত কন্টেন্টটি অতঃপর `<h1>Hello</h1>`।

বিকল্প আরেকটি হতে পারে লুকবিহাইন্ড:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

এখানে দেখতে পাচ্ছি, এখানে রেগুলার এক্সপ্রেশনে শুধুমাত্র লুকবিহাইন্ডের অংশটি আছে।

<<<<<<< HEAD
এটি এভাবে কাজ করছে:
- টেক্সটের প্রতিটি পজিশনে।
- যাচাই করছে পূর্বে `pattern:<body.*>` আছে কিনা।
- যদি থাকে তাহলে আমাদের মিলটি পাব।

`pattern:<body.*>` ট্যাগটি রিটার্ন করবে না। সুতরাং রেজাল্ট হবে এম্পটি স্ট্রিং, কিন্ত ম্যাচটির অবস্থান হবে `pattern:<body.*>` এর পরের অবস্থানটি।

সুতরা আমরা "empty line" টিকে রিপ্লেস করব  `<h1>Hello</h1>` দ্বারা যার পূর্বে `pattern:<body.*>` আছে। সুতরাং নতুন ট্যাগটি হবে `<body>` এর পর।

লক্ষ্যনীয় রেগুলার এক্সপ্রেশন ফ্ল্যাগ, যেমন `pattern:s` এবং `pattern:i` দরকারী: `pattern:/<body.*>/si`। `pattern:s` ফ্ল্যাগটি `pattern:.` দ্বারা নিউলাইন ক্যারাক্টারকেও বুঝায়, এবং `pattern:i` ফ্ল্যাগ কেস-ইন্সেসিটিভ বুঝায় `pattern:<body>` এটি `match:<BODY>` এর সাথেও ম্যাচ করবে।
=======
It works like this:
- At every position in the text.
- Check if it's preceded by `pattern:<body.*?>`.
- If it's so, then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceded by `pattern:<body.*?>`.

So it replaces the "empty line", preceded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also be useful: `pattern:/<body.*?>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c

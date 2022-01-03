
<<<<<<< HEAD
শুরুর ট্যাগটি হবে `pattern:\[(b|url|quote)\]`।
=======
Opening tag is `pattern:\[(b|url|quote)]`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

তারপর ট্যাগটি শেষ হওয়ার পূর্ব পর্যন্ত সকল কন্টেন্ট পেতে এটি `pattern:.*?` লিখি এবং নতুন লাইন সহ সকল ক্যারাক্টারের জন্য এই ফ্ল্যাগটি `pattern:s` ব্যবহার করি, অতঃপর শেষ ট্যাগটি লিখার জন্য ব্যাকরেফারেন্স ব্যবহার করি।

<<<<<<< HEAD
সম্পূর্ন প্যাটার্নটি হবে: `pattern:\[(b|url|quote)\].*?\[/\1\]`।
=======
The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

যেমন:

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

<<<<<<< HEAD
আমরা এই বন্ধনী `pattern:[` এবং `pattern:]` এর পূর্বে ব্যাকস্ল্যাশ দ্বারা এস্কেপিং করেছি, অনুরূপভাবে শেষ ট্যাগটিকেও `pattern:[\/\1]` এস্কেপিং করা লাগবে, কেননা স্ল্যাশ দ্বারা প্যাটার্নের শেষ বুঝায়।
=======
Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

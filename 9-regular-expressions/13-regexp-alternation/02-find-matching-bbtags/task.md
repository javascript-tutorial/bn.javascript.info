# bbtag অনুসন্ধান

"bb-tag" দেখতে এমন `[tag]...[/tag]`, যেখানে `tag` গুলো হতে পারে: `b`, `url` বা `quote`।

উদাহরণস্বরূপ:
```
[b]text[/b]
[url]http://google.com[/url]
```

BB-tags একটার মধ্যে আরেকটা হতে পারে। কিন্তু একই ট্যাগের ভেতর নেস্টেড হবে না, যেমন:

```
সঠিক:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

ভুল:
[b][b]text[/b][/b]
```

সাধারণত ট্যাগের মধ্যে লাইন ব্রেক থাকতে পারে:

```
[quote]
  [b]text[/b]
[/quote]
```

একটি রেগুলার এক্সপ্রেশন লিখুন যা দ্বারা সকল BB-tags এবং এদের কন্টেন্ট খুঁজে পাওয়া যায়।

উদাহরণস্বরূপ:

```js
let regexp = /আপনার রেগুলার এক্সপ্রেশন/ফ্ল্যাগস;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

যদি ট্যাগটি নেস্টেড হয়, তবে আমরা প্যারেন্ট ট্যাগটি খুঁজব(তাহলে আমরা পরবর্তীতে এর মধ্যের কন্টেন্টগুলোতে অনুসন্ধান চালাতে পারব):

```js
let regexp = /আপনার রেগুলার এক্সপ্রেশন/ফ্ল্যাগস;;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```

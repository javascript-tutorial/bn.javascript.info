
আমরা ল্যাংগুয়েজগুলোকে অল্টারনেশন `|` দ্বারা আলাদা আলাদা লিখতে পারি।

কিন্তু এটি কাজ করবে না:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

অল্টারনেশনের সময় রেগুলার এক্সপ্রেশন ইঞ্জিন এক এক করে খুঁজে। অর্থাৎ: প্রথমত এটি `match:Java` চেক করবে, যদি না মিলে এরপর `match:JavaScript` এভাবে চলতে থাকে।

যার ফলে, `match:JavaScript` কখনোই খুঁজে পাবে না, কেননা এটি শুরুতেই `match:Java` এর সাথে মিল হয়।

অনুরূপভাবে `match:C` এবং `match:C++`।

এ সমস্যার দুটি সমাধান আছে:

১. আমাদের প্যাটার্নটিকে এভাবে সাজিয়ে: `pattern:JavaScript|Java|C\+\+|C|PHP`।
২. অথবা একই নামগুলোর জন্য অপশনাল গ্রুপ মার্জ করে: `pattern:Java(Script)?|C(\+\+)?|PHP`।

যেমন:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```

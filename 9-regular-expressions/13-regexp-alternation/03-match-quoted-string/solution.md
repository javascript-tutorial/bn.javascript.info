সমাধানটি হবে: `pattern:/"(\\.|[^"\\])*"/g`।

ধাপে ধাপে দেখি:

<<<<<<< HEAD
- প্রথমে আমরা একটি শুরুর উদ্ধৃতি চিহ্নটি খুঁজব `pattern:"`
- এরপর আমরা ব্যাকস্ল্যাশ খুঁজব `pattern:\\` (এজন্য আমাদের দুটি ব্যাকস্ল্যাশ দিতে হবে, কেননা এটি একটি স্পেশাল ক্যারাক্টার), এরপর যেকোন ক্যারাক্টারের জন্য(একটি ডট)।
- অন্যথায় আমরা উদ্ধৃতি চিহ্ন এবং ব্যাকস্ল্যাশ ব্যতীত সকল ক্যারাক্টার নিব: `pattern:[^"\\]`
- ...এবং সর্বশেষ শেষ উদ্ধৃতি চিহ্ন।
=======
- First we look for an opening quote `pattern:"`
- Then if we have a backslash `pattern:\\` (we have to double it in the pattern because it is a special character), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `pattern:[^"\\]`
- ...And so on till the closing quote.
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

সমাধানটি হবে:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
```

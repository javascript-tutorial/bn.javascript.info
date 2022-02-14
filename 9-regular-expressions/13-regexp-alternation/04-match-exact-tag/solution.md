
প্যাটার্নটি শুরু হবে: `pattern:<style`।

...কিন্তু আমরা এটিকে এভাবে `pattern:<style.*?>` লিখতে পারব না, কেননা `match:<styler>` এর সাথেও মিলবে।

`match:<style` এর পর আমাদের একটি স্পেস লাগবে এবং এর পর তাদের অপশনাল অ্যাট্রিবিউট লাগবে এবং শেষ হবে `match:>` দ্বারা।

সুতরাং প্যাটার্নটি হবে: `pattern:<style(>|\s.*?>)`।

সমাধানটি হবে:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```

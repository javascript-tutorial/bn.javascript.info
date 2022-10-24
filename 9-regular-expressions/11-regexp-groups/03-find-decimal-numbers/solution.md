<<<<<<< HEAD
আমরা পূর্বের চ্যাপ্টারে ডেসিমেল সংখ্যা কে অপশনাল রেখে খুঁজার উপায় দেখেছিলাম: `pattern:\d+(\.\d+)?`।
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 5dff42ba283bce883428c383c080fa9392b71df8

ঋণাত্নক সংখ্যা খুঁজার জন্য শুরুতে `pattern:-` কে অপশনাল হিসেবে যোগ করি:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```

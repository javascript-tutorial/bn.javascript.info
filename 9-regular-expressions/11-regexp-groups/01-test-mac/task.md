# MAC-address যাচাই

[MAC-address](https://en.wikipedia.org/wiki/MAC_address) হল নেটওয়ার্ক ইন্টারফেসের ৬ টি দুই অঙ্কবিশিষ্ট একটি হেক্সাডেসিমেল নাম্বার যা কোলন দ্বারা পৃথক থাকে।

যেমন: `subject:'01:32:54:67:89:AB'`।

MAC-address যাচাইয়ের জন্য একটি রেগুলার এক্সপ্রেশন লিখুন।

উদাহরণস্বরুপ:
```js
let regexp = /আপনার প্যাটার্ন লিখুন/;

alert( regexp.test('01:32:54:67:89:AB') ); // সত্য

alert( regexp.test('0132546789AB') ); // মিথ্যা (কোলন নেয়)

alert( regexp.test('01:32:54:67:89') ); // মিথ্যা (৫টি নাম্বার, অবশ্যই ৬টি হতে হবে)

<<<<<<< HEAD
alert( regexp.test('01:32:54:67:89:ZZ') ) // মিথ্যা (শেষে ZZ)
=======
alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ at the end)
>>>>>>> 2efe0dce18a57f2b6121ed6656d6fe10b0ee8f96
```

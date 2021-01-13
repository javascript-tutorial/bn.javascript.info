একটি দুই অঙ্কবিশিষ্ট হেক্সাডেসিমেল নাম্বারের প্যাটার্ন হল `pattern:[0-9a-f]{2}` (ধরে নিই, `pattern:i` ফ্ল্যাগ সেট আছে)।

সুতরাং আমাদের এই নাম্বারটি `NN` লাগবে, এবং এটির `:NN` ৫ বার পুনরাবৃত্তি হবে;

রেগুলার এক্সপ্রেশনটি হবে: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Now let's show that the match should capture all the text: start at the beginning and end at the end. That's done by wrapping the pattern in `pattern:^...$`.

Finally:

```js run
let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)
```

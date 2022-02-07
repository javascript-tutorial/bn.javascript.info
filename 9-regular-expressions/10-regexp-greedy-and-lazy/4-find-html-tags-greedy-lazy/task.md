# এইচটিএমএল ট্যাগের অনুসন্ধান

একটি প্যাটার্ন লিখুন যেন সকল এইচটিএমএল ট্যাগগুলো(অ্যাট্রিবিউটসহ) খুঁজে পায়.

উদাহরণস্বরূপ:

```js run
let regexp = /আপনার প্যাটার্ন/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

<<<<<<< HEAD
এখানে কিছুটা সহজের জন্য আমরা ধরে নিয়েছি অ্যাট্রিবিউটের মাঝে এই দুটি বন্ধনী `<` এবং `>` থাকবে না।
=======
Here we assume that tag attributes may not contain `<` and `>` (inside quotes too), that simplifies things a bit.
>>>>>>> 71da17e5960f1c76aad0d04d21f10bc65318d3f6

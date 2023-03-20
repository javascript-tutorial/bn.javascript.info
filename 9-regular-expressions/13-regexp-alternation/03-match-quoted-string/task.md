# স্ট্রিংয়ে উক্তি খুঁজা

একটি রেগুলার এক্সপ্রেশন লিখুন যা স্ট্রিংয়ে উক্তি খুঁজে `subject:"..."`।

<<<<<<< HEAD
স্ট্রিংটি অবশ্যই জাভাস্ক্রিপ্ট স্ট্রিংয়ের মত এস্কেপিং সাপোর্ট করবে, উক্তিটির মধ্যে উদ্ধৃতি চিহ্ন  `subject:\"` বা নিউলাইন ক্যারাক্টার থাকবে `subject:\n` এবং স্ল্যাশ `subject:\\` থাকবে।
=======
The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

```js
let str = "Just like \"here\".";
```

আমাদের মনে রাখা উচিত যে, উক্তির মাঝে  উদ্ধৃতি চিহ্ন থাকলে `subject:\"` তা দ্বারা বুঝায় উক্তিটি শেষ হয়নি।

সুতরাং অনুসন্ধানের সময় আমাদের উক্তির মাঝে এস্কেপিং উদ্ধৃতি চিহ্নগুলোও খুঁজতে হবে।

এটিই আমাদের এই টাস্কের জন্য কঠিন অংশ, অন্যথায় এটি একটি সহজ টাস্ক।

উদাহরণস্বরূপ এইগুলো দেখুন:
```js
<<<<<<< HEAD
.. *!*"test me"*/!* ..
.. *!*"Say \"Hello\"!"*/!* ... (উক্তির ভেতরে এস্কেপিং উদ্ধৃতি চিহ্ন)
.. *!*"\\"*/!* ..  (উক্তির ভেতরে দুটি স্ল্যাশ)
.. *!*"\\ \""*/!* ..  (উক্তির ভেতরে দুটি স্ল্যাশ এবং এস্কেপিং উদ্ধৃতি চিহ্ন)
```

জাভাস্ক্রিপ্টে  স্ট্রিংয়ের মাঝে ডাবল স্ল্যাশ এভাবে লিখতে হবে:
=======
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:
>>>>>>> 9e3fa1351f80cfd6353a778a55b2c86bca9e895f

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```

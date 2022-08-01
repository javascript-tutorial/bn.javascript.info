
# ম্যানুয়াল ও স্পেসিফিকেশন

<<<<<<< HEAD
এই বইটি একটি _টিউটরিয়াল।_ এর উদ্দেশ্য হল আপনাকে আস্তে আস্তে ভাষাটি শিখতে সাহায্য করা। কিন্তু আপনি ব্যাসিকগুলো একবার মোটামুটি শিখে গেলে অন্য আরো সোর্সের প্রয়োজন পড়বে।
=======
This book is a *tutorial*. It aims to help you gradually learn the language. But once you're familiar with the basics, you'll need other resources.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

## স্পেসিফিকেশন

[ECMA-262 স্পেসিফিকেশনে](https://www.ecma-international.org/publications/standards/Ecma-262.htm) জাভাস্ক্রিপ্টের সবচেয়ে গভীর, বিস্তারিত ও আনুষ্ঠানিক তথ্য আছে। এটাই ভাষাটিকে সংজ্ঞায়িত করে।

কিন্তু এত বেশি আনুষ্ঠানিক হওয়ার কারণে প্রথমদিকে এটি বুঝতে বেশ অসুবিধা হয়। তাই আপনার যদি ভাষার বিস্তারিত ব্যাপারগুলোতে সবচেয়ে বিশ্বস্ত সোর্সের প্রয়োজন হয়, তাহলে এই স্পেসিফিকেশনটি দেখতে হবে। কিন্তু এটি দৈনন্দিন ব্যবহারের জন্য নয়।

<<<<<<< HEAD
প্রতি বছর একটি করে নতুন স্পেসিফিকেশন ভার্সন রিলিজ হয়। মধ্যবর্তী রিলিজসমূহ, সর্বশেষ স্পেসিফিকেশনের খসড়া এখানে পাওয়া যাবে: <https://tc39.es/ecma262/>.
=======
A new specification version is released every year. Between these releases, the latest specification draft is at <https://tc39.es/ecma262/>.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

"প্রায় স্ট্যান্ডার্ড" (তথাকথিত "স্টেজ-৩") ফিচারগুলোসহ একেবারে নতুন ও প্রান্তীয় ফিচারগুলোর ব্যাপারে পড়তে এখানকার প্রস্তাবগুলো দেখুন: <https://github.com/tc39/proposals>

<<<<<<< HEAD
আর আপনি যদি ব্রাউজারের জন্য ডেভেলাপ করেন তাহলে এ বিষয়ে বিস্তারিত ভাবে এই বইয়ের [দ্বিতীয় অংশে](info:browser-environment) আলোচনা করা হয়েছে।
=======
Also, if you're developing for the browser, then there are other specifications covered in the [second part](info:browser-environment) of the tutorial.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

## ম্যানুয়াল

<<<<<<< HEAD
- **MDN (Mozilla) JavaScript Reference** হচ্ছে উদাহরণ ও অন্যান্য তথ্যসহ একটি ম্যানুয়াল। ভাষার নির্দিষ্ট কোন ফাংশন, মেথড ইত্যাদির ব্যাপারে বিস্তারিত তথ্যের জন্য এটি খুবই ভাল।

    পাওয়া যাবে এখানে: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

    যদিও বেশিরভাগ সময় ইন্টারনেটে সার্চ করলেই ভাল হয়। সার্চ করার সময় "MDN [term]" ব্যবহার করুন। যেমন `parseInt` ফাংশনের জন্য সার্চ করতে <https://google.com/search?q=MDN+parseInt>


* **MSDN** – জাভাস্ক্রিপ্টসহ অনেক তথ্যসমৃদ্ধ মাইক্রোসফ্টের ম্যানুয়াল (ওরা অনেকসময় বলে JScript)। যদি নির্দিষ্টভাবে ইন্টারনেট এক্সপ্লোরারের ব্যাপারে কিছু লাগে তাহলে ঐখানে যাওয়াই ভাল: <http://msdn.microsoft.com/>.

    আর "RegExp MSDN" অথবা "RegExp MSDN jscript" আকারেও ইন্টারনেট সার্চ করতে পারেন।
=======
- **MDN (Mozilla) JavaScript Reference** is the main manual with examples and other information. It's great to get in-depth information about individual language functions, methods etc.

    You can find it at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>.

Although, it's often best to use an internet search instead. Just use "MDN [term]" in the query, e.g. <https://google.com/search?q=MDN+parseInt> to search for the `parseInt` function.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

## কম্প্যাটিবিলিটি টেবিল

জাভাস্ক্রিপ্ট একটি উন্নয়ণশীল ভাষা, নতুন নতুন ফিচার নিয়মিত যোগ করা হয়।

ব্রাউজার ভিত্তিক বা অন্যান্য ইন্জিনগুলোতে এগুলোর সাপোর্ট দেখুন:

<<<<<<< HEAD
- <http://caniuse.com> - ফিচারভিত্তিক সাপোর্টের টেবিল। যেমন- কোন ইন্জিনগুলো অধুনিক ক্রিপ্টোগ্রাফি ফাংশনগুলো সাপোর্ট করে দেখতে: <http://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - ভাষার ফিচারসমূহ ও কোন ইন্জিনগুলো সেগুলো সাপোর্ট করে বা করে না তার উপর একটি টেবিল।

এই সবগুলো রিসোর্সই সত্যিকারের ডেভেলাপমেন্টে কাজে লাগে। যেহেতু এগুলো ভাষার বিস্তারিত, সেগুলোর সাপোর্ট ইত্যাদি ব্যাপারে মূল্যবান তথ্য ধারণ করে।
=======
- <https://caniuse.com> - per-feature tables of support, e.g. to see which engines support modern cryptography functions: <https://caniuse.com/#feat=cryptography>.
- <https://kangax.github.io/compat-table> - a table with language features and engines that support those or don't support.

All these resources are useful in real-life development, as they contain valuable information about language details, their support, etc.
>>>>>>> 7000ede297bfd688f9a3767e8ca43abd9242f322

দয়া করে এগুলো মনে রাখবেন (অথবা এই পেজটি)। যখন কোন একটি নির্দিষ্ট ফিচারের ব্যাপারে বিস্তারিত তথ্য লাগবে তখন এগুলো কাজে আসবে।

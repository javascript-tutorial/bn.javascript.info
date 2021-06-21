# আধুনিক মোড, "use strict"

অনেক লম্বা সময় ধরে কোন কম্প্যাটিবিলিটি ইস্যু ছাড়াই জাভাস্ক্রিপ্টের পর্যায়ক্রমিক উন্নতি হয়েছে। ভাষাটিতে নতুন নতুন ফিচার যোগ করা হত, পুরনো ফাংশনালিটি বদলাত না।

এর একটি সুবিধা ছিল যে, কখনোই পুরনো কোড নস্ট হত না, মানে পুরনো কোডও নতুন জাভাস্ক্রিপ্ট ভার্সনে চলত। তবে অসুবিধা হল জাভাস্ক্রিপ্টের উদ্ভাবকদের করা কোন ভুল বা ত্রুটিপূর্ণ সিদ্ধান্ত চিরতরে ভাষাটিতে থেকে যেত।

২০০৯ সালে ECMAScript 5 (ES5) আসার আগ পর্যন্ত এভাবেই চলছিল। ES5 ভাষাটিতে নতুন কিছু ফিচার যোগ করার পাশাপাশি পুরনো কিছু ফিচারও পরিবর্তন করে। পুরনো কোড সচল রাখতে এই পরিবর্তনগুলোর বেশিরভাগই ডিফল্টভাবে বন্ধ রাখা হয়। একটি বিশেষ নির্দেশক `"use strict"` ব্যবহার করে এগুলো আলাদাভাবে সক্রিয় করতে হয়।

## "use strict"

নির্দেশকটি দেখতে স্ট্রিং এর মত: `"use strict"` অথবা `'use strict'`। যখন কোন স্ক্রিপ্টের সবার উপরে এটা থাকে, পুরো স্ক্রিপ্টটি 'আধুনিকভাবে' কাজ করে।

উদাহরণ:

```js
"use strict";

// এই কোডটি আধুনিকভাবে কাজ করবে
...
```

<<<<<<< HEAD
শিঘ্রই আমরা ফাংশন (কমান্ড গ্রুপ করার একটি উপায়) শিখব। একটু এগিয়ে গিয়ে নোট করে নেয়া যাক, `"use strict"` কোন ফাংশনের বডির শুরুতেও দেয়া যায়। এতে করে শুধু ঐ ফাংশনে স্ট্রিক্ট মোড সক্রিয় হয়। তবে সাধারণত পুরো স্ক্রিপ্টের জন্যই স্ট্রিক্ট মোড ব্যবহার করা হয়।

=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

````warn header="\"use strict\" সবার শুরুতে থাকতে হবে"
নিশ্চিত করুন যেন `"use strict"` আপনার স্ক্রিপ্টগুলোর একেবারে সবার উপরে থাকে। নাহলে স্ট্রিক্ট মোড নাও সক্রিয় হতে পারে।

এখানে স্ট্রিক্ট মোড সক্রিয় হয়নি:

```js no-strict
alert("some code");
// নিচের "use strict" উপেক্ষা করা হবে--এটি সবার উপরে থাকতে হবে

"use strict";

// স্ট্রিক্ট মোড সক্রিয় হয়নি
```

`"use strict"` এর উপরে শুধুমাত্র কমেন্ট থাকতে পারবে।
````

```warn header="`use strict` বাতিল করার কোন উপায় নেই"
`"no use strict"`-র মত কোন নির্দেশক নেই যা ইন্জিনটিকে পুরনো চরিত্রে ফিরিয়ে নেবে।

একবার স্ট্রিক্ট মোডে ঢুকে গেলে আর ফিরে যাওয়ার কোন সুযোগ থাকে না।
```

## ব্রাউজার কনসোল

<<<<<<< HEAD
ভবিষ্যতে আপনি যখন ব্রাউজার কনসোলে কোন ফিচার পরীক্ষা করতে যাবেন, মনে রাখবেন ডিফল্টভাবে সেটা স্ট্রিক্ট মোডে থাকে না।
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

কখনো কখনো যখন `use strict`-এ পার্থক্য হয়, আপনি ভুল ফলাফল পাবেন।

<<<<<<< HEAD
একাধিক লাইন দেয়ার জন্য `key:Shift+Enter` চেপে সবার উপরে `use strict` দিয়ে দেখতে পারেন, এভাবে:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js
'use strict'; <নতুন লাইনের জন্য Shift+Enter>
//  ...আপনার কোড
<চালানোর জন্য Enter>
```

বেশিরভাগ ব্রাউজার যেমন ক্রোম, ফায়ারফক্সে এটা কাজ করে।

<<<<<<< HEAD
যদি কাজ না করে তাহলে `use strict` নিশ্চিত করার সবচেয়ে নির্ভরযোগ্য উপায় হল কোডটাকে কনসোলে এভাবে ইনপুট দেয়া:
=======
If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...আপনার কোড...
})()
```

## সবসময় "use strict" করুন

আমাদের এখনো স্ট্রিক্ট মোড আর "ডিফল্ট" মোডের পার্থক্য আলোচনা করা বাকি রয়ে গেছে।

পরবর্তী অধ্যাগুলোতে যখন আমরা ভাষার ফিচারগুলো শিখব তখন স্ট্রিক্ট মোড আর ডিফল্ট মোডের পার্থক্যগুলো দেখতে পাব। সৌভাগ্যবশত খুব বেশি পার্থক্য নেই। আর যা আছে সেগুলো আসলে আমাদের জীবন সুন্দর করে।

আপাতত এ ব্যাপারে সাধাণভাবে জানা যথেষ্ট:

১. `"use strict"` নির্দেশকটি বিল্ট-ইন ফিচারগুলোর চরিত্র বদলে ইন্জিনকে "আধুনিক" মোডে নিয়ে যায়। পরবর্তীতে আমরা এর বিস্তারিত দেখব।
২. একটি স্ক্রিপ্ট কিংবা ফাংশনের সবার উপরে `"use strict"` দিয়ে স্ট্রিক্ট মোড সক্রিয় করা যায়। ভাষার কিছু ফিচার, যেমন "classes" এবং "modules" স্বয়ংক্রিয়ভাবে স্ট্রিক্ট মোড সক্রিয় করে। 
৩. সব মর্ডান ব্রাউজারই স্ট্রিক্ট মোড সমর্থন করে।
৪. আমরা পরামর্শ দিয়েছি সব সময় `"use strict"` দিয়ে স্ক্রিপ্ট শুরু করতে। এই টিউটোরিয়ালের সকল উদাহরণ ধরে নেয় যে স্ট্রিক্ট মোড চালু আছে, যদিনা অন্যথা (খুবই বিরল) উল্লেখ করে দেয়া থাকে।
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

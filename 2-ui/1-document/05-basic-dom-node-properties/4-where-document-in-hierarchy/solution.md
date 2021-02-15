
আমরা এভাবে এর ক্লাস নামটি দেখতে পারি:

```js run
alert(document); // [object HTMLDocument]
```

অথবা:

```js run
alert(document.constructor.name); // HTMLDocument
```

সুতরাং, `document` হল `HTMLDocument` ক্লাসের ইন্সট্যান্স।

চলুন হায়ার্য়াকি অনুযায়ী আরো বিস্তারিত দেখি

আমরা স্পেসিফিকেশন দেখে এই ব্যাপারে জানতে পারি, কিন্তু আমরা কোড করেও এর বিস্তারিত দেখতে পারি।

চলুন আমরা `__proto__` প্রটোটাইপ চেইন ট্রাভার্স করি।

আমরা জানি, ক্লাসের মেথডসমূহ `prototype` দ্বারা constructor কে নির্দেশিত করে। যেমন, `HTMLDocument.prototype` এ ডকুমেন্ট এর মেথড আছে।

এছাড়াও, `prototype` এর constructor এ এর উল্লেখ আছে:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

ক্লাস নামটিকে কে আমরা স্ট্রিং আকারে পেতে, `constructor.name` ব্যবহার করতে পারি। চলুন আমরা `document` এর প্রটোটাইপ চেইন ট্রাভার্স করি, যতক্ষণ পর্যন্ত `Node` ক্লাসটি না পায়:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

এটিই document এর হায়ার্য়াকি।

আমরা `console.dir(document)` এর সাহায্যেও দেখতে পারি, এবং `__proto__` তে ক্লিক করে প্রত্যেকটির নাম দেখতে পাব। কনসোল ইন্টার্নালি `constructor` সমূহ নেয়।
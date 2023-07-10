importance: 5

---

# অবজেক্ট হতে একটি ট্রি তৈরি করুন

`createTree` নামের একটি ফাংশন লিখুন যেটি একটি নেস্টেড `ul/li` লিস্ট ক্রিয়েট করবে একটি নেস্টেড অবজেক্ট হতে।

উদাহরণস্বরূপ:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

সিন্ট্যাক্সটি:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // creates the tree in the container
*/!*
```

ফলাফলটি দেখতে এমন হবে:

[iframe border=1 src="build-tree-dom"]

নিচের যে কোন একটি উপায়ে এট সমাধান করুন:

1. HTML ট্রি নোডটি তৈরি করে `container.innerHTML` এ অ্যাসাইন করুন।
2. ট্রি নোড তৈরি করে DOM মেথডের সাহায্যে সংযুক্ত করা।

যদি আপনি দুই উপায়েই করতে পারেন এটি আরো ভালো হবে।

বি.দ্র. ট্রি টিতে কোন "অতিরিক্ত" এম্পটি `<ul></ul>` থাকবে না।

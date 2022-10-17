# Body এর ভিতরে H1 ট্যাগ

HTML Document এর একটি স্ট্রিং আছে।

একটি রেগুলার এক্সপ্রেশন লিখুন যার মাধ্যমে `<body>` ট্যাগ এর পর `<h1>Hello</h1>` কে সংযোগ করতে পারি। ট্যাগটির একাধিক অ্যাট্রিবিউট থাকতে পারে।

উদাহরণস্বরূপ:

```js
let regexp = /আপনার প্যাটার্ন/;
let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

<<<<<<< HEAD
এর পর `str` এর মান হবে:
=======
After that the value of `str` should be:

>>>>>>> bf7d8bb1af3b416d393af1c15b03cb1352da1f9c
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```

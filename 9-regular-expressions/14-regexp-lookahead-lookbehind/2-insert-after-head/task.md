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

>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```

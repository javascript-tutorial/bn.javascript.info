গুরুত্বঃ ৩

---

<<<<<<< HEAD
# যেসব প্রোপার্টি ভ্যালু একটি সংখ্যা তাদের `2` দিয়ে গুন করুন

একটি ফাংশন `multiplyNumeric(obj)` লিখুন যেটি `obj` এর সব সংখ্যাভিত্তিক/numeric প্রোপার্টিগুলো কে `2` দিয়ে গুন করে।
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

উদাহরণস্বরূপঃ

```js
// কল করার আগে
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// কল করার পর
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

মনে রাখবেন `multiplyNumeric` এর কিছুই রিটার্ন করার দরকার নেই। এটা শুধুই অবজেক্টকে ইন-প্লেস পরিবর্তন করবে।

পুনশ্চঃ `typeof` ব্যবহার করে নাম্বার কিনা পরীক্ষা করুন।

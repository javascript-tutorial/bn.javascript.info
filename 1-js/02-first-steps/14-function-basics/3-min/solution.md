`if` ব্যবহার করে সমাধানঃ

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

`'?'` ব্যবহার করে সমাধানঃ

```js
function min(a, b) {
  return a < b ? a : b;
}
```

নোটঃ সমানের ক্ষেত্রে `a == b` কী রিটার্ন করা লাগবে সে বিষয়ে সমস্যাতে কিছু বলা হয়নি।

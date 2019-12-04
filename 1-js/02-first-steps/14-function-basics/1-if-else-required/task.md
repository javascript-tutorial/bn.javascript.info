importance: 4

---

# "else" কি দরকারি?

নিচের ফাংশন `true` রিটার্ন করে যদি প্যারামিটার `age` `18` এর চেয়ে বড় হয়।

নতুবা এটা কনফার্মেশন চায় ও ভ্যালু রিটার্ন করে।

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

`else` না থাকলে কি ফাংশন আগের মতো কাজ করবে?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

দুই ফাংশনের মধ্যে কোনো কাজের পার্থক্য আছে কি?
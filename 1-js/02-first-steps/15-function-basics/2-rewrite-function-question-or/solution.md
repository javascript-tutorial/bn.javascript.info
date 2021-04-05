প্রশ্নবোধক চিহ্ন `'?'` ব্যবহার করেঃ

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

OR `||` ব্যবহার করে (সবচেয়ে ছোট):

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
নোটঃ `age > 18` দুপাশে প্রথম ব্রাকেট প্রয়োজনীয় না। শুধুই বুঝার সুবিধার্থে দেওয়া।
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3
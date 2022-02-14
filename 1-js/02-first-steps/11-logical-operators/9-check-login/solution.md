

```js run demo
let userName = prompt("Who's there?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}
```

If ব্লকের ভিতরে উল্লম্ব ইনডেন্টগুলি নোট করুন। এগুলি প্রযুক্তিগতভাবে প্রয়োজন হয় না, তবে কোডটি আরও পাঠযোগ্য হয়।

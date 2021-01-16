কারণ prompt ইউজার ইনপুটকে স্ট্রিং হিসেবে রিটার্ন করে।

তাই ভ্যারিয়েবল দুটোর ভ্যালু হচ্ছে যথাক্রমে `"1"` এবং `"2"`।

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

আমাদের `+` এর আগে স্ট্রিংকে নাম্বারে রূপান্তর করে নেয়া উচিৎ। যেমন, `Number()` ব্যবহার করে বা আগে `+` বসিয়ে।

যেমন একদম `prompt` এর আগে:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

অথবা `alert` এ:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

শেষ কোডে ইউনারি আর বাইনারি `+` দুটোই আছে। মজার দেখাচ্ছে, তাই না?

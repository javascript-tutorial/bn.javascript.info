# ফর্মস: ইভেন্ট এবং সাবমিট মেথড

যখন কোন ফর্ম সাবমিট করা হয় তখন `submit` ইভেন্ট সংগঠিত হয়, সাধারণত সার্ভারে রিকুয়েস্ট সেন্ডের পূর্বে ভ্যালিডেশনের জন্য এটি ব্যবহার করা হয়।

`form.submit()` মেথড এর মাধ্যমে সার্ভারে রিকেয়েস্ট পাঠানো হয়। যখন ডায়নামিক্যালি আমরা ফর্ম তৈরি করি তখন এই মেথডটির সাহায্যে রিকেয়েস্ট পাঠানো হয়।

চলুন আরো বিস্তারিত জানা যাক।

## ইভেন্ট: submit

সাধারণত দুইভাবে আমরা ফর্ম সাবমিট করতে পারি:

1. প্রথমটি ইনপুট এলিমেন্টের সাহায্যে `<input type="submit">` বা `<input type="image">`।
2. দ্বিতীয়টি -- কোন ইনপুটে `key:Enter` প্রেসের মাধ্যমে।

উভয়ইভাবেই ফর্মের `submit` সংগঠিত হয়। আমরা হ্যান্ডেলারে ডাটা ভ্যালিডেশন করে ডাটা সার্ভারে পাঠাতে পারি, আর যদি কোন এরর থাকে তাহলে তা দেখিয়ে `event.preventDefault()` এর মাধ্যমে সাবমিট থামাতে পারি, ফলে ডাটা ডাটা সার্ভারে যাবে না।

নিচের ফর্মে:
1. টেক্সট ফিল্ডে ফোকাস করুন অতঃপর `key:Enter` বাটনে প্রেস করুন।
2. `<input type="submit">` এ ক্লিক করুন।

উভয়ই ক্ষেত্রে আমরা `alert` দেখব এবং `return false` এর জন্য ডাটা সেন্ড হবে না:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  First: Enter in the input field <input type="text" value="text"><br>
  Second: Click "submit": <input type="submit" value="Submit">
</form>
```

````smart header="`submit` এবং `click` এর মাঝে সম্পর্ক"
যখন কোন ইনপুট ফিল্ডে `key:Enter` প্রেসের মাধ্যমে ফর্ম সাবমিট করা হয়, তখন `<input type="submit">` এ একটি `click` ইভেন্ট সংগঠিত হয়।

ব্যাপারটা কেমন বিদঘুটে না? আমরা কোন ক্লিক করিনি তারপরও `click` ইভেন্ট সংগঠিত হয়।

এখানে দেখুন:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## মেথড: submit

ম্যানুয়ালি একটি ফর্ম সাবমিটের জন্য আমরা `form.submit()` ব্যবহার করি।

তখন `submit` ইভেন্টটি সংগঠিত হয় না। কেননা `form.submit()` কল করা প্রোগ্রামের মাধ্যমে, সুতরাং আমরা ধরে নিতে পারি ডেভলাপার সকল ভ্যালিডেশন করার পর এই মেথডটি কল করছে।

অনেক সময় স্ক্রিপ্টের মাধ্যমে ফর্ম তৈরি করে তা সাবমিটের জন্য আমরা এটি ব্যবহার করি, নিচে একটি উদাহরণ দেয়া হল:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// ফর্মটি সাবমিট করার জন্য অবশ্যই এটি ডকুমেন্টের নোড হতে হবে
document.body.append(form);

form.submit();
```

প্রথমে `<li>` এর কালেকশনটি নেয়:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

লুপের মধ্যে আমাদের প্রতিটি `li` এর টেক্সট নেয়া লাগবে।

আমরা `li` এর প্রথম নোডটি থেকে নোড এর কন্টেন্ট পাব, যা হল টেক্সট নোড:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

এরপর আমরা এভাবে সর্বমোট চাইল্ডনোড সমূহ পাব `li.getElementsByTagName('li').length`।

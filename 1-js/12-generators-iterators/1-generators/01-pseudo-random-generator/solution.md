```js run demo
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647
    yield value;
  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```

দয়া করে মনে রাখুন, আমরা নিম্নোক্ত রেগুলার ফাংশনের মাধ্যমেও একই কাজ করতে পারিঃ

```js run
function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return value;
  }
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073
```

এটিও কাজ করে। কিন্তু এ জন্য  জেনারেটর কম্পোজিশনে আমরা `for..of` এর মাধ্যমে ইটারেট করতে পারব না, এটি অন্য কোথাও ব্যবহারযোগ্য হতে পারে।

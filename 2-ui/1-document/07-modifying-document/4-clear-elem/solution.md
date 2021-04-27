
প্রথমত, লক্ষ্য করুন, আমাদের এটি এভাবে করা উচিত হবে না:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

এটি কাজ করবে নাহ, কেননা `remove()` কলে আমাদের `elem.childNodes` কালেকশনে কিছু পরিবর্তন হয়, সুতরাং এলিমেন্টটি সবসময় `0` থেকে শুরু হয়। কিন্তু `i` বৃদ্ধি পায়, এবং কিছু এলিমেন্ট বাদ পড়ে যায়।

`for..of` দ্বারাও কাজ করবে না।

সঠিক উপায়টি হল:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

এবং আরো সহজে আমরা এভাবে করতে পারি:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```

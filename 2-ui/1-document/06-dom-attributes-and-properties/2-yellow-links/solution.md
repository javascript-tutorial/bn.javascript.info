
প্রথমত, আমাদের সকল এক্সটার্নাল লিংক খুঁজে বের করতে হবে।

এটি দুইভাবে করতে পারি।

প্রথমে আমরা সকল লিংক কে নিব `document.querySelectorAll('a')` এবং তারপর আমরা আমদের চাহিদামত ফিল্টার করব:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // no attribute

  if (!href.includes('://')) continue; // no protocol

  if (href.startsWith('http://internal.com')) continue; // internal

  link.style.color = 'orange';
}
```

দয়া করে নোট রাখুন: আমরা `link.getAttribute('href')` ব্যবহার করব। `link.href` ব্যবহার করব না, কেননা আমাদের HTML ভ্যালুটি লাগবে।

...আরেকটি উপায় হল, CSS selector ব্যবহার করা:

```js
// সকল লিংকের href এ :// খুঁজা
// কিন্তু href, http://internal.com দ্বারা শুরু হবে না
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```

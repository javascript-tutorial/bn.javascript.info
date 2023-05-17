অনেকভাবে এটি করা যায়, যেমন:


`<div>` DOM নোড:

```js
document.body.firstElementChild
// অথবা
document.body.children[0]
// অথবা (প্রথম নোডটি স্পেস হতে পারে, আমরা 2য়টি নিব)
document.body.childNodes[1]
```

`<ul>` DOM নোড:

```js
document.body.lastElementChild
// অথবা
document.body.children[1]
```

দ্বিতীয় `<li>` (Pete টেক্সট সহ):

```js
// প্রথমে <ul>, এবং তারপর শেষ চাইল্ড এলিমেন্ট
document.body.lastElementChild.lastElementChild
```

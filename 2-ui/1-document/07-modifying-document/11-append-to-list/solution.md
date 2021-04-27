
আমাদের HTML এর কোন একটি অংশে লিখার জন্য, `insertAdjacentHTML` সবচেয়ে বেশি উপযোগী।

সমাধানটি হল:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```

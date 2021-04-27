শুরুতে HTML/CSS তৈরি করি।

প্রতিটি কম্পোনেন্টকে `<span>` দ্বারা আলাদা করি:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

আমাদের CSS ও পরিবর্তন করতে হবে।

`update` ফাংশনটি `setInterval` দ্বারা প্রতিসেকেন্ডে কল হয়:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

`(*)` এই লাইনে আমরা প্রতিবারের তারিখটি পরীক্ষা করি। এ ক্ষেত্রে `setInterval` নির্ভরযোগ্য নাও হতে পারে: এটি কিছু সময় নিতে পারে।

আমাদের ফাংশনগুলো হবে:

```js
let timerId;

function clockStart() { // run the clock
  timerId = setInterval(update, 1000);
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null;
}
```

Please note that the call to `update()` is not only scheduled in `clockStart()`, but immediately run in the line `(*)`. Otherwise the visitor would have to wait till the first execution of `setInterval`. And the clock would be empty till then.

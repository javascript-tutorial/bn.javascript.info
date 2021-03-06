importance: 5

---

# নোটিফিকেশন তৈরি

`showNotification(options)` নামের একটি ফাংশন লিখুন যা একটি নোটিফিকেশন দেখাবে: `<div class="notification">`। নোটিফিকেশনটি ১.৫ সেকেন্ড পর অদৃশ্য হবে।

options হবে:

```js
// "Hello" টেক্সট সহকারে একটি এলিমেন্ট দেখাবে window এর উপরের ডান কোণায়
showNotification({
  top: 10, // 10px from the top of the window (by default 0px)
  right: 10, // 10px from the right edge of the window (by default 0px)
  html: "Hello!", // the HTML of notification
  className: "welcome" // an additional class for the div (optional)
});
```

[demo src="solution"]


CSS পজিশনিং স্ট্যাইল ব্যবহার করুন top/right এর জন্য।

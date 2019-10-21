# ইন্টারেকশন: alert, prompt, confirm

টিউটোরিয়ালের এই পর্যায়ে আমরা কোনো বিশেষ পরিবেশ সমন্বয় ছাড়া জাভাস্ক্রিপ্ট দেখবো।

কিন্তু আমরা এখনো ব্রাউজার ব্যবহার করবো আমাদের ডেমো পরিবেশ হিসেবে, এখন আমাদের জানা উচিত এর কিছু ব্যবহারকারী ইন্টারফেস ফাংশন সম্পর্কে। এই চ্যাপ্টারে আমরা পরিচিত হবো ব্রাউজার ফাংশন `alert`, `prompt` and `confirm` এর সাথে।

## alert

গঠন:

```js
alert(বার্তা);
```

এটি একটি বার্তা প্রদর্শন করে বাকি স্ক্রিপ্ট আটকে রাখে ব্যবহারকারী OK প্রেস করার আগপর্যন্ত।

যেমন:

```js run
alert("ওহে");
```
বার্তা সহ ছোট উইন্ডোকে *মডাল উইন্ডো* বলে। মডাল মানে হলো, ব্যবহারকারী যতক্ষণ না এই উইন্ডো এর কাজ না করছেন ততক্ষন বাকি পেজ এর কোনো কাজ করে পারবেন না, অন্য কোনো বোতাম চাপতে পারবেন না ইত্যাদি। এইক্ষেত্রে, --যতক্ষণ না তিনি OK চাপছেন।

## prompt

এই `prompt` ফাংশন দুটি আর্গুমেন্ট নেয়।

```js no-beautify
result = prompt(শিরোনাম, [default]);
```

এটি একটি মডাল উইন্ডো দেখায় একটি বার্তা, একটি ইনপুট ফিল্ড এবং বোতাম OK/Cancel.

`শিরোনাম`
: যে বার্তা ব্যবহারকারীকে দেখতে চান। 

`default`
: একটি ঐচ্ছিক পেরামিটার, এর প্রাথমিক মান ইনপুট ফিল্ড হতে প্রাপ্ত মান।

The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.

For instance:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:

```js run
let test = prompt("Test");
```

So, for prompts to look good in IE, we recommend always providing the second argument:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

The syntax:

```js
result = confirm(question);
```

The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.

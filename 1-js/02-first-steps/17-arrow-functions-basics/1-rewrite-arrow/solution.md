
```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "আপনি কি রাজি?",
*!*
  () => alert("আপনি রাজি হয়েছেন।"),
  () => alert("আপনি কাজটি বাতিল করেছেন।")
*/!*
);
```

দেখতে ছোট এবং ঝকঝকে লাগছে, তাই না?
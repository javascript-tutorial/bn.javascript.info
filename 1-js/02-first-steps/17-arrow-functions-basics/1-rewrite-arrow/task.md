
# এ্যারো ফাংশন দিয়ে পুনরায় লিখা

নিচের কোডের ফাংশন এক্সপ্রেশনটি এ্যারো ফাংশন দিয়ে পরিবর্তন করুনঃ 

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "আপনি কি রাজি?",
  function() { alert("আপনি রাজি হয়েছেন।"); },
  function() { alert("আপনি কাজটি বাতিল করেছেন।"); }
);
```

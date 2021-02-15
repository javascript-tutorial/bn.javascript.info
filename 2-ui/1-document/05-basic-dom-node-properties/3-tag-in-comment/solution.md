এটি দেখাবে: **`BODY`**।

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

এখানে কি হচ্ছে তা ধাপে ধাপে দেখি:

1. `<body>` এর কন্টেন্টটি কমেন্ট দ্বারা প্রতিস্থাপিত হবে। কমেন্টটি হল `<!--BODY-->`, কেননা `body.tagName == "BODY"`। এবং আমরা জানি, `tagName` সর্বদা বড়হাতের হয়।
2. কমেন্টটি হল একমাত্র চাইল্ড নোড, সুতরাং আমরা একে `body.firstChild` প্রপার্টিতে পাব।
3. কমেন্ট এর কন্টেন্ট হল `"BODY"` যা আমরা `data` প্রপার্টিতে পাব।
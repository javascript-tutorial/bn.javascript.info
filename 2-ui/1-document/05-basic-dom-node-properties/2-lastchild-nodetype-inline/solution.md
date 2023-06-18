এখানে লক্ষ্য করুন।

`<script>` টি যখন এক্সিকিউশন হবে শেষ DOM নোডটি হবে `<script>`, কেননা ব্রাউজার সম্পূর্ন পেজটি এক্সিকিউট হয়নি।

সুতরাং ফলাফল দেখাবে `1` (এলিমেন্ট নোড)।

```html run height=60
<html>

<body>
  <script>
    alert(document.body.lastChild.nodeType);
  </script>
</body>

</html>
```

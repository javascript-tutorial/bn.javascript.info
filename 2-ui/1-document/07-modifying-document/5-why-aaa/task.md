importance: 1

---

# কেন "aaa" অবশিষ্ট থাকে?

নিচের উদাহরণে, `table.remove()` এর মাধ্যমে ডকুমেন্ট হতে টেবিল টি রিমুভ করা হয়।

কিন্তু যদি আমরা এটি রান করি, তাহলে আমরা `"aaa"` কে ডকুমেন্টে দেখব।

কেন এটি রয়ে যায়?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // the table, as it should be

  table.remove();
  // কেন ডকুমেন্টে "aaa" অবশিষ্ট রয়ে গেল?
</script>
```

importance: 3

---

# এক্সটার্নাল লিংক সমূহকে কমলা রঙয়ের করা

সকল এক্সটার্নাল লিংক সমূহকে কমলা রঙ করুন তাদের `style` প্রপার্টি পরিবর্তনের মাধ্যমে।

একটি লিংক এক্সটার্নাল হবে, যদি:
- `href` এ `://` থাকে।
- তবে এভাবে শুরু হবে না `http://internal.com`।

যেমন:

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // একটি লিংকের জন্য স্ট্যাইল সেট
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

এটি দেখতে এমন হবে:

[iframe border=1 height=180 src="solution"]

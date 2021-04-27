importance: 3

---

# Tag in comment

কোডটি কি দেখাবে?

```html
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // what's here?
</script>
```

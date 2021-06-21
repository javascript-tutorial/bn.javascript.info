importance: 5

---

# কোন হ্যান্ডেলারটি এক্সিকিউট হবে?

বাটন ক্লিকে এখানে কোন হ্যান্ডেলারটি রান হবে, এবং কোন অ্যালার্টটি শো হবে?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```

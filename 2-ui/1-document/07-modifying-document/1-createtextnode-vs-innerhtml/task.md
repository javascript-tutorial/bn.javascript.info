importance: 5

---

# createTextNode vs innerHTML vs textContent

আমাদের একটি খালি DOM এলিমেন্ট `elem` এবং একটি `text` স্ট্রিং আছে।

৩টি কমান্ডের মধ্যে কোন দুইটি একই কাজ করে?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`

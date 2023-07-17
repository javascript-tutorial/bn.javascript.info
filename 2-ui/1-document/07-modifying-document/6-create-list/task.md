importance: 4

---

# একটি লিস্ট তৈরি

একটি ইন্টারফেস লিখুন যা ইউজার ইনপুট হতে একটি লিস্ট তৈরি করে।

প্রতিটি লিস্ট আইটেম:

<<<<<<< HEAD
1. ইউজার হতে কন্টেন্ট নিবে `prompt` এর মাধ্যমে।
2. `<li>` তৈরি করবে এবং একে `<ul>` এর মধ্যে সংযুক্ত করবে।
3. ইউজার ক্যান্সেল করার পূর্ব পর্যন্ত এটি চলতে থাকবে (`key:Esc` চাপার মাধ্যমে এটি ক্যান্সেল হয়)।
=======
1. Ask a user about its content using `prompt`.
2. Create the `<li>` with it and add it to `<ul>`.
3. Continue until the user cancels the input (by pressing `key:Esc` or via an empty entry).
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

সকল এলিমেন্ট স্বয়ংক্রিয়ভাবে তৈরি হয়।

যদি ইউজার HTML-tags টাইপ করে, এটি টেক্সট হিসেবে কাজ করবে।

[demo src="solution"]

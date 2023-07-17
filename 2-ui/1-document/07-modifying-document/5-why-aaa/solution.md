আমাদের টাস্কটিই ভুল। যে কারণে আমরা এমন অনাকাঙ্ক্ষিত ঘটনার সম্মুখীন হচ্ছি।

<<<<<<< HEAD
ব্রাউজার আমাদের ভুল HTML কে স্বয়ংক্রিয়ভাবে ঠিক করে। `<table>` এর মধ্যে কোন টেক্সট থাকতে পারবে না: স্পেসিফিকেশন অনুযায়ী *table* এ শুধুমাত্র table স্পেসিফিক ট্যাগ থাকতে পারবে। সুতরাং ব্রাউজার `"aaa"` কে `<table>` এর *পূর্বে* যুক্ত করে।
=======
The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser shows `"aaa"` *before* the `<table>`.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

এবং এর ফলে আমরা *table* কে রিমুভ করলেও টেক্সট রয়ে যায়।

<<<<<<< HEAD
আমরা ব্রাউজার টুলের সাহায্যে দেখলে আরো পরিষ্কারভাবে বুঝতে পারব। `"aaa"` কে `<table>` এর পূর্বে দেখাবে।
=======
The question can be easily answered by exploring the DOM using the browser tools. You'll see `"aaa"` before the `<table>`.
>>>>>>> 733ff697c6c1101c130e2996f7eca860b2aa7ab9

HTML স্ট্যান্ডার্ডে আমাদের ভুল HTML সমূহকে কিভাবে প্রসেস করবে তা আলোচনা করা হয়েছে, এবং এক্ষেত্রে ব্রাউজার এটিকে স্বয়ংক্রিয়ভাবে ঠিক করে।

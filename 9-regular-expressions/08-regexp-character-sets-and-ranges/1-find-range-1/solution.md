উত্তর: **না, হ্যাঁ**।

- `subject:Java` এ কোন কিছুর সাথে ম্যাচ হবেনা, কারন `pattern:[^script]` দ্বারা বুঝায় "প্রদত্ত ক্যারাক্টার ব্যতীত যেকোন ক্যারাক্টার"। সুতরাং রেগুলার এক্সপ্রেশনটি `"Java"` এর পর যেকোন একটি ক্যারাক্টার খুঁজে, কিন্তু স্ট্রিংটির শেষে কোন ক্যারাক্টার নেই।

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
<<<<<<< HEAD
- হ্যাঁ, কারণ `pattern:[^script]` অংশটি `"S"` ক্যারাক্টারের সাথে ম্যাচ করে। `"S"` ক্যারাক্টারটি `pattern:script` এর মধ্যে নেই। যেহেতু রেগুলার এক্সপ্রেশন কেস-সেনসিটিভ (কোন `pattern:i` ফ্ল্যাগ নেই), তাই ক্যারাক্টার `"S"` এবং `"s"` কে আলাদা হিসেবে বিবেচনা করে।
=======
- Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```

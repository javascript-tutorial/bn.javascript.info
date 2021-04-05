
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. কোন স্ট্রিংয়ের সাথে যোগের ক্ষেত্রে `"" + 1` তে `1` রূপান্তর হয়ে `"" + 1 = "1"` হয়। তাই এখানে পায় `"1" + 0`, এক্ষেত্রেও একই নিয়ম প্রযোজ্য।
2. বিয়োগ `-` (প্রায় অন্যসব অপারেটরের মতই) শুধুমাত্র সংখ্যা নিয়ে কাজ করে, এটি ফাঁকা স্ট্রিংকে শূন্য তে রূপান্তর করে নেয় `""` থেকে `0` হবে।
3. স্ট্রিং সংযুক্তকরণ নীতি অনুসারে `5` স্ট্রিংয়ে রূপান্তর হবে।
4. বিয়োগের সময় স্ট্রিং সবসময় সংখ্যায় রূপান্তর হয়, তাই এক্ষেত্রে `"  -9  "` সংখ্যা `-9` তে পরিবর্তন হয় (এখানে স্পেসগুলিকে উপেক্ষা করে )
5. `null` হবে `0` সংখ্যায় রুপান্তরের পর।
6. `undefined` হয়ে যায় `NaN` সংখ্যায় রূপান্তর করা হলে।
7. স্পেসসমূহ বাদ দেয়া হয় সংখ্যায় রুপান্তর করলে, এখানে পুরো স্ট্রিংটাই বিভিন্ন স্পেসে তৈরি, যেমনঃ `\t`, `\n` এবং তাদের মাঝের "রেগুলার" স্পেসসমূহ। সুতরাং এটি ফাঁকা স্ট্রিংয়ের মতই, যা শুন্যতে (`0`) রুপান্তর হয়।
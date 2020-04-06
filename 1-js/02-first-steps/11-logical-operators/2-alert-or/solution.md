উত্তর প্রথমে ১ তারপর ২ ।

```js run
alert( alert(1) || 2 || alert(3) );
```

alert কল করলে কোন মান রিটার্ন করে না. অথবা, এক কথায় undefined দেখায়।

<<<<<<< HEAD
১। OR || অপারেশনে প্রথমে বাম দিক থেকে মূল্যায়ন করা হয়। সেজন্য এখানে প্রথম ফলাফল দেখায় 1।
২। `alert` দেখায় `undefined`, অথবা সত্য মানটির সন্ধানে দ্বিতীয় প্রতীকে যায়।
৩। দ্বিতীয় প্রতীক `2` সত্য হয়, সুতরাং এক্সিকিউশন স্থগিত, `2` ফিরে আসে এবং তারপরে বাইরের সতর্কতা দ্বারা দেখানো হয়। 
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622

কোনও `3` থাকবে না, কারণ মূল্যায়ন `alert(3)` তে পৌঁছায় না।

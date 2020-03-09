

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

কিছু কারণ:

<<<<<<< HEAD
1. অবশ্যই true বা ঠিক হবে। 
2. আভিধানিকভাবে তুলনা তাই false বা ভুল।
3. আবারও, আভিধানিকভাবে তুলনা, প্রথম স্ট্রিংয়ের `"2"` দ্বিতীয় স্ট্রিংয়ের `"1"` এর থেকে বড়। 
4. `null` এবং `undefined` একমাত্র একে অপরের সমান। 
5. যথাযথ সমতায় `===` দুটি ভ্যালু একই টাইপের হতে হয়। কিন্তু তারা ভিন্ন টাইপের। 
6. এটি `(4)` নং এর মতো। `null` একমাত্র `undefined` এর সমান।
7. দুটি ভিন্ন টাইপের ভ্যালু বা মান। 
=======
1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

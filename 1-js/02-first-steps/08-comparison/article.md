# তুলনা

আমরা গণিতের অনেক তুলনা করার অপারেটর সম্পর্কে জানি:

- বৃহত্তম / ক্ষুদ্রতম: <code>a &gt; b</code>, <code>a &lt; b</code>.
- বৃহত্তম / ক্ষুদ্রতম অথবা সমান: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- সমান: `a == b` (মনে রাখবেন দুইটি সমান চিহ্ন `=`। একটি সমান চিহ্ন এসাইনমেন্ট বুযায় `a = b`।)
- সমান নয়: গণিতে সমান নয় কে লেখা হয় <code>&ne;</code> ভাবে। কিন্তু জাভাস্ক্রিপ্টে সমান চিহ্নের আগে বিস্ময়সূচক চিহ্ন দিয়ে লেখা হয়: <code>a != b</code>।

## বুলিয়ান ফলাফল

অন্য সকল অপারেটরের মতো তুলনা করার অপারেটর একটি মান রিটার্ন করে। এক্ষেত্রে মানটি হবে বুলিয়ান।

- `true` -- মানে "হ্যাঁ", "ঠিক" অথবা "সত্য"।
- `false` -- মানে "না", "ভুল" অথবা "মিথ্যা"।

উদাহরণস্বরূপ:

```js run
alert(2 > 1); // true (ঠিক)
alert(2 == 1); // false (ভুল)
alert(2 != 1); // true (ঠিক)
```

কোনো তুলনার মান বা ভ্যালু কে যেকোনো ভ্যারিয়েবলে এসাইন করা যাবে। অন্য সকল মান বা ভ্যালুর মতো:

```js run
let result = 5 > 4; // তুলনার মানকে এসাইন করা হয়েছে
alert(result); // true
```

## স্ট্রিং এর তুলনা

কোনো স্ট্রিং ছোট বা বড় কিনা তা তুলনা করার জন্য জাভাস্ক্রিপ্ট "অভিধান" বা "আভিধানিক" ক্রম ব্যবহার করে।

অর্থাৎ, strings are compared letter-by-letter.

উদাহরণস্বরূপ:

```js run
alert("Z" > "A"); // true
alert("Glow" > "Glee"); // true
alert("Bee" > "Be"); // true
```

দুটি স্ট্রিং তুলনা করার অ্যালগরিদম খুব সহজ:

1. উভয় স্ট্রিং এর প্রথম অক্ষর দুটির তুলনা করতে হবে।
2. যদি প্রথম স্ট্রিং এর প্রথম অক্ষরটি দ্বিতীয়টির প্রথম অক্ষরের থেকে বড় হয়, তবে প্রথম স্ট্রিংটি দ্বিতীয়টির থেকে বড়। তুলনা করা শেষ।
3. অন্যথায়, যদি উভয় স্ট্রিংয়ের প্রথম অক্ষর দুটি একই হয়, তবে উভয় স্ট্রিংয়ের দ্বিতীয় অক্ষর দুটিকে একই ভাবে তুলনা করতে হবে।
4. যেকোনো একটি স্ট্রিংয়ের শেষ পর্যন্ত উপেরের নিয়মে তুলনা করতে হবে।
5. যদি উভয় স্ট্রিং এর দৈর্ঘ্য সমান হয়, তবে স্ট্রিং দুটি সমান। অন্যথায়, বেশি দৈর্ঘ্যের স্ট্রিংটি বড়।

উপরের উদাহরণে,`'Z' > 'A'` এই তুলনার প্রথম ধাপেই ফলাফল পাওয়া যায়। অন্যদিকে, এই `"Glow"` এবং `"Glee"` স্ট্রিং দুটি অক্ষরের পর অক্ষর তুলনা করা হয়েছে।

1. `G` আর `G` একই বা সমান।
2. `l` আর `l` একই বা সমান।
3. `o` এর থেকে `e` বড়। তুলনা করা এখানে শেষ। প্রথম স্ট্রিং টি বৃহত্তম।

```smart header="বাস্তব অভিধান নয়, কিন্তু ইউনিকোড ক্রম"
উপরে উল্লেখ করা এলগোরিদমটি প্রায় একই রকম যেই এলগোরিদমটি অভিধানগুলোতে বা ফোন বুককে ব্যবহার করা হয়। তবে এটি সম্পূর্ণ এক নয়।

উদাহরণস্বরূপ, বড় ও ছোট হাতের অক্ষরের উপর নির্ভরশীল।  বড় হাতের `"A"` আর ছোট হাতের `"a"` সমান নয়। তাহলে কোনটি বড়? ছোট হাতের `"a"`। কেন? কারণ ছোট হাতের অক্ষর এনকোডিং এর জন্য জাভাস্ক্রিপ্ট ইউনিকোড ব্যবহার করে।  যেই ইউনিকোড নম্বর বড় হাতের অক্ষরের  থেকে বড়। আমরা এই সম্পর্কে বিস্তারিত আলোচনা করবো <info:স্ট্রিং> অধ্যায়ে।
```

## ভিন্ন ধরণের মানের মধ্যে তুলনা

যখন দুটি ভিন্ন ধরনের মানের মধ্যে তুলনা করা হয় তখন জাভাস্ক্রিপ্ট এই মানকে সংখ্যায় রূপান্তর করে।

উদাহরণস্বরূপ:

```js run
alert("2" > 1); // true, স্ট্রিং '2' সংখ্যায় রূপান্তরিত হয়ে 2 হয়েছে।
alert("01" == 1); // true, স্ট্রিং '01' সংখ্যায় রূপান্তরিত হয়ে 1 হয়েছে।
```

বুলিয়ান মানের জন্য `true` হয় `1` আর `false` হয় `0`।

উদাহরণস্বরূপ:

```js run
alert(true == 1); // true
alert(false == 0); // true
```

````smart header="একটি মজার ঘটনা"
এটি একই সাথে সম্ভব:

- দুটি মান সমান।
- তাদের মধ্য বুলিয়ান মান হিসেবে একটি `true` আর অন্যটি `false`।

উদাহরণস্বরূপ:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

জাভাস্ক্রিপ্টের দৃর্ষ্টিকোণ থেকে, এটি একটি স্বাভাবিক বিষয়। সমতা নির্নয় করার জন্য মানকে সংখ্যায় রূপান্তরিত করা হয়(তাই `"0"` রূপান্তরিত হয়েছে `0` তে)। কোনো মানকে নিদির্ষ্টভাবে `বুলিয়ান` মানে(ভ্যালু তে) রূপান্তরিত করতে ভিন্ন ধরণের নিয়ম অনুসরণ করা হয়।
````

## যথাযথ সমতা

সাধারণভাবে সমতা নির্ণয়ে `==` একটি সমস্যা আছে। এভাবে `0` এবং `false` কে আলাদা করতে পারে না।

```js run
alert(0 == false); // true
```

একই ঘটনা ঘটে ফাঁকা স্ট্রিং এর ক্ষেত্রে।

```js run
alert("" == false); // true
```

এটি ঘটে কারণ, `==` অপারেটর ভিন্ন ধরণের অপারেন্ড গুলোকে সংখ্যায় রূপান্তরিত করে। একটি ফাঁকা স্ট্রিং `false` এর মতো, তাই এটি শূন্য তে রূপান্তরিত হয়।

যদি আমরা `0` আর `false` কে আলাদা করতে চাই তবে কি করতে পারি?

**যথাযথ সমতা অপারেটর `===` সমতা নির্ণয় করে ভ্যালু বা মানের টাইপ পরিবর্তন না করে।**

অন্যভাবে, যদি `a` এবং `b` ভিন্ন টাইপ বা ধরণের হয় তবে `a === b` তাৎক্ষণিকভাবে `false` রিটার্ন করবে তাদের টাইপ পরিবর্তন করার চেষ্টা ছাড়াই।

চেষ্টা করা দেখা যাক।

```js run
alert(0 === false); // false, কারণ টাইপ আলাদা।
```

এছাড়াও যথাযথ সমতা নয় `!==` অপারেটর আছে `!=` এর মতো।

যথাযথ সমতার অপারেটরে `(===)` একটু বেশি লিখতে হয় তবে এটি আসলেই কি ঘটছে বুঝতে সাহায্য করে এবং ভুল হওয়ার সম্ভাবনা কমায়।

## Comparison with null and undefined

There's a non-intuitive behavior when `null` or `undefined` are compared to other values.

For a strict equality check `===`
: These values are different, because each of them is a different type.

    ```js run
    alert( null === undefined ); // false
    ```

For a non-strict check `==`
: There's a special rule. These two are a "sweet couple": they equal each other (in the sense of `==`), but not any other value.

    ```js run
    alert( null == undefined ); // true
    ```

For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.

### Strange result: null vs 0

Let's compare `null` with a zero:

```js run
alert(null > 0); // (1) false
alert(null == 0); // (2) false
alert(null >= 0); // (3) *!*true*/!*
```

Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.

### An incomparable undefined

The value `undefined` shouldn't be compared to other values:

```js run
alert(undefined > 0); // false (1)
alert(undefined < 0); // false (2)
alert(undefined == 0); // false (3)
```

Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.

### Evade problems

Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to evade problems with them:

Just treat any comparison with `undefined/null` except the strict equality `===` with exceptional care.

Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.

## Summary

- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.

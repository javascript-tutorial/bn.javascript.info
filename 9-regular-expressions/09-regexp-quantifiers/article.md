# কোয়ান্টিফায়ার +, *, ? এবং {n}

এখন মনে করন আমাদের এমন একটি `+7(903)-123-45-67` স্ট্রিং আছে এবং আমরা এর সকল নাম্বার খুঁজে পেতে চাই। কিন্ত পূর্বের মত, আমরা একক অঙ্ক চাই না, পূর্ণ সংখ্যা চাই: `7, 903, 123, 45, 67`।

সংখ্যা হল এক বা একাধিক অঙ্কের একটি সমষ্টি `pattern:\d`. আমাদের প্রয়োজনমত অঙ্কের জন্য আমরা *quantifier* সংযোজন করতে পারি।

## সংখ্যা {n}

সবচেয়ে সহজ কোয়ান্টিফায়ার হল দ্বিতীয় বন্ধনীর মধ্যে একটি সংখ্যা: `pattern:{n}`।

কোয়ান্টিফায়ারে যেকোন ধরণের ক্যারাক্টার (অথবা ক্যারাক্টার ক্লাস, অথবা `[...]` সেট ইত্যাদি) আমাদের প্রয়োজনমত সংযোজন করতে পারি।

এটি ব্যবহারের বিভিন্ন উপায় আছে, চলুন কয়েকটি উদাহরণ দেখি:

নির্দিষ্ট সংখ্যা গণনা: `pattern:{5}`
: `pattern:\d{5}` এটি দ্বারা ৫টি অঙ্ক বুঝায়, যা `pattern:\d\d\d\d\d` এর অনুরূপ।

    নিচের উদাহরণে একটি ৫ অঙ্কের সংখ্যা খুঁজা হচ্ছে:

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    আমরা `\b` যুক্ত করে এর চেয়ে বড় সংখ্যাগুলো বাদ দিতে পারি: `pattern:\b\d{5}\b`।

রেঞ্জ: `pattern:{3,5}`, ৩-৫ অঙ্কের সংখ্যার সাথে মিল খুঁজে
: ৩ থেকে ৫ অঙ্কের মধ্যের সংখ্যা গুলো খুঁজতে আমরা দ্বিতীয় বন্ধনীতে সীমা নির্ধারণ করে দিতে পারি: `pattern:\d{3,5}`

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

    আমরা সর্বোচ্চ সীমাটি বাদ দিতে পারি।

    এ রেগুলার এক্সপ্রেশনটি `pattern:\d{3,}` ৩ বা ততোধিক অঙ্কের মিল গুলো খুঁজে:

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

এখন আমাদের পূর্বের `+7(903)-123-45-67` স্ট্রিংটি দেখি।

সংখ্যা হল এক বা একাধিক অঙ্কের সমষ্টি। সুতরাং রেগুলার এক্সপ্রেশনটি হবে `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Shorthands

There are shorthands for most used quantifiers:

`pattern:+`
: Means "one or more", the same as `pattern:{1,}`.

    For instance, `pattern:\d+` looks for numbers:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: Means "zero or one", the same as `pattern:{0,1}`. In other words, it makes the symbol optional.

    For instance, the pattern `pattern:ou?r` looks for `match:o` followed by zero or one `match:u`, and then `match:r`.

    So, `pattern:colou?r` finds both `match:color` and `match:colour`:

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: Means "zero or more", the same as `pattern:{0,}`. That is, the character may repeat any times or be absent.

    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes (may be many or none):

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Compare it with `pattern:+` (one or more):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero
    ```

## More examples

Quantifiers are used very often. They serve as the main "building block" of complex regular expressions, so let's see more examples.

**Regexp for decimal fractions (a number with a floating point): `pattern:\d+\.\d+`**

In action:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Regexp for an "opening HTML-tag without attributes", such as `<span>` or `<p>`.**

1. The simplest one: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    The regexp looks for character `pattern:'<'` followed by one or more Latin letters, and then  `pattern:'>'`.

2. Improved: `pattern:/<[a-z][a-z0-9]*>/i`

    According to the standard, HTML tag name may have a digit at any position except the first one, like `<h1>`.

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

**Regexp "opening or closing HTML-tag without attributes": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

We added an optional slash `pattern:/?` near the beginning of the pattern. Had to escape it with a backslash, otherwise JavaScript would think it is the pattern end.

```js run
alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="To make a regexp more precise, we often need make it more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`. But as HTML has stricter restrictions for a tag name, `pattern:<[a-z][a-z0-9]*>` is more reliable.

Can we use `pattern:<\w+>` or we need `pattern:<[a-z][a-z0-9]*>`?

In real life both variants are acceptable. Depends on how tolerant we can be to "extra" matches and whether it's difficult or not to remove them from the result by other means.
```

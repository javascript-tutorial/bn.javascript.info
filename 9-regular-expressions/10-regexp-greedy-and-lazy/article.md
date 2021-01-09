# Greedy এবং lazy কোয়ান্টিফায়ার

প্রথম দেখায় কোয়ান্টিফায়ারকে সহজ মনে হতে পারে, কিন্তু বাস্তবে এরা কৌশলী।

জটিল কিছু খোঁজার পূর্বে আমাদের বুঝতে হবে `pattern:/\d+/` এরা কিভাবে কাজ করে।

উদাহরণ হিসাবে নিচের টাস্কটি নিয়ে কাজ করি।

আমাদের কাছে একটি টেক্সট আছে এবং আমরা সকল উদ্ধৃতি চিহ্নকে `"..."`
গিলিমেট চিহ্ন `«...»` দিয়ে প্রতিস্থাপন করব। অনেক দেশে টাইপোগ্রাফির জন্য এগুলোই বেশি পছন্দের।

উদাহরণস্বরূপ: `"Hello, world"` হবে `«Hello, world»`. আরো অনেক ধরণের উদ্ধৃতি চিহ্ন আছে, যেমন `„Witam, świat!”` (পোলিশ) অথবা `「你好，世界」` (চাইনিজ), কিন্ত আমাদের টাস্কের জন্য এখন এটিই `«...»` যুতসই।

আমাদের প্রথম কাজটি হল স্ট্রিং হতে উদ্ধৃতি চিহ্নগুলোকে চিহ্নিত করা, এবং তারপর এদের আমরা প্রতিস্থাপন করতে পারব।

রেগুলার এক্সপ্রেশনে আমাদের প্যাটার্নটি হবে এমন `pattern:/".+"/g` (শুরুর উদ্ধৃতি চিহ্ন, তারপর কিছু ক্যারাক্টার, অতঃপর শেষ উদ্ধৃতি চিহ্ন) দেখতে সঠিক মনে হচ্ছে, তবে এটি সঠিক নই!

চেষ্টা করা যাক:

```js run
let regexp = /".+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // "witch" and her "broom"
```

...আমরা দেখতে পাচ্ছি এটি আমাদের চাহিদামত কাজ করছে না!

`match:"witch"` এবং `match:"broom"` এই দুটি মিল খুঁজে পাওয়ার পরিবর্তে এটি দেখায়: `match:"witch" and her "broom"`।

That can be described as "greediness is the cause of all evil".

## Greedy search

কোন একটি মিল খুঁজতে রেগুলার এক্সপ্রেশন ইঞ্জিন নিম্নে উল্লেখিত অ্যালগরিদম অনুযায়ী কাজ করে:

- স্ট্রিংয়ের প্রতিটি অবস্থানের জন্য
    - অই অবস্থানে প্যাটার্নটির অবস্থান মেলানোর চেষ্টা করে।
    - যদি কোন মিল না পায়, তাহলে পরের অবস্থানে যায়।

উপরোল্লিখিত নিয়ম থেকে রেগুলার এক্সপ্রেশন কিভাবে কাজ করে তা আমাদের কাছে সহজে বোধগম্য নই, চলুন এই প্যাটার্নটি `pattern:".+"` কিভাবে মিল খুঁজে তা বিস্তারিত দেখি।

1. আমাদের প্যাটার্নের প্রথম ক্যারাক্টারটি একটি উদ্ধৃতি চিহ্ন `pattern:"`।

    রেগুলার এক্সপ্রেশন ইঞ্জিন প্রদত্ত স্ট্রিংয়ের `subject:a "witch" and her "broom" is one` শূন্যতম অবস্থানে একটি উদ্ধৃতি চিহ্ন মেলানোর চেষ্টা করে, কিন্তু অই অবস্থানে ক্যারাক্টারটি হল `subject:a`, সুতরাং কোন মিল খুঁজে পাবে না।

    তারপর এটি এর পরবর্তী অবস্থানে যাবে: অই অবস্থানে প্রদত্ত স্ট্রিংয়ের সাথে প্যাটার্নের প্রথম ক্যারাক্টারটি মেলানোর চেষ্টা করে, এবং এটি মেলে না, অবশেষে ৩য় অবস্থানে এটি উদ্ধৃতি চিহ্নের সাথে মেলে:

    ![](witch_greedy1.svg)

2. উদ্ধৃতি চিহ্নের সাথে মিল হওয়ার পর, ইঞ্জিন বাকি প্যাটার্নটির মিল খুঁজে। ইঞ্জিন প্রদত্ত স্ট্রিংয়ের সাথে আমাদের প্যাটার্নের `pattern:.+"` মিল খুঁজে।

    এইক্ষত্রে, আমাদের প্যাটার্নের পরবর্তী ক্যারাক্টারটি হল `pattern:.` (একটি ডট ক্যারাক্টার)। এটি দ্বারা বুঝায় "নতুন লাইন ব্যাতীত সকল ক্যারাক্টার", সুতরাং স্ট্রিংয়ের পরবর্তী বর্ণ `match:'w'` এর সাথে মিল খুঁজে পায়:

    ![](witch_greedy2.svg)

3. এরপর ডটের সাথে কোয়ান্টিফায়ার `pattern:.+` থাকার কারনে রেগুলার এক্সপ্রেশন ইঞ্জিন পরবর্তী ক্যারাক্টার গুলোর সাথে মিলতে থাকে।

    ...কিন্তু কতক্ষণ পর্যন্ত? স্ট্রিংয়ের শেষ পর্যন্ত এর সকল সকল ক্যারাক্টার ডটের সাথে মেলতে থাকে:

    ![](witch_greedy3.svg)

4. এখন ইঞ্জিন এই প্যাটার্নের `pattern:.+` পুনরাবৃত্তি শেষে পরের প্যাটার্নটি খুঁজে। এটি হল উদ্ধৃতি চিহ্ন `pattern:"`। কিন্ত এখানে একটি সমস্যা আছে: প্যাটার্নের অবস্থান প্রদত্ত স্ট্রিংটির শেষে, এরপর আর কোন ক্যারাক্টার নেয়!

    রেগুলার এক্সপ্রেশন ইঞ্জিন বুঝতে পারে `pattern:.+` অনেক বেশী অগ্রসর হয়ে গেছে সুতরাং এটি মিলটিকে *ব্যাকট্রাক* বা প্রত্যাখ্যান করা শুরু করে।

    অন্যথায় বলা যায়, কোয়ান্টিফায়ারের জন্য একটি ক্যারাক্টার বাদ দেয়:

    ![](witch_greedy4.svg)

    এখন এটি ধরা যাক `pattern:.+` শেষ। স্ট্রিংয়ের শেষ অবস্থান হতে একটি ক্যারাক্টার নেয় এবং সেই অবস্থান থেকে বাকী প্যাটার্নটি মেলাতে চেষ্টা করে।

    যদি অই অবস্থানে উদ্ধৃতি চিহ্ন থাকে তবে আমাদের অনুসদ্ধানটি শেষ হবে, কিন্তু শেষ ক্যারাক্টারটি হল `subject:'e'`, সুতরাং কোন মিল হবেনা।

5. ...সুতরাং ইঞ্জিন `pattern:.+` এর জন্য আর একটি ক্যারাক্টার কমাবে:

    ![](witch_greedy5.svg)

    কিন্তু `pattern:'"'` উদ্ধৃতি চিহ্ন `subject:'n'` এর সাথে মেলেনা।

6. ইঞ্জিনটি ব্যাকট্র্যাকিং চালিয়ে যায়: এটি `pattern:'.'` এর জন্য ক্রমাগত অনুসন্ধানকৃত ফলাফলটিকে সংক্ষিপ্ত করতে থাকে যতক্ষণ পর্যন্ত আমাদের প্যাটার্নটির (এইক্ষেত্রে `pattern:'"'`) মিল শেষ হয়:

    ![](witch_greedy6.svg)

7. অনুসন্ধানটি সম্পূর্ন হয়।

8. সুতরাং আমাদের প্রথম অনুসন্ধানটি হল `match:"witch" and her "broom"`। যদি রেগুলার এক্সপ্রেশনে `pattern:g` ফ্ল্যাগটি থাকে, তাহলে অনুসন্ধানটি চলবে যেখানে প্রথম মিলটি শেষ হয়। বাকী স্ট্রিংয়ে `subject:is one` আর কোন উদ্ধৃতি চিহ্ন নেয়, সুতরাং অন্য কোন ফলাফল আসবে না।

যদিওবা এটি আমাদের চাহিদামত কাজ করেনি, কিন্তু আমরা বুঝতে পারছি এটি কিভাবে কাজ করে।

**গ্রীডি অবস্থায়(ডিফল্ট ভাবে) একটি কোয়ান্টিফায়ার যতবার সম্ভব এর পুনরাবৃত্তি ঘটায়।**

রেগুলার এক্সপ্রেশন ইঞ্জিন যত সম্ভব ক্যারাক্টার `pattern:.+` এর জন্য সংযোজন করে, এবং এরপর বাকী প্যাটার্ন না মিললে একটির পর একটি ক্যারাক্টার বাদ দিতে থাকে।

আমাদের টাস্কের জন্য আরো একটি বিষয় জানা উচিত। এই ক্ষেত্রে আমরা লেজি মোডের সাহায্য নিতে পারি।

## Lazy mode

The lazy mode of quantifiers is an opposite to the greedy mode. It means: "repeat minimal number of times".

We can enable it by putting a question mark `pattern:'?'` after the quantifier, so that it becomes  `pattern:*?` or `pattern:+?` or even `pattern:??` for `pattern:'?'`.

To make things clear: usually a question mark `pattern:?` is a quantifier by itself (zero or one), but if added *after another quantifier (or even itself)* it gets another meaning -- it switches the matching mode from greedy to lazy.

The regexp `pattern:/".+?"/g` works as intended: it finds `match:"witch"` and `match:"broom"`:

```js run
let regexp = /".+?"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // witch, broom
```

To clearly understand the change, let's trace the search step by step.

1. The first step is the same: it finds the pattern start `pattern:'"'` at the 3rd position:

    ![](witch_greedy1.svg)

2. The next step is also similar: the engine finds a match for the dot `pattern:'.'`:

    ![](witch_greedy2.svg)

3. And now the search goes differently. Because we have a lazy mode for `pattern:+?`, the engine doesn't try to match a dot one more time, but stops and tries to match the rest of the pattern  `pattern:'"'` right now:

    ![](witch_lazy3.svg)

    If there were a quote there, then the search would end, but there's `'i'`, so there's no match.
4. Then the regular expression engine increases the number of repetitions for the dot and tries one more time:

    ![](witch_lazy4.svg)

    Failure again. Then the number of repetitions is increased again and again...
5. ...Till the match for the rest of the pattern is found:

    ![](witch_lazy5.svg)

6. The next search starts from the end of the current match and yield one more result:

    ![](witch_lazy6.svg)

In this example we saw how the lazy mode works for `pattern:+?`. Quantifiers `pattern:*?` and `pattern:??` work the similar way -- the regexp engine increases the number of repetitions only if the rest of the pattern can't match on the given position.

**Laziness is only enabled for the quantifier with `?`.**

Other quantifiers remain greedy.

For instance:

```js run
alert( "123 456".match(/\d+ \d+?/) ); // 123 4
```

1. The pattern `pattern:\d+` tries to match as many digits as it can (greedy mode), so it finds  `match:123` and stops, because the next character is a space `pattern:' '`.
2. Then there's a space in the pattern, it matches.
3. Then there's `pattern:\d+?`. The quantifier is in lazy mode, so it finds one digit `match:4` and tries to check if the rest of the pattern matches from there.

    ...But there's nothing in the pattern after `pattern:\d+?`.

    The lazy mode doesn't repeat anything without a need. The pattern finished, so we're done. We have a match `match:123 4`.

```smart header="Optimizations"
Modern regular expression engines can optimize internal algorithms to work faster. So they may work a bit differently from the described algorithm.

But to understand how regular expressions work and to build regular expressions, we don't need to know about that. They are only used internally to optimize things.

Complex regular expressions are hard to optimize, so the search may work exactly as described as well.
```

## Alternative approach

With regexps, there's often more than one way to do the same thing.

In our case we can find quoted strings without lazy mode using the regexp `pattern:"[^"]+"`:

```js run
let regexp = /"[^"]+"/g;

let str = 'a "witch" and her "broom" is one';

alert( str.match(regexp) ); // witch, broom
```

The regexp `pattern:"[^"]+"` gives correct results, because it looks for a quote `pattern:'"'` followed by one or more non-quotes `pattern:[^"]`, and then the closing quote.

When the regexp engine looks for `pattern:[^"]+` it stops the repetitions when it meets the closing quote, and we're done.

Please note, that this logic does not replace lazy quantifiers!

It is just different. There are times when we need one or another.

**Let's see an example where lazy quantifiers fail and this variant works right.**

For instance, we want to find links of the form `<a href="..." class="doc">`, with any `href`.

Which regular expression to use?

The first idea might be: `pattern:/<a href=".*" class="doc">/g`.

Let's check it:
```js run
let str = '...<a href="link" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link" class="doc">
```

It worked. But let's see what happens if there are many links in the text?

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*" class="doc">/g;

// Whoops! Two links in one match!
alert( str.match(regexp) ); // <a href="link1" class="doc">... <a href="link2" class="doc">
```

Now the result is wrong for the same reason as our "witches" example. The quantifier `pattern:.*` took too many characters.

The match looks like this:

```html
<a href="....................................." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

Let's modify the pattern by making the quantifier `pattern:.*?` lazy:

```js run
let str = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Works!
alert( str.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

Now it seems to work, there are two matches:

```html
<a href="....." class="doc">    <a href="....." class="doc">
<a href="link1" class="doc">... <a href="link2" class="doc">
```

...But let's test it on one more text input:

```js run
let str = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let regexp = /<a href=".*?" class="doc">/g;

// Wrong match!
alert( str.match(regexp) ); // <a href="link1" class="wrong">... <p style="" class="doc">
```

Now it fails. The match includes not just a link, but also a lot of text after it, including `<p...>`.

Why?

That's what's going on:

1. First the regexp finds a link start `match:<a href="`.
2. Then it looks for `pattern:.*?`: takes one character (lazily!), check if there's a match for `pattern:" class="doc">` (none).
3. Then takes another character into `pattern:.*?`, and so on... until it finally reaches `match:" class="doc">`.

But the problem is: that's already beyond the link `<a...>`, in another tag `<p>`. Not what we want.

Here's the picture of the match aligned with the text:

```html
<a href="..................................." class="doc">
<a href="link1" class="wrong">... <p style="" class="doc">
```

So, we need the pattern to look for `<a href="...something..." class="doc">`, but both greedy and lazy variants have problems.

The correct variant can be: `pattern:href="[^"]*"`. It will take all characters inside the `href` attribute till the nearest quote, just what we need.

A working example:

```js run
let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
let regexp = /<a href="[^"]*" class="doc">/g;

// Works!
alert( str1.match(regexp) ); // null, no matches, that's correct
alert( str2.match(regexp) ); // <a href="link1" class="doc">, <a href="link2" class="doc">
```

## Summary

Quantifiers have two modes of work:

Greedy
: By default the regular expression engine tries to repeat the quantifier as many times as possible. For instance, `pattern:\d+` consumes all possible digits. When it becomes impossible to consume more (no more digits or string end), then it continues to match the rest of the pattern. If there's no match then it decreases the number of repetitions (backtracks) and tries again.

Lazy
: Enabled by the question mark `pattern:?` after the quantifier. The regexp engine tries to match the rest of the pattern before each repetition of the quantifier.

As we've seen, the lazy mode is not a "panacea" from the greedy search. An alternative is a "fine-tuned" greedy search, with exclusions, as in the pattern `pattern:"[^"]+"`.

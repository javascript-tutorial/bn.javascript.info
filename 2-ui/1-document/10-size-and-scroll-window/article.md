# Window sizes এবং scrolling

আমরা ব্রাউজার উইন্ডোর width এবং height কীভাবে পেতে পারি? scrolled out অংশটুকু সহ ডকুমেন্টের সম্পূর্ণ width এবং height পেতে পারি? জাভাস্ক্রিপ্টের সাহায্যে কীভাবে পেজে স্ক্রল করতে পারি?

এই সমস্ত তথ্যের জন্য আমরা রুট ডকুমেন্ট এলিমেন্ট `document.documentElement` ব্যবহার করতে পারি, যেটি দ্বারা বুঝানো হয় `<html>` ট্যাগ। তবে এর আরো কিছু মেথড এবং প্রপার্টি আছে।

## window এর Width/height

window এর Width/height জানার জন্য আমরা  `document.documentElement` এর `clientWidth/clientHeight` প্রপার্টি ব্যবহার করতে পারি:

![](document-client-width-height.svg)

```online
যেমন নিচের বাটনে ক্লিক করলে এটি আপনার বর্তমান window এর height দেখাবে:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="এটি `window.innerWidth/innerHeight` এর বিকল্প না"
ব্রাউজার `window.innerWidth/innerHeight` প্রপার্টি সাপোর্ট করে।  এটি আমাদের চাহিদামত মান প্রদান করে, তারপরও এদের ব্যবহার করা কেন অনুচিত?

যদি ডকুমেন্টে কোন স্ক্রলবার উপস্থিত থাকে, এবং এটি কিছু জায়গা নেই, `clientWidth/clientHeight` স্ক্রলবার ব্যতীত width/height এর মান রিটার্ন করে। অন্যভাবে বলতে গেলে এরা শুধুমাত্র দৃশ্যমান ডকুমেন্টের কন্টেন্টের width/height রিটার্ন করে।

যেখানে `window.innerWidth/innerHeight` স্ক্রলবারসহ মান রিটার্ন করে।

যদি স্ক্রলবার উপস্থিত থাকে, তাহলে এটি সামান্য পরিমান স্পেস নিতে পারে, যার ফলে নিচের কোডের জন্য ভিন্ন ভিন্ন মান দেখাতে পারে:
```js run
alert( window.innerWidth ); // সম্পূর্ণ window width
alert( document.documentElement.clientWidth ); // স্ক্রলবার ব্যতীত window width
```

বেশিরভাগ ক্ষেত্রে আমরা কোন এলিমেন্টকে window এর মধ্যে অবস্থান দিতে স্ক্রলবার ছাড়া *available* window width এর মান জানা লাগবে, এক্ষেত্রে আমরা ব্যবহার করব `documentElement.clientHeight/clientWidth`।
````

```warn header="সবার উপরে অবশ্যই `DOCTYPE` লিখতে হবে"
নোট করুন: `<!DOCTYPE HTML>` ব্যবহার না করলে টপ লেভেল জ্যামিতিক প্রপার্টিগুলো সঠিকভাবে কাজ নাও করতে পারে। এক্ষেত্রে অনাকাঙ্খীত মান দেখাতে পারে।

মডার্ন HTML এ অবশ্যই `DOCTYPE` লিখতে হবে।
```

## ডকুমেন্টের Width/height

তাত্ত্বিকভাবে, যেহেতু `document.documentElement` রুট ডকুমেন্ট, এবং এর মধ্যে সকল কন্টেন্ট অবস্থান করে, আমরা ডকুমেন্টের সম্পূর্ণ সাইজ `document.documentElement.scrollWidth/scrollHeight` এর মাধ্যমে নিতে পারে।

কিন্তু ঐ এলিমেন্টের জন্য সম্পূর্ণ পেজের প্রপার্টি সমূহ সঠিকভাবে কাজ নাও করতে পারে। Chrome/Safari/Opera, এর ক্ষেত্রে যদি কোন স্ক্রলবার না থাকে তাহলে `documentElement.scrollHeight` এর মান `documentElement.clientHeight` থেকে ছোট হতে পারে! ব্যাপারটা অদ্ভুত, তাই না?

এইক্ষেত্রে আমরা নিম্নোক্তভাবে সঠিক মানটি পেতে পারি:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

এমন কেন? এটি আপাতত না জানলেও হবে। তবে এই সমস্যার জন্য এটি একটি ভালো সমাধান।

## বর্তমান স্ক্রল পজিশনের মান [#page-scroll]

DOM এলিমেন্টের বর্তমান স্ক্রলের মান পেতে `scrollLeft/scrollTop` প্রপার্টি আছে।

বর্তমানের বেশিরভাগ ব্রাউজারে `document.documentElement.scrollLeft/scrollTop` কাজ করে, তবে কিছু পুরনো ইঞ্জিন যেমন WebKit, যেটি সাফারি ব্যবহার করে (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)) এদের ক্ষেত্রে `document.documentElement` এর পরিবর্তে `document.body` ব্যবহার করা উচিত।

সৌভাগ্যক্রমে, আমাদের এত ঝামেলা করার দরকার নেই, কেননা এর জন্য আরেকটি বিশেষ প্রপার্টি আছে `window.pageXOffset/pageYOffset`:

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

এগুলো read-only.

## স্ক্রলিং: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
পেজের কোন একটি অবস্থানে জাভাস্ক্রিপ্টের সাহায্যে স্ক্রল করতে, তবে এজন্য সম্পূর্ণ DOM বিল্ট হওয়া লাগবে।

যেমন যদি আমরা `<head>` এর কোন স্ক্রিপ্ট থেকে স্ক্রল করতে চাই এটি কাজ করবে না।
```

বেশিরভাগ এলিমেন্ট স্ক্রল করা যেতে পারে `scrollTop/scrollLeft` এর মাধ্যমে।

এটি আমরা এভাবেও করতে পারি `document.documentElement.scrollTop/scrollLeft` (কেবল Safari ব্যতীত, এক্ষেত্রে  `document.body.scrollTop/Left` ব্যবহার করতে হবে)।

বিকল্প হিসেবে, আরো সহজ একটি সমাধান আছে [window.scrollBy(x,y)](mdn:api/Window/scrollBy) এবং [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo)।

- `scrollBy(x,y)` মেথডটি আমাদের বর্তমান অবস্থানের উপর ভিত্তি করে স্ক্রল করবে। যেমন `scrollBy(0,10)` এর জন্য `10px` নিচে নামবে।

    ```online
    বাটনটিতে ক্লিক করলে বুঝতে পারবেন:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- `scrollTo(pageX,pageY)` মেথডটি টপ-লেভেল রুট এলিমেন্টের top-left উপর ভিত্তি করে কাজ করে।

    পেজের একদম শুরুতে যেতে আমরা ব্যবহার করতে পারি `scrollTo(0,0)`।

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

এরা সকল ব্রাউজারের জন্য কাজ করে।

## scrollIntoView

চলুন, নতুন আরো একটি মেথড সম্পর্কে জানি : [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView)।

আমরা কোন একটি `elem` এর অবস্থানে স্ক্রল পজিশন সেট করতে ব্যবহার করি `elem.scrollIntoView(top)`। এটি একটি আর্গুমেন্ট নেয়:

- `top=true` (এটি ডিফল্ট), এর জন্য স্ক্রল পজিশন এলিমেন্টের উপরের অংশটুকুর জন্য সেট হয়। অর্থাৎ আপনি যদি কোন একটি এলিমেন্টে নেভিগেশন করতে চান এক্ষেত্রে `scrollIntoView()` ব্যবহার করতে পারেন।
- `top=false`, এর জন্য স্ক্রল পজিশন এলিমেন্টের নিচের দিকের অংশটুকুর জন্য সেট হয়।

```online
নিচের বাটনে ক্লিক করলে এটি `scrollIntoView` সেকশনের উপরের অংশে স্ক্রল পজিশন সেট করে:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

এবং এই বাটনে ক্লিক করলে এটি `scrollIntoView` সেকশনের নিচের অংশে স্ক্রল পজিশন সেট করে:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## স্ক্রলিংকে আটকানো

অনেকসময় আমরা আমাদের ডকুমেন্টের স্ক্রলিং ফিচারটিকে রোধ করতে চাই। যেমন যদি আমাদের এমন একটি গুরুত্বপূর্ণ মেসেজসহ কভার পেজ আছে, যেটির কোন মেসেজ দ্বারা ভিজিটরকে আকৃষ্ট করতে চাই।

কোন একটি এলিমেন্টকে আনস্ক্রলেবল করতে চাইলে, এভাবে করতে পারি `document.body.style.overflow = "hidden"`। এর ফলে আমাদের পেজটি বর্তমান স্ক্রলিং পজিশনে স্থির (freeze) হয়ে যাবে।

```online
এটি দেখুন:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

প্রথম বাটনের জন্য স্ক্রলিং ফিচার বন্ধ হয়ে যাবে, এবং দ্বিতীয়টির জন্য এটি পুনরায় স্ক্রলেবল হবে।
```

এভাবে শুধু `document.body` এলিমেন্টের জন্য না আমরা যেকোন এলিমেন্টের জন্য এভাবে স্ক্রলিং বন্ধ বা চালু করতে পারি।

তবে এটির একটি সমস্যা হল এর ফলে আমাদের স্ক্রলবারটি অদৃশ্য হয়ে যায়। যার ফলে কিছু জায়গা তৈরি হয় এবং এখানে কন্টেন্ট সমূহ কিছু জায়গা নিতে পারে।

এটি দেখতে কিছুটা বিদঘুটে লাগতে পারে, তবে এক্ষেত্রে আমরা চাইলে `clientWidth` এর সহায়তা নিতে পারি। যখন আমাদের স্পেসবার অদৃশ্য হয়ে যায়, তখন আমরা কিছুটা `padding` সেট করে দিতে পারি, যার ফলে পার্থক্য বুঝা যাবে না।

## সারাংশ

এলিমেন্টের সাইজ:

- দৃশ্যমান ডকুমেন্টের (content area width/height) এর Width/height পেতে: `document.documentElement.clientWidth/clientHeight`
- অদৃশ্য অংশটুকুর মান সহ Width/height পেতে:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

স্ক্রলিং:

- বর্তমান স্ক্রলিং পজিশনের মান জানতে: `window.pageYOffset/pageXOffset`.
- প্রোগ্রামাটিক্যালী স্ক্রলিং করতে:

    - `window.scrollTo(pageX,pageY)` -- পেজের একদম শুরুতে যেতে,
    - `window.scrollBy(x,y)` -- বর্তমান পজিশনের উপর ভিত্তি করে স্ক্রল করতে,
    - `elem.scrollIntoView(top)` -- কোন একটি এলিমেন্টের `elem` পজিশনে স্ক্রল করতে (`true/false` ডকুমেন্টের উপরের বা নিচের অবস্থানে যেতে).

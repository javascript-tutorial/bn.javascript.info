# এলিমেন্টের সাইজ এবং স্ক্রলিং

কোন একটি এলিমেন্টের width, height এবং এর কো-অর্ডিনেটের আরো অন্যান্য মান জানতে জাভাস্ক্রিপ্টের কিছু প্রপার্টি আছে।

প্রোগ্রামাটিক্যালি জাভাস্ক্রিপ্টের সাহায্যে কোন একটি এলিমেন্টকে সরাতে বা কোন একটি নির্দিষ্ট স্থানে বসাতে এই প্রপার্টিসমূহ সম্পর্কে জানতে হয়।

## একটি এলিমেন্ট

এই ধরণের প্রপার্টিগুলো সম্পর্কে জানতে চলুন নিচের এলিমেন্টটি দেখি:

```html no-beautify
<div id="example">
  ...Text...
</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #E8C48F;
    padding: 20px;
    overflow: auto;
  }
</style>
```

এটির বর্ডার, প্যাডিং এবং স্ক্রলিং আছে। যা প্রপার্টির সম্পূর্ণ সেট। যেহেতু মার্জিন এলিমেন্টের সাথে সম্পর্কিত নয়, তাই এটি এখানে ব্যবহার করা হয়নি।

এলিমেন্টটি জ্যামিতিকভাবে দেখতে এমন:

![](metric-css.svg)

লাইভ দেখুন [open the document in the sandbox](sandbox:metric).

```smart header="স্ক্রলবার সম্পর্কে কিছু কথা"
উপরের ছবিটিতে দেখছি এলিমেন্টের একটি স্ক্রলবার আছে। অনেক ব্রাউজার (সব না) স্ক্রলবারের width নিবে তার কন্টেন্ট এর width থেকে (ছবিতে "content width" এর লেভেলটি লক্ষ্য করুন)।

সুতরাং স্ক্রলবার ছাড়া আমাদের কন্টেন্ট এর width হবে `300px`, মনে করুন scrollbar এর width হল `16px` (ডিভাইসভেদে যা আলাদা হয়) সুতরাং কন্টেন্ট এর width হবে `300 - 16 = 284px`। এজন্য এখানে আমরা স্ক্রলবারসহ একটি উদাহরণ নিয়েছি, স্ক্রলবার ছাড়া এলিমেন্টের width হত `300px`।
```

```smart header="স্ক্রলেবল এলিমেন্টের জন্য `padding-bottom` সবার নিচে দেখাবে"
যদিও ছবিতে padding-bottom দেখাচ্ছে, কিন্তু যদি আমাদের এলিমেন্টে অনেক টেক্সট থাকে তাহলে এটি ওভারফ্লো হবে, এবং `padding-bottom` সবার নিচে দেখাবে।
```

## জ্যামিতিক প্রপার্টি

নিচে জ্যামিতিক প্রপার্টিসহ একটি সামগ্রিক ছবি দেখানো হল:

![](metric-all.svg)

প্রপার্টি এর মান যদিও পূর্ণসংখ্যা দেখায়, তবে এদের একক পিক্সেল।

চলুন প্রথমে এলিমেন্টের আউটার(বাহিরের) প্রপার্টিগুলো নিয়ে বিস্তারিত জানি।

## offsetParent, offsetLeft/Top

যদিও এই প্রপার্টিগুলো তেমন ব্যবহার করা হয় না, কিন্তু এরা এলিমেন্টের আউটার(বাহিরের) প্রপার্টি, এবং এদের সম্পর্কে আমাদের জেনে রাখা উচিত।

`offsetParent` হল ইমিডিয়েট প্যারেন্ট যার উপর ভিত্তি করে রেন্ডারিংয়ের সময় ব্রাউজার কো-অর্ডিনেট গণনা করে।

ইমিডিয়েট প্যারেন্টগুলো হতে পারে:

1. CSS-positioned (`position:` `absolute`, `relative`, `fixed` বা `sticky`),  বা
2. `<td>`, `<th>`, বা `<table>`,  বা
3. `<body>`.

`offsetParent` এর top-left কর্ণারের উপর উপর ভিত্তি করে `offsetLeft/offsetTop` প্রপার্টি `x/y` কো-অর্ডিনেট এর মান রিটার্ন করে।

নিচের উদাহরণে `<div>` এর `offsetParent` হিসেবে `<main>` আছে এবং `offsetLeft/offsetTop` এর top-left কর্ণারের মান হবে (`180`):

```html run height=10
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
  alert(example.offsetTop); // 180
</script>
```

![](metric-offset-parent.svg)

বিভিন্ন কারণে `offsetParent` এর মান `null` হতে পারে:

1. এলিমেন্টটি UI তে না দেখালে (`display:none` বা DOM এ না থাকলে)।
2. `<body>` এবং `<html>` এর জন্য।
3. `position:fixed` এলিমেন্টের জন্য।

## offsetWidth/Height

এখন চলুন এলিমেন্টের প্রপার্টিগুলো দেখি।

এরা এলিমেন্টের কন্টেন্টের বাইরের width/height সহ মান রিটার্ন করে, অর্থাৎ উভয়পাশের `padding` এবং `border` এর মানও সংযুক্ত হয়।

![](metric-offset-width-height.svg)

উপরে উদাহরণে বর্ণিত এলিমেন্টের জন্য:

- `offsetWidth = 390` -- সম্পূর্ন এলিমেন্টের width, inner CSS-width (`300px`) সাথে paddings (`2 * 20px`) এবং borders (`2 * 25px`) এর সমষ্টি।
- `offsetHeight = 290` -- সম্পূর্ন এলিমেন্টের height।

````smart header="যেসব এলিমেন্ট UI তে দৃশ্যমান না তাদের জন্য মান হতে পারে শূন্য/নাল"
শুধুমাত্র UI তে দৃশ্যমান জ্যামিতিক প্রপার্টিগুলোর মান দেখাবে।

যদি কোন একটি এলিমেন্ট (বা প্যারেন্ট এলিমেন্টে) `display:none` থাকে অথবা এটি DOM এর সাথে সংযুক্ত না হলে, তাহলে সকল জ্যামিতিক প্রপার্টির মান হবে শূন্য (বা `offsetParent` এর জন্য হবে `null`)

যেমন, যখন কোন একটি এলিমেন্ট তৈরি হয় কিন্তু এলিমেন্টটি DOM এ সংযুক্ত করা হয়নি বা এলিমেন্টের কোন একটি প্যারেন্ট নোডের স্ট্যাইল হল `display:none` তখন এর `offsetParent` হবে `null`, এবং `offsetWidth`, `offsetHeight` হবে `0`।

কোন একটি এলিমেন্ট অদৃশ্য(hidden) অবস্থায় আছে কিনা তা যাচাই করতে পারি, এভাবে:

```js
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

দয়া করে নোট করুন যদি কোন একটি এলিমেন্ট UI তে বিদ্যমান থাকে কিন্তু এর সাইজ শূন্য (যেমন একটি এম্পটি `<div>`) এক্ষেত্রে `isHidden` রিটার্ন করবে `true`।
````

## clientTop/Left

এলিমেন্টটিতে বর্ডার আছে।

এদের পরিমাপের জন্য প্রপার্টিগুলো হল `clientTop` এবং `clientLeft`।

আমাদের উদাহরণে:

- `clientLeft = 25` -- বামের বর্ডারের(left border) width
- `clientTop = 25` -- উপরের বর্ডারের(top border) width

![](metric-client-left-top.svg)

...তবে সুনির্দিষ্টভাবে বলতে গেলে -- এই প্রপার্টিগুলো বর্ডারের width/height নির্দেশ করে না, এরা আউটার সাইড হতে ইনার সাইডের কো-অর্ডিনেট রিটার্ন করে।

পার্থক্যটি কি?

আমাদের ডকুমেন্টের কন্টেন্ট ডান-থেকে-বামে (যেমন আরবী বা হিব্রুর জন্য) দেখায়। এক্ষেত্রে স্ক্রলবার ডানের পরিবর্তে বামে দেখায়, এবং তারপর `clientLeft` স্ক্রলবারের width সহ দেখাবে।

এক্ষেত্রে, `clientLeft` এর মান `25`এর পরিবর্তে স্ক্রলবারের width সহ হবে `25 + 16 = 41`।

হিব্রুর জন্য একটি উদাহরণ দেখুন:

![](metric-client-left-top-rtl.svg)

## clientWidth/Height

এই প্রপার্টিদুটি এলিমেন্টের বর্ডারের ভেতরের অংশটুকু দেখায় (তবে স্ক্রলবার ছাড়া)।

এর মান হবে স্ক্রলবার ব্যতীত ভিতরের কন্টেন্ট এবং প্যাডিংয়ের মানের সমষ্টি:

![](metric-client-width-height.svg)

উপরের ছবিটিতে প্রথমে `clientHeight` কে বিবেচনা করুন।

এখানে কোন horizontal (বাম-ডান) স্ক্রলবার নেই, সুতরাং এর মান হবে বর্ডারের ভিতরের মানটি অর্থাৎ: CSS-height `200px` এবং paddings (`2 * 20px`) এর সমষ্টি `240px`।

এবং `clientWidth` হবে -- এখানে স্ক্রলবার ছাড়া content width হবে `284px`, স্ক্রলবারের কারণে এর মান `300px` হবে না। সুতরাং এর মান হবে content width `284px` এবং paddings (`2 * 20px`) এর সমষ্টি `324px`।

**যদি কোন `padding` না থাকে, তাহলে বর্ডার এবং স্ক্রলবারের(যে কোন একটি থাকলে) এর মধ্যে `clientWidth/Height` এর মান হবে content area এর সমান।**

![](metric-client-width-nopadding.svg)

সুতরাং যদি কোন `padding` না থাকে তাহলে content area এর মান পেতে আমরা ব্যবহার করতে পারি `clientWidth/clientHeight`।

## scrollWidth/Height

এরা `clientWidth/clientHeight` এর মত, তবে এটি স্ক্রলবারের অদৃশ্য(hidden) অংশটুকুর মানগুলোও সংযুক্ত করে:

![](metric-scroll-width-height.svg)

উপরের ছবিটিতে দেখছেন:

- `scrollHeight = 723` -- আমাদের সম্পূর্ণ content area এর উচ্চতার অর্থাৎ স্ক্রলবারের অদৃশ্য(hidden) অংশটুকুর মান।
- `scrollWidth = 324` -- বর্ডারের ভিতর যেহেতু কোন আনুভূমিক (বাম-ডান বা horizontal) স্ক্রলবার নেই সুতরাং এর মান হবে `clientWidth` এর সমান।

আমরা কোন এলিমেন্টের সম্পূর্ন দৈর্ঘ্য বা প্রস্থের মান জানতে এই প্রপার্টিগুলো ব্যবহার করতে পারি।

যেমন:

```js
// expand the element to the full content height
element.style.height = `${element.scrollHeight}px`;
```

```online
এলিমেন্টকে বিস্তৃত করতে বাটনে ক্লিক করুন:

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</div>

<button style="padding:0" onclick="element.style.height = `${element.scrollHeight}px`">element.style.height = `${element.scrollHeight}px`</button>
```

## scrollLeft/scrollTop

`scrollLeft/scrollTop` প্রপার্টিগুলো হল স্ক্রলেবল এলিমেন্টের অদৃশ্য width/height।

নিচের ছবিতে আমরা ভার্টিকেল স্ক্রলের জন্য `scrollHeight` এবং `scrollTop` প্রপার্টি দেখছি।

![](metric-scroll-top.svg)

অন্যভাবে বলা যায়, `scrollTop` হল "কতটুকু স্ক্রল করা হয়েছে"।

````smart header="`scrollLeft/scrollTop` এর মান অ্যাসাইন করা যায়"
বেশিরভাগ জ্যামিতিক প্রপার্টি শুধুমাত্র read-only, কিন্তু `scrollLeft/scrollTop` এর মান রি-অ্যাসাইন করা যায়, এবং ব্রাউজার সে অনুযায়ী এলিমেন্টকে স্ক্রল করতে পারে।

```online
যদি আপনি নিচের এলিমেন্টে ক্লিক করেন তাহলে এটি `elem.scrollTop += 10` এক্সিকিউট করে। যার ফলে এলিমেন্টের কন্টেন্ট `10px`নিচে নামবে।

<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

`scrollTop` এর মান `0` বা এর বেশি সেট করা উচিত, যেমন `1e9` এলিমেন্টকে যথাক্রমে উপর নিচে স্ক্রল করবে।
````

## CSS হতে width/height এর মান না নেয়া

ইতোমধ্যে আমরা DOM এলিমেন্টের জ্যামিতিক প্রপার্টিগুলো জেনেছি, যার সাহায্যে আমরা এলিমেন্টের width/height এবং অন্যান্য প্রপার্টিগুলো পেতে ব্যবহার করতে পারি।

আমরা পূর্বের <info:styles-and-classes> এই অধ্যায়ে দেখেছি, আমরা CSS এর width/height জানার জন্য `getComputedStyle` ব্যবহার করতে পারব।

তবে কোন এলিমেন্টের width/height জানতে `getComputedStyle` ব্যবহার করা উচিত হবে না, যেমন

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // এলিমেন্টের CSS width দেখাবে
```

এর পরিবর্তে আমাদের কেন জ্যামিতিক প্রপার্টিগুলো ব্যবহার করা উচিত? এর দুটি কারণ আছে:

1. প্রথমত, CSS `width/height` অন্যান্য প্রপার্টির উপর নির্ভর করে: যেমন `box-sizing` যার ফলে width এবং height নির্ভর করে। CSS এর জন্য `box-sizing` ব্যবহারের ফলে আমাদের JavaScript এর মান সঠিক নাও দেখাতে পারে।
2. দ্বিতীয়ত, CSS `width/height` হতে পারে `auto`, যেমন ইনলাইন এলিমেন্টের জন্য:

    ```html run
    <span id="elem">Hello!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

    এক্ষেত্রে CSS এর জন্য, `width:auto` থাকা স্বাভাবিক, তবে এক্ষেত্রে আমাদের সাইজ `px` এ জানা লাগতে পারে, যার ফলে CSS width এখানে ব্যবহারে কাজে আসবে না।

আরো একটি কারণ হল, স্ক্রলবার। অনেকসময় কোড সঠিকভাবে কাজ করলেও স্ক্রলবারের জন্য কোডটি **buggy** হতে পারে, কেননা কিছু ব্রাউজারে স্ক্রলবার কন্টেন্ট হতে কিছু স্পেস নেয়। যার ফলে কন্টেন্টের অরিজিনাল width/height আরো কম হবে। এক্ষেত্রে `clientWidth/clientHeight` সঠিক মান দিবে।

...তবে `getComputedStyle(elem).width` ব্রাউজারভেদে আলাদা আলাদা কাজ করে। কিছু ব্রাউজারে যেমন (Chrome) এটি স্ক্রলবার ব্যতীত অরিজিনাল inner-width এর মান রিটার্ন করে আবার কিছু ব্রাউজার (যেমন Firefox) স্ক্রলবার সহ মান রিটার্ন করে। এক্ষেত্রে ক্রস ব্রাউজার সাপোর্টের width/height এর মান নেয়ার জন্য আমাদের `getComputedStyle` ব্যবহার করা উচিত নই।

```online
এখানে আপনি পরীক্ষা করে দেখতে পারেন।

[iframe src="cssWidthScroll" link border=1]

স্ক্রলবার সহ এলিমেন্টের অরিজিনাল `width:300px`।

ডেস্কটপে Windows OS, Firefox, Chrome, Edge সব ব্রাউজার স্ক্রলবার সংরক্ষন করে। তবে এখানে ফায়ারফক্স দেখাবে `300px`, যেখানে অন্যান্য ব্রাউজার Chrome এবং Edge width এর মান আরো কম দেখাবে।
```

দয়া করে মনে রাখুন এটি শুধুমাত্র জাভাস্ক্রিপ্টের সাহায্যে `getComputedStyle(...).width` এর মান নিতে পার্থক্য হতে পারে, তবে দৃশ্যমান সব সঠিক হতে পারে।

## সারাংশ

একটি এলিমেন্টের নিম্নোক্ত জ্যামিতিক প্রপার্টিগুলো আছে:

- `offsetParent` -- ইমিডিয়েট প্যারেন্ট যার মধ্যে এলিমেন্টটির অবস্থান অথবা `td`, `th`, `table`, `body`।
- `offsetLeft/offsetTop` -- `offsetParent` এর উপর ভিত্তি করে upper-left এর দিকের কোঅর্ডিনেট.
- `offsetWidth/offsetHeight` -- এলিমেন্টের "outer" width/height(বর্ডারসহ)।
- `clientLeft/clientTop` -- upper-left "outer" কর্নার হতে upper-left "inner" কর্নারের দূরত্ব। left-to-right কন্টেন্টের এর জন্য OS সর্বদা left/top বর্ডারের width সহ হবে। right-to-left এর জন্য ভার্টিকেল স্ক্রলবার left এ অবস্থান করে, তাই এখানে `clientLeft` এর width ও সংযুক্ত হবে।
- `clientWidth/clientHeight` -- কন্টেন্টের অরিজিনাল width/height, স্ক্রলবার ব্যাতীত।
- `scrollWidth/scrollHeight` -- এটিও কন্টেন্টের width/height রিটার্ন করে `clientWidth/clientHeight` এর মত, তবে এটি সম্পূর্ণ কন্টেন্টের সাইজ রিটার্ন করে, অর্থাৎ স্ক্রলবারের কারণে এলিমেন্টের অদৃশ্য কন্টেন্টসহ।
- `scrollLeft/scrollTop` -- এলিমেন্টের স্ক্রল করা অংশের width/height, upper-left কর্নার হতে শুরু হয়।

`scrollLeft/scrollTop` ব্যতীত বাকীসব প্রপার্টি read-only।
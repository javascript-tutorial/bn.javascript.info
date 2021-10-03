# Element size and scrolling

অনেক জাভাস্ক্রিপ্ট প্রপার্টি আছে যাদের সাহায্যে আমরা এলিমেন্টের width, height এবং অন্যান্য জ্যামিতিক মান জানতে পারি।

জাভাস্ক্রিপ্টের সাহায্যে এলিমেন্টের পজিশন বা মুভমেন্ট সম্পর্কে জানতে প্রায় এদের প্রয়োজন হয়।

## Sample element

প্রপার্টিগুলো সম্পর্কে আরো জানতে আমরা নিচের এলিমেন্টটি দেখি:

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

এটির বর্ডার, প্যাডিং এবং স্ক্রলিং আছে। যা প্রপার্টির সম্পূর্ণ সেট। এখানে কোন মার্জিন নেই, যেহেতু এটি এলিমেন্টের অংশ নই, এবং তাদের অন্য কোন বিশেষ প্রপার্টি নেই।

এলিমেন্টটি দেখতে:

![](metric-css.svg)

লাইভ দেখুন [open the document in the sandbox](sandbox:metric).

```smart header="স্ক্রলবার সম্পর্কে কিছু কথা"
উপরের ছবিটিতে দেখছি এলিমেন্টের একটি স্ক্রলবার আছে। অনেক ব্রাউজার (সব না) স্ক্রলবারের width নিবে তার কন্টেন্ট এর width থেকে (ছবিতে "content width" এর লেভেলটি লক্ষ্য করুন)।

সুতরাং স্ক্রলবার ছাড়া আমাদের কন্টেন্ট এর width হবে `300px`, মনে করুন scrollbar এর width হল `16px` (ডিভাইসভেদে যা আলাদা হয়) সুতরাং কন্টেন্ট এর width হবে `300 - 16 = 284px`। এজন্য এখানে আমরা স্ক্রলবারসহ একটি উদাহরণ নিয়েছি, স্ক্রলবার ছাড়া এলিমেন্টের ক্যালকুলেশন হত একেবারে সহজ।
```

```smart header="`padding-bottom` কন্টেন্ট দ্বারা পূর্ণ হতে পারে"
ছবিতে padding-bottom দেখাতে পারে, কিন্তু যদি আমাদের এলিমেন্টে অনেক টেক্সট থাকে তাহলে এটি ওভারফ্লো অর্থাৎ দেখাবে হবে, এবং `padding-bottom` সবার নিচে দেখাবে।
```

## জ্যামিতিক প্রপার্টি

নিচে জ্যামিতিক প্রপার্টিসহ একটি সামগ্রিক ছবি দেখানো হল:

![](metric-all.svg)

প্রপার্টিগুলোর মান নাম্বার, তবে এটি দ্বারা পিক্সেল মান বুঝায়, সুতরাং এরা পিক্সেলে পরিমাপ করে।

চলুন প্রথমে এলিমেন্টের বাহিরের প্রপার্টিগুলো নিয়ে বিস্তারিত জানি।

## offsetParent, offsetLeft/Top

এই প্রপার্টিগুলো কদাচিৎ ব্যবহার করা হয়, কিন্তু এরা এলিমেন্টের সবচেয়ে বাহিরের জ্যামিতিক প্রপার্টি, এবং এদের সম্পর্কে আমাদের জেনে রাখা উচিত।

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

1. এলিমেন্ট UI তে না দেখালে (`display:none` বা DOM এ না থাকলে)।
2. `<body>` এবং `<html>` এর জন্য।
3. `position:fixed` এলিমেন্টের জন্য।

## offsetWidth/Height

এখন চলুন এলিমেন্টের প্রপার্টিগুলো দেখি।

এই প্রপার্টি দুটি এলিমেন্টের "বাইরের" width/height প্রদান করে। অথবা, অন্যভাবে বলতে গেলে বর্ডারসহ সম্পূর্ন এলিমেন্টের সাইজ।

![](metric-offset-width-height.svg)

উপরে উদাহরণে বর্ণিত এলিমেন্টের জন্য:

- `offsetWidth = 390` -- সম্পূর্ন এলিমেন্টের width, inner CSS-width (`300px`) সাথে paddings (`2 * 20px`) এবং borders (`2 * 25px`) এর সমষ্টি।
- `offsetHeight = 290` -- সম্পূর্ন এলিমেন্টের height।

````smart header="যেসব এলিমেন্ট UI তে দৃশ্যমান না তাদের জন্য মান হতে পারে শূন্য/নাল"
শুধুমাত্র UI তে দৃশ্যমান জ্যামিতিল প্রপার্টিগুলোর মান দেখাবে।

যদি কোন একটি এলিমেন্ট (বা প্যারেন্ট এলিমেন্টে) `display:none` থাকে অথবা এটি DOM এর অংশ না হলে, তাহলে সকল জ্যামিতিক প্রপার্টির মান হবে শূন্য (বা `offsetParent` এর জন্য হবে `null`)

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

...তবে সুনির্দিষ্টভাবে বলতে গেলে -- এই প্রপার্টিগুলো বর্ডারের width/height নির্দেশ করে না, but rather relative coordinates of the inner side from the outer side।

পার্থক্যটি কি?

আমাদের ডকুমেন্টের কন্টেন্ট ডান-থেকে-বামে (অপারেটিং সিস্টেম আরবী বা হিব্রুর জন্য) দেখায়। তাহলে স্ক্রলবারটি ডানের পরিবর্তে বামে দেখাবে, এবং তারপর `clientLeft` স্ক্রলবারের width সহ দেখাবে।

এক্ষেত্রে, `clientLeft` এর মান `25`এর পরিবর্তে স্ক্রলবারের width সহ হবে `25 + 16 = 41`।

হিব্রুর জন্য একটি উদাহরণ দেখুন:

![](metric-client-left-top-rtl.svg)

## clientWidth/Height

এই প্রপার্টিদুটি এলিমেন্টের বর্ডারের ভেতরের অংশটুকু দেখায়।

এর মান হবে স্ক্রলবার ব্যতীত ভিতরের কন্টেন্ট এবং প্যাডিংয়ের মানের সমষ্টি:

![](metric-client-width-height.svg)

উপরের ছবিটিতে প্রথমে `clientHeight` কে বিবেচনা করুন।

এখানে কোন আনুভূমিক (বাম-ডান বা horizontal) স্ক্রলবার নেই, সুতরাং এর মান হবে বর্ডারের ভিতরের মানটি অর্থাৎ: CSS-height `200px` এবং paddings (`2 * 20px`) এর সমষ্টি `240px`।

এবং `clientWidth` হবে -- এখানে স্ক্রলবার ছাড়া content width হবে `284px`, স্ক্রলবারের কারণে এর মান `300px` হবে না। সুতরাং এর মান হবে content width `284px` এবং paddings (`2 * 20px`) এর সমষ্টি `324px`।

**যদি কোন প্যাডিং না থাকে, তাহলে বর্ডার এবং স্ক্রলবারের(যে কোন একটি থাকলে) এর মধ্যে `clientWidth/Height` এর মান হবে content area এর সমান।**

![](metric-client-width-nopadding.svg)

সুতরাং যদি কোন প্যাডিং না থাকে তাহলে content area এর মান পেতে আমরা ব্যবহার করতে পারি `clientWidth/clientHeight`।

## scrollWidth/Height

এরা `clientWidth/clientHeight` এর মত, তবে এটি স্ক্রলবারের অদৃশ্য(hidden) অংশটুকুর মানগুলোও সংযুক্ত করে:

![](metric-scroll-width-height.svg)

উপরের ছবিটিতে দেখছেন:

- `scrollHeight = 723` -- আমাদের সম্পূর্ণ content area এর উচ্চতার অর্থাৎ স্ক্রলবারের অদৃশ্য(hidden) অংশটুকুর মান।
- `scrollWidth = 324` -- বর্ডারের ভিতর যেহেতু কোন আনুভূমিক (বাম-ডান বা horizontal) স্ক্রলবার নেই সুতরাং এর মান হবে `clientWidth` এর সমান।

আমরা এলিমেন্টের সম্পূর্ন প্রপার্টির মান জানতে এই প্রপার্টিগুলো ব্যবহার করতে পারি।

যেমন:

```js
// expand the element to the full content height
element.style.height = `${element.scrollHeight}px`;
```

```online
Click the button to expand the element:

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</div>

<button style="padding:0" onclick="element.style.height = `${element.scrollHeight}px`">element.style.height = `${element.scrollHeight}px`</button>
```

## scrollLeft/scrollTop

Properties `scrollLeft/scrollTop` are the width/height of the hidden, scrolled out part of the element.

On the picture below we can see `scrollHeight` and `scrollTop` for a block with a vertical scroll.

![](metric-scroll-top.svg)

In other words, `scrollTop` is "how much is scrolled up".

````smart header="`scrollLeft/scrollTop` can be modified"
Most of the geometry properties here are read-only, but `scrollLeft/scrollTop` can be changed, and the browser will scroll the element.

```online
If you click the element below, the code `elem.scrollTop += 10` executes. That makes the element content scroll `10px` down.

<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

Setting `scrollTop` to `0` or a big value, such as `1e9` will make the element scroll to the very top/bottom respectively.
````

## Don't take width/height from CSS

We've just covered geometry properties of DOM elements, that can be used to get widths, heights and calculate distances.

But as we know from the chapter <info:styles-and-classes>, we can read CSS-height and width using `getComputedStyle`.

So why not to read the width of an element with `getComputedStyle`, like this?

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // show CSS width for elem
```

Why should we use geometry properties instead? There are two reasons:

1. First, CSS `width/height` depend on another property: `box-sizing` that defines "what is" CSS width and height. A change in `box-sizing` for CSS purposes may break such JavaScript.
2. Second, CSS `width/height` may be `auto`, for instance for an inline element:

    ```html run
    <span id="elem">Hello!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

    From the CSS standpoint, `width:auto` is perfectly normal, but in JavaScript we need an exact size in `px` that we can use in calculations. So here CSS width is useless.

And there's one more reason: a scrollbar. Sometimes the code that works fine without a scrollbar becomes buggy with it, because a scrollbar takes the space from the content in some browsers. So the real width available for the content is *less* than CSS width. And `clientWidth/clientHeight` take that into account.

...But with `getComputedStyle(elem).width` the situation is different. Some browsers (e.g. Chrome) return the real inner width, minus the scrollbar, and some of them (e.g. Firefox) -- CSS width (ignore the scrollbar). Such cross-browser differences is the reason not to use `getComputedStyle`, but rather rely on geometry properties.

```online
If your browser reserves the space for a scrollbar (most browsers for Windows do), then you can test it below.

[iframe src="cssWidthScroll" link border=1]

The element with text has CSS `width:300px`.

On a Desktop Windows OS, Firefox, Chrome, Edge all reserve the space for the scrollbar. But  Firefox shows `300px`, while Chrome and Edge show less. That's because Firefox returns the CSS width and other browsers return the "real" width.
```

Please note that the described difference is only about reading `getComputedStyle(...).width` from JavaScript, visually everything is correct.

## Summary

Elements have the following geometry properties:

- `offsetParent` -- is the nearest positioned ancestor or `td`, `th`, `table`, `body`.
- `offsetLeft/offsetTop` -- coordinates relative to the upper-left edge of `offsetParent`.
- `offsetWidth/offsetHeight` -- "outer" width/height of an element including borders.
- `clientLeft/clientTop` -- the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so `clientLeft` includes its width too.
- `clientWidth/clientHeight` -- the width/height of the content including paddings, but without the scrollbar.
- `scrollWidth/scrollHeight` -- the width/height of the content, just like `clientWidth/clientHeight`, but also include scrolled-out, invisible part of the element.
- `scrollLeft/scrollTop` -- width/height of the scrolled out upper part of the element, starting from its upper-left corner.

All properties are read-only except `scrollLeft/scrollTop` that make the browser scroll the element if changed.

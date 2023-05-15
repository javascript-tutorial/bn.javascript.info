libs:
  - d3
  - domtree

---

# DOM ট্রি

ট্যাগস হল HTML ডকুমেন্ট এর মেরুদন্ড।

ডকুমেন্ট অবজেক্ট মডেল(DOM) অনুসারে HTML এর প্রতিটি ট্যাগ হল একটি অবজেক্ট। নেস্টেড ট্যাগ সমূহকে বলা হয় "children"। ট্যাগের মধ্যে টেক্সট বা কমেন্ট সমূহও অবজেক্ট।

সকল অবজেক্টকে আমরা জাভাস্ক্রিপ্টের সাহায্যে অ্যাক্সেস করতে পারি, এবং এদের সাহায্যে পেজকে পরিবর্তনও করতে পারি।

যেমন, `document.body` এই অবজেক্টটি দ্বারা `<body>` ট্যাগকে সূচিত করে।

এখানে `<body>` এর ব্যাকগ্রাউন্ড ৩ সেকেন্ডের জন্য লাল থাকবে:

```js run
document.body.style.background = 'red'; // লাল ব্যাকগ্রাউন্ড

setTimeout(() => document.body.style.background = '', 3000); // পূর্বের অবস্থায় ফেরত
```

এখানে আমরা `style.background` এর সাহায্যে `document.body` এর কালার পরিবর্তন করেছি, কিন্তু এর আরো বিভিন্ন প্রপার্টি আছে, যেমন:

- `innerHTML` -- নোডের HTML কন্টেন্ট।
- `offsetWidth` -- নোডের width (পিক্সেলে)
- ...ইত্যাদি.

শীঘ্রই আমরা বিভিন্ন উপায়ে DOM ম্যানিপুলেট এর উপায় দেখব, চলুন প্রথমে এদের স্ট্রাকচারটা জেনে নিই।

## An example of the DOM

নিচের এই HTML ডকুমেন্টটি দেখুন:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>About elk</title>
</head>
<body>
  The truth about elk.
</body>
</html>
```

HTML এর DOM এর ট্রি স্ট্রাকচারটা হবে, এভাবে:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk."}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
উপরের ছবিটিতে আপনি ক্লিক করে খোলা/বন্ধ করতে পারবেন।
```

ট্রি এর প্রতিটি নোড একটি অবজেক্ট।

ট্যাগ *element nodes* (বা শুধু ইলিমেন্ট) গুলো দ্বারা ট্রি এর স্ট্রাকচারটি গঠন হয়: এখানে `<html>` হল রুট, এবং `<head>` ও `<body>` তার *children*।

এখানে আমরা দেখছি টেক্সসমূহও `#text` নামে *text nodes* হিসেবে আছে। টেক্সট নোড স্ট্রিং আকারে থাকে। এটি সর্বদা তার প্যারেন্ট নোডের সর্বশেষে থাকবে অর্থাৎ তার কোন চাইল্ড নোড থাকবে না ।

যেমন, `<title>` ট্যাগে একটি টেক্সট আছে `"About elk"`।

দয়া করে মনে রাখুন স্পেশাল ক্যারাক্টার সমূহ টেক্সট নোডে এভাবে থাকবে:

- নিউলাইন: `↵` (`\n`)
- স্পেস: `␣`

সংখ্যা এবং বর্ণের মত স্পেস ও নিউলাইন হল ভ্যালিড ক্যারাক্টার। সুতরাং DOM এ এরা *text node* হিসেবে থাকবে। তাই উপরের কোডে `<head>` এর শুরুতে এবং শেষে আমরা দুটি *text node* দেখছি (নিউলাইন বা স্পেস যেকোন কিছু থাকতে পারে)।

তবে এখানে ২টি ব্যতিক্রম ঘটনা আছে:
১. `<head>` এর পূর্বে স্পেস এবং নিউলাইনকে ঐতিহাসিক কারণে ইগনোর করে।
২. যদি আমরা `</body>` এর পর কিছু রাখি, এটি স্বয়ংক্রিয়ভাবে `body` এর অভ্যন্তরে অবস্থান করে। কেননা HTML স্পেসিফিকেশন অনুযায়ী সকল কন্টেন্ট `<body>` এর মধ্যে থাকবে। সুতরাং `</body>` এর পর কোন স্পেস থাকবে না।

অন্যান্য সকল কিছু সুনির্দিষ্ট -- যদি ডকুমেন্টে কোন স্পেস (অন্যান্য ক্যারাক্টারের মত) থাকে, তাহলে এরা *text node* হিসেবে থাকবে, আর যদি স্পেস বাদ দিই তাহলে নোডটি বাদ যাবে।

এখানে দেখুন কোন অতিরিক্ত স্পেস নাই:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>About elk</title></head><body>The truth about elk.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elk."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="স্পেস টেক্সট নোড সমূহ ডেভ টুলসে হিডেন থাকে"
ব্রাউজারের ডেভটুলসে (সামনে বিস্তারিত দেখব) এম্পটি নোড সমূহ প্রদর্শিত হবে না।

ডেভলাপার টুলে এভাবে স্ক্রিন সংরক্ষণ করে।

পরবর্তী DOM এর ছবি সমূহে আমরা অপ্রয়োজনীয় এসব নোড দেখাব না।
```

## Autocorrection

যদি ব্রাউজার আমাদের HTML কোডে কোন ভুল পায়, তাহলে এটি DOM তৈরির সময় স্বয়ংক্রিয়ভাবে শুদ্ধ করে দেয়।

যেমন, রুট ট্যাগ সর্বদা `<html>`। যদি ডকুমেন্টে এটি না থাকে তারপরও DOM এ এটি বিদ্যমান থাকবে, কেননা ব্রাউজার এটি শুদ্ধ করে দিবে। অনুরূপ `<body>` ট্যাগের জন্যও।

যেমন, HTML ফাইলে যদি শুধুমাত্র `"Hello"` থাকে, তাহলে ব্রাউজার স্বয়ংক্রিয়ভাবে `<html>`, `<head>` এবং `<body>` ট্রি তৈরি করে নিবে, এবং টেক্সট নোড টি `<body>` এর মধ্যে থাকবে:


<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

DOM জেনারেশনের সময়, ব্রাউজার স্বয়ংক্রিয়ভাবে ডকুমেন্টের ইরোর সমূহ প্রসেস করবে, এবং ক্লোজিং ট্যাগটি সম্পন্ন করবে।

ক্লোজিং ট্যাগ ছাড়া ডকুমেন্ট:

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

...এটি DOM এ সঠিকভাবে রেন্ডার হবে, কেননা ব্রাউজার স্বয়ংক্রিয়ভাবে DOM টিকে সঠিক করে দিবে:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````warn header="Tables এ সর্বদা `<tbody>` থাকবে"
তবে table এর একটি "স্পেশাল বৈশিষ্ট" আছে। DOM স্পেসিফিকেশন অনুসারে `<table>` এ `<tbody>` থাকবে, তবে আমরা এটি ছাড়াও table লিখতে পারি। তখন ব্রাউজার স্বয়ংক্রিয়ভাবে `<tbody>` সংযুক্ত করে দিবে।

যেমন:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

DOM-structure হবে:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

দেখলেন? স্বয়ংক্রিয়ভাবে `<tbody>` অবজেক্টটি সংযুক্ত হয়েছে। `<table>` নিয়ে কাজ করার সময় আমাদের এই ব্যাপারটি মনে রাখা উচিত।
````

## অন্যান্য নোড টাইপ

এলিমেন্ট এবং টেক্সট নোড ছাড়াও আরো কয়েক ধরণের নোড আছে।

যেমন, কমেন্টস:

```html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elk.
  <ol>
    <li>An elk is a smart</li>
*!*
    <!-- comment -->
*/!*
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

আমরা এখানে দেখছি `#comment` নামের -- *comment node*, দুটি ট্যাক্সট নোডের মাঝে।

আমরা মনে হতে পারে, কমেন্ট এর DOM এ কোন রিপ্রেজেন্ট নেই, তারপরও কেন এটি এসেছে। DOM ট্রি এর রুল অনুসারে HTML এর সকল কিছুই একেকটি নোড।

**HTML এর সকল কিছুই, এমনকি কমেন্টস হল DOM এর অংশ।**

এমনকি `<!DOCTYPE...>` ও DOM নোডের অংশ। এটি `<html>` নোডের পূর্বে থাকে। DOM নিয়ে কাজ করার সময় আমরা এর ব্যবহার করি না, তাই উপরোল্লিখিত ডায়াগ্রামে আমরা এটি দেখাইনি, কিন্তু এটিও DOM এর একটি অংশ।

`document` অবজেক্ট সমস্ত ডকুমেন্ট কে প্রদর্শন করে,  object that represents the whole document is, formally, a DOM node as well.
The `document` object that represents the whole document is, formally, a DOM node as well.

There are [12 node types](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

১. `document` -- এর সাহায্যে DOM এ এক্সেস করা হয়।
২. element nodes -- HTML-tags, এদের সাহায্যে DOM ট্রি গঠন করে।
৩. text nodes -- এলিম্যান্টের মাঝে যেকোন ধরণের টেক্সট।
৪. comments -- মাঝেমাঝে আমরা ডকুমেন্ট এ কমেন্ট করি, এটি ব্রাউজারে দেখা যাবে না, কিন্ত JS ইঞ্জিন এটি এক্সেস করতে পারবে।

## আরো বিস্তারিত

রিয়েল-টাইমে DOM স্ট্রাকচার দেখতে এখানে ভিজিট করুন, [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/)। ডকুমেন্ট এ টাইপ করুন, এটি DOM স্ট্রাকচারটি দেখাবে।

আমরা ব্রাউজারের ডেভটুলেও DOM স্ট্রাকচার দেখতে পারি। আমরা ডেভলাপমেন্টের সময় এভাবেই দেখি।

এজন্য, এটি ওপেন করুন [elk.html](elk.html), ব্রাউজারের ডেভলাপার টুলসটি ওপেন করুন, এলিম্যান্ট ট্যাব এ যান।

এটি এমন দেখাবে:

![](elk.svg)

এখানে আমরা DOM ট্রি দেখতে পাচ্ছি, এলিম্যান্টে ক্লিক করলে এর বিস্তারিত দেখব।

দয়া করে মনে রাখুন, ডেভলাপার টুলস এ আমরা DOM স্ট্রাকচার অনেকটা সংক্ষিপ্তাকারে দেখব। টেক্সট নোড সমূহকে শুধুমাত্র টেক্সট আকারে দেখব, এছাড়াও স্পেস বা খালির জন্য কোন টেক্সট নোড দেখব না। এটি ঠিক আছে, কেননা বেশিরভাগ সময় আমরা এলিম্যান্ট নোড নিয়েই কাজ করব।

উপরের বাম-পাশের কর্নারের <span class="devtools" style="background-position:-328px -124px"></span> বাটনটি ক্লিক করে আমরা ওয়েবপেজের বিভিন্ন নোড সমূহের বিস্তারিত জানতে পারি। আমরা অনেক বড় ওয়েব পেজ যার মধ্যে অনেক কন্টন্ট থাকে তার মধ্যে কোন নির্দিষ্ট নোডের বিস্তারিত জানতে এটি অনেক কাজের।

অথবা "Inspect" এর কন্টেক্সট মেন্যু তে কোন এলিম্যান্টে ক্লিক করেও দেখতে পারি।

![](inspect.svg)

ডানপাশে আরো কিছু সাব ট্যাবস আছে:
- **Styles** -- আমরা এর মধ্যে CSS স্ট্যাইল লিখতে পারব। CSS এর সকল প্রপার্টি এখানে লিখতে পারব যেমন মার্জিন/প্যাডিং/ফন্ট ইত্যাদি।
- **Computed** -- এর মধ্যে CSS প্রপার্টিসমূহ কিভাবে অ্যাপ্লাই হবে তা দেখব (এমনকি প্যারেন্টের যেসব স্ট্যাইল সংযুক্ত হয়)।
- **Event Listeners** -- *event listeners* সমূহ কিভাবে DOM এলিম্যান্টের সাথে সংযুক্ত হয় তা দেখব (পরবর্তী অধ্যায়ে আমরা বিস্তারিত জানব)।
- ...ইত্যাদি।

এদের নিয়ে আরো বিস্তারিত জানার জন্য ক্লিক করে করে দেখুন এবং বেশিরভাগ ভ্যালুই ইডিট করা যায়।

## কনসোলের সাথে ইন্টার‍্যাকশন

যখন আমরা DOM নিয়ে কাজ করব, আমরা এর মধ্যে জাভাস্ক্রিপ্ট সংযোগ করতে চাই। যেমন: আমরা কোন একটি নোডকে সিলেক্ট করব এবং এটিকে মোডিফাই করব। নিচে এলিম্যান্ট ট্যাব এবং কনসোল ট্যাব নিয়ে কয়েকটি টিপস দেয়া হল।

চলুন দেখা যাক:

১. প্রথমে এলিম্যান্ট ট্যাবে `<li>` কে সিলেক্ট করুন।
২. কিবোর্ডে `key:Esc` বাটন চাপুন, এলিম্যান্ট ট্যাবের নিচে কনসোল ট্যাব চালু হবে।

এখন শেষ সিলেক্টেড এলিম্যান্টটি `$0` এর মাধ্যমে এক্সেস করতে পারব, এবং এর পূর্ববর্তীটি `$1` এ, এভাবে এক্সেস করতে পারি।

এখন আমরা এদের জন্য কমান্ড চালাতে পারি। যেমন, `$0.style.background = 'red'` দ্বারা শেষ সিলেক্টেড এলিম্যান্টটি লাল হবে, এভাবে:

![](domconsole0.svg)

এভাবেই আমরা কনসোলে সিলেক্টেড এলিমেন্ট পেতে পারি।

এছাড়াও আরো একটি উপায় আছে। আমরা DOM নোডটিকে `node` ভ্যারিয়েবলে রেফারেন্স করে কনসোলে `inspect(node)` লিখলে আমরা এলিম্যান্ট টা পাব।

অথবা আমরা এ DOM নোডে কনসোলে, এভাবে `document.body` এর মাধ্যমেও পারব:

![](domconsole1.svg)

এটি অবশ্যই ডিবাগিংয়ের জন্য। পরবর্তী অধ্যায়ে আমরা জাভাস্ক্রিপ্টের সাহায্যে DOM মোডিফাই করব।

ডেভলাপার টুল আমাদের ডেভলাপমেন্ট আরো সহজ করে, এর সাহায্যে আমরা ডমের বিভিন্ন ডিবাগিং এবং বিস্তারিত দেখতে পারি।

## সারাংশ

HTML/XML ডকুমেন্ট সমূহ ব্রাউজারে DOM ট্রি হিসেবে রিপ্রেজেন্ট হয়।

- ট্যাগসমূহ এলিমেন্ট নোড হিসেবে ট্রি স্ট্রাকচার গঠন করে।
- টেক্সট সমূহ টেক্সট নোড আকারে থাকে।
- এছাড়াও, HTML এর সকল কিছুই DOM ট্রিতে থাকে, এমনকি কমেন্টও।

আমরা ডেভলাপার টুলের সাহায্যে DOM কে এক্সেস করতে এবং পরিবর্তন করতে পারি।

এখানে আমরা ডেভলাপার টুলের কিছু প্রাথমিক এবং দরকারী টুলস সম্পর্কে জেনেছি। এ সম্পর্কে আরো বিস্তারিত এখানে দেখুন <https://developers.google.com/web/tools/chrome-devtools>। এ সম্পর্কে আরো বিস্তারিত জানতে প্রতিটি ম্যানু ক্লিক করে দেখুন। পরবর্তীতে এ সম্পর্কে আরো বিস্তারিত জানতে আমরা ডকুমেন্টশন অনুসরন করব।

DOM নোডের বিভিন্ন প্রপার্টি এবং মেথড এর সাহায্যে আমরা DOM এ তাদের এক্সেস, পরিবর্তন ইত্যাদি করতে পারি। পরবর্তী অধ্যায়ে আমরা এ সম্পর্কে আরো বিস্তারিত জানব।
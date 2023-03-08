
# মিউটেশন অভজার্ভার

`MutationObserver` হল একটি বিল্ট-ইন-অবজেক্ট যা DOM এলিমেন্টকে অবজার্ভ করে এবং এলিমেন্টে এ কোন পরিবর্তন হলে একটি কলব্যাক কল করে।

প্রথমে আমরা এটির সিনট্যাক্সটি দেখব, এরপর দেখব এটি কোন ক্ষেত্রে ব্যবহার করতে পারি।

## সিনট্যাক্স

`MutationObserver` ডিক্লেয়ারের নিয়ম হল।

প্রথমে, একটি কলব্যাক সহ অবজার্ভার ডিক্লেয়ার করা:

```js
let observer = new MutationObserver(callback);
```

তারপর এর সাথে একটি DOM নোড সংযুক্ত করব:

```js
observer.observe(node, config);
```

`config` একটি অবজেক্ট যার কিছু বুলিয়ান টাইপের প্রপার্টি আছে, প্রপার্টি গুলো দ্বারা বুঝায় DOM এ কোন ধরণের পরিবর্তনের জন্য কলব্যাকটি কল হবে:
- `childList` -- `node` এর ইমিডিয়েট চাইল্ড এলিমেন্ট এ কোন পরিবর্তন হলে,
- `subtree` -- `node` এর সাব-ট্রিতে কোন পরিবর্তন হলে,
- `attributes` -- `node` এর অ্যাট্রিবিউটে কোন পরিবর্তন হলে,
- `attributeFilter` -- অ্যাট্রিবিউটের একটি অ্যারে, অ্যারের মধ্যে উল্লেখিত অ্যাট্রিবিউটসমূহের মধ্যে কোন পরিবর্তন হলে,
- `characterData` -- `node.data` প্রপার্টির কোন পরিবর্তন হলে (text content),

আরো কিছু প্রপার্টি:
- `attributeOldValue` -- যদি `true` হয় ও `attributes` এর মান `true`, তখন কলব্যাকে অ্যাট্রিবিউটের নতুন এবং পুরনো দুটিরই মান পাব অন্যথায় শুধু নতুন মানটি পাব,
- `characterDataOldValue` -- যদি `true` হয়, তাহলে পরিবর্তনের পূর্বের মান এবং পরিবর্তীত মান `node.data` দুটিই রিটার্ন করে (নিচে দেখুন), অন্যথায় শুধু পরিবর্তীত মানটি দেখায়(এটি হয় যদি কনফিগ এ `characterData` `true` হয়)।

যখন নোডে কোন পরিবর্তন হয়, তখন `callback` এক্সিকিউট হয়: এবং প্রথম আর্গুমেন্টটি হয় [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) অবজেক্ট ও দ্বিতীয় আর্গুমেন্ট হল observer অবজেক্টটি।

`MutationRecord` অবজেক্টের প্রপার্টিসমূহ:

- `type` -- মিউটেশন টাইপ
    - `"attributes"`: পরিবর্তিত অ্যাট্রিবিউট
    - `"characterData"`: পরিবর্তিত ডাটা, টেক্সট নোডে ব্যবহার করা হয়,
    - `"childList"`: added/removed চাইল্ড এলিমেন্টসমূহ,
- `target` -- এলিমেন্টের যে প্রপার্টিতে পরিবর্তন হয়: `"attributes"`, `"characterData"`, `"childList"`,
- `addedNodes/removedNodes`  -- added/removed নোড,
- `previousSibling/nextSibling` -- *previous sibling nodes* বা *next sibling nodes* এর added/removed এর জন্য,
- `attributeName/attributeNamespace` -- পরিবর্তিত attribute name/namespace (XML এর জন্য),
- `oldValue` -- পরিবর্তনের আগের মানটি, যদি `config` এ `attributeOldValue`/`characterDataOldValue` সেট হয়।

যেমন, এখানে একটি `<div>` এলিমেন্ট আছে, এবং এর অ্যাট্রিবিউট `contentEditable` সেট করছি। যার ফলে আমরা কন্টেন্ট কে পরিবর্তন করতে পারব।

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
});
</script>
```

যদি আমরা কোডটি রান করি, এবং `<div>` এ ফোকাস করে চাইল্ড নোড `<b>edit</b>` এর কন্টেন্ট পরিবর্তন করি তাহলে `console.log` এ এই mutationRecords টি দেখব:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
```

যদি আমরা `<b>edit</b>` নোডটি রিমুভ করে দেয়, তখন mutationRecords টি হবে:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
```

সুতরাং আমরা দেখলাম, `MutationObserver` দ্বারা আমরা DOM এর সাবট্রির পরিবর্তনও অবজার্ভ করতে পারি।

## থার্ড পার্টি লাইব্রেরী ইন্ট্রিগেশন

কখন `MutationObserver` ব্যবহার করতে পারি?

মনে করুন আপনি একটি দারুণ থার্ড পার্টি লাইব্রেরী ব্যবহার করছেন, তবে এর কিছু ফাংশনালিটি আছে যা আপনি চান না, যেমন এড দেখানো `<div class="ads">Unwanted ads</div>`।

সাধারণত, এই ফাংশনালিটিগুলো রিমুভের জন্য লাইব্রেরী গুলো কোন API প্রভাইড করে না।

এক্ষেত্রে `MutationObserver` এর সাহায্যে আমরা আমাদের DOM এর পরিবর্তন নির্ণয় করে তা রিমুভ করতে পারি।

এছাড়াও আমরা যখন কোন থার্ড পার্টি স্ক্রিপ্ট ব্যবহার করি এবং তা যদি DOM এ কোন এলিমেন্ট সংযুক্ত করে তখন তা নির্ণয় করে ডায়নামিক্যালি DOM এলিমেন্টের সাইজ পরিবর্তন করতে হয়।

এইসব ক্ষেত্রে `MutationObserver` এর সাহায্যে এমন ফাংশনালিটি ইমপ্লিমেন্ট করতে পারি।

## আর্কিটেকচার

এছাড়াও আমাদের প্রজেক্টের ভাল স্ট্রাকচারের জন্য `MutationObserver` ব্যবহার করতে পারি।

মনে করুন আমরা প্রোগ্রামিং সম্পর্কিত একটি ওয়েবসাইট বানাব। সাধারণত, এক্ষেত্রে আমাদের আর্টিকেল বা অন্যান্য রিসোর্স দেখাতে সোর্স কোড স্নিপেট ব্যবহার করা লাগে।

যেমন HTML মার্কআপ স্নিপেটে দেখতে এমন হবে:

```html
...
<pre class="language-javascript"><code>
  // here's the code
  let hello = "world";
</code></pre>
...
```

কোড কে পঠনযোগ্য এবং সুন্দরভাবে দেখাতে, আমরা আমাদের সাইটে একটি সিনট্যাক্স হাইলাইটিং লাইব্রেরী ব্যবহার করছি, যেমন [Prism.js](https://prismjs.com/)। সিনট্যাক্স হাইলাইটিং এর জন্য প্রিজমার একটি ফাংশন `Prism.highlightElem(pre)` কল করতে হয়, যা `pre` এলিমেন্টকে অবজার্ভ করে এবং ঐ এলিমেন্টের কোডের বৈশিষ্ট্যের উপর নির্ভর বিশেষ ট্যাগ এবং স্ট্যাইল সংযুক্ত করে, যেমন উপরের কোডে দেখুন।

এখন প্রশ্ন, কখন `Prism.highlightElem(pre)` মেথডটি কল করব? আমরা চাইলে ফাংশনটি `DOMContentLoaded` ইভেন্ট ট্রিগারে বা পেজের একদম নিচে স্ক্রিপটি সংযুক্ত করতে পারি, তাহল DOM রেডি হওয়ার পর আমরা `pre[class*="language"]` এলিমেন্টগুলো খুঁজে `Prism.highlightElem` কে কল করতে পারি:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

এ পর্যন্ত সব ঠিকঠাক তাই না? আমরা স্নিপেট প্রয়োগ হবে এমন এলিমেন্টগুলো খুঁজে বের করে তাদের জন্য সিনট্যাক্স হাইলাইটার ব্যবহার করব।

এখন ধরা যাক আমরা ডায়নামিক্যালি কোন কন্টেন্ট সার্ভার হতে রেন্ডার করব। [পরবর্তীতে এই অধ্যায়ে শিখব](info:fetch)। আপাতত ধরে নিন আমরা সার্ভার হতে কোন ডাটা রেন্ডার করে DOM এ দেখাচ্ছি:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

এখন ধরুন `article` এর কন্টেন্টে কিছু কোড স্নিপেট আছে। যার জন্য আমাদের `Prism.highlightElem` কে কল করতে হবে, অন্যথায় আমরা সিনট্যাক্স হাইলাইটিং দেখব না.

**তাহলে কিভাবে ডায়নামিক্যালি লোড হওয়া আর্টিকেলের জন্য আমরা `Prism.highlightElem` কে কল করব?**

আমরা চাইলে আর্টিকেল লোড হওয়ার পর এভাবে সংযুক্ত করতে পারি:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

...কিন্তু, ভাবুন আমাদের আরো অনেক জায়গায় এমন ডায়নামিক কন্টেন্ট আছে যেমন আর্টিকেল, কুইজ, ফোরাম পোস্ট, ইত্যাদি। এজন্য কি আমরা প্রতিটি কন্টেন্ট লোড হওয়ার পর সিনট্যাক্স হাইলাইটারকে কল করব? এটি তেমন ভালো কোন সমাধান হতে পারে না।

আবার মনে করুন আমাদের একটি ফোরাম আছে যা লোড হয় একটি থার্ড-পার্টি লাইব্রেরী থেকে, এবং এর মধ্যে বিভিন্ন ধরণের কোড থাকতে পারে এখন কন্টেন্টে আমরা সিনট্যাক্স হাইলাইট করতে চাই, কিন্তু আমাদের থার্ড পার্টি লাইব্রেরীটি সিনট্যাক্স হাইলাইটিং ফিচার প্রদান করে না।

তবে এটি আমরা আরেকভাবে করতে পারি।

আমরা DOM কে অবজার্ভ করে `MutationObserver` এর সাহায্যে স্বয়ংক্রিয়ভাবে কন্টেন্টকে হাইলাইট করতে পারি।

তাহলে আমরা একটি জায়গায় ফাংশনালিটি ইমপ্লিমেন্ট করলে হবে, এরফলে আমাদের কোড হবে সহজে পরিবর্তনযোগ্য।

### ডায়নামিক সিনট্যাক্স হাইলাইটার

এখানে একটি উদাহরন দেয়া হল।

কোডটি রান করুন, এটি আমাদের এলিমেন্টকে অবজার্ভ করে এবং কোড স্নিপেটের জন্য `Prism.highlightElement` কে কল করবে:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // examine new nodes, is there anything to highlight?

    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // or maybe there's a code snippet somewhere in its subtree?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

এখন আমরা ডায়নামিক্যালি কন্টেন্ট `demoElem.innerHTML` এ অ্যাসাইন করব।

প্রথমে উপরের কোডটি রান করুন, এবং তারপর নিচেরটি রান করুন। এখন দেখবেন `MutationObserver` আমাদের কন্টেন্ট অবজার্ভ করে কোড স্নিপেটকে হাইলাইট করবে।

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

নিচের কোডটিতে `MutationObserver` `highlight-demo` নোডটিকে অবজার্ভ করে এবং দেখে তার কন্টেন্ট `innerHTML` পরিবর্তন হয়েছে, ফলে `MutationObserver` এক্সিকিউট হবে এবং এটি `Prism.highlightElement` কে কল করে:

```js run
let demoElem = document.getElementById('highlight-demo');

// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

এভাবে আমরা `MutationObserver` দ্বারা আমাদের `document` এ যেকোন পরিবর্তন ট্র্যাক করে তার উপর নির্ভর করে কোন একটি ফাংশন কল করতে পারি।

## অন্যান্য মেথড

`MutationObserver` এর আরো কিছু মেথড আছে:

- `observer.disconnect()` -- অবজার্ভেশন করা বন্ধ করে।

যখন আমরা ``observer.disconnect()`` কে কল করি, সেসময় এমন হতে পারে DOM এ কোন কিছু পরিবর্তন হয়েছে কিন্তু তাদের জন্য তখনো observer কল হয়নি। এক্ষেত্রে আমরা ব্যবহার করতে পারি

- `observer.takeRecords()` -- যা QUEUE তে থাকা যেসব মিউটেশনের জন্য আমাদের কলব্যাক হ্যান্ডেলার কল হয়নি তাদের তালিকাটি রিটার্ন করে।

এক্ষেত্রে মেথডদুটিকে এভাবে ব্যবহার করতে পারি:

```js
// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
let mutationRecords = observer.takeRecords();

// stop tracking changes
observer.disconnect();
...
```


```smart header="`observer.takeRecords()` দ্বারা রিটার্নকৃত মিউটেশন রেকর্ডগুলো QUEUE থেকে রিমুভড হয়"
 `observer.takeRecords()` এর জন্য যেসব মিউটেশন রিটার্ন হয় তাদের জন্য কলব্যাকটি এক্সিকিউট হবে না।
```

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
```

## সারাংশ

`MutationObserver` দ্বারা DOM এ কোন এলিমেন্টকে অবজার্ভ করতে পারি, যার সাহায্যে নির্ণয় করতে পারি কোন অ্যাট্রিবিউট, কন্টেন্ট বা এলিমেন্ট সংযুক্ত হয়েছে বা বাদ পরেছে কিনা।

এটি দ্বারা আমরা আমাদের নিজস্ব স্ক্রিপ্ট বা থার্ড পার্টি স্ক্রিপ্ট দ্বারা DOM এর পরিবর্তন ট্র্যাক করতে পারি।

`MutationObserver` যেকোন পরিবর্তন ট্র্যাক করতে পারে, তবে অপ্টিমাইজেশনের জন্য আমরা যা যা অবজার্ভ করতে হবে কনফিগারেশনে শুধুমাত্র তাদের পাঠাতে পারি, এভাবে আমরা অপ্রয়োজনীয় মিউটেশন কল এড়াতে পারি।

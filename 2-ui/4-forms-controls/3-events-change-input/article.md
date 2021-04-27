# ইভেন্টস: change, input, cut, copy, paste

চলুন ইনপুট এবং কন্ট্রোলের সাথে সম্পর্কিত ইভেন্টসমূহ জানি।

## Event: change

যখন কোন এলিমেন্টের ইনপুট ভ্যালু পরিবর্তন হয় তখন `change` ইভেন্ট সংগঠিত হয়।

টেক্সট ইনপুটের জন্য যখন এলিমেন্টের ফোকাস হারায় তখন এটি সংগঠিত হয়।

যেমন, যখন আমরা ইনপুট ফিল্ডে কিছু লিখব তখন কোন ইভেন্ট সংগঠিত হবে না, কিন্তু যখন আমরা ফোকাস অন্য কোথাও সরিয়ে নিব, তখন ইভেন্টটি সংগঠিত হয়, উদাহরণস্বরূপ নিচের কোডে বাটনে ক্লিক করলে `change` ইভেন্টটি সংগঠিত হবে:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

অন্যান্য এলিমেন্টের জন্য, যেমন `select`, `input type=checkbox/radio` এর জন্য অপশন পরিবর্তন হলে ইভেন্ট সংগঠিত হবে:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## ইভেন্ট: input

এলিমেন্টের ইনপুট ভ্যালু পরিবর্তন হলে `input` ইভেন্ট সংগঠিত হয়।

কী-বোর্ড ইভেন্টের সাথে এটির পার্থক্য হল ইনপুটের ভ্যালু যেকোনভাবে পরিবর্তন হলে যেমন মাউসের মাধ্যমে ডাটা পেস্ট বা স্পিচ রিকনেশনের মাধ্যমে ইনপুট হলেই `input` ইভেন্টটি সংগঠিত হবে।

উদাহরণস্বরূপ:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

যদি আমরা `<input>` এর প্রতিটি পরিবর্তনের সাথে সাথে কোন ইভেন্ট সংগঠিত করতে চায় তাহলে এটি এই ইভেন্টটি সবচেয়ে বেশি কাজের।

তবে, যেসব কী ভ্যালু পরিবর্তন করে না সেসব কী এর জন্য `input` ইভেন্ট সংগঠিত হয় না, যেমন `key:⇦` `key:⇨` কী।

```smart header="`oninput` কে prevent করা যায় না"
ভ্যালু পরিবর্তনের সাথে সাথেই `input` ইভেন্টটি সংগঠিত হয়।

তাই আমরা চাইলেও `event.preventDefault()` করতে পারব না এবং এটির কোন প্রভাব পড়বে না।
```

## ইভেন্টস: cut, copy, paste

কোন মান cutting/copying/pasting করলেই ইভেন্ট সমূহ সংগঠিত হয়।

এরা [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) ক্লাসের অন্তর্গত এবং ডাটা copied/pasted করার সুবিধা দেয়।

আমরা cut, copy, paste অ্যাকশন সমূহকে বন্ধ করতে পারি `event.preventDefault()` এর মাধ্যমে।

যেমন, নিচের কোডে আমরা cut/copy/paste এর জন্য ডাটা দেখিয়ে অ্যাকশন সমূহকে বন্ধ করি:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

দয়া করে নোট করুন, কপি/পেস্ট শুধুমাত্র টেক্সটের জন্য না, আমরা যে কোন কিছু যেমন একটি অপারেটিং সিস্টেমও কপি/পেস্ট করতে পারি।

এখানে ডাটা কপি/পেস্টের বিভিন্ন মেথড নিয়ে আলোচনা করা হল [in the specification](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer)।

তবে মনে রাখা উচিত ক্লিপবোর্ড "global" OS-level এর ব্যাপার। বেশিরভাগ ব্রাউজার কিছু নির্দিষ্ট মাধ্যমে ক্লিপবোর্ড অ্যাক্সেস দেয়, যেমন `onclick` হ্যান্ডেলারে।

এছাড়াও ফায়ারফক্স ছাড়া সকল ব্রাউজারে "custom" ক্লিপবোর্ড `dispatchEvent` সাপোর্ট করে না।

## সারাংশ

ডাটা পরিবর্তনের ইভেন্ট:

| ইভেন্ট | বর্ণনা | স্পেশাল |
|---------|----------|-------------|
| `change`| কোন ভ্যালু পরিবর্তন হলে | টেক্সট ইনপুটের জন্য ফোকাস হারালে |
| `input` | টেক্সট ইনপুটের কোন ভ্যালু পরিবর্তন হওয়ার সাথে সাথে | ভ্যালু পরিবর্তনের সাথে সাথে |
| `cut/copy/paste` | Cut/copy/paste | অ্যাকশন সমূহকে বাধাপ্রাপ্ত করতে পারি। `event.clipboardData` প্রপার্টির সাহায্যে ক্লিপবোর্ডের ডাটা পড়তে ও লিখতে পারি |

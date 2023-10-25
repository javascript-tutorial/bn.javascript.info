# আবারো অ্যারো ফাংশন

চলুন অ্যারো ফাংশন সম্পর্কে আরো কিছু জানা যাক।

শুধুমাত্র শর্টকাটে লিখার জন্য অ্যারো ফাংশন না। এর আরো কিছু বিশেষ ফিচার আছে।

জাভাস্ক্রিপ্টে অনেক ক্ষেত্রে আমরা কোন একটি ফাংশনকে যথাযথ সম্ভব ছোট করে লিখতে চাই।

যেমন:

- `arr.forEach(func)` -- `forEach` আর্গুমেন্ট হিসেবে একটি কলব্যাক ফাংশন নেয়।
- `setTimeout(func)` -- `setTimeout` ও আর্গুমেন্ট হিসেবে একটি কলব্যাক ফাংশন নেয়।
- ...এছাড়া আরো অনেক ক্ষেত্রে।

অনেক সময় আমাদের কোন ফাংশন লিখ তা অন্য কোন কন্টেক্সে ব্যবহার করতে হয়।

এবং এসব ক্ষেত্রে আমরা ফাংশনটিকে কারেন্ট কন্টেক্স কল করতে চাই। এক্ষেত্রে অ্যারো ফাংশন আমাদের অনেক সুবিধা দেয়।

## অ্যারো ফাংশনের "this" কন্টেক্স নাই

এই অধ্যায়ে আমরা দেখেছিলাম <info:object-methods>, অ্যারো ফাংশনের কোন `this` নেই। যদি কোন `this` কে অ্যাক্সেস করে তাহলে তা তার আউটার কন্টেক্স থেকে পাই।

উদাহরণস্বরূপ, এখানে আমরা অবজেক্টের একটি মেথড ডিক্লেয়ার করেছি:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

`forEach` এ আমরা অ্যারো ফাংশন ব্যবহার করেছি, সুতরাং এটি তার আউটার স্কোপ থেকে `this.title` কে অ্যাক্সেস করতে পারবে `showList`। এখানে `this.title` দ্বারা বুঝানো হচ্ছে `group.title`।

কিন্তু আমরা যদি "regular" ফাংশন ব্যবহার করতাম, তাহলে প্রোগ্রামে এরর হত:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

এক্ষেত্রে `forEach` এর ফাংশনটির ডিফল্ট কন্টেক্স হত `this=undefined`, সুতরাং এটি প্রপার্টিকে এভাবে অ্যাক্সেস করতে চাইত `undefined.title`।

যেহেতু অ্যারো ফাংশনের `this` নেই, তাই এটি কোন এরর রিটার্ন করবে না।

```warn header="`new` এ সাথে অ্যারো ফাংশন রান করে না"
`this` না থাকার কারণে এর একটি লিমিটেশন আছে: অ্যারো ফাংশনকে আমরা *constructors* হিসেবে ব্যবহার করতে পারব না। কেননা এরা `new` দ্বারা কল হয় না।
```

```smart header="Arrow functions VS bind"
অ্যারো ফাংশন `=>` এবং ্রেগুলার ফাংশন `.bind(this)` এর মাঝে একটি পার্থক্য আছে:

- `.bind(this)` creates a "bound version" of the function.
- The arrow `=>` doesn't create any binding. The function simply doesn't have `this`. The lookup of `this` is made exactly the same way as a regular variable search: in the outer lexical environment.
```

## অ্যারো ফাংশনের "arguments" ভ্যারিয়েবল

অ্যারো ফাংশনে `arguments` ভ্যারিয়েবল নাই।

ডেকোরেটার্সের জন্য এটি দারুণ, যখন আমাদের  `this` এবং `arguments` এর সাহায্যে একটি ফরওয়ার্ড কল করতে হয়।
যেমন, `defer(f, ms)` একটি ফাংশন প্যারামিটার হিসেবে নেয় এবং তা আরেকটি ফাংশন কলকে রিটার্নে করে যা `ms` মিলিসেকেন্ড পর কল হয়:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
```

অ্যারো ফাংশন ছাড়া ডেকোরেটার্সটি দেখতে এমন হত:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

এখানে আমাদের `setTimeout` ফাংশনের কন্টেক্সট এর জন্য আলাদা দুটি `args` এবং `ctx` ভ্যারিয়েবল লাগছে।

## সারাংশ

অ্যারো ফাংশনে:

- এর `this` নাই
- এর `arguments` নাই
- `new` দ্বারা কল হয় না
- এছাড়াও এর `super` নাই, এ ব্যাপারে আমরা এখনো পড়িনি। এই অধ্যায়ে বিস্তারিত জানতে পারব <info:class-inheritance>

এটি দ্বারা বোঝায় অ্যারো ফাংশনের নিজস্ব কোন "context" নাই, তবে "current context" এর সাথে কাজ করে। এধরণের ক্ষেত্রে এরা আসলেই সুবিধাজনক।

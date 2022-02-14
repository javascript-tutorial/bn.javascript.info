# Destructuring assignment

জাভাস্ক্রিপ্টে সবচেয়ে বেশি ব্যবহৃত দুটি ডাটা স্ট্রাকচার হল `Object` এবং `Array`।

সাধারণত অবজেক্ট কী(key) এবং ভ্যালু আকারে এবং অ্যারে ক্রম অনুসারে ডাটা সংরক্ষণ করে।

কিন্তু, অনেক সময় এদের কোন একটি ফাংশনে আর্গুমেন্ট হিসেবে পাঠাতে চাইলে সম্পূর্ণ অবজেক্ট বা অ্যারের পরিবর্তে নির্দিষ্ট অংশ প্রয়োজন হয়।

*Destructuring assignment* একটি বিশেষ সিনট্যাক্স যার মাধ্যমে অবজেক্ট বা অ্যারের নির্দিষ্ট অংশকে সহজে ভ্যারিয়েবলে অ্যাসাইন করতে পারি, যা অনেক সময় সুবিধাজনক। এছাড়াও অনেক প্যারামিটার, ডিফল্ট ভ্যালু ইত্যাদি আছে এমন জটিল ফাংশনকে *Destructuring* সহজে হ্যান্ডেল করার সুবিধা দেয়।

## Array destructuring

অ্যারেকে কিভাবে destructured করে ভ্যারিয়েবলে সেট করতে পারি তার একটি উদাহরণ দেখুন:

```js
// name এবং surname এর একটি অ্যারে আছে
let arr = ["Ilya", "Kantor"]

*!*
// destructuring assignment
// firstName = arr[0] সেট হল
// এবং surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // Ilya
alert(surname);  // Kantor
```

এখন আমরা অ্যারের আইটেমগুলোর পরিবর্তে ভ্যারিয়েবল নিয়ে কাজ করতে পারি।

এছাড়াও `split` বা যেসব মেথড অ্যারে রিটার্ন করে এদের সাথেও এটি কাজ করে।

```js
let [firstName, surname] = "Ilya Kantor".split(' ');
```

````smart header="\"Destructuring\" দ্বারা \"destructive\" বুঝানো হয় না"
এটিকে বলা হয় "destructuring assignment", কেননা এটি "destructurizes" এর মাধ্যমে আইটেমকে ভ্যারিয়েবলে রূপান্তর করে। কিন্তু অরিজিনাল অ্যারের কোন পরিবর্তন হয় না।

আসলে এটি সংক্ষেপে লেখার একটি পদ্ধতি, যেমন:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="অপ্রয়োজনীয় এলিমেন্টকে কমার সাহায্যে বাদ দেয়া"
অ্যারের অপ্রয়োজনীয় এলিমেন্টকে অতিরিক্ত কমা সংযুক্ত করে বাদ দিতে পারি:

```js run
*!*
// দ্বিতীয় এলিমেন্টকে বাদ দিতে চাই
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

উপরের কোডে, দ্বিতীয় এলিমেন্টকে উপেক্ষা করা হয়েছে, এবং তৃতীয় এলিমেন্টটি `title` এ সংযুক্ত হয়েছে, এছাড়াও অ্যারের অন্যান্য এলিমেন্টও উপেক্ষা হবে (যেহেতু তাদের জন্য কোন ভ্যারিয়েবলে অ্যাসাইন করা হয়নি)।
````

````smart header="যেকোন ধরণের ইটারেবলের সাথে এই ধরণের অ্যাসাইনমেন্ট কাজ করে"

...এটি শুধুমাত্র অ্যারে না যেকোন ধরণের ইটারেবলের সাথে কাজ করে:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

````


````smart header="এছাড়াও বাম পাশের প্যাটার্নের কোন কিছুকে অ্যাসাইন করতে পারি"

আমরা বাম পাশের প্যাটার্নের কোন কিছুকে অ্যাসাইন করতে পারি।

যেমন একটি অবজেক্টের প্রপার্টি হিসেবে:
```js run
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');

alert(user.name); // Ilya
```

````

````smart header=".entries() লুপ"

পূর্বের অধ্যায়ে আমরা এই মেথডটি দেখেছি [Object.entries(obj)](mdn:js/Object/entries)।

আমরা লুপের মধ্যে অবজেক্টকে keys-values আকারে destructuring করতে পারি:

```js run
let user = {
  name: "John",
  age: 30
};

// লুপে keys-and-values
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```

...অনুরূপ Map এর ক্ষেত্রেও:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, then age:30
}
```
````

```smart header="ভ্যারিয়েবল অদল বদল"
দুটি ভ্যারিয়েবলের মান অদল বদল(swap) করার শর্টকার্ট পদ্ধতি:

```js run
let guest = "Jane";
let admin = "Pete";

// দুটি ভ্যারিয়েবলের মান অদল বদল করছি: guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane (এটি কাজ করছে)
```

এখানে একটি টেম্পোরারি অ্যারের সাহায্যে ভ্যারিয়েবল গুলোকে destructure করে তাদের মধ্যে swap করা হল।

এভাবে আমরা একাধিক ভ্যারিয়েবলকেও swap করতে পারি।

### The rest '...'

যদি আমরা শুধুমাত্র প্রথম বা দ্বিতীয় ভ্যালুর পাশাপাশি বাকী কালেকশনকে destructuring করতে চাই, তাহলে আমরা আরো একটি ভ্যারিয়েবলকে `"..."` তিনটি ডট সহ `"...rest"` লিখব, একে বলা হয় "rest", যেমন:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

alert(name1); // Julius
alert(name2); // Caesar

*!*
// নোট `rest` হল একটি অ্যারে।
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

`rest` এর মান হবে অ্যারের অবশিষ্ট এলিমেন্টসমূহের একটি অ্যারে। আমরা ভ্যারিয়েবলটির মান `rest` এর পরিবর্তে যেকোন কিছু দিতে পারি, তবে মনে রাখতে হবে যেন ভ্যারিয়েবলের আগে যেন তিনটি ডট থাকে এবং এটি যেন destructuring এর শেষ এলিমেন্ট হয়।

### ডিফল্ট ভ্যালু

যদি অ্যারের `length` এর চেয়ে আমাদের অ্যাসাইনমেন্ট ভ্যারিয়েবলের সংখ্যা বেশি হয়, তাহলে কোন এরর থ্রো হবে না। তার পরিবর্তে ভ্যারিয়েবলের মান হবে undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

যদি আমরা undefined এর পরিবর্তে কোন একটি ডিফল্ট মান অ্যাসাইন করতে চাই, তাহলে এভাবে করতে পারি:

```js run
*!*
// default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```

ডিফল্ট ভ্যালু জটিল এক্সপ্রেশন বা ফাংশন কলের সাথেও কাজ করবে। ডিফল্ট ভ্যালু অ্যাসাইন হবে যদি কোন কারণে মানটি অনুপস্থিত থাকে।

যেমন, এখানে `prompt` এর সাহায্যে দুটি ডিফল্ট মান অ্যাসাইন করা হচ্ছে। তবে এখানে শুধুমাত্র দ্বিতীয়টির জন্য ডিফল্ট মানটি কাজ করবে:

```js run
// শুধুমাত্র surname এর জন্য prompt এক্সিকিউট হবে
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // prompt এর মান
```



## Object destructuring

destructuring assignment অবজেক্টের সাথেও কাজ করে।

এর সিন্ট্যাক্সটি হল:

```js
let {var1, var2} = {var1:…, var2:…}
```

আমাদের ডান পাশে একটি অবজেক্ট আছে, এর মানকে আমরা ভ্যারিয়েবলে অ্যাসাইন করতে চাই। বাম পাশে প্রপার্টিগুলোর জন্য একটি প্যাটার্ন আছে। সাধারণত `{...}` প্যারেন্টেসিসের মধ্যে অবজেক্টের প্রপার্টিগুলো ভ্যারিয়েবল হিসেবে ডিক্লেয়ার করা হয়।

যেমন:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

`options.title`, `options.width` এবং `options.height` প্রপার্টিগুলো একই নামের ভ্যারিয়েবলে অ্যাসাইন হবে। এখানে অ্যাসাইন ক্রম মূখ্য নই। এটিও কাজ করবে:

```js
// let {...} এর মধ্যে ভ্যারিয়েবলের ক্রম পরিবর্তন
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

বাম পাশের প্যাটার্নটিতে প্রপার্টি এবং ভ্যারিয়েবল আরো জটিল হতে পারে।

যদি আমরা কোন একটি প্রপার্টিকে অন্য নামে অ্যাসাইন করতে চায়, ধরুন `options.width` কে `w` নামে, তাহলে আমরা কোলন দ্বারা লিখতে পারি, যেমন:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

কোলন দ্বারা বুঝায় "what : goes where"। উপরের উদাহরণে `width` হয়ে যাবে `w`, এবং `height` হবে `h`, এবং `title` একই নামে অ্যাসাইন হবে।

অনুপস্থিত প্রপার্টির ডিফল্ট মান সেট করতে পারি `"="` এর মাধ্যমে, যেমন:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

অ্যারের মত ডিফল্ট ভ্যালু জটিল এক্সপ্রেশন বা ফাংশন কলের সাথেও কাজ করবে। ডিফল্ট ভ্যালু অ্যাসাইন হবে যদি কোন কারণে প্রপার্টি অনুপস্থিত থাকে।

নিচের কোডে `title` এর জন্য `prompt` রান হবে না, হবে `width` এর জন্য:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("width?"), title = prompt("title?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (whatever the result of prompt is)
```

এছাড়াও আমরা কোলন এবং ডিফল্ট অ্যাসাইনমেন্ট একসাথে লিখতে পারি:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

যদি আমাদের একাধিক প্রপার্টি হতে শুধুমাত্র একটি মান লাগে তাহলে সেটিও করা সম্ভব:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// শুধুমাত্র title এর মান অ্যাসাইন হবে
let { title } = options;

alert(title); // Menu
```

### The rest pattern "..."

আমরা নির্দিষ্ট প্রপার্টিকে ভ্যারিয়েবলে সেটের পাশাপাশি যদি বাকী প্রপার্টিগুলোকে কোন একটি ভ্যারিয়েবলে destructuring করতে চায় তা কী সম্ভব?

হ্যা সম্ভব, এক্ষেত্রে আমরা *rest pattern* ব্যবহার করতে পারি, যা ইতোমধ্যে অ্যারের ক্ষেত্রে দেখেছি। তবে এটি মডার্ন ব্রাউজারে কাজ করে, কিন্তু কিছু পুরনো ব্রাউজারে কাজ করে না (IE, পলিফিলের জন্য Babel ব্যবহার করতে পারি)।

নিচের উদাহরণটি দেখুন:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = title প্রপার্টি অ্যাসাইন হবে
// rest = অবজেক্টের বাকী প্রপার্টি অ্যাসাইন হবে
let {title, ...rest} = options;
*/!*

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="যদি `let` ব্যবহার না করি কি হবে!"
উপরের কোডে আমরা ভ্যারিয়েবলকে ডিক্লেয়ার করছি destructuring অ্যাসাইনমেন্টের সময়: `let {…} = {…}`। আমরা আমাদের পূর্বে ডিক্লেয়ারকৃত ভ্যারিয়েবলকে `let` ছাড়া ব্যবহার করতে পারি। তবে এক্ষেত্রে একটি সীমাবদ্ধতা রয়েছে।

এটি কাজ করবে না:
```js run
let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

জাভাস্ক্রিপ্ট `{...}` কে আমাদের মূল কোডের কোড ব্লক হিসেবে ধরে নেয়। এই ধরণের কোড ব্লক আমরা গ্রুপ স্টেটমেন্টের জন্য ব্যবহার করি, যেমন:

```js run
{
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
```

এখানে জাভাস্ক্রিপ্ট `{...}` কে কোড ব্লক হিসেবে ধরে নেয়, যার ফলে এটি এরর থ্রো করে।

এটি আলাদা কোড ব্লক না তা জাভাস্ক্রিপ্টকে বুঝাতে একে প্যারেন্টেসিসের মধ্যে `(...)` লিখব:

```js run
let title, width, height;

// okay now
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Nested destructuring

নেস্টেড অবজেক্ট বা অ্যারের জন্য আমরা বাম পাশের প্যাটার্নকে আরো জটিল ভাবে ডিক্লেয়ার করতে পারি।

নিচের কোডে `options` অবজেক্টের একটি নেস্টেড অবজেক্ট আছে `size` এবং আরো একটি অ্যারে প্রপার্টি আছে `items`। এক্ষেত্রে আমাদের বামের অ্যাসাইনমেন্ট প্যাটার্নটি ডানের স্ট্রাকচারের মত হতে হবে:

```js run
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// কোড পাঠযোগ্য হওয়ার জন্য destructuring assignment কে একাধিক লাইনে লিখেছি
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

এখন আমরা `options` অবজেক্টের সকল প্রপার্টিকে(`extra` বাদে ) বাম পাশে অ্যাসাইন করছি:

![](destructuring-complex.svg)

এখন আমরা `width`, `height`, `item1`, `item2` এবং `title` এর ডিফল্ট মান পাব।

নোট: এখানে আমরা আলাদা করে `size` এবং `items` নামের আলাদা ভ্যারিয়েবল পাব না, তার পরিবর্তে তাদের কন্টেন্ট সেট হবে।

## Smart function parameters

অনেক সময় আমাদের এমন ফাংশন থাকে, যাদের বেশিরভাগ প্যারামিটার অপশনাল। বিশেষত UI এর ফাংশনের জন্য। মনে করুন আমরা একটি মেনু তৈরি করব। যার width, height, title, items ইত্যাদি প্যারামিটার আছে।

এই ধরণের ফাংশন অনেক সময় এভাবে লিখা হয়, যা bad practice:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

বাস্তবিকক্ষেত্রে আমাদের আর্গুমেন্ট মনে রাখা কষ্টসাধ্য। সাধারণত ডকুমেন্টেড কোডের জন্য IDE সহায়ক হতে পারে, কিন্তু তারপরও সমস্যা আছে যদি ফাংশনের বেশিরভাগ প্যারামিটার ডিফল্ট হয় সেক্ষেত্রে কি হবে?

যেমন এটি দেখুন।

```js
// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

এছাড়াও, এটি আর পঠনযোগ্য থাকে না।

এক্ষেত্রে Destructuring আমাদের জন্য সুবিধাজনক!

আমরা ফাংশনের আর্গুমেন্ট হিসেবে অবজেক্টকে পাঠাতে পারি, এবং ফাংশনে তাদের কে destructurizes করে নিতে পারি:

```js run
// we pass object to function
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...and it immediately expands it to variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

এছাড়াও আমরা destructurizes এর সময় নেস্টেড এবং কোলন ম্যাপিং করতে পারি, যেমন:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

এটির সিনট্যাক্স সম্পূর্ন destructuring assignment এর মত:
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```

এখানে একটি অবজেক্টকে প্যারামিটার হিসেবে নেয়, এবং `incomingProperty` প্রপার্টিটি `varName` ভ্যারিয়েবল হিসেবে সেট হবে, এবং ডিফল্ট ভ্যালু হবে `defaultValue`।

নোট: মনে করুন আমরা ফাংশন ডিক্লেয়ারেশনে destructuring করেছি এক্ষেত্রে আমাদের অবশ্যই প্যারামিটার হিসেবে একটি এম্পটি অবজেক্ট `{}` পাস করতে হবে, অন্যথায় একটি এরর থ্রো হবে:

```js
showMenu({}); // ok, all values are default

showMenu(); // this would give an error
```

আমরা অন্যভাবে এটিকে সমাধান করতে পারি, প্যারামিটারের ডিফল্ট ভ্যালু হিসেবে অবজেক্ট অ্যাসাইন করার মাধ্যমে `{}`:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

উপরের কোডে আমরা ফাংশন ডিক্লেয়ারেশনে অবজেক্ট আর্গুমেন্টটি ডিফল্ট হিসেবে `{}` সেট করছি, সুতরাং এটি প্যারামিটার পাস না করলে ডিফল্ট অবজেক্টকে destructuring করবে।

## সারাংশ

- Destructuring assignment এর সাহায্যে অবজেক্ট বা অ্যারের কালেকশনের কোন একটি বা সম্পূর্ণ অংশকে ভ্যারিয়েবলে রূপান্তর করতে পারি।
- সিনট্যাক্স:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    এখানে বুঝানো হচ্ছে `prop` এর ভ্যারিয়েবল হবে `varName` এবং, যদি অবজেক্টে `prop` প্রপার্টি না থাকে তাহলে ডিফল্ট মানটি অ্যাসাইন হবে।

    অবজেক্টের যেসব মান Destructuring হবে না তারা `rest` এ অবজেক্ট হিসেবে কপি হবে।

- অ্যারের সিনট্যাক্স:

    ```js
    let [item1 = default, item2, ...rest] = array
    ```

    অ্যারের প্রথম আইটেমটি অ্যাসাইন হবে `item1` এ; অ্যারের দ্বিতীয় আইটেমটি অ্যাসাইন হবে `item2` এ, এবং অবশিষ্ট আইটেম `rest` এ অ্যারে হিসেবে কপি হবে।

- নেস্টেড arrays/objects কেও এক্সট্রাক্ট করা সম্ভব, এক্ষেত্রে আমাদের বামের প্যাটার্নটি ডানের স্ট্রাকচারের মত হতে হবে।

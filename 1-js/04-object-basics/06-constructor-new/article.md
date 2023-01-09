# কন্সট্রাকটর এবং "new" অপারেটর

<<<<<<< HEAD
সাধারণত আমরা `{...}` এর সাহায্যে শুধুমাত্র একটি অবজেক্ট তৈরি করতে পারি। কিন্তু প্রায়সময় আমাদের একই ধরণের অনেক অবজেক্ট তৈরি করা লাগে, যেমন ইউজার বা টিচার অবজেক্ট।
=======
The regular `{...}` syntax allows us to create one object. But often we need to create many similar objects, like multiple users or menu items and so on.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

আমরা এটি করতে পারি কনস্ট্রাকটর ফাংশনের `"new"` অপারেটরের সাহায্যে।

## কন্সট্রাকটর ফাংশন

কন্সট্রাকটর ফাংশন দেখতে সাধারণ ফাংশনগুলোর মতই, তবে এটি দুটি নিয়ম মেনে চলে:

1. ফাংশনের নামটি বড় হাতের অক্ষর দিয়ে শুরু হয়। যেমন `user` এর পরিবর্তে `User`
2. এদের ডিক্লেয়ার করার সময় অর্থাৎ ফাংশন কল করার সময় `"new"` অপারেটর দিয়ে কল করতে হবে।

যেমন:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

যখন কোন ফাংশন এ `new` অপারেটর ব্যবহার করা হয়, এটি নিম্নোক্ত বিষয়গুলো মেনে চলে:

1. একটি নতুন খালি অবজেক্ট তৈরি `this` এ অ্যাসাইন হবে।
2. এরপর ফাংশনের বডি এক্সিকিউট হবে। সাধারণত এটি `this` এ রূপান্তর হবে, এবং নতুন প্রপার্টি সংযুক্ত হবে।
3. এবং সবার শেষে `this` এর মান রিটার্ন করবে।

নিচে `new User(...)` কীভাবে কাজ করছে তা দেখানো হয়েছে:

```js
function User(name) {
*!*
  // this = {};  (ইঞ্জিন এখানে this এ একটি খালি অবজেক্ট অ্যাসাইন করছে)
*/!*

  // প্রপার্টিযুক্ত হচ্ছে
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (সবার শেষে ইঞ্জিন this এর মান রিটার্ন করছে)
*/!*
}
```

তাই `let user = new User("Jack")` এর মানটি হবে আমাদের নিচের `{...}` এর সাহায্যে ডিক্লেয়ার করা অবজেক্টের মত:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

এখন আমরা যদি অন্য ইউজার তৈরি করতে চাই, তাহলে এভাবে কল করতে পারে `new User("Ann")`, `new User("Alice")` ইত্যাদি। সাধারণত এটি আরো বেশি পঠনযোগ্য এবং পরিবর্তনযোগ্য।

কন্সট্রাকটর ব্যবহারের প্রধান উদ্দেশ্যই হল পুনরায় ব্যবহারযোগ্য অবজেক্ট তৈরি সহজ করা।

<<<<<<< HEAD
একটি ব্যাপার সম্পর্কে পরিষ্কার ধারণা থাকা দরকার। সাধারণত, যে কোন ফাংশনকে আমরা কন্সট্রাকটর ফাংশন হিসেবে ব্যবহার করতে পারি। অর্থাৎ যেকোন ফাংশনকে `new` দ্বারা কল করা হলে এটি কন্সট্রাকটর ফাংশন হিসেবে কাজ করবে। অর্থাৎ আপনি যদি ফাংশনের নামের সব অক্ষর ছোট হাতের ব্যবহার করেন তাও কাজ করবে, তবে কন্সট্রাকটর ফাংশনকে বড় হাতের অক্ষর দিয়ে শুরু করা সার্বজনীন স্বীকৃত, এবং এটি নির্দেশ করে আমাদের ফাংশনটি ডিক্লেয়ার করতে হবে `new` কী-ওয়ার্ড দ্বারা।

````smart header="new function() { ... }"
যদি আমাদের একটি কমপ্লেক্স অবজেক্ট শুধুমাত্র একবার তৈরি করা লাগে, তাহলে এটি অ্যানোনিমাস ফাংশন কন্ট্রাকটরের সাহায্যে তৈরি করতে পারি, এভাবে:
=======
Let's note once again -- technically, any function (except arrow functions, as they don't have `this`) can be used as a constructor. It can be run with `new`, and it will execute the algorithm above. The "capital letter first" is a common agreement, to make it clear that a function is to be run with `new`.

````smart header="new function() { ... }"
If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// create a function and immediately call it with new
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...user এর অন্যান্য প্রপার্টি
  // লজিক এবং স্টেটমেন্ট
  // লোকাল ভ্যারিয়েবল ইত্যাদি
};
```

<<<<<<< HEAD
এখানে আমরা কন্সট্রাকটরটিকে পুনরায় কল করতে পারব না, কেননা এটি কোথাও সংরক্ষন করা হয়নি, তৈরি করেই কল করা হয়ে গিয়েছে। এই ধরণের এনক্যাপসুলেশন প্রয়োজন হয় একটি অবজেক্টের জন্য, যা পুনরায় ব্যবহার করা যাবে না।
=======
This constructor can't be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## Constructor কিনা যাচাই: new.target

```smart header="অ্যাডভান্স টপিক"
এটি সাধারণত তেমন ব্যবহার করা হয়না, চাইলে এটি বাদ দিতে পারেন, তবে জেনে রাখা ভালো।
```

একটি ফাংশনের মধ্যে আমরা চাইলে যাচাই করতে পারি, এটি `new` দ্বারা কল করা হয়েছে নাকি হয়নি, এজন্য একটি বিশেষ প্রপার্টি আছে `new.target`।

<<<<<<< HEAD
নিচের কোডে আমরা `User` কে `new` দ্বারা কল করলে `new.target` এর মান পাব একটি খালি অবজেক্ট অন্যথায় `undefined`:
=======
It is undefined for regular calls and equals the function if called with `new`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function User() {
  alert(new.target);
}

// "new" বাদে কল:
*!*
User(); // undefined
*/!*

// "new" অপারেটরের সাহায্যে কল:
*!*
new User(); // function User { ... }
*/!*
```

উপরের টেকনিকটি খাটিয়ে আমরা কোন ফাংশনকে "constructor mode" এ নাকি "regular mode" কল করা হচ্ছে তা জানতে পারব।

এবং আমরা চাইলে আমাদের "regular mode" এ কল করা ফাংশনকেও `new` দ্বারা আবদ্ধ করতে পারি, এভাবে:

```js run
function User(name) {
  if (!new.target) { // new ব্যাতীত কল করলে এটি এক্সিকিউট হবে
    return new User(name); // ...new অ্যাসাইন হচ্ছে
  }

  this.name = name;
}

let john = User("John"); // new User কল হবে
alert(john.name); // John
```

অনেকসময় এটি ব্যবহার করা হয় লাইব্রেরীগুলোর সিনট্যাক্স আরো সহজবোধ্য করতে। ফলে আমরা কোন ফাংশনকে `new` ছাড়া কল করলেও কাজ করবে।

তবে এটি কোন ভালো আইডিয়া না, কেননা `new` বাদে কল করলে আমাদের কোড কীভাবে কাজ করছে তা জানা কিছুটা দুর্বোধ্য হয়ে যাবে। কেননা `new` দ্বারা কল করলে আমরা বুঝতে পারি একটি `Object` তৈরি হচ্ছে।

## কন্সট্রাকটরের রিটার্ন

সাধারণত কন্সট্রাকটরের `return` স্টেটমেন্ট থাকে না। এর সব কাজ `this` এ সম্পন্ন হয়ে সবার শেষে `this` কে রিটার্ন করে।

কিন্তু যদি `return` স্টেটমেন্ট থাকে, তাহলে এটি নিম্নোক্ত নিয়ম মেনে চলে:

- যদি কোন অবজেক্টকে `return` করা হয় তাহলে এটি `this` এর পরিবর্তে ঐ অবজেক্টকে রিটার্ন করবে।
- যদি কোন প্রিমিটিভ ভ্যালু `return` করা হয় তাহলে এটি উপেক্ষা করবে।

অন্যভাবে বলতে গেলে, যদি আমরা `this` এর পরিবর্তে কোন অবজেক্ট `return` করি তাহলে এটি ঐ অবজেক্টকেই রিটার্ন করে, অন্যথায় `this` রিটার্ন হয়।

যেমন, এখানে `return` এ `this` কে অন্য একটি অবজেক্ট দ্বারা ওভাররাইড করা হচ্ছে:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object
```

আরো একটি উদাহরণ দেখা যাক যেখানে আমরা শুধু `return` স্টেটমেন্ট ব্যবহার করছি (অথবা এটি প্রিমিটিভ ভ্যালুও হতে পারে, যা উপেক্ষা করবে):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- returns this
}

alert( new SmallUser().name );  // John
```

সাধারণত কন্সট্রাকটরে `return` স্টেটমেন্ট ব্যবহার করা হয়না। তারপরও আমরা এটি আলোচনা করেছি যদি ব্যবহার করি তাহলে তা কেমন আচরণ করে তা জানার জন্য।

<<<<<<< HEAD
````smart header="প্রথমবন্ধনী ছাড়া কল"
আমরা new অপারেটর ব্যবহারের সময় `()` ছাড়াও কন্সট্রাকটর ফাংশনকে কল করতে পারি, যদি এতে কোন আর্গুমেন্ট না থাকে:
=======
````smart header="Omitting parentheses"
By the way, we can omit parentheses after `new`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let user = new User; // <-- no parentheses
// same as
let user = new User();
```

যদিও বন্ধনী ছাড়া কন্সট্রাকটর স্টেটমেন্ট লিখা উচিত না, তারপরও যে এই সিনট্যাক্স কাজ করে তা বুঝার জন্য এটি আলোচনা করা হল।
````

## কনস্ট্রাকটরে মেথড কল

কনস্ট্রাকটর ফাংশনের মাধ্যমে আমরা সহজে রিইউজেবল অবজেক্ট তৈরি করতে পারি। এতে প্যারামিটার থাকতে পারে, যার মাধ্যমে নির্ধারণ করে দিতে পারি অবজেক্টটি কীভাবে তৈরি হবে।

অবশ্যই, আমরা `this` এ শুধুমাত্র প্রপার্টি না, মেথডও রাখতে পারি।

যেমন নিচের কোডে `new User(name)` এর একটি `name` প্রপার্টি আছে এবং একটি মেথড `sayHi`:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

কমপ্লেক্স অবজেক্ট তৈরিতে আমরা [classes](info:classes) সিনট্যাক্স ব্যবহার করতে পারব, যার সম্পর্কে পরবর্তী অধ্যায়ে বিস্তারিত জানতে পারব।

## সারাংশ

- কন্সট্রাকটর ফাংশন এবং রেগুলার ফাংশনের মাঝে পার্থক্য হল কন্সট্রাকটর ফাংশন ক্যামেল কেসে লিখা হয়।
- কন্সট্রাকটর ফাংশনকে `new` দ্বারা কল করা হয়। এইক্ষেত্রে ফাংশনের শুরুতে একটি খালি `this` অবজেক্ট তৈরি হবে এবং সবার শেষে `this` অবজেক্ট রিটার্ন হবে।

সাধারণত কনস্ট্রাকটর ফাংশন ব্যবহার করি একই টাইপের অনেক অবজেক্ট ডিক্লেয়ার করতে।

জাভাস্ক্রিপ্টে অনেক বিল্ট-ইন কনস্ট্রাকটর ফাংশন আছে, যেমন `Date`, `Set`, `Map` ইত্যাদি। যার সম্পর্কে সামনের অধ্যায়গুলোতে বিস্তারিত জানতে পারব।

```smart header="পরবর্তী অধ্যায়গুলোতে অবজেক্ট নিয়ে আরো বিস্তারিত জানব!"
এই অধ্যায়ে আমরা বেসিক অবজেক্ট এবং কনস্ট্রাকটর সম্পর্কে জেনেছি। যা পরবর্তী অধ্যায়ে বিভিন্ন ডাটা টাইপ এবং ফাংশন সম্পর্কে বুঝতে জানা থাকা উচিত।

এর শেষে আমরা অবজেক্ট নিয়ে আরো বিষদ আলোচনা করেছি <info:prototypes> এবং <info:classes> এর অধ্যায়ে।
```

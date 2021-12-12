
# প্রপার্টি getter এবং setter

জাভাস্ক্রিপ্টে অবজেক্ট প্রপার্টি দুই ধরণের।

এর মধ্যে একটি হল *data properties*। ইতোমধ্যে আমরা এদের দেখেছি। এই পর্যন্ত আমরা যেসব প্রপার্টি দেখেছি তাদের বলা হয় ডাটা প্রপার্টিস।

আরেক প্রকার প্রপার্টিটি আমাদের জন্য নতুন। একে বলা হয় *accessor properties*।  আসলে এরা হল ফাংশন যার মাধ্যমে কোন ভ্যালু *get* বা *set* করা যায়। তবে এরা রেগুলার প্রপার্টির ন্যায় কাজ করে।

## Getters এবং setters

অ্যাক্সেসর প্রপার্টিকে সাধারণত রিপ্রেজেন্ট করা হয় "getter" এবং "setter" মেথড দ্বারা। অবজেক্টে লিখার সময় এদের লিখা হয় `get` এবং `set` দ্বারা:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, এটি এক্সিকিউট হবে যখন obj.propName কল হবে
  },

  *!*set propName(value)*/!* {
    // setter, এটি এক্সিকিউট হবে যখন obj.propName = value কল হবে
  }
};
```

অর্থাৎ getter কল হয় `obj.propName` এর মান পড়তে, এবং setter কল হয় মান অ্যাসাইন করতে।

যেমন, আমাদের `user` অবজেক্টে প্রপার্টিসমূহ হল `name` এবং `surname`:

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

এখন আমরা একটি একটি নতুন প্রপার্টি `fullName` সংযোজন করতে চাচ্ছি, যেটির মান হবে `"John Smith"`। অবশ্যই আমরা নামগুলো কপি-পেস্টের মাধ্যমে লিখতে চাই না, সুতরাং আমরা এর জন্য অ্যাক্সেসর ব্যবহার করতে পারি:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

সাধারণত অ্যাক্সেসর প্রপার্টি সমূহ অবজেক্ট নিয়ে কাজ করার সময় সাধারণ প্রপার্টির মত কাজ করে। এটিই অ্যাক্সেসর প্রপার্টির আইডিয়া। আমরা `user.fullName` কে ফাংশন হিসেবে *call* করব না, কিন্তু এদের আমরা সাধারণ প্রপার্টির মত *read* করতে পারব: এখানে getters আমাদের অন্তরালে কাজ করবে।

এ পর্যন্ত, আমরা `fullName` এর জন্য getter ব্যবহার করেছি। এখন আমরা যদি এর মধ্যে মান অ্যাসাইন করতে চাই অর্থাৎ `user.fullName=`, তাহলে একটি এরর হবে:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (কেননা প্রপার্টির জন্য শুধুমাত্র getter সংজ্ঞায়িত করা হয়েছে)
*/!*
```

চলুন, `user.fullName` এর জন্য একটি setter ফাংশন লিখি:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// এখন fullName আমাদের নতুন মানের জন্য কাজ করবে
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

getter এবং setter এর মাধ্যমে আমরা একটি "virtual" প্রপার্টি `fullName` ডিক্লেয়ার করেছি। যেটি পঠনযোগ্য এবং লিখনযোগ্য (readable এবং writable)।

## অ্যাক্সেসর ডেস্ক্রিপ্টর

অ্যাক্সেসর প্রপার্টির জন্য ডেস্ক্রিপ্টর প্রপার্টি সমূহ ডাটা প্রপার্টি থেকে ভিন্ন।

অ্যাক্সেসর প্রপার্টির জন্য, কোন `value` বা `writable` ফ্ল্যাগ থাকে না, তার পরিবর্তে `get` এবং `set` ফাংশন আছে।

অ্যাক্সেসর ডেস্ক্রিপ্টর এ থাকে:

- **`get`** -- একটি ফাংশন যার কোন আর্গুমেন্ট থাকে না, এটি প্রপার্টির মান পড়তে ব্যবহার হয়,
- **`set`** -- একটি ফাংশন যার একটি আর্গুমেন্ট থাকে, যখন কোন মান অ্যাসাইন করতে চাই তখন কল হবে,
- **`enumerable`** -- ডাটা প্রপার্টির মত কাজ করে,
- **`configurable`** -- ডাটা প্রপার্টির মত কাজ করে,

যেমন, নিচের কোডে আমরা `defineProperty` এর মাধ্যমে `fullName` ডিফাইন করব, এর জন্য আমরা `get` এবং `set` ফাংশন ব্যবহার করি:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

দয়া করে মনে রাখুন কোন প্রপার্টি হয় অ্যাক্সেসর হবে (অর্থাৎ `get/set` মেথড) থাকবে অন্যথায় ডাটা প্রপার্টি হবে (`value` থাকে), একই সাথে অ্যাক্সেসর এবং ডাটা প্রপার্টি হবে না।

যদি আমরা এভাবে করতে চাই অর্থাৎ `get` এবং `value` উভয়ই যদি ডেস্ক্রিপ্টর এ ডিফাইন করি তাহলে এরর হবে:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## স্মার্ট getters/setters

Getters/setters দ্বারা আমরা আমাদের প্রপার্টি সমূহকে আরো বিভিন্ন ভাবে কন্ট্রোল করতে পারি।

যেমন, যদি আমরা আমাদের `user` এর নাম সংক্ষিপ্ত হওয়া এড়াতে চাই, এক্ষেত্রে আমরা setter দ্বারা `name` কে আলাদা করে `_name` প্রপার্টিতে সেট করতে পারি এবং সংক্ষিপ্ত নামের জন্য একটি অ্যালার্ট দেখাতে পারি:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // সংক্ষিপ্ত নাম...
```

সুতরাং আমাদের মূল নামটি সংরক্ষন হবে `_name` প্রপার্টি এর মধ্যে তবে আমরা `name` কে পড়ব বা অ্যাসাইন করব getter এবং setter এর দ্বারা।

আমরা জানি, যেসব প্রপার্টির নাম আন্ডারস্কোর `"_"` দিয়ে শুরু হয় তারা হল ইন্টারনাল প্রপার্টি এদের বাহির হতে অ্যাক্সেস করা উচিত নই, যদিও টেকনিক্যালি `user._name` এর মান বাহির হতে পাওয়া সম্ভব।


## কোড এর সামঞ্জস্য

অ্যাক্সেসরের অন্যতম দারুন একটি ব্যবহার হল এর মাধ্যমে আমরা আমাদের প্রপার্টি সমূহের ডাটা পরিবর্তন হলেও এর বিহেভিয়ার অপরিবর্তনীয় রাখতে পারি।

মনে করুন আমাদের একটি `User` অবজেক্ট আছে যাদের প্রপার্টি হল `name` এবং `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...তবে পরবর্তীতে আমরা আমাদের কোডকে পরিবর্তন করলাম। `age` এর পরিবর্তে আমরা এখন `birthday` সংরক্ষণ করব, কেননা এটি বেশি সুস্পষ্ট এবং সুবিধাজনক:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

এখন আমাদের যেসব কোডে `age` প্রপার্টি ব্যবহার করা হয়েছে তাদের কি হবে?

আমরা চাইলে সকল age প্রপার্টিকে খুঁজে পরিবর্তন করতে পারি, তবে যদি আমাদের অনেক পরিবর্তন করা লাগে তাহলে তা হবে কষ্টসাধ্য। এর পাশাপাশি, আমাদের কিছু কিছু জায়গায় `age` দেখানো লাগতে পারে, তাই না?

আমরা চাই যেন এটি সঠিকভাবে কাজ করে।

এজন্য `age` এর জন্য একটি getter ব্যবহারের মাধ্যমে সমস্যাটির সমাধান করতে পারি:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // এখানে আমরা বর্তমান age ক্যাল্কুলেশন করছি
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday কে অ্যাক্সেস করতে পারছি
alert( john.age );      // ..এবং age ও কাজ করছে
```

এখন আমরা দেখছি আমাদের পুরনো স্ট্রাকচারটাকে কিভাবে নতুন স্ট্রাকচারের সাথে কাজ করাতে পারছি।
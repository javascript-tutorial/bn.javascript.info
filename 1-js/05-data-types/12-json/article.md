# জেসন মেথড, toJSON

মনে করুন আমাদের একটি কমপ্লেক্স অবজেক্ট আছে, এবং আমরা এটিকে সার্ভারে সেন্ড করতে বা লগ করতে স্ট্রিংয়ে রূপান্তর করতে চাই।

সাধারণত, এক্ষেত্রে অবজেক্টের সকল প্রপার্টি স্ট্রিংয়ে রূপান্তর করতে হবে।

এটি আমরা `toString()` এর সাহায্যে এভাবে করতে পারি:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...তবে এক্ষেত্রে সমস্যা হল, ডেভলাপমেন্টের সময় অবজেক্টে আরো নতুন প্রপার্টি যুক্ত বা বাদ বা প্রপার্টির নাম সংশোধন করা লাগতে পারে। এবং অবজেক্টে কোন পরিবর্তন করলে আমাদের `toString` এ ম্যানুয়ালী পরিবর্তন করতে হবে, যা আসলে কষ্টসাধ্য এবং বিরক্তিকর। তবে চাইলে আমরা লুপের সাহায্যে আমাদের কাঙ্খীত স্ট্রিং পেতে পারি, তবে এক্ষেত্রে আমাদের কমপ্লেক্স নেস্টেড অবজেক্টের জন্যও কাজ করা লাগতে পারে।

সৌভাগ্যক্রমে, ইতোমধ্যে একটি বিল্ট-ইন একটি অবজেক্ট আছে `JSON`। যার সাহায্যে আমরা এটি সমাধান করতে পারি।

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) হল  ভ্যালু বা অবজেক্টকে একটি সাধারণ ফর্মে দেখানোর পদ্ধতি [RFC 4627](http://tools.ietf.org/html/rfc4627)। এটি সর্বপ্রথম জাভাস্ক্রিপ্টের জন্য তৈরি করা হয়েছিল, তবে বর্তমানে অন্যান্য সকল ল্যাংগুয়েজে `JSON` নিয়ে কাজ করার নিজস্ব লাইব্রেরী আছে। তাই এখন ক্লায়েন্ট থেকে সার্ভারের (যেমন পাইথন, রুবি, জাভা, পিএইচপি ইত্যাদির) সাথে সহজেই `JSON` ডাটা আদান-প্রদান করা যায়।

জাভাস্ক্রিপ্টে `JSON` এর দুটি মেথড আছে:

- `JSON.stringify` অবজেক্ট বা ভ্যালুকে JSON এ রূপান্তর করে।
- `JSON.parse` JSON হতে অবজেক্ট বা ভ্যালুতে রূপান্তর করে।

উদাহরণস্বরূপ, এখানে `student` অবজেক্টকে `JSON.stringify` দ্বারা `JSON` এ রূপান্তর:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // টাইপ স্ট্রিং

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
*/!*
```

`JSON.stringify(student)` মেথডটি `student` অবজেক্টকে স্ট্রিংয়ে রূপান্তর করছে।

`json` স্ট্রিংটিকে বলা হয় *JSON-encoded* বা *serialized* বা *stringified* বা *marshalled* অবজেক্ট। এটি এখন সার্ভারে পাঠানোর জন্য অথবা কোন টেক্সট আকারে কোথাও সংরক্ষনের জন্য প্রস্তুত।

দয়া করে মনে রাখুন একটি JSON-encoded অবজেক্ট আর সাধারণ অবজেক্টের কিছু পার্থক্য আছে:

- JSON এ কোন একক উদ্ধৃতি (single quotes '') চিহ্ন বা ব্যাকটিকস (` `` `) থাকে না। সুতরাং `'John'` হবে `"John"`।
- অবশ্যই অবজেক্টের প্রপার্টি দ্বৈত উদ্ধৃতি(double quoted "")  চিহ্ন দ্বারা আবদ্ধ থাকবে। সুতরাং `age:30` হবে `"age":30`।

প্রিমিটিভ ডাটা টাইপের জন্যও `JSON.stringify` কাজ করবে।

JSON নিম্নোক্ত ডাটাটাইপ সাপোর্ট করে:

- Objects `{ ... }`
- Arrays `[ ... ]`
- Primitives:
    - strings,
    - numbers,
    - boolean ভ্যালু `true/false`,
    - `null`.

যেমন:

```js run
// নাম্বারের JSON হবে নাম্বার
alert( JSON.stringify(1) ) // 1

// স্ট্রিংয়ের JSON হবে স্ট্রিংয়ের, তবে এটি দ্বৈত উদ্ধৃতি(double quoted "")  চিহ্ন দ্বারা আবদ্ধ থাকবে
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```

JSON ল্যাংগুয়েজের উপর সীমাবদ্ধ নই, তাই `JSON.stringify` JavaScript-specific অবজেক্ট প্রপার্টি সমূহকে উপেক্ষা করবে।

সাধারণত:

- ফাংশন প্রপার্টি (methods)।
- Symbolic প্রপার্টি।
- অথবা প্রপার্টির ভ্যালু `undefined` হলে।

```js run
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored
};

alert( JSON.stringify(user) ); // {} (empty object)
```

যেহেতু এখানের সকল প্রপার্টি জাভাস্ক্রিপ্টের নিজস্ব পদ্ধতি, তাই খালি অবজেক্ট রিটার্ন করেছে, তবে আমরা চাইলে এদের কাস্টমাইজ করতে পারি, যা নিচে আলোচনা করা হয়েছে।

তবে আনন্দের বিষয় হল এটি নেস্টেড অবজেক্টের জন্যও কাজ করে।

যেমন:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* সম্পূর্ণ অবজেক্টটি stringified করা হয়েছে:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

তবে এর একটি সীমাবদ্ধতা আছে, এক্ষেত্রে কোন সার্কুলার রেফারেন্স থাকা যাবে না।

যেমন:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup references room
room.occupiedBy = meetup; // room references meetup

*!*
JSON.stringify(meetup); // Error: Converting circular structure to JSON
*/!*
```

এখানে এটি এরর হবে, কেননা এদের মাঝে উভমুখী রেফারেন্স ডিক্লেয়ার করা হয়েছে, যেমন `room.occupiedBy` রেফারেন্স করছে `meetup` কে, এবং `meetup.place` রেফারেন্স করছে `room` কে:

![](json-meetup.svg)


## প্রপার্টির রূপান্তর: replacer

`JSON.stringify` এর সম্পূর্ণ সিনট্যাক্সটি হল:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: এনকোড করার জন্য ভ্যালু।

replacer
: প্রপার্টিসমূহের অ্যারে বা একটি ম্যাপ ফাংশন `function(key, value)`।

space
: ফরম্যাটিংয়ে ব্যবহৃত স্পেস

বেশিরভাগ সময় আমরা `JSON.stringify` এ শুধুমাত্র প্রথম আর্গুমেন্টটি ব্যবহার করি। তবে যদি আমরা এনকোডের সময় কোন প্রপার্টি কাস্টমাইজ করতে চাই, তাহলে `JSON.stringify` এর  দ্বিতীয় আর্গুমেন্টটি ব্যবহার করব।

যদি আমরা দ্বিতীয় আর্গুমেন্টে প্রপার্টির নামের অ্যারে পাঠাই, তাহলে শুধুমাত্র ঐ প্রপার্টিগুলো সেট হবে।

যেমন:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

এক্ষেত্রে আমরা একটি অদ্ভুত ব্যাপার লক্ষ্য করছি, যদিও আমরা সম্পূর্ণ অবজেক্টটি পাস করেছি, কিন্তু `participants` এর মান খালি দেখায়, কেননা আমরা আর্গুমেন্ট অ্যারেতে `name` প্রপার্টি সংযুক্ত করিনি।

এখন চলুন আমাদের অবজেক্টের সার্কুলার রেফারেন্সের জন্য `room.occupiedBy` বাদে বাকী সকল প্রপার্টিযুক্ত করি:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

এখন আমরা `occupiedBy` বাদে বাকী সকল প্রপার্টিকে সিরিয়ালাইজড করেছি, কিন্তু এভাবে করায় আমাদের অ্যারে লিস্টের প্রপার্টি বেড়েই চলছে যা কমপ্লেক্স অবজেক্টের জন্য নিয়ন্ত্রন করা কষ্টসাধ্য।

তবে, এজন্য আমরা চাইলে অ্যারের পরিবর্তে একটি `replacer` ফাংশন ব্যবহার করতে পারি।

ফাংশনটি প্রতিটি প্রপার্টির জন্য `(key, value)` হিসেবে কল হবে এবং একটি মান রিটার্ন করবে যা ঐ প্রপার্টির ভ্যালু হিসেবে সেট হবে। অথবা ঐ প্রপার্টি বাদ দিতে আমরা `undefined` সেট করতে পারি।

এক্ষেত্রে উপরের অংশেরমত মান পেতে আমরা `value` রিটার্ন করব আর `occupiedBy` কে বাদ দিতে কন্ডিশন যাচাই করে তার মান `undefined` সেট করব:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
*/
```

দয়া করে মনে রাখবেন `replacer` ফাংশন নেস্টেড অবজেক্টের সকল প্রপার্টি key/value হিসেবে পায়, এটি `recursively` কল হয়। `replacer` এর মাঝে `this` বর্তমান অবজেক্টকে নির্দেশ করবে।

তবে এক্ষেত্রে প্রথম ইটারেশনটি একটু আলাদা। এটি তৈরি হয় একটি "wrapper object" দ্বারা `{"": meetup}`। অন্যভাবে বলতে গেলে প্রথমবার `(key, value)` এর key হবে খালি এবং ভ্যালু হবে টার্গেট অবজেক্টের মান। যার কারণে সবার শুরুতে আমরা এটি দেখতে পাই `":[object Object]"`।

উপরের আলোচনা থেকে আমরা বুঝতে পারি `replacer` ফাংশনটি যথেষ্ট শক্তিশালী: এর উপর ভিত্তি করে আমরা যেকোন প্রপার্টি পরিবর্তন বা বাদ দিতে পারি।


## ফরম্যাটিং: স্পেস

`JSON.stringify(value, replacer, space)` এর তৃতীয় আর্গুমেন্টটি একটি পূর্ণ ধনাত্নক সংখ্যা নেয়, যা দ্বারা আমরা স্ট্রিংটি আরো সুন্দর করে ফরম্যাট করতে পারি।

ইতোমধ্যে আমরা যেসব এনকোডেড স্ট্রিং দেখেছি এদের ফরম্যাট বা অতিরিক্ত স্পেস ছিল না। সার্ভারে ডাটা পাঠাতে এটি সমস্যা করবে না, কিন্তু যদি আমরা লগ অ্যাপ্লিকেশনের জন্য স্ট্রিংটি সুন্দর করে দেখাতে চাই এক্ষেত্রে স্ট্রিংটিকে আমাদের সুন্দর পাঠযোগ্য ফরম্যাটে দেখানো উচিত।

এখানে `space = 2` দ্বারা বুঝানো হচ্ছে নেস্টেড অবজেক্টটি মাল্টিপল লাইনে সুন্দর ফরম্যাটে দেখাবে:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/* দুই স্পেস ইন্ডেন্টেশন:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* JSON.stringify(user, null, 4) চার স্পেস ইন্ডেন্টেশন:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

`space` প্যারামিটারটি আমরা ব্যবহার করি লগ কে সুন্দর ভাবে দেখাতে।

## নিজস্ব "toJSON"

জাভাস্ক্রিপ্ট কোন অবজেক্টকে স্ট্রিং এ রূপান্তরের জন্য `toString` ব্যবহার করে, অবজেক্টকে JSON এ রূপান্তরের সময়ও ভ্যালু স্ট্রিং হিসেবে পেতে `JSON.stringify` `toJSON` কল করে। এক্ষেত্রে `JSON.stringify` স্বয়ংক্রিয়ভাবে `toString` কে কল করে।

যেমন:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

এখানে আমরা দেখছি `(1)` এ নির্দেশিত `date` অবজেক্টটি একটি স্ট্রিংয়ে রূপান্তর হয়েছে। কেননা আমাদের `Date` অবজেক্টে বিল্টইন `toJSON` মেথড রয়েছে।

এখন চলুন `(2)` এর নির্দেশিত `room` প্রপার্টির জন্য কাস্টম `toJSON` ইমপ্লিমেন্ট করি:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

সুতরাং আমরা বুঝতে পারছি এনকোডের সময় আমাদের `JSON.stringify(room)` স্বয়ংক্রিয়ভাবে `toString` কে কল করে যার ফলে `room` নেস্টেড অবজেক্ট হওয়ার পরও এটি নাম্বার হিসেবে সেট হয়েছে।


## JSON.parse

JSON-string হতে অবজেক্টে রূপান্তরের জন্য আরেকটি মেথড আছে [JSON.parse](mdn:js/JSON/parse)।

সিন্ট্যাক্স হল:
```js
let value = JSON.parse(str, [reviver]);
```

str
: অবজেক্টে রূপান্তরের জন্য JSON-string।

reviver
: অপশনাল function(key,value) যেটি প্রতিটি প্রপার্টির জন্য কল হবে এবং আমরা কন্ডিশনালি ভ্যালু পরিবর্তন করতে পারব।

যেমন:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

নেস্টেড অবজেক্টের জন্য:

```js run
let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
```

JSON স্ট্রিংটি আরো কমপ্লেক্স হতে পারে, এতে অ্যারে, অবজেক্ট ও যুক্ত থাকতে পারে। তবে সবাইকে অবশ্যই একই JSON ফরম্যাট মানতে হবে।

তবে অনেক সময় ম্যানুয়ালি JSON লিখার সময় কিছু সাধারণ ভুল প্রায় হয়:

```js
let json = `{
  *!*name*/!*: "John",                     // এটি ভুল: প্রপার্টি অবশ্যই double quoted হতে হবে
  "surname": *!*'Smith'*/!*,               // এটি ভুল: ভ্যালু single quotes(অবশ্যই double quoted হতে হবে)
  *!*'isAdmin'*/!*: false                  // এটি ভুল: প্রপার্টি single quotes (অবশ্যই double quoted হতে হবে)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // এটি ভুল: "new" কীওয়ার্ড অ্যালাউ হবে না
  "friends": [0,1,2,3]              // এটি সঠিক
}`;
```

এছাড়াও JSON এর মাঝে কমেন্ট গ্রহণযোগ্য না। কমেন্ট সংযুক্তের জন্য JSON ইনভ্যালিড হবে।

তবে এই ধরণের ইনভ্যালিড JSON কে পার্স করার জন্য একটি লাইব্ররী আছে [JSON5](http://json5.org/), যা single quotes, comments ইত্যাদি প্রপার্টিযুক্ত স্ট্রিংকেও পার্স করতে পারে।

এটা ভাবার কারণ নেই, JSON এর ডেভলাপাররা অলস বলে এইসব সমস্যার সমাধান করছে না, কারণ এই স্ট্রিক্ট থাকার ফলে পার্সিং অ্যালগরিদমটি অনেক দ্রুত কাজ করে।

## অপশনাল reviver ফাংশন

মনে করুন, আমরা সার্ভার হতে একটি stringified `meetup` অবজেক্ট পেয়েছি।

দেখতে এমন:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...এখন আমরা এটিকে *deserialize* করে জাভাস্ক্রিপ্ট অবজেক্টে রূপান্তর করে নেব।

চলুন `JSON.parse` কে কল করি:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

ওপস! এরর!

কেননা `meetup.date` হল একটি স্ট্রিং, কোন `Date` অবজেক্ট না। এখন *deserialize* করার সময়  `JSON.parse` কীভাবে এটিকে `Date` অবজেক্টে রূপান্তর করবে?

এক্ষেত্রে আমরা `JSON.parse` এর দ্বিতীয় আর্গুমেন্টে একটি ফাংশন পাঠাব যেটি `date` প্রপার্টির মানকে `Date` অবজেক্টে রূপান্তর করবে:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // কাজ করছে!
```

মজার ব্যাপার হল, এটি নেস্টেড অবজেক্ট প্রপার্টির জন্যও কাজ করবে:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```



## সারাংশ

- JSON হল একটি ডাটা ফরম্যাট যেটি কোন নির্দিষ্ট ল্যাংগুয়েজের উপর নির্ভর না, প্রায় সকল প্রোগ্রামিং ল্যাংগুয়েজে JSON এর জন্য স্ট্যান্ডার্ড লাইব্রেরী আছে।
- JSON সাপোর্ট করে অবজেক্ট, অ্যারে, স্ট্রিং, নাম্বার, বুলিয়ান এবং `null` ডাটা টাইপ।
- জাভাস্ক্রিপ্টে ডাটাকে জেসন এনকোডের জন্য  [JSON.stringify](mdn:js/JSON/stringify) এবং জেসন ডিকোড করতে [JSON.parse](mdn:js/JSON/parse) এই দুটি মেথড আছে।
- এনকোড বা ডিকোডের সময় প্রপার্টি সমূহকে কাস্টমাইজেশনের জন্য দুটি মেথডই কলব্যাক ফাংশন সাপোর্ট করে।
- যদি কোন অবজেক্টে `toJSON` মেথড থাকে, তাহলে `JSON.stringify` এর সময় স্বয়ংক্রিয়ভাবে `toJSON` কল হবে।

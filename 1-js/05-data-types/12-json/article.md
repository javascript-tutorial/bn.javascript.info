# JSON methods, toJSON

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

সৌভাগ্যক্রমে, ইতোমধ্যে এ জন্য একটি বিল্ট-ইন একটি অবজেক্ট আছে `JSON`। যার সাহায্যে আমরা এটি সমাধান করতে পারি।

## JSON.stringify

[JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) হল  is a general format to represent values and objects. It is described as in [RFC 4627](http://tools.ietf.org/html/rfc4627) standard. এটি সর্বপ্রথম জাভাস্ক্রিপ্টের জন্য তৈরি করা হয়েছিল, তবে বর্তমানে অন্যান্য সকল ল্যাঙ্গগুয়েজে `JSON` নিয়ে কাজ করার নিজস্ব লাইব্রেরী আছে। তাই এখন ক্লায়েন্ট থেকে সার্ভারের (যেমন পাইথন, রুবি, জাভা, পিএইচপি ইত্যাদির) সাথে সহজেই `JSON` ডাটা আদান-প্রদান করা যায়।

জাভাস্ক্রিপ্টে এর দুটি মেথড আছে:

- `JSON.stringify` অবজেক্টকে JSON এ রূপান্তর করে।
- `JSON.parse` JSON হতে অবজেক্টে রূপান্তর করে।

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

`json` স্ট্রিংটিকে বলা হয় *JSON-encoded* বা *serialized* বা *stringified* বা *marshalled* অবজেক্ট। এটি এখন সার্ভারে পাঠানোর জন্য তৈরি অথবা কোন টেক্সট আকারে কোথাও সংরক্ষনের জন্য প্রস্তুত।

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
    - boolean values `true/false`,
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

JSON ল্যাঙ্গগুয়েজের উপর সীমাবদ্ধ নই, তাই `JSON.stringify` JavaScript-specific অবজেক্ট প্রপার্টি সমূহকে উপেক্ষা করবে।

সাধারণত:

- ফাংশন প্রপার্টি (methods)।
- Symbolic প্রপার্টি।
- প্রপার্টির ভ্যালু `undefined` হলে।

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

তবে, এটি ভাল। আমাদের নিজস্ব কাস্টমাইজ ভাবে কীভাবে করা লাগে তা আমরা নিচে আলচনা করেছি।

তবে সবচেয়ে ভাল কথা হল এটি নেস্টেড অবজেক্টের জন্যও কাজ করে।

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


## Excluding and transforming: replacer

The full syntax of `JSON.stringify` is:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: A value to encode.

replacer
: Array of properties to encode or a mapping function `function(key, value)`.

space
: Amount of space to use for formatting

Most of the time, `JSON.stringify` is used with the first argument only. But if we need to fine-tune the replacement process, like to filter out circular references, we can use the second argument of `JSON.stringify`.

If we pass an array of properties to it, only these properties will be encoded.

For instance:

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

Here we are probably too strict. The property list is applied to the whole object structure. So the objects in `participants` are empty, because `name` is not in the list.

Let's include in the list every property except `room.occupiedBy` that would cause the circular reference:

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

Now everything except `occupiedBy` is serialized. But the list of properties is quite long.

Fortunately, we can use a function instead of an array as the `replacer`.

The function will be called for every `(key, value)` pair and should return the "replaced" value, which will be used instead of the original one. Or `undefined` if the value is to be skipped.

In our case, we can return `value` "as is" for everything except `occupiedBy`. To ignore `occupiedBy`, the code below returns `undefined`:

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

Please note that `replacer` function gets every key/value pair including nested objects and array items. It is applied recursively. The value of `this` inside `replacer` is the object that contains the current property.

The first call is special. It is made using a special "wrapper object": `{"": meetup}`. In other words, the first `(key, value)` pair has an empty key, and the value is the target object as a whole. That's why the first line is `":[object Object]"` in the example above.

The idea is to provide as much power for `replacer` as possible: it has a chance to analyze and replace/skip even the whole object if necessary.


## Formatting: space

The third argument of `JSON.stringify(value, replacer, space)` is the number of spaces to use for pretty formatting.

Previously, all stringified objects had no indents and extra spaces. That's fine if we want to send an object over a network. The `space` argument is used exclusively for a nice output.

Here `space = 2` tells JavaScript to show nested objects on multiple lines, with indentation of 2 spaces inside an object:

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
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
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

The `space` parameter is used solely for logging and nice-output purposes.

## Custom "toJSON"

Like `toString` for string conversion, an object may provide method `toJSON` for to-JSON conversion. `JSON.stringify` automatically calls it if available.

For instance:

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

Here we can see that `date` `(1)` became a string. That's because all dates have a built-in `toJSON` method which returns such kind of string.

Now let's add a custom `toJSON` for our object `room` `(2)`:

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

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and when `room` is nested in another encoded object.


## JSON.parse

JSON-string হতে অবজেক্টে রূপান্তরের জন্য আরেকটি মেথড আছে [JSON.parse](mdn:js/JSON/parse)।

সিন্ট্যাক্স হল:
```js
let value = JSON.parse(str, [reviver]);
```

str
: অবজেক্টে রূপান্তরের জন্য JSON-string।

reviver
: অপশনাল function(key,value) যেটি প্রতিটি প্রপার্টির জন্য কল হবে এবং আমরা কন্ডিশনালি ভ্যালু ট্রান্সফর্ম করতে পারব।

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

তবে অনেক সময় হাতে JSON লিখার সময় কিছু সাধারণ ভুল প্রায় হয়:

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

তবে এই ধরণের JSON কে পার্স করার জন্য একটি লাইব্ররী আছে [JSON5](http://json5.org/), যা single quotes, comments ইত্যাদি প্রপার্টিযুক্ত স্ট্রিংকে পার্স করতে পারে।

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



## Summary

- JSON is a data format that has its own independent standard and libraries for most programming languages.
- JSON supports plain objects, arrays, strings, numbers, booleans, and `null`.
- JavaScript provides methods [JSON.stringify](mdn:js/JSON/stringify) to serialize into JSON and [JSON.parse](mdn:js/JSON/parse) to read from JSON.
- Both methods support transformer functions for smart reading/writing.
- If an object has `toJSON`, then it is called by `JSON.stringify`.

# Form properties এবং methods

ফর্মস এবং কন্ট্রোল এলিমেন্ট সমূহের অনেক স্পেশাল প্রপার্টি এবং ইভেন্ট আছে, যেমন `<input>`।

ফর্মের সাথে কাজ করতে করতে তা শিখা আমাদের জন্য সুবিধাজনক।

## Navigation: form এবং elements

ফর্মস সমূহ ডকুমেন্ট এর একটি স্পেশাল কালেকশন `document.forms`।

এটিকে বলা হয় "named collection": এটির নাম এবং ইনডেক্সিং উভয়ই আছে। আমরা নাম বা ইনডেক্স উভয়ের সাহায্যেই ফর্ম এলিমেন্টকে অ্যাক্সেস করতে পারি।

```js no-beautify
document.forms.my - the form with name="my"
document.forms[0] - the first form in the document
```

একটি ফর্মের সকল এলিমেন্ট `form.elements` এ কালেকশন হিসেবে থাকে।

উদাহরণস্বরূপ:

```html run height=40
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // get the form
  let form = document.forms.my; // <form name="my"> element

  // get the element
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

ফর্মে একই নামের একাধিক এলিমেন্ট থাকতে পারে, যেমন রেডিও বাটন টাইপ।

এক্ষেত্রে এটি ইনডেক্সিং অর্ডার কালেকশন হিসেবে থাকে `form.elements[name]`, যেমন:

```html run height=40
<form>
  <input type="radio" *!*name="age"*/!* value="10">
  <input type="radio" *!*name="age"*/!* value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

*!*
alert(ageElems[0]); // [object HTMLInputElement]
*/!*
</script>
```

নেভিগেশন প্রপার্টিসমূহ ট্যাগ স্ট্রাকচারের উপর নির্ভর করে না। ফর্মের কন্ট্রোল এলিমেন্ট নেস্টেড হিসেবে থাকলেও `form.elements` এ উপাদান হিসেবে থাকে।


````smart header="Fieldsets as \"subforms\""
ফর্মে এক বা একাধিক `<fieldset>` এলিমেন্ট থাকতে পারে। এবং `<fieldset>` এরও `elements` প্রপার্টি থাকে।

উদাহরণস্বরূপ:

```html run height=80
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>

  <script>
    alert(form.elements.login); // <input name="login">

*!*
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement

    // we can get the input by name both from the form and from the fieldset
    alert(fieldset.elements.login == form.elements.login); // true
*/!*
  </script>
</body>
```
````

````warn header="Shorter notation: `form.name`"
এছাড়াও আরো সংক্ষেপে আমরা এলিমেন্ট সমূহকে অ্যাক্সেস করতে পারি `form[index/name]`।

অর্থাৎ, `form.elements.login` এর পরিবর্তে আমরা `form.login` এভাবেও অ্যাক্সেস করতে পারি।

এটিও কাজ করবে, তবে এর একটি ছোট সমস্যা আছে: যদি আমরা কোন এলিমেন্ট অ্যাক্সেস করি, এবং তারপর `name` অ্যাট্রিবিউট পরিবর্তন করি, তাহলে পুরনো নামটি তখনো অ্যাক্সেসবল থাকবে  (এবং সাথে নতুনটিও)।

চলুন উদাহরণের সাহায্যে দেখি:

```html run height=40
<form id="form">
  <input name="login">
</form>

<script>
  alert(form.elements.login == form.login); // true, the same <input>

  form.login.name = "username"; // input এর name attribute এর পরিবর্তন

  // form.elements আপডেট:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input

*!*
  // form allows both names: the new one and the old one
  alert(form.username == form.login); // true
*/!*
</script>
```

তবে এটি তেমন সমস্যা না, কেননা আমরা খুব কমই ফর্ম এলিমেন্টের নাম পরিবর্তন করি।

````

## Backreference: element.form

যেকোন এলিমেন্টের জন্য, ফর্মকে আমরা `element.form` দ্বারা অ্যাক্সেস করতে পারি। সুতরাং ফর্ম তার সকল এলিমেন্টকে রেফারেন্স করে, এবং এলিমেন্ট সমূহ ফর্মকে।

এখানে দেখুন:

![](form-navigation.svg)

উদাহরণস্বরূপ:

```html run height=40
<form id="form">
  <input type="text" name="login">
</form>

<script>
*!*
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
*/!*
</script>
```

## Form elements

ফর্ম কন্ট্রোল সম্পর্কে আলোচনা করা যাক।

### input and textarea

আমরা এলিমেন্টের মান এভাবে পেতে পারি `input.value` (string) অথবা চেকবক্সের জন্য `input.checked` (boolean)।

যেমন:

```js
input.value = "New value";
textarea.value = "New text";

input.checked = true; // চেকবক্স বা রেডিওর জন্য
```

```warn header="`textarea.innerHTML` এর পরিবর্তে`textarea.value` ব্যবহার করুন"
দয়া করে নোট করুন যদিও `<textarea>...</textarea>` ভ্যালুকে নেস্টেড HTML আকারে সংরক্ষন করে, আমাদের ভ্যালু অ্যাক্সেসের জন্য `textarea.innerHTML` ব্যবহার করা অনুচিত।

কেননা এটি পেজ ইনিশিয়াল লোডের সময়ের ডাটা সংরক্ষন করে, বর্তমান ভ্যালু রিটার্ন করবে না।
```

### select and option

`<select>` এলিমেন্টের ৩টি গুরুত্বপূর্ণ প্রপার্টি আছে:

1. `select.options` -- `<option>` এলিমেন্ট সমূহের কালেকশন,
2. `select.value` -- সিলেক্টেড `<option>` এর ভ্যালু,
3. `select.selectedIndex` -- সিলেক্টেড `<option>` এর ইনডেক্স।

আমরা তিনভাবে `<select>` এর ভ্যালু সেট করতে পারি:

1. `<option>`  `option.selected` to `true`.
1. কাংখিত `<option>` এলিমেন্টের প্রপার্টি `option.selected` কে `true` সেটের মাধ্যমে।
2. `select.value` এ মান সেট করে।
3. `select.selectedIndex` এ অপশন এর ইনডেক্স সেট করে।

যদিও প্রথম উপায়টি বেশ পঠনযোগ্য, কিন্তু `(2)` এবং `(3)` ব্যবহার বেশি সুবিধাজনক।

এখানে দেখুন:

```html run
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // ৩টি লাইনই একই কাজ করছে
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

`<select>` কন্ট্রোলের একটি অ্যাট্রিবিউট আছে `multiple`, যার মাধ্যমে আমরা একাধিক অপশন সিলেক্ট করতে পারি, তবে এটা খুব কদাচিৎ ব্যবহার করা হয়।

এক্ষেত্রে আমাদের কোন `<option>` এর `selected` অ্যাট্রিবিউটকে add/remove করা লাগে।

এক্ষেত্রে আমরা `select.options` একটি কালেকশন পাব, যেমন:

```html run
<select id="select" *!*multiple*/!*>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // get all selected values from multi-select
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
```

`<select>` এলিমেন্টের সম্পূর্ণ স্পেসিফিকেশন দেখতে <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### new Option

এটি খুব কদাচিৎ ব্যবহার করা হয়। তবে এর একটি ব্যাপার জেনে রাখা উচিত।

`<option>` এলিমেন্ট তৈরির একটি শর্ট সিনট্যাক্স আছে [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element):

```js
option = new Option(text, value, defaultSelected, selected);
```

প্যারামিটার:

- `text` -- option এর টেক্সট,
- `value` -- option ভ্যালু,
- `defaultSelected` -- যদি `true` হয়, তাহলে HTML-attribute এ `selected` থাকবে,
- `selected` -- যদি `true` হয়, তাহলে option টি selected হবে।

`defaultSelected` এবং `selected` এর মাঝে কিছুটা সংশয় থাকতে পারে। `defaultSelected` এলিমেন্টে `selected` অ্যাট্রিবিউট সেট করে, আমরা এটি এভাবে `option.getAttribute('selected')` পেতে পারি। এবং `selected` - যা দ্বারা বুঝায় option কি selected নাকি না, এটি আরো গুরুত্বপূর্ন। সাধারণত দুটির মান আমরা বুলিয়ান (`true`/`false`) হিসেবে সেট করতে পারি।

উদাহরণস্বরূপ:

```js
let option = new Option("Text", "value");
// creates <option value="value">Text</option>
```

ডিফল্ট `selected`:

```js
let option = new Option("Text", "value", true, true);
```

Option এলিমেন্টের প্রপার্টিসমূহ:

`option.selected`
: option selected.

`option.index`
: The number of the option among the others in its `<select>`।

`option.text`
: option এর টেক্সট কন্টেন্ট (যা ইউজার UI তে দেখে)।

## রেফারেন্স

- স্পেসিফিকেশন: <https://html.spec.whatwg.org/multipage/forms.html>।

## সারাংশ

Form নেভিগেশন:

`document.forms`
: পেজের ফর্ম কালেকশন `document.forms[name/index]`।

`form.elements`
: ফর্মের এলিমেন্ট সমূহের কালেকশন `form.elements[name/index]`, অথবা শর্ট অ্যাক্সেস নোটেশন `form[name/index]`। `<fieldset>` ও `elements` কালেকশনের প্রপার্টি।

`element.form`
: এলিমেন্ট হতে `form` অ্যাক্সেস।

কন্ট্রোলের ভ্যালু অ্যাক্সেস `input.value`, `textarea.value`, `select.value` ইত্যাদি, অথবা `input.checked` যা দ্বারা রেডিও বা চেকবক্স কন্ট্রোলের ভ্যালু অ্যাক্সেস করা যায়।

`<select>` এর জন্য `select.selectedIndex` অথবা `select.options`।

এই অধ্যায়ে আমরা form এর ব্যাসিক আলোচনা করলাম। পরবর্তী অধ্যায় গুলোতে আরো বিস্তারিত জানব।

পরবর্তী অধ্যায়ে আমরা `focus` এবং `blur` ইভেন্টস নিয়ে আলোচনা করব, যদিও এটি যেকোন এলিমেন্টে হতে পারে, তবে বেশিরভাগ ক্ষেত্রে এটি ফর্মের কন্ট্রোলের সাথে ব্যবহার করা হয়।

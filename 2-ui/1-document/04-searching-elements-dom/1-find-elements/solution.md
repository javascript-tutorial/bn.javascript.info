এটি অনেকভাবে করা যায়।

এখানে দেখুন:

```js
// 1. The table with `id="age-table"`.
let table = document.getElementById('age-table')

// 2. table এর মধ্যে সকল `label` এলিমেন্ট
table.getElementsByTagName('label')
// বা
document.querySelectorAll('#age-table label')

// 3. *table* এর প্রথম `td` (with the word "Age")
table.rows[0].cells[0]
// বা
table.getElementsByTagName('td')[0]
// বা
table.querySelector('td')

// 4. `form` এলিমেন্ট যার `name="search"`
// ধরে নিন DOM এ একটি মাত্র name="search" এলিমেন্ট আছে
let form = document.getElementsByName('search')[0]
// বা,
document.querySelector('form[name="search"]')

// 5. `form` এর প্রথম `input` এলিমেন্ট.
form.getElementsByTagName('input')[0]
// বা
form.querySelector('input')

// 6. `form` এর শেষ `input` এলিমেন্ট
let inputs = form.querySelectorAll('input') // সকল ইনপুট
inputs[inputs.length-1] // শেষ এলিমেন্টটি নেয়া
```

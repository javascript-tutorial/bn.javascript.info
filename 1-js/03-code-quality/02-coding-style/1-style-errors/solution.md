
নিচের বিষয়গুলি টুকে রাখতে পারেন:

```js no-beautify
function pow(x,n)  // <- আর্গুমেন্টের মাঝে ফাঁকা থাকে না
{  // <- আলাদা লাইনে ব্যাকেট লিখা
  let result=1;   // <- সমান এর = আগে / পরে ফাঁকা নয়
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // কন্টেন্ট { ... } আলাদা লাইনে লিখা উচিৎ
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- টেকনিক্যালি সম্ভব,
// কিন্তু ২ লাইনে লিখা ভালো, এছাড়াও কোন ফাঁকা নেই এবং সেলিকোমন (;) নেই 
if (n<0)  // <- কোন ফাঁকা নেই (n < 0), এবং উপড়ে কোন বাড়তি লাইন থাকা উচিৎ নয়
{   // <- আলাদা মাইলে ব্যাকেট
  // নিচে- বড় লাইনগূলি কিছু খন্ডে ভাগ করে নিতে পারেন পাঠযোগ্যতা বাড়াতে।
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- এভাবে এক লাইনে লিখতে পারেন "} else {"
{
  alert(pow(x,n))  // কোন ফাঁকা নেই, এবং সেলিকোমন (;) নেই 
}
```

The fixed variant:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```

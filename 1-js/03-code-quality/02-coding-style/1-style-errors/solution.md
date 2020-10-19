
নিচের বিষয়গুলি টুকে রাখতে পারেন:

```js no-beautify
function pow(x,n)  // <- আর্গুমেন্টেগুলোর মাঝে ফাঁকা নেই
{  // <- আলাদা লাইনে ব্যাকেট লিখা
  let result=1;   // <- সমান এর = আগে / পরে ফাঁকা নেই
  for(let i=0;i<n;i++) {result*=x;}   // <- ফাঁকা নেই
  // কন্টেন্ট { ... } আলাদা লাইনে লিখা উচিৎ
  return result;
}

<<<<<<< HEAD
let x=prompt("x?",''), n=prompt("n?",'') // <-- টেকনিক্যালি সম্ভব,
// কিন্তু ২ লাইনে লিখা ভালো, এছাড়াও কোন ফাঁকা নেই এবং সেলিকোমন (;) নেই 
if (n<0)  // <- ভেতরে কোন ফাঁকা নেই (n < 0), এবং উপড়ে কোন বাড়তি লাইন থাকা উচিৎ নয়
{   // <- আলাদা মাইলে ব্যাকেট
  // নিচে- বড় লাইনগূলি কিছু খন্ডে ভাগ করে নিতে পারেন পাঠযোগ্যতা বাড়াতে।
=======
let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- figure bracket on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
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

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```

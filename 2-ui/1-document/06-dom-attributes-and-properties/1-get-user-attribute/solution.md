
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Choose the genre</div>

  <script>
    // অ্যাট্রিবিউট অনুসারে এলিমেন্ট সিলেক্ট
    let elem = document.querySelector('[data-widget-name]');

    // ভ্যালু menu
    alert(elem.dataset.widgetName);
    // অথবা
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```

function isEmpty(obj) {
  for (let key in obj) {
    // যদি লুপ শুরু হয় তাহলে অবজেক্টে প্রোপার্টি আছে
    return false;
  }
  return true;
}

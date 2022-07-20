function delayLog() {
  for (var num = 1; num <= 5; num += 1) {
    let delay = num * 1000;
    setTimeout(() => console.log(num), delay);
  }
}

delayLog();
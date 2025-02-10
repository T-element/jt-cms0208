function throttle(exeFn) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      exeFn()
      timer = null
    }, 100)
  }
}

export default throttle

function debounce(exeFn, delay = 100) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      exeFn()
      timer = null
    }, delay)
  }
}

export default debounce

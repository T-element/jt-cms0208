function debounce(exeFn, delay = 100) {
  let timer = null
  return function (prop) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      exeFn(prop)
      timer = null
    }, delay)
  }
}

export default debounce

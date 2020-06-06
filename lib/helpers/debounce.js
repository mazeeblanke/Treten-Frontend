export const debounce = (method, delay) => {
  clearTimeout(method._tId)

  method._tId = setTimeout(function () {
    method()
  }, delay)
}

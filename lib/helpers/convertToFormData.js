export const convertToFormData = (object, keysToIgnore = []) => {
  const obj = { ...object }
  const courseForm = new FormData()
  Object.keys(obj).forEach((key) => {
    if (!keysToIgnore.includes(key) && obj[key]) {
      if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
        courseForm.append(key, JSON.stringify(obj[key]))
      } else {
        courseForm.append(key, obj[key])
      }
    }
  })
  return courseForm
}

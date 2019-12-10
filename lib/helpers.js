import moment from 'moment'
import Router from 'next/router'

export const transformArray = (data, key = 'id') => {
  let all = {}
  const byIds = []

  all = data.reduce((agg, curr) => {
    const aggregate = { ...agg }
    byIds.push(curr[key])
    aggregate[curr[key]] = curr
    return aggregate
  }, all)

  return {
    all,
    byIds
  }
}

export default function redirectTo (
  destination,
  { res, status } = {}
) {
  if (res) {
    res.writeHead(status || 302, { Location: destination })
    res.end()
  } else if (destination[0] === '/' && destination[1] !== '/') {
    Router.push(destination)
  } else {
    window.location = destination
  }
}

export const disabledDate = (current, customDate) => {
  return current && current < moment(customDate, 'YYYY')
}

export const parsedPaginationTotalText = ({ current, pageSize, total }) => {
  if (current && pageSize && total) {
    const end = current * pageSize > total ? total : current * pageSize
    const start = current * pageSize - pageSize + 1
    return `Showing ${start} - ${end} of ${total}`
  }
  return ''
}

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

export const isValidPhoneNumber = (phoneNumber) => {
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
  try {
    const number = phoneUtil.parseAndKeepRawInput(phoneNumber)
    return phoneUtil.isValidNumber(number)
  } catch (err) {
    return false
  }
}

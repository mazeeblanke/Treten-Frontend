import moment from 'moment'

export const disabledDate = (current, customDate) => {
  return current && current < moment(customDate, 'YYYY')
}

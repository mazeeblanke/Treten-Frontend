import * as yup from 'yup'
import moment from 'moment'

export default yup.object().shape({
  modeOfDelivery: yup.string('Batch name should be a string').required('Mode of delivery is required'),
  batchName: yup.string('Batch name should be a string').required('Batch name is required'),
  commencementDate: yup.date.min(moment()).required('Commencement date is required'),
  price: yup.number('Price should be a number').required('The batch price is required'),
//   timetable: yup.object().shape({
//     facebook: yup
//       .string('Facebook link should be a string')
//       .url()
//       .nullable(),
//     twitter: yup
//       .string('Twitter link should be a string')
//       .url()
//       .nullable(),
//     linkedin: yup
//       .string('Linkedin link should be a string')
//       .url()
//       .nullable()
// }),
})

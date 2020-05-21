import * as yup from 'yup'

export default yup.object().shape({
  title: yup.string('Title should be a string').required('Title is required'),
  description: yup.string('Description should be a string').required('Description is required'),
  institution: yup.string().nullable(),
  bannerImage: yup.object().nullable(),
  category: yup.object().nullable(),
  certificationBy: yup.object().nullable(),
  // price: yup.number().nullable(),
  // duration: yup.number().nullable(),
  modules: yup.array().of(
    yup.object().shape({
      name: yup.string('Name should be a string').required('Name is required'),
      description: yup.string('Description should be a string').required('Description is required')
    })
  ),
  faqs: yup.array().of(
    yup.object().shape({
      question: yup.string('Question should be a string').required('Question is required'),
      answer: yup.string('Answer should be a string').required('Answer is required')
    })
  )
})

import * as yup from 'yup'

export default yup.array().of(
  yup.object().shape({
    email: yup.string('Email should be a string').email('Email must be valid').required('Email is required'),
  })
)

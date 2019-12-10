import * as yup from 'yup'

export default yup.object().shape({
  bio: yup.string('Bio should be a string'),
  title: yup.string('Title should be a string').required('Title is required'),
  socialLinks: yup.object().shape({
    facebook: yup
      .string('Facebook link should be a string')
      .url()
      .nullable(),
    twitter: yup
      .string('Twitter link should be a string')
      .url()
      .nullable(),
    linkedin: yup
      .string('Linkedin link should be a string')
      .url()
      .nullable()
  }),
  certifications: yup.array().of(
    yup.object().shape({
      // year: yup.string().required("Certification year is required"),
      name: yup.string('Name should be a string').required('Certification name is required'),
      id: yup.string().required()
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      qualificationObtained: yup
        .string('Qualification obtained should be a string')
        .required('Qualification obtained is required')
        .nullable(),
      nameOfInstitution: yup
        .string('Institution name should be a string')
        .required('Institution name is required')
        .nullable(),
      // start_date: yup
      //   .string("Start date should be a string")
      //   .required("Start date is required"),
      // end_date: yup.string("End date should be a string").required("End date is required"),
      id: yup.string().required()
    })
  ),
  workExperience: yup.array().of(
    yup.object().shape({
      nameOfCompany: yup
        .string('Name of company should be string')
        .nullable()
        .required('Name of company is required'),
      jobDescription: yup
        .string('Job description should be string')
        .required('Job description is required')
        .nullable(),
      // start_date: yup
      //   .string("Start date should be string")
      //   .required("Start date is required"),
      jobTitle: yup
        .string('Job title should be string')
        .required('Job title is required')
        .nullable(),
      // end_date: yup
      //   .string("End date should be string")
      //   .required("End date is required"),
      id: yup.string().required()
    })
  )
})

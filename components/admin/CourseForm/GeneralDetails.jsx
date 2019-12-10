import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { Input, Form } from 'antd'
import CreatableSelect from 'react-select/creatable'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

const customStyles = {
  valueContainer: base => ({
    ...base,
    height: 39
  })
}

const GeneralDetails = props => {
  const { courseForm, setForm, errors } = props
  return (
    <div className="container mt-7">
      <div className="row">
        <div className="col-md-6 mb-5">
          <Form.Item className={errors.category && 'has-error'}>
            <label htmlFor="Select Category">
              <b>Course category</b>
            </label>
            <div className="pt-3">
              <CreatableSelect
                styles={customStyles}
                placeholder="Select/Create course category"
                isClearable
                value={courseForm.category && { value: courseForm.category, label: courseForm.category }}
                onChange={(e) => setForm(e && e.value, 'category')}
                options={[
                  { value: 'associate', label: 'associate' },
                  { value: 'professional', label: 'professional' },
                  { value: 'expert', label: 'expert' },
                  { value: 'bootcamp', label: 'bootcamp' },
                ]}
              />
            </div>
            {errors.category && (
              <div className="ant-form-explain">
                {errors.category}
              </div>
            )}
          </Form.Item>

        </div>
        <div className="col-md-6 mb-5">
          <Form.Item className={errors.title && 'has-error'}>
            <label htmlFor="title" className="mb-3">
              <b>Course title</b>
            </label>
            <Input
              value={courseForm.title}
              className="mt-3 is-transparent-bg"
              allowClear
              size="large"
              type="text"
              placeholder="Enter course title"
              onChange={(e) => { setForm(e.target.value, 'title') }}
            />
            {errors.title && (
              <div className="ant-form-explain">
                {errors.title}
              </div>
            )}
          </Form.Item>

        </div>
        <div className="col-md-12">
          <Form.Item className={errors.description && 'has-error'}>
            <label htmlFor="description">
              <b>About this course</b>
            </label>
            <ReactQuill
              className="mt-3"
              placeholder="Go into details about what this course is about"
              value={courseForm.description}
              onChange={(e) => { setForm(e, 'description') }}
              height={700}
            />
            {errors.description && (
              <div className="ant-form-explain">
                {errors.description}
              </div>
            )}
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

GeneralDetails.propTypes = {
  setForm: PropTypes.func.isRequired,
  courseForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default GeneralDetails

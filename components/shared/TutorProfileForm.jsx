import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

const TutorProfileForm = props => {
  const {
    setPersonalTutorDetailsForm,
    personalTutorDetailsForm,
    errors
  } = props
  const {
    qualifications,
    socialLinks,
    title,
    bio
  } = personalTutorDetailsForm
  return (
    <div className="row">
      <div className="col-md-6 mt-4">
        <Form.Item className={errors.title && 'has-error'}>
          <label htmlFor="title">Official job title</label>
          <Input
            value={title}
            size="large"
            type="text"
            onChange={e => setPersonalTutorDetailsForm(e.target.value, 'title')}
            placeholder="e.g. Network Engineer"
          />
          {errors.title && (
            <div className="ant-form-explain">{errors.title}!</div>
          )}
        </Form.Item>
      </div>
      <div className="col-md-6 mt-4">
        <Form.Item>
          <label htmlFor="qualifications">Qualifications</label>
          <Input
            value={qualifications}
            size="large"
            type="text"
            onChange={e => setPersonalTutorDetailsForm(e.target.value, 'qualifications')}
            placeholder="Enter the qualifications you possess"
          />
        </Form.Item>
      </div>

      <div className="col-md-6 mt-4">
        <Form.Item
          className={(errors.socialLinks || {}).linkedin && 'has-error'}
        >
          <label htmlFor="linkedin">LinkedIn profile</label>
          <Input
            value={(socialLinks || {}).linkedin}
            size="large"
            type="text"
            onChange={e =>
              setPersonalTutorDetailsForm(
                {
                  ...socialLinks,
                  linkedin: e.target.value
                },
                'socialLinks'
              )
            }
            placeholder="e.g. https://linkedin.com/in/musahawa"
          />
          {(errors.socialLinks || {}).linkedin && (
            <div className="ant-form-explain">
              {(errors.socialLinks || {}).linkedin}!
            </div>
          )}
        </Form.Item>
      </div>

      <div className="col-md-6 mt-4">
        <Form.Item
          className={(errors.socialLinks || {}).twitter && 'has-error'}
        >
          <label htmlFor="twitter">Twitter profile</label>
          <Input
            value={(socialLinks || {}).twitter}
            size="large"
            type="text"
            onChange={e =>
              setPersonalTutorDetailsForm(
                {
                  ...socialLinks,
                  twitter: e.target.value
                },
                'socialLinks'
              )
            }
            placeholder="e.g. https://twitter.com/musahawa"
          />
          {(errors.socialLinks || {}).twitter && (
            <div className="ant-form-explain">
              {(errors.socialLinks || {}).twitter}!
            </div>
          )}
        </Form.Item>
      </div>

      <div className="col-md-6 mt-4">
        <Form.Item
          className={(errors.socialLinks || {}).facebook && 'has-error'}
        >
          <label htmlFor="facebook">Facebook profile</label>
          <Input
            value={(socialLinks || {}).facebook}
            size="large"
            type="text"
            onChange={e =>
              setPersonalTutorDetailsForm(
                {
                  ...socialLinks,
                  facebook: e.target.value
                },
                'socialLinks'
              )
            }
            placeholder="e.g. https://facebook.com/musahawa"
          />
          {(errors.socialLinks || {}).facebook && (
            <div className="ant-form-explain">
              {(errors.socialLinks || {}).facebook}!
            </div>
          )}
        </Form.Item>
      </div>

      <div style={{ width: '300px' }} className="col-md-12 mt-4">
        <Form.Item className={errors.bio && 'has-error'}>
          <label htmlFor="bio">Brief bio (100 words max)</label>
          <ReactQuill
            value={bio}
            onChange={e => setPersonalTutorDetailsForm(e, 'bio')}
            height={300}
          />
          {errors.bio && (
            <div className="ant-form-explain">{errors.bio}!</div>
          )}
        </Form.Item>
      </div>
    </div>
  )
}

TutorProfileForm.propTypes = {
  personalTutorDetailsForm: PropTypes.shape({
    title: PropTypes.string,
    qualifications: PropTypes.string,
    bio: PropTypes.string,
    socialLinks: PropTypes.shape({
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
      facebook: PropTypes.string,
    }),
  }).isRequired,
  setPersonalTutorDetailsForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default TutorProfileForm

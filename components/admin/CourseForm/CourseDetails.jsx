import CreatableSelect from 'react-select/creatable'
import Dropzone from 'react-dropzone'
import { Input, Select, Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const partners = [{
  value: 'Microsoft',
  label: 'partners/microsoft.png'
}, {
  value: 'Fortinet',
  label: 'partners/Fortinet.png'
}, {
  value: 'Juniper Networks',
  label: 'partners/Juniper_Networks.png'
}, {
  value: 'Paloalto Networks',
  label: 'partners/paloaltonetworks.png'
}, {
  value: 'Cisco',
  label: 'partners/cisco.png'
}, {
  value: 'F5 Networks',
  label: 'partners/F5_Networks.png'
}]

const CourseDetails = props => {
  const { courseForm, setForm, errors } = props

  const handleBannerImageChange = (e) => {
    const file = e[0]
    if (file) {
      setForm(file, 'bannerImage')
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        setForm(fileReader.result, 'bannerImageBase64')
      }
      fileReader.readAsDataURL(file)
    }
  }

  const removeBannerImage = () => {
    setForm('', 'bannerImage')
    setForm('', 'bannerImageBase64')
  }

  const customStyles = {
    valueContainer: base => ({
      ...base,
      height: 39
    })
  }

  return (
    <div className="container mt-7">
      <div className="row">
        <div className="col-md-6 mb-5">
          <label htmlFor="duration" className="mb-3">
            <b>Duration</b>
          </label>
          <Input
            value={courseForm.duration}
            className="mt-3 is-transparent-bg"
            allowClear
            size="large"
            type="number"
            min={0}
            placeholder="Number of weeks till completion"
            onChange={(e) => setForm(e.target.value, 'duration')}
          />
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="institution">
            <b>Institution</b>
          </label>
          <Input
            value={courseForm.institution}
            onChange={(e) => setForm(e.target.value, 'institution')}
            size="large"
            placeholder="Select institution"
            className="has-full-width mt-3 is-transparent-bg"
          />
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="course path">
            <b>Course Path</b>
          </label>
          <div className="pt-3">
            <CreatableSelect
              isClearable
              styles={customStyles}
              placeholder="Select/Create course path"
              value={courseForm.coursePath && { value: courseForm.coursePath, label: courseForm.coursePath }}
              onChange={(e) => setForm(e && e.value, 'coursePath')}
              options={[
                { value: 'CCNA', label: 'CCNA' },
                { value: 'CCNP', label: 'CCNP' },
                { value: 'CCIE', label: 'CCIE' }
              ]}
            />
          </div>
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="course path">
            <b>Course Path Position</b>
          </label>
          <Input
            min={0}
            size="large"
            type="number"
            value={courseForm.coursePathPosition}
            placeholder="Select course path position"
            className="has-full-width mt-3 is-transparent-bg"
            onChange={(e) => setForm(parseInt(e.target.value), 'coursePathPosition')}
          />
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="certification-by">
            <b>Certification by</b>
          </label>
          <div className="pt-3">
            <Select
              placeholder="Select certification provider"
              value={courseForm.certificationBy.value}
              className="has-full-width"
              size="large"
              onChange={(e, proxyComp, g) => {
                setForm({
                  value: proxyComp.props.value,
                  label: proxyComp.props.label
                }, 'certificationBy')
              }}
            >
              {
                partners.map(el => (
                  <Select.Option key={el.value} label={el.value} value={el.label}>
                    <div>
                      <img
                        style={{ float: 'left', height: '28px', marginTop: '7px' }}
                        src={`/static/images/${el.label}`} >
                      </img>
                      <span
                        className="ml-3"
                        style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                        {el.value}
                      </span>
                    </div>
                  </Select.Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="col-md-6 mb-5">
          <Form.Item className={errors.price && 'has-error'}>
            <label htmlFor="price" className="mb-3">
              <b>Price (optional)</b>
            </label>
            <Input
              className="mt-3 is-transparent-bg"
              allowClear
              size="large"
              type="number"
              min={0}
              placeholder="Enter price"
              value={courseForm.price}
              onChange={(e) => { setForm(parseFloat(e.target.value, 10), 'price') }}
            />
            {errors.price && (
              <div className="ant-form-explain">
                {errors.price}
              </div>
            )}
          </Form.Item>
        </div>
        <div className="col-md-6 mb-3">
          {
            !courseForm.bannerImage
              ? (
                <Dropzone onDropAccepted={handleBannerImageChange}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <img className="mt-4" src="/static/images/cloud.png" />
                      <p
                        className="mt-2 p-2 text-center"
                        style={{ fontSize: '1rem' }}
                      >
                        Click to upload file or drag in from computer
                      </p>
                    </div>
                  )}
                </Dropzone>
              )
              : (
                <div className="">
                  <div className="d-flex align-items-center">
                    <img
                      style={{ height: '90px' }}
                      className="mr-3 has-full-width"
                      src={courseForm.bannerImageBase64 || courseForm.bannerImage}
                    />
                  </div>
                  <p className="m-0 pt-3">{courseForm.bannerImage.name}</p>
                  <small
                    onClick={removeBannerImage}
                    style={{ color: '#e12828' }}
                  >
                    remove file
                  </small>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}

CourseDetails.propTypes = {
  setForm: PropTypes.func.isRequired,
  courseForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default CourseDetails

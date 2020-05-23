import CreatableSelect from 'react-select/creatable'
import Dropzone from 'react-dropzone'
import { Input, Select, Form, Modal } from 'antd'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchCoursePaths, fetchCertifications } from "../../../store/actions";
import { getCertifications } from '../../../store/reducers/certifications'
import Cropper from '../../shared/Cropper'

const CourseDetails = props => {
  const { 
    courseForm, 
    setForm, 
    errors, 
    fetchCoursePaths, 
    fetchCertifications,
    certificationOptions 
  } = props

  const [coursePathOptions, setCoursePathOptions] = useState([]);
  const [isCroppingCourseBanner, setIsCroppingCourseBanner] = useState(false);
  const [orignalBase64, setOrignalBase64] = useState(null);

  const handleBannerImageChange = (e) => {
    const file = e[0]
    if (file) {
      setForm(file, 'bannerImage')
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        setForm(fileReader.result, 'bannerImageBase64')
        setOrignalBase64(fileReader.result)
        setIsCroppingCourseBanner(true)
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

  const closeModal = () => {
    setIsCroppingCourseBanner(false)
  }

  const searchCertification = (searchQuery) => {
    fetchCertifications({
      q: searchQuery,
    })
  }

  const search = (searchQuery) => {
    fetchCoursePaths({
      q: searchQuery,
    }).then(({ data }) => {
      setCoursePathOptions(data.data)
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
            <Select
              showSearch
              size="large"
              allowClear
              showArrow={false}
              onChange={(e) => {
                setForm(e, 'coursePath')
              }}
              style={customStyles}
              filterOption={false}
              notFoundContent="No matched course path found"
              onSearch={search}
              className="has-full-width"
              defaultActiveFirstOption={false}
              placeholder='Select/Create course path'
              value={courseForm.coursePath}
            >
              {
                coursePathOptions.map((option, index) => (
                  <Select.Option key={index} value={option.name}>
                    {option.name}
                  </Select.Option>
                ))
              }
            </Select>
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
          <Form.Item>
            <label htmlFor="course path">
              <b>Course Video ID</b>
            </label>
            <Input
              size="large"
              allowClear
              value={courseForm.videoId}
              placeholder="Enter course id"
              className="has-full-width mt-3 is-transparent-bg"
              onChange={(e) => setForm(e.target.value, 'videoId')}
            />
          </Form.Item>
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="certification-by">
            <b>Certification by</b>
          </label>
          <div className="pt-3">
            <Select
              showSearch
              size="large"
              allowClear
              showArrow={true}
              onChange={(e, proxyComp, g) => {
                setForm({
                  value: proxyComp && proxyComp.props.value,
                  label: proxyComp && proxyComp.props.label
                }, 'certificationBy')
              }}
              filterOption={false}
              notFoundContent="No matched certifications found"
              onSearch={searchCertification}
              className="has-full-width"
              defaultActiveFirstOption={false}
              placeholder='Select certification provider'
              value={courseForm.certificationBy.value}
            >
              {
                certificationOptions.map(el => (
                  <Select.Option key={el.id} label={el.bannerImage} value={el.company}>
                    <div>
                      <img
                        alt={el.company}
                        style={{ float: 'left', height: '28px', marginTop: '7px' }}
                        src={el.bannerImage} >
                      </img>
                      <span
                        className="ml-3"
                        style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                        {el.company}
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
            isCroppingCourseBanner && 
              <Modal
                centered
                footer={null}
                width="464px"
                height="514px"
                onCancel={closeModal}
                wrapClassName=""
                visible={courseForm.bannerImageBase64 || courseForm.bannerImage}
                title={
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>Crop Course Banner</h5>
                  </div>
                }
              >
                <Cropper 
                  src={courseForm.bannerImageBase64 || courseForm.bannerImage}
                  onCroppedImageUrl={(img) => {setForm(img, 'bannerImageBase64')}}
                  onBlobChange={(blob) => {setForm(blob, 'bannerImage')}}
                ></Cropper>
            </Modal>
          }
          {
            !courseForm.bannerImage
              ? (
                <Dropzone onDropAccepted={handleBannerImageChange}>
                  {({ getRootProps, getInputProps }) => (
                    <div 
                      style={{ height: '164px', width: '280px' }} 
                      {...getRootProps({ className: 'dropzone' })}
                    >
                      <input {...getInputProps()} />
                      <img alt="upload" className="mt-4" src="/images/cloud.png" />
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
                      alt={courseForm.bannerImage.name}
                      style={{ height: '164px', width: '280px' }}
                      className="mr-3 has-full-width"
                      src={courseForm.bannerImageBase64 || courseForm.bannerImage}
                    />
                  </div>
                  <p className="m-0 pt-3">{courseForm.bannerImage.name}</p>
                  <span
                    onClick={removeBannerImage}
                    style={{ color: '#e12828' }}
                  >
                    remove file
                  </span>
                  <span
                    onClick={() => {
                      setIsCroppingCourseBanner(true)
                      orignalBase64 && setForm(orignalBase64, 'bannerImageBase64')
                    }}
                    className="ml-4"
                    style={{ color: '#e12828' }}
                  >
                    resize
                  </span>
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
  errors: PropTypes.object.isRequired,
  fetchCoursePaths: PropTypes.func.isRequired,
  fetchCertifications: PropTypes.func.isRequired,
  certificationOptions: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    certificationOptions: getCertifications(state)
  }
}

export default connect(mapStateToProps, { 
  fetchCoursePaths,
  fetchCertifications,
})(CourseDetails)

import { Form, Icon, Input, Button, Checkbox, DatePicker  } from 'antd';
import 'react-quill/dist/quill.snow.css';
import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import 'element-theme-default';
import moment from 'moment';

const uuidv1 = require('uuid/v1');
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});
import Select from 'react-select/creatable';
const dateFormat = 'YYYY';

const customStyles = {
  // input: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   height: 40,
  //   padding: 0
  // }),
  // menu: () => ({
  //   // none of react-select's styles are passed to <Control />
  //   zIndex: 2388223
  // })
}

class PersonalTutorDetailsForm extends Component {

  constructor (props) {
    super(props);

    // this.certificationRef = React.createRef();
    this.educationRef = React.createRef();
    this.workExperienceRef = React.createRef();
  }

  state = {
    certificationsOptions: [{
      value: 'CCNA',
      label: 'ccna'
    }, {
      value: 'CCNP',
      label: 'ccnp'
    }, {
      value: 'CCIE',
      label: 'ccie'
    }],
    personalTutorDetailsForm: {
      network_engineer: '',
      bio: '',
      linkedin_profile: '',
      twitter_profile: '',
      certifications: [
        {
          name_of_certification: '',
          year: moment(),
          id: uuidv1()
        }
      ],
      education: [
        {
          name_of_institution: '',
          start_date: '',
          end_date: '',
          qualification_obtained: '',
          id: uuidv1()
        }
      ],
      workExperience: [
        {
          name_of_company: '',
          start_date: '',
          end_date: '',
          job_title: '',
          job_description: '',
          id: uuidv1()
        }
      ]
    }
  }


  handleBioChange = () => {
    this.setState({

    })
  }

  addCertification = () => {
    let personalTutorDetailsForm = { ...this.state.personalTutorDetailsForm };
    personalTutorDetailsForm.certifications = [
      ...personalTutorDetailsForm.certifications,
      {
        name_of_certification: '',
        year: '',
        id: uuidv1()
      },
    ];

    this.setState({
      personalTutorDetailsForm: {
        ...personalTutorDetailsForm
      }
    })

    console.log(this.certificationRef)
    console.log(this.certificationRef.scrollTop = 3443)
    this.certificationRef.scrollIntoView({behavior: 'smooth', block: 'start'})
    console.log(this.certificationRef.scrollTop)
  }

  addWorkExperience = () => {
    let personalTutorDetailsForm = { ...this.state.personalTutorDetailsForm };
    personalTutorDetailsForm.workExperience = [
      ...personalTutorDetailsForm.workExperience,
      {
        name_of_company: '',
        start_date: '',
        end_date: '',
        job_title: '',
        job_description: '',
        id: uuidv1()
      },
    ];

    console.log(personalTutorDetailsForm);

    this.setState({
      personalTutorDetailsForm: {
        ...personalTutorDetailsForm
      }
    }, () => {
      console.log(this.state.personalTutorDetailsForm);
    })
  }

  addEducation = () => {
    let personalTutorDetailsForm = { ...this.state.personalTutorDetailsForm };
    personalTutorDetailsForm.education = [
      ...personalTutorDetailsForm.education,
      {
        name_of_institution: '',
        start_date: '',
        end_date: '',
        qualification_obtained: '',
        id: uuidv1()
      },
    ];

    this.setState({
      personalTutorDetailsForm: {
        ...personalTutorDetailsForm
      }
    })
  }

  setCertification = (index, e, field) => {
    let personalTutorDetailsForm = { ...this.state.personalTutorDetailsForm };
    personalTutorDetailsForm.certifications[index][field] = e;

    console.log('trt rtrt rt');

    this.setState({
      personalTutorDetailsForm: {
        ...personalTutorDetailsForm
      }
    }, () => console.log(this.state))
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-12 personaldetailstutor-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">

          <div className="row">

            <div className="col-md-6 mt-4">
              <Form.Item>
                <label htmlFor="email">Official job title</label>
                {getFieldDecorator('network_engineer', {
                  rules: [{ required: true, message: 'Please enter your official job title!' }],
                })(
                  <Input
                    size="large"
                    type="text"
                    placeholder="e.g. Network Engineer"
                  />,
                )}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-4">
              <Form.Item>
                <label htmlFor="email">LinkedIn profile</label>
                {getFieldDecorator('linkedin_profile', {
                  rules: [{ required: true, message: 'Please input your linkedin profile!' }],
                })(
                  <Input
                    size="large"
                    type="text"
                    placeholder="e.g. https://linkedin.com/in/musahawa"
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-4">
              <Form.Item>
                <label htmlFor="email">Twitter profile</label>
                {getFieldDecorator('twitter_profile', {
                  rules: [{ required: true, message: 'Please input your twitter profile!' }],
                })(
                  <Input
                    size="large"
                    type="text"
                    placeholder="e.g. https://twitter.com/musahawa"
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-4">
              <Form.Item>
                <label htmlFor="email">Facebook profile</label>
                {getFieldDecorator('facebook_profile', {
                  rules: [{ required: true, message: 'Please input your facebook profile!' }],
                })(
                  <Input
                    size="large"
                    type="text"
                    placeholder="e.g. https://facebook.com/musahawa"
                  />
                )}
              </Form.Item>
            </div>

            <div style={{ width: '300px' }} className="col-md-12 mt-4">
              <Form.Item>
                <label htmlFor="bio">Brief bio (100 words max)</label>
                <ReactQuill
                  value={this.state.personalTutorDetailsForm.bio}
                  onChange={this.handleBioChange}
                  height={300}
                />
              </Form.Item>
            </div>

          </div>

          <h5 className="mt-6">Certifications</h5>

          <div ref={(el) => { this.certificationRef = el; }} className="row" style={{ maxHeight: '190px', minHeight: '90px', overflowY: 'scroll' }}>
            {
              this.state.personalTutorDetailsForm.certifications.map((certification, certificationIndex) => (
                <div className="col-md-12 mb-3" key={certification.id}>
                  <h5 className="text-capitalize"><b>{ String.fromCharCode(certificationIndex + 97) }</b></h5>
                  <div className="row mb-1">
                    <div className="col-md-6 certifications">
                      <Form.Item>
                        <label htmlFor="name_of_Certification">Name of certification</label>
                        {/* {getFieldDecorator('name_of_Certification', {
                          rules: [{ required: true, message: 'Please input the name of your certification' }],
                        })( */}
                        <Select
                          styles={customStyles}
                          isClearable
                          name="name_of_Certification"
                          value={certification.name_of_certification}
                          options={[...this.state.certificationsOptions]}
                          onChange={(e) => this.setCertification(certificationIndex, e, 'name_of_certification') }
                        />
                        {/* )} */}
                      </Form.Item>
                    </div>

                    <div className="col-md-6">
                      <Form.Item>
                        <label htmlFor="email">Year acquired</label>
                        {/* {getFieldDecorator('email', {
                          rules: [{ required: true, message: 'Please input the year the certification was acquired!' }],
                        })( */}
                          <DatePicker
                            value={certification.year || undefined}
                            className="has-full-width"
                            mode="year"
                            format={dateFormat}
                            onChange={(moment, parsedValue) => this.setCertification(certificationIndex, moment, 'year')}
                          />
                        {/* )} */}
                      </Form.Item>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <div onClick={() => { this.addCertification() }} className="d-flex align-items-center has-pointer-cursor">
                <img className="mr-2" src="/static/images/plus.png" />
                <p className="m-0 ">
                  <b>Add another certification</b>
                </p>
              </div>
            </div>
          </div>


          <h5 className="mt-6">Work Experience</h5>
          <div ref={this.workExperienceRef} className="row work-experirence" style={{ maxHeight: '550px', minHeight: '250px', overflowY: 'scroll' }}>
            <div className="col-md-12">
            {
              this.state.personalTutorDetailsForm.workExperience.map((workExperience, workExperienceIndex) => (
                <div key={workExperience.id}>
                  <h5 className="text-capitalize"><b>{ String.fromCharCode(workExperienceIndex + 97) }</b></h5>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <Form.Item>
                        <label htmlFor="email">Name of company</label>
                        {getFieldDecorator('company_name', {
                          rules: [{ required: true, message: 'Please enter the name of company!' }],
                        })(
                          <Input
                            size="large"
                            type="text"
                            placeholder="e.g. Enter name of company"
                          />,
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-md-3 mt-3">
                      <Form.Item>
                        <label htmlFor="email">Start date</label>
                        {getFieldDecorator('start_date', {
                          rules: [{ required: true, message: 'Please enter the start date!' }],
                        })(
                          <DatePicker
                            value={workExperience.startDate}
                            className="has-full-width"
                            mode="year"
                            format="YYYY-m-d"
                            onChange={(moment, parsedValue) => {}}
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-md-3 mt-3">
                      <Form.Item>
                        <label htmlFor="email">End date</label>
                        {getFieldDecorator('start_date', {
                          rules: [{ required: true, message: 'Please enter the start date!' }],
                        })(
                          <DatePicker
                            value={workExperience.endDate}
                            className="has-full-width"
                            mode="year"
                            format="YYYY-m-d"
                            onChange={(moment, parsedValue) => {}}
                          />
                        )}
                      </Form.Item>
                    </div>
                    <div className="col-md-6 mt-3">
                      <Form.Item>
                        <label htmlFor="bio">Job Description</label>
                        <ReactQuill
                          value={workExperience.job_description}

                          height={300}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6 mt-3">
                      <Form.Item>
                        <label htmlFor="email">Job title</label>
                        {getFieldDecorator('job_title', {
                          rules: [{ required: true, message: 'Please enter the job title!' }],
                        })(
                          <Input
                            size="large"
                            type="text"
                            placeholder="e.g. Enter job title"
                          />,
                        )}
                      </Form.Item>
                    </div>
                  </div>
                  <hr className="mt-5"></hr>
                </div>
              ))
            }
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <div onClick={() => { this.addWorkExperience() }} className="d-flex align-items-center has-pointer-cursor">
                <img className="mr-2" src="/static/images/plus.png" />
                <p className="m-0 ">
                  <b>Add another experience</b>
                </p>
              </div>
            </div>
          </div>


          <h5 className="mt-6">Education</h5>
          <div ref={this.educationRef} className="row work-experirence" style={{ maxHeight: '250px', minHeight: '200px', overflowY: 'scroll' }}>
            <div className="col-md-12">
              {
                this.state.personalTutorDetailsForm.education.map((education, educationIndex) => (
                  <div key={education.id}>
                    <h5 className="text-capitalize"><b>{ String.fromCharCode(educationIndex + 97) }</b></h5>
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <Form.Item>
                          <label htmlFor="email">Name of institution</label>
                          {getFieldDecorator('institution_name', {
                            rules: [{ required: true, message: 'Please enter the name of institution!' }],
                          })(
                            <Input
                              size="large"
                              type="text"
                              placeholder="e.g. Enter name of institution"
                            />,
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-3 mt-3">
                        <Form.Item>
                          <label htmlFor="email">Start date</label>
                          {getFieldDecorator('start_date', {
                            rules: [{ required: true, message: 'Please enter the start date!' }],
                          })(
                            <DatePicker
                              value={education.startDate}
                              className="has-full-width"
                              mode="year"
                              format="YYYY-m-d"
                              onChange={(moment, parsedValue) => {}}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-3 mt-3">
                        <Form.Item>
                          <label htmlFor="email">End date</label>
                          {getFieldDecorator('start_date', {
                            rules: [{ required: true, message: 'Please enter the start date!' }],
                          })(
                            <DatePicker
                              value={education.endDate}
                              className="has-full-width"
                              mode="year"
                              format="YYYY-m-d"
                              onChange={(moment, parsedValue) => {}}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-6 mt-3">
                        <Form.Item>
                          <label htmlFor="email">Qualification obtained</label>
                          {getFieldDecorator('job_title', {
                            rules: [{ required: true, message: 'Please enter the qualification obtained!' }],
                          })(
                            <Input
                              size="large"
                              type="text"
                              placeholder="e.g. Enter qualification obtained"
                            />,
                          )}
                        </Form.Item>
                      </div>
                    </div>
                    <hr className="mt-5"></hr>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <div onClick={() => { this.addEducation() }} className="d-flex align-items-center has-pointer-cursor">
                <img className="mr-2" src="/static/images/plus.png" />
                <p className="m-0 ">
                  <b>Add another education</b>
                </p>
              </div>
            </div>
          </div>


          <Form.Item>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            <Button
              className="mt-4"
              type="danger"
              htmlType="submit"
            >
              Update profile
            </Button>
          </Form.Item>

        </Form>
      </div>
    );
  }
}

PersonalTutorDetailsForm.propTypes = {

};

const WrappedPersonalTutorDetailsForm = Form.create({ name: 'register_form' })(PersonalTutorDetailsForm);

export default WrappedPersonalTutorDetailsForm;
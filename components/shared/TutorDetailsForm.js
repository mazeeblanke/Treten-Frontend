import moment from "moment";
import "element-theme-default";
const uuidv1 = require("uuid/v1");
import PropTypes from "prop-types";
import { Form, Button } from "antd";
import { connect } from "react-redux";
import yupToObject from "yup-to-object";
import React, { Component } from "react";
import EducationForm from "./EducationForm";
import * as actions from "../../store/actions";
import notifier from "simple-react-notifications";
import TutorProfileForm from "./TutorProfileForm";
import CertificationForm from "./CertificationForm";
import { tutorDetailsSchema } from "../../lib/schemas";
import WorkExperienceForm from "./WorkExperienceForm";
import { getUserDetails } from "../../store/reducers/user";

class TutorDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.certificationRef = React.createRef();
    this.educationRef = React.createRef();
    this.workExperienceRef = React.createRef();
  }

  componentDidMount() {
    this.addWorkExperienceWrapper = document.getElementById(
      "addWorkExperienceWrapper"
    );
    this.addCertificationWrapper = document.getElementById(
      "addCertificationWrapper"
    );
		this.addEducationWrapper = document.getElementById("addEducationWrapper");
		this.setState({
			personalTutorDetailsForm: {
				...this.props.user.userable
			}
		});
  }

  state = {
		isSaving: false,
    personalTutorDetailsForm: {
      bio: "",
      social_links: {
        facebook: "",
        twitter: "",
        linkedin: ""
      },
      title: "",
      certifications: [],
      education: [],
      work_experience: []
    },
    errors: {}
  };

  setPersonalTutorDetailsForm = (value, field, nested = null, index = null) => {
		const { personalTutorDetailsForm } = { ...this.state };
    if (!nested && !index && value && field) {
      personalTutorDetailsForm[field] = value;
    } else if (nested && index && field && value) {
      personalTutorDetailsForm[nested][index][field] = value;
    } else if (!value && !field && nested && index >= 0) {
			personalTutorDetailsForm[nested].splice(index, 1);
		}

    this.setState(
      {
        ...this.state,
        personalTutorDetailsForm,
      },
      () => {
        console.log('ww',this.state);
        this.validate(field)
      }
    );
  };

  adjustView = (ref, wrapper) => {
    wrapper.scrollTo(0, wrapper.scrollHeight - 100);
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
		});
		
  };

  addCertification = () => {
    let { personalTutorDetailsForm } = { ...this.state };
    personalTutorDetailsForm.certifications = [
      ...personalTutorDetailsForm.certifications,
      {
        name: "",
        year: "",
        id: uuidv1()
      }
    ];

    this.setState(
      {
        personalTutorDetailsForm
      },
      () => this.adjustView(this.certificationRef, this.addCertificationWrapper)
    );
  };

  addWorkExperience = () => {
    let { personalTutorDetailsForm } = { ...this.state };
    personalTutorDetailsForm.work_experience = [
      ...personalTutorDetailsForm.work_experience,
      {
        name_of_company: "",
        start_date: moment(),
        end_date: moment(),
        job_title: "",
        job_description: "",
        id: uuidv1()
      }
    ];

    this.setState(
      {
        personalTutorDetailsForm
      },
      () =>
        this.adjustView(this.workExperienceRef, this.addWorkExperienceWrapper)
    );
  };

  addEducation = () => {
    let { personalTutorDetailsForm } = { ...this.state };
    personalTutorDetailsForm.education = [
      ...personalTutorDetailsForm.education,
      {
        name_of_institution: "",
        start_date: moment(),
        end_date: moment(),
        qualification_obtained: "",
        id: uuidv1()
      }
    ];
    this.setState(
      {
        personalTutorDetailsForm
      },
      () => this.adjustView(this.educationRef, this.addEducationWrapper)
    );
  };

  submitForm = () => {
		tutorDetailsSchema
			.validate(this.state.personalTutorDetailsForm, { abortEarly: false })
			.then(() => {
				this.setState({
					errors: {},
					isSaving: true,
        });
				this.props.updateInstructor(this.props.user.userable_id, this.state.personalTutorDetailsForm).then(() => {
					notifier.success("Your details have been updated");
					// this.setState({
					// 	isSaving: false,
					// });
				})
				.catch(() => {
					notifier.error("ERROR! Your details could not be updated");
				})
				.finally(() => {
					this.setState({
						isSaving: false,
					});
				})
			})
			.catch(yupError => {
				console.log('df', yupError);
        this.setState({
          errors: yupToObject(yupError)
        });
			});
  };

  validate = (field) => {
    tutorDetailsSchema
			.validate(this.state.personalTutorDetailsForm, { abortEarly: false })
			.then(() => {
				this.setState({
          errors: {}
        });
			})
			.catch(yupError => {
				let errors = yupToObject(yupError);
         console.warn(yupToObject(yupError))
				if (field) {
					errors = {
						...this.state.errors,
						[field]: errors[field] 
					}
				}

        this.setState({
          errors,
        });
			});
  };

  render() {
    const {
      certifications,
      education,
      work_experience
    } = this.state.personalTutorDetailsForm;
    return (
      <div className="col-md-12 personaldetailstutor-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">
          <TutorProfileForm
            errors={this.state.errors}
            setPersonalTutorDetailsForm={this.setPersonalTutorDetailsForm}
            personalTutorDetailsForm={this.state.personalTutorDetailsForm}
          />
          <CertificationForm
            errors={this.state.errors}
            certifications={certifications}
            addCertification={this.addCertification}
            setCertification={this.setPersonalTutorDetailsForm}
            certificationRef={this.certificationRef}
          />
          <WorkExperienceForm
            errors={this.state.errors}
            work_experience={work_experience}
            workExperienceRef={this.workExperienceRef}
            addWorkExperience={this.addWorkExperience}
            setWorkExperience={this.setPersonalTutorDetailsForm}
          />
          <EducationForm
            errors={this.state.errors}
            educationRef={this.educationRef}
            education={education}
            addEducation={this.addEducation}
            setEducation={this.setPersonalTutorDetailsForm}
          />
          <Form.Item>
            <Button
              onClick={this.submitForm}
              className="mt-4"
              type="danger"
							htmlType="submit"
							style={{ height: '50px', width: '180px'}}
							disabled={this.state.isSaving}
							loading={this.state.isSaving}
            >
              Update profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

TutorDetailsForm.propTypes = {};

const WrappedPersonalTutorDetailsForm = Form.create({
  name: "personal_tutor_details_form"
})(TutorDetailsForm);

const mapStateToProps = state => {
  return {
    user: getUserDetails(state)
  };
};

export default connect(
  mapStateToProps,
  { ...actions }
)(WrappedPersonalTutorDetailsForm);

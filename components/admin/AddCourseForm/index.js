import GeneralDetails from './GeneralDetails';
import CourseDetails from './CourseDetails';
import 'react-quill/dist/quill.snow.css';
import React, { Component } from 'react';
import { Button, Steps} from 'antd';
import PropTypes from 'prop-types';
const uuidv1 = require('uuid/v1');
import Modules from './Modules';
import Faqs from './Faqs';

const Step = Steps.Step;
const steps = [
  {
    title: 'General details',
  },
  {
    title: 'Course details',
  },
  {
    title: 'Modules',
  },
  {
    title: 'FAQS',
  },
];

class Index extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    courseForm: {
      title: '',
      description: '',
      duration: '',
      price: '',
      category: '',
      certificationBy: '',
      institution: '',
      modules: [
        {
          name: '',
          id: uuidv1()
        },
        {
          name: '',
          id: uuidv1()
        },
      ],
      faqs: [
        {
          question: '',
          answer: '',
          id: uuidv1()
        },
        {
          question: '',
          answer: '',
          id: uuidv1()
        },
      ]
    },
    current: 0,
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  setCourseForm = () => {

  }

  nextStep() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prevStep() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  addModule = () => {
    let modules = [ ...this.state.courseForm.modules ];

    modules = [
      {
        name: '',
        id: uuidv1()
      },
      ...modules
    ];

    this.setState({
      courseForm: {
        ...this.state.courseForm,
        modules
      }
    }, () => console.log(this.state))
  }

  addFaq = () => {
    let faqs = [ ...this.state.courseForm.faqs ];

    faqs = [
      {
        answer: '',
        question: '',
        id: uuidv1()
      },
      ...faqs
    ];

    this.setState({
      courseForm: {
        ...this.state.courseForm,
        faqs
      }
    }, () => console.log(this.state))
  }

  setFaq = (value, index) => {
    let faqs = [ ...this.state.courseForm.faqs ];
    faqs[index].name = value

    this.setState({
      courseForm: {
        ...this.state.courseForm,
        faqs
      }
    }, () => console.log(this.state))
  }

  setForm = (key, value) => {
    this.setState({
      courseForm: {
        ...this.state.courseForm,
        [key]: value
      }
    })

  }

  render() {
    const { current } = this.state
    return (
      <section className="student-course-dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-10 col-xl-10 pl-6 pr-6">
              <Steps className="d-xs-block d-sm-block d-md-none"  direction="vertical" progressDot current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <Steps className="d-none d-md-block" progressDot current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">
                {/* STEP  1 */}
                { this.state.current === 0 && (
                  <GeneralDetails setForm={this.setForm} courseForm={this.state.courseForm} />
                )}
                {/* STEP 2 */}
                { this.state.current === 1 && (
                  <CourseDetails setForm={this.setForm} courseForm={this.state.courseForm} />
                )}

                {/* STEP 3 */}
                { this.state.current === 2 && (
                  <Modules setModule={this.setModule} addModule={this.addModule} courseForm={this.state.courseForm} />
                )}

                {/* STEP 4 */}
                { this.state.current === 3 && (
                  <Faqs setFaq={this.setFaq} addFaq={this.addFaq} courseForm={this.state.courseForm}/>
                )}
              </div>


              <div className="steps-action">
                <div className="container mt-4">
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      {
                        current > 0
                        && (
                        <Button className="mr-3" ghost type="primary" style={{ width: '105px', height: '42px' }} onClick={() => this.prevStep()}>
                          Previous
                        </Button>
                        )
                      }
                      {
                        current < steps.length - 1
                        && <Button type="secondary" style={{ width: '105px', height: '42px' }} onClick={() => this.nextStep()}>Next</Button>
                      }
                      {
                        current === steps.length - 1
                        && <Button type="secondary" style={{ width: '105px', height: '42px' }} >Done</Button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Index.propTypes = {

};

export default Index;
/* eslint-disable */
import React from 'react'
import { Form, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import notifier from 'simple-react-notifications'
const Option = Select.Option

class AssignInstructorsForm extends React.Component {
  state = {
    courseOptions: [],
    courseBatchOptions: [],
  }

  assignInstructorToCourse = (e) => {
    e.preventDefault()
    const { form } = this.props
    this.props.assignCourseToInstructor(form).then(() => {
      notifier.success('Successfully assigned instructor to course')
      this.setState({
        courseOptions: [],
        courseBatchOptions: []
      })
    }).catch((err) => {
      let msg = 'ERROR! Unable to assigned instructor to course';
      if (err.response.data.message) {
        msg = err.response.data.message;
      }
      notifier.error(msg)
    })
  }

  searchCourses = (searchQuery) => {
    // if (e !== '') {
    // 	if (popularCourses[number])
    // 	{
    // 		setPopularCourse('', number )
    // 	} else {
    this.props.searchCourses({ 
      q: searchQuery,
      // instructorId: this.props.form.instructorId,
      // notAssigned: 1
    }).then(({ data }) => {
      // setRemoteOptions(data.data.filter((option) => !Object.values(popularCourses).includes(option.id)))
      this.setState({
        courseOptions: data.data
      })
    })
    // }
    // }
  }

  searchCourseBatches = (searchQuery) => {
    // if (e !== '') {
    // 	if (popularCourses[number])
    // 	{
    // 		setPopularCourse('', number )
    // 	} else {
    this.props.searchCourseBatches({ 
      q: searchQuery, 
      authorId: this.props.form.authorId,
      courseId: this.props.form.courseId 
    }).then(({ data }) => {
      // setRemoteOptions(data.data.filter((option) => !Object.values(popularCourses).includes(option.id)))
      // console.log(data)
      this.setState({
        courseBatchOptions: data.data
      })
    })
    // }
    // }
  }

  render () {
    const { setAssignInstructorForm, handleSubmit, form } = this.props
    // const { getFieldDecorator } = form
    return (
      <Form onSubmit={handleSubmit} className="add-new-form">
        <div className="row">
          <div className="col-md-12 mb-2">
            <Form.Item >
              <label htmlFor="course">
                <b>Select course</b>
              </label>
              <Select
                showSearch
                allowClear
                onChange={e => {
                  setAssignInstructorForm(e, 'courseId')
                }}
                size="large"
                showArrow={true}
                filterOption={false}
                notFoundContent="No match"
                onSearch={this.searchCourses}
                className="has-full-width"
                value={form.courseId}
                defaultActiveFirstOption={false}
                placeholder={`Select course`}
              >
                <Option disabled value={null}>Select a course</Option>
                {
                  this.state.courseOptions.map((option) => (
                    <Option key={option.id} value={option.id}>{option.title}</Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item >
              <label htmlFor="batch">
                <b>Select batch</b>
              </label>
              <Select
                showSearch
                allowClear
                onChange={e => {
                  setAssignInstructorForm(e, 'batchId')
                }}
                size="large"
                showArrow={true}
                filterOption={false}
                disabled={!form.courseId}
                notFoundContent="No match"
                onSearch={this.searchCourseBatches}
                className="has-full-width"
                value={form.batchId}
                defaultActiveFirstOption={false}
                placeholder={`Select batch`}
              >
                <Option disabled value={null}>Select a batch</Option>
                {
                  this.state.courseBatchOptions.map((option) => (
                    <Option key={option.id} value={option.id}>{option.batchName}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <Form.Item className="is-full-width d-flex justify-content-center">
            <Button
              style={{ height: '46px', width: '180px' }}
              type="danger"
              htmlType="submit"
              onClick={this.assignInstructorToCourse}
              disabled={!form.courseId || form.isAssigning || !form.batchId}
              loading={form.isAssigning}
            >
              Assign Instructor
            </Button>
          </Form.Item>
        </div>
      </Form>
    )
  }
}

AssignInstructorsForm.propTypes = {
  form: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  setAssignInstructorForm: PropTypes.func.isRequired,
  searchCourses: PropTypes.func.isRequired,
  searchCourseBatches: PropTypes.func.isRequired,
  assignCourseToInstructor: PropTypes.func.isRequired,
}

const WrappedAssignInstructorsForm = Form.create({ 
  name: 'assign instructors form' 
})(AssignInstructorsForm)

export default WrappedAssignInstructorsForm

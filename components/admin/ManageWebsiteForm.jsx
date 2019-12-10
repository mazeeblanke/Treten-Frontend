
/* eslint-disable */
import React from 'react'
import { Form } from 'antd'
import PropTypes from 'prop-types'
import PopularCourse from './PopularCourse'


class ManageWebsiteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
  }

  render () {
    // const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="row">
          {
            [1, 2, 3, 4, 5, 6].map((value) => {
              return (
                <PopularCourse 
                  key={value}
                  number={value}
                  onSearch={this.props.onSearch}
                  setPopularCourse={this.props.setPopularCourse}
                  coursesOptions={this.props.coursesOptions}
                  popularCourses={this.props.popularCourses}
                />
              )
            })
          }
        </div>
      </Form>
    )
  }
}

ManageWebsiteForm.propTypes = {
  form: PropTypes.object.isRequired,
}

const WrappedManageWebsiteForm = Form.create({ name: 'management website form' })(ManageWebsiteForm)

export default WrappedManageWebsiteForm

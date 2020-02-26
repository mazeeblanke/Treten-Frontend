import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'antd'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import Display from '../../shared/Display'
import EmptyState from '../../shared/EmptyState'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

const Modules = props => {
  const { courseForm, setModule, addModule, errors } = props
  const getError = (errors, index) => {
    return (errors.modules && errors.modules[index]) || {}
  }
  return (
    <div className="container mt-7">
      <div
        id="moduleWrapperScrollContainer"
        className="row"
        style={{
          maxHeight: '250px',
          overflowY: 'scroll',
          paddingTop: '1px',
          paddingRight: '2%'
        }}
      >
        <Display if={!courseForm.modules.length}>
          <div className="col-md-12 p-7">
            <EmptyState emptyText="No modules added!" />
          </div>
        </Display>
        {courseForm.modules.map((module, moduleIndex) => (
          <div key={module.id} className="row has-full-width">
            <div className="mb-4 col-md-5" key={module.id}>
              <Form.Item className={getError(errors, moduleIndex).name && 'has-error'}>
                <label htmlFor="moduletitle">
                  <b>Module title</b>
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <Input
                    className="mt-3 is-transparent-bg mr-3"
                    onChange={e => setModule(e.target.value, 'name', 'modules', moduleIndex)}
                    placeholder="Enter module title"
                    value={module.name}
                  />
                </div>
                {getError(errors, moduleIndex).name && (
                  <div className="ant-form-explain">
                    {getError(errors, moduleIndex).name}
                  </div>
                )}
              </Form.Item>

            </div>
            <div className="col-md-5">
              <Form.Item className={getError(errors, moduleIndex).description && 'has-error'}>
                <label htmlFor="description">
                  <b>Module description</b>
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <ReactQuill
                    className="mt-3"
                    placeholder="Enter module description"
                    value={module.description}
                    onChange={e => {
                      setModule(e, 'description', 'modules', moduleIndex)
                    }}
                    height={100}
                  />
                </div>
                <div className="ant-form-explain">
                  {getError(errors, moduleIndex).description}
                </div>
              </Form.Item>

            </div>
            <div className="col-md-1">
              <img className="mt-5" src="/static/images/close.png"
                onClick={() =>
                  setModule(null, null, 'modules', moduleIndex)
                }
              >
              </img>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => addModule()}
        className="d-flex align-items-center has-pointer-cursor mt-3"
      >
        <img className="mr-2" src="/static/images/plus.png" />
        <p className="m-0 ">
          <b>Add another module</b>
        </p>
      </div>
    </div>
  )
}

Modules.propTypes = {
  addModule: PropTypes.func.isRequired,
  setModule: PropTypes.func.isRequired,
  courseForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

export default Modules

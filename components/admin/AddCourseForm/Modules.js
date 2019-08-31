import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
// import 'react-quill/dist/quill.snow.css';
// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false
// });

const Modules = (props) => {
  return (
    <div className="container mt-7">
      <div className="row" style={{ maxHeight: '250px', overflowY: 'scroll', paddingTop: '1px', paddingRight: '2%' }}>
        {
          props.courseForm.modules.map((module, moduleIndex) => (
            <div className="mb-4 col-md-7" key={module.id}>
              <label htmlFor="moduletitle">
                <b>Module title</b>
              </label>
              <div className="d-flex justify-content-between align-items-center">
                <Input
                  className="mt-3 is-transparent-bg mr-3"
                  onChange={(e) => props.setModule(e.target.value, moduleIndex)}
                  placeholder="Enter module title"
                  value={module.name}
                />
                <img className="mt-3" src="/static/images/close.png" />
              </div>
            </div>
          ))
        }
      </div>
      <div onClick={() => props.addModule() } className="d-flex align-items-center has-pointer-cursor mt-3">
        <img className="mr-2" src="/static/images/plus.png" />
        <p className="m-0 ">
          <b>Add another module</b>
        </p>
      </div>
    </div>
  )
};

Modules.propTypes = {

};

export default Modules;
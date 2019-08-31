import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const Faqs = (props) => {
  return (
    <div className="container mt-7 faqs">
      <div className="" style={{ maxHeight: '250px', overflowY: 'scroll', paddingTop: '1px', paddingRight: '2%' }}>
        {
          props.courseForm.faqs.map((faq, faqIndex) => (
            <div  key={faq.id} className="row mb-5">
              {/* <div className="col-md-12"> */}
                <div className="mb-4 col-md-6">
                  <label htmlFor="question">
                    <b>Question</b>
                  </label>
                  <div className="d-flex justify-content-between align-items-center">
                    <Input
                      className="mt-3 is-transparent-bg mr-3"
                      onChange={(e) => props.setFaq('question', e.target.value, faqIndex)}
                      placeholder="Enter FAQ"
                      value={faq.question}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="faqtitle">
                    <b>Answer</b>
                  </label>
                  <div className="d-flex justify-content-between align-items-center">
                    <ReactQuill
                      className="mt-3"
                      placeholder="Enter FAQ answer"
                      value=""
                      onChange={(e) => {props.setFaq('answer', e, faqIndex)}}
                      height={700}
                    />
                    <img className="mt-3 ml-2 mr-2" src="/static/images/close.png" />
                  </div>
                </div>
              {/* </div> */}
            </div>
          ))
        }
      </div>
      <div onClick={() => props.addFaq() } className="d-flex align-items-center has-pointer-cursor mt-3">
        <img className="mr-2" src="/static/images/plus.png" />
        <p className="m-0 ">
          <b>Add another FAQ</b>
        </p>
      </div>
    </div>
  )
};

Faqs.propTypes = {

};

export default Faqs;
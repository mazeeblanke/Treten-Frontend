import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'antd'
import dynamic from 'next/dynamic'
// import 'react-quill/dist/quill.snow.css'
import Display from '../../shared/Display'
import EmptyState from '../../shared/EmptyState'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

const Faqs = props => {
  const { courseForm, addFaq, setFaq, errors } = props
  const getError = (errors, index) => {
    return (errors.faqs && errors.faqs[index]) || {}
  }
  return (
    <div className="container mt-7 faqs">
      <div
        className=""
        style={{
          maxHeight: '250px',
          overflowY: 'scroll',
          paddingTop: '1px',
          paddingRight: '2%'
        }}
      >

        <Display if={!courseForm.faqs.length}>
          <div className="col-md-12 p-7">
            <EmptyState emptyText="No faqs added!" />
          </div>
        </Display>
        {courseForm.faqs.map((faq, faqIndex) => (
          <div key={faq.id} className="row mb-5">
            <div className="mb-4 col-md-5">
              <Form.Item className={getError(errors, faqIndex).question && 'has-error'}>
                <label htmlFor="question">
                  <b>Question</b>
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <Input
                    className="mt-3 is-transparent-bg mr-3"
                    onChange={e =>
                      setFaq(e.target.value, 'question', 'faqs', faqIndex)
                    }
                    placeholder="Enter FAQ"
                    value={faq.question}
                  />
                </div>
                {getError(errors, faqIndex).question && (
                  <div className="ant-form-explain">
                    {getError(errors, faqIndex).question}
                  </div>
                )}
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item className={getError(errors, faqIndex).answer && 'has-error'}>
                <label htmlFor="faqtitle">
                  <b>Answer</b>
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <ReactQuill
                    className="mt-3"
                    placeholder="Enter FAQ answer"
                    value={faq.answer}
                    onChange={e => {
                      setFaq(e, 'answer', 'faqs', faqIndex)
                    }}
                    height={100}
                  />
                </div>
                {getError(errors, faqIndex).answer && (
                  <div className="ant-form-explain">
                    {getError(errors, faqIndex).answer}
                  </div>
                )}
              </Form.Item>
            </div>
            <div className="col-md-1">
              <img className="mt-9" src="/static/images/close.png"
                onClick={() =>
                  setFaq(null, null, 'faqs', faqIndex)
                }
              >
              </img>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => addFaq()}
        className="d-flex align-items-center has-pointer-cursor mt-3"
      >
        <img className="mr-2" src="/static/images/plus.png" />
        <p className="m-0 ">
          <b>Add another FAQ</b>
        </p>
      </div>
    </div>
  )
}

Faqs.propTypes = {
  addFaq: PropTypes.func.isRequired,
  setFaq: PropTypes.func.isRequired,
  courseForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default Faqs

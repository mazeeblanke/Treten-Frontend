import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { Icon } from 'antd'
import Display from '../shared/Display'
import TextTruncate from 'react-text-truncate'
const Skeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false
})

const LatestEnrollments = props => {
  const {
    newStudents,
    refreshNewStudents,
    isRefreshingNewStudents,
  } = props
  return (
    <div className="col-md-12 col-xl-6 newstudents mb-6">
      <div style={{ height: 500 }} className="card dashboard__card border-0 has-full-height">
        <div className="card-body" style={{ padding: '2.2rem 2.2rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0">
              <b>New Students</b>
            </h5>
            <Icon
              onClick={refreshNewStudents}
              type="sync"
              spin={isRefreshingNewStudents}
            />
          </div>
          <div className="">
            <div className="row">
              {newStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="col-md-6"
                  style={{
                    borderRight: index % 2 === 0 ? '1px solid #e8e8e8' : null
                  }}
                >
                  <div className="d-flex align-items-center mt-3 pt-2 mb-4">
                    <Display if={!isRefreshingNewStudents}>
                      <img
                        alt={student.name}
                        className="mr-2 h45 profilePic rounded-circle"
                        src={student.profilePic}
                      />
                    </Display>
                    <Display if={isRefreshingNewStudents}>
                      <Skeleton circle={true} height={45} width={45} />
                    </Display>
                    <div className="d-flex justify-content-center flex-column">
                      <h6 className="testimonial__title mb-0 pb-0">
                        <Display if={!isRefreshingNewStudents}>
                          <TextTruncate
                            line={1}
                            text={student.name}
                          />
                        </Display>
                        <Display if={isRefreshingNewStudents}>
                          <Skeleton />
                        </Display>
                      </h6>
                      <div className="mb-0">
                        <Display if={!isRefreshingNewStudents}>
                          <TextTruncate
                            line={1}
                            element="span"
                            text={student.email}
                          />
                        </Display>
                        <Display if={isRefreshingNewStudents}>
                          <Skeleton height={8} width={140} />
                        </Display>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

LatestEnrollments.propTypes = {
  refreshNewStudents: PropTypes.func.isRequired,
  isRefreshingNewStudents: PropTypes.bool.isRequired,
  newStudents: PropTypes.array.isRequired
}

export default LatestEnrollments

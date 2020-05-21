import React from 'react'
import PropTypes from 'prop-types'

const CourseSchedule = props => {
  const {
    timetable
  } = props
  return (
    <div style={{ height: '500px', overflowY: 'scroll' }}>
      {
        timetable.map((timetableEntry) => (
          <div key={timetableEntry.id}>
            <h6 className="pt-4 pb-4 course-schedule__main-text">
              Class commences on <b>{timetableEntry.startDate}</b> -- by {timetableEntry.name}
            </h6>
            <div className=" mb-5">
              <table>
                <thead>
                  <tr>
                    <th>Days of the week</th>
                    <th style={{ width: '80%' }}>Timetable</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    timetableEntry.timetable.map((schedule) => (
                      <tr key={schedule.day}>
                        <td style={{ verticalAlign: 'top' }}>
                          <span>{schedule.day}</span>
                        </td>
                        <td>
                          {
                            schedule.sessions.map((session, index) => (
                              <p key={index}>
                                <span>{session.begin} - {session.end}</span>
                                <br></br>
                                <span>
                                  <b>{session.activityName}</b>
                                </span>
                              </p>
                            ))
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        ))
      }
    </div>
  )
}

CourseSchedule.propTypes = {
  timetable: PropTypes.array
}

export default CourseSchedule

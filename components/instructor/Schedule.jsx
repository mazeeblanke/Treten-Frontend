/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import Display from '../shared/Display'
import { userIsInstructor, userIsAdmin } from '../../store/reducers/user'

const Schedule = (props) => {
  const {
    user,
    batch,
    batchIndex,
    editBatch
  } = props
  return (
    <Display if={userIsInstructor(user) || userIsAdmin(user)}>
      <>
        <table className="has-full-width">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Days of the week</th>
              <th style={{ width: '60%' }}>Timetable</th>
            </tr>
          </thead>
          <tbody>
            {
              batch.timetable.map((schedule) => (
                <tr key={schedule.day}>
                  <td style={{ verticalAlign: 'top' }}>
                    <span className="text-capitalize">{schedule.day}</span>
                  </td>
                  <td>
                    {
                      schedule.sessions.map((session, index) => (
                        <p key={index}>
                          <span>{`${session.begin} - ${session.end}`}</span>
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
        <Button
          onClick={() => editBatch(batchIndex)}
          size="large"
          type="secondary"
          className="mt-3"
          disabled={!!batch.hasEnded}
        >
          Edit schedule
        </Button>
      </>
    </Display>
  )
}

Schedule.propTypes = {
  user: PropTypes.object.isRequired,
  batch: PropTypes.object.isRequired,
  editBatch: PropTypes.func.isRequired,
  batchIndex: PropTypes.number.isRequired,
}

export default Schedule

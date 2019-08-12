import React from 'react';
import PropTypes from 'prop-types';

const CourseSchedule = props => {
  return (
         <>
            <h6 className="pt-4 pb-4 course-schedule__main-text">
              Course commences on <b>{props.course.startDate}</b>
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
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>
                     <span>Mondays</span>
                    </td>
                    <td>
                      <p>
                        <span>08:00am - 11:45am</span>
                        <br></br>
                        <span>
                          <b>Name of class or activity for this time goes here</b>
                        </span>
                      </p>
                      <p>
                        <span>08:00am - 11:45am</span>
                        <br></br>
                        <span>
                          <b>Name of class or activity for this time goes here</b>
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>
                      <span>Tuesdays</span>
                    </td>
                    <td>
                      <p>
                        <span>08:00am - 11:45am</span>
                        <br></br>
                        <span>
                          <b>Name of class or activity for this time goes here</b>
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </>
  );
};

CourseSchedule.propTypes = {

};

export default CourseSchedule;
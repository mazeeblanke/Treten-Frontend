import React from 'react'
import PropTypes from 'prop-types'

const DashboardCard = (props) => {
  return (
    <div className="card dashboard__card border-0" style={{ height: '12.57rem' }}>
      <div className="card-body">
        <div className="d-flex justify-content-around align-items-center has-full-height">
          <div>
            <img alt="stats" src={props.image}></img>
          </div>
          <div>
            <p className="m-0">{props.title}</p>
            <h3>{props.statCount}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardCard.propTypes = {
  statCount: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired
}

DashboardCard.defaultProps = {
  image: '/images/admin/prof_cap.png'
}

export default DashboardCard

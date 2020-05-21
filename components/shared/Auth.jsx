import React from 'react'
import { connect } from 'react-redux'

const Auth = (props) => {
  if (!props.isLoggedIn) {
    // show
    return (
      <>
        {props.children}
      </>
    )
  }

  if (props.isLoggedIn) {
    // dont show
    return <p>not allowed</p>
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user
})

export default connect(mapStateToProps, null)(Auth)

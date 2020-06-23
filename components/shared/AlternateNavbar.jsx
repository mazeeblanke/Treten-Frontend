import React from 'react'
import Brand from './Brand'
import Router from 'next/router'
import {
  Navbar
} from 'reactstrap'

const AlternateNavbar = () => {
  return (
    <Navbar className="no-box-shadow light-border-bottom alt-nav" color="faded" light expand="md">
      <div className="container d-flex">
        <a className="nav-back" onClick={() => Router.back()}>Back</a>
        <Brand />
      </div>
    </Navbar>
  )
}

export default AlternateNavbar

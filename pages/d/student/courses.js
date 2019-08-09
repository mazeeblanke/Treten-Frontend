import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import EmptyState from '../../../components/student/EmptyState';

class Courses extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  componentWillUnmount() {

  }

  render() {
    return (
      <>
        <EmptyState />
      </>
    );
  }
}

Courses.propTypes = {

};

export default withAdminLayout(Courses);
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const EmptyState = props => {
  return (
    <section className="empty-state has-full-height">
      <div className="d-flex flex-column justify-content-center align-items-center has-full-height">
        <img src="/static/images/admin/cancel.png" />
        <p className="lh-30 mt-3 mb-3 text-center">You have not signed up for any course</p>
        <Button style={{ width: '195px' }} className="ml-3" size="large" type="danger">Explore course catalog</Button>
      </div>
    </section>
  );
};

EmptyState.propTypes = {

};

export default EmptyState;
import React from 'react';
import PropTypes from 'prop-types';


const EmptyState = props => {
  return (
    <section className="empty-state has-full-height">
      <div className="d-flex flex-column justify-content-center align-items-center has-full-height">
        <img src="/static/images/admin/cancel.png" />
        <p className="lh-30 mt-3 mb-3 text-center">{ props.emptyText }</p>
        { props.children }
      </div>
    </section>
  );
};

EmptyState.propTypes = {

};

export default EmptyState;
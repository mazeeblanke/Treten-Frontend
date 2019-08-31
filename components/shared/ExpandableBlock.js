import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ExpandableBlock = props => {

  let [ expanded, setExpanded ] = useState(props.expanded || false);

  return (
    <div className="expandable-block">
      {/* <div className="container">
        <div className="row">
          <div className="col-md-6"> */}
            <div className="expandable-block__header d-flex justify-content-between">
              <p className='expandable-block__left'><b>{props.left}</b></p>
              <div onClick={() => setExpanded(!expanded) }>
                <div className='expandable-block__right has-pointer-cursor d-flex align-items-center has-full-height'>
                  <span className="mr-3 m-0">{props.right}</span>
                  { expanded && <img src="/static/images/minimize.png"  /> }
                  { !expanded && <img src="/static/images/maximize.png"  /> }
                </div>
              </div>
            </div>
          {/* </div>
        </div>
      </div> */}
      <div className="expandable-block__content mt-2">
        {/* <div className="container">
          <div className="row">
            <div className="col-md-6"> */}
              {
                expanded && (
                  <div>
                    <div className="mb-3">
                      {props.content}
                    </div>
                  </div>
                )
              }
              <div className="mb-3">
                <hr></hr>
              </div>
            {/* </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

ExpandableBlock.propTypes = {

};

export default ExpandableBlock;
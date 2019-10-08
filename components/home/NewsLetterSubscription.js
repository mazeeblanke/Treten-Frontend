import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const { Search } = Input;

class NewsLetterSubscription extends Component {
  render() {
    return (
      <section className="newsletter has-dark-bg mb-5 ">
        <div className="container has-full-height">
          <div className="row justify-content-center align-items-center has-full-height">
            <div className="col-sm-12 col-md-4">
              <h4 className="is-white m-0">Subscribe to our newsletter</h4>
              <p className="is-white font-weight-light m-0">For new awesome courses and special promotion campaigns</p>
            </div>
            <div className="col-sm-12 col-md-4">
              <div>
                <Search
                  className="search"
                  placeholder="What's your email address ?"
                  enterButton="Subscribe"
                  size="large"
                  onSearch={value => console.log(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

NewsLetterSubscription.propTypes = {

};

export default NewsLetterSubscription;
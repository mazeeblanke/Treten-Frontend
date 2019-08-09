import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Blog extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {};
  }

  render() {
    return (
      <section className="blog has-grey-bg pt-8 pb-5">
        <h3 className="text-center blog__main-text mt-3">
          Latest from our blog
        </h3>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div class="card mb-3 border-0" style={{ maxWidth: '615px' }}>
                <div class="row no-gutters align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-6 blog-image__container">
                    <img
                      src="/static/images/blog/blog1.png"
                      class="card-img"
                      alt="Best learning environment"
                    />
                  </div>
                  <div class="col-md-12 col-lg-6">
                    <div class="card-body">
                      <p className="mb-3">30 May 2019</p>
                      <h5 class="card-title">How to begin a career in tech</h5>
                      <p class="card-text">
                        You know what? It is beets. I've crashed into a beet truck.
                        Must go faster. My dad once told me, laugh and the world laughs with you,
                        Cry, and I'll give you something to cry about you little bastard...
                      </p>
                      <p>
                        <b>Read more</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div class="card mb-3 border-0" style={{ maxWidth: '615px' }}>
                <div class="row no-gutters align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-6 blog-image__container">
                    <img
                      src="/static/images/blog/blog2.png"
                      class="card-img"
                      alt="Certified experts"
                    />
                  </div>
                  <div class="col-md-12 col-lg-6">
                    <div class="card-body">
                      <p className="mb-3">01 Aug 2019</p>
                      <h5 class="card-title">12 ways to stand out</h5>
                      <p class="card-text">
                        Yeah, but John, if The Pirates of the Caribbean breaks down,
                        the pirates don’t eat the tourists. You know what? It is beets.
                        I've crashed into a beet truck. Just my luck, no ice. Yes, Yes,
                        without the...
                      </p>
                      <p>
                        <b>Read more</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Blog.propTypes = {};

export default Blog;
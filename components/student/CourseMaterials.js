import React from 'react';

import { Select } from 'antd';
const { Option } = Select;
import Slider from "react-slick";
import CourseVideosList from './CourseVideosList';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  arrows: false,
  slidesToShow: 4.1,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3.1,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 2,
        dots: true
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

const CourseMaterials = (props) => {

    return (
      <>
        <section className="course-materials pt-4 mb-8">
          <h5>General course resources</h5>
          <div className="mt-4">
            <Slider { ...settings }>
              {
                props.course.materials.map((material) => (
                  <div className="card border-0">
                    <div className="card-body">
                      <h6 className="card-title mt-3 mb-2 pb-0">
                        { material.title }
                      </h6>
                      <small>
                        { material.resourceSumary }
                      </small>
                      <p className="mt-2 d-flex align-items-center">
                        <b className="mr-1">Download</b>
                        <img src="/static/images/arrow-left-grey.png" />
                      </p>
                    </div>
                  </div>
                ))
              }
            </Slider>
          </div>
          {
            (props.course.type === 'on-demand' || props.course.type === 'remote') && (
              <div className="course-content">
                <h5>Course content</h5>
                <div className="row">
                  {
                    props.course.content.availableDate
                      ? (
                          <div className="col-sm-11 col-md-6 col-lg-4">
                            <p>
                              Content for this course will be available
                              after commencement on <b>Monday, 01 Aug 2019</b>
                            </p>
                          </div>
                        )
                      : null
                  }
                  {
                    props.course.content.videos.length
                      ? (<CourseVideosList videos={props.course.content.videos} />)
                      : null
                  }
                </div>
              </div>
            )
          }
        </section>
      </>
    )
}


export default CourseMaterials
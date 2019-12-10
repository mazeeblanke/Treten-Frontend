import React from 'react'
import Slider from 'react-slick'
import Resource from '../../components/resources/Resource'
// import CourseVideosList from './CourseVideosList'
import Proptypes from 'prop-types'
import EmptyState from '../shared/EmptyState'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  arrows: true,
  autoplay: true,
  slidesToShow: 4.1,
  slidesToScroll: 1,
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
  const {
    resources
  } = props
  const {
    dots,
    infinite,
    speed,
    arrows,
    slidesToScroll,
    slidesToShow,
    responsive
  } = settings
  return (
    <>
      <section className="course-materials pt-4 mb-8">
        <h5>General course resources</h5>
        <div className="mt-4">
          {
            resources.length && (
              <Slider
                dots={dots}
                infinite={infinite}
                speed={speed}
                arrows={arrows}
                slidesToScroll={slidesToScroll}
                slidesToShow={slidesToShow}
                responsive={responsive}
              >
                {
                  resources.map((resource) => (
                    <Resource resource={resource} key={resource.id}/>
                  ))
                }
              </Slider>
            )
          }
          {
            !resources.length && (
              <EmptyState emptyText="No material has been uploade for this course yet" />
            )
          }
        </div>
        {/* {
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
        } */}
      </section>
    </>
  )
}

CourseMaterials.propTypes = {
  resources: Proptypes.array.isRequired
}

export default CourseMaterials

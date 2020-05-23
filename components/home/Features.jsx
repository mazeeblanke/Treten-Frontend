import React from 'react'

const Features = () => {
  return (
    <section className="features mt-5 pb-5">
      <div className="container">
        <h3 className="text-center features__main-text mb-5">
          Features
        </h3>
        {/* <div className="row justify-content-center mb-5">
          <div className="col-md-7 pl-4 pr-4">
            <p className="lh-30 text-center">
              Our features include:
            </p>
          </div>
        </div> */}
        <div className="row is-hcentered">
          <div className="col-sm-12 col-md-6 pb-5">
            <div className="card mb-3" style={{ maxWidth: '615px' }}>
              <div className="row no-gutters align-items-center">
                <div className="col-md-12 col-lg-6">
                  <img src="/images/features/intensive_pratical_classes.png" className="card-img" alt="intensive pratical classes" />
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="card-body">
                    <img alt="curriculum logo" src="/images/intensive_practical_classes.svg" />
                    <h5 className="card-title pt-3">Career-driven Curriculum</h5>
                    <p className="card-text">
                      Our courses are designed for you to learn high-impact professional skills which top companies need, so you can secure that dream job or position right away!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="card mb-3" style={{ maxWidth: '615px' }}>
              <div className="row no-gutters align-items-center">
                <div className="col-md-12 col-lg-6">
                  <img src="/images/features/247_access_lab.png" className="card-img" alt="247 access lab" />
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="card-body">
                    <img alt="innovative environment" src="/images/234_access_lab.svg" />
                    <h5 className="card-title pt-3">Innovative Environment</h5>
                    <p className="card-text">
                      We utilize the latest technology in our conducive facility, to conduct intensive lab sessions that prepare our students for real-world projects in their careers. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="card mb-3" style={{ maxWidth: '615px' }}>
              <div className="row no-gutters align-items-center">
                <div className="col-md-12 col-lg-6">
                  <img src="/images/features/best_learning_environment.png" className="card-img" alt="Best learning environment" />
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="card-body">
                    <img alt="best learning environ" src="/images/best_learning_environ.svg" />
                    <h5 className="card-title pt-3">Corporate Training</h5>
                    <p className="card-text">
                      We help organizations equip their workforce with the skills that will place them at the forefront of digital innovation in their industries. You recruit, we train! 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="card mb-3" style={{ maxWidth: '615px' }}>
              <div className="row no-gutters align-items-center">
                <div className="col-md-12 col-lg-6">
                  <img src="/images/features/certified_experts.png" className="card-img" alt="Certified experts" />
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="card-body">
                    <img alt="certified experts" src="/images/certified_experts.svg" />
                    <h5 className="card-title pt-3">Certified Experts</h5>
                    <p className="card-text">
                      With a 100% success rate, we boast a team of leading experts dedicated to inspiring and guiding our students to succeed in their professional exams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

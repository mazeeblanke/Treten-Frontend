import React from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import Resource from './Resource'
import PaginationNav from '../shared/PaginationNav'

const ResourcesList = (props) => {
  const {
    resources,
    isLoading,
    sort,
    handlePageChange,
    pagination,
    categoryId
  } = props
  return (
    <>
      {resources.length && (
        <div className="course-materials pt-4 mb-8">
          <div className="row">
            <div className="col-md-12 pl-6 pr-6">
              <div className="mt-4 row">
                {
                  resources.map((resource) => (
                    <Resource
                      key={resource.id}
                      resource={resource}
                      isLoading={isLoading}
                      className="col-md-6 col-lg-4 col-xl-3 mb-4 pb-3"
                      // downloadResource={downloadResource}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="is-flex justify-content-start pr-6 pl-6 pb-5 blog-pagination">
        <Pagination
          {...pagination}
          itemRender={PaginationNav}
          onChange={(page) => handlePageChange({ page, categoryId, sort })}
          disabled={isLoading}
        />
      </div>
    </>
  )
}

ResourcesList.propTypes = {
  isLoading: PropTypes.bool,
  categoryId: PropTypes.number,
  sort: PropTypes.string.isRequired,
  resources: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  // downloadResource: PropTypes.func.isRequired,
}

ResourcesList.defaultProps = {
  isLoading: false
}

export default ResourcesList

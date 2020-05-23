import {
  Input,
  Button,
  Radio
} from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv'

const { Search } = Input

const MenuBar = (props) => {
  const {
    search,
    csvData,
    activeTab,
    loadingCSV,
    downloadCSV,
    csvDownloadRef,
    handleTabChange,
    setAddNewFormVisibility,
    // setAssignInstructorModalVisibility
  } = props
  return (
    <div className="menu-bar-container">
      <div className="container">
        <div className="row menu-bar pl-6 pr-6 pt-5 pb-5">
          <div className="col-md-12">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-6 mb-3 col-lg-6 col-sm-12">
                <Radio.Group
                  size="large"
                  value={activeTab}
                  buttonStyle="solid"
                  onChange={handleTabChange}
                >
                  <Radio.Button value="students">
                    Students
                  </Radio.Button>
                  <Radio.Button value="instructors">
                    Instructors
                  </Radio.Button>
                  <Radio.Button value="admins">
                    Admins
                  </Radio.Button>
                </Radio.Group>
              </div>
              <div className={`
                col-md-12 col-lg-6 
                col-sm-12 flex-xs-column 
                flex-sm-row justify-content-lg-end d-flex`
              }>
                <Search
                  placeholder="Search"
                  className="mr-3 mb-3"
                  onSearch={value => search(value)}
                  onChange={e => search(e.target.value)}
                  style={{ width: '180px', height: '42px' }}
                />
                {activeTab !== 'students' ? (
                  <Button
                    ghost
                    type="primary"
                    className="mr-3 mb-3"
                    style={{ height: '42px', width: '105px' }}
                    onClick={() => setAddNewFormVisibility()}
                  >
                    Add new
                  </Button>
                ) : null}
                <Button
                  type="danger"
                  className="mb-3"
                  loading={loadingCSV}
                  onClick={downloadCSV}
                  style={{ width: '126px', height: '40px' }}
                >
                  <span>Download</span>
                  <img alt="download" className="ml-2" src="/images/down.png" />
                </Button>
                {
                  <CSVLink
                    target="_blank"
                    data={csvData}
                    ref={csvDownloadRef}
                    style={{ display: 'none' }}
                    filename={`${activeTab}.csv`}
                  >
                    Download
                  </CSVLink>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MenuBar.propTypes = {
  search: PropTypes.func.isRequired,
  csvData: PropTypes.array.isRequired,
  loadingCSV: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  downloadCSV: PropTypes.func.isRequired,
  csvDownloadRef: PropTypes.object.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  setAddNewFormVisibility: PropTypes.func.isRequired,
  // setAssignInstructorModalVisibility: PropTypes.func.isRequired
}

export default MenuBar

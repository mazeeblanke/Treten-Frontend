import AdminLayout from '../../layouts/AdminLayout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatings from "react-star-ratings";
import { Table, Input, Button, Select } from "antd";
import ManageWebsiteForm from '../../../components/admin/ManageWebsiteForm';

const Search = Input.Search;
const { Option } = Select;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 100,
    key: 5,
    fixed: 'left',
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
    key: 2,
  },
  {
    title: "Course",
    dataIndex: "course",
    key: 3,
    width: 150
  },
  {
    title: "Number of stars",
    dataIndex: "number_of_stars",
    key: 7,
    width: 150,
    render: (number_of_stars) => {
      console.log(number_of_stars);
      return (
        <StarRatings
          starDimension="15px"
          starSpacing="3px"
          rating={number_of_stars}
          starRatedColor="#E12828"
          changeRating={() => {}}
          number_of_stars={5}
          name='rating'
        />
      )
    }
  },
  {
    title: "Review message",
    dataIndex: "review_message",
    // fixed: 'right',
    // align: 'right',
    render: (review_message) => {
      return (
        <div>{review_message.substr(0, 80)}...<b>see more</b></div>
      )
    },
    key: 8,
    width: 250
  },
  {
    title: "Approval",
    dataIndex: "approval",
    // fixed: 'right',
    // align: 'right',
    key: 38,
    width: 150,
    render: (approved) => {
      return (
        approved
          ? <div className="tag is-success">Approved</div>
          : <div className="tag is-grey">Not approved</div>
      )
    }
  },
  {
    title: "Publication",
    dataIndex: "published",
    // fixed: 'right',
    // align: 'right',
    key: 28,
    width: 150,
    render: (published) => {
      return (
        published
          ? <div className="tag is-success">Published</div>
          : <div className="tag is-grey">Not published</div>
      )
    }
  },
  {
    title: 'Action',
    key: 'operation',
    width: 90,
    render: () => (
      <div>
        <Select defaultValue="Action" style={{ width: 85, height: 42 }}>
          <Option value="jack">Jack</Option>
          <Option value="none">None</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
    ),
  },
];



class ManageWebsite extends Component {
  constructor(props) {
    super(props);

  }

  state = {

  }
  // componentWillMount() {

  // }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  componentWillUnmount() {

  }

  render() {
    return (
      <section className="manage-website">
        <AdminLayout headerName="Manage Website">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 has-border-bottom">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-4 col-sm-12">
                      <h4 className="m-0 pt-6 pb-6"><b>Course sections</b></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row pl-6 pr-6 mt-5">
              <div className="col-md-12 col-lg-8">
                <ManageWebsiteForm />
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    );
  }
}

ManageWebsite.propTypes = {

};

export default ManageWebsite;
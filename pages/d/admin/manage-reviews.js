import AdminLayout from '../../layouts/AdminLayout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatings from "react-star-ratings";
import { Table, Input, Button, Select } from "antd";

const Search = Input.Search;
const { Option } = Select;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 90,
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



class ManageReviews extends Component {
  constructor(props) {
    super(props);

  }

  paginationOptions = {
    showTotal: (total, range) => {
      if (this.state.feedback !== `Showing ${range[0]} - ${range[1]} of ${total}`) {
        this.setState({
          feedback: `Showing ${range[0]} - ${range[1]} of ${total}`
          // feedback: `${range[0]}-${range[1]} of ${total} items`
        })
      }
    },
    pageSize: 6,
    itemRender: (current, type, originalElement) => {
      if (type === 'prev') {
        return (
          <div className="ant-pagination-prev">
            <a className="ant-pagination-item-link">
              <img src="/static/images/arrow-right-grey.png" />
            </a>
          </div>
        )
      } if (type === 'next') {
        return (
          <div className="ant-pagination-next">
            <a className="ant-pagination-item-link">
              <img src="/static/images/arrow-left-grey.png" />
            </a>
          </div>
        )
      }
      return originalElement;
    }
  }

  state = {
    feedback: '',
    reviews: [
      {
        key: "1",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "13",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "2",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 1,
        published: 0,
      },
      {
        key: "20",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 1,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "3",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 1,
        published: 0,
      },
      {
        key: "4",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 5,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "40",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 1,
        published: 0,
      },
      {
        key: "1",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "13",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "2",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 1,
        published: 0,
      },
      {
        key: "20",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 1,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "3",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 1,
        published: 0,
      },
      {
        key: "4",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 5,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 0,
        published: 1,
      },
      {
        key: "40",
        course: "CCNA R&S",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        number_of_stars: 3,
        review_message: `Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world
        Trillion astonishment rings of Uranus cosmos prime number of the whole world `,
        approval: 1,
        published: 0,
      }
    ],
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
      <section className="reviews">
        <AdminLayout headerName="Manage Reviews">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 pt-6">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-4  col-sm-12 mb-3">
                      <p>{this.state.feedback}</p>
                    </div>
                    <div className="col-md-8 col-sm-12 justify-content-md-end d-flex">
                      <Search
                        className="mr-3 mb-3"
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                        style={{ width: '180px', height: '42px' }}
                      />
                      <Button className="mb-3" type="danger" style={{ width: '126px', height: '40px' }} >
                        <span>Download</span>
                        <img className="ml-2" src="/static/images/down.png" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row pl-6 pr-6">
              <div className="col-md-12">
                <Table scroll={{ x: 1300 }} pagination={this.paginationOptions} columns={columns} dataSource={this.state.reviews} />
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    );
  }
}

ManageReviews.propTypes = {

};

export default ManageReviews;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import Display from '../../../components/shared/Display';
import withAdminLayout from '../../layouts/withAdminLayout';
import ReactHtmlParser from 'react-html-parser';

class Messages extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    selectedMessage: {},
    messages: [
      {
        sender: {
          profile_pic: '/static/images/instructors/instructor1.png',
          fullname: 'Azibanayam Micheal'
        },
        formattedDate: '5 mins',
        title: `New updates about the additional materials`,
        content: `
          <h4>New updates about the additional materials</h4>
          <p>
             Science rich in heavy atoms cosmic fugue extraplanetary
             stirred by starlight rogue? Emerged into consciousness
             laws of physics the only home we've ever known laws of
             physics vanquish the impossible vastness is bearable
             only through love? A very small stage in a vast cosmic
             arena courage of our questions Sea of Tranquility extraordinary
             claims require extraordinary evidence rings of Uranus at the edge
             of forever. Finite but unbounded star stuff harvesting star light
             dispassionate extraterrestrial observer a mote of dust suspended
             in a sunbeam how far away made in the interiors of collapsing stars.
          </p>
          <br>
          <br>
          <p>
            Find the resources <a href="#">here</a>.
          </p>
          <br>
          <br>
          <p>
            Cheers and all the best!
          </p>
        `
      },
      {
        sender: {
          profile_pic: '/static/images/instructors/instructor2.png',
          fullname: 'Azibanayam Micheal'
        },
        formattedDate: '10 mins',
        title: `How to go about your final project`,
        content: `
          <h5>How to go about your final project</h5>
          <p>
             Science rich in heavy atoms cosmic fugue extraplanetary
             stirred by starlight rogue? Emerged into consciousness
          </p>
          <p>
            Find the resources here.
          </p>
          <p>
            Cheers and all the best!
          </p>
        `
      },
      {
        sender: {
          profile_pic: '/static/images/instructors/instructor3.png',
          fullname: 'Azibanayam Micheal'
        },
        formattedDate: '2 hrs',
        title: `What to do when you run into any issues`,
        content: `
          <h5>What to do when you run into any issues</h5>
          <p>
             Science rich in heavy atoms cosmic fugue extraplanetary
             stirred by starlight rogue? Emerged into consciousness
          </p>
          <p>
            Find the resources here.
          </p>
          <p>
            Cheers and all the best!
          </p>
        `
      },
      {
        sender: {
          profile_pic: '/static/images/instructors/instructor1.png',
          fullname: 'Azibanayam Micheal'
        },
        formattedDate: '19 hrs',
        title: `Information about exams and certificates`,
        content: `
          <h5>Information about exams and certificates</h5>
          <p>
             Science rich in heavy atoms cosmic fugue extraplanetary
             stirred by starlight rogue? Emerged into consciousness
          </p>
          <p>
            Find the resources here.
          </p>
          <p>
            Cheers and all the best!
          </p>
        `
      },
      {
        sender: {
          profile_pic: '/static/images/instructors/instructor4.png',
          fullname: 'Azibanayam Micheal'
        },
        formattedDate: 'Yesterday',
        title: `Updates about additional course content`,
        content: `
          <h5>Updates about additional course content</h5>
          <p>
             Science rich in heavy atoms cosmic fugue extraplanetary
             stirred by starlight rogue? Emerged into consciousness
          </p>
          <p>
            Find the resources here.
          </p>
          <p>
            Cheers and all the best!
          </p>
        `
      },
      {
        sender: {
          profile_pic: '/static/images/instructors/instructor2.png',
          fullname: 'Azibanayam Micheal'
        },
        formattedDate: '2 days',
        title: `Where to find more study resources online`,
        content: `
          <h5>Where to find more study resources online</h5>
          <p>
             Science rich in heavy atoms cosmic fugue extraplanetary
             stirred by starlight rogue? Emerged into consciousness
          </p>
          <p>
            Find the resources here.
          </p>
          <p>
            Cheers and all the best!
          </p>
        `
      },
    ],
    // messages: []
  }

  componentWillMount() {

  }

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

  selectMessage = (message) => {
    console.log(message)
    this.setState({
      selectedMessage: message
    })
  }

  render() {
    return (
      <section className="messages">
        <div className="container">
          <div className="row pl-6 pr-6">
            <div className="col-md-12 ">
              <div className="row mt-5 message-wrapper d-none d-lg-block d-xl-block">
                <div className="col-md-4 pl-0 sidebar">
                  <div className="">
                    <Display if={this.state.messages.length}>
                        <List
                          messageLayout="horizontal"
                          dataSource={this.state.messages}
                          renderItem={message => (
                            <List.Item
                              key={message.title}
                              onClick={() => this.selectMessage(message)}
                              style={{ background: this.state.selectedMessage.title == message.title ? '#FAFAFA' : '', cursor: 'pointer' }}
                        >
                              <List.Item.Meta
                                title={
                                  <div className="d-flex align-items-center justify-content-sm-between">
                                    <h5 className="m-0">{message.sender.fullname}</h5>
                                    <span>{message.formattedDate}</span>
                                  </div>
                                }
                                avatar={<Avatar src={message.sender.profile_pic} />}
                              />
                                <p>{message.title}</p>
                            </List.Item>
                          )}
                        />
                      </Display>
                  </div>


                </div>
                <div className="col-md-8 p-0">
                  <Display if={this.state.selectedMessage.title}>
                    {/* <div className=""> */}
                      <div className="message__top-bar d-flex align-items-center mt-3 pl-5 pr-5">
                        <Avatar className="mr-2" size="large" src={(this.state.selectedMessage.sender || {}).profile_pic} />
                        <h5 className="m-0">{(this.state.selectedMessage.sender || {}).fullname}</h5>
                      </div>
                      <div className="pl-5 pr-5 mt-5 message__content">
                        { ReactHtmlParser(this.state.selectedMessage.content) }
                      </div>
                    {/* </div> */}
                  </Display>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Messages.propTypes = {

};

Messages.headerName = "Messages"

export default withAdminLayout(Messages);
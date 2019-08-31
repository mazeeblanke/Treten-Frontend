import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Avatar, Button, Tabs, Radio, Input, Modal } from "antd";
import Display from "../../../components/shared/Display";
import withAdminLayout from "../../layouts/withAdminLayout";
import Chat from "../../../components/shared/Chat";
import BroadcastMessages from "../../../components/shared/BroadcastMessages";
import EmailForm from '../../../components/admin/EmailForm';
import BroadcastMessageForm from "../../../components/instructor/BroadcastMessageForm";

const TabPane = Tabs.TabPane;
let prev;
class Messages extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    emailForm: {
      toGroup: '',
      title: '',
      message: ''
    },
    broadcastMessageForm: {
      toGroup: '',
      title: '',
      message: ''
    },
    activeTab: "chats",
    isShowingEmailForm: false,
    isShowingBroadcastMessageForm: false,
    windowWidth: 0,
    isViewingSelectedMessage: false,
    isViewingSelectedChat: false,
    selectedMessage: {},
    selectedChat: {},
    chatThread: [
      {
        origin: "from",
        msg: `You really think you can fly that thing? Life finds a way.
        They're using our own satellites against us. And the clock is ticking.
        Jaguar shark! So tell me - does it really exist?`,
        time: "08:30am"
      },
      {
        origin: "to",
        msg: `Yeah, but your scientists were so preoccupied with whether or not they could,
        they didn't stop to think if they should.
        Hey, you know how I'm, like, always trying to save the planet?`,
        time: "09:30am"
      },
      {
        origin: "from",
        msg: `let me be honest, i love you`,
        time: "08:30am"
      },
      {
        origin: "from",
        msg: `please say something`,
        time: "08:30am"
      },
      {
        origin: "from",
        msg: `anything`,
        time: "08:30am"
      },
      {
        origin: "to",
        msg: `sorry i don't know what to say `,
        time: "08:30am"
      },
      {
        origin: "to",
        msg: `please say something`,
        time: "08:30am"
      },
      {
        origin: "to",
        msg: `trying to save the planet`,
        time: "08:30am"
      },
      {
        origin: "from",
        msg: `you know how I'm`,
        time: "08:30am"
      },
      {
        origin: "to",
        msg: `your scientists were so preoccupied`,
        time: "08:30am"
      }
    ],
    chats: [
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor1.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "5 mins",
        id: 1,
        lastMessage: `New updates about the additional materials`
      },
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor2.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "10 mins",
        lastMessage: `How to go about your final project`,
        id: 2
      },
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor3.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "2 hrs",
        lastMessage: `What to do when you run into any issues`,
        id: 3
      },
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor1.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "19 hrs",
        lastMessage: `Information about exams and certificates`,
        id: 4
      },
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor4.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "Yesterday",
        lastMessage: `Updates about additional course content`,
        id: 5
      },
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor2.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "2 days",
        lastMessage: `Where to find more study resources online`,
        id: 6
      },
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor1.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "19 hrs",
        id: 7,
        lastMessage: `Information about exams and certificates`
      }
    ],
    messages: [
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor1.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "5 mins",
        id: 1,
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
          profile_pic: "/static/images/instructors/instructor2.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "10 mins",
        title: `How to go about your final project`,
        id: 2,
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
          profile_pic: "/static/images/instructors/instructor3.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "2 hrs",
        title: `What to do when you run into any issues`,
        id: 3,
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
          profile_pic: "/static/images/instructors/instructor1.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "19 hrs",
        title: `Information about exams and certificates`,
        id: 4,
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
          profile_pic: "/static/images/instructors/instructor4.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "Yesterday",
        title: `Updates about additional course content`,
        id: 5,
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
          profile_pic: "/static/images/instructors/instructor2.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "2 days",
        title: `Where to find more study resources online`,
        id: 6,
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
      {
        sender: {
          profile_pic: "/static/images/instructors/instructor1.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "19 hrs",
        id: 7,
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
          profile_pic: "/static/images/instructors/instructor4.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "Yesterday",
        title: `Updates about additional course content`,
        id: 8,
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
          profile_pic: "/static/images/instructors/instructor2.png",
          fullname: "Azibanayam Micheal"
        },
        formattedDate: "2 days",
        title: `Where to find more study resources online`,
        id: 9,
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
      }
    ]
  };

  componentWillMount() {}

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  clearSelectedMessage = () => {
    this.setState({
      isViewingSelectedMessage: false,
      selectedMessage: {}
    });
  };

  selectMessage = message => {
    console.log(message);
    this.setState({
      isViewingSelectedMessage: true,
      selectedMessage: message
    });
  };

  selectChat = chat => {
    // console.log(message)
    this.setState({
      isViewingSelectedChat: true,
      selectedChat: chat
    });
  };

  handleTabChange = e => {
    this.setState({
      activeTab: e.target.value
    });
  };

  closeModal = () => {
    this.setState({
      isShowingEmailForm: false,
      isShowingBroadcastMessageForm: false,
    })
  }

  setEmailForm = () => {

  }

  setBroadcastMessageForm = () => {

  }

  handleSubmit = () => {

  }

  showEmailForm = () => {
    this.setState({
      isShowingEmailForm: true
    })
  }

  showBroadcastForm = () => {
    this.setState({
      isShowingBroadcastMessageForm: true
    })
  }

  determineChatStyle = (chat, index, chats) => {
    let computedStyle = {
      marginTop: prev != chat.origin ? "40px" : null,
      padding: chat.msg.length >= 120 ? "30px 20px" : null,
      maxWidth: "80%",
      display:
        index < chats.length - 1 && chat.origin == chats[index + 1].origin
          ? "none"
          : null
    };
    prev = chat.origin;
    return computedStyle;
  };

  render() {
    return (
      <section className="messages mt-5-neg pt-4">
        <div className="container pt-7">
          <div className="row pl-6 pr-6">
            <div className="col-md-8 mb-3 col-lg-8 col-xl-9 col-sm-12">
              <Radio.Group
                onChange={this.handleTabChange}
                value={this.state.activeTab}
                size="large"
                buttonStyle="solid"
              >
                <Radio.Button value="chats">Chats</Radio.Button>
                <Radio.Button value="bMessages">
                  {
                    this.props.user.role === 'admin'
                    ? 'Emails'
                    : 'Broadcast messages'
                  }

                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="col-md-4 mb-3 col-lg-4 col-xl-3 col-sm-12 d-flex justify-content-md-end">
              <Display if={this.state.activeTab === 'bMessages' && this.props.user.role === 'instructor'}>
                <Button onClick={this.showBroadcastForm} type="danger" style={{ width: '205px', height: '42px' }}>New broadcast message</Button>
              </Display>
              <Display if={this.state.activeTab === 'bMessages' && this.props.user.role === 'admin'}>
                <Button onClick={this.showEmailForm} type="danger" style={{ width: '205px', height: '42px' }}>New email</Button>
              </Display>
            </div>
          </div>
          <div className="row pl-6 pr-6">
            <div className="col-md-12 pt-3">
              <Tabs activeKey={this.state.activeTab}>
                <TabPane tab="chats" key="chats">
                  <Chat
                    determineChatStyle={this.determineChatStyle}
                    selectChat={this.selectChat}
                    clearSelectedChat={this.clearSelectedChat}
                    {...this.state}
                  />
                </TabPane>
                <TabPane tab="bMessages" key="bMessages">
                  <BroadcastMessages
                    selectMessage={this.selectMessage}
                    clearSelectedMessage={this.clearSelectedMessage}
                    {...this.state}
                  />
                  { this.state.isShowingEmailForm && (
                    <Modal
                      footer={null}
                      wrapClassName="email-form-modal"
                      width="464px"
                      height="514px"
                      centered
                      onCancel={this.closeModal}
                      visible={this.state.isShowingEmailForm}
                      title={
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>New Email</h5>
                        </div>
                      }
                    >
                      <EmailForm
                        emailForm={this.state.emailForm}
                        setEmailForm={this.setEmailForm}
                        handleSubmit={this.handleSubmit}
                      />
                    </Modal>
                  )}
                  { this.state.isShowingBroadcastMessageForm && (
                    <Modal
                      footer={null}
                      wrapClassName="broadcast-message-form-modal"
                      width="464px"
                      height="514px"
                      centered
                      onCancel={this.closeModal}
                      visible={this.state.isShowingBroadcastMessageForm}
                      title={
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>New broadcast message</h5>
                        </div>
                      }
                    >
                      <BroadcastMessageForm
                        broadcastMessageForm={this.state.broadcastMessageForm}
                        setBroadcastMessageForm={this.setBroadcastMessageForm}
                        handleSubmit={this.handleSubmit}
                      />
                    </Modal>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Messages.propTypes = {};

Messages.headerName = "Messages";

export default withAdminLayout(Messages);

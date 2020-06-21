import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Echo from 'laravel-echo'
import React, { Component } from 'react'
import { Button, Tabs, Radio, Modal } from 'antd'
import * as actions from '../../../store/actions'
import Chat from '../../../components/shared/Chat'
import Display from '../../../components/shared/Display'
import withAdminLayout from '../../layouts/withAdminLayout'
import BroadcastMessages from '../../../components/shared/BroadcastMessages'
import BroadcastMessageForm from '../../../components/instructor/BroadcastMessageForm'
import {
  getChatUsers,
  getAllChats,
  getAllBroadcasts,
  getSelectedChatThread
} from '../../../store/reducers/chat'
import BroadcastFormModalTitle from '../../../components/instructor/BroadcastFormModalTitle'
import withRedirect from '../../layouts/withRedirect'
import { userIsStudent } from '../../../store/reducers/user'

const TabPane = Tabs.TabPane
let prev

class Messages extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchChats()),
      reduxStore.dispatch(actions.fetchBroadcasts())
    ])
    return {}
  }

  state = {
    activeTab: 'chats',
    isShowingBroadcastMessageForm: false,
    windowWidth: 0,
    selectedMessage: {}
  };

  componentDidMount () {
    this.handleResize()
    // this.registerEcho()
  }

  componentWillUnmount () {
    window && window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    })
    window.addEventListener('resize', this.handleResize)
  };

  registerEcho () {
    window.tretenEcho = new Echo({
      broadcaster: 'socket.io',
      host: 'http://159.89.234.185' + ':6001'
    })

    window.currentUserChannel = window.tretenEcho.channel(
      `treten_database_private-user.${this.props.user.id}`
    )

    window.currentUserChannel
      .listen('MessageReceived', e => {
        this.props.updateSentChat(e.message)
      })
  }

  clearSelectedMessage = () => {
    this.setState({
      isViewingSelectedMessage: false,
      selectedMessage: {}
    })
  };

  clearSelectedChat = () => {
    this.props.clearSelectedChat()
  };

  selectMessage = message => {
    if (message.messageUuid) {
      this.props.fetchBroadcast({
        messageUuid: message.messageUuid
      })
    }
  };

  startNewChat = () => {
    this.props.startNewChat()
  };

  selectChat = chat => {
    if (chat.messageUuid) {
      this.props.fetchChat({
        messageUuid: chat.messageUuid
      })
    }
  };

  sendChat = receiver => {
    this.props.sendChat(receiver)
  };

  handleTabChange = e => {
    this.setState({
      activeTab: e.target.value
    })
  };

  closeModal = () => {
    this.setState({
      isShowingBroadcastMessageForm: false
    })
  };

  showBroadcastForm = () => {
    this.setState({
      isShowingBroadcastMessageForm: true
    })
  };

  determineChatStyle = (chat, index, chats) => {
    const computedStyle = {
      marginTop: prev !== chat.origin ? '40px' : null,
      padding: chat.msg.length >= 120 ? '30px 20px' : null,
      maxWidth: '80%',
      display: index < chats.length - 1 &&
        chat.origin === chats[index + 1].origin
        ? 'none'
        : null
    }
    prev = chat.origin
    return computedStyle
  };

  render () {
    const {
      broadcasts,
      chats,
      chat,
      chatUsers,
      user,
      setRecipient,
      setMessageBeingTyped,
      setChartFormVisibility
    } = this.props
    const {
      windowWidth,
      isViewingSelectedMessage,
      isShowingBroadcastMessageForm
    } = this.state
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
                  Broadcast messages
                </Radio.Button>
              </Radio.Group>
            </div>
            <div className="col-md-4 mb-3 col-lg-4 col-xl-3 col-sm-12 d-flex justify-content-md-end">
              <Display if={this.state.activeTab === 'bMessages' && !userIsStudent(user)}>
                <Button
                  onClick={this.showBroadcastForm}
                  type="danger"
                  style={{ width: '205px', height: '42px' }}
                >
                  New broadcast message
                </Button>
              </Display>
            </div>
          </div>
          <div className="row pl-6 pr-6">
            <div className="col-md-12 pt-3">
              <Tabs activeKey={this.state.activeTab}>
                <TabPane tab="chats" key="chats">
                  <Chat
                    chat={chat}
                    determineChatStyle={this.determineChatStyle}
                    fetchChatUsers={this.props.fetchChatUsers}
                    selectChat={this.selectChat}
                    sendChat={this.sendChat}
                    clearSelectedChat={this.clearSelectedChat}
                    startNewChat={this.startNewChat}
                    chats={chats}
                    user={user}
                    chatUsers={chatUsers}
                    windowWidth={windowWidth}
                    setMessageBeingTyped={setMessageBeingTyped}
                    setRecipient={setRecipient}
                    setChartFormVisibility={setChartFormVisibility}
                  />
                </TabPane>
                <TabPane tab="bMessages" key="bMessages">
                  <BroadcastMessages
                    user={user}
                    broadcasts={broadcasts}
                    selectMessage={this.selectMessage}
                    windowWidth={windowWidth}
                    isViewingSelectedMessage={isViewingSelectedMessage}
                    clearSelectedMessage={this.clearSelectedMessage}
                  />
                  <Display if={!!isShowingBroadcastMessageForm}>
                    <Modal
                      footer={null}
                      wrapClassName="broadcast-message-form-modal"
                      width="464px"
                      height="514px"
                      centered
                      onCancel={this.closeModal}
                      visible={this.state.isShowingBroadcastMessageForm}
                      title={<BroadcastFormModalTitle user={user}/>}
                    >
                      <BroadcastMessageForm
                        broadcastMessageForm={this.state.broadcastMessageForm}
                        sendBroadcast={this.props.sendBroadcast}
                        closeFormModal={this.closeModal}
                        fetchUserGroups={this.props.fetchUserGroups}
                        handleSubmit={this.handleSubmit}
                      />
                    </Modal>
                  </Display>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Messages.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
  clearSelectedChat: PropTypes.func.isRequired,
  updateSentChat: PropTypes.func.isRequired,
  fetchChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  chats: PropTypes.object.isRequired,
  broadcasts: PropTypes.object.isRequired,
  broadcast: PropTypes.object.isRequired,
  chatUsers: PropTypes.object.isRequired,
  startNewChat: PropTypes.func.isRequired,
  sendChat: PropTypes.func.isRequired,
  fetchChatUsers: PropTypes.func.isRequired,
  fetchUserGroups: PropTypes.func.isRequired,
  setMessageBeingTyped: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  fetchBroadcast: PropTypes.func.isRequired,
  setChartFormVisibility: PropTypes.func.isRequired,
  sendBroadcast: PropTypes.func.isRequired
}

Messages.headerName = 'Messages'

const mapStateToProps = state => {
  return {
    chats: {
      ...state.chat.chats,
      all: getAllChats(state)
    },
    broadcasts: {
      ...state.chat.broadcasts,
      selectedMessage: state.chat.selectedBroadcast,
      all: getAllBroadcasts(state)
    },
    chat: {
      ...state.chat,
      selectedChat: {
        ...state.chat.selectedChat,
        all: getSelectedChatThread(state)
      }
    },
    chatUsers: getChatUsers(state)
  }
}

export default withRedirect(connect(
  mapStateToProps,
  {
    clearSelectedChat: actions.clearSelectedChat,
    updateSentChat: actions.updateSentChat,
    sendChat: actions.sendChat,
    fetchChat: actions.sendChat,
    startNewChat: actions.startNewChat,
    fetchChatUsers: actions.fetchChatUsers,
    setChartFormVisibility: actions.setChartFormVisibility,
    setRecipient: actions.setRecipient,
    setMessageBeingTyped: actions.startNewChat,
    fetchBroadcast: actions.fetchBroadcast,
    fetchUserGroups: actions.fetchUserGroups,
    sendBroadcast: actions.sendBroadcast
  }
)(withAdminLayout(Messages)))

import React from 'react'
import Display from './Display'
import PropTypes from 'prop-types'
import EmptyState from './EmptyState'
import { List, Avatar, Icon } from 'antd'
import ReactHtmlParser from 'react-html-parser'
import { userIsStudent } from '../../store/reducers/user'

const BroadcastMessages = props => {
  const {
    user,
    windowWidth,
    broadcasts,
    selectMessage,
    clearSelectedMessage,
    isViewingSelectedMessage
  } = props
  const { selectedMessage } = broadcasts

  const shouldDisplayAvatar = (message, user) => {
    return user.id !== (message.sender || {}).id
  }

  const isSelectedMessage = (message) => {
    return selectedMessage.messageUuid === message.messageUuid
  }

  const selectedMessageIsBooting = () => {
    return selectedMessage.isLoading &&
            !selectedMessage.isViewing
  }
  const noSelectedMessage = () => {
    return !selectedMessage.isLoading &&
            !!selectedMessage.isViewing
  }

  return (
    <div className="row mt-1 message-wrapper">
      <Display
        if={
          !props.isViewingSelectedMessage ||
          (
            props.isViewingSelectedMessage &&
            props.windowWidth > 978
          )
        }
      >
        <div className="col-md-12 col-lg-4 pl-0 sidebar">
          <div className="sidebar__message-box">
            <Display if={!!broadcasts.all.length}>
              <List
                messageLayout="horizontal"
                dataSource={broadcasts.all}
                renderItem={message => (
                  <List.Item
                    key={message.messageUuid}
                    onClick={() => selectMessage(message)}
                    style={{
                      background:
                      isSelectedMessage(message)
                        ? 'rgb(245, 245, 245)'
                        : '',
                      cursor: 'pointer'
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <div
                          className="d-flex align-items-center justify-content-sm-between"
                        >
                          <h5 className="m-0 mr-2 text-capitalize">
                            {
                              userIsStudent(user) ||
                              shouldDisplayAvatar(message, user)
                                ? message.sender.name
                                : message.group.groupName
                            }
                          </h5>
                          <div>
                            <small className="float-right">
                              {message.formattedDate}
                            </small>
                          </div>
                        </div>
                      }
                      avatar={
                        <Avatar
                          size={28}
                          src={
                            userIsStudent(user) ||
                            shouldDisplayAvatar(message, user)
                              ? message.sender.profilePic
                              : '/images/users-red.png'
                          } />}
                    />
                    <p>{message.title}</p>
                  </List.Item>
                )}
              />
            </Display>
          </div>
        </div>
      </Display>
      <div className="col-md-12 col-lg-8 p-0">
        <Display
          if={
            selectedMessageIsBooting()
          }
        >
          <section
            className="empty-state has-full-height">
            <div className={`
              d-flex flex-column 
              justify-content-center 
              align-items-center has-full-height
            `}>
              <Icon
                width="3rem"
                height="3rem"
                style={{ fontSize: '36px' }}
                type="loading"
              />
            </div>
          </section>
        </Display>
        <Display
          if={
            noSelectedMessage()
          }
        >
          <div className="message__top-bar d-flex align-items-center pl-6 pr-6">
            {isViewingSelectedMessage && windowWidth < 978 && (
              <img
                className="mr-3"
                onClick={clearSelectedMessage}
                src="/images/back.png"
              />
            )}
            <Avatar
              className="mr-2"
              size={28}
              src={
                userIsStudent(user) ||
                shouldDisplayAvatar(selectedMessage, user)
                  ? (selectedMessage.sender || {}).profilePic
                  : '/images/users-red.png'
              }
            />
            <h5 className="m-0">
              {(selectedMessage.sender || {}).name}
            </h5>
          </div>
          <div className="pl-6 pr-6 pt-5 message__content">
            <h4>
              {selectedMessage.title}
            </h4>
            <br />
            <br />
            {ReactHtmlParser(selectedMessage.message)}
          </div>
        </Display>
        <Display if={!selectedMessage.title}>
          <EmptyState emptyText="You have not selected any message" />
        </Display>
      </div>
    </div>
  )
}

BroadcastMessages.propTypes = {
  broadcasts: PropTypes
    .shape({
      all: PropTypes.array,
      selectedMessage: PropTypes.object
    }).isRequired,
  windowWidth: PropTypes.number,
  user: PropTypes.object.isRequired,
  isViewingSelectedMessage: PropTypes.bool,
  selectMessage: PropTypes.func.isRequired,
  clearSelectedMessage: PropTypes.func.isRequired,
}

export default BroadcastMessages

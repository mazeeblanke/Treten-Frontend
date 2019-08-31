import React from 'react';
import PropTypes from 'prop-types';
import Display from '../shared/Display';
import { List, Avatar, Button, Tabs, Radio, Input } from "antd";

const Chat = props => {
  return (
    <div className="row mt-1 chat-wrapper">
      <Display if={!props.isViewingSelectedChat || (props.isViewingSelectedChat && props.windowWidth > 978)} >
        <div className="col-md-12 col-lg-4 pl-0 sidebar">
          <div className="text-center has-border-bottom" style={{ padding: '11px 30px' }}>
            <Button type="danger" style={{ width: '90%', height: '42px' }}>Send new chat</Button>
          </div>
          <div className="sidebar__chat-box">
            <Display if={ props.chats.length }>
                <List
                  chatLayout="horizontal"
                  dataSource={props.chats}
                  renderItem={chat => (
                    <List.Item
                      key={chat.id}
                      onClick={() => props.selectChat(chat)}
                      style={{ background: props.selectedChat.lastMessage == chat.lastMessage ? '#FAFAFA' : '', cursor: 'pointer' }}
                >
                      <List.Item.Meta
                        title={
                          <div className="d-flex align-items-center justify-content-sm-between">
                            <h5 className="m-0 mr-2">{chat.sender.fullname}</h5>
                            <div>
                              <small className="float-right">{chat.formattedDate}</small>
                            </div>
                          </div>
                        }
                        avatar={<Avatar src={chat.sender.profile_pic} />}
                      />
                        <p>{chat.lastMessage}</p>
                    </List.Item>
                  )}
                />
              </Display>
          </div>
        </div>
      </Display>
      <div className="col-md-12 col-lg-8 p-0">
        <Display if={props.chatThread.length}>
          <div className="message__top-bar d-flex align-items-center pl-6 pr-6">
            {(props.isViewingSelectedChat && props.windowWidth < 978) && <img className="mr-3" onClick={props.clearSelectedChat} src="/static/images/back.png" />}
            {/* <Avatar className="mr-2" size="large" src={(props.selectedChat.sender || {}).profile_pic} />
            <h5 className="m-0">{(props.selectedChat.sender || {}).fullname}</h5> */}
          </div>
          <div className="pl-6 pr-6 chat__content">
            {
              props.chatThread.map((chat, index, chats) => {
                let styles = props.determineChatStyle(chat, index, chats);
                return (
                  <div className="text-chat" key={index}>
                    <p style={{...styles, display: 'block'}} className={chat.origin}>
                      {chat.msg}
                      <span style={{ display: styles.display}} className="is-grey meta">
                        <small>{chat.time}</small>
                        <img className="pl-2" src='/static/images/double_tick.svg'></img>
                      </span>
                    </p>
                  </div>
                );
              })
            }
          </div>
          <div className="d-flex align-content-center extra">
            <Input.TextArea autosize={{ minRows: 3, maxRows: 3 }}placeholder="Type message"></Input.TextArea>
            <div className='threadblock-message--actions p-1 justify-content-between flex-xs-column flex-md-row d-flex align-items-center has-white-bg'>
              <img onClick={() => alert('sd')} className='actions' src='/static/images/add-image-to-msg.png' />
              <img className='actions' src='/static/images/add-attachment-to-msg.png'/>
              <img className='actions' src='/static/images/add-emoji-to-msg.png'/>
            </div>
          </div>
        </Display>
      </div>
    </div>
  );
};

Chat.propTypes = {

};

export default Chat;
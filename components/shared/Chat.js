import { List, Avatar, Button, Icon, Modal } from "antd";
import ChatMessageForm from "./ChatMessageForm";
import Display from "../shared/Display";
import EmptyState from "./EmptyState";
import PropTypes from "prop-types";
import React, { useState } from "react";
import JSEMOJI from "emoji-js";
import ReactHtmlParser from "react-html-parser";
import ContentEditable from "react-contenteditable";

import dynamic from "next/dynamic";
import Typing from "./Typing";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false
});

let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = "emojione";
// set the storage location for all emojis
jsemoji.img_sets.emojione.path =
  "https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/";
// some more settings...
jsemoji.supports_css = false;
jsemoji.allow_native = false;
jsemoji.replace_mode = "unified";

const Chat = props => {
  const selectedChat = props.chat.selectedChat;
  // let messageBeingTyped = props.chat.selectedChat.messageBeingTyped;
  const getReceiverInfo = (chat = null) => {
    if (chat) {
      return chat.sender.id != props.user.id ? chat.sender : chat.receiver;
    }

    let firstChat = selectedChat.all[0];

    if (!firstChat) return props.chat.recipient;

    return firstChat.sender.id != props.user.id
      ? firstChat.sender
      : firstChat.receiver;
  };

  const [isShowingEmojis, toggleShowingEmojis] = useState(false);

  const typeEmoji = (code, emojiObj) => {
    const emojiUrl = jsemoji.replace_colons(`:${emojiObj.name}:`);
    let messageBeingTyped = props.chat.selectedChat.messageBeingTyped.trim("");
    props.setMessageBeingTyped(messageBeingTyped + emojiUrl);
  };

  const handleKeyPressDown = () => {
    // setTimeout(() => {
    //   console.log('whispering...', window.currentUserChannel)
    //   window.currentUserChannel.whisper("typing", {
    //     user: props.user.id,
    //     typing: true
    //   });
    // }, 300);
  };

  const proceed = () => {
    const recipient = props.chat.recipient;
    const message_uuid =
      (recipient.msuuid || {}).message_uuid || (recipient.mruuid || {}).message_uuid;
    if (message_uuid) {
      props.selectChat({ message_uuid });
    } else {
			props.startNewChat()
		}
		props.setChartFormVisibility(false);
  };

  const sendChat = e => {
    let newMsg = e.target.value
      .replace(/(\<div\>|\<\/div\>|\<br\>)/g, " ")
      .replace(/\s\s+/g, " ")
      // .replace(/\&nbsp;+/g, "")
      .trim("");

    if (!e.key || e.key != "Enter") {
      return props.setMessageBeingTyped(newMsg);
    }
    if (
      e.key === "Enter" &&
      (newMsg !== "" && e.target.value.replace(/\&nbsp\;/g, "").trim("") !== "")
    ) {
      return props.sendChat(getReceiverInfo());
    }
  };

  return (
    <div className="row mt-1 chat-wrapper">
      <Display
        if={
          !props.isViewingSelectedChat ||
          (props.isViewingSelectedChat && props.windowWidth > 978)
        }
      >
        <div className="col-md-12 col-lg-4 pl-0 sidebar">
          <div
            className="text-center has-border-bottom"
            style={{ padding: "11px 30px" }}
          >
            <Button
              onClick={() => props.setChartFormVisibility()}
              type="danger"
              style={{ width: "90%", height: "42px" }}
            >
              Send new chat
            </Button>
          </div>
          <div className="sidebar__chat-box">
            <Display if={props.chats.all.length}>
              <List
                chatLayout="horizontal"
                dataSource={props.chats.all}
                renderItem={chat => (
                  <List.Item
                    key={chat.id}
                    onClick={() => props.selectChat(chat)}
                    style={{
                      background:
                        (
                          props.chat.selectedChat.all[
                            props.chat.selectedChat.all.length - 1
                          ] || {}
                        ).message == chat.message
                          ? "#FAFAFA"
                          : "",
                      cursor: "pointer"
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <div className="d-flex align-items-center justify-content-sm-between">
                          <h5 className="m-0 mr-2">
                            {getReceiverInfo(chat).name}
                          </h5>
                          <div>
                            <small className="float-right">
                              {chat.formatted_date}
                            </small>
                          </div>
                        </div>
                      }
                      avatar={
                        <Avatar src={getReceiverInfo(chat).profile_pic} />
                      }
                    />
                    <p>{ReactHtmlParser(chat.message)}</p>
                  </List.Item>
                )}
              />
            </Display>
          </div>
        </div>
      </Display>
      <div className="col-md-12 col-lg-8 p-0">
        <Display if={props.chat.selectedChat.all.length || props.chat.selectedChat.isViewing}>
          <div className="message__top-bar d-flex align-items-center pl-6 pr-6">
            {props.chat.selectedChat.isViewing && props.windowWidth < 978 && (
              <img
                className="mr-3"
                onClick={props.clearSelectedChat}
                src="/static/images/back.png"
              />
            )}
            <Avatar
              className="mr-2"
              size="large"
              src={getReceiverInfo().profile_pic}
            />
            <h5 className="m-0">{getReceiverInfo().name}</h5>
          </div>
          <div className="pl-6 pr-6 chat__content">
            {props.chat.selectedChat.all.map((chat, index, chats) => {
              let styles = props.determineChatStyle(chat, index, chats);
              return (
                <div className="text-chat" key={index}>
                  <p
                    style={{ ...styles, display: "block" }}
                    className={`${chat.origin} ${
                      chat.sendingStatus && chat.sendingStatus == "failed"
                        ? "alert-danger"
                        : ""
                    }`}
                  >
                    <span style={{ display: "block", minWidth: "35px" }}>
                      {ReactHtmlParser(chat.msg)}
                    </span>
                    <span
                      style={{ display: styles.display }}
                      className="is-grey meta"
                    >
                      <small
                        className={`${
                          chat.sendingStatus && chat.sendingStatus == "failed"
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        {chat.time}
                      </small>
                      <img
                        className="pl-2"
                        src="/static/images/double_tick.svg"
                      ></img>
                    </span>
                  </p>
                </div>
              );
            })}
            {props.chat.selectedChat.typingWhisperDirection && (
              <div className="text-chat">
                <div
                  className={`${props.chat.selectedChat.typingWhisperDirection} mt-4 mb-4`}
                >
                  <Typing />
                </div>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                bottom: "18%",
                zIndex: 1000,
                right: "2%"
              }}
            >
              {isShowingEmojis && <EmojiPicker onEmojiClick={typeEmoji} />}
            </div>
          </div>
          <div className="d-flex align-content-center extra">
            {/* <Input.TextArea
              onPressEnter={() => props.sendChat(getReceiverInfo())}
              onChange={e => props.setMessageBeingTyped(e.target.value)}
              value={props.chat.selectedChat.messageBeingTyped}
              autosize={false}
              placeholder="Type message"
						></Input.TextArea> */}
            <ContentEditable
              className="chatboxfield"
              onKeyDown={handleKeyPressDown}
              html={props.chat.selectedChat.messageBeingTyped} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={sendChat} // handle innerHTML change
              tagName="article" // Use a custom HTML tag (uses a div by default)
            />
            <div className="threadblock-message--actions p-1 justify-content-between flex-xs-column flex-md-row d-flex align-items-center has-white-bg">
              <img
                onClick={() => alert("sd")}
                className="actions"
                src="/static/images/add-image-to-msg.png"
              />
              <img
                className="actions"
                src="/static/images/add-attachment-to-msg.png"
              />
              <img
                onClick={() => toggleShowingEmojis(!isShowingEmojis)}
                className="actions"
                src="/static/images/add-emoji-to-msg.png"
              />
            </div>
          </div>
        </Display>
        <Display
          if={
            !props.chat.selectedChat.isViewing &&
            !props.chat.selectedChat.isLoadingChat
          }
        >
          <EmptyState emptyText="You have not selected any chat" />
        </Display>
        <Display
          if={
            props.chat.selectedChat.isLoadingChat &&
            !props.chat.selectedChat.isViewing
          }
        >
          <section className="empty-state has-full-height">
            <div className="d-flex flex-column justify-content-center align-items-center has-full-height">
              <Icon
                width="3rem"
                height="3rem"
                style={{ fontSize: "36px" }}
                type="loading"
              />
            </div>
          </section>
        </Display>
      </div>
      <Modal
        footer={null}
        wrapClassName="chat-wrapper"
        width="464px"
        height="514px"
        centered
        onCancel={() => props.setChartFormVisibility(false)}
        visible={props.chat.isShowingChatForm}
        title={
          <div className="d-flex align-items-center justify-content-between">
            <h5>
              <img className="mr-2" src="/static/images/arrow-left.png" />
              <span className="font-weight-normal">Select recipient</span>
            </h5>
            <Button
              size="small"
              className={`mr-4 ${
                !props.chat.recipient.id ? "disabled-ash" : ""
              }`}
              disabled={!!!props.chat.recipient.id}
              onClick={proceed}
              type="danger"
              style={{ width: "100px", height: "36px" }}
            >
              Proceed
            </Button>
          </div>
        }
      >
        <ChatMessageForm {...props} handleSubmit={() => {}} />
      </Modal>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;

import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { List, Avatar, Button, Tabs, Radio, Input } from "antd";
import EmptyState from "./EmptyState";
import Display from "./Display";

const BroadcastMessages = props => {
  return (
    <div className="row mt-1 message-wrapper">
      <Display
        if={
          !props.isViewingSelectedMessage ||
          (props.isViewingSelectedMessage && props.windowWidth > 978)
        }
      >
        <div className="col-md-12 col-lg-4 pl-0 sidebar">
          <div className="sidebar__message-box">
            <Display if={props.broadcasts.all.length}>
              <List
                messageLayout="horizontal"
                dataSource={props.broadcasts.all}
                renderItem={message => (
                  <List.Item
                    key={message.message_uuid}
                    onClick={() => props.selectMessage(message)}
                    style={{
                      background:
                        props.selectedMessage.title == message.title
                          ? "#FAFAFA"
                          : "",
                      cursor: "pointer"
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <div className="d-flex align-items-center justify-content-sm-between">
                          <h5 className="m-0 mr-2">
                            {message.sender.name}
                          </h5>
                          <div>
                            <small className="float-right">
                              {message.formatted_date}
                            </small>
                          </div>
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
      </Display>
      <div className="col-md-12 col-lg-8 p-0">
        <Display if={props.selectedMessage.title}>
          <div className="message__top-bar d-flex align-items-center pl-6 pr-6">
            {props.isViewingSelectedMessage && props.windowWidth < 978 && (
              <img
                className="mr-3"
                onClick={props.clearSelectedMessage}
                src="/static/images/back.png"
              />
            )}
            <Avatar
              className="mr-2"
              size="large"
              src={(props.selectedMessage.sender || {}).profile_pic}
            />
            <h5 className="m-0">
              {(props.selectedMessage.sender || {}).name}
            </h5>
          </div>
          <div className="pl-6 pr-6 pt-5 message__content">
            {ReactHtmlParser(props.selectedMessage.message)}
          </div>
        </Display>
        <Display if={!props.selectedMessage.title}>
          <EmptyState emptyText="You have not selected any message" />
        </Display>
      </div>
    </div>
  );
};

BroadcastMessages.propTypes = {};

export default BroadcastMessages;

import InfiniteScroll from 'react-infinite-scroller'
import PropTypes from 'prop-types'
import Display from './Display'
import React from 'react'
import {
  Form,
  Input,
  List,
  Avatar,
} from 'antd'

import dynamic from 'next/dynamic'
const { Search } = Input
const Skeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false
})

class ChatMessageForm extends React.Component {
  state = {};

  fetchUsers = q => {
    this.props.fetchChatUsers({
      q
    })
  };

  handleInfiniteOnLoad = () => {
    // return ''
    // let { data } = this.state
    // this.setState({
    //   loading: true
    // })
    // if (data.length > 14) {
    //   message.warning('Infinite List loaded all')
    //   this.setState({
    //     hasMore: false,
    //     loading: false
    //   })
    //   return
    // }
    // this.fetchData(res => {
    //   data = data.concat(res.results)
    //   this.setState({
    //     data,
    //     loading: false
    //   })
    // })
  };

  render () {
    return (
      <div className="pl-4 pr-4">
        <div className="row">
          <Search
            className="light-border"
            placeholder="Enter name of user to search"
            onSearch={value => this.fetchUsers(value)}
            onChange={e => this.fetchUsers(e.target.value)}
            style={{ width: '100%', height: '40px' }}
          />
        </div>

        <div>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.props.chat.isLoadingChatUsers && false}
            useWindow={false}
          >
            <List
              dataSource={this.props.chatUsers}
              renderItem={item => (
                <List.Item
                  className="has-pointer-cursor"
                  onClick={() => this.props.setRecipient(item)}
                  key={item.id}
                >
                  <List.Item.Meta
                    avatar={
                      !this.props.chat.isLoadingChatUsers ? (
                        <Avatar src={item.profilePic} />
                      ) : (
                        <Skeleton circle={true} height={30} width={30} />
                      )
                    }
                    title={
                      !this.props.chat.isLoadingChatUsers ? (
                        <span>{item.name}</span>
                      ) : (
                        <Skeleton />
                      )
                    }
                  />
                  <Display
                    if={
                      item && item.id === (this.props.chat.recipient || {}).id
                    }
                  >
                    <img alt="selected" className="h15" src="/images/selected.png" />
                  </Display>
                </List.Item>
              )}
            ></List>
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

const WrappedChatMessageForm = Form.create({ name: 'chat_message_form' })(
  ChatMessageForm
)

ChatMessageForm.propTypes = {
  chatUsers: PropTypes.array.isRequired,
  chat: PropTypes.shape({
    isLoadingChatUsers: PropTypes.bool,
    recipient: PropTypes.object
  }),
  setRecipient: PropTypes.func.isRequired,
  fetchChatUsers: PropTypes.func.isRequired
}

export default WrappedChatMessageForm

import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import withAdminLayout from '../../layouts/withAdminLayout'
import { List } from 'antd'
import EmptyState from '../../../components/shared/EmptyState'
import Display from '../../../components/shared/Display'
import withRedirect from '../../layouts/withRedirect'

/* eslint-disable */
class Notifications extends Component {
  state = {
    selected: '',
    notifications: [
      {
        title: 'qqwqw qw ewew wwew ew e wewew'
      },
      {
        title: 'qqwqw wew ewe wew w e wewew'
      },
      {
        title: 'qqwqw ee eewe w wew ew e wewew'
      },
      {
        title: 'qqwqw wew ew e w ewe eewew'
      },
      {
        title: 'qqwqw wew ew  wewe e wewew'
      }
    ],
    notifications: []
  };

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  selectNotification = item => {
    this.setState({
      selected: item.title
    })
  };

  render () {
    return (
      <section className="notifications has-full-height">
        <div className="container has-full-height">
          <div className="row has-full-height">
            <div className="col-md-12 pr-6 pl-6">
              <div className="notifications-wrapper d-flex justify-content-center align-contents-center mt-5">
                <Display if={!this.state.notifications.length}>
                  <div>
                    <EmptyState emptyText="No notifications yet" />
                  </div>
                </Display>
                <Display if={this.state.notifications.length}>
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.notifications}
                    renderItem={item =>
                      <List.Item
                        onClick={() => this.selectNotification(item)}
                        style={{
                          background:
                            this.state.selected === item.title ? '#FAFAFA' : '',
                          cursor: 'pointer'
                        }}
                        extra={<span>2 hrs</span>}
                      >
                        <List.Item.Meta
                          title={
                            <a href="https://ant.design">
                              {item.title}
                            </a>
                          }
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>}
                  />
                </Display>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// Notifications.propTypes = {
//   user: PropTypes.shape({
//     role: PropTypes.string
//   }).isRequired
// }

Notifications.headerName = 'Notifications'

export default withRedirect(withAdminLayout(Notifications))

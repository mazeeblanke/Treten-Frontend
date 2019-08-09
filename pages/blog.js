import withMasterLayout from '../pages/layouts/withMasterLayout';
import Introduction from '../components/about-us/Introduction';
import Goals from '../components/about-us/Goals';
import Footer from '../components/shared/Footer';
import * as actions from '../store/actions';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import PostList from '../components/blog/PostList';
import { Pagination } from 'antd';


class Blog extends Component {

  static async getInitialProps (ctx) {
    // const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    return {}
  }

  state = {
    blogPosts: [
      {
        date: '01 Aug 2019',
        title: 'What’s the blog post title?',
        content_summary: `Must go faster. Just my luck, no ice. My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings.`,
        image: '/static/images/blogposts/post1.png'
      },
      {
        date: '01 Aug 2019',
        title: 'What’s the blog post title?',
        content_summary: `Must go faster. Just my luck, no ice. My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings.`,
        image: '/static/images/blogposts/post2.png'
      },
      {
        date: '01 Aug 2019',
        title: 'What’s the blog post title?',
        content_summary: `Must go faster. Just my luck, no ice. My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings.`,
        image: '/static/images/blogposts/post3.png'
      },
      {
        date: '01 Aug 2019',
        title: 'What’s the blog post title?',
        content_summary: `Must go faster. Just my luck, no ice. My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings.`,
        image: '/static/images/blogposts/post4.png'
      },
      {
        date: '01 Aug 2019',
        title: 'What’s the blog post title?',
        content_summary: `Must go faster. Just my luck, no ice. My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings.`,
        image: '/static/images/blogposts/post5.png'
      },
      {
        date: '01 Aug 2019',
        title: 'What’s the blog post title?',
        content_summary: `Must go faster. Just my luck, no ice. My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings.`,
        image: '/static/images/blogposts/post6.png'
      },
    ],
  }

  render () {
    return (
      <>
        <h3 className="blog__main-text text-center pt-9 mb-6">
          Blog
        </h3>
        <PostList posts={this.state.blogPosts} />
        <div className="is-flex justify-content-center pb-5 blog-pagination">
          <Pagination defaultCurrent={6} total={96} />
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: getUser(state),
  }
}

export default connect(mapStateToProps, actions)(withMasterLayout(Blog));
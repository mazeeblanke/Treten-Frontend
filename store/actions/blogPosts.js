import { BLOGS_PAGE_SIZE } from '../../lib/constants'

export const fetchBlogPosts = ({ page = 1, pageSize = BLOGS_PAGE_SIZE } = {}) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_LOADING_BLOG_POSTS',
    payload: true
  })
  return api
    .get(`/api/blog-posts?page=${page}&pageSize=${pageSize}`)
    .then(res => {
      dispatch({
        type: 'SET_BLOG_POSTS',
        payload: {
          data: res.data,
          page,
          pageSize
        }
      })
      dispatch({
        type: 'SET_LOADING_BLOG_POSTS',
        payload: false
      })
      return res
    })
    .catch((err) => {
      dispatch({
        type: 'SET_LOADING_BLOG_POSTS',
        payload: false
      })
      return err
    })
}

export const fetchBlogPost = (blogPostSlug) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_LOADING_ACTIVE_BLOG_POST',
    payload: true
  })
  return api
    .get(`/api/blog-post/${blogPostSlug}`)
    .then(res => {
      dispatch({
        type: 'SET_ACTIVE_BLOG_POST',
        payload: {
          data: res.data,
        }
      })
      dispatch({
        type: 'SET_LOADING_ACTIVE_BLOG_POST',
        payload: false
      })
    })
    .catch(() => {
      dispatch({
        type: 'SET_LOADING_ACTIVE_BLOG_POST',
        payload: false
      })
    })
}

export const fetchLatestBlogPosts = () => (dispatch, getState, api) => {
  dispatch({
    type: 'SET_LOADING_LATEST_BLOG_POSTS',
    payload: true
  })
  return api.get('/api/latest-blog-posts').then(res => {
    dispatch({
      type: 'SET_LOADING_LATEST_BLOG_POSTS',
      payload: false
    })
    dispatch({
      type: 'SET_LATEST_BLOG_POSTS',
      payload: res.data.data
    })
  })
}

export const getBlogPosts = ({ blogPosts }) => blogPosts.byIds.map(id => blogPosts.all[id])

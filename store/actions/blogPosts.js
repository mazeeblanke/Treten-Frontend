import { BLOGS_PAGE_SIZE } from '../../lib/constants'

export const setLoadingBlogPosts = (payload) => ({
  type: 'SET_LOADING_BLOG_POSTS',
  payload
})

export const setLoadingActiveBlogPost = (payload) => ({
  type: 'SET_LOADING_ACTIVE_BLOG_POST',
  payload
})

export const setLoadingLatestBlogPosts = (payload) => ({
  type: 'SET_LOADING_LATEST_BLOG_POSTS',
  payload
})

export const setActiveBlogPost = (res) => {
  return ({
    type: 'SET_ACTIVE_BLOG_POST',
    payload: {
      data: res.data
    }
  })
}

export const setLatestBlogPost = (res) => ({
  type: 'SET_LATEST_BLOG_POSTS',
  payload: res.data.data
})

export const setBlogPost = (res) => ({
  type: 'SET_BLOG_POSTS',
  payload: {
    data: res.data,
    page: res.data.currentPage,
    pageSize: res.data.perPage
  }
})

export const fetchBlogPosts = ({
  page = 1,
  pageSize = BLOGS_PAGE_SIZE,
  isPublished = 0
} = {}) => (
  dispatch,
  getState,
  api
) => {
  dispatch(setLoadingBlogPosts(true))
  return api
    .get('/api/blog-posts', {
      params: {
        page,
        pageSize,
        isPublished
      }
    })
    .then(res => {
      dispatch(setBlogPost(res))
      dispatch(setLoadingBlogPosts(false))
      return res
    })
    .catch(() => {
      dispatch(setLoadingBlogPosts(false))
    })
}

export const fetchBlogPost = (blogPostSlug) => (
  dispatch,
  getState,
  api
) => {
  dispatch(setLoadingActiveBlogPost(true))
  return api
    .get(`/api/blog-post/${blogPostSlug}`)
    .then(res => {
      dispatch(setActiveBlogPost(res))
      dispatch(setLoadingActiveBlogPost(false))
      return res
    })
    .catch(() => {
      dispatch(setLoadingActiveBlogPost(false))
    })
}

export const fetchLatestBlogPosts = () => (dispatch, getState, api) => {
  dispatch(setLoadingLatestBlogPosts(true))
  return api.get('/api/latest-blog-posts').then(res => {
    dispatch(setLatestBlogPost(res))
    dispatch(setLoadingLatestBlogPosts(false))
    return res
  }).catch(() => {
    dispatch(setLoadingLatestBlogPosts(false))
  })
}

export const getBlogPosts = ({ blogPosts }) => blogPosts.byIds.map(id => blogPosts.all[id])

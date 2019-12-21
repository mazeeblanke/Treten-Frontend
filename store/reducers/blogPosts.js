import { transformArray } from '../../lib/helpers'
import { BLOGS_PAGE_SIZE } from '../../lib/constants'

const paginationOptions = (options = {}) => ({
  total: options.total || 0,
  page: options.page,
  pageSize: BLOGS_PAGE_SIZE
})

const INITIAL_STATE = {
  byIds: [],
  all: {},
  isLoadingBlogPosts: false,
  paginationOptions: paginationOptions(),
  activeBlogPost: {
    isLoading: false
  },
  latestBlogPosts: {
    isLoading: false,
    byIds: [],
    all: {}
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_LOADING_BLOG_POSTS': {
      return {
        ...state,
        isLoadingBlogPosts: action.payload
      }
    }
    case 'SET_LOADING_LATEST_BLOG_POSTS': {
      return {
        ...state,
        latestBlogPosts: {
          ...state.latestBlogPosts,
          isLoading: action.payload
        }
      }
    }
    case 'SET_LOADING_ACTIVE_BLOG_POST': {
      return {
        ...state,
        activeBlogPost: {
          ...state.activeBlogPost,
          isLoading: action.payload
        }
      }
    }
    case 'SET_BLOG_POSTS': {
      return {
        ...state,
        ...transformArray(action.payload.data.data),
        pagination: paginationOptions({
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          total: action.payload.data.total
        })
      }
    }
    case 'SET_ACTIVE_BLOG_POST': {
      return {
        ...state,
        activeBlogPost: {
          ...state.activeBlogPost,
          ...action.payload.data
        }
      }
    }
    case 'SET_LATEST_BLOG_POSTS': {
      return {
        ...state,
        latestBlogPosts: {
          ...state.latestBlogPosts,
          ...transformArray(action.payload)
        }
      }
    }
    default:
      return state
  }
}

export const getLatestBlogPosts = state => {
  const { latestBlogPosts } = state.blogPosts
  return latestBlogPosts.byIds.map(id => latestBlogPosts.all[id])
}

export const getBlogPost = state => {
  const { activeBlogPost } = state.blogPosts
  return activeBlogPost
}

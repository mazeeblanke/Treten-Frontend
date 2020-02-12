import {
  fetchBlogPost,
  fetchBlogPosts,
  fetchLatestBlogPosts,
  setLoadingBlogPosts,
  setBlogPost,
  setLoadingActiveBlogPost,
  setActiveBlogPost,
  setLoadingLatestBlogPosts,
  setLatestBlogPost
} from './blogPosts'
import { axiosMock, mockStore } from '../../lib/mocks/configure'
import { blogPosts, blogPost } from '../../lib/mocks/blogPost'

let store
const blogPostSlug = 'blogPostSlug'

axiosMock.onGet('/api/blog-posts').reply(200, {
  message: 'Successfully fetched blog posts',
  currentPage: 1,
  perPage: blogPosts.length,
  total: blogPosts.length,
  data: blogPosts
})

axiosMock.onGet('/api/latest-blog-posts').reply(200, {
  message: 'Successfully fetched latest blog posts',
  currentPage: 1,
  perPage: blogPosts.length,
  total: blogPosts.length,
  data: blogPosts
})

axiosMock.onGet(`/api/blog-post/${blogPostSlug}`).reply(200, { ...blogPost })

beforeEach(() => {
  store = mockStore({})
})

it('Creates action to fetch blog post', () => {
  return store.dispatch(fetchBlogPost(blogPostSlug)).then((res) => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setLoadingActiveBlogPost(true))
    expect(actions[1]).toEqual(setActiveBlogPost(res))
    expect(actions[2]).toEqual(setLoadingActiveBlogPost(false))
  })
})

it('Creates action to fetch blog posts', () => {
  return store.dispatch(fetchBlogPosts()).then((res) => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setLoadingBlogPosts(true))
    expect(actions[1]).toEqual(setBlogPost(res))
    expect(actions[2]).toEqual(setLoadingBlogPosts(false))
  })
})

it('Creates action to fetch latest blog posts', () => {
  return store.dispatch(fetchLatestBlogPosts()).then((res) => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setLoadingLatestBlogPosts(true))
    expect(actions[1]).toEqual(setLatestBlogPost(res))
    expect(actions[2]).toEqual(setLoadingLatestBlogPosts(false))
  })
})

import { BLOGS_PAGE_SIZE } from "../../lib/constants";

export const fetchBlogPosts =  ({
  page = 1,
  pageSize = BLOGS_PAGE_SIZE,
  q = ""
} = {}) => {
  return (dispatch, getState, api) => {
    dispatch({
      type: "SET_LOADING_BLOG_POSTS",
      payload: true
    })
    return api.get(`/api/blog-posts?page=${page}&pageSize=${pageSize}`).then((res) => {
      dispatch({
        type: "SET_BLOG_POSTS",
        payload: {
          data: res.data,
          page,
          pageSize
        }
      });
      dispatch({
        type: "SET_LOADING_BLOG_POSTS",
        payload: false
      });
    }) 
    .catch(err => {
      dispatch({
        type: "SET_LOADING_BLOG_POSTS",
        payload: false
      });
    });
  }
}

export const fetchLatestBlogPosts = () => {
  return (dispatch, getState, api) => {
    dispatch({
      type: "SET_LOADING_LATEST_BLOG_POSTS",
      payload: true
    })
    return api.get('/api/latest-blog-posts').then((res) => {
      dispatch({
        type: "SET_LOADING_LATEST_BLOG_POSTS",
        payload: false
      })
      dispatch({
        type: "SET_LATEST_BLOG_POSTS",
        payload: res.data.blogPosts
      })
    })
  }
}

export const getBlogPosts = ({ blogPosts }) => {
  return blogPosts.byIds.map(id => {
    return blogPosts.all[id];
  });
};
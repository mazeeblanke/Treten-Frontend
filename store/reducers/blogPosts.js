import { transformArray } from "../../lib/helpers";
import { BLOGS_PAGE_SIZE } from "../../lib/constants";

const paginationOptions = (options = {}) => {
  return {
    total: options.total || 0,
    page: options.page,
    pageSize: BLOGS_PAGE_SIZE,
    itemRender: (current, type, originalElement) => {
      if (type === "prev") {
        return (
          <div className="ant-pagination-prev">
            <a className="ant-pagination-item-link">
              <img src="/static/images/arrow-right-grey.png" />
            </a>
          </div>
        );
      }
      if (type === "next") {
        return (
          <div className="ant-pagination-next">
            <a className="ant-pagination-item-link">
              <img src="/static/images/arrow-left-grey.png" />
            </a>
          </div>
        );
      }
      return originalElement;
    }
  };
};

const INITIAL_STATE = {
  byIds: [],
  all: {},
  isLoadingBlogPosts: false,
  paginationOptions: paginationOptions(),
  activeBlogPost: {
    isLoading: false,
    details: {}
  },
  latestBlogPosts: {
    isLoading: false,
    byIds: [],
    all: {}
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING_BLOG_POSTS": {
      return {
        ...state,
        isLoadingBlogPosts: action.payload
      }
    }
    case "SET_LOADING_LATEST_BLOG_POSTS": {
      return {
        ...state,
        latestBlogPosts: {
          ...state.latestBlogPosts,
          isLoading: action.payload
        }
      }
    }
    case "SET_LOADING_ACTIVE_BLOG_POST": {
      return {
        ...state,
        activeBlog: {
          ...state.activeBlog,
          isLoading: action.payload
        }
      }
    }
    case "SET_BLOG_POSTS": {
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
    case "SET_LATEST_BLOG_POSTS": {
      return {
        ...state,
        latestBlogPosts: {
          ...state.latestBlogPosts,
          ...transformArray(action.payload)
        }
      }
    }
    case "SET_ACTIVE_BLOG_POST": {

    }
  }
  return state;
}


export const getLatestBlogPosts = (state) => {
  const latestBlogPosts = state.blogPosts.latestBlogPosts;
  return latestBlogPosts.byIds.map(id => latestBlogPosts.all[id]);
}
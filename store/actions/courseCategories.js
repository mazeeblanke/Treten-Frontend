export const fetchCourseCategories = ({
  q = null,
  page = 1,
  sort = null,
  pageSize = 8,
  minimal = null
} = {}) => (
  dispatch,
  getState,
  api
) => {
  return api
    .get('/api/course-categories', {
      params: {
        q,
        page,
        sort,
        minimal,
        pageSize
      }
    }).then((res) => res.data)
}

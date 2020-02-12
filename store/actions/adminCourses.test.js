import { saveCourse, setCourse } from './adminCourses'
import { axiosMock, mockStore } from '../../lib/mocks/configure'
import { course } from '../../lib/mocks/course'
import { convertToFormData } from '../../lib/helpers'

let store

beforeEach(() => {
  store = mockStore({})
})

it('Generates actions for saving a course', () => {
  axiosMock.onPost(`/api/courses/${course.id}`).reply(200, { course })
  axiosMock.onPost('/api/course').reply(200, { course })

  return store.dispatch(saveCourse(convertToFormData(course))).then((res) => {
    const actions = store.getActions()
    expect(actions[0]).toEqual(setCourse(res))
  })
})

// it('Handles actions for creating a course', () => {

// 	axiosMock.onPost(`/api/courses/${course.id}`).reply(200, { course })

// 	return store.dispatch(createCourse(convertToFormData(course))).then(() => {
// 	})

// })

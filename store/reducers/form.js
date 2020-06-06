// import { snakeCase } from "snake-case"

const intializeForm = () => ({
  data: {
  },
  endpoints: {},
  model: {},
  errors: {},
  loading: true,
  matrix: {
  }
})

export const INITIAL_STATE = intializeForm()

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FIELD': {
      const data = { ...state.data }
      const errors = { ...state.errors }
      const {
        formField,
        formValue
      } = action.payload
      data[formField] = formValue
      if (formValue) delete errors[formField]
      return {
        ...state,
        data,
        errors
      }
    }

    case 'RESET': {
      return {
        ...state,
        ...intializeForm(),
        loading: false
      }
    }

    case 'SET_ENDPOINTS': {
      return {
        ...state,
        endpoints: action.payload.endpoints
      }
    }

    case 'SET_MODEL': {
      return {
        ...state,
        model: action.payload.model
      }
    }

    case 'SET_INITIALIZING_FORM': {
      return {
        ...state,
        loading: action.payload
      }
    }

    case 'SET_SUBMITTING_FORM': {
      return {
        ...state,
        submitting: action.payload
      }
    }

    case 'INIT_FORM': {
      const data = getFormData(action.payload.data)
      const model = getFormModel(action.payload.data)
      const matrix = getFormMatrix(action.payload.data)

      return {
        ...state,
        data,
        endpoints: action.payload.data.endpoints,
        model,
        matrix
      }
    }

    case 'UPDATE_FORM': {
      const model = getFormModel(action.payload.data)

      return {
        ...state,
        model,
        errors: action.payload.data.errors || {}
      }
    }

    case 'SET_FORM_ERRORS': {
      return {
        ...state,
        errors: action.payload.data.errors || {}
      }
    }

    case 'CLEAR_FORM': {
      const model = {}
      const data = getFormData(state, true)
      return {
        ...state,
        model,
        data,
        errors: {}
      }
    }

    default:
      return state
  }
}

export const getFormData = (data, clear = false) => {
  if (data.matrix instanceof Object) {
    return Object.keys(data.matrix).reduce((arg, curr) => {
      arg[curr] = data.model[curr] && !clear
        ? data.model[curr]
        : ''
      return arg
    }, {})
  }
  return () => { throw new Error('Matrix not provided!') }
}

const getFormMatrix = (data) => data.matrix

const getFormModel = (data) => data.model instanceof Array ? {} : data.model

export const getImagePreviewKey = (key) => `${key}ImageBase64`

export const getField = state => field => state.form.data[field]

export const getForm = state => state.form.data

export const getMatrix = state => state.form.matrix

export const getModel = state => state.form.model

export const getMatrixIdentity = state => field => state.form.matrix[field]

export const getEndpoints = state => state.form.endpoints

export const getEndpoint = state => field => state.form.endpoints[field]

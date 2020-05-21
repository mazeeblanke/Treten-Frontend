import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

export const MockAdapter = require('axios-mock-adapter')

const api = axios.create()

export const axiosMock = new MockAdapter(api)

// export const axiosSpy = jest.mock('axios')

const middlewares = [thunk.withExtraArgument(api)]

export const mockStore = configureStore(middlewares)

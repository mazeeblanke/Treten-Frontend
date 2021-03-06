import React from 'react'
import { initStore } from '../store'
import * as actions from '../store/actions'
import PropTypes from 'prop-types'
// import redirectTo from './helpers'
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initialState, req) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initStore(initialState, isServer, req)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default App => {
  class AppWithRedux extends React.Component {
    static async getInitialProps (appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore(
        { user: {}, auth: null },
        appContext.ctx.req
      )

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      // first load the authenticated user before anything else
      await reduxStore.dispatch(actions.FETCH_USER())

      await reduxStore.dispatch(actions.fetchCoursesByGroup())

      await reduxStore.dispatch(actions.fetchPopularCourses())

      // await reduxStore.dispatch(actions.fetchTransactions())

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      // // console.log('cookie', appContext.ctx.req.headers);

      // redirection example
      // if (appContext.ctx.req.url == '/') {
      //   appContext.ctx.res.writeHead(302, {Location: '/course'})
      //   appContext.ctx.res.end()
      // }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    render () {
      return (
        <App
          {...this.props}
          reduxStore={getOrCreateStore(this.props.initialReduxState)}
        />
      )
    }
  }
  AppWithRedux.propTypes = {
    initialReduxState: PropTypes.object.isRequired
  }
  return AppWithRedux
}

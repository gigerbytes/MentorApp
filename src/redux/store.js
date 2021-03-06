import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import { offline } from '@redux-offline/redux-offline'
import { rootReducer } from './reducer'
import { setLanguage } from '../i18n'
let rehydrated = false
import { initImageCaching } from '../cache'

export const getHydrationState = () => rehydrated

// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ enables seeing the redux store in the
// debugger. atob !== 'undefined' checks if remote debugging is enabled on the
// device
export default createStore(
  rootReducer,
  typeof window !== 'undefined' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' &&
  typeof atob !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
    : applyMiddleware(thunk),
  offline({
    ...offlineConfig,
    persistCallback: () => {
      setLanguage()
      rehydrated = true
      initImageCaching()
    }
  })
)

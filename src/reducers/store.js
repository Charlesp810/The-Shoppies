import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import movieReducer from './movieReducer'

export default function configureStore() {
  return createStore(
    movieReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
}
// @flow
import { createStore, applyMiddleware, compose } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { responsiveStoreEnhancer } from "redux-responsive"
import faviconMiddleware from "redux-favicon"
// import { createLogger } from "redux-logger";
import {
  alertbar,
  browser,
  chats,
  chimes,
  meta,
  modals,
  notifications,
  partners,
  storage as newStorage,
  tracking,
  users,
  ringTone,
} from "../middleware"
import reducers from "../reducers"
import SetTransform from "./transforms"

export default function configureStore(initialState = {}) {
  // const enhancers = [applyMiddleware(thunk, promise, logger, auth, storage)]
  // return createStore(reducers, initialState, compose(...enhancers))

  // FIXME: Change the logger level based on DEBUG mode
  // const logger = createLogger({
  //   level: "info"
  // });

  const faviconConfig = {
    animation: "popFade",
    position: "up",
  }

  const persistConfig = {
    key: "root",
    storage,
    transforms: [SetTransform],
  }

  const loadedFaviconMiddleware = faviconMiddleware(faviconConfig)

  const persistedReducer = persistReducer(persistConfig, reducers)
  return compose(
    responsiveStoreEnhancer,
    applyMiddleware(
      thunk,
      alertbar,
      browser,
      chats,
      chimes,
      loadedFaviconMiddleware,
      meta,
      modals,
      notifications,
      partners,
      newStorage,
      tracking,
      users,
      ringTone
    )
  )(createStore)(
    persistedReducer,
    initialState,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

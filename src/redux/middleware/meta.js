import ACTION_TYPES from "../actions/actionTypes"
import { getBrowserIsInactive } from "../selectors/browser"
import { incrementFavicon, resetFavicon } from "../actions/meta"

const wait = 2000
const titles = {
  initial: "Convose, find conversations",
  alert: "You have unread messages on Convose!",
}
let titleInterval
let currentTitle = titles.initial

const setTitle = (title) => {
  document.title = title
}

const titleIntervalHandler = () => {
  currentTitle = currentTitle === titles.initial ? titles.alert : titles.initial
  setTitle(currentTitle)
}

export default ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.RECEIVED_MESSAGE: {
        const browserIsInactive = getBrowserIsInactive(getState())
        const { message } = action.payload
        const { calling } = getState()
        if (
          !message?.mine &&
          browserIsInactive &&
          !message?.action &&
          !calling.isInCallingScreen
        ) {
          clearInterval(titleInterval)
          setTitle(titles.alert)
          titleInterval = setInterval(titleIntervalHandler, wait)
          dispatch(incrementFavicon())
        }
        break
      }

      case ACTION_TYPES.OPEN_CHAT: {
        const browserIsInactive = getBrowserIsInactive(getState())
        const { isInitiator } = action.payload
        if (!isInitiator && browserIsInactive) {
          clearInterval(titleInterval)
          setTitle(titles.alert)
          titleInterval = setInterval(titleIntervalHandler, wait)
          dispatch(incrementFavicon())
        }
        break
      }

      case ACTION_TYPES.BROWSER_IS_ACTIVE:
        clearInterval(titleInterval)
        setTitle(titles.initial)
        dispatch(resetFavicon())
        break

      default:
    }

    return result
  }

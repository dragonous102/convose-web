import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  isOnline: true,
  isActive: !document.hidden,
  isIOS: false,
  isAndroid: false,
  isSafari: false,
  animate: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.BROWSER_UA_SNIFFING: {
      const { isIOS, isAndroid, isSafari } = action.payload
      return {
        ...state,
        isIOS,
        isAndroid,
        isSafari,
      }
    }

    case ACTION_TYPES.BROWSER_IS_ONLINE:
      return {
        ...state,
        isOnline: true,
      }

    case ACTION_TYPES.BROWSER_IS_OFFLINE:
      return {
        ...state,
        isOnline: false,
        animate: true,
      }
    case ACTION_TYPES.BROWSER_IS_OFFLINE_ANIMATE_OFF:
      return {
        ...state,
        isOnline: false,
        animate: false,
      }

    case ACTION_TYPES.BROWSER_IS_ACTIVE:
      return {
        ...state,
        isActive: true,
      }

    case ACTION_TYPES.BROWSER_IS_INACTIVE:
      return {
        ...state,
        isActive: false,
      }

    default:
      return state
  }
}

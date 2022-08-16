import UAParser from "ua-parser-js"

import ACTION_TYPES from "../actions/actionTypes"
import {
  browserIsActive,
  browserIsInactive,
  browserUASniffing,
} from "../actions/browser"
import { showAppModal } from "../actions/modals"

export default ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.INIT_BROWSER: {
        const {
          viewport: {
            lessThan: { large: isMobileOrTabletView },
          },
        } = getState()
        const handleVisibilityChange = () => {
          document.hidden
            ? dispatch(browserIsInactive())
            : dispatch(browserIsActive())
        }
        document.addEventListener("visibilitychange", handleVisibilityChange)

        const parser = new UAParser()

        window.pushlogs && console.warn(parser.getOS().name)

        const isIOS = parser.getOS().name === "iOS"
        const isAndroid = parser.getOS().name === "Android"
        const isSafari = parser.getBrowser().name === "Safari"

        const payload = {
          isIOS,
          isAndroid,
          isSafari,
        }

        dispatch(browserUASniffing(payload))

        if (isMobileOrTabletView && (isIOS || isAndroid)) {
          dispatch(showAppModal())
        }

        break
      }
      default:
    }

    return result
  }

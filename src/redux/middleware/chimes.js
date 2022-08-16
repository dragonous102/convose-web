import ACTION_TYPES from "../actions/actionTypes"
import { getBrowserIsInactive } from "../selectors/browser"
import { CHIME_INCOMING_MESSAGE } from "../../global/constants"

const chimeIncomingMessage = document.createElement("audio")
chimeIncomingMessage.src = CHIME_INCOMING_MESSAGE
chimeIncomingMessage.preload = "auto"

export default ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.RECEIVED_MESSAGE: {
        const browserIsInactive = getBrowserIsInactive(getState())
        const { calling } = getState()
        const { message } = action.payload

        if (
          !message?.mine &&
          browserIsInactive &&
          !message?.action &&
          !calling.isInCallingScreen
        ) {
          chimeIncomingMessage.play()
        }
        break
      }

      case ACTION_TYPES.OPEN_CHAT: {
        const browserIsInactive = getBrowserIsInactive(getState())
        const { isInitiator } = action.payload
        window.pushlogs &&
          console.log(ACTION_TYPES.OPEN_CHAT, isInitiator, browserIsInactive)
        if (!isInitiator && browserIsInactive) {
          // chimeIncomingMessage.play()
        }
        break
      }

      default:
    }

    return result
  }

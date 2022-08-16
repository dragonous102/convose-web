import ACTION_TYPES from "../actions/actionTypes"
import { CALL_INCOMING_MESSAGE } from "../../global/constants"

const callIncomingMessage = document.createElement("audio")
callIncomingMessage.src = CALL_INCOMING_MESSAGE
callIncomingMessage.preload = "auto"
callIncomingMessage.loop = true

export default ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action)
    const { calling } = getState()
    switch (action.type) {
      case ACTION_TYPES.STARTED_CALL: {
        callIncomingMessage.play()
        callIncomingMessage.currentTime = 0
        break
      }
      case ACTION_TYPES.RECEIVED_CALL: {
        if (!calling.isInCallingScreen) {
          callIncomingMessage.play()
          callIncomingMessage.currentTime = 0
        }
        break
      }
      case ACTION_TYPES.CALL_ENDED:
      case ACTION_TYPES.CALL_CANCELLED:
      case ACTION_TYPES.CALL_ACCEPTED: {
        setTimeout(() => {
          callIncomingMessage.pause()
        }, 200)
        callIncomingMessage.currentTime = 0
        break
      }
      default:
        break
    }
    return result
  }

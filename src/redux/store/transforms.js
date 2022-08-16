import { createTransform } from "redux-persist"
import { initialCallState } from "../reducers/calling"

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    return { ...inboundState }
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert timestamp to instance of date.
    let value = {}
    if (key != "calling") {
      Object.keys(outboundState).forEach((uid) => {
        let obj = outboundState[uid]
        value[uid] = {
          ...obj,
          messages: [
            ...obj.messages.map((message) => ({
              ...message,
              timestamp: new Date(message.timestamp),
            })),
          ],
        }
      })
    } else if (key == "calling") {
      value = initialCallState
    } else if (key == "interests") {
      value = { ...outboundState, loading: false }
    }

    return {
      ...value,
    }
  },
  // define which reducers this transform gets called for.
  { whitelist: ["chats", "calling", "interests"] }
)

export default SetTransform

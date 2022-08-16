import ACTION_TYPES from "../actions/actionTypes"
import ActionCable from "../../api/ActionCable"
import { WS_ACTIONCABLE_CHANNEL_SUGGESTIONS } from "../../api/endpoints"
import { receivedUsersList } from "../actions/users"

let subscription
let userCable = new ActionCable()
export default ({ dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action)
    switch (action.type) {
      case ACTION_TYPES.SUGGESTIONS_SUBSCRIBE: {
        // window.pushlogs && console.log("WS: subscribe to Suggestions");
        const {
          payload: { token },
        } = action
        subscription = userCable.getConsumer({ token }).subscriptions.create(
          {
            channel: WS_ACTIONCABLE_CHANNEL_SUGGESTIONS,
          },
          {
            connected: () => {
              window.pushlogs &&
                console.log(
                  `WS: connected to ${WS_ACTIONCABLE_CHANNEL_SUGGESTIONS}`
                )
            },
            disconnected: () => {
              window.pushlogs &&
                console.log(
                  `WS: disconnected from ${WS_ACTIONCABLE_CHANNEL_SUGGESTIONS}`
                )
            },
            received: (payload) => {
              // do stuff with data
              // window.pushlogs &&
              //   console.log(
              //     `WS: received on channel ${WS_ACTIONCABLE_CHANNEL_SUGGESTIONS} `,
              //     payload
              //   )
              // console.warn("SUGGESTIONS AC: ", payload);
              dispatch(receivedUsersList({ suggestions: payload }))
            },
          }
        )
        break
      }
      case ACTION_TYPES.SUGGESTIONS_UNSUBSCRIBE: {
        userCable && subscription && userCable.closeConnection()
        break
      }

      case ACTION_TYPES.SUGGESTIONS_UPDATE: {
        window.pushlogs && console.log("WS: update suggestions")
        subscription.perform("update")
        break
      }

      default:
    }

    return result
  }

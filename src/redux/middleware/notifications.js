import ACTION_TYPES from "../actions/actionTypes"
import { hideNotification } from "../actions/notifications"

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.NOTIFICATIONS_SHOW: {
        const { messageUuid, dismissAfter } = action.payload
        setTimeout(
          () => dispatch(hideNotification({ messageUuid })),
          dismissAfter
        )
        break
      }
      default:
    }

    return result
  }

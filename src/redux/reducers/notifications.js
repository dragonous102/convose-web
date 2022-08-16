import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  notifications: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.NOTIFICATIONS_SHOW:
      window.pushlogs && console.log(action.payload)
      return {
        ...state,
        notifications: [...state.notifications, ...[action.payload]],
      }
    case ACTION_TYPES.NOTIFICATIONS_HIDE: {
      const { messageUuid } = action.payload
      const notifications = state.notifications.filter(
        (notification) => notification.messageUuid !== messageUuid
      )
      return {
        notifications,
      }
    }

    default:
      return state
  }
}

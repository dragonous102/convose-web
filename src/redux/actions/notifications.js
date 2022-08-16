import ACTION_TYPES from "./actionTypes"

export const showNotification = (payload) => ({
  type: ACTION_TYPES.NOTIFICATIONS_SHOW,
  payload: {
    dismissAfter: 4000,
    ...payload,
  },
})

export const hideNotification = (payload) => ({
  type: ACTION_TYPES.NOTIFICATIONS_HIDE,
  payload,
})

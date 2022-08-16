import ACTION_TYPES from "../actions/actionTypes"

const defaultState = {
  isActive: false,
  message: "",
  action: "",
  dismissAfter: false,
  hideOnRouteChange: true,
  type: " ",
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_TYPES.ALERT_SHOW: {
      const {
        message,
        type = "success",
        dismissAfter,
        action,
        hideOnRouteChange = true,
      } = payload.notification

      return {
        ...state,
        isActive: true,
        message: message || "",
        type: type || "success",
        dismissAfter: dismissAfter || false,
        action: action || " ",
        hideOnRouteChange,
      }
    }

    case ACTION_TYPES.ALERT_HIDE:
      return { ...state, isActive: false, dismissAfter: false }

    default:
      break
  }

  return state
}

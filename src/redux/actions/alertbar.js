import ACTION_TYPES from "./actionTypes"

export const showAlertBar = (notification) => ({
  type: ACTION_TYPES.ALERT_SHOW,
  payload: { notification },
})

export const hideAlertBar = () => ({
  type: ACTION_TYPES.ALERT_HIDE,
})

export const showSuccessBar = (message) => {
  const notification = {
    dismissAfter: 4000,
    type: "success",
    message,
  }
  return {
    type: ACTION_TYPES.ALERT_SHOW,
    payload: { notification },
  }
}

export const showInfoBar = (message) => {
  const notification = {
    dismissAfter: 4000,
    type: "info",
    message,
  }
  return {
    type: ACTION_TYPES.ALERT_SHOW,
    payload: { notification },
  }
}

export const showErrorBar = (message) => {
  const notification = {
    dismissAfter: 4000,
    type: "error",
    message,
  }
  return {
    type: ACTION_TYPES.ALERT_SHOW,
    payload: { notification },
  }
}

import get from "lodash-es/get"
import has from "lodash-es/has"
import { showAlertBar } from "../actions/alertbar"
import {
  START,
  SUCCESS,
  FAIL,
  DEFAULT_ERROR,
  DEFAULT_SUCCESS,
  DEFAULT_START,
} from "../constants"

function getErrorMessage(action) {
  let errorCode = null
  let message = DEFAULT_ERROR

  errorCode = get(action, "err.data.code")

  if (
    errorCode &&
    errorCode === "validation_error" &&
    has(action, "err.data.field_errors")
  ) {
    Object.values(action.err.data.field_errors).forEach((value) => {
      if (value && value.length) {
        errorCode = value[0].code
      }
    })
  }

  if (
    has(action, "err.data.non_field_errors") &&
    action.err.data.non_field_errors.length
  ) {
    errorCode = action.err.data.non_field_errors[0].code
  }

  if (!errorCode && has(action, "err.data")) {
    if (typeof action.err.data === "object") {
      try {
        const error = JSON.stringify(action.err.data)
        message = `Backend error: ${error}`
      } catch (err) {
        message = `Backend error: ${action.err.data}`
      }
    } else {
      message = `Backend error: ${action.err.data}`
    }
  }

  if (typeof message === "function") {
    message = message(action)
  }

  return message
}

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action)
    const { type, alert } = action

    switch (true) {
      case Boolean(type.includes(SUCCESS) && alert && alert.success):
        dispatch(
          showAlertBar({
            type: get(alert, "success.type", "success"),
            message: get(alert, "success.message", DEFAULT_SUCCESS),
            dismissAfter: get(alert, "success.dismissAfter", 3000),
            hideOnRouteChange: get(alert, "success.hideOnRouteChange"),
          })
        )
        break

      case Boolean(type.includes(START) && alert && alert.start):
        dispatch(
          showAlertBar({
            type: get(alert, "start.type", "success"),
            message: get(alert, "start.message", DEFAULT_START),
            dismissAfter: get(alert, "start.dismissAfter", 3000),
            hideOnRouteChange: get(alert, "start.hideOnRouteChange"),
          })
        )
        break

      case Boolean(type.includes(FAIL) && alert && alert.fail):
        dispatch(
          showAlertBar({
            type: get(alert, "fail.type", "error"),
            message: get(alert, "fail.message", getErrorMessage(action)),
            dismissAfter: get(alert, "fail.dismissAfter", false),
            hideOnRouteChange: get(alert, "fail.hideOnRouteChange"),
          })
        )
        break

      case Boolean(alert && Boolean(alert.type || alert.message)):
        dispatch(
          showAlertBar({
            type: alert.type || "success",
            message: alert.message || DEFAULT_SUCCESS,
            dismissAfter: alert.dismissAfter || 3000,
            hideOnRouteChange: alert.hideOnRouteChange,
          })
        )
        break

      case Boolean(type.includes(FAIL)): {
        if (alert === null) {
          break
        }

        if (alert && alert.fail === null) {
          break
        }

        dispatch(
          showAlertBar({ type: "error", message: getErrorMessage(action) })
        )
        break
      }

      default:
        break
    }

    return result
  }

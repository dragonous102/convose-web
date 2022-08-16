import ACTION_TYPES from "../actions/actionTypes"
import { focusInterestInput } from "../actions/interests"

export default ({ dispatch }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.MODAL_KNOWLEDGELEVEL_HIDE: {
        dispatch(focusInterestInput(true))
        break
      }

      default:
    }

    return result
  }

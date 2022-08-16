import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  consentAccepted: true,
  disableOptionalStorage: true,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_STORAGE:
      return initialState

    case ACTION_TYPES.STORAGE_INIT:
      return {
        ...state,
        ...action.payload,
      }

    case ACTION_TYPES.STORAGE_CONSENT_ACCEPTED:
      return {
        ...state,
        consentAccepted: true,
      }

    case ACTION_TYPES.STORAGE_ENABLE_OPTIONAL_STORAGE:
      return {
        ...state,
        disableOptionalStorage: false,
      }

    case ACTION_TYPES.STORAGE_DISABLE_OPTIONAL_STORAGE:
      return {
        ...state,
        disableOptionalStorage: true,
      }

    default:
      return state
  }
}

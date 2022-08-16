import ACTION_TYPES from "../actions/actionTypes"
import { CONSENT_ACCEPTED, DISABLE_OPTIONAL_STORAGE } from "../constants"

export default () => (next) => (action) => {
  const result = next(action)

  switch (action.type) {
    case ACTION_TYPES.STORAGE_CONSENT_ACCEPTED:
      localStorage.setItem(CONSENT_ACCEPTED, true)
      if (!localStorage.getItem(DISABLE_OPTIONAL_STORAGE)) {
        window.dataLayer.push({ event: "allowedOptionalStorage" })
      }
      break

    case ACTION_TYPES.STORAGE_INIT: {
      const { consentAccepted, disableOptionalStorage } = action.payload
      if (consentAccepted && !disableOptionalStorage) {
        window.dataLayer.push({ event: "allowedOptionalStorage" })
      }
      break
    }

    case ACTION_TYPES.STORAGE_ENABLE_OPTIONAL_STORAGE:
      localStorage.setItem(DISABLE_OPTIONAL_STORAGE, false)
      break

    case ACTION_TYPES.STORAGE_DISABLE_OPTIONAL_STORAGE:
      localStorage.setItem(DISABLE_OPTIONAL_STORAGE, true)
      break

    default:
  }

  return result
}

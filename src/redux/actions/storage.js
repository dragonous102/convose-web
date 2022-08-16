import ACTION_TYPES from "./actionTypes"
import { CONSENT_ACCEPTED, DISABLE_OPTIONAL_STORAGE } from "../constants"

export const initStorage = () => (dispatch) => {
  const consentAccepted =
    localStorage.getItem(CONSENT_ACCEPTED) === "true" || false
  const disableOptionalStorage =
    localStorage.getItem(DISABLE_OPTIONAL_STORAGE) === "true" || false

  const payload = {
    consentAccepted,
    disableOptionalStorage,
  }

  dispatch({
    type: ACTION_TYPES.STORAGE_INIT,
    payload,
  })
}

export const acceptStorageConsent = (payload) => ({
  type: ACTION_TYPES.STORAGE_CONSENT_ACCEPTED,
  payload,
})

export const enableOptionalStorage = (payload) => ({
  type: ACTION_TYPES.STORAGE_ENABLE_OPTIONAL_STORAGE,
  payload,
})

export const disableOptionalStorage = (payload) => ({
  type: ACTION_TYPES.STORAGE_DISABLE_OPTIONAL_STORAGE,
  payload,
})

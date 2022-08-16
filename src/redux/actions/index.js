import { initFayeClient, initResendFailedMessage } from "./chats"
import { AUTH_TOKEN_KEY, UUID_KEY } from "../constants"
import { createGuestUser, getUserProfile } from "./profile"
import { initBrowser } from "./browser"
import { initStorage } from "./storage"

export const initializeApp = () => (dispatch) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  const uuid = localStorage.getItem(UUID_KEY)

  dispatch(initStorage())
  dispatch(initBrowser())
  dispatch(initFayeClient())
  dispatch(initResendFailedMessage())
  if (!uuid) {
    dispatch(createGuestUser())
  } else {
    const uuid = localStorage.getItem(UUID_KEY)
    dispatch(getUserProfile(uuid, token))
  }
}

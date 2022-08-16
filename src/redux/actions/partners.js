import ACTION_TYPES from "./actionTypes"
import { fetchMarkInboxAsRead } from "../../api"
import { showErrorBar } from "./alertbar"
import { triggerOpenChat } from "./chats"

export const initPartners = (payload) => ({
  type: ACTION_TYPES.PARTNERS_FETCH,
  payload,
})

export const fetchPartners = (payload) => ({
  type: ACTION_TYPES.PARTNERS_FETCH,
  payload,
})

export const initPartnersNewMessage = (payload) => ({
  type: ACTION_TYPES.PARTNERS_NEW_MESSAGE_SUBSCRIBE,
  payload,
})

export const updatePartnerMessage = (payload) => ({
  type: ACTION_TYPES.PARTNER_MESSAGES_UPDATE,
  payload,
})

export const updatePartnerLatestMessage = (payload) => ({
  type: ACTION_TYPES.PARTNER_MESSAGES_UPDATE_LATEST,
  payload,
})

export const updatePartners = (payload) => ({
  type: ACTION_TYPES.PARTNERS_UPDATE,
  payload,
})

export const closePartnersNewMessage = (payload) => ({
  type: ACTION_TYPES.PARTNERS_NEW_MESSAGE_UNSUBSCRIBE,
  payload,
})

export const markInboxAsRead = () => (dispatch) => {
  fetchMarkInboxAsRead()
    .then((payload) => {
      dispatch({
        type: ACTION_TYPES.MARK_INBOX_AS_READ_SUCCESS,
        payload,
      })
      dispatch({
        type: ACTION_TYPES.PARTNER_MESSAGES_CLOSE_INBOX_SLICE,
      })
      window.pushlogs &&
        console.log("successfully marked inbox as read, ", payload)
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      console.error(error)
    })
}

export const openChatFromInbox = (payload) => (dispatch) => {
  dispatch(
    triggerOpenChat({
      ...payload,
      fromInbox: true,
    })
  )
}

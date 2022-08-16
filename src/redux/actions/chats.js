import ACTION_TYPES from "./actionTypes"
import { showErrorBar } from "./alertbar"
import { showNotification } from "./notifications"
import { closeInbox } from "./modals"
import { addUserToUserslist, removeUserFromUserslist } from "./users"
import {
  fetchChannelMessages,
  markChatChannelAsRead,
  fetchDeleteMessage,
} from "../../api"
import { callHelper, getUserIdFromChatId } from "../../utils/faye/helpers"
import { mapPartnerToInboxItem } from "../../utils/dataMappers"
import {
  FAYE_MSG_TYPE_AUDIO,
  FAYE_MSG_TYPE_IMAGE,
  FAYE_MSG_TYPE_TEXT,
  UUID_KEY,
  FAYE_MSG_TYPE_CALL,
  CALL_SIGNAL_MUTE,
} from "../constants"
import { updateGroupInfo } from "../actions/calling"

export const initFayeClient = (payload) => ({
  type: ACTION_TYPES.FAYE_INIT,
  payload,
})

export const initResendFailedMessage = (registered) => ({
  type: ACTION_TYPES.INIT_SEND_UNSEND_MESSAGE,
  payload: registered,
})

export const initChannel = (payload) => ({
  type: ACTION_TYPES.FAYE_SUBSCRIBE,
  payload,
})

export const closeChannel = (payload) => ({
  type: ACTION_TYPES.FAYE_UNSUBSCRIBE,
  payload,
})

export const markChannelAsRead = (payload) => (dispatch) => {
  window.pushlogs && console.log("markChatChannelAsRead", payload)
  markChatChannelAsRead(payload)
    .then((result) => {
      dispatch({
        type: ACTION_TYPES.MARK_CHANNEL_AS_READ_SUCCESS,
        payload,
      })
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      console.error(error)
    })
}

export const openChat = (payload) => (dispatch, getState) => {
  const {
    users: { list },
  } = getState()
  const { fromInbox = false, uuid } = payload
  if (fromInbox) {
    const userIsInList = list.includes(uuid)
    if (!userIsInList) return
  }
  const myUuid = localStorage.getItem(UUID_KEY)
  dispatch(markChannelAsRead(payload))
  dispatch(
    initChannel({
      ...payload,
      myUuid,
    })
  )
  return dispatch({
    type: ACTION_TYPES.OPEN_CHAT,
    payload,
  })
}

export const closeChat = (payload) => (dispatch, getState) => {
  const { chatId } = payload
  const {
    profile: { uuid: myUuid },
    users: { profiles },
    viewport,
  } = getState()
  const onetoone = chatId.indexOf("xx-xx") !== -1
  const uuid = onetoone ? getUserIdFromChatId({ chatId, myUuid }) : chatId
  const userProfile = profiles[uuid]
  const isDesktopView = viewport.greaterThan.medium

  dispatch(markChannelAsRead(payload))
  dispatch(closeChannel(payload))

  if (isDesktopView && userProfile.status !== "online") {
    dispatch(removeUserFromUserslist({ uuid }))
  }

  return dispatch({
    type: ACTION_TYPES.CLOSE_CHAT,
    payload,
  })
}

export const leaveChat = (payload) => (dispatch, getState) => {
  const { chatId } = payload

  dispatch(closeChannel(payload))
  dispatch(removeUserFromUserslist({ chatId }))

  return dispatch({
    type: ACTION_TYPES.CLOSE_CHAT,
    payload,
  })
}

export const fetchParticipants = (payload) => ({
  type: ACTION_TYPES.FETCH_PARTICIPANTS,
  payload,
})

export const removeAllOpenChats = (payload) => ({
  type: ACTION_TYPES.REMOVE_ALL_OPEN_CHATS,
  payload,
})

export const showChatProfile = (payload) => ({
  type: ACTION_TYPES.SHOW_CHAT_PROFILE,
  payload,
})

export const closeChatProfile = (payload) => ({
  type: ACTION_TYPES.CLOSE_CHAT_PROFILE,
  payload,
})

export const sendMessage = (payload) => (dispatch) => {
  /**working */
  const { type } = payload.message

  window.pushlogs && console.log("sendMessage", payload)
  return dispatch({
    type: ACTION_TYPES.SEND_MESSAGE,
    payload: {
      ...payload,
      type:
        type === FAYE_MSG_TYPE_CALL ? FAYE_MSG_TYPE_CALL : FAYE_MSG_TYPE_TEXT,
    },
  })
}
export const removeMessage = (payload) => (dispatch, getState) => {
  /**working */
  const { chatId, uuid } = payload
  const { chats } = getState()
  let messages = chats[chatId].messages
  messages.pop()
  console.log("messages ++=======", messages)
  return dispatch({
    type: ACTION_TYPES.REMOVE_MESSAGE,
    payload: {
      chatId,
      messages,
    },
  })
}

export const sendImage = (payload) => (dispatch) => {
  window.pushlogs &&
    console.log("sendImage =======$$$$$$$$$$$$$$$$$$$$$", payload)
  return dispatch({
    type: ACTION_TYPES.SEND_IMAGE,
    payload: {
      ...payload,
      type: FAYE_MSG_TYPE_IMAGE,
    },
  })
}

export const sendAudio = (payload) => (dispatch) => {
  window.pushlogs && console.log("sendAudio", payload)
  return dispatch({
    type: ACTION_TYPES.SEND_AUDIO,
    payload: {
      ...payload,
      type: FAYE_MSG_TYPE_AUDIO,
    },
  })
}

export const receiveMessage = (payload) => (dispatch) => {
  window.pushlogs && console.log("receiveMessage", payload)

  return dispatch({
    type: ACTION_TYPES.RECEIVED_MESSAGE,
    payload,
  })
}

export const startTyping = (payload) => (dispatch) => {
  window.pushlogs && console.log("startTyping", payload)
  return dispatch({
    type: ACTION_TYPES.START_TYPING,
    payload,
  })
}

export const stopTyping = (payload) => (dispatch) => {
  window.pushlogs && console.log("stopTyping", payload)
  return dispatch({
    type: ACTION_TYPES.STOP_TYPING,
    payload,
  })
}

export const fetchMessages = (payload) => ({
  type: ACTION_TYPES.FETCH_MESSAGES,
  payload,
})
export const fetchMessagesLoading = (payload) => ({
  type: ACTION_TYPES.FETCH_MESSAGES_LOADING,
  payload,
})
export const fetchMessagesSuccess = (payload) => ({
  type: ACTION_TYPES.FETCH_MESSAGES_SUCCESS,
  payload,
})
export const fetchMessagesFailed = (payload) => ({
  type: ACTION_TYPES.FETCH_MESSAGES_FAILED,
  payload,
})

export const participantsUpdate = (payload) => ({
  type: ACTION_TYPES.PARTICIPANTS_UPDATE,
  payload,
})
export const participantsLoading = (payload) => ({
  type: ACTION_TYPES.PARTICIPANTS_LOADING,
  payload,
})

export const retreiveChannelHistory = (payload) => (dispatch) => {
  // TODO: move to const
  const limit = 30
  const { chatId, from } = payload
  window.pushlogs &&
    console.log(`checking fetch message history for channel ${chatId}`)
  fetchChannelMessages({ chatId, from, limit })
    .then((messageList) => {
      window.pushlogs && console.log("checking result come in", messageList)
      const loadHistoryFrom = from ? from + limit : limit || 0
      const subscriptionPayload = {
        chatId,
        messageList,
        loadHistoryFrom,
      }
      dispatch(fetchMessagesSuccess(subscriptionPayload))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      dispatch(fetchMessagesFailed({ chatId }))
    })
}

export const triggerOpenChat = (payload) => (dispatch, getState) => {
  const {
    chatId,
    partnerUuid: uuid,
    fromInbox = false,
    isInitiator = true,
  } = payload
  const {
    users: { list },
    chats,
  } = getState()

  const userIsInList = list.includes(uuid)
  const chatIsAlreadyOpen = chats[chatId] && chats[chatId].isOpen
  window.pushlogs &&
    console.log(
      `userIsInList: ${userIsInList}, chatIsAlreadyOpen: ${chatIsAlreadyOpen}`
    )
  if (userIsInList) {
    !chatIsAlreadyOpen && dispatch(openChat({ chatId, isInitiator }))
  } else {
    dispatch(addUserToUserslist({ uuid }))
    dispatch(openChat({ fromInbox, uuid, chatId, isInitiator }))
  }
  fromInbox && dispatch(closeInbox())
}

export const messageUpdate = (payload) => (dispatch, getState) => {
  window.pushlogs && console.log("messageUpdate", payload)
  const { lessThan } = getState().viewport
  const { calling } = getState()
  const { message, myUuid, open: ischatOpened } = payload
  const isMobileOrTabletView = lessThan.large
  const {
    last_message: {
      content,
      sender_uuid: sender,
      uuid: messageUuid,
      message_type,
      action,
      uuid,
      created_at,
    },
    channel: chatId,
    type,
  } = message

  if (type === "deleted" && ischatOpened) {
    dispatch({
      type: ACTION_TYPES.DELETE_MESSAGE,
      payload: {
        chatId,
        messageUuid,
        newMessage: { content },
      },
    })
  }

  if (myUuid !== sender && message_type === FAYE_MSG_TYPE_CALL) {
    if (message.agora != "") {
      dispatch(updateGroupInfo(JSON.parse(message.agora)))
    }

    const data = { sender, action, data: content, uuid, created_at }
    if (action != CALL_SIGNAL_MUTE) {
      callHelper(
        dispatch,
        chatId,
        myUuid,
        calling.isInCallingScreen,
        calling.callStatus,
        data,
        type,
        "123"
      )
    }
  }

  if (isMobileOrTabletView) {
    window.pushlogs && console.log("trigger Message Notification")
    dispatch(
      showNotification({
        type: "inbox",
        ...mapPartnerToInboxItem({ partner: message, myUuid }),
      })
    )
  } else {
    if (ischatOpened) return
    const partnerUuid = getUserIdFromChatId({ chatId, myUuid })
    const isInitiator = false
    dispatch(
      triggerOpenChat({
        chatId,
        partnerUuid,
        isInitiator,
      })
    )
  }
}

export const deleteMessage = (payload) => (dispatch) => {
  const { chatId, messageUuid } = payload
  window.pushlogs &&
    console.log(`Delete Message for Channel: ${chatId}/${messageUuid}`)

  fetchDeleteMessage({ chatId, messageUuid })
    .then((newMessage) => {
      window.pushlogs && console.log("result", newMessage)
      const subscriptionPayload = {
        chatId,
        messageUuid,
        newMessage,
      }
      return dispatch({
        type: ACTION_TYPES.DELETE_MESSAGE,
        payload: subscriptionPayload,
      })
    })
    .catch((error) => {
      window.pushlogs && console.log("problem with test end point")
      dispatch(showErrorBar(error.toString()))
      console.error(error)
    })
}

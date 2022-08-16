import ACTION_TYPES from "./actionTypes"
import { showErrorBar } from "./alertbar"
import * as Api from "../../api"
import { showGroupChatModal, hideGroupChatModal } from "./modals"
import { triggerOpenChat, leaveChat } from "./chats"

export const selectParticipant = (payload) => ({
  type: ACTION_TYPES.SELECT_GROUP_CHAT_PARTICIPANT,
  payload,
})

export const deselectParticipant = (payload) => ({
  type: ACTION_TYPES.DESELECT_GROUP_CHAT_PARTICIPANT,
  payload,
})

export const retreiveParticipantHistory = (payload) => (dispatch, getState) => {
  // TODO: move to const
  const limit = 10
  const { chatId, from } = payload
  window.pushlogs &&
    console.log(`fetch participant history for channel ${chatId}`)
  Api.fetchChannelParticipants({ chatId, from, limit })
    .then((participantList) => {
      const loadHistoryFrom = from ? from + limit : limit || 0
      const subscriptionPayload = {
        chatId,
        participantList,
        loadHistoryFrom,
        from,
      }
      dispatch({
        type: ACTION_TYPES.PARTICIPANTS_UPDATE,
        payload: subscriptionPayload,
      })
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      console.error(error)
    })
}
export const queryMentionPerson = (payload) => (dispatch) => {
  // TODO: move to const
  return Api.fetchMentionPerson(payload)
    .then((res) => res)
    .catch((error) => error)
}

export const loadingGroupChat = () => ({
  type: ACTION_TYPES.LOADING_GROUP_CHAT,
})

export const receivedGroupChat = (payload) => ({
  type: ACTION_TYPES.RECEIVED_GROUP_CHAT,
  payload,
})

export const failedGroupChat = () => ({
  type: ACTION_TYPES.FAILED_GROUP_CHAT,
})
export const resetGroupChatSelect = () => ({
  type: ACTION_TYPES.CLOSE_GROUP_CHAT_SELECT,
})

export const groupChatSelect = (partnerUuid) => (dispatch) => {
  const limit = 10
  const chatId = ""
  const from = 0
  const prevrequest = false

  const payload = { prevrequest, from, limit, chatId }
  dispatch(loadingGroupChat())
  dispatch(showGroupChatModal())
  Api.fetchUserAddToGroup(payload)
    .then((result) => {
      const { pages_left, chat } = result
      dispatch({
        type: ACTION_TYPES.START_GROUP_CHAT_ADD,
        payload: {
          pages_left,
          users: [...chat],
          loading: false,
          type: "onetoone",
        },
      })
    })
    .catch((error) => {
      dispatch({
        type: ACTION_TYPES.FAILED_GROUP_CHAT,
      })
    })
}

export const groupChatLeave = (chatId) => (dispatch, getState) => {
  Api.fetchLeaveGroupChat({ chatId })
    .then(() => {
      dispatch(leaveChat({ chatId }))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      dispatch(hideGroupChatModal())
      window.pushlogs && console.error("could not remove USER from GROUP")
    })
}

export const groupChatAdd = (id) => (dispatch) => {
  const limit = 10
  const chatId = id
  const from = 0
  const prevrequest = false

  const payload = { prevrequest, from, limit, chatId }
  dispatch(loadingGroupChat())
  dispatch(showGroupChatModal())
  Api.fetchUserAddToGroup(payload)
    .then((result) => {
      const { pages_left, chat } = result
      dispatch({
        type: ACTION_TYPES.START_GROUP_CHAT_ADD,
        payload: {
          pages_left,
          users: [...chat],
          loading: false,
          type: "group",
          chatId,
        },
      })
    })
    .catch((error) => {
      dispatch({
        type: ACTION_TYPES.FAILED_GROUP_CHAT,
      })
    })
}

export const getUserAddToGroup = () => (dispatch, getState) => {
  // TODO: move to const
  const limit = 10
  const chatId = getState().group.chatId
  const from = getState().group.users.length * 2
  const prevrequest = getState().group.loading
  const loaded = getState().group.pages_left === 0
  const payload = { prevrequest, from, limit, chatId }
  if (loaded) return

  dispatch(loadingGroupChat())
  dispatch(showGroupChatModal())
  Api.fetchUserAddToGroup(payload)
    .then(({ pages_left, chat }) => {
      dispatch(receivedGroupChat({ pages_left, users: [...chat] }))
    })
    .catch((error) => {
      dispatch({
        type: ACTION_TYPES.FAILED_GROUP_CHAT,
        payload: { loading: false },
      })
    })
}

export const startGroupChat = () => (dispatch, getState) => {
  const { selected } = getState().group
  dispatch({
    type: ACTION_TYPES.JOIN_GROUP_CHAT,
  })

  Api.fetchGroupChat({ user_ids: selected })
    .then((response) => {
      const { channel } = response
      Api.fetchChannelMessages({ chatId: channel, limit: 30, from: 0 }).then(
        (response) => {
          window.pushlogs && console.log(response)
          dispatch(
            triggerOpenChat({
              chatId: channel,
              partnerUuid: channel,
              isInitiator: true,
            })
          )
          //dispatch(receivedGroupChat())
          dispatch(resetGroupChatSelect())
          dispatch(hideGroupChatModal())
        }
      )
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      dispatch(failedGroupChat())
      dispatch(hideGroupChatModal())
      window.pushlogs && console.error("could not update USER PROFILE")
    })
}

export const addToGroupChat = () => (dispatch, getState) => {
  const { chatId, selected } = getState().group

  dispatch({
    type: ACTION_TYPES.JOIN_GROUP_CHAT,
  })
  Api.fetchAddToGroupChat({ chatId, selected })
    .then((response) => {
      dispatch(resetGroupChatSelect())
      dispatch(hideGroupChatModal())
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      dispatch(failedGroupChat())
      dispatch(hideGroupChatModal())
      window.pushlogs && console.error("could not update USER PROFILE")
    })
}

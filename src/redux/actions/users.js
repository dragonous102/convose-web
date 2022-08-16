import cloneDeep from "lodash-es/cloneDeep"
import ACTION_TYPES from "./actionTypes"
import {
  mapUsersList,
  pushUserToUsersList,
  removeUserFromUsersList,
} from "../../utils/dataMappers"
import { AUTH_TOKEN_KEY, TOO_MANY_CHATS } from "../constants"
import { fetchUserProfile, fetchBlockUser } from "../../api"
import { showErrorBar, showInfoBar } from "./alertbar"

export const initSuggestions = (payload) => ({
  type: ACTION_TYPES.SUGGESTIONS_SUBSCRIBE,
  payload,
})

export const updateSuggestions = (payload) => ({
  type: ACTION_TYPES.SUGGESTIONS_UPDATE,
  payload,
})

export const updateUsersList = (payload) => ({
  type: ACTION_TYPES.UPDATE_USER_LIST,
  payload,
})

export const storeReceivedUsersList = (payload) => ({
  type: ACTION_TYPES.STORE_RECEIVED_USERS_LIST,
  payload,
})
export const receivedUserProfileFromServer = (payload) => ({
  type: ACTION_TYPES.RECEIVED_USERS_PROFILE,
  payload,
})

export const updateUsers = (payload) => ({
  type: ACTION_TYPES.UPDATE_USERS,
  payload,
})
export const fetchUserProfileFromServer = (chatId) => (dispatch) => {
  // we call this function when to get user profile
  // if it is requesting group profile, stop here
  if (chatId.indexOf("-") == -1) return

  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  fetchUserProfile(chatId, token)
    .then((user) => {
      console.log("user profile", user)
      dispatch(receivedUserProfileFromServer({ chatId, user }))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.error("could not update USER PROFILE")
    })
}
let suggestedTimes = 0
export const receivedUsersList =
  ({ suggestions }) =>
  (dispatch, getState) => {
    const {
      profile: { uuid: myUuid },
      chats,
      users: { list },
    } = getState()

    // eslint-disable-next-line arrow-body-style
    const openChats = Object.keys(chats).reduce((arr, chatId) => {
      return chats[chatId].isOpen ? [...arr, chatId] : [...arr]
    }, [])
    // const openChats = Object.keys(pickBy(chats, chat => chat.isOpen));
    const userProfiles = suggestions.reduce((obj, user) => {
      // no suggestion for group
      if (user.uuid.indexOf("-") === -1) {
        return obj
      } else {
        obj[user.uuid] = user
        return obj
      }
    }, {})
    dispatch(updateUsers(userProfiles))

    const suggestedList = suggestions.map(
      ({ uuid: chatPartnerUuid }) => chatPartnerUuid
    )
    // TODO: get rid of this
    const openChatsByUuid = openChats.map((chatId) => {
      const onetoone = chatId.indexOf("xx-xx") !== -1
      return onetoone
        ? chatId.split("xx-xx").filter((uuid) => uuid !== myUuid)[0]
        : chatId
    })
    const mappedList = mapUsersList({
      list,
      suggestedList,
      openChats: openChatsByUuid,
    })

    dispatch(storeReceivedUsersList({ list: cloneDeep(mappedList) }))
    dispatch(updateUsersList({ list: mappedList }))
    if (suggestedTimes > 8) {
      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      mappedList.forEach((uuid) => {
        if (uuid && uuid.indexOf("-") != -1) {
          fetchUserProfile(uuid, token)
            .then((user) =>
              dispatch(receivedUserProfileFromServer({ uuid, user }))
            )
            .catch((error) => dispatch(showErrorBar(error.toString())))
        }
      })
      suggestedTimes = 0
    } else {
      suggestedTimes++
    }
  }

export const addUserToUserslist =
  ({ uuid }) =>
  (dispatch, getState) => {
    const {
      users: { list },
      chats,
      profile: { uuid: myUuid },
    } = getState()

    pushUserToUsersList(
      {
        myUuid,
        list,
        chats,
        uuid,
      },
      (mappedList, index) => {
        if (index == -1) {
          dispatch(showInfoBar(TOO_MANY_CHATS))
        } else {
          dispatch(updateUsersList({ list: mappedList }))
        }
      }
    )
  }

export const removeUserFromUserslist =
  ({ uuid }) =>
  (dispatch, getState) => {
    const {
      users: { list, storedList },
    } = getState()
    const mappedList = removeUserFromUsersList({ list, storedList, uuid })

    dispatch(updateUsersList({ list: mappedList }))
  }

export const blockUser = (uuid) => (dispatch, getState) => {
  fetchBlockUser(uuid)
    .then((payload) => {
      const {
        users: { list, storedList },
      } = getState()
      const mappedList = removeUserFromUsersList({ list, storedList, uuid })

      window.pushlogs && console.log(payload)
      dispatch({ type: ACTION_TYPES.BLOCK_USER_SUCCESS })
      dispatch(updateUsersList({ list: mappedList }))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      dispatch({ type: ACTION_TYPES.BLOCK_USER_FAILURE })
      window.pushlogs && console.log(error, error.status)
    })
}

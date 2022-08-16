/* eslint-disable no-param-reassign */

import forOwn from "lodash-es/forOwn"
import ACTION_TYPES from "../actions/actionTypes"

import {
  mapMessagesToList,
  sortAndFilterMessages,
} from "../../utils/dataMappers"

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_CHAT:
      return initialState

    case ACTION_TYPES.FETCH_MESSAGES_LOADING: {
      window.pushlogs && console.log(action.payload)
      const { chatId } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          loading: true,
        },
      }
    }
    case ACTION_TYPES.FETCH_MESSAGES_SUCCESS: {
      window.pushlogs &&
        console.log(" FETCH_MESSAGES_SUCCESS ---->", action.payload)
      const {
        chatId,
        messageList: { chat, pages_left: pagesLeft },
        loadHistoryFrom,
      } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          historyLoaded: pagesLeft === 0,
          loadHistoryFrom,
          fetchFailed: false,
          loading: false,
          messages: sortAndFilterMessages([
            ...(state[chatId] && [...(state[chatId].messages || [])]),
            ...mapMessagesToList(chat),
          ]),
        },
      }
    }
    case ACTION_TYPES.FETCH_MESSAGES_FAILED: {
      const { chatId } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          fetchFailed: true,
          loading: false,
        },
      }
    }

    case ACTION_TYPES.RECEIVED_MESSAGE: {
      const { chatId, message } = action.payload
      if (!message) return state
      const messages = sortAndFilterMessages([
        ...(state[chatId] && [...(state[chatId].messages || [])]),
        message,
      ])
      return {
        ...state,

        [chatId]: {
          ...state[chatId],
          isOpen: true,
          isInitiator: false,
          showProfile: false,
          fetchFailed: false,
          loading: false,
          messages,
        },
      }
    }

    case ACTION_TYPES.REMOVE_MESSAGE: {
      const { chatId, messages } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messages,
        },
      }
    }

    case ACTION_TYPES.PARTNER_STARTED_TYPING: {
      const { chatId } = action.payload

      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          isTyping: { typing: true, date: new Date() },
        },
      }
    }

    case ACTION_TYPES.PARTNER_STOPPED_TYPING: {
      const { chatId } = action.payload

      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          isTyping: { typing: false },
        },
      }
    }

    case ACTION_TYPES.OPEN_CHAT: {
      const { chatId, isInitiator = true } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          isInitiator,
          isOpen: true,
          fetchFailed: false,
          showProfile: false,
          loading: false,
        },
      }
    }

    case ACTION_TYPES.ADD_SINGLE_OPEN_CHAT: {
      const { chatId } = action.payload

      window.pushlogs && console.log(state, Object.keys(state).length > 1)

      const chatIds = Object.keys(state)

      const chats = state

      if (chatIds.length > 1) {
        // eslint-disable-next-line array-callback-return
        chatIds.map((chatId) => {
          chats[chatId] = {
            ...chats[chatId],
            isOpen: false,
          }
        })
        return {
          ...chats,
          [chatId]: {
            ...state[chatId],
            isInitiator: true,
            isOpen: true,
            fetchFailed: false,
            showProfile: false,
            loading: false,
          },
        }
      }
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          isInitiator: true,
          isOpen: true,
          fetchFailed: false,
          showProfile: false,
          loading: false,
        },
      }
    }

    case ACTION_TYPES.CLOSE_CHAT: {
      const { chatId } = action.payload

      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          isTyping: { typing: false },
          isOpen: false,
          fetchFailed: false,
          isInitiator: false,
          loading: false,
        },
      }
    }

    case ACTION_TYPES.REMOVE_ALL_OPEN_CHATS: {
      const mappedState = forOwn(state, (chat) => {
        window.pushlogs && console.log(chat)
        chat.isOpen = false
        chat.isInitiator = false
      })
      window.pushlogs && console.log(state, mappedState)
      return {
        ...mappedState,
      }
    }

    case ACTION_TYPES.SHOW_CHAT_PROFILE: {
      const { chatId, chatScrolled } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          showProfile: true,
          chatScrolled: chatScrolled,
        },
      }
    }

    case ACTION_TYPES.CLOSE_CHAT_PROFILE: {
      const { chatId } = action.payload
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          showProfile: false,
        },
      }
    }

    case ACTION_TYPES.FAYE_SUBSCRIBE: {
      const { chatId } = action.payload

      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          historyLoaded: false,
          fetchFailed: false,
          loadHistoryFrom: 0,
          isActive: true,
          isTyping: { typing: false },
        },
      }
    }

    case ACTION_TYPES.DELETE_MESSAGE: {
      const { chatId, messageUuid, newMessage } = action.payload

      const messages = state[chatId]["messages"].map((message) => {
        if (message.uuid !== messageUuid) {
          return message
        } else {
          message.text = newMessage.content
          message.deleted = true

          console.log("Chat_message_reducer_delete_message", message)
          return message
        }
      })
      window.pushlogs && console.log("filterMessages", messages)

      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          isOpen: true,
          isInitiator: false,
          showProfile: false,
          messages,
        },
      }
    }

    default:
      return state
  }
}

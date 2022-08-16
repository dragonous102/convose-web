/* eslint-disable no-case-declarations */
import { uniqBy } from "lodash"
import ACTION_TYPES from "../actions/actionTypes"
import { PARTNERS_FETCH_LIMIT } from "../constants"

const initialState = {
  isLoading: false,
  isLoadingUnread: false,
  isOpen: false,
  pages_left: 0,
  nextPage: false,
  messages: [],
  profiles: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_PARTNERS:
      return initialState

    case ACTION_TYPES.PARTNERS_FETCH:
      const { refresh = null } = action.payload
      if (refresh) return state
      return {
        ...state,
        isLoading: true,
      }
    case ACTION_TYPES.PARTNERS_UPDATE:
      return {
        ...state,
        profiles: { ...state.profiles, ...action.payload },
      }
    case ACTION_TYPES.PARTNER_MESSAGES_UPDATE:
      const { messages, pages_left, nextPage } = action.payload
      return {
        ...state,
        messages: uniqBy([...messages, ...state.messages], "chatId").sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ),
        isLoading: false,
        pages_left,
        nextPage,
      }
    case ACTION_TYPES.PARTNER_MESSAGES_UPDATE_LATEST:
      const newMessages = [...state.messages]
      const oldMessageIndex = newMessages.findIndex(
        (msg) => msg.chatId === action.payload.chatId
      )
      oldMessageIndex !== -1 && newMessages.splice(oldMessageIndex, 1)
      newMessages.push(action.payload)
      return {
        ...state,
        messages: newMessages,
      }
    case ACTION_TYPES.PARTNER_MESSAGES_CLOSE_INBOX_SLICE:
      return {
        ...state,
        messages: state.messages.slice(-PARTNERS_FETCH_LIMIT),
      }
    case ACTION_TYPES.MARK_INBOX_AS_READ_SUCCESS:
      return {
        ...state,
        messages: state.messages.map((message) => {
          return {
            ...message,
            indicator: { ...message.indicator, opened: true },
          }
        }),
      }
    case ACTION_TYPES.MARK_CHANNEL_AS_READ_SUCCESS:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.chatId === action.payload.chatId
            ? { ...message, indicator: { count: 0, opened: true } }
            : message
        ),
      }
    default:
      return state
  }
}

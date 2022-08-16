import { createSelector } from "reselect"

const getMessagesByChatId = (state, props) => {
  const chat = state.chats[props.chatId] || {}
  return chat.messages || []
}

export const makeGetMessagesByChatId = () =>
  createSelector(getMessagesByChatId, (messages) => messages)

const getIsChatOpen = (state, props) => {
  const chat = state.chats[props.chatId] || { isOpen: false }
  return chat.isOpen
}

export const makeGetIsChatOpen = () =>
  createSelector(getIsChatOpen, (isOpen) => isOpen)

const getIsfetchFailed = (state, props) => {
  const chat = state.chats[props.chatId] || { fetchFailed: false }
  return chat.fetchFailed
}
export const makeGetIsFetchFailed = () =>
  createSelector(getIsfetchFailed, (fetchFailed) => fetchFailed)

const getShowChatProfile = (state, props) => {
  const chat = state.chats[props.chatId] || { showProfile: false }
  return chat.showProfile
}
const getChatscrolled = (state, props) => {
  const chat = state.chats[props.chatId] || 0
  return chat.chatScrolled
}

export const makeGetShowChatProfile = () =>
  createSelector(getShowChatProfile, (showProfile) => showProfile || false)

export const makeGetChatscrolled = () =>
  createSelector(getChatscrolled, (chatScrolled) => chatScrolled || 0)

const getIsInitiator = (state, props) => {
  const chat = state.chats[props.chatId] || { isInitiator: false }
  return chat.isInitiator || false
}

export const makeGetIsInitiator = () =>
  createSelector(getIsInitiator, (isInitiator) => isInitiator)

const getIsTyping = (state, props) => {
  const chat = state.chats[props.chatId] || { isTyping: { typing: false } }
  return chat.isTyping
}

export const makeGetIsTyping = () =>
  createSelector(getIsTyping, (isTyping) => isTyping)

const getHistoryIsLoaded = (state, props) => {
  const chat = state.chats[props.chatId] || { historyLoaded: false }
  return chat.historyLoaded
}

export const makeGetHistoryIsLoaded = () =>
  createSelector(getHistoryIsLoaded, (historyLoaded) => historyLoaded)

const getIsInCallingScreen = (state, props) => {
  const chat = state.chats[props.chatId] || { isInCallingScreen: false }
  return chat.isInCallingScreen
}
const getCallInfo = (state, props) => {
  const callInfo = state.calling.chatId == props.chatId ? state.calling : {}
  return callInfo
}

export const makeGetIsInCallingScreen = () =>
  createSelector(getIsInCallingScreen, (isInCallingScreen) => isInCallingScreen)

export const makeGetCallInfo = () =>
  createSelector(getCallInfo, (isInCallingScreen) => isInCallingScreen)

const getIsCaller = (state, props) => {
  const chat = state.chats[props.chatId] || { isCaller: false }
  return chat.isCaller
}
const getCallStatus = (state, props) => {
  const chat = state.chats[props.chatId] || { callStatus: false }
  return chat.callStatus
}

export const makeGetIsCaller = () =>
  createSelector(getIsCaller, (isCaller) => isCaller)

export const makeGetCallStatus = () =>
  createSelector(getCallStatus, (callStatus) => callStatus)

const getCaller = (state, props) => {
  const chat = state.chats[props.chatId] || { caller: null }
  return chat.caller
}

export const makeGetCaller = () => createSelector(getCaller, (caller) => caller)

import ACTION_TYPES from "./actionTypes"

export const showKnowledgeLevelModal = (payload) => ({
  type: ACTION_TYPES.MODAL_KNOWLEDGELEVEL_SHOW,
  payload,
})

export const showChooseKnowledgeIcon = (payload) => ({
  type: ACTION_TYPES.MODAL_KNOWLEDGELEVEL_CHOOSE_ICON,
  payload,
})

export const hideKnowledgeLevelModal = (payload) => ({
  type: ACTION_TYPES.MODAL_KNOWLEDGELEVEL_HIDE,
  payload,
})

export const toggleMenu = () => ({
  type: ACTION_TYPES.MODAL_MENU_TOGGLE,
})

export const closeMenu = () => ({
  type: ACTION_TYPES.MODAL_MENU_HIDE,
})

export const openInbox = () => ({
  type: ACTION_TYPES.MODAL_INBOX_OPEN,
})

export const toggleInbox = () => ({
  type: ACTION_TYPES.MODAL_INBOX_TOGGLE,
})

export const closeInbox = () => ({
  type: ACTION_TYPES.MODAL_INBOX_HIDE,
})

export const showAppModal = () => ({
  type: ACTION_TYPES.MODAL_APP_SHOW,
})

export const hideAppModal = () => ({
  type: ACTION_TYPES.MODAL_APP_HIDE,
})

export const showSignupModal = () => ({
  type: ACTION_TYPES.MODAL_SIGNUP_SHOW,
})

export const hideSignupModal = () => ({
  type: ACTION_TYPES.MODAL_SIGNUP_HIDE,
})

export const showLoginModal = () => ({
  type: ACTION_TYPES.MODAL_LOGIN_SHOW,
})

export const hideLoginModal = () => ({
  type: ACTION_TYPES.MODAL_LOGIN_HIDE,
})

export const showGroupChatModal = () => ({
  type: ACTION_TYPES.MODAL_GROUP_CHAT_SHOW,
})

export const hideGroupChatModal = () => ({
  type: ACTION_TYPES.MODAL_GROUP_CHAT_HIDE,
})

export const showGroupChatInfoModal = () => ({
  type: ACTION_TYPES.MODAL_GROUP_CHAT_INFO_SHOW,
})

export const hideGroupChatInfoModal = () => ({
  type: ACTION_TYPES.MODAL_GROUP_CHAT_INFO_HIDE,
})

export const showForgotPasswordModal = () => ({
  type: ACTION_TYPES.MODAL_FORGOT_PASSWORD_SHOW,
})

export const hideForgotPasswordModal = () => ({
  type: ACTION_TYPES.MODAL_FORGOT_PASSWORD_HIDE,
})

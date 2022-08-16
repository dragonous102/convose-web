import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  displayMenu: false,
  displayAppModal: false,
  displayLoginModal: false,
  displaySignupModal: false,
  displayInbox: false,
  displayGroupChatSelect: false,
  displayGroupChatInfoModal: false,
  displayForgotPasswordModal: false,
  knowledgeLevelModal: {
    show: false,
    interest: {},
    editIconStep: 0,
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_MODALS:
      return initialState

    case ACTION_TYPES.MODAL_MENU_TOGGLE:
      return {
        ...initialState,
        displayMenu: !state.displayMenu,
        displayInbox: false,
      }
    case ACTION_TYPES.MODAL_MENU_HIDE:
      return {
        ...state,
        displayMenu: false,
      }
    case ACTION_TYPES.MODAL_KNOWLEDGELEVEL_SHOW: {
      const { payload: interest } = action
      return {
        ...initialState,
        knowledgeLevelModal: {
          show: true,
          interest,
          editIconStep: 0,
        },
      }
    }
    case ACTION_TYPES.MODAL_KNOWLEDGELEVEL_CHOOSE_ICON: {
      const { interest, editIconStep } = action.payload
      return {
        ...initialState,
        knowledgeLevelModal: {
          show: true,
          interest,
          editIconStep,
        },
      }
    }
    case ACTION_TYPES.MODAL_KNOWLEDGELEVEL_HIDE:
      return initialState
    case ACTION_TYPES.MODAL_APP_SHOW:
      return {
        ...initialState,
        displayAppModal: true,
      }
    case ACTION_TYPES.MODAL_APP_HIDE:
      return {
        ...state,
        displayAppModal: false,
      }
    case ACTION_TYPES.MODAL_LOGIN_SHOW:
      return {
        ...state,
        displayLoginModal: true,
        displaySignupModal: false,
      }
    case ACTION_TYPES.MODAL_LOGIN_HIDE:
      return {
        ...state,
        displayLoginModal: false,
      }
    case ACTION_TYPES.MODAL_SIGNUP_SHOW:
      return {
        ...state,
        displaySignupModal: true,
        displayLoginModal: false,
      }
    case ACTION_TYPES.MODAL_SIGNUP_HIDE:
      return {
        ...state,
        displaySignupModal: false,
      }
    case ACTION_TYPES.MODAL_INBOX_TOGGLE:
      return {
        ...state,
        displayInbox: !state.displayInbox,
        displayMenu: false,
      }
    case ACTION_TYPES.MODAL_INBOX_OPEN:
      return {
        ...state,
        displayInbox: true,
        displayMenu: false,
      }

    case ACTION_TYPES.MODAL_INBOX_HIDE:
      return {
        ...state,
        displayInbox: false,
      }
    case ACTION_TYPES.MODAL_GROUP_CHAT_SHOW:
      return {
        ...state,
        displayGroupChatSelect: true,
        displayMenu: false,
        displayInbox: false,
      }

    case ACTION_TYPES.MODAL_GROUP_CHAT_HIDE:
      return {
        ...state,
        displayGroupChatSelect: false,
      }

    case ACTION_TYPES.MODAL_GROUP_CHAT_INFO_SHOW:
      return {
        ...state,
        displayGroupChatInfoModal: true,
      }

    case ACTION_TYPES.MODAL_GROUP_CHAT_INFO_HIDE:
      return {
        ...state,
        displayGroupChatInfoModal: false,
      }

    case ACTION_TYPES.MODAL_FORGOT_PASSWORD_SHOW:
      return {
        ...state,
        displayForgotPasswordModal: true,
      }

    case ACTION_TYPES.MODAL_FORGOT_PASSWORD_HIDE:
      return {
        ...state,
        displayForgotPasswordModal: false,
      }
    default:
      return state
  }
}

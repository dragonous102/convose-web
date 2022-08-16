import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  chatId: "",
  from: "",
  users: [],
  loading: false,
  pages_left: 0,
  selected: [],
  type: "",
  joining: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CLOSE_GROUP_CHAT_SELECT: {
      return initialState
    }
    case ACTION_TYPES.JOIN_GROUP_CHAT: {
      return {
        ...state,
        joining: true,
      }
    }

    case ACTION_TYPES.START_GROUP_CHAT_ADD: {
      return {
        ...state,
        ...action.payload,
      }
    }

    case ACTION_TYPES.SELECT_GROUP_CHAT_PARTICIPANT: {
      const id = action.payload
      return {
        ...state,
        selected: [...state.selected, id],
      }
    }

    case ACTION_TYPES.DESELECT_GROUP_CHAT_PARTICIPANT: {
      const id = action.payload
      return {
        ...state,
        selected: state.selected.filter((arrayId) => arrayId !== id),
      }
    }

    case ACTION_TYPES.LOADING_GROUP_CHAT: {
      return {
        ...state,
        loading: true,
      }
    }

    case ACTION_TYPES.RECEIVED_GROUP_CHAT: {
      const { pages_left, users } = action.payload
      return {
        ...state,
        pages_left: pages_left,
        users: [...state.users, ...users],
        loading: false,
      }
    }
    case ACTION_TYPES.MODAL_GROUP_CHAT_HIDE: {
      return {
        ...state,
        users: [],
        selected: [],
      }
    }
    case ACTION_TYPES.FAILED_GROUP_CHAT: {
      return {
        ...state,
        loading: false,
        joining: false,
      }
    }

    default:
      return state
  }
}

//  pages_left:pages_left,
//users:[...state.users,...users]

import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  profiles: {},
  list: new Array(6).fill(),
  storedList: new Array(6).fill(),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_USERS:
      return initialState

    case ACTION_TYPES.UPDATE_USER_LIST: {
      //window.pushlogs && console.log("UPDATE_USER_LIST: ", action.payload)
      const { list } = action.payload
      return {
        ...state,
        list,
      }
    }

    case ACTION_TYPES.STORE_RECEIVED_USERS_LIST: {
      const { list: storedList } = action.payload
      // window.pushlogs &&
      //   console.log("STORE_RECEIVED_USERS_LIST: ", action.payload)
      // window.pushlogs && console.log(state, storedList)
      return {
        ...state,
        storedList,
      }
    }
    case ACTION_TYPES.RECEIVED_USERS_PROFILE: {
      const { chatId, user } = action.payload
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [chatId]: user,
        },
      }
    }

    case ACTION_TYPES.UPDATE_USERS: {
      // window.pushlogs &&
      //   console.log("ACTION_TYPES.UPDATE_USERS ", action.payload)
      return {
        ...state,
        profiles: {
          ...state.profiles,
          ...action.payload,
        },
      }
    }

    case ACTION_TYPES.PARTICIPANTS_UPDATE: {
      const {
        chatId,
        participantList: { participants, pages_left },
        loadHistoryFrom,
        from,
      } = action.payload

      return {
        ...state,
        profiles: {
          ...state.profiles,
          [chatId]: {
            ...state.profiles[chatId],
            historyLoaded: pages_left === 0,
            loading: false,
            loadHistoryFrom,
            participants:
              from != 1
                ? { ...state.profiles[chatId].participants, ...participants }
                : participants,
          },
        },
      }
    }
    case ACTION_TYPES.PARTICIPANTS_LOADING: {
      const { chatId } = action.payload
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [chatId]: {
            ...state.profiles[chatId],
            loading: true,
          },
        },
      }
    }
    case ACTION_TYPES.BLOCK_USER_SUCCESS:
      return {
        ...state,
        blockUserSuccess: true,
      }

    case ACTION_TYPES.BLOCK_USER_FAILURE:
      return {
        ...state,
        blockUserFailure: false,
      }
    default:
      return state
  }
}

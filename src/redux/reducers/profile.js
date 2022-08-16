import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  avatar: {},
  interests: [],
  is_guest: true,
  username: "",
  uuid: "",
  theme_color: "",
  email: "",
  status: "",
  authentication_token: "",
  app_initialized: false,
  isInCallingScreen: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_PROFILE:
      return initialState

    case ACTION_TYPES.RECEIVED_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      }

    case ACTION_TYPES.UPDATE_INTERESTS:
      return {
        ...state,
        interests: action.payload,
      }

    case ACTION_TYPES.APP_INITIALIZED:
      return {
        ...state,
        app_initialized: true,
      }

    default:
      return state
  }
}

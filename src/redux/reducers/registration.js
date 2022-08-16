import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  loadingLogin: false,
  loadingLogout: false,
  loadingSignup: false,
  invalidEmail: "",
  emailSent: false,
  resetSuccess: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_LOGIN:
      return {
        ...state,
        loadingLogin: true,
      }
    case ACTION_TYPES.FETCH_LOGIN_SUCCESS:
    case ACTION_TYPES.FETCH_LOGIN_ERROR:
      return {
        ...state,
        loadingLogin: false,
      }
    case ACTION_TYPES.FETCH_SIGNUP:
      return {
        ...state,
        loadingSignup: true,
      }
    case ACTION_TYPES.FETCH_SIGNUP_SUCCESS:
    case ACTION_TYPES.FETCH_SIGNUP_ERROR:
      return {
        ...state,
        loadingSignup: false,
      }
    case ACTION_TYPES.FETCH_LOGOUT:
      return {
        ...state,
        loadingLogout: true,
      }
    case ACTION_TYPES.FETCH_LOGOUT_SUCCESS:
    case ACTION_TYPES.FETCH_LOGOUT_ERROR:
      return {
        ...state,
        loadingLogout: false,
      }
    case ACTION_TYPES.INVALID_EMAIL:
      return {
        ...state,
        ...action.payload,
      }
    case ACTION_TYPES.FORGOT_PASSWORD_SENT:
      return {
        ...state,
        emailSent: true,
      }
    case ACTION_TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetSuccess: true,
      }
    case ACTION_TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetSuccess: false,
      }
    default:
      return state
  }
}

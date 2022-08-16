import axios from "axios"
import * as Api from "../../api"
import ACTION_TYPES from "./actionTypes"
import { showErrorBar } from "./alertbar"
import {
  AUTH_TOKEN_KEY,
  UUID_KEY,
  ALERT_ERROR_EMAIL_REGISTERED,
} from "../constants"
import { getUserProfile, receivedUserProfile, createGuestUser } from "./profile"
import { hideSignupModal, hideLoginModal } from "./modals"

export const signupProfile =
  ({ user }) =>
  (dispatch, getState) => {
    window.pushlogs && console.log("SIGNUP PROFILE USER:", { user })
    dispatch({ type: ACTION_TYPES.FETCH_SIGNUP })
    Api.fetchSignup({ user })
      .then((payload) => {
        payload.interests && payload.interests.reverse()
        if (payload.emailTaken) {
          dispatch(showErrorBar(ALERT_ERROR_EMAIL_REGISTERED))
          dispatch({
            type: ACTION_TYPES.INVALID_EMAIL,
            payload: { invalidEmail: user.email },
          })
          dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_ERROR })
        } else {
          const { profile } = getState()
          window.pushlogs && console.log("FETCH SIGNUP RESPONSE:", payload)
          dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_SUCCESS })
          const newUser = {
            ...profile,
            ...payload.user,
          }
          const { uuid, authentication_token: token } = newUser
          // TODO: split this up in a nicer way
          localStorage.setItem(AUTH_TOKEN_KEY, token)
          localStorage.setItem(UUID_KEY, uuid)
          // eslint-disable-next-line no-use-before-define
          dispatch(receivedUserProfile(newUser))
          dispatch(hideSignupModal())
        }
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_ERROR })
        dispatch(showErrorBar(error.toString()))
        window.pushlogs && console.log(error)
      })
  }

const resetAppState = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.SUGGESTIONS_UNSUBSCRIBE })
  dispatch({ type: ACTION_TYPES.PARTNERS_RESET })
  dispatch({ type: ACTION_TYPES.PARTNERS_NEW_MESSAGE_UNSUBSCRIBE })
  dispatch({ type: ACTION_TYPES.RESET_CHAT })
  dispatch({ type: ACTION_TYPES.RESET_INTERESTS })
  dispatch({ type: ACTION_TYPES.RESET_MODALS })
  dispatch({ type: ACTION_TYPES.RESET_PARTNERS })
  dispatch({ type: ACTION_TYPES.RESET_PROFILE })
  dispatch({ type: ACTION_TYPES.RESET_STORAGE })
  dispatch({ type: ACTION_TYPES.RESET_USERS })
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(UUID_KEY)
}

const updateAvatarFromProfile = (picture, token) => (dispatch) => {
  if (token && picture && picture.data) {
    axios
      .get(picture.data.url, { responseType: "blob" })
      .then((response) => {
        const file = new File([response.data], "fb_profile.jpg", {
          type: "image/jpeg",
        })
        Api.fetchUpdateAvatar({ file, token })
          .then((payload) => {
            payload.interests && payload.interests.reverse()
            window.pushlogs && console.log("Api.fetchUpdateAvatar: ", payload)
            dispatch(receivedUserProfile(payload))
          })
          .catch((error) => {
            dispatch(showErrorBar(error.toString()))
            window.pushlogs && console.error("could not update USER PROFILE")
          })
      })
      .catch((error) => {
        dispatch(showErrorBar(error.toString()))
        window.pushlogs && console.log(error, error.status)
      })
  }
}

export const loginProfile = (email, password) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.FETCH_LOGIN })
  Api.fetchLogin({ user: { email, password } })
    .then((payload) => {
      const { user } = payload
      window.pushlogs && console.log("FETCH LOGIN RESPONSE:", user)
      const { uuid, authentication_token: token } = user
      if (token) {
        dispatch(resetAppState())
        window.pushlogs && console.log(user)
        // dispatch(getUsersList());
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        localStorage.setItem(UUID_KEY, uuid)
        dispatch(getUserProfile(uuid, token))
        dispatch({ type: ACTION_TYPES.FETCH_LOGIN_SUCCESS })
        dispatch(hideLoginModal())
      }
    })
    .catch((error) => {
      dispatch({ type: ACTION_TYPES.FETCH_LOGIN_ERROR })
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.log(error, error.status)
    })
}

export const appleLoginProfile = (response) => (dispatch, getState) => {
  try {
    const {
      authorization: { id_token },
    } = response
    if (id_token) {
      dispatch({ type: ACTION_TYPES.FETCH_LOGIN })
      Api.fetchAppleLogin({ id_token })
        .then((payload) => {
          const { token, user } = payload
          window.pushlogs && console.log("FETCH APPLE LOGIN RESPONSE:", user)
          const { uuid } = user
          if (token) {
            dispatch(resetAppState())
            window.pushlogs && console.log(user)
            // dispatch(getUsersList());
            localStorage.setItem(AUTH_TOKEN_KEY, token)
            localStorage.setItem(UUID_KEY, uuid)
            dispatch(getUserProfile(uuid, token))
            dispatch({ type: ACTION_TYPES.FETCH_LOGIN_SUCCESS })
            dispatch(hideLoginModal())
          }
          // return token
        })
        //  .then((token) => {
        //     dispatch(updateAvatarFromProfile(picture, token))
        //  })
        .catch((error) => {
          dispatch({ type: ACTION_TYPES.FETCH_LOGIN_ERROR })
          dispatch(showErrorBar(error.toString()))
          window.pushlogs && console.log(error, error.status)
        })
    }
  } catch (error) {
    dispatch({ type: ACTION_TYPES.FETCH_LOGIN_ERROR })
    dispatch(showErrorBar(error.toString()))
    window.pushlogs && console.log(error, error.status)
  }
}

export const appleSignupProfile = (response) => (dispatch, getState) => {
  try {
    const {
      authorization: { id_token },
    } = response
    if (id_token) {
      dispatch({ type: ACTION_TYPES.FETCH_SIGNUP })
      Api.fetchAppleLogin({ id_token })
        .then((payload) => {
          const { token, user } = payload
          window.pushlogs && console.log("FETCH APPLE SIGNUP RESPONSE:", user)
          const { uuid } = user
          if (token) {
            dispatch(resetAppState())
            window.pushlogs && console.log(user)
            // dispatch(getUsersList());
            localStorage.setItem(AUTH_TOKEN_KEY, token)
            localStorage.setItem(UUID_KEY, uuid)
            dispatch(getUserProfile(uuid, token))
            dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_SUCCESS })
            dispatch(hideLoginModal())
          }
          // return token
        })
        //  .then((token) => {
        //     dispatch(updateAvatarFromProfile(picture, token))
        //  })
        .catch((error) => {
          dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_ERROR })
          dispatch(showErrorBar(error.toString()))
          window.pushlogs && console.log(error, error.status)
        })
    }
  } catch (error) {
    dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_ERROR })
    dispatch(showErrorBar(error.toString()))
    window.pushlogs && console.log(error, error.status)
  }
}

export const facebookLoginProfile = (response) => (dispatch, getState) => {
  const { name, accessToken, picture } = response
  if (accessToken) {
    dispatch({ type: ACTION_TYPES.FETCH_LOGIN })
    Api.fetchFacebookLogin({ accessToken })
      .then((payload) => {
        const { token, user } = payload
        window.pushlogs && console.log("FETCH FACEBOOK LOGIN RESPONSE:", user)
        const { uuid } = user
        if (token) {
          dispatch(resetAppState())
          window.pushlogs && console.log(user)
          // dispatch(getUsersList());
          localStorage.setItem(AUTH_TOKEN_KEY, token)
          localStorage.setItem(UUID_KEY, uuid)
          dispatch(getUserProfile(uuid, token))
          dispatch({ type: ACTION_TYPES.FETCH_LOGIN_SUCCESS })
          dispatch(hideLoginModal())
        }
        return token
      })
      .then((token) => {
        dispatch(updateAvatarFromProfile(picture, token))
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_LOGIN_ERROR })
        dispatch(showErrorBar(error.toString()))
        window.pushlogs && console.log(error, error.status)
      })
  }
}

export const facebookSignupProfile = (response) => (dispatch, getState) => {
  const { accessToken, picture } = response
  if (accessToken) {
    dispatch({ type: ACTION_TYPES.FETCH_SIGNUP })
    Api.fetchFacebookLogin({ accessToken })
      .then((payload) => {
        const { token, user } = payload
        window.pushlogs && console.log("FETCH FACEBOOK SIGNUP RESPONSE:", user)
        const { uuid } = user
        if (token) {
          dispatch(resetAppState())
          window.pushlogs && console.log(user)
          // dispatch(getUsersList());
          localStorage.setItem(AUTH_TOKEN_KEY, token)
          localStorage.setItem(UUID_KEY, uuid)
          dispatch(getUserProfile(uuid, token))
          dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_SUCCESS })
          dispatch(hideLoginModal())
        }
        return token
      })
      .then((token) => {
        dispatch(updateAvatarFromProfile(picture, token))
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_ERROR })
        dispatch(showErrorBar(error.toString()))
        window.pushlogs && console.log(error, error.status)
      })
  }
}

export const googleLoginProfile = (response) => (dispatch, getState) => {
  const { imageUrl } = response.profileObj
  const { id_token } = response.tokenObj
  console.log(response, "login response")
  console.log(id_token, "login id token")
  if (id_token) {
    dispatch({ type: ACTION_TYPES.FETCH_LOGIN })
    Api.fetchGoogleLogin({ id_token })
      .then((payload) => {
        console.log(payload, "login payload")
        const { token, user } = payload
        window.pushlogs && console.log("FETCH GOOGLE LOGIN RESPONSE:", user)
        const { uuid } = user
        if (token) {
          dispatch(resetAppState())
          window.pushlogs && console.log(user)
          localStorage.setItem(AUTH_TOKEN_KEY, token)
          localStorage.setItem(UUID_KEY, uuid)
          dispatch(getUserProfile(uuid, token))
          dispatch({ type: ACTION_TYPES.FETCH_LOGIN_SUCCESS })
          dispatch(hideLoginModal())
        }
        return token
      })
      .then((token) => {
        dispatch(updateAvatarFromProfile(imageUrl, token))
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_LOGIN_ERROR })
        dispatch(showErrorBar(error.toString()))
        window.pushlogs && console.log(error, error.status)
      })
  }
}

export const googleSignupProfile = (response) => (dispatch, getState) => {
  const { imageUrl } = response.profileObj
  const { id_token } = response.tokenObj
  console.log(response, "signup response")
  console.log(id_token, "signup id token")
  if (id_token) {
    dispatch({ type: ACTION_TYPES.FETCH_SIGNUP })
    Api.fetchGoogleLogin({ id_token })
      .then((payload) => {
        const { token, user } = payload
        const { uuid } = user
        if (token) {
          dispatch(resetAppState())
          window.pushlogs && console.log(user)
          localStorage.setItem(AUTH_TOKEN_KEY, token)
          localStorage.setItem(UUID_KEY, uuid)
          dispatch(getUserProfile(uuid, token))
          dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_SUCCESS })
          dispatch(hideLoginModal())
        }
        return token
      })
      .then((token) => {
        dispatch(updateAvatarFromProfile(imageUrl, token))
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_SIGNUP_ERROR })
        dispatch(showErrorBar(error.toString()))
        window.pushlogs && console.log(error, error.status)
      })
  }
}

export const logoutProfile = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.FETCH_LOGOUT })
  Api.fetchLogout()
    .then((payload) => {
      window.pushlogs && console.log(payload)
      dispatch(resetAppState())
      dispatch({ type: ACTION_TYPES.FETCH_LOGOUT_SUCCESS })
      dispatch(createGuestUser())
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.log(error, error.status)
      dispatch({ type: ACTION_TYPES.FETCH_LOGOUT_ERROR })
    })
}

export const forgotPassword = (email) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.FORGOT_PASSWORD })
  Api.fetchForgotPassword(String(email).toLowerCase())
    .then((payload) => {
      window.pushlogs && console.log(payload)
      dispatch({ type: ACTION_TYPES.FORGOT_PASSWORD_SENT })
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.log(error, error.status)
    })
}

export const resetPassword = (password, token) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.RESET_PASSWORD })
  Api.fetchResetPassword(password, token)
    .then((payload) => {
      window.pushlogs && console.log(payload)
      dispatch({ type: ACTION_TYPES.RESET_PASSWORD_SUCCESS })
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      dispatch({ type: ACTION_TYPES.RESET_PASSWORD_FAILURE })
      window.pushlogs && console.log(error, error.status)
    })
}

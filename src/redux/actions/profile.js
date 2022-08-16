import unionBy from "lodash-es/unionBy"
import * as Api from "../../api"
import ACTION_TYPES from "./actionTypes"
import { showErrorBar } from "./alertbar"
import { initSuggestions } from "./users"
import {
  ALERT_ERROR_USER_NOT_FOUND,
  AUTH_TOKEN_KEY,
  UUID_KEY,
} from "../constants"
import { clearSearchValue } from "./interests"
import { initPartners, initPartnersNewMessage } from "./partners"
import { getMyFilteredInterests } from "../selectors/profile"
import { showChooseKnowledgeIcon, showKnowledgeLevelModal } from "./modals"
import { PARTNERS_FETCH_LIMIT } from "../constants"
export const receivedUserProfile = (payload) => ({
  type: ACTION_TYPES.RECEIVED_USER_PROFILE,
  payload,
})

export const updateInterests = (payload) => ({
  type: ACTION_TYPES.UPDATE_INTERESTS,
  payload,
})
export const updateProfileConnect = () => (dispatch, getState) => {
  const { profile } = getState()
  window.pushlogs &&
    console.log("updateProfileConnect interests", profile.interests)
  dispatch(updateProfile({ interests: profile.interests }))
}

const appInitialized = () => ({
  type: ACTION_TYPES.APP_INITIALIZED,
})

export const updateProfile = (profile) => (dispatch) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  window.dataLayer.push({ event: "updatedProfile" })

  profile.interests &&
    profile.interests.forEach((interest) => {
      delete interest.pending
    })

  Api.updateUserProfile({ profile }, token)
    .then((payload) => {
      payload.interests && payload.interests.reverse()
      dispatch(receivedUserProfile(payload))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.error("could not update USER PROFILE")
    })
}

export const updateAvatar = (file) => (dispatch, getState) => {
  const {
    profile: { authentication_token: token },
  } = getState()

  Api.fetchUpdateAvatar({ file, token })
    .then((payload) => {
      window.pushlogs && console.log("Api.fetchUpdateAvatar: ", payload)
      payload.interests && payload.interests.reverse()
      dispatch(receivedUserProfile(payload))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.error("could not update USER PROFILE")
    })
}

export const createGuestUser = () => (dispatch) => {
  Api.fetchGuestUser()
    .then((payload) => {
      window.pushlogs && console.log("FETCH GUEST USER RESPONSE:", payload)
      const {
        user: { uuid, authentication_token: token },
      } = payload
      // TODO: split this up in a nicer way
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      localStorage.setItem(UUID_KEY, uuid)
      // eslint-disable-next-line no-use-before-define
      dispatch(getUserProfile(uuid, token))
    })
    .catch((error) => {
      dispatch(showErrorBar(error.toString()))
      window.pushlogs && console.log(error)
    })
}

export const createUserSession = (user) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.PARTNERS_RESET })
  dispatch({ type: ACTION_TYPES.SUGGESTIONS_UNSUBSCRIBE })
  // window.pushlogs && console.log("CREATE USER SESSION USER:", user);
  window.pushlogs && console.log("createUserSession")
  if (user && user.authentication_token) {
    // window.pushlogs && console.log(user);
    // dispatch(getUsersList());
    dispatch(initSuggestions({ token: user.authentication_token }))
    dispatch(
      initPartners({ from: 0, limit: PARTNERS_FETCH_LIMIT, myUuid: user.uuid })
    )
    dispatch(
      initPartnersNewMessage({
        token: user.authentication_token,
        myUuid: user.uuid,
      })
    )
    dispatch(receivedUserProfile(user))
  }
}

export const getUserProfile = (uuid, token) => (dispatch) => {
  Api.fetchUserProfile(uuid, token)
    .then((profile) => {
      // window.pushlogs && console.log("FETCH USER PROFILE RESPONSE:", profile);
      if (profile) {
        profile.interests && profile.interests.reverse()
        dispatch(appInitialized())
        dispatch(createUserSession(profile))
      } else {
        throw new Error(ALERT_ERROR_USER_NOT_FOUND)
      }
      return profile
    })
    .catch((error) => {
      // status is being added to catched errors in src/spi/utils
      error.status === 404
        ? dispatch(createGuestUser())
        : dispatch(getUserProfile(uuid, token))
      window.pushlogs && console.log(error, error.status)
    })
}

export const addOrUpdateInterest = (payload) => (dispatch, getState) => {
  const { name, type, level, alreadyExist } = payload
  if (type === "language" && !level && !alreadyExist) {
    dispatch(showKnowledgeLevelModal({ name, type, level }))
  } else {
    const { interests } = getState().profile

    dispatch(clearSearchValue())
    const updated = {
      name,
      type,
      level,
      pending: true,
    }
    let updatedInterests = interests.filter(
      (interest) => interest.name.replace(/ /g, "") !== name.replace(/ /g, "")
    )
    const interestsUpdated = [updated, ...updatedInterests]
    dispatch(updateInterests(interestsUpdated))
    const newInterests = alreadyExist
      ? interestsUpdated
      : unionBy([{ name, type, level }], interests, "name")
    dispatch(updateProfile({ interests: newInterests }))
  }
}

const removeInterestFromServer = (payload) => (dispatch, getState) => {
  const notPending = getMyFilteredInterests(getState())
  const newInterests = notPending.filter((i) => i.name !== payload.name)
  dispatch(updateProfile({ interests: newInterests }))
}

export const removeInterest = (payload) => (dispatch, getState) => {
  window.pushlogs && console.log("removeInterest: ", payload)
  const { interests } = getState().profile

  const withPending = interests.map((interest) => {
    return payload.name === interest.name
      ? { ...payload, pending: true }
      : interest
  })

  dispatch(updateInterests(withPending))
  dispatch(removeInterestFromServer(payload))
}

export const updateUsername = (username) => (dispatch) => {
  dispatch(updateProfile({ username }))
}

export const addOrEditIcon =
  (editIconStep, interest) => (dispatch, getState) => {
    dispatch(showChooseKnowledgeIcon({ editIconStep, interest }))
  }

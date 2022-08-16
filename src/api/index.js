/* eslint-disable no-nested-ternary */
import { checkStatus } from "./utils"
import * as ENDPOINTS from "./endpoints"
import { AUTH_TOKEN_KEY } from "../redux/constants"

//TODO: Abstract headers into a const for fetchEnpoint, getEnpointMentioinUser,getEndPointMentionProfile

/**
 * Global Fetch
 */
const fetchEndpoint = ({
  endpoint,
  id,
  values,
  method = "POST",
  authToken = "",
}) =>
  fetch(`${endpoint}${id ? `/${id}` : ""}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify(values),
  })
    .then(checkStatus)
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })

const getEndpoint = ({ endpoint, id, values, authToken = "", params = "" }) => {
  const queryParams = params
    ? `?${params}`
    : values
    ? `?${new URLSearchParams(values).toString()}`
    : ""
  const url = `${endpoint}${id ? `/${id}` : ""}${queryParams}`

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authToken,
  }
  if (authToken) {
    headers.Authorization = authToken
  }

  return fetch(url, {
    method: "GET",
    headers,
  })
    .then(checkStatus)
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
}
let controller = null
const getEndpointWithAbort = ({
  endpoint,
  values,
  authToken = "",
  params = "",
  prevrequest,
}) => {
  const queryParams = params
    ? `?${params}`
    : values
    ? `?${new URLSearchParams(values).toString()}`
    : ""
  const url = `${endpoint}${queryParams}`
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authToken,
  }

  if (authToken) {
    headers.Authorization = authToken
  }
  if (prevrequest) {
    controller.abort()
  }
  controller = new AbortController()
  const { signal } = controller
  return fetch(url, {
    method: "GET",
    headers,
    signal,
  })
    .then(checkStatus)
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
}

/**
 * Specific exported fetch funcs
 */
export const fetchLogin = (values) => {
  const endpoint = ENDPOINTS.LOGIN
  return fetchEndpoint({ endpoint, values })
}

export const fetchFacebookLogin = ({ accessToken }) => {
  const params = `oauth_token=${accessToken}`
  const endpoint = ENDPOINTS.FACEBOOK_LOGIN
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken, params })
}

export const fetchAppleLogin = ({ id_token }) => {
  const params = `jwt=${id_token}`
  const endpoint = ENDPOINTS.APPLE_LOGIN
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken, params })
}

export const fetchGoogleLogin = ({ id_token }) => {
  const params = `jwt=${id_token}`
  const endpoint = ENDPOINTS.GOOGLE_LOGIN
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken, params })
}

export const fetchLogout = () => {
  const endpoint = ENDPOINTS.LOGOUT
  const method = "DELETE"
  return fetchEndpoint({ endpoint, method })
}

export const fetchSignup = (values) => {
  const endpoint = ENDPOINTS.SIGNUP
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return fetchEndpoint({ endpoint, values, authToken })
}

export const fetchSuggestions = (values) => {
  const endpoint = ENDPOINTS.SUGGESTION
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  // return getEndpoint({ endpoint, values, authToken }) // fetchEndpoint() ?
  return getEndpointWithAbort({
    endpoint,
    authToken,
    values,
    prevrequest: values.prevRequest,
  })
}

export const fetchGroupSuggestions = () => {
  const endpoint = ENDPOINTS.GROUP_SUGGESTIONS
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken })
}

export const fetchGroupChat = (values) => {
  const endpoint = ENDPOINTS.GROUP_CHAT
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return fetchEndpoint({ endpoint, values, authToken })
}

export const fetchLeaveGroupChat = ({ chatId }) => {
  const endpoint = `${ENDPOINTS.CHAT_CHANNEL}/${chatId}${ENDPOINTS.GROUP_CHAT_LEAVE}`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return fetchEndpoint({ endpoint, authToken })
}

export const fetchAddToGroupChat = ({ chatId, selected }) => {
  const endpoint = `${ENDPOINTS.CHAT_CHANNEL}/${chatId}${ENDPOINTS.GROUP_CHAT_ADD}`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const values = {
    user_ids: selected,
  }
  return fetchEndpoint({ endpoint, values, authToken })
}

export const fetchChannelMessages = ({ chatId, from, limit }) => {
  const endpoint = ENDPOINTS.CHAT_CHANNEL
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const values = {
    from,
    limit,
  }
  return getEndpoint({
    endpoint,
    id: chatId,
    authToken,
    values,
  })
}
export const fetchChannelParticipants = ({ chatId, from, limit }) => {
  const endpoint = ENDPOINTS.CHAT_PARTICIPANTS
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const values = {
    channel: chatId,
    from,
    limit,
  }

  return getEndpoint({
    endpoint,
    authToken,
    values,
  })
}
export const fetchMentionPerson = ({ chatId, message, prevrequest }) => {
  const endpoint = `${ENDPOINTS.CHAT_MENTION_PERSON}/${chatId}/search`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const values = {
    q: message,
  }
  return getEndpointWithAbort({
    endpoint,
    authToken,
    values,
    prevrequest,
  })
}
export const fetchUserAddToGroup = ({ chatId, prevrequest, from, limit }) => {
  const endpoint = `${ENDPOINTS.GROUP_ADD_USER}`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const values = { chat_id: chatId, from, limit }
  return getEndpointWithAbort({
    endpoint,
    authToken,
    values,
    prevrequest,
  })
}

// export const fetchGuestUser = (token) => {
//   const endpoint = ENDPOINTS.GUEST
//   return getEndpoint({endpoint, method: 'GET', token })
// }
export const fetchGuestUser = () => {
  const endpoint = ENDPOINTS.GUEST
  const method = "POST"
  return fetchEndpoint({ endpoint, method })
}

export const fetchUserProfile = (uuid, authToken) => {
  const id = uuid ? `${uuid}.json` : ".json" // empty uuid for fetching self profile
  const endpoint = `${ENDPOINTS.GET_USER_PROFILE}/${id}`
  //work
  return getEndpoint({
    endpoint,
    authToken,
  })
}

export const updateUserProfile = (values, authToken) => {
  const endpoint = ENDPOINTS.MY_PROFILE
  return fetchEndpoint({
    endpoint,
    method: "PATCH",
    values,
    authToken,
  })
}

export const fetchUserByToken = (token) => {
  const endpoint = ENDPOINTS.AUTH_USER
  return fetchEndpoint({ endpoint, values: { token } })
}

export const fetchUsersList = (values) => {
  const endpoint = ENDPOINTS.USERS_LIST
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken, values })
}

export const fetchPartnersList = ({ from, limit }) => {
  const endpoint = ENDPOINTS.PARTNERS_LIST
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const values = {
    from,
    limit,
  }
  return getEndpoint({
    endpoint,
    authToken,
    values,
  })
}

export const markChatChannelAsRead = ({ chatId }) => {
  const endpoint = `${ENDPOINTS.CHAT_CHANNEL}/${chatId}${ENDPOINTS.MARK_CHAT_AS_READ}`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken })
}

export const fetchMarkInboxAsRead = () => {
  const endpoint = ENDPOINTS.MARK_INBOX_AS_READ
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return getEndpoint({ endpoint, authToken })
}

export const fetchUpdateAvatar = ({ file, token: authToken }) => {
  window.pushlogs && console.log("updating user avatar: ", file, authToken)
  const endpoint = ENDPOINTS.UPDATE_AVATAR
  const data = new FormData()
  data.append("file", file)
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: authToken,
    },
    body: data,
  })
    .then(checkStatus)
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
}

export const fetchForgotPassword = (email) => {
  const endpoint = ENDPOINTS.FORGOT_PASSWORD
  const values = {
    email: email,
  }
  return fetchEndpoint({ endpoint, values })
}

export const fetchResetPassword = (password, token) => {
  const endpoint = ENDPOINTS.RESET_PASSWORD
  const values = {
    password: password,
    token: token,
  }
  return fetchEndpoint({ endpoint, values })
}

export const fetchDeleteMessage = ({ chatId, messageUuid }) => {
  console.log("hiit ths part inside api")
  const endpoint = `${ENDPOINTS.DELETE_CHAT_MESSAGE}/${chatId}/${messageUuid}`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  const method = "DELETE"
  return fetchEndpoint({ endpoint, method, authToken })
}

export const fetchBlockUser = (uuid) => {
  const endpoint = `${ENDPOINTS.BLOCK_USER}?user_uuid=${uuid}`
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)

  return fetchEndpoint({ endpoint, authToken })
}

/**
 * Mock fetch, in case you need it
 */
export const mockFetch = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), 1000)
  })

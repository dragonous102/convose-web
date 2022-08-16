/* eslint-disable max-len */
export const START = "START"
export const SUCCESS = "SUCCESS"
export const FAIL = "FAIL"

export const DEFAULT_ERROR =
  "Sorry, an error has occurred. We will take care of it. Please try later."
export const DEFAULT_SUCCESS = "Action performed successfully."
export const DEFAULT_START = "Action started successfully."

export const ALERT_ERROR_USER_NOT_FOUND = "User not found"
export const ALERT_ERROR_EMAIL_REGISTERED = "That email is already registered."
export const TOO_MANY_CHATS =
  "You can only open 6 Chats at a time. Please close one to open a message from your Inbox."
export const LOADING_HISTORY = "retrieving history..."
export const NEW_UNREAD_MESSAGES = "New unread messages"

// TODO: Move this to another file ?
export const AUTH_TOKEN_KEY = "token"
export const UUID_KEY = "uuid"

// Storage
export const CONSENT_ACCEPTED = "consentAccepted"
export const DISABLE_OPTIONAL_STORAGE = "optionalStorageDisabled"

export const FAYE_MSG_TYPE_TEXT = "text"
export const FAYE_MSG_TYPE_DELETE = "deleted"
export const FAYE_MSG_TYPE_ACTIVITY = "activity"
export const FAYE_MSG_TYPE_IMAGE = "image"
export const FAYE_MSG_TYPE_AUDIO = "audio"
export const FAYE_MSG_TYPE_SYSTEM = "system"
export const FAYE_MSG_TYPE_CALL = "call"

export const UPDATE_USERS_TIMEOUT = 5000

export const FEATURE_CHAT_MESSAGE_TYPE_IMAGE = "chatMessageTypeImage"
export const FEATURE_CHAT_MESSAGE_TYPE_AUDIO = "chatMessageTypeAudio"
export const FEATURE_INSTANT_MESSAGE_DISPLAY = "instantMessageDisplay"
export const FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD =
  "autoScrollOnChatImageLoad"

export const FACEBOOK_APP_ID = "853466218454989"
export const APPLE_CLIENT_ID = "com.convose.webapp"
export const GOOGLE_CLIENT_ID =
  "719823468477-ph43fjjnu7754geh2qjf8e9uh4m40efg.apps.googleusercontent.com"

export const CALL_SIGNAL_CALL = "call"
export const CALL_SIGNAL_END_CALL = "endCall"
export const GROUP_CALL = "GROUP_CALL"
export const ONE_TO_ON_CALL = "onetoone"
export const CALL_SIGNAL_CALL_END_DECLINE = "callEnd-Decline"
export const CALL_SIGNAL_CALL_END_BUSY = "callEnd-Busy"
export const CALL_SIGNAL_CALL_END_NO_ANSWER = "callEnd-NoAnswer"
export const CALL_SIGNAL_CALL_JOINED = "callJoined"
export const CALL_SIGNAL_EMPTY = "empty"
export const CALL_SIGNAL_MUTE = "muted"

export const YOU_MISSED_CALL = "You missed a call "
export const NO_ANSWER = "No answer "
export const CALL_ENDED = "Call ended "

export const PARTNERS_FETCH_LIMIT = 10

export const typingTimeout = 1000

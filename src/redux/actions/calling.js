import { generateCallMessage } from "../../utils/faye/helpers"
import { CALL_SIGNAL_CALL_END_BUSY, ONE_TO_ON_CALL } from "../constants"
import ACTION_TYPES from "./actionTypes"
import { sendMessage } from "./chats"

export const setCallingChannel = (payload) => ({
  type: ACTION_TYPES.SET_CALLING_CHANNEL,
  payload,
})

export const setJoinCall = (payload) => ({
  type: ACTION_TYPES.SET_JOIN_CALL,
  payload,
})

export const setPeers = (payload) => ({
  type: ACTION_TYPES.SET_PEERS,
  payload,
})

export const leaveChannel = (payload) => ({
  type: ACTION_TYPES.LEAVE_CALLING_CHANNEL,
  payload,
})

export const toggleSpeakerMode = () => ({
  type: ACTION_TYPES.TOGGLE_SPEAKER_MODE,
})

export const toggleUserAudio = (payload) => ({
  type: ACTION_TYPES.TOGGLE_MUTE_MODE,
  payload,
})

export const toggleVideoSuccess = () => ({
  type: ACTION_TYPES.TOGGLE_VIDEO_COMPLETED,
})
export const toggleAudioSuccess = () => ({
  type: ACTION_TYPES.TOGGLE_AUDIO_COMPLETED,
})

export const toggleUserVideo = () => ({
  type: ACTION_TYPES.TOGGLE_VIDEO_MODE,
})

export const setIsInCallingScreen = (payload) => ({
  type: ACTION_TYPES.SET_IS_IN_CALLING_SCREEN,
  payload,
})

export const setCaller = (payload) => ({
  type: ACTION_TYPES.SET_CALLER,
  payload,
})

export const setCallingStatus = (payload) => ({
  type: ACTION_TYPES.SET_CALLING_STATUS,
  payload,
})

export const setIsAccepted = (payload) => ({
  type: ACTION_TYPES.SET_IS_ACCEPTED,
  payload,
})

export const setIsCaller = (payload) => ({
  type: ACTION_TYPES.SET_IS_CALLER,
  payload,
})

export const receivedCall = (payload) => ({
  type: ACTION_TYPES.RECEIVED_CALL,
  payload,
})

export const startedCall = (payload) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: ACTION_TYPES.STARTED_CALL,
      payload,
    })
  }, 1000)
}
export const callEndBusy = (payload) => (dispatch, getState) => {
  const { profile } = getState()
  const { chatId } = payload
  const message = generateCallMessage({
    type: CALL_SIGNAL_CALL_END_BUSY,
    text: `in another call`,
    me: profile,
    callType: ONE_TO_ON_CALL,
  })
  dispatch(sendMessage({ chatId, message }))
}
export const userInAnotherCall = (payload) => ({
  type: ACTION_TYPES.Call_BUSY,
  payload,
})
export const updateGroupInfo = (payload) => ({
  type: ACTION_TYPES.SET_CALLING_GROUP_INFO,
  payload,
})

export const callAccepted = (payload) => ({
  type: ACTION_TYPES.CALL_ACCEPTED,
  payload,
})

export const callCancelled = (payload) => ({
  type: ACTION_TYPES.CALL_CANCELLED,
  payload,
})

export const callEnded = (payload) => ({
  type: ACTION_TYPES.CALL_ENDED,
  payload,
})

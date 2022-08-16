import { leaveCallingChannel } from "../../components/CallingPanel"
import {
  callAccepted,
  callCancelled,
  callEndBusy,
  leaveChannel,
  receivedCall,
  setIsInCallingScreen,
  toggleUserAudio,
  userInAnotherCall,
} from "../../redux/actions/calling"
import { receiveMessage } from "../../redux/actions/chats"
import {
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_END_BUSY,
  CALL_SIGNAL_CALL_END_DECLINE,
  CALL_SIGNAL_CALL_END_NO_ANSWER,
  CALL_SIGNAL_CALL_JOINED,
  CALL_SIGNAL_END_CALL,
  CALL_SIGNAL_MUTE,
  FAYE_MSG_TYPE_AUDIO,
  FAYE_MSG_TYPE_CALL,
  FAYE_MSG_TYPE_DELETE,
  FAYE_MSG_TYPE_IMAGE,
  FAYE_MSG_TYPE_TEXT,
  ONE_TO_ON_CALL,
} from "../../redux/constants"

/* eslint-disable no-bitwise, no-plusplus, no-mixed-operators */
const JOIN_STRING = "xx-xx"
const lut = []
for (let i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? "0" : "") + i.toString(16)
}

const getChatId = ({ myUuid, chatPartnerUuid }) =>
  [myUuid, chatPartnerUuid].sort().join(JOIN_STRING)

const getUserIdFromChatId = ({ chatId, myUuid }) =>
  chatId?.split(JOIN_STRING).filter((uuid) => uuid !== myUuid)[0]

const quickUuid = () => {
  const d0 = (Math.random() * 0xffffffff) | 0
  const d1 = (Math.random() * 0xffffffff) | 0
  const d2 = (Math.random() * 0xffffffff) | 0
  const d3 = (Math.random() * 0xffffffff) | 0
  return `${
    lut[d0 & 0xff] +
    lut[(d0 >> 8) & 0xff] +
    lut[(d0 >> 16) & 0xff] +
    lut[(d0 >> 24) & 0xff]
  }-${lut[d1 & 0xff]}${lut[(d1 >> 8) & 0xff]}-${
    lut[((d1 >> 16) & 0x0f) | 0x40]
  }${lut[(d1 >> 24) & 0xff]}-${lut[(d2 & 0x3f) | 0x80]}${
    lut[(d2 >> 8) & 0xff]
  }-${lut[(d2 >> 16) & 0xff]}${lut[(d2 >> 24) & 0xff]}${lut[d3 & 0xff]}${
    lut[(d3 >> 8) & 0xff]
  }${lut[(d3 >> 16) & 0xff]}${lut[(d3 >> 24) & 0xff]}`
}

const shortenChannelId = (channel) =>
  channel.length > 88 ? channel.substr(0, 46) : channel

export { getChatId, getUserIdFromChatId, quickUuid, shortenChannelId }

export const makeGroupAvatar = ({ participants }) => {
  let images = []
  const arrayParticipants =
    Object.keys(participants).length > 2
      ? Object.keys(participants).slice(0, 2)
      : Object.keys(participants)
  arrayParticipants.forEach((key) => {
    if (participants[key]?.avatar?.url) {
      images.push(participants[key].avatar.url)
    }
  })
  return images
}

export const checkIfAlreadyExistInterest = (interests, suggestion) => {
  if (!interests) return false
  const exist = interests.filter(
    (interest) => suggestion.toLowerCase() == interest.name.toLowerCase()
  )[0]
  if (exist) return true
  return false
}

export const timeIsNotUp = (date) => {
  const diff = (new Date().getTime() - date.getTime()) / 1000
  if (diff > 3) {
    return false
  }
  return true
}
export const timeupForMessage = (date) => {
  const diff = (new Date().getTime() - date.getTime()) / 1000
  if (diff > 5) {
    return true
  }
  return false
}
export const detectSystem = (date) => {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (/android/i.test(userAgent)) {
    return "android"
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios"
  }

  return "unknown"
}

export const formateMessage = ({ chatId, data, type, myUuid }) => {
  let message = null
  switch (type) {
    case FAYE_MSG_TYPE_TEXT: {
      const {
        content: text,
        sender_uuid: sender,
        sender_username: username,
        uuid,
        created_at,
        avatar,
      } = data
      message = {
        text,
        timestamp: new Date(created_at),
        mine: sender === myUuid,
        sender,
        username,
        uuid,
        avatar,
      }

      break
    }
    case FAYE_MSG_TYPE_DELETE: {
      const {
        content: text,
        sender_uuid: sender,
        sender_username: username,
        uuid,
        created_at,
        avatar,
      } = data

      message = {
        text,
        timestamp: new Date(created_at) - 20,
        mine: sender == myUuid,
        sender,
        username,
        uuid,
        avatar,
        deleted: true,
      }

      break
    }

    case FAYE_MSG_TYPE_IMAGE: {
      const {
        content: imageUri,
        sender_uuid: sender,
        sender_username: username,
        uuid,
        // eslint-disable-next-line camelcase
        created_at,
        avatar,
        ratio,
      } = data
      message = {
        imageUri,
        ratio,
        text: "Image",
        timestamp: new Date(created_at),
        mine: sender == myUuid,
        sender,
        username,
        uuid,
        avatar,
      }

      break
    }
    case FAYE_MSG_TYPE_AUDIO: {
      window.pushlogs &&
        console.log("received Message Type audio with data:", data.message)
      const {
        content: audioUri,
        sender_uuid: sender,
        sender_username: username,
        uuid,
        // eslint-disable-next-line camelcase
        created_at,
        avatar,
        length,
      } = data
      message = {
        audioUri,
        text: "Audio Message",
        timestamp: new Date(created_at),
        mine: sender == myUuid,
        sender,
        username,
        uuid,
        avatar,
        length,
      }
      break
    }
  }

  return {
    message,
    chatId,
  }
}

const convertDataURIToBinary = (dataURI) => {
  let BASE64_MARKER = ";base64,"
  let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  let base64 = dataURI.substring(base64Index)
  let raw = window.atob(base64)
  let rawLength = raw.length
  let array = new Uint8Array(new ArrayBuffer(rawLength))

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }
  return array
}

export const base64Blob = (data) => {
  let binary = convertDataURIToBinary(data)
  let blob = new Blob([binary], { type: "audio/webm" })
  var blobUrl = URL.createObjectURL(blob)
  return blobUrl
}

export const generateCallMessage = ({ type, me, text, callType }) => {
  let message = {
    data: text,
    action: type,
    isTyping: false,
    sender: me.uuid,
    avatar: me.avatar,
    senderUsername: me.username,
    type: FAYE_MSG_TYPE_CALL,
    uuid: quickUuid(),
    callType,
  }
  return message
}

export const callHelper = (
  dispatch,
  chatId,
  myUuid,
  isInCallingScreen,
  callStatus,
  data,
  type,
  myId
) => {
  const { sender, action, data: text, uuid, created_at } = data

  switch (action) {
    case CALL_SIGNAL_CALL:
      if (sender !== myUuid) {
        if (type == ONE_TO_ON_CALL) {
          if (!isInCallingScreen) {
            dispatch(receivedCall({}))
            dispatch(setIsInCallingScreen({ chatId, status: true }))
          } else {
            console.log("checking user can't pick the call should say busy")
            dispatch(callEndBusy({ chatId }))
          }
        } else {
          dispatch(setIsInCallingScreen({ chatId, status: true }))
        }
      }
      break
    case CALL_SIGNAL_CALL_JOINED:
      {
        if (callStatus != CALL_SIGNAL_CALL_JOINED) {
          dispatch(
            setIsInCallingScreen({
              chatId,
              status: true,
              callStatus: CALL_SIGNAL_CALL_JOINED,
            })
          )
          dispatch(callAccepted({}))
        }
      }

      break
    case CALL_SIGNAL_MUTE: {
      const callSignalArray = text.split(" ")
      const toBeMutedUuid = callSignalArray[callSignalArray.length - 1]
      if (myId == toBeMutedUuid) {
        dispatch(toggleUserAudio({ others: true }))
      }
      break
    }
    case CALL_SIGNAL_END_CALL:
      {
        if (type == ONE_TO_ON_CALL) {
          leaveCallingChannel()
          dispatch(leaveChannel(chatId))
          dispatch(callCancelled({}))
        } else {
          console.log("some one left the group")
        }
      }

      break
    case CALL_SIGNAL_CALL_END_BUSY: {
      if (sender !== myUuid) {
        console.log("checking busy hit for user who call")
        dispatch(
          userInAnotherCall({ chatId, callStatus: CALL_SIGNAL_CALL_END_BUSY })
        )
      }

      break
    }
    case CALL_SIGNAL_CALL_END_NO_ANSWER:
      dispatch(callCancelled({}))
      dispatch(leaveChannel(chatId))
      break
    case CALL_SIGNAL_CALL_END_DECLINE: {
      if (type == ONE_TO_ON_CALL) {
        if (chatId.length > 30) {
          dispatch(callCancelled({}))
          dispatch(leaveChannel(chatId))
        }
      } else {
        console.log("some one declined")
      }
    }

    /* falls through */
    default:
      break
  }
  const message = {
    text,
    action,
    mine: sender === myUuid,
    timestamp: new Date(created_at),
    sender,
    uuid,
    isCallMessage: true,
    ...data,
  }
  const payload = {
    message,
    chatId,
  }
  action !== CALL_SIGNAL_CALL && dispatch(receiveMessage(payload))
}

export const columnsRows = (count) => {
  let rows
  let columns
  const sqr = Math.round(Math.sqrt(count))
  if (sqr * sqr >= count) {
    rows = sqr
    columns = sqr
  } else {
    rows = sqr
    columns = sqr + 1
  }
  console.log("checking ", "rows", rows, "columns", columns, "count", count)
  return { rows, columns }
}

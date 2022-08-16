import intersectionBy from "lodash-es/intersectionBy"
import uniqBy from "lodash-es/uniqBy"
import orderBy from "lodash-es/orderBy"
import findIndex from "lodash-es/findIndex"
import findLastIndex from "lodash-es/findLastIndex"
import cloneDeep from "lodash-es/cloneDeep"
import uniq from "lodash-es/uniq"
import { getChatId, getUserIdFromChatId, quickUuid } from "./faye/helpers"
import {
  FAYE_MSG_TYPE_AUDIO,
  FAYE_MSG_TYPE_IMAGE,
  FAYE_MSG_TYPE_TEXT,
  FAYE_MSG_TYPE_SYSTEM,
  FAYE_MSG_TYPE_CALL,
  ONE_TO_ON_CALL,
} from "../redux/constants"

const mapMessagesToList = (messages) =>
  messages.map((message) => {
    // window.pushlogs && console.log(message)
    const {
      content,
      class: type,
      ratio,
      created_at,
      uuid,
      message_type: messageType,
      sender,
      sender_username: username,
      avatar,
      deleted,
    } = message

    const timestamp = new Date(created_at)
    const mine = type === "me"
    const isAudioMessage = messageType === FAYE_MSG_TYPE_AUDIO
    const isImageMessage = messageType === FAYE_MSG_TYPE_IMAGE
    const isTextMessage = messageType === FAYE_MSG_TYPE_TEXT
    const isSystemMessage = messageType === FAYE_MSG_TYPE_SYSTEM
    const isCallMessage = messageType === FAYE_MSG_TYPE_CALL
    return {
      ...(isSystemMessage && {
        text: content,
      }),
      ...(isTextMessage && {
        text: content,
      }),
      ...(isImageMessage && {
        text: "Image",
        imageUri: content,
      }),
      ...(isAudioMessage && {
        text: "Audio Message",
        audioUri: content,
      }),
      ...(isCallMessage && {
        text: content,
        action: message.action,
      }),
      mine,
      timestamp,
      uuid: uuid || quickUuid(),
      sender,
      username,
      avatar,
      isSystemMessage,
      isCallMessage,
      ratio,
      deleted,
    }
  })

const sortAndFilterMessages = (messages) => {
  const returnValue = uniqBy(orderBy(messages, ["timestamp"], ["asc"]), "uuid")
  return returnValue
}

const mapUsersList = ({ list, suggestedList, openChats }) => {
  const newSuggestions = uniq(suggestedList).filter(
    (uuid) => !openChats.includes(uuid)
  )

  const mappedList = list.map((uuid) => {
    if (uuid && openChats.includes(uuid)) {
      return uuid
    }
    const newUuid = newSuggestions.shift()
    return newUuid
  })

  return cloneDeep(mappedList)
}

const pushUserToUsersList = ({ myUuid, list, chats, uuid }, callBack) => {
  const hasEmptySpace = list.some((item) => typeof item !== "string")
  let indexToReplace

  if (hasEmptySpace) {
    window.pushlogs && console.log("pushUserToUsersList: has empty space")
    indexToReplace = findIndex(
      list,
      (chatPartnerUuid) => typeof chatPartnerUuid !== "string"
    )
  } else {
    window.pushlogs &&
      console.log("pushUserToUsersList: does not have empty space")
    indexToReplace = findLastIndex(list, (chatPartnerUuid) => {
      const chatId =
        chatPartnerUuid.indexOf("-") === -1
          ? chatPartnerUuid
          : getChatId({ myUuid, chatPartnerUuid })
      return !chats[chatId] || !chats[chatId].isOpen
    })
  }
  window.pushlogs &&
    console.log(`pushUserToUsersList indexToReplace: ${indexToReplace}`)
  // eslint-disable-next-line no-param-reassign
  list[indexToReplace] = uuid

  callBack(cloneDeep(list), indexToReplace)
}

const removeUserFromUsersList = ({ list, storedList, uuid }) => {
  const indexToReplace = findIndex(
    list,
    (chatPartnerUuid) => chatPartnerUuid === uuid
  )
  const possibleReplacement = storedList.filter(
    (storedUser) => !list.includes(storedUser)
  )[0]
  window.pushlogs && console.log(`replacing by : ${possibleReplacement}`)
  if (indexToReplace > -1) {
    // eslint-disable-next-line no-param-reassign
    list[indexToReplace] = possibleReplacement || null
  }
  return cloneDeep(list)
}

const matchInterests = ({ ownInterests, userInterests }) =>
  intersectionBy(userInterests, ownInterests, "name")

const groupDetails = (participants, partner) => {
  const status = Object.values(participants).some(
    (participant) => participant.status === "online"
  )
    ? "online"
    : "offline"
  return {
    theme_color: "#404040",
    avatar: {
      // eslint-disable-next-line global-require
      url: require("../global/imgs/group.png"),
    },
    username: partner["group_name"],
    is_guest: false,
    status,
  }
}

const mapPartnerToInboxItem = ({ partner, myUuid }) => {
  const {
    // eslint-disable-next-line camelcase
    channel,
    type,
    participants,
    last_message: { content, message_type: messageType, created_at: createdAt },
    unread: { count, inbox_read: opened },
  } = partner
  const chatId = channel
  const partnerUuid =
    type === ONE_TO_ON_CALL ? getUserIdFromChatId({ chatId, myUuid }) : chatId
  const {
    theme_color: themeColor,
    avatar,
    username,
    status,
  } = participants[partnerUuid] || groupDetails(participants, partner)
  const hasImage = messageType === FAYE_MSG_TYPE_IMAGE
  const hasAudio = messageType === FAYE_MSG_TYPE_AUDIO
  let message = content
  if (hasImage) {
    message = "Image"
  }
  if (hasAudio) {
    message = "Audio Message"
  }
  return {
    chatId,
    type,
    themeColor,
    avatar,
    username,
    isActive: status === "online",
    message,
    hasImage,
    hasAudio,
    timestamp: new Date(createdAt),
    partnerUuid,
    indicator: {
      count,
      opened,
    },
  }
}

export {
  mapMessagesToList,
  sortAndFilterMessages,
  mapUsersList,
  matchInterests,
  mapPartnerToInboxItem,
  pushUserToUsersList,
  removeUserFromUsersList,
}

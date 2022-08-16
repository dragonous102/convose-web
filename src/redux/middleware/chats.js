import faye from "faye"
import fayeConfig from "../../utils/faye/config"
import ACTION_TYPES from "../actions/actionTypes"
import {
  FAYE_MSG_TYPE_ACTIVITY,
  FAYE_MSG_TYPE_AUDIO,
  FAYE_MSG_TYPE_IMAGE,
  FAYE_MSG_TYPE_TEXT,
  FAYE_MSG_TYPE_SYSTEM,
  FEATURE_INSTANT_MESSAGE_DISPLAY,
  FAYE_MSG_TYPE_CALL,
  UUID_KEY,
  // CALL_SIGNAL_MUTE,
} from "../constants"
import {
  fetchMessages,
  receiveMessage,
  retreiveChannelHistory,
  participantsLoading,
  fetchMessagesLoading,
  sendMessage,
  //openChat,
  initChannel,
  sendAudio,
  sendImage,
} from "../actions/chats"
import { showErrorBar } from "../actions/alertbar"
import { updateSuggestions } from "../actions/users"
import { base64Blob, callHelper, quickUuid } from "../../utils/faye/helpers"
import // muteUser,
"../actions/calling"
import { retreiveParticipantHistory } from "../actions/group"
import {
  removeUnsendMessage,
  storeUnsendMessage,
} from "../actions/unsendmessages"
let fayeClient
const subscriptions = {}

export default ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.FAYE_INIT: {
        if (!fayeClient) {
          fayeClient = new faye.Client(fayeConfig.production.url, {
            retry: fayeConfig.development.retry,
            timeout: fayeConfig.development.timeout,
          })

          fayeClient.on("transport:down", () => {
            // the client is offline
            window.pushlogs && console.log("Faye is Down", new Date(Date.now()))
          })

          fayeClient.on("transport:up", () => {
            // the client is online
            window.pushlogs && console.log("Faye is Up", new Date(Date.now()))
          })
        }
        break
      }

      case ACTION_TYPES.FAYE_SUBSCRIBE: {
        const { chatId, myUuid } = action.payload
        const chatChannel = `/chat/${chatId}`

        if (!myUuid) console.error("Did not supply a Uuid for the subscription")

        const subscriptionCallback = (data) => {
          window.pushlogs &&
            console.log(
              "subscriptionCallback: (switch on data.message.type)\n",
              data
            )
          switch (data.message.type) {
            case FAYE_MSG_TYPE_SYSTEM: {
              const { created_at, data: text } = data.message
              const message = {
                text,
                timestamp: new Date(created_at),
                isSystemMessage: true,
              }
              const payload = {
                message,
                chatId,
              }
              dispatch(receiveMessage(payload))
              break
            }
            case FAYE_MSG_TYPE_TEXT: {
              const {
                data: text,
                sender,
                senderUsername: username,
                uuid,
                created_at,
                avatar,
              } = data.message
              const message = {
                text,
                timestamp: new Date(created_at),
                mine: sender === myUuid,
                sender,
                username,
                uuid,
                avatar,
              }
              const payload = {
                message,
                chatId,
              }
              dispatch(receiveMessage(payload))
              dispatch(removeUnsendMessage({ uuid }))
              break
            }

            case FAYE_MSG_TYPE_CALL: {
              const { calling, profile } = getState()
              callHelper(
                dispatch,
                chatId,
                myUuid,
                calling.isInCallingScreen,
                calling.callStatus,
                data.message,
                data.message.callType,
                profile.id.toString()
              )

              break
            }

            case FAYE_MSG_TYPE_IMAGE: {
              const {
                data: imageUri,
                ratio,
                sender,
                senderUsername: username,
                uuid,
                // eslint-disable-next-line camelcase
                created_at,
                avatar,
              } = data.message
              const message = {
                imageUri,
                ratio,
                text: "Image",
                timestamp: new Date(created_at),
                mine: sender === myUuid,
                sender,
                username,
                uuid,
                avatar,
              }

              const payload = {
                message,
                chatId,
              }
              dispatch(receiveMessage(payload))
              dispatch(removeUnsendMessage({ uuid }))
              break
            }

            case FAYE_MSG_TYPE_AUDIO: {
              window.pushlogs &&
                console.log(
                  "received Message Type audio with data:",
                  data.message
                )
              const {
                data: audioUri,
                sender,
                senderUsername: username,
                uuid,
                // eslint-disable-next-line camelcase
                created_at,
                avatar,
                length,
              } = data.message
              const message = {
                audioUri,
                text: "Audio Message",
                timestamp: new Date(created_at),
                mine: sender === myUuid,
                sender,
                username,
                uuid,
                avatar,
                length,
              }
              const payload = {
                message,
                chatId,
              }
              dispatch(receiveMessage(payload))
              dispatch(removeUnsendMessage({ uuid }))
              break
            }

            case FAYE_MSG_TYPE_ACTIVITY: {
              const { message } = data
              const { sender, isTyping } = message
              if (sender !== myUuid) {
                window.pushlogs &&
                  console.log(
                    "received user activity message from other user:",
                    message
                  )
                const payload = { chatId }
                if (isTyping) {
                  dispatch({
                    type: ACTION_TYPES.PARTNER_STARTED_TYPING,
                    payload,
                  })
                } else {
                  dispatch({
                    type: ACTION_TYPES.PARTNER_STOPPED_TYPING,
                    payload,
                  })
                }
              }
              break
            }

            default: {
              const error = "received unknown message type from Faye"
              dispatch(showErrorBar(error))
              console.error(error)
              break
            }
          }
        }

        if (fayeClient && !subscriptions[chatId]) {
          const { messages } = action.payload
          window.pushlogs &&
            console.log(
              `subscribe to Channel ${chatId} with uuid ${myUuid}, client has ${
                // eslint-disable-next-line no-underscore-dangle
                Object.keys(fayeClient._channels._channels).length
              } subscriptions`
            )
          subscriptions[chatId] = fayeClient.subscribe(
            chatChannel,
            subscriptionCallback
          )
          subscriptions[chatId].then(() => {
            window.pushlogs &&
              console.log(
                `succesfully subscribed to Channel ${chatId}, client now has ${
                  // eslint-disable-next-line no-underscore-dangle
                  Object.keys(fayeClient._channels._channels).length
                } subscriptions`
              )
            if (messages.length > 0) {
              messages.forEach(async (message) => {
                const { image, audioUri } = message
                if (image) {
                  dispatch(
                    sendImage({
                      chatId,
                      message,
                    })
                  )
                } else if (audioUri) {
                  const dataUri = await base64Blob(message.data)
                  dispatch(
                    sendAudio({
                      chatId,
                      dataUri,
                      message,
                    })
                  )
                } else {
                  dispatch(sendMessage({ chatId, message }))
                }
              })
            }

            const { chats } = getState()
            if (chats[chatId] && !chats[chatId].historyLoaded) {
              dispatch(fetchMessages({ chatId }))
            }
          })
        }

        break
      }

      case ACTION_TYPES.FAYE_UNSUBSCRIBE: {
        const { chatId } = action.payload
        window.pushlogs &&
          console.log(
            `try to unsubscribe from Channel ${chatId}, client has ${
              // eslint-disable-next-line no-underscore-dangle
              Object.keys(fayeClient._channels._channels).length
            } subscriptions`
          )
        if (subscriptions[chatId]) {
          subscriptions[chatId].cancel()
          delete subscriptions[chatId]
          window.pushlogs &&
            console.log(
              `succesfully unsubscribed from Channel ${chatId}, client now has only ${
                // eslint-disable-next-line no-underscore-dangle
                Object.keys(fayeClient._channels._channels).length
              } subscriptions`
            )
        }
        break
      }
      case ACTION_TYPES.SEND_MESSAGE:
      case ACTION_TYPES.SEND_IMAGE:
      case ACTION_TYPES.SEND_AUDIO: {
        const { chatId, message, type, dataUri } = action.payload
        const chatChannel = `/chat/${chatId}`
        const uuid = message.uuid ? message.uuid : quickUuid()
        fayeClient
          .publish(chatChannel, {
            message: {
              type,
              chatId,
              uuid,
              ...message,
            },
          })
          .then(
            function () {},
            function (error) {
              alert("There was a problem: " + error.message)
            }
          )

        if (getState().features[FEATURE_INSTANT_MESSAGE_DISPLAY]) {
          // store message in redux store
          window.pushlogs && console.log(message)
          const isTextMessage = type === FAYE_MSG_TYPE_TEXT
          const isImageMessage = type === FAYE_MSG_TYPE_IMAGE
          const isAudioMessage = type === FAYE_MSG_TYPE_AUDIO
          const isCallMessage = message.type === FAYE_MSG_TYPE_CALL

          const payload = {
            message: {
              ...(isAudioMessage && {
                text: "Audio",
                audioUri: dataUri,
                audioDataUri: message.data,
                length: message.length,
              }),

              ...(isTextMessage && { text: message.data }),
              ...(isImageMessage &&
                message.data.length > 200 && {
                  text: "Image",
                  imageDataUri: message.data,
                  ratio: message.ratio,
                }),
              ...(isImageMessage &&
                message.data.length < 200 && {
                  text: "Image",
                  imageUri: message.data,
                  ratio: message.ratio,
                }),
              ...(isCallMessage && {
                text: message.data,
                action: message.action,
                timestamp: new Date(),
              }),
              ...(message.duration && {
                duration: message.duration,
              }),
              isCallMessage,
              mine: true,
              uuid: uuid,
              chatId,
              sender: message?.sender,
            },
            chatId,
          }
          dispatch(receiveMessage(payload))
          //if the chatId is in the message, this is already stored in failed message
          // no need to store again
          if (!message.chatId && !isCallMessage) {
            dispatch(storeUnsendMessage(payload.message))
          }
        }

        break
      }

      case ACTION_TYPES.START_TYPING: {
        const { chatId, message } = action.payload
        const chatChannel = `/chat/${chatId}`

        fayeClient.publish(chatChannel, {
          message: {
            ...message,
            type: FAYE_MSG_TYPE_ACTIVITY,
            isTyping: true,
          },
        })

        break
      }

      case ACTION_TYPES.STOP_TYPING: {
        const { chatId, message } = action.payload
        const chatChannel = `/chat/${chatId}`

        fayeClient.publish(chatChannel, {
          message: {
            ...message,
            type: FAYE_MSG_TYPE_ACTIVITY,
            isTyping: false,
          },
        })

        break
      }

      case ACTION_TYPES.BROWSER_IS_ONLINE: {
        const {
          chats,
          partners: { messages },
        } = getState()
        // check whether the latest message ID is already contained in the appropriate chat
        // eslint-disable-next-line array-callback-return
        Object.keys(chats).map((chatId) => {
          const chat = chats[chatId]
          const chatIsOpenAndHasMessages = chat.messages && chat.isOpen
          if (chatIsOpenAndHasMessages) {
            const lastMessage = messages.filter(
              (message) => message.chatId === chatId
            )[0]
            const lastMessageIsIncluded =
              lastMessage &&
              chat.messages.some(
                (message) => message.uuid === lastMessage.messageUuid
              )
            if (!lastMessageIsIncluded) {
              dispatch(fetchMessages({ chatId, loadHistoryFrom: 0 }))
            }
          }
        })
        break
      }

      case ACTION_TYPES.CLOSE_CHAT: {
        dispatch(updateSuggestions())
        break
      }

      case ACTION_TYPES.FETCH_MESSAGES: {
        const { chatId } = action.payload
        let from
        // TODO: make this nice
        // eslint-disable-next-line no-prototype-builtins
        const { chats } = getState()
        //prev request result do not come
        //we stop the same request
        if (chats.loading) return
        /* eslint-disable max-len */
        if (action.payload?.loadHistoryFrom) {
          const { loadHistoryFrom } = action.payload
          from = loadHistoryFrom
        } else {
          const { loadHistoryFrom = 0 } = chats[chatId] || {}
          from = loadHistoryFrom
        }
        dispatch(fetchMessagesLoading({ chatId }))
        dispatch(retreiveChannelHistory({ chatId, from }))
        break
      }
      case ACTION_TYPES.FETCH_PARTICIPANTS: {
        const { chatId } = action.payload
        let from
        // TODO: make this nice
        /* eslint-disable max-len */
        if (action.payload?.loadHistoryFrom) {
          const { loadHistoryFrom } = action.payload
          from = loadHistoryFrom
        } else {
          const {
            users: { profiles },
          } = getState()
          const historyLoaded = profiles[chatId]?.historyLoaded
          if (historyLoaded) return
          const loadHistoryFrom = profiles[chatId]?.loadHistoryFrom || 0
          from = loadHistoryFrom
        }

        dispatch(participantsLoading({ chatId }))
        dispatch(retreiveParticipantHistory({ chatId, from }))
        break
      }
      case ACTION_TYPES.INIT_SEND_UNSEND_MESSAGE: {
        const { chats, unsendmessages } = getState()
        const myUuid = localStorage.getItem(UUID_KEY)
        let chatOpened = Object.keys(chats).filter(
          (chatId) => chats[chatId].isOpen
        )
        chatOpened.forEach((chatId) => {
          if (fayeClient && !subscriptions[chatId]) {
            dispatch(
              initChannel({
                chatId,
                myUuid,
              })
            )
          }
        })
        const objectMessages = {}
        unsendmessages.messages.forEach((message) => {
          const {
            text,
            audioUri,
            imageDataUri,
            sender,
            uuid,
            chatId,
            ratio,
            audioDataUri,
          } = message
          if (objectMessages[chatId]) {
            objectMessages[chatId].push({
              data: imageDataUri || audioDataUri || text,
              sender,
              uuid,
              ratio,
              chatId,
              audioUri,
              image: imageDataUri ? true : false,
            })
          } else {
            objectMessages[chatId] = [
              {
                chatId,
                data: imageDataUri || audioDataUri || text,
                sender,
                uuid,
                ratio,
                audioUri,
                image: imageDataUri ? true : false,
              },
            ]
          }
        })

        Object.keys(objectMessages).forEach((chatId) => {
          if (fayeClient && !subscriptions[chatId]) {
            dispatch(
              initChannel({
                chatId,
                myUuid,
                messages: objectMessages[chatId],
              })
            )
          } else {
            objectMessages[chatId].forEach(async (message) => {
              const { image, audioUri } = message
              if (image) {
                dispatch(
                  sendImage({
                    chatId,
                    message,
                  })
                )
              } else if (audioUri) {
                const dataUri = await base64Blob(message.data)
                dispatch(
                  sendAudio({
                    chatId,
                    dataUri,
                    message,
                  })
                )
              } else {
                dispatch(sendMessage({ chatId, message }))
              }
            })
          }
        })

        break
      }

      default:
    }

    return result
  }

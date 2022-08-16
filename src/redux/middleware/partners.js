import ACTION_TYPES from "../actions/actionTypes"
import {
  messageUpdate,
  fetchParticipants,
  openChat,
  receiveMessage,
} from "../actions/chats"
import { updateUsers } from "../actions/users"
import {
  updatePartners,
  updatePartnerLatestMessage,
  updatePartnerMessage,
  fetchPartners,
} from "../actions/partners"
import ActionCable from "../../api/ActionCable"
import { WS_ACTIONCABLE_CHANNEL_PARTNERS_NEW_MESSAGE } from "../../api/endpoints"
import { mapPartnerToInboxItem } from "../../utils/dataMappers"
import { fetchPartnersList } from "../../api"
import { FAYE_MSG_TYPE_DELETE, PARTNERS_FETCH_LIMIT } from "../constants"
import { formateMessage } from "../../utils/faye/helpers"
import { removeUnsendMessage } from "../actions/unsendmessages"
// import img from "../../global/imgs/groupImg.png"

let subscription
let newMessageSubscription
let partnerCable = new ActionCable()
let newMessageCable = new ActionCable()
let initialized = false

export default ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const result = next(action)
    switch (action.type) {
      case ACTION_TYPES.PARTNERS_NEW_MESSAGE_SUBSCRIBE: {
        window.pushlogs && console.log("WS: subscribe to Partners New Message")
        const {
          payload: { token, myUuid },
        } = action
        newMessageSubscription = newMessageCable
          .getConsumer({ token })
          .subscriptions.create(
            {
              channel: WS_ACTIONCABLE_CHANNEL_PARTNERS_NEW_MESSAGE,
              token,
            },
            {
              connected: () => {
                window.pushlogs &&
                  console.log(
                    `WS: connected to ${WS_ACTIONCABLE_CHANNEL_PARTNERS_NEW_MESSAGE}`
                  )
              },
              disconnected: () => {
                window.pushlogs &&
                  console.log(
                    `WS: disconnected from ${WS_ACTIONCABLE_CHANNEL_PARTNERS_NEW_MESSAGE}`
                  )
              },
              received: (payload) => {
                // do stuff with data
                window.pushlogs &&
                  console.log(
                    `WS: received on channel ${WS_ACTIONCABLE_CHANNEL_PARTNERS_NEW_MESSAGE} `,
                    payload
                  )

                const message = { ...payload }
                const chatId = message.channel
                const type = message.last_message.message_type
                if (
                  message.last_message.sender_uuid == myUuid ||
                  type == FAYE_MSG_TYPE_DELETE
                ) {
                  const messagePayload = formateMessage({
                    chatId,
                    data: message.last_message,
                    type,
                    myUuid,
                  })
                  dispatch(receiveMessage(messagePayload))
                  dispatch(
                    removeUnsendMessage({ uuid: message.last_message.uuid })
                  )
                }

                if (
                  message.last_message.sender_uuid ===
                  "NzYwNjliNzAwZmQxNzQ5MQ-ODU4ZDMwYzkxMzc1OWM1ZA"
                ) {
                  dispatch(
                    fetchPartners({
                      from: 0,
                      limit: PARTNERS_FETCH_LIMIT,
                      myUuid: myUuid,
                    })
                  )
                  dispatch(openChat({ chatId }))
                }

                if (initialized && payload) {
                  const { chats } = getState()
                  const open = chats[chatId] && chats[chatId].isOpen
                  dispatch(messageUpdate({ message, myUuid, open }))
                  dispatch(
                    updatePartnerLatestMessage(
                      mapPartnerToInboxItem({
                        partner: {
                          ...message,
                          unread: open
                            ? { count: 0, inbox_read: true }
                            : message.unread,
                        },
                        myUuid,
                      })
                    )
                  )
                }
              },
            }
          )
        break
      }
      case ACTION_TYPES.PARTNERS_NEW_MESSAGE_UNSUBSCRIBE: {
        newMessageCable &&
          newMessageSubscription &&
          newMessageCable.closeConnection()
        break
      }
      case ACTION_TYPES.PARTNERS_FETCH: {
        const {
          payload: { from, limit, myUuid },
        } = action

        window.pushlogs &&
          console.log("Fetch partners from: " + from + " to: " + (from + limit))
        fetchPartnersList({ from, limit }).then((partners) => {
          if (!partners) return
          const userProfiles = partners.chat.reduce(
            (obj, partner) => ({
              ...obj,
              ...partner.participants,
            }),
            {}
          )
          const groupProfiles = partners.chat.reduce((obj, partner) => {
            if (partner.type === "group") {
              // the refresh vaiable is from setInterval, we do not need to update the group profile,
              // just need for user profile
              dispatch(fetchParticipants({ chatId: partner.channel }))
              const groupProfile = {
                ...partner,
                theme_color: "#808080",
                username: partner.group_name,
                is_guest: false,
                uuid: partner.channel,
              }
              return {
                ...obj,
                [partner.channel]: groupProfile,
              }
            }
            return obj
          }, {})

          const profiles = {
            ...userProfiles,
            ...groupProfiles,
          }

          dispatch(updateUsers(profiles))
          const { chats } = getState()
          dispatch(
            updatePartnerMessage({
              messages: partners.chat.map((partner) => {
                const open =
                  chats[partner.channel] && chats[partner.channel].isOpen
                return mapPartnerToInboxItem({
                  partner: {
                    ...partner,
                    unread: open
                      ? { count: 0, inbox_read: true }
                      : partner.unread,
                  },
                  myUuid,
                })
              }),
              pages_left: partners.pages_left ? partners.pages_left : 0,
              nextPage: partners.chat.length === PARTNERS_FETCH_LIMIT,
            })
          )

          dispatch(updatePartners(profiles))
          initialized = true
        })
        break
      }
      default:
    }

    return result
  }

import { Fragment } from "react"
import GroupChatMessage from "../GroupChatMessage"
import { StyledWrapper } from "./Styled"
import DateLabel from "../../DateLabel"
import TimeLabel from "../../TimeLabel"
import ChatSystemMesage from "../../ChatSystemMessage"
import ChatCallMessage from "../../ChatCallMessage"
import GroupChatCallMessage from "../../GroupChat/GroupChatCallMessage"
import {
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_END_BUSY,
} from "../../../redux/constants"

const tenMinutes = 10 * 60 * 1000

const longerThanTenMinutes = (timestamp, prevTimestamp) =>
  new Date(timestamp).getTime() > new Date(prevTimestamp).getTime() + tenMinutes

const GroupChatMessageList = ({
  messages = [],
  myProfile = {},
  profiles = {},
  onChange = null,
  participants = {},
  isInGroupCalling = false,
  openUserChat,
  fetchUserProfileFromServer,
}) => {
  let currentDay
  let displayDateLabel = false
  let displayTimeLabel = false
  return (
    <StyledWrapper className="tooltipBoundary">
      {messages.map((message, idx) => {
        const {
          timestamp,
          uuid,
          sender,
          sender_username,
          mine,
          isSystemMessage,
          isCallMessage,
        } = message
        if (isSystemMessage) {
          return (
            <Fragment key={uuid}>
              <ChatSystemMesage message={message.text} />
            </Fragment>
          )
        }

        if (isCallMessage) {
          if (mine) {
            message.username = myProfile.username
          }
          const time = new Date(timestamp)
          const timestring = time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
          if (isInGroupCalling) {
            return message.action === CALL_SIGNAL_CALL &&
              timestamp != undefined ? (
              <Fragment key={uuid}>
                <GroupChatCallMessage
                  message={message}
                  timestring={timestring}
                />
              </Fragment>
            ) : null
          }
          return message.action === CALL_SIGNAL_CALL &&
            message.action === CALL_SIGNAL_CALL_END_BUSY &&
            timestring !== undefined ? (
            <Fragment key={uuid}>
              {timestamp && <TimeLabel timestring={timestring} />}
              <ChatCallMessage message={message} isInGroup={true} />
            </Fragment>
          ) : null
        }

        const profile = mine ? myProfile : profiles[sender]

        const { avatar, username } = profile || message

        if (!avatar) {
          window.pushlogs && console.log("NO AVATAR:", message)
        }

        const prevMessage = messages[idx - 1]
        const prevTimestamp = prevMessage ? prevMessage.timestamp : null
        const isFirstMessage = !prevMessage

        const nextMessage = messages[idx + 1]
        const nextTimestamp = nextMessage ? nextMessage.timestamp : null
        const isFinalMessage = !nextMessage

        const prevMessageSameSender =
          !isFirstMessage && prevMessage.sender === sender
        const nextMessageSameSender =
          !isFinalMessage && nextMessage.sender === sender

        const messageDay = new Date(timestamp).setHours(0, 0, 0, 0)
        if (!currentDay || messageDay.valueOf() !== currentDay.valueOf()) {
          currentDay = messageDay
          displayDateLabel = true
        } else {
          displayDateLabel = false
        }

        const time = new Date(timestamp)
        const timestring = time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })

        displayTimeLabel =
          !!prevTimestamp && longerThanTenMinutes(timestamp, prevTimestamp)

        const noLabel = !displayTimeLabel && !displayDateLabel
        const nextNoLabel =
          !!nextTimestamp && !longerThanTenMinutes(nextTimestamp, timestamp)

        let position = "single"

        if (
          nextNoLabel &&
          (!noLabel || !prevMessageSameSender) &&
          nextMessageSameSender
        ) {
          position = "top"
        }
        if (
          noLabel &&
          nextNoLabel &&
          prevMessageSameSender &&
          nextMessageSameSender
        ) {
          position = "middle"
        }
        if (
          noLabel &&
          prevMessageSameSender &&
          (!nextNoLabel || !nextMessageSameSender)
        ) {
          position = "bottom"
        }

        return (
          <Fragment key={uuid}>
            {timestamp && displayDateLabel && (
              <DateLabel timestamp={timestamp} />
            )}
            {timestamp && displayTimeLabel && (
              <TimeLabel
                timestring={timestring}
                topPadding={!displayDateLabel}
              />
            )}
            <GroupChatMessage
              {...message}
              onChange={onChange}
              openUserChat={openUserChat}
              fetchUserProfileFromServer={fetchUserProfileFromServer}
              sameSender={prevMessageSameSender}
              last={isFinalMessage}
              position={position}
              displayHeader={(!mine || isInGroupCalling) && position === "top"}
              username={username || sender_username}
              avatar={avatar}
              profile={profile}
              title={timestring}
              isInGroupCalling={isInGroupCalling}
              myUuid={myProfile.uuid}
              participants={participants}
            />
          </Fragment>
        )
      })}
    </StyledWrapper>
  )
}

export default GroupChatMessageList

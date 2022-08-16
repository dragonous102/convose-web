import { Fragment, PureComponent } from "react"
import PropTypes from "prop-types"
import ChatMessage from "../ChatMessage"
import { Wrapper } from "./Styled"
import DateLabel from "../DateLabel"
import TimeLabel from "../TimeLabel"
import { MessageShape } from "../../utils/shapes"
import ChatCallMessage from "../ChatCallMessage/ChatCallMessage"
import {
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_END_BUSY,
  CALL_SIGNAL_CALL_JOINED,
  CALL_SIGNAL_EMPTY,
} from "../../redux/constants"

const tenMinutes = 10 * 60 * 1000

const longerThanTenMinutes = (timestamp, prevTimestamp) =>
  new Date(timestamp).getTime() > new Date(prevTimestamp).getTime() + tenMinutes

class ChatMessageList extends PureComponent {
  render() {
    const { messages, onChange, chatId } = this.props
    let currentDay
    let displayDateLabel = false
    let displayTimeLabel = false
    return (
      <Wrapper>
        {messages.map((message, idx) => {
          const { timestamp, uuid, sender, isCallMessage } = message

          if (isCallMessage) {
            const time = new Date(timestamp)
            const timestring = time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
            return message.action !== CALL_SIGNAL_CALL &&
              message.action !== CALL_SIGNAL_CALL_JOINED &&
              message.action !== CALL_SIGNAL_EMPTY &&
              message.action !== CALL_SIGNAL_CALL_END_BUSY &&
              timestamp ? (
              <Fragment key={uuid}>
                {timestamp && <TimeLabel timestring={timestring} />}
                <ChatCallMessage message={message} />
              </Fragment>
            ) : null
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
              <ChatMessage
                {...message}
                chatId={chatId}
                message={message}
                onChange={onChange}
                sameSender={prevMessageSameSender}
                last={isFinalMessage}
                position={position}
                title={timestring}
              />
            </Fragment>
          )
        })}
      </Wrapper>
    )
  }
}

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  chatId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

ChatMessageList.defaultProps = {
  onChange: null,
}

export default ChatMessageList

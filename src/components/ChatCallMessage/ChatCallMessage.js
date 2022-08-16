import { StyledWrapper, StyledContent } from "./Styled"
import Icon from "../Icon"
import {
  CALL_SIGNAL_CALL_END_DECLINE,
  CALL_SIGNAL_END_CALL,
  CALL_SIGNAL_CALL_END_NO_ANSWER,
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_JOINED,
} from "../../redux/constants"

const ChatCallMessage = ({ message, isInGroup }) => {
  let text
  let iconId

  if (isInGroup) {
    switch (message.action) {
      case CALL_SIGNAL_CALL:
        text = `Call started by ${
          message.username !== undefined
            ? message.username
            : message.senderUsername
        }`
        iconId = "callEnd"
        break
      case CALL_SIGNAL_CALL_JOINED:
        text = `${message.username} joined`
        iconId = null
        break
      default:
        break
    }
    return text ? (
      <StyledWrapper>
        {iconId && <Icon iconId={iconId} width="10px" />}
        <StyledContent>{text}</StyledContent>
      </StyledWrapper>
    ) : null
  }
  switch (message.action) {
    case CALL_SIGNAL_CALL_END_DECLINE:
      text = "Call declined"
      iconId = "callDecline"
      break
    case CALL_SIGNAL_END_CALL:
      text = message.text
      iconId = "callEnd"
      break
    case CALL_SIGNAL_CALL_END_NO_ANSWER:
      text = message.mine ? "No answer" : "You missed a call"
      iconId = "callNoAnswer"
      break
    default:
      break
  }
  return (
    <StyledWrapper>
      {iconId && <Icon iconId={iconId} width="10px" />}
      <StyledContent>{text}</StyledContent>
    </StyledWrapper>
  )
}

export default ChatCallMessage

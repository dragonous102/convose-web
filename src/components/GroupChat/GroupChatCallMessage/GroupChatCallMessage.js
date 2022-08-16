import { StyledWrapper, StyledContent } from "./Styled"
import Icon from "../../Icon"
import {
  CALL_SIGNAL_CALL_END_NO_ANSWER,
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_JOINED,
} from "../../../redux/constants"
import { Fragment } from "react"

const GroupChatCallMessage = ({ message, timestring }) => {
  let text
  let iconId

  switch (message.action) {
    case CALL_SIGNAL_CALL:
      text = "Call started by " + message.username
      iconId = ""
      break
    case CALL_SIGNAL_CALL_END_NO_ANSWER:
      text = "No answer"
      iconId = "callNoAnswer"
      break
    case CALL_SIGNAL_CALL_JOINED:
      text = message.username + "Joined"
      iconId = ""
      break
    default:
      break
  }
  return message.username && timestring ? (
    <Fragment>
      <StyledWrapper>
        <StyledContent isTimestamp={true}>{timestring}</StyledContent>
      </StyledWrapper>
      <StyledWrapper>
        {iconId && <Icon iconId={iconId} width="10px" />}
        <StyledContent isTimestamp={false}>{text}</StyledContent>
      </StyledWrapper>
    </Fragment>
  ) : null
}

export default GroupChatCallMessage

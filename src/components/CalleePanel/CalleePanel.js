import { useEffect } from "react"
import { StyledProfileImage } from "../ProfileImage/Styled"
import {
  StyledName,
  StyledStatus,
  StyledButton,
  StyledButtonGroup,
  StyledWrapper,
} from "./styled"
import Icon from "../Icon"
import {
  CALL_SIGNAL_CALL_END_NO_ANSWER,
  ONE_TO_ON_CALL,
} from "../../redux/constants"
import { generateCallMessage } from "../../utils/faye/helpers"
let calleeTimer
const CalleePanel = (props) => {
  const {
    user,
    cancelCall,
    acceptCall,
    setIsInCallingScreen,
    callCancelled,
    chatId,
    myProfile,
    sendMessage,
  } = props

  useEffect(() => {
    calleeTimer = setTimeout(() => {
      setIsInCallingScreen({ chatId, status: false })
      callCancelled({})

      const message = generateCallMessage({
        type: CALL_SIGNAL_CALL_END_NO_ANSWER,
        text: `No answer`,
        me: myProfile,
        callType: ONE_TO_ON_CALL,
      })

      setTimeout(() => {
        sendMessage({ chatId, message })
      }, 200)
    }, 60000)
    return () => {
      clearTimeout(calleeTimer)
    }
  }, [])

  const onAcceptCall = () => {
    clearTimeout(calleeTimer)
    acceptCall()
  }

  return (
    <StyledWrapper>
      <StyledProfileImage url={user.avatar.url} size="104px" />
      <StyledName>{user.username}</StyledName>
      <StyledStatus color={user.theme_color}>{"Calling..."}</StyledStatus>
      <StyledButtonGroup>
        <StyledButton themeColor="hangup" onClick={cancelCall}>
          <Icon iconId="hangUp" width="27px" />
        </StyledButton>
        <StyledButton themeColor="call" onClick={onAcceptCall}>
          <Icon iconId="makeCall" width="35px" />
        </StyledButton>
      </StyledButtonGroup>
    </StyledWrapper>
  )
}

export default CalleePanel

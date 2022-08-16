import { StyledWrapper, StyledContent } from "./Styled"

const ChatSystemMessage = ({ message }) => {
  return (
    <StyledWrapper>
      <StyledContent>{message}</StyledContent>
    </StyledWrapper>
  )
}

export default ChatSystemMessage

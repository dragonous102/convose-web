import FullScreenGroupCall from "../../components/FullScreenGroupCall"
import { StyledContainer } from "./styled"
const GroupCall = ({ chatId, start }) => {
  return (
    <StyledContainer>
      <FullScreenGroupCall start={start} chatId={chatId} />
    </StyledContainer>
  )
}

export default GroupCall

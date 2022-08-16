import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../../components"
import { hideGroupChatInfoModal } from "../../redux/actions/modals"
import {
  StyledWrapper,
  StyledImageWrapper,
  StyledImage1,
  StyledImage2,
  StyledImage3,
  StyledInfoText,
  StyledSubmitButton,
} from "./Styled"

import humaaans from "./humaaans.png"
import squidchat from "./squidchat.png"
import catchat from "./catchat.png"

const GroupChatInfoModal = () => {
  const show = useSelector((s) => s.modals.displayGroupChatInfoModal)
  const dispatch = useDispatch()

  const hide = () => {
    dispatch(hideGroupChatInfoModal())
  }

  const modalProps = {
    show,
    opaque: true,
    centered: true,
    onClose: hide,
  }

  return (
    <Modal {...modalProps}>
      <StyledWrapper>
        <StyledImageWrapper>
          <StyledImage1 src={humaaans} />
          <StyledImage2 src={squidchat} />
          <StyledImage3 src={catchat} />
        </StyledImageWrapper>
        <StyledInfoText>
          To group chat, start a 1:1 chat with at least one more person.
        </StyledInfoText>
        <StyledSubmitButton onClick={hide}>OK</StyledSubmitButton>
      </StyledWrapper>
    </Modal>
  )
}

export default GroupChatInfoModal

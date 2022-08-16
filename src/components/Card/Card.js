import { useEffect } from "react"
import PropTypes from "prop-types"
import CardHeader from "../CardHeader"
import {
  StyledCard,
  StyledContent,
  StyledShadow,
  StyledWrapper,
} from "./Styled"
import { UserShape } from "../../utils/shapes"
import { DesktopUp } from "../Responsive"

const Card = (props) => {
  const {
    user,
    showCloseButton,
    onClick,
    onClose,
    children,
    isTyping,
    withStatus = true,
    onProfileImageClick,
    isOpen,
    onGroupChatClick,
    startCall,
    isInCallingScreen,
    backToCall,
    extraShadow,
    fetchUserProfileFromServer,
    avatar,
    username,
    uuid,
    isMobileOrTabletView,
    chatId,
  } = props

  useEffect(() => {
    fetchUserProfileFromServer &&
      user === undefined &&
      fetchUserProfileFromServer(uuid)
  }, [])

  return (
    <StyledWrapper showCloseButton={showCloseButton} onClick={onClick}>
      <DesktopUp>
        <StyledShadow
          extraShadow={extraShadow}
          showCloseButton={showCloseButton}
        />
      </DesktopUp>
      <StyledCard
        isMobileOrTabletView={isMobileOrTabletView}
        showCloseButton={showCloseButton}
      >
        <CardHeader
          isMobileOrTabletView={isMobileOrTabletView}
          chatId={chatId}
          avatar={user?.avatar || avatar}
          username={user?.username || username}
          withStatus={withStatus}
          themeColor={user?.theme_color}
          showCloseButton={showCloseButton}
          onClose={onClose}
          onClick={onClick}
          onGroupChatClick={onGroupChatClick}
          isTyping={isTyping}
          {...(isOpen && { onProfileImageClick })}
          startCall={startCall}
          isInCallingScreen={isInCallingScreen}
          backToCall={backToCall}
          isOpen={isOpen}
          user={user}
        />
        <StyledContent>{children}</StyledContent>
      </StyledCard>
    </StyledWrapper>
  )
}

Card.propTypes = {
  user: UserShape,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onGroupChatClick: PropTypes.func,
  onProfileImageClick: PropTypes.func,
  isTyping: PropTypes.object,
  isOpen: PropTypes.bool,
  startCall: PropTypes.func,
  isInCallingScreen: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  backToCall: PropTypes.func,
  avatar: PropTypes.object,
  username: PropTypes.string,
  uuid: PropTypes.string,
}

Card.defaultProps = {
  showCloseButton: false,
  onClick: null,
  onClose: null,
  onGroupChatClick: null,
  isTyping: { typing: false },
  isOpen: false,
  onProfileImageClick: null,
  isInCallingScreen: false,
  avatar: {},
  username: "",
  uuid: "",
}

export default Card

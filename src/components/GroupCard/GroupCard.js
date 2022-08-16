import { PureComponent } from "react"
import PropTypes from "prop-types"
import GroupCardHeader from "../GroupCardHeader"
import {
  StyledCard,
  StyledContent,
  StyledShadow,
  StyledWrapper,
} from "./Styled"
import { UserShape } from "../../utils/shapes"
import { DesktopUp } from "../Responsive"

class GroupCard extends PureComponent {
  render() {
    const {
      group,
      showCloseButton,
      onClick,
      onClose,
      children,
      isTyping,
      onProfileImageClick,
      isOpen,
      onGroupChatClick,
      onLeaveGroupChatClick,
      onStartGroupCall,
      isInGroupCalling,
      onJoinOngoingCallClick,
      onMouseEnter,
      onMouseLeave,
      avatar,
      groupInfo,
      chatId,
    } = this.props
    const {
      avatar: defaultAvatar,
      theme_color: themeColor,
      username,
      group_name,
    } = group
    return (
      <StyledWrapper showCloseButton={showCloseButton} onClick={onClick}>
        <DesktopUp>
          <StyledShadow showCloseButton={showCloseButton} />
        </DesktopUp>
        <StyledCard
          showCloseButton={showCloseButton}
          isInGroupCalling={false}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <GroupCardHeader
            defaultAvatar={defaultAvatar}
            avatar={avatar}
            username={username}
            group_name={group_name}
            themeColor={themeColor}
            showCloseButton={showCloseButton}
            onClose={onClose}
            onClick={onClick}
            onGroupChatClick={onGroupChatClick}
            onLeaveGroupClick={onLeaveGroupChatClick}
            isTyping={isTyping}
            isGroup={true}
            {...(isOpen && { onProfileImageClick })}
            onStartGroupCall={onStartGroupCall}
            isInCall={isInGroupCalling}
            onJoinOngoingCallClick={onJoinOngoingCallClick}
            groupInfo={groupInfo}
            chatId={chatId}
          />

          <StyledContent>{children}</StyledContent>
        </StyledCard>
      </StyledWrapper>
    )
  }
}

GroupCard.propTypes = {
  group: UserShape.isRequired,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onGroupChatClick: PropTypes.func,
  onLeaveGroupChatClick: PropTypes.func.isRequired,
  onProfileImageClick: PropTypes.func,
  isTyping: PropTypes.object,
  isActive: PropTypes.bool,
  isOpen: PropTypes.bool,
}

GroupCard.defaultProps = {
  showCloseButton: false,
  onClick: null,
  onClose: null,
  onGroupChatClick: null,
  isActive: false,
  isOpen: false,
  onProfileImageClick: null,
}

export default GroupCard

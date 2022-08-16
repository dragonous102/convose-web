import { PureComponent } from "react"
import PropTypes from "prop-types"
import StylePropType from "react-style-proptype"
import {
  InboxWrapper,
  MessageWrapper,
  StyledUserName,
  UserWrapper,
  ProfileImageWrapper,
  StyledDateLabel,
  StyledMessage,
  StyledIconWrapper,
} from "./Styled"
import ProfileImage from "../ProfileImage/ProfileImage"
import { InboxItemIndicatorShape } from "../../utils/shapes"
import InboxItemIndicator from "../InboxItemIndicator"
import { timestampToDisplayString } from "../../utils/timeUtils"
import { replaceMentionValues } from "../../utils/mentionUtils"
import Icon from "../Icon"
import GroupProfileImage from "../../components/GroupProfileImage/GroupProfileImage"

const upperImageStyle = {
  position: "absolute",
  top: 3,
  left: 3,
}

const lowerImageStyle = {
  position: "absolute",
  bottom: 3,
  right: 3,
}

class InboxItem extends PureComponent {
  constructor(props) {
    super(props)

    this.clickHandler = this.clickHandler.bind(this)
    this.makeGroupAvatar = this.makeGroupAvatar.bind(this)
  }

  clickHandler(event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    const { chatId, partnerUuid, onClick } = this.props
    onClick({ chatId, partnerUuid })
  }

  makeGroupAvatar(group) {
    let images = []
    Object.keys(group.participants).forEach((key) => {
      if (group.participants[key]?.avatar?.url) {
        images.push(group.participants[key].avatar.url)
      }
    })
    images = [images[0], images[1]]

    return (
      <GroupProfileImage
        url={images}
        size={"48"}
        width="26px"
        height="26px"
        upperImageStyle={upperImageStyle}
        lowerImageStyle={lowerImageStyle}
      />
    )
  }

  render() {
    const {
      themeColor,
      avatar,
      username,
      isActive,
      message,
      timestamp,
      indicator,
      displayIndicator,
      displayTime,
      styleProps,
      onClick,
      hasImage,
      hasAudio,
      type,
      groups,
      chatId,
    } = this.props

    let renderIcon
    if (hasImage) {
      renderIcon = "image"
    }
    if (hasAudio) {
      renderIcon = "microphone"
    }

    const wrapperProps = {
      style: styleProps,
      themeColor,
      displayIndicator,
      ...(onClick && { onClick: this.clickHandler }),
    }
    return (
      <InboxWrapper {...wrapperProps}>
        <UserWrapper>
          <ProfileImageWrapper displayIndicator={displayIndicator}>
            {type === "group" ? (
              this.makeGroupAvatar(groups.find((group) => group.id === chatId))
            ) : (
              <ProfileImage
                url={avatar.url}
                withStatus
                isActive={isActive}
                size="48px"
              />
            )}
          </ProfileImageWrapper>
          <StyledUserName {...(displayIndicator && { themeColor })}>
            {username}
          </StyledUserName>
          {displayTime && (
            <StyledDateLabel>
              {timestampToDisplayString(timestamp)}
            </StyledDateLabel>
          )}
        </UserWrapper>
        <MessageWrapper>
          {renderIcon && (
            <StyledIconWrapper>
              <Icon iconId={renderIcon} width="15px" />
            </StyledIconWrapper>
          )}
          <StyledMessage>
            {replaceMentionValues(message, ({ name }) => `@${name}`)}
          </StyledMessage>
          {displayIndicator && <InboxItemIndicator indicator={indicator} />}
        </MessageWrapper>
      </InboxWrapper>
    )
  }
}

InboxItem.propTypes = {
  avatar: PropTypes.objectOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  partnerUuid: PropTypes.string.isRequired,
  themeColor: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
  indicator: InboxItemIndicatorShape.isRequired,
  displayIndicator: PropTypes.bool,
  displayTime: PropTypes.bool,
  hasImage: PropTypes.bool,
  hasAudio: PropTypes.bool,
  styleProps: StylePropType,
}

InboxItem.defaultProps = {
  displayIndicator: false,
  displayTime: false,
  isActive: false,
  onClick: null,
  styleProps: null,
  themeColor: "#24AF6C",
  hasImage: false,
  hasAudio: false,
}

export default InboxItem

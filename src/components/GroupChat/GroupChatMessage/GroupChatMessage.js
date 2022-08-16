/* eslint-disable react/no-array-index-key */
import { Fragment, PureComponent } from "react"
import PropTypes from "prop-types"
import Linkify from "react-linkify"
import {
  StyledChatMessage,
  StyledLink,
  StyledTimestamp,
  Emoji,
  Mention,
  StyledImageLoaderWrapper,
  StyledHeader,
  StyledAvatar,
  StyledUsername,
  StyledHeaderMessage,
} from "./Styled"
import { timeFormater } from "../../../utils/timeUtils"
import Icon from "../../Icon"
import AudioPlayer from "../../AudioPlayer"
import { parseValue } from "../../../utils/mentionUtils"
import Image from "./Image"
import Popup from "reactjs-popup"
import { ChatInterestList, Card } from "../.."
import Tooltip from "../../Tooltip"

const isEmoji = (part) =>
  (part.charCodeAt(0) >= 55296 && part.charCodeAt(0) <= 56319) ||
  (part.charCodeAt(0) >= 56320 && part.charCodeAt(0) <= 57343)

const resizeEmoticon = (text) => {
  const parts = text?.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
  return parts.map((part, key) =>
    isEmoji(part) ? (
      <Emoji key={key}>{part}</Emoji>
    ) : (
      <span key={key}>{part}</span>
    )
  )
}

const convertEmojiAndMentions = (text, myUuid) => {
  const { parts } = parseValue(text, [
    {
      trigger: "@",
    },
  ])

  return parts.map((part, index) =>
    part.partType ? (
      <Mention
        onclick={() => alert("au")}
        key={`${index}-${part.data?.trigger}`}
        isMeMentioned={part.data?.id === myUuid}
      >
        {part.text}
      </Mention>
    ) : (
      resizeEmoticon(part.text)
    )
  )
}

class GroupChatMessage extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderAudio() {
    const { audioUri, mine } = this.props
    return audioUri && <AudioPlayer src={audioUri} mine={mine} />
  }

  renderImage() {
    const { imageUri, imageDataUri, onChange, ratio } = this.props
    return (
      (imageUri && (
        <a href={imageUri} target="_blank" rel="noopener noreferrer">
          <Image ratio={ratio} onChange={onChange} src={imageUri} alt="" />
        </a>
      )) ||
      (!imageUri && imageDataUri && (
        <Fragment>
          <Image
            ratio={ratio}
            width={250}
            src={imageDataUri}
            alt=""
            onChange={onChange}
          />

          <StyledImageLoaderWrapper>
            <Icon iconId="spinner" width="38px" />
          </StyledImageLoaderWrapper>
        </Fragment>
      ))
    )
  }

  renderText() {
    const { text, myUuid } = this.props

    return (
      <Linkify component={StyledLink} properties={{ target: "_blank" }}>
        {text && convertEmojiAndMentions(text, myUuid)}
      </Linkify>
    )
  }

  renderProfile() {
    const {
      avatar,
      username,
      isInGroupCalling,
      openUserChat,
      fetchUserProfileFromServer,
      sender,
      profile,
    } = this.props

    if (profile) {
      const { theme_color: themeColor, avatar: profileAvatar } = profile
      if (isInGroupCalling) {
        return (
          <StyledHeader>
            <StyledAvatar url={profileAvatar.url} isInGroupCalling={true} />
            <StyledUsername color={themeColor} isInGroupCalling={true}>
              {username}
            </StyledUsername>
          </StyledHeader>
        )
      }
      return (
        <Popup
          trigger={
            <StyledHeader>
              <StyledAvatar url={profileAvatar.url} />
              <StyledUsername color={themeColor}>{username}</StyledUsername>
            </StyledHeader>
          }
          position={["bottom right", "bottom left", "top right", "top left"]}
          closeOnDocumentClick
          keepTooltipInside=".tooltipBoundary"
        >
          {(close) => (
            <Card
              onClick={() => {
                openUserChat(sender)
                close()
              }}
              user={profile}
              withStatus={false}
              extraShadow={true}
            >
              <ChatInterestList
                topPadding={10}
                interests={profile.interests}
                showAll
              />
            </Card>
          )}
        </Popup>
      )
    }

    return (
      <Popup
        trigger={
          <StyledHeader>
            {avatar && <StyledAvatar url={avatar.url} />}
            <StyledUsername>{username}</StyledUsername>
          </StyledHeader>
        }
        position={["bottom right", "bottom left", "top right", "top left"]}
        closeOnDocumentClick
        keepTooltipInside=".tooltipBoundary"
      >
        {(close) => (
          <Card
            onClick={() => {
              openUserChat(sender)
              close()
            }}
            avatar={avatar}
            username={username}
            uuid={sender}
            withStatus={false}
            extraShadow={true}
            fetchUserProfileFromServer={fetchUserProfileFromServer}
          >
            <ChatInterestList topPadding={10} interests={[]} showAll />
          </Card>
        )}
      </Popup>
    )
  }

  render() {
    const {
      audioUri,
      imageDataUri,
      imageUri,
      timestamp,
      mine,
      sameSender,
      last,
      position,
      title,
      isInGroupCalling,
    } = this.props

    const isImageMessage = !!(imageUri || imageDataUri)
    const isAudioMessage = !!audioUri
    const isTextMessage = !(imageUri || imageDataUri || audioUri)
    const randomNum = `chat-msg-${Math.random()}`

    const displayHeader =
      (!mine || isInGroupCalling) &&
      (position === "top" || position === "single")

    return (
      <>
        {displayHeader && !isInGroupCalling && this.renderProfile()}
        {isInGroupCalling && displayHeader ? (
          <StyledChatMessage
            mine={!isInGroupCalling ? mine : false}
            sameSender={sameSender}
            last={last}
            position={position}
            timestamp={timestamp}
            hasImage={isImageMessage}
            // title={title}
            isInGroupCalling={true}
            data-tip
            data-for={randomNum}
          >
            <StyledHeaderMessage>
              {this.renderProfile()}
              {isAudioMessage && this.renderAudio()}
              {isImageMessage && this.renderImage()}
              {isTextMessage && this.renderText()}
              {!isAudioMessage && (
                <StyledTimestamp hasImage={isImageMessage}>
                  {timestamp ? timeFormater(timestamp) : "…"}
                </StyledTimestamp>
              )}
            </StyledHeaderMessage>
          </StyledChatMessage>
        ) : (
          <StyledChatMessage
            mine={!isInGroupCalling ? mine : false}
            sameSender={sameSender}
            last={last}
            position={position}
            timestamp={timestamp}
            hasImage={isImageMessage}
            // title={title}
            isInGroupCalling={isInGroupCalling}
            data-tip
            data-for={randomNum}
          >
            {isAudioMessage && this.renderAudio()}
            {isImageMessage && this.renderImage()}
            {isTextMessage && this.renderText()}
            {!isAudioMessage && (
              <StyledTimestamp hasImage={isImageMessage}>
                {timestamp ? timeFormater(timestamp) : "…"}
              </StyledTimestamp>
            )}
          </StyledChatMessage>
        )}
        <Tooltip id={randomNum} title={title} />
      </>
    )
  }
}

GroupChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  imageDataUri: PropTypes.string,
  imageUri: PropTypes.string,
  audioUri: PropTypes.string,
  last: PropTypes.bool.isRequired,
  mine: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.objectOf(PropTypes.string),
  timestamp: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  openUserChat: PropTypes.func,
  title: PropTypes.string.isRequired,
}

GroupChatMessage.defaultProps = {
  audioUri: null,
  imageDataUri: null,
  imageUri: null,
  timestamp: null,
  onChange: null,
}

export default GroupChatMessage

/* eslint-disable react/no-array-index-key */
import { Fragment } from "react"
import PropTypes from "prop-types"
import Linkify from "react-linkify"
import {
  StyledChatMessage,
  StyledLink,
  StyledTimestamp,
  Emoji,
  StyledImageLoaderWrapper,
  MessageWrapper,
  StyledDeleteButton,
  StyledDeleteButtonWrapper,
  ConfirmationWrapper,
  ConfirmationMessageWrapper,
  StyledSelectionButton,
} from "./Styled"
import { timeFormater } from "../../utils/timeUtils"
import Icon from "../Icon"
import AudioPlayer from "../AudioPlayer"
import Image from "./Image.js"
import Popup from "reactjs-popup"
import Modal from "../Modal"
import Tooltip from "../Tooltip"
import { deleteMessage } from "../../redux/actions/chats"
import { useDispatch } from "react-redux"

//import { timeupForMessage } from "../../utils/faye/helpers"

const isEmoji = (part) =>
  (part.charCodeAt(0) >= 55296 && part.charCodeAt(0) <= 56319) ||
  (part.charCodeAt(0) >= 56320 && part.charCodeAt(0) <= 57343)

const resizeEmoticon = (text) => {
  const parts = text.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
  return parts.map((part, key) =>
    isEmoji(part) ? (
      <Emoji key={key}>{part}</Emoji>
    ) : (
      <span key={key}>{part}</span>
    )
  )
}

const ChatMessage = ({
  onChange,
  sameSender,
  last,
  position,
  title,
  message,
  chatId,
  uuid,
  deleted,
}) => {
  const dispatch = useDispatch()
  const { text, timestamp, mine, audioUri, imageDataUri, imageUri, ratio } =
    message

  const renderAudio = () => {
    return audioUri && <AudioPlayer src={audioUri} mine={mine} />
  }

  const renderImage = () => {
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

  const renderText = () => {
    return (
      <Linkify
        component={StyledLink}
        properties={{ target: "_blank", rel: "noopener noreferrer" }}
      >
        {text &&
          resizeEmoticon(deleted && mine ? "You deleted a message" : text)}
      </Linkify>
    )
  }
  const handleDeleteMessage = (chatId, messageUuid) => {
    const payload = { chatId, messageUuid }
    dispatch(deleteMessage(payload))
  }
  const renderDeleteMessageButton = () => {
    return (
      /* eslint-disable */
      <Popup
        trigger={
          <StyledDeleteButtonWrapper>
            <StyledDeleteButton>
              <Icon iconId="delete" />
            </StyledDeleteButton>
          </StyledDeleteButtonWrapper>
        }
        closeOnDocumentClick
        closeOnEscape
        position={["bottom right", "bottom left", "top right", "top left"]}
      >
        {(close) => (
          <Modal
            show={true}
            centered={true}
            opaque={true}
            z-index={9}
            noClickCatcher={true}
          >
            <ConfirmationWrapper>
              <ConfirmationMessageWrapper>
                Are you sure you want to delete the message for everyone?
              </ConfirmationMessageWrapper>
              <StyledSelectionButton
                primary
                onClick={() => handleDeleteMessage(chatId, uuid)}
              >
                Delete
              </StyledSelectionButton>
              <StyledSelectionButton blank onClick={() => close()}>
                Cancel
              </StyledSelectionButton>
            </ConfirmationWrapper>
          </Modal>
        )}
      </Popup>
    )
  }

  const isImageMessage = !!(imageUri || imageDataUri)
  const isAudioMessage = !!audioUri
  const isTextMessage = !(imageUri || imageDataUri || audioUri)
  const randomNum = `chat-msg-${Math.random()}`

  return (
    <MessageWrapper mine={mine}>
      {mine && !deleted && renderDeleteMessageButton()}
      <StyledChatMessage
        mine={mine}
        sameSender={sameSender}
        last={last}
        position={position}
        timestamp={timestamp}
        hasImage={isImageMessage}
        deleted={deleted}
        // title={title == "Invalid Date" ? undefined : title}
        data-tip
        data-for={randomNum}
        data-place={`${isImageMessage ? "left" : "top"}`}
      >
        {isAudioMessage && renderAudio()}
        {isImageMessage && renderImage()}
        {isTextMessage && renderText()}
        {!isAudioMessage && (
          <StyledTimestamp hasImage={isImageMessage}>
            {timestamp ? timeFormater(timestamp) : "…"}
          </StyledTimestamp>
        )}
      </StyledChatMessage>
      <Tooltip id={randomNum} title={title} />
    </MessageWrapper>
  )
}

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  imageDataUri: PropTypes.string,
  imageUri: PropTypes.string,
  audioUri: PropTypes.string,
  last: PropTypes.bool.isRequired,
  mine: PropTypes.bool.isRequired,
  timestamp: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  title: PropTypes.string.isRequired,
}

ChatMessage.defaultProps = {
  audioUri: null,
  imageDataUri: null,
  imageUri: null,
  timestamp: null,
  onChange: null,
  deleted: false,
  mine: false,
}

export default ChatMessage

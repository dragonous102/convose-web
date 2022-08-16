import PropTypes from "prop-types"
import { Fragment, PureComponent } from "react"
import Picker from "@emoji-mart/react"
import ReactTooltip from "react-tooltip"
import { connect } from "react-redux"
import {
  sendMessage,
  startTyping,
  sendImage,
  sendAudio,
  stopTyping,
} from "../../redux/actions/chats"

import {
  StyledTextInput,
  StyledButton,
  StyledButtonContainer,
  StyledForm,
  StyledWrapperOfapeEmojiPicker,
  StyledClickcatcher,
  StyledCopyright,
  StyledTextInputWrapper,
  StyledImageSelector,
  StyledLabel,
  StyledSuggestionText,
  Emoji,
  StyledAvatar,
} from "./Styled"
import Icon from "../Icon"
import AudioRecorder from "../AudioRecorder"
import { UserShape } from "../../utils/shapes"
import { canRecordAudio } from "../../utils/browserUtils"
import { Mention } from "react-mentions"
import { emojis, emojiShortcuts } from "./emoji"
import { StyleConst } from "../../const"
import GridGif from "./GridGif"
import { getBase64, loadImage } from "../../api/utils"
import Tooltip from "../Tooltip"
import { browserIsOffline } from "../../redux/actions/browser"
import { queryMentionPerson } from "../../redux/actions/group"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import { makeGetFeature } from "../../redux/selectors/features"
import {
  FEATURE_CHAT_MESSAGE_TYPE_AUDIO,
  FEATURE_CHAT_MESSAGE_TYPE_IMAGE,
  typingTimeout,
} from "../../redux/constants"
import { getProfile } from "../../redux/reducers"
const neverMatchingRegex = /($a)/

const mentionInputInjectStyle = {
  display: "block",
  highlighter: {
    border: " none",
  },
  input: {
    padding: 1,
    border: "none",
    width: "85%",
    top: 2,
    left: 14,
    outline: "0px solid transparent",
  },
  suggestions: {
    marginTop: 30,
    backgroundColor: "white",
    zIndex: 1000,
    border: "none",
    borderRadius: 8,
    boxShadow: StyleConst.SHADOWS.BOX_SHADOW_CARD_OPENED,
    position: "absolute",
    top: -220,
    left: "auto",
    overflow: "auto",
    scrollbarWidth: 1,
    padding: "10px 0",
    width: 320,
    height: 180,
    item: {
      padding: "0 10px",
      "&focused": {
        backgroundColor: "#19aaee",
      },
    },
  },
}

class ChatMessageForm extends PureComponent {
  constructor(props) {
    super(props)
    this.inputRef = null
    this.inputContainerRef = null
    this.setTextInputRef = (element) => {
      this.textInput = element
    }

    this.focusTextInput = () => {
      if (this.textInput) this.textInput.focus()
    }
    this.state = {
      emojiVisible: false,
      gifVisible: false,
      message: "",
      isTyping: false,
      isRecordingAudio: false,
      emojis: emojis,
      mentionText: "",
      mentionedUsers: [],
      mentionRequested: false,
      uniqIdChat: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageSelect = this.handleImageSelect.bind(this)
    this.handleGifSelect = this.handleGifSelect.bind(this)
    this.handleStopTyping = this.handleStopTyping.bind(this)
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this)
    this.toggleGifPicker = this.toggleGifPicker.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleEmojiSelect = this.handleEmojiSelect.bind(this)
    this.handleStartAudioRecording = this.handleStartAudioRecording.bind(this)
    this.handleStoppedAudioRecording =
      this.handleStoppedAudioRecording.bind(this)
    this.handleSubmitAudio = this.handleSubmitAudio.bind(this)
    this.handleEmojiShortcut = this.handleEmojiShortcut.bind(this)
    this.queryEmojis = this.queryEmojis.bind(this)
    this.renderEmojiSuggestion = this.renderEmojiSuggestion.bind(this)
    this.renderMentionSuggestion = this.renderMentionSuggestion.bind(this)
    this.handleOnPasteImage = this.handleOnPasteImage.bind(this)
    this.queryMentions = this.queryMentions.bind(this)
    this.checkOnline = this.checkOnline.bind(this)
  }

  handleStopTyping() {
    const { isTyping } = this.state
    if (isTyping) {
      this.setState({
        isTyping: false,
      })
      clearTimeout(this.typingTimeout)
      const {
        myProfile: { uuid },
        chatId,
        stopTyping,
      } = this.props
      const message = { sender: uuid }
      stopTyping({ chatId, message })
    }
  }

  handleStartTyping() {
    const {
      myProfile: { uuid },
      chatId,
      startTyping,
    } = this.props
    const message = { sender: uuid }
    startTyping({ chatId, message })
  }
  componentDidUpdate(prevProps, prevState) {
    const { isTyping } = this.state
    if (!prevState.isTyping && isTyping) {
      this.handleStartTyping()
    }
  }

  checkOnline() {
    const online = window.navigator.onLine
    if (!online) {
      const { browserIsOffline } = this.props
      browserIsOffline()
      return false
    }
    return true
  }

  toggleEmojiPicker() {
    this.setState((prevState) => ({ emojiVisible: !prevState.emojiVisible }))
  }
  toggleGifPicker() {
    this.setState((prevState) => ({ gifVisible: !prevState.gifVisible }))
  }

  handleEmojiSelect(e) {
    console.log(e)
    const { message } = this.state
    const newMessage = message + e.native
    this.setState({
      emojiVisible: false,
      message: newMessage,
    })
    this.focusTextInput()
  }

  handleGifSelect(url, ratio) {
    this.setState({
      gifVisible: false,
    })

    this.handleSendImage({ data: url, ratio })

    this.focusTextInput()
  }
  handleSendImage(data) {
    const {
      myProfile: { uuid },
      chatId,
      sendImage,
    } = this.props
    const message = { ...data, sender: uuid }
    sendImage({ message, chatId })
  }
  handleEmojiShortcut(value, onSubmit = false) {
    let words = onSubmit ? value.trim().split(" ") : value.split(/(\s+)/)
    const shouldSearcheEmoji =
      (onSubmit && value) || (!onSubmit && words.length > 2)
    if (!shouldSearcheEmoji) return value
    const lastWordIndex = onSubmit ? -1 : -3
    const lastword = words[words.length + lastWordIndex]
    if (emojiShortcuts.has(lastword)) {
      const emoji = emojiShortcuts.get(lastword)
      const joinWord = onSubmit ? " " : ""
      words.splice(lastWordIndex, 1, emoji.trim())
      return words.join(joinWord)
    } else {
      return value
    }
  }

  queryEmojis(query, _callback) {
    if (query.length === 0) return
    const matches = this.state.emojis.filter((emoji) =>
      emoji.name.startsWith(query.toLowerCase())
    )
    this.setState({
      uniqIdChat: this.props.chatId,
    })
    return matches.map((emoji) => ({
      id: emoji.code,
      name: emoji.name,
    }))
  }

  queryMentions(query, callback) {
    const { queryMentionPerson, chatId } = this.props
    const prevrequest = this.state.mentionRequested
    this.setState({
      mentionRequested: true,
      uniqIdChat: this.props.chatId,
    })
    callback(this.state.mentionedUsers)
    queryMentionPerson({ chatId, message: query, prevrequest })
      .then((res) => {
        const result = res.map((chatUser) => ({
          id: chatUser.uuid,
          display: chatUser.username,
          avatar: chatUser.avatar,
          theme_color: chatUser.theme_color,
        }))
        this.setState(
          {
            mentionedUsers: result,
            mentionRequested: false,
          },
          () => callback(this.state.mentionedUsers)
        )
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          mentionRequested: false,
        })
      })
  }

  handleChange(e, newValue, mentionText, mentions) {
    const { message } = this.state
    const value = e ? e.target.value : message
    const emojiConvertedValue = this.handleEmojiShortcut(value)
    clearTimeout(this.typingTimeout)
    this.typingTimeout = setTimeout(this.handleStopTyping, typingTimeout)
    this.setState({
      message: emojiConvertedValue,
      isTyping: true,
      mentionText,
      mentions,
    })
  }

  handleKeyDown(e) {
    const { emojiVisible } = this.state
    if (emojiVisible && e.key === "Escape") {
      this.toggleEmojiPicker()
    }
  }
  handleSendMessage(data) {
    const {
      myProfile: { uuid },
      chatId,
      sendMessage,
    } = this.props

    const message = { data, sender: uuid }
    sendMessage({ message, chatId })
  }
  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    //if (!this.checkOnline()) return
    const { message, mentionText, mentions } = this.state
    const newMessage = this.handleEmojiShortcut(message, true)
    if (message.length > 0) {
      this.handleStopTyping()

      this.handleSendMessage(newMessage, mentionText, mentions)
      this.setState({ message: "", mentionText: "", mentions: [] })
      this.focusTextInput()
    }
  }
  handleOnPasteImage(event) {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items
    let blob = null
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile()
      }
    }
    if (blob !== null) {
      getBase64(blob).then((data) => {
        loadImage(data)
          .then((img) => {
            const ratio = img.height / img.width
            this.handleSendImage({ data, ratio })
          })
          .catch((err) => console.error(err))
      })
    }
  }

  handleImageSelect(e) {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.nativeEvent.target

    getBase64(files[0]).then((data) => {
      loadImage(data)
        .then((img) => {
          const ratio = img.height / img.width
          this.handleSendImage({ data, ratio })
        })
        .catch((err) => console.error(err))
    })
  }

  handleStartAudioRecording() {
    this.setState({
      isRecordingAudio: true,
    })
  }

  handleStoppedAudioRecording() {
    this.setState({
      isRecordingAudio: false,
    })
  }

  handleSubmitAudio(blob, metaData) {
    this.handleStoppedAudioRecording()
    const { sendAudio, chatId, myProfile } = this.props
    const dataUri = URL.createObjectURL(blob)
    getBase64(blob).then((data) => {
      const { uuid: sender } = myProfile
      const message = { data, sender, ...metaData }
      sendAudio({ message, chatId, dataUri })
    })
  }

  renderImageSelectorButton() {
    const { enableImage, isMobileOrTabletView, chatId } = this.props
    const { message, isRecordingAudio } = this.state
    const userHasTyped = message.length > 0

    if (
      enableImage &&
      !isRecordingAudio &&
      (!isMobileOrTabletView || (isMobileOrTabletView && !userHasTyped))
    ) {
      return (
        <>
          <StyledButton data-tip data-for="fileTooltip">
            <StyledLabel htmlFor={chatId}>
              <Icon
                iconId="image"
                width={isMobileOrTabletView ? "20px" : "17px"}
              />
              <StyledImageSelector
                type="file"
                id={chatId}
                onChange={this.handleImageSelect}
              />
            </StyledLabel>
          </StyledButton>
          <Tooltip id="fileTooltip" title="Upload image" />
        </>
      )
    }
    return null
  }

  renderAudioRecorderButton() {
    const { enableAudio, isMobileOrTabletView } = this.props
    const { isRecordingAudio, message } = this.state
    const userHasTyped = message.length > 0

    if (
      enableAudio &&
      (!isMobileOrTabletView || (isMobileOrTabletView && !userHasTyped))
    ) {
      if (canRecordAudio && isRecordingAudio) {
        return (
          <AudioRecorder
            onSubmitRecording={this.handleSubmitAudio}
            onCancelRecording={this.handleStoppedAudioRecording}
          />
        )
      }
      return (
        <>
          <StyledButton
            type="button"
            data-tip
            data-for="audioTooltip"
            {...(canRecordAudio()
              ? {
                  onClick: () => {
                    this.handleStartAudioRecording()
                    ReactTooltip.hide(this.hoverRef)
                  },
                }
              : {
                  onClick: () => {
                    ReactTooltip.show(this.clickRef)
                  },
                  onMouseLeave: () => {
                    ReactTooltip.hide(this.clickRef)
                  },
                  // title:
                  //   'Your Browser does not support the way Convose records audio messages, ' +
                  //   'sorry. Try a modern version of Chrome or Firefox instead!',
                })}
          >
            <Icon
              iconId="microphone"
              width={isMobileOrTabletView ? "20px" : "17px"}
            />
          </StyledButton>
          <Tooltip id="audioTooltip" title="">
            <p>
              Audio message only works <br />
              on Chrome or Firefox
            </p>
          </Tooltip>
        </>
      )
    }
    return null
  }

  renderSubmitButton() {
    const { isMobileOrTabletView } = this.props
    const { message } = this.state
    const userHasTyped = message.length > 0

    if (isMobileOrTabletView && userHasTyped) {
      return (
        <StyledButton
          style={{
            color: "#359dff",
            fontSize: "17px",
            width: "50px",
            backgroundColor: "transparent",
          }}
          type="submit"
        >
          Send
        </StyledButton>
      )
    }
    return null
  }

  renderEmojiSuggestion(emoji, search, highlightedDisplay, index, focused) {
    if (this.props.chatId !== this.state.uniqIdChat) return null
    return (
      <>
        <Emoji>{emoji.id}</Emoji>
        <StyledSuggestionText focused={focused}>
          {emoji.name}
        </StyledSuggestionText>
      </>
    )
  }

  renderMentionSuggestion(
    chatUser,
    search,
    highlightedDisplay,
    index,
    focused
  ) {
    return (
      <>
        <StyledAvatar url={chatUser.avatar.url} />
        <StyledSuggestionText color={chatUser.theme_color} focused={focused}>
          {chatUser.display}
        </StyledSuggestionText>
      </>
    )
  }

  render() {
    const { emojiVisible, gifVisible, message } = this.state
    const {
      autoFocus,
      // emojiResolution,
      isInGroupCalling,
      isMobileOrTabletView,
      fullScreenCall,
    } = this.props
    const userHasTyped = message.length > 0

    return (
      <div style={{ width: isInGroupCalling ? "70%" : "100%" }}>
        <StyledForm
          onKeyDown={this.handleKeyDown}
          onSubmit={this.handleSubmit}
          isInGroupCalling={isInGroupCalling}
          fullScreenCall={fullScreenCall}
        >
          <StyledTextInputWrapper
            ref={(el) => {
              this.inputContainerRef = el
            }}
            fullScreenCall={fullScreenCall}
          >
            <StyledTextInput
              isMobileOrTabletView={isMobileOrTabletView && userHasTyped}
              fullScreenCall={fullScreenCall}
              placeholder="Type here..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="true"
              name="message"
              value={message}
              onChange={this.handleChange}
              autoFocus={autoFocus}
              inputRef={this.setTextInputRef}
              allowSuggestionsAboveCursor={true}
              suggestionsPortalHost={this.inputContainerRef}
              singleLine={true}
              style={mentionInputInjectStyle}
              allowSpaceInQuery={true}
              onPaste={this.handleOnPasteImage}
            >
              <Mention
                trigger="@"
                markup="@[__display__](__id__)"
                style={{
                  backgroundColor: StyleConst.COLORS.MENTION_BACKGROUND,
                }}
                displayTransform={(id, display) => `@${display}`}
                data={this.queryMentions}
                appendSpaceOnAdd={true}
                renderSuggestion={this.renderMentionSuggestion}
              />
              <Mention
                trigger=":"
                data={this.queryEmojis}
                markup="__id__"
                appendSpaceOnAdd={true}
                renderSuggestion={this.renderEmojiSuggestion}
                regex={neverMatchingRegex}
              />
            </StyledTextInput>

            <StyledButtonContainer
              isMobileOrTabletView={isMobileOrTabletView && userHasTyped}
            >
              {(!isMobileOrTabletView ||
                (isMobileOrTabletView && !userHasTyped)) && (
                <>
                  <StyledButton
                    type="button"
                    onClick={this.toggleGifPicker}
                    data-tip
                    data-for="gifTooltip"
                  >
                    <Icon
                      iconId="gif"
                      width={isMobileOrTabletView ? "20px" : "17px"}
                    />
                  </StyledButton>
                  <Tooltip id="gifTooltip" title="Choose a GIF" />
                  <StyledButton
                    type="button"
                    onClick={this.toggleEmojiPicker}
                    data-tip
                    data-for="emojiTooltip"
                  >
                    <Icon
                      iconId="smile"
                      width={isMobileOrTabletView ? "20px" : "17px"}
                    />
                  </StyledButton>
                  <Tooltip id="emojiTooltip" title="Choose an emoji" />
                </>
              )}

              {this.renderAudioRecorderButton()}
              {this.renderImageSelectorButton()}
              {this.renderSubmitButton()}
            </StyledButtonContainer>
          </StyledTextInputWrapper>
        </StyledForm>
        {emojiVisible && (
          <Fragment>
            <StyledClickcatcher onClick={this.toggleEmojiPicker} />
            <StyledWrapperOfapeEmojiPicker>
              <Picker set="google" onEmojiSelect={this.handleEmojiSelect} />
              <StyledCopyright>
                Emoji Artwork provided by
                <a href="http://www.joypixels.com" target="blank">
                  Joypixels
                </a>
              </StyledCopyright>
            </StyledWrapperOfapeEmojiPicker>
          </Fragment>
        )}
        {gifVisible && (
          <Fragment>
            <StyledClickcatcher onClick={this.toggleGifPicker} />
            <StyledWrapperOfapeEmojiPicker>
              <GridGif handleGifSelect={this.handleGifSelect} />
              <StyledCopyright>Gifs by Tenor</StyledCopyright>
            </StyledWrapperOfapeEmojiPicker>
          </Fragment>
        )}
      </div>
    )
  }
}

ChatMessageForm.propTypes = {
  group: UserShape,
  sendMessage: PropTypes.func.isRequired,
  sendAudio: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired,
  browserIsOffline: PropTypes.func.isRequired,
  startTyping: PropTypes.func.isRequired,
  stopTyping: PropTypes.func.isRequired,
  // emojiResolution: PropTypes.number,
  chatId: PropTypes.string.isRequired,
  enableImage: PropTypes.bool.isRequired,
  enableAudio: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

ChatMessageForm.defaultProps = {
  autoFocus: true,
  // emojiResolution: 64,
}

const mapDispatchToProps = {
  sendMessage,
  sendImage,
  sendAudio,
  startTyping,
  stopTyping,
  browserIsOffline,
  queryMentionPerson,
}

const makeMapStateToProps = () => {
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getFeature = makeGetFeature()

  return (state) => ({
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    enableImage: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_IMAGE),
    enableAudio: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_AUDIO),
    myProfile: getProfile(state),
  })
}
export default connect(makeMapStateToProps, mapDispatchToProps)(ChatMessageForm)

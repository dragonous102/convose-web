import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { history as historyShape } from "react-router-prop-types"
import { Transition } from "react-spring/renderprops"
import {
  Card,
  LoadingSplash,
  MessageShape,
  ProfileShape,
  UserShape,
  ChatContent,
} from "../../components"
import { matchInterests } from "../../utils/dataMappers"
import {
  sendMessage,
  startTyping,
  stopTyping,
  openChat,
  closeChat,
  sendImage,
  fetchMessages,
  sendAudio,
  showChatProfile,
  closeChatProfile,
  fetchParticipants,
} from "../../redux/actions/chats"
import { fetchUserProfileFromServer } from "../../redux/actions/users"
import { queryMentionPerson } from "../../redux/actions/group"
import {
  makeGetHistoryIsLoaded,
  makeGetIsInitiator,
  makeGetIsTyping,
  makeGetMessagesByChatId,
  makeGetShowChatProfile,
  makeGetChatscrolled,
} from "../../redux/selectors/chats"
import {
  makeGetIsActive,
  makeGetUserByUuid,
  makeGetGroupByChatId,
} from "../../redux/selectors/users"
import { StyledAbsoluteCenteredContainer } from "../../global/styles"
import { getProfile, getProfiles } from "../../redux/reducers"
import { browserIsOffline } from "../../redux/actions/browser"
import {
  FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD,
  FEATURE_CHAT_MESSAGE_TYPE_AUDIO,
  FEATURE_CHAT_MESSAGE_TYPE_IMAGE,
  LOADING_HISTORY,
} from "../../redux/constants"
import { makeGetFeature } from "../../redux/selectors/features"

const ChatboxMobile = (props) => {
  const {
    user,
    myProfile,
    showProfile,
    chatScrolled,
    messages,
    isInitiator,
    partnerIsTyping,
    partnerIsActive,
    historyIsLoaded,
    enableAudio,
    enableImage,
    enableAutoScrollOnChatImageLoad,
  } = props
  const [chatScroll, setChatScroll] = useState(0)
  useEffect(() => {
    const { openChat, chatId, closeChat } = props
    openChat({ chatId })
    return () => {
      closeChat({ chatId })
    }
  }, [])

  const updateScroll = (scrollVal) => {
    setChatScroll(scrollVal)
  }

  const closeChat = () => {
    const { history } = props
    history.goBack()
  }

  const handleStartTyping = () => {
    const { chatId, myProfile, startTyping } = props
    const { uuid: sender } = myProfile
    const message = { sender }
    startTyping({ chatId, message })
  }

  const handleStopTyping = () => {
    const { chatId, myProfile, stopTyping } = props
    const { uuid: sender } = myProfile
    const message = { sender }

    stopTyping({ chatId, message })
  }

  const handleSendMessage = (data) => {
    const { chatId, myProfile, sendMessage } = props
    const { uuid: sender } = myProfile
    const message = { data, sender }

    sendMessage({ message, chatId })
  }

  const handleSendImage = (data) => {
    const { chatId, myProfile, sendImage } = props
    const { uuid: sender } = myProfile
    const message = { ...data, sender }

    sendImage({ message, chatId })
  }

  const handleSendAudio = ({ data, dataUri }) => {
    const { chatId, myProfile, sendAudio } = props
    const { uuid: sender } = myProfile
    const message = { data, sender }
    sendAudio({ message, chatId, dataUri })
  }

  const handleFetchMessages = () => {
    const { chatId, fetchMessages } = props

    fetchMessages({ chatId })
  }

  const handleProfileImageClick = () => {
    const { chatId, closeChatProfile, showChatProfile, showProfile } = props
    if (showProfile) {
      closeChatProfile({ chatId })
    } else {
      showChatProfile({ chatId, chatScrolled: chatScroll })
    }
  }
  return (
    <Transition
      items={user}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {(user) =>
        user
          ? (styleProps) => (
              <Card
                user={user}
                showCloseButton
                {...(showProfile && {
                  onClick: handleProfileImageClick,
                })}
                onClose={closeChat}
                isTyping={partnerIsTyping}
                isActive={partnerIsActive}
                style={styleProps}
                isOpen
                onProfileImageClick={handleProfileImageClick}
                isMobileOrTabletView
              >
                <ChatContent
                  updateScroll={updateScroll}
                  sharedInterests={matchInterests({
                    userInterests: user.interests,
                    ownInterests: myProfile.interests,
                  })}
                  interests={user.interests}
                  showProfile={showProfile}
                  chatScrolled={chatScrolled}
                  messages={messages}
                  historyIsLoaded={historyIsLoaded}
                  historyLoadingText={LOADING_HISTORY}
                  onSendMessage={handleSendMessage}
                  onSendImage={handleSendImage}
                  onSendAudio={handleSendAudio}
                  autoFocus={isInitiator}
                  onStartTyping={handleStartTyping}
                  onStopTyping={handleStopTyping}
                  fetchMessages={handleFetchMessages}
                  enableAudio={enableAudio}
                  enableImage={enableImage}
                  enableAutoScrollOnImageLoad={enableAutoScrollOnChatImageLoad}
                  isMobileOrTabletView
                />
              </Card>
            )
          : (styleProps) => (
              <StyledAbsoluteCenteredContainer style={styleProps}>
                <LoadingSplash />
              </StyledAbsoluteCenteredContainer>
            )
      }
    </Transition>
  )
}

ChatboxMobile.propTypes = {
  openChat: PropTypes.func.isRequired,
  closeChat: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  user: UserShape,
  showProfile: PropTypes.bool.isRequired,
  showChatProfile: PropTypes.func.isRequired,
  chatScrolled: PropTypes.number.isRequired,
  closeChatProfile: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired,
  sendAudio: PropTypes.func.isRequired,
  myProfile: ProfileShape.isRequired,
  messages: PropTypes.arrayOf(MessageShape),
  historyIsLoaded: PropTypes.bool.isRequired,
  history: historyShape.isRequired,
  chatId: PropTypes.string.isRequired,
  isInitiator: PropTypes.bool.isRequired,
  startTyping: PropTypes.func.isRequired,
  stopTyping: PropTypes.func.isRequired,
  partnerIsTyping: PropTypes.bool.isRequired,
  partnerIsActive: PropTypes.bool.isRequired,
  enableAudio: PropTypes.bool.isRequired,
  enableImage: PropTypes.bool.isRequired,
  enableAutoScrollOnChatImageLoad: PropTypes.bool.isRequired,
  fetchParticipants: PropTypes.func.isRequired,
  queryMentionPerson: PropTypes.func.isRequired,
}

ChatboxMobile.defaultProps = {
  messages: [],
  user: null,
}

const mapActionsToProps = {
  openChat,
  closeChat,
  sendMessage,
  sendImage,
  sendAudio,
  startTyping,
  stopTyping,
  fetchMessages,
  showChatProfile,
  closeChatProfile,
  browserIsOffline,
  fetchUserProfileFromServer,
  fetchParticipants,
  queryMentionPerson,
}

const makeMapStateToProps = () => {
  const getShowChatProfile = makeGetShowChatProfile()
  const getChatscrolled = makeGetChatscrolled()
  const getUserByUuid = makeGetUserByUuid()
  const getMessagesByChatId = makeGetMessagesByChatId()
  const getIsInitiator = makeGetIsInitiator()
  const getIsTyping = makeGetIsTyping()
  const getIsActive = makeGetIsActive()
  const getHistoryIsLoaded = makeGetHistoryIsLoaded()
  const getFeature = makeGetFeature()
  const getGroupByChatId = makeGetGroupByChatId()
  return (state, props) => ({
    myProfile: getProfile(state),
    profiles: getProfiles(state),
    showProfile: getShowChatProfile(state, props),
    chatScrolled: getChatscrolled(state, props),
    user: getUserByUuid(state, props),
    isInitiator: getIsInitiator(state, props),
    messages: getMessagesByChatId(state, props),
    partnerIsTyping: getIsTyping(state, props),
    partnerIsActive: getIsActive(state, props),
    historyIsLoaded: getHistoryIsLoaded(state, props),
    enableImage: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_IMAGE),
    enableAudio: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_AUDIO),
    enableAutoScrollOnChatImageLoad: getFeature(
      state,
      FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD
    ),
    group: getGroupByChatId(state, props),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapActionsToProps)(ChatboxMobile)
)

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { history as historyShape } from "react-router-prop-types"
import { Transition } from "react-spring/renderprops"
import {
  LoadingSplash,
  MessageShape,
  ProfileShape,
  UserShape,
  GroupChatContent,
  GroupCard,
} from "../../components"
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
  triggerOpenChat,
} from "../../redux/actions/chats"
import { fetchUserProfileFromServer } from "../../redux/actions/users"
import {
  queryMentionPerson,
  groupChatSelect,
  groupChatAdd,
  groupChatLeave,
} from "../../redux/actions/group"
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
import { fetchPartners } from "../../redux/actions/partners"
import {
  FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD,
  FEATURE_CHAT_MESSAGE_TYPE_AUDIO,
  FEATURE_CHAT_MESSAGE_TYPE_IMAGE,
  LOADING_HISTORY,
  NEW_UNREAD_MESSAGES,
  PARTNERS_FETCH_LIMIT,
} from "../../redux/constants"
import { makeGetFeature } from "../../redux/selectors/features"
import { makeGroupAvatar, getChatId } from "../../utils/faye/helpers"
import { makeGetPartners } from "../../redux/selectors/partners"
import { makeGetGroupInfo } from "../../redux/selectors/calling"

const GroupChatboxMobile = (props) => {
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
    chatId,
    profiles,
    group,
    browserIsOffline,
    fetchUserProfileFromServer,
    fetchParticipants,
    queryMentionPerson,
    groupChatAdd,
    groupChatLeave,
    groupChatSelect,
    partners,
    fetchPartners,
    groupInfo,
    triggerOpenChat,
    myUuid,
    history,
  } = props
  const [chatScroll, setChatScroll] = useState(0)
  useEffect(() => {
    const { openChat, chatId, closeChat } = props
    openChat({ chatId })
    return () => {
      closeChat({ chatId })
    }
  }, [])
  const openUserChat = (uuid) => {
    let chatId = getChatId({ chatPartnerUuid: uuid, myUuid: myProfile.uuid })
    history.push(`/chat/${chatId}`)
  }
  const updateScroll = (scrollVal) => {
    setChatScroll(scrollVal)
  }

  const closeChat = () => {
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
  const handleGroupChatAddClick = () => {
    if (!partners || partners.length < 1) {
      fetchPartners({
        from: 0,
        limit: PARTNERS_FETCH_LIMIT,
        myUuid: myProfile.uuid,
      })
    }
    groupChatAdd(chatId)
  }
  const closeChatBox = () => {
    if (chatId) {
      const payload = { chatId }
      closeChat(payload)
    }
  }

  const handleLeaveGroupChatClick = () => {
    const { groupChatLeave } = props
    groupChatLeave(chatId)
  }

  if (group && group?.participants) {
    const images = makeGroupAvatar(group)
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
                <GroupCard
                  avatar={images}
                  group={group}
                  showCloseButton
                  onClick={showProfile ? handleProfileImageClick : openChat}
                  onClose={closeChatBox}
                  onGroupChatClick={handleGroupChatAddClick}
                  onLeaveGroupChatClick={handleLeaveGroupChatClick}
                  isTyping={partnerIsTyping}
                  isActive
                  isOpen
                  onProfileImageClick={handleProfileImageClick}
                  onStartGroupCall={() => {}}
                  isInGroupCalling={false}
                  onJoinOngoingCallClick={() => {}}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  groupInfo={groupInfo}
                  style={styleProps}
                  chatId={chatId}
                >
                  <GroupChatContent
                    openUserChat={openUserChat}
                    toggleChatParticipant={handleProfileImageClick}
                    profiles={profiles}
                    group={group}
                    showProfile={showProfile}
                    messages={messages}
                    historyIsLoaded={historyIsLoaded}
                    historyLoadingText={LOADING_HISTORY}
                    unreadMessagesText={NEW_UNREAD_MESSAGES}
                    chatScrolled={chatScrolled}
                    updateScroll={updateScroll}
                    fetchMessages={handleFetchMessages}
                    onSendMessage={handleSendMessage}
                    browserIsOffline={browserIsOffline}
                    fetchUserProfileFromServer={fetchUserProfileFromServer}
                    onSendImage={handleSendImage}
                    onSendAudio={handleSendAudio}
                    autoFocus={isInitiator}
                    onStartTyping={handleStartTyping}
                    onStopTyping={handleStopTyping}
                    enableAudio={enableAudio}
                    enableImage={enableImage}
                    enableAutoScrollOnImageLoad={
                      enableAutoScrollOnChatImageLoad
                    }
                    isMobileOrTabletView={true}
                    myProfile={myProfile}
                    fetchParticipants={fetchParticipants}
                    queryMentionPerson={queryMentionPerson}
                    chatId={chatId}
                  />
                </GroupCard>
              )
            : (styleProps) => (
                <StyledAbsoluteCenteredContainer style={styleProps}>
                  <LoadingSplash />
                </StyledAbsoluteCenteredContainer>
              )
        }
      </Transition>
    )
  } else {
    return null
  }
}

GroupChatboxMobile.propTypes = {
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
  partnerIsTyping: PropTypes.object.isRequired,
  partnerIsActive: PropTypes.bool.isRequired,
  enableAudio: PropTypes.bool.isRequired,
  enableImage: PropTypes.bool.isRequired,
  enableAutoScrollOnChatImageLoad: PropTypes.bool.isRequired,
  fetchParticipants: PropTypes.func.isRequired,
  queryMentionPerson: PropTypes.func.isRequired,
  groupChatAdd: PropTypes.func.isRequired,
}

GroupChatboxMobile.defaultProps = {
  messages: [],
  isOpen: false,
  user: null,
  group: null,
  isInCallingScreen: false,
  groupInfo: {},
}

const mapActionsToProps = {
  openChat,
  triggerOpenChat,
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
  groupChatSelect,
  groupChatAdd,
  groupChatLeave,
  fetchPartners,
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
  const getPartners = makeGetPartners()
  const getGroupInfo = makeGetGroupInfo()
  return (state, props) => ({
    myProfile: getProfile(state),
    profiles: getProfiles(state),
    showProfile: getShowChatProfile(state, props),
    chatScrolled: getChatscrolled(state, props),
    groupInfo: getGroupInfo(state),
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
    partners: getPartners(state),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapActionsToProps)(GroupChatboxMobile)
)

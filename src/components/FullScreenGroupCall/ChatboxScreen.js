/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { history as historyShape } from "react-router-prop-types"
import {
  GroupChatContent,
  //GroupCard,
  MessageShape,
  ProfileShape,
  UserShape,
} from ".."
import {
  makeGetHistoryIsLoaded,
  makeGetIsChatOpen,
  makeGetIsInitiator,
  makeGetIsTyping,
  makeGetMessagesByChatId,
  makeGetShowChatProfile,
  makeGetChatscrolled,
  makeGetIsInCallingScreen,
  makeGetIsCaller,
} from "../../redux/selectors/chats"
import {
  sendMessage,
  startTyping,
  stopTyping,
  closeChat,
  openChat,
  sendImage,
  fetchMessages,
  sendAudio,
  showChatProfile,
  closeChatProfile,
  fetchParticipants,
  triggerOpenChat,
} from "../../redux/actions/chats"
import {
  groupChatSelect,
  groupChatAdd,
  groupChatLeave,
  queryMentionPerson,
} from "../../redux/actions/group"
import {
  makeGetIsGroupActive,
  makeGetUserByUuid,
  makeGetGroupByChatId,
} from "../../redux/selectors/users"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import { getProfile, getProfiles } from "../../redux/reducers"
import { makeGetFeature } from "../../redux/selectors/features"
import {
  FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD,
  FEATURE_CHAT_MESSAGE_TYPE_AUDIO,
  FEATURE_CHAT_MESSAGE_TYPE_IMAGE,
  LOADING_HISTORY,
  NEW_UNREAD_MESSAGES,
} from "../../redux/constants"
import {
  startedCall,
  callAccepted,
  callCancelled,
  callEnded,
} from "../../redux/actions/calling"
import { setIsInCallingScreen, setIsCaller } from "../../redux/actions/calling"

import { getChatId } from "../../utils/faye/helpers"

import { fetchPartners } from "../../redux/actions/partners"
import { fetchUserProfileFromServer } from "../../redux/actions/users"
import { browserIsOffline } from "../../redux/actions/browser"
import { makeGetPartners } from "../../redux/selectors/partners"
import { makeGetGroupInfo } from "../../redux/selectors/calling"
import { UploadDropImage } from "../ChatMessageForm"

const ChatboxScreen = (props) => {
  const [state, setState] = useState({
    isBackToCall: true,
    isAudioMuted: true,
    isVideoMuted: true,
    isAccepted: false,
    isCaller: false,
    images: [],
    isGroupCallingHeaderHovered: false,
    isCallingMinimized: false,
    hosts: {},
    chatScroll: 0,
    isLoading: true,
  })
  const {
    isBackToCall,
    isAudioMuted,
    isVideoMuted,
    isAccepted,
    images,
    isGroupCallingHeaderHovered,
    isCallingMinimized,
    hosts,
    chatScroll,
    isLoading,
  } = state
  const {
    group,
    isOpen,
    showProfile,
    messages,
    isInitiator,
    historyIsLoaded,
    enableAudio,
    enableImage,
    enableAutoScrollOnChatImageLoad,
    isMobileOrTabletView,
    chatId,
    myProfile,
    fetchParticipants,
    queryMentionPerson,
    chatScrolled,
    browserIsOffline,
    fetchUserProfileFromServer,
    profiles,
    sendMessage,
    myUuid,
    history,
    sendAudio,
    sendImage,
    showChatProfile,
    closeChatProfile,
    triggerOpenChat,
    startTyping,
    stopTyping,
    fetchMessages,
  } = props

  const openChat = () => {
    if (isMobileOrTabletView) {
      history.push(`/chat/${chatId}`)
    } else {
      history.push(`/`)
    }
    if (!isMobileOrTabletView && !isOpen && chatId) {
      window.pushlogs && console.log("addOpenChat for ", chatId)
      const payload = { chatId }
      openChat(payload)
    }
  }
  const openUserChat = (uuid) => {
    let chatId = getChatId({ chatPartnerUuid: uuid, myUuid })
    triggerOpenChat({
      chatId,
      partnerUuid: uuid,
    })
  }

  const handleStartTyping = () => {
    const { uuid: sender } = myProfile
    const message = { sender }

    startTyping({ chatId, message })
  }

  const handleStopTyping = () => {
    const { chatId, myProfile } = props
    const { uuid: sender } = myProfile
    const message = { sender }

    stopTyping({ chatId, message })
  }

  const handleSendMessage = (data, mentionText, mentions) => {
    const { uuid: sender, avatar, username: senderUsername } = myProfile
    const mentionedIds =
      mentions.length > 0 ? mentions.map((mention) => mention.id) : []
    const message =
      mentionedIds.length > 0
        ? { data, sender, avatar, senderUsername, mentionText, mentionedIds }
        : { data, sender, avatar, senderUsername }
    sendMessage({ message, chatId })
  }

  const handleSendImage = (data) => {
    const { uuid: sender } = myProfile
    const message = { ...data, sender }

    sendImage({ message, chatId })
  }

  const handleSendAudio = ({ data, dataUri }) => {
    const { uuid: sender } = myProfile
    const message = { data, sender }
    sendAudio({ message, chatId, dataUri })
  }

  const handleFetchMessages = () => {
    fetchMessages({ chatId })
  }

  const handleProfileImageClick = () => {
    if (showProfile) {
      closeChatProfile({ chatId })
    } else {
      showChatProfile({ chatId, chatScrolled: state.chatScroll })
    }
  }
  const updateScroll = (scroll) => {
    setState({ ...state, chatscrolled: scroll })
  }
  useEffect(() => handleFetchMessages(), [])
  if (!group?.participants) {
    return null
  }
  return (
    <UploadDropImage isOpen={true} onSendImage={handleSendImage}>
      <GroupChatContent
        openUserChat={openUserChat}
        toggleChatParticipant={handleProfileImageClick}
        fullScreenCall={1}
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
        enableAutoScrollOnImageLoad={enableAutoScrollOnChatImageLoad}
        isMobileOrTabletView={isMobileOrTabletView}
        isInGroupCalling={false}
        myProfile={myProfile}
        fetchParticipants={fetchParticipants}
        queryMentionPerson={queryMentionPerson}
        chatId={chatId}
      />
    </UploadDropImage>
  )
}

ChatboxScreen.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired,
  sendAudio: PropTypes.func.isRequired,
  myProfile: ProfileShape.isRequired,
  messages: PropTypes.arrayOf(MessageShape.isRequired),
  history: historyShape,
  openChat: PropTypes.func.isRequired,
  closeChat: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  fetchParticipants: PropTypes.func.isRequired,
  queryMentionPerson: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  showProfile: PropTypes.bool.isRequired,
  showChatProfile: PropTypes.func.isRequired,
  closeChatProfile: PropTypes.func.isRequired,
  historyIsLoaded: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  isInitiator: PropTypes.bool.isRequired,
  startTyping: PropTypes.func.isRequired,
  stopTyping: PropTypes.func.isRequired,
  partnerIsTyping: PropTypes.object.isRequired,
  groupIsActive: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
  enableAudio: PropTypes.bool.isRequired,
  enableImage: PropTypes.bool.isRequired,
  enableAutoScrollOnChatImageLoad: PropTypes.bool.isRequired,
  groupChatSelect: PropTypes.func.isRequired,
  groupChatAdd: PropTypes.func.isRequired,
  groupChatLeave: PropTypes.func.isRequired,
  group: UserShape,
}

ChatboxScreen.defaultProps = {
  messages: [],
  isOpen: false,
  user: null,
  group: null,
  isInCallingScreen: false,
  groupInfo: {},
}

const mapDispatchToProps = {
  openChat,
  triggerOpenChat,
  fetchUserProfileFromServer,
  closeChat,
  sendMessage,
  sendImage,
  sendAudio,
  startTyping,
  stopTyping,
  fetchMessages,
  fetchParticipants,
  queryMentionPerson,
  showChatProfile,
  closeChatProfile,
  groupChatSelect,
  groupChatAdd,
  groupChatLeave,
  setIsCaller,
  setIsInCallingScreen,
  startedCall,
  callAccepted,
  callCancelled,
  callEnded,
  fetchPartners,
  browserIsOffline,
  history,
}

const makeMapStateToProps = () => {
  const getGroupByChatId = makeGetGroupByChatId()
  const getUserByUuid = makeGetUserByUuid()
  const getIsChatOpen = makeGetIsChatOpen()
  const getShowChatProfile = makeGetShowChatProfile()
  const getChatscrolled = makeGetChatscrolled()
  const getMessagesByChatId = makeGetMessagesByChatId()
  const getIsInitiator = makeGetIsInitiator()
  const getIsTyping = makeGetIsTyping()
  const getIsGroupActive = makeGetIsGroupActive()
  const getHistoryIsLoaded = makeGetHistoryIsLoaded()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getFeature = makeGetFeature()
  const getIsInCallingScreen = makeGetIsInCallingScreen()
  const getIsCaller = makeGetIsCaller()
  const getPartners = makeGetPartners()
  const getGroupInfo = makeGetGroupInfo()
  return (state, props) => ({
    myProfile: getProfile(state),
    profiles: getProfiles(state),
    user: getUserByUuid(state, props),
    isOpen: getIsChatOpen(state, props) && !getIsMobileOrTabletView(state),
    showProfile: getShowChatProfile(state, props),
    chatScrolled: getChatscrolled(state, props),
    historyIsLoaded: getHistoryIsLoaded(state, props),
    isInitiator: getIsInitiator(state, props),
    messages: getMessagesByChatId(state, props),
    partnerIsTyping: getIsTyping(state, props),
    groupIsActive: getIsGroupActive(state, props),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    enableImage: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_IMAGE),
    enableAudio: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_AUDIO),
    partners: getPartners(state),
    groupInfo: getGroupInfo(state),
    enableAutoScrollOnChatImageLoad: getFeature(
      state,
      FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD
    ),
    group: getGroupByChatId(state, props),
    isInCallingScreen: getIsInCallingScreen(state, props),
    isCaller: getIsCaller(state, props),
  })
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ChatboxScreen)

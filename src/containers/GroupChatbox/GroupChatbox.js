/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { history as historyShape } from "react-router-prop-types"
import {
  ChatInterestList,
  GroupChatContent,
  GroupCard,
  MessageShape,
  ProfileShape,
  UserShape,
} from "../../components"
import {
  makeGetHistoryIsLoaded,
  makeGetIsChatOpen,
  makeGetIsInitiator,
  makeGetIsTyping,
  makeGetMessagesByChatId,
  makeGetShowChatProfile,
  makeGetChatscrolled,
  makeGetCallInfo,
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
  PARTNERS_FETCH_LIMIT,
} from "../../redux/constants"
import {
  startedCall,
  callAccepted,
  callCancelled,
  callEnded,
} from "../../redux/actions/calling"
import { setIsInCallingScreen, setIsCaller } from "../../redux/actions/calling"

import {
  getChatId,
  makeGroupAvatar,
  shortenChannelId,
} from "../../utils/faye/helpers"

import { StyledContainer } from "./styled"

import { fetchPartners } from "../../redux/actions/partners"
import { fetchUserProfileFromServer } from "../../redux/actions/users"
import { browserIsOffline } from "../../redux/actions/browser"
import { makeGetPartners } from "../../redux/selectors/partners"
import { makeGetGroupInfo } from "../../redux/selectors/calling"
import { UploadDropImage } from "../../components/ChatMessageForm"
import { joinCallChannel } from "../../components/FullScreenGroupCall/VideoScreen"

const GroupChatbox = (props) => {
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
    group,
    isOpen,
    showProfile,
    messages,
    isInitiator,
    partnerIsTyping,
    groupIsActive,
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
    user,
    groupChatSelect,
    partners,
    myUuid,
    history,
    closeChat,
    sendAudio,
    sendImage,
    groupChatAdd,
    showChatProfile,
    closeChatProfile,
    triggerOpenChat,
    startTyping,
    stopTyping,
    groupInfo,
    fetchMessages,
    callInfo,
  } = props
  const { callStatus, isCaller, isInCallingScreen } = callInfo
  const updateScroll = (scrollVal) => {
    setState({ ...state, chatScroll: scrollVal })
  }

  const onMouseLeave = () => {
    setState({ ...state, isGroupCallingHeaderHovered: false })
  }

  const onMouseEnter = () => {
    setState({ ...state, isGroupCallingHeaderHovered: true })
    setTimeout(() => {
      setState({ ...state, isGroupCallingHeaderHovered: false })
    }, 5000)
  }

  const handleJoinOngoingCallClick = () => {
    if (!isInCallingScreen && state.isCallingMinimized) {
      setState({ ...state, isCallingMinimized: false })
      setIsInCallingScreen({ chatId, status: true })
      return
    }
    setState({
      ...state,
      isAccepted: true,
      isVideoMuted: true,
      isAudioMuted: true,
    })
    callAccepted({})
    setIsInCallingScreen({ chatId, status: true })
    joinCallChannel(
      shortenChannelId(chatId),
      myProfile.id,
      false,
      state.isAudioMuted
    ).then(
      () => {
        window.pushlogs && console.log("join ongoing call success")
      },
      (err) => {
        window.pushlogs && console.log("start call failure ", err)
      }
    )
  }

  const openChat = () => {
    if (isMobileOrTabletView) {
      history.push(`/chat/${chatId}`)
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

  const closeChatBox = () => {
    if (isOpen && chatId) {
      const payload = { chatId }
      closeChat(payload)
    }
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

  const handleGroupChatSelectClick = () => {
    const { uuid } = user
    groupChatSelect(uuid)
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

  const handleLeaveGroupChatClick = () => {
    const { groupChatLeave } = props
    groupChatLeave(chatId)
  }
  const handleStartGroupCall = () => {
    history.push(`/call/${chatId}`)
  }
  useEffect(() => {
    handleFetchMessages()
    return () => {
      setState({})
    }
  }, [])

  if (group && group?.participants) {
    const images = makeGroupAvatar(group)
    return (
      <StyledContainer showCloseButton={isOpen}>
        <UploadDropImage isOpen={isOpen} onSendImage={handleSendImage}>
          <GroupCard
            avatar={images}
            group={group}
            showCloseButton={isOpen}
            onClick={isOpen && showProfile ? handleProfileImageClick : openChat}
            onClose={closeChatBox}
            onGroupChatClick={handleGroupChatAddClick}
            onLeaveGroupChatClick={handleLeaveGroupChatClick}
            isTyping={isOpen && partnerIsTyping}
            isActive={groupIsActive}
            isOpen={isOpen}
            onProfileImageClick={handleProfileImageClick}
            onStartGroupCall={handleStartGroupCall}
            isInGroupCalling={isInCallingScreen}
            onJoinOngoingCallClick={handleJoinOngoingCallClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            groupInfo={groupInfo}
            chatId={chatId}
          >
            {isOpen ? (
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
                enableAutoScrollOnImageLoad={enableAutoScrollOnChatImageLoad}
                isMobileOrTabletView={isMobileOrTabletView}
                isInGroupCalling={false}
                myProfile={myProfile}
                fetchParticipants={fetchParticipants}
                queryMentionPerson={queryMentionPerson}
                chatId={chatId}
              />
            ) : (
              <ChatInterestList interests={[]} />
            )}
          </GroupCard>
        </UploadDropImage>
      </StyledContainer>
    )
  } else {
    return null
  }
}

GroupChatbox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired,
  sendAudio: PropTypes.func.isRequired,
  myProfile: ProfileShape.isRequired,
  messages: PropTypes.arrayOf(MessageShape.isRequired),
  history: historyShape.isRequired,
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

GroupChatbox.defaultProps = {
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
  const getCallInfo = makeGetCallInfo()
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
    callInfo: getCallInfo(state, props),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapDispatchToProps)(GroupChatbox)
)

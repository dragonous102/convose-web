/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { history as historyShape } from "react-router-prop-types"
import {
  Card,
  ChatContent,
  ChatInterestList,
  ProfileShape,
  UserShape,
} from "../../components"
import { matchInterests } from "../../utils/dataMappers"

import {
  makeGetHistoryIsLoaded,
  makeGetIsChatOpen,
  makeGetIsInitiator,
  makeGetIsTyping,
  makeGetShowChatProfile,
  makeGetCallInfo,
  makeGetIsFetchFailed,
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
} from "../../redux/actions/chats"
import { groupChatSelect } from "../../redux/actions/group"
import {
  makeGetIsGroupActive,
  makeGetUserByUuid,
} from "../../redux/selectors/users"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import { getProfile } from "../../redux/reducers"
import { makeGetFeature } from "../../redux/selectors/features"
import {
  CALL_SIGNAL_CALL_END_DECLINE,
  CALL_SIGNAL_CALL_JOINED,
  FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD,
  FEATURE_CHAT_MESSAGE_TYPE_AUDIO,
  FEATURE_CHAT_MESSAGE_TYPE_IMAGE,
  LOADING_HISTORY,
  NEW_UNREAD_MESSAGES,
  ONE_TO_ON_CALL,
  PARTNERS_FETCH_LIMIT,
} from "../../redux/constants"
import { generateCallMessage } from "../../utils/faye/helpers"
import { CALL_SIGNAL_CALL } from "../../redux/constants"
import { showInfoBar } from "../../redux/actions/alertbar"
import {
  setCallingChannel,
  startedCall,
  callAccepted,
  callCancelled,
} from "../../redux/actions/calling"
import CallingPanel from "../../components/CallingPanel/CallingPanel"
import { setIsInCallingScreen, setIsCaller } from "../../redux/actions/calling"
import { StyledContainer } from "./styled"
import CalleePanel from "../../components/CalleePanel/CalleePanel"
import { fetchPartners } from "../../redux/actions/partners"
import { browserIsOffline } from "../../redux/actions/browser"
import { makeGetPartners } from "../../redux/selectors/partners"
import { UploadDropImage } from "../../components/ChatMessageForm"
const Chatbox = (props) => {
  const [state, setState] = useState({
    isBackToCall: true,
    isCallAccepted: false,
    chatscrolled: null,
  })
  const { isBackToCall, isCallAccepted, chatscrolled } = state
  const {
    user,
    isOpen,
    showProfile,
    myProfile,
    isInitiator,
    partnerIsTyping,
    historyIsLoaded,
    enableAudio,
    enableImage,
    enableAutoScrollOnChatImageLoad,
    isMobileOrTabletView,
    groupIsActive,
    chatId,
    setIsInCallingScreen,
    callCancelled,
    callAccepted,
    sendMessage,
    setIsCaller,
    leaveChannel,
    browserIsOffline,
    isCalling,
    history,
    partners,
    openChat,
    closeChat,
    fetchFailed,
    fetchMessages,
    sendImage,
    groupChatSelect,
    sendAudio,
    showChatProfile,
    closeChatProfile,
    stopTyping,
    startTyping,
    startedCall,
    callInfo,
  } = props
  const { callStatus, isCaller, isInCallingScreen } = callInfo
  const checkOnline = () => {
    const online = window.navigator.onLine
    if (!online) {
      browserIsOffline()
      return false
    }
    return true
  }
  useEffect(() => {
    let callAgain
    if (!fetchFailed) {
      callAgain && clearInterval(callAgain)
      return
    }
    callAgain = setInterval(() => {
      checkOnline() && handleFetchMessages()
    }, 2000)
    return () => clearInterval(callAgain)
  }, [fetchFailed])

  const startCall = () => {
    if (isInCallingScreen || !checkOnline()) return
    setIsCaller({ chatId, status: true })
    const message = generateCallMessage({
      type: CALL_SIGNAL_CALL,
      text: ``,
      me: myProfile,
      callType: ONE_TO_ON_CALL,
    })
    setIsInCallingScreen({ chatId, status: true })
    backToCall(true)
    sendMessage({ chatId, message })
    startedCall()
  }

  const backToCall = (status) => {
    setState({ ...state, isBackToCall: status })
  }
  const updateScroll = (scroll) => {
    setState({ ...state, chatscrolled: scroll })
  }
  const acceptCall = () => {
    const message = generateCallMessage({
      type: CALL_SIGNAL_CALL_JOINED,
      text: ``,
      me: myProfile,
      callType: ONE_TO_ON_CALL,
    })
    setTimeout(() => {
      sendMessage({ chatId, message })
    }, 200)
    callAccepted({})
    setState({ ...state, isCallAccepted: true })
  }

  const cancelCall = () => {
    setIsInCallingScreen({ chatId, status: false })
    callCancelled({})

    const message = generateCallMessage({
      type: CALL_SIGNAL_CALL_END_DECLINE,
      text: ``,
      me: myProfile,
      callType: ONE_TO_ON_CALL,
    })

    setTimeout(() => {
      sendMessage({ chatId, message })
    }, 200)
  }

  const endCall = () => {
    setState({ ...state, isCallAccepted: false, callAnswered: false })
  }

  const openChatBox = () => {
    if (isMobileOrTabletView) {
      history.push(`/chat/${chatId}`)
    }
    if (!isMobileOrTabletView && !isOpen && chatId) {
      const payload = { chatId }
      openChat(payload)
    }
  }

  const closeChatBox = () => {
    if (isOpen && chatId) {
      const payload = { chatId }
      setState({ ...state, chatscrolled: null })
      closeChat(payload)
    }
  }

  const handleStartTyping = () => {
    const { uuid: sender } = myProfile
    const message = { sender }
    startTyping({ chatId, message })
  }

  const handleStopTyping = () => {
    const { uuid: sender } = myProfile
    const message = { sender }
    stopTyping({ chatId, message })
  }

  const handleSendMessage = (data) => {
    /** working */
    const { uuid: sender } = myProfile
    const message = { data, sender }
    sendMessage({ message, chatId })
  }

  const handleSendImage = (data) => {
    const { uuid: sender } = myProfile
    const message = { ...data, sender }
    sendImage({ message, chatId })
  }

  const handleSendAudio = ({ data, dataUri, metaData }) => {
    const { uuid: sender } = myProfile
    const message = { data, sender, ...metaData }
    sendAudio({ message, chatId, dataUri })
  }

  const handleFetchMessages = () => {
    fetchMessages({ chatId })
  }

  const handleProfileImageClick = () => {
    if (showProfile) {
      closeChatProfile({ chatId })
    } else {
      //store the scrolltop value in state use later when show again the chat screen,
      //show the chatbox again need that to scroll chatbox
      showChatProfile({ chatId })
    }
  }

  const handleGroupChatSelectClick = () => {
    const { uuid } = user

    if (!partners || Object.keys(partners).length < 1) {
      fetchPartners({
        from: 0,
        limit: PARTNERS_FETCH_LIMIT,
        myUuid: myProfile.uuid,
      })
    }

    groupChatSelect(uuid)
  }

  const ownInterests = myProfile && myProfile.interests
  const userInterests = user && user.interests

  return (
    <StyledContainer showCloseButton={isOpen}>
      <UploadDropImage isOpen={isOpen} onSendImage={handleSendImage}>
        {user && isInCallingScreen ? (
          callStatus !== CALL_SIGNAL_CALL_JOINED &&
          !isCaller &&
          !isCallAccepted ? (
            <CalleePanel
              user={user}
              acceptCall={acceptCall}
              cancelCall={cancelCall}
              callCancelled={callCancelled}
              setIsInCallingScreen={setIsInCallingScreen}
              chatId={chatId}
              myProfile={myProfile}
              sendMessage={sendMessage}
            />
          ) : isCaller || isCallAccepted ? (
            <CallingPanel
              user={user}
              groupIsActive={groupIsActive}
              chatId={chatId}
              isCaller={isCaller}
              myProfile={myProfile}
              isInCallingScreen={isInCallingScreen}
              isBackToCall={isBackToCall}
              backToCall={backToCall}
              setIsCaller={setIsCaller}
              setIsInCallingScreen={setIsInCallingScreen}
              sendMessage={sendMessage}
              callAccepted={callAccepted}
              leaveChannel={leaveChannel}
              callCancelled={callCancelled}
              endCall={endCall}
            />
          ) : null
        ) : null}
        {user ? (
          <Card
            user={user}
            showCloseButton={isOpen}
            onClick={
              isOpen && showProfile ? handleProfileImageClick : openChatBox
            }
            onClose={closeChatBox}
            onGroupChatClick={handleGroupChatSelectClick}
            isTyping={isOpen && partnerIsTyping}
            isOpen={isOpen}
            onProfileImageClick={handleProfileImageClick}
            startCall={startCall}
            chatId={chatId}
            isInCallingScreen={isInCallingScreen}
            backToCall={backToCall}
          >
            {isOpen ? (
              <ChatContent
                interests={userInterests}
                updateScroll={updateScroll}
                sharedInterests={matchInterests({
                  userInterests,
                  ownInterests,
                })}
                showProfile={showProfile}
                chatscrolled={chatscrolled}
                historyIsLoaded={historyIsLoaded}
                historyLoadingText={LOADING_HISTORY}
                unreadMessagesText={NEW_UNREAD_MESSAGES}
                fetchMessages={handleFetchMessages}
                onSendMessage={handleSendMessage}
                browserIsOffline={browserIsOffline}
                onSendImage={handleSendImage}
                onSendAudio={handleSendAudio}
                autoFocus={isInitiator}
                onStartTyping={handleStartTyping}
                onStopTyping={handleStopTyping}
                enableAudio={enableAudio}
                enableImage={enableImage}
                enableAutoScrollOnImageLoad={enableAutoScrollOnChatImageLoad}
                isMobileOrTabletView={isMobileOrTabletView}
                chatId={chatId}
              />
            ) : (
              <ChatInterestList interests={userInterests} />
            )}
          </Card>
        ) : null}
      </UploadDropImage>
    </StyledContainer>
  )
}

Chatbox.propTypes = {
  user: UserShape,
  sendMessage: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired,
  sendAudio: PropTypes.func.isRequired,
  myProfile: ProfileShape.isRequired,
  history: historyShape.isRequired,
  openChat: PropTypes.func.isRequired,
  closeChat: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
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
  isInCallingScreen: PropTypes.bool.isRequired,
  isCaller: PropTypes.bool.isRequired,
}

Chatbox.defaultProps = {
  isOpen: false,
  user: null,
  fetchFailed: false,
}

const mapDispatchToProps = {
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
  groupChatSelect,
  showInfoBar,
  setCallingChannel,
  setIsInCallingScreen,
  setIsCaller,
  startedCall,
  callAccepted,
  callCancelled,
  fetchPartners,
  browserIsOffline,
}

const makeMapStateToProps = () => {
  const getUserByUuid = makeGetUserByUuid()
  const getIsChatOpen = makeGetIsChatOpen()
  const getIsfetchFailed = makeGetIsFetchFailed()
  const getShowChatProfile = makeGetShowChatProfile()
  const getIsInitiator = makeGetIsInitiator()
  const getIsTyping = makeGetIsTyping()
  const getIsGroupActive = makeGetIsGroupActive()
  const getHistoryIsLoaded = makeGetHistoryIsLoaded()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getFeature = makeGetFeature()
  const getCallInfo = makeGetCallInfo()
  const getPartners = makeGetPartners()
  return (state, props) => ({
    myProfile: getProfile(state),
    user: getUserByUuid(state, props),
    isOpen: getIsChatOpen(state, props) && !getIsMobileOrTabletView(state),
    fetchFailed:
      getIsfetchFailed(state, props) && !getIsMobileOrTabletView(state),
    showProfile: getShowChatProfile(state, props),
    historyIsLoaded: getHistoryIsLoaded(state, props),
    isInitiator: getIsInitiator(state, props),
    partnerIsTyping: getIsTyping(state, props),
    groupIsActive: getIsGroupActive(state, props),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    enableImage: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_IMAGE),
    enableAudio: getFeature(state, FEATURE_CHAT_MESSAGE_TYPE_AUDIO),
    partners: getPartners(state),
    enableAutoScrollOnChatImageLoad: getFeature(
      state,
      FEATURE_AUTO_SCROLL_ON_CHAT_IMAGE_LOAD
    ),
    callInfo: getCallInfo(state, props),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapDispatchToProps)(Chatbox)
)

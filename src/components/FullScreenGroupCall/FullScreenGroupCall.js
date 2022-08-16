/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { UserShape } from "../../components"
import { makeGetGroupByChatId } from "../../redux/selectors/users"
import { history as historyShape } from "react-router-prop-types"
import {
  StyledContainer,
  StyledLeftContainer,
  StyledRightContainer,
} from "./styled"

import VideoScreen from "./VideoScreen"
import ChatboxScreen from "./ChatboxScreen"
import CallParticipants from "./CallParticipants"

import { sendMessage } from "../../redux/actions/chats"
import {
  leaveChannel,
  setIsCaller,
  callAccepted,
  callCancelled,
  startedCall,
  toggleUserVideo,
  toggleUserAudio,
} from "../../redux/actions/calling"
import { makeGetCallInfo, makeGetIsChatOpen } from "../../redux/selectors/chats"
import { makeGetChannel } from "../../redux/selectors/calling"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import { getProfile } from "../../redux/reducers"
import { setIsInCallingScreen } from "../../redux/actions/calling"
import AgoraRTC from "agora-rtc-sdk-ng"
import { AppIds } from "../../const"
const APP_ID = AppIds.AGORA_APP_ID
import useAgora from "../../hooks/useAgora"
import { generateCallMessage, shortenChannelId } from "../../utils/faye/helpers"
import {
  CALL_SIGNAL_CALL,
  CALL_SIGNAL_CALL_JOINED,
  GROUP_CALL,
  CALL_SIGNAL_MUTE,
} from "../../redux/constants"
import useScreenShare from "../../hooks/useScreenShare"

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" })

const FullScreenGroupCall = (props) => {
  const {
    myProfile,
    chatId,
    group,
    endCall,
    callAccepted,
    setIsInCallingScreen,
    setIsCaller,
    callCancelled,
    sendMessage,
    leaveChannel,
    startedCall,
    history,
    callInfo,
    toggleUserVideo,
    toggleUserAudio,
    start,
  } = props
  const [screenId, setScreenId] = useState(null)

  const {
    callStatus,
    isCaller,
    isInCallingScreen,
    isMuted = true,
    isVideoEnabled = false,
  } = callInfo
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    volumes,
    remoteUsers,
    toggleMuteAudio,
    toggleMuteVideo,
  } = useAgora(client, history, screenId)
  const { localVideoScreenTrack, shareScreen, isScreenShared } =
    useScreenShare()

  useEffect(() => {
    const { id, username } = myProfile
    join(APP_ID, shortenChannelId(chatId), null, id)
    let message
    if (start != "0") {
      message = generateCallMessage({
        type: CALL_SIGNAL_CALL_JOINED,
        text: `${username} joined the call`,
        me: myProfile,
        callType: GROUP_CALL,
      })
    } else {
      message = generateCallMessage({
        type: CALL_SIGNAL_CALL,
        text: `Call started by ${username}`,
        me: myProfile,
        callType: GROUP_CALL,
      })
      setIsInCallingScreen({ chatId, status: true })
      setIsCaller({ chatId, status: true })
      startedCall()
    }

    setTimeout(() => {
      sendMessage({ chatId, message })
    }, 3000)

    return () => {
      const handleLeave = async () => {
        await leave()
      }
      handleLeave()
      setIsInCallingScreen({ chatId, status: false })
      setIsCaller({ chatId, status: false })
    }
  }, [])
  useEffect(() => {
    toggleMuteAudio(isMuted)
  }, [isMuted])
  useEffect(() => {
    toggleMuteVideo(isVideoEnabled)
  }, [isVideoEnabled])
  const handleShareScreen = () => {
    if (!setScreenId) {
      const randomId = Math.floor(Math.random() * 9000)
      setScreenId(randomId)
    }

    shareScreen(APP_ID, shortenChannelId(chatId), null, screenId)
  }
  if (!group?.participants) return
  const users = joinState
    ? [
        ...remoteUsers,
        { uid: myProfile.id, videoTrack: localVideoTrack, local: true },
      ]
    : [...remoteUsers]
  const activeId =
    volumes.length > 0
      ? volumes.sort((a, b) => a.level - b.level)[volumes.length - 1]?.uid
      : null

  const handleMuteUser = (user) => {
    const text = `${CALL_SIGNAL_MUTE} ${user.uid}`
    const message = generateCallMessage({
      type: CALL_SIGNAL_MUTE,
      text,
      me: myProfile,
    })
    sendMessage({ chatId, message })
  }
  const handleToggleAudio = () => {
    toggleUserAudio()
  }
  const handleToggleVideo = () => {
    toggleUserVideo()
  }

  return (
    <StyledContainer>
      <StyledLeftContainer>
        <ChatboxScreen chatId={chatId} />
      </StyledLeftContainer>
      <StyledRightContainer>
        <CallParticipants
          activeId={activeId}
          isVideoEnabled={isVideoEnabled}
          users={users}
          muteUserAudio={handleMuteUser}
        />
        <VideoScreen
          leave={leave}
          chatId={chatId}
          sendMessage={sendMessage}
          toggleMuteAudio={handleToggleAudio}
          isMuted={isMuted}
          isVideoEnabled={isVideoEnabled}
          toggleMuteVideo={handleToggleVideo}
          shareScreen={handleShareScreen}
          isScreenShared={isScreenShared}
        />
      </StyledRightContainer>
    </StyledContainer>
  )
}

FullScreenGroupCall.propTypes = {
  chatId: PropTypes.string.isRequired,
  group: UserShape,
  isInCallingScreen: PropTypes.bool.isRequired,
  history: historyShape.isRequired,
}

FullScreenGroupCall.defaultProps = {
  group: null,
  isInCallingScreen: false,
}

const mapDispatchToProps = {
  sendMessage,
  leaveChannel,
  setIsInCallingScreen,
  setIsCaller,
  callAccepted,
  callCancelled,
  startedCall,
  toggleUserVideo,
  toggleUserAudio,
}
const makeMapStateToProps = () => {
  const getGroupByChatId = makeGetGroupByChatId()
  const getIsChatOpen = makeGetIsChatOpen()
  const getChannel = makeGetChannel()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getCallInfo = makeGetCallInfo()
  return (state, props) => ({
    group: getGroupByChatId(state, props),
    myProfile: getProfile(state),
    isOpen: getIsChatOpen(state, props) && !getIsMobileOrTabletView(state),
    channel: getChannel(state, props),
    callInfo: getCallInfo(state, props),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapDispatchToProps)(FullScreenGroupCall)
)

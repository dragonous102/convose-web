import { useEffect, useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import {
  StyledName,
  StyledStatus,
  StyledWrapper,
  StyledProfileImage,
  CallingBarWrapper,
  StyledProfileWrapper,
  StyledHeader,
  StyledHeaderButton,
  StyledGrid,
  StyledProfileWrapperHalf,
} from "./styled"
import Icon from "../Icon"
import { DesktopUp } from "../Responsive"
import { StyledShadow, StyledCard } from "../Card/Styled"
import { generateCallMessage, shortenChannelId } from "../../utils/faye/helpers"
import {
  CALL_SIGNAL_CALL_END_BUSY,
  CALL_SIGNAL_CALL_END_DECLINE,
  CALL_SIGNAL_CALL_END_NO_ANSWER,
  CALL_SIGNAL_END_CALL,
  ONE_TO_ON_CALL,
} from "../../redux/constants"
import AgoraRTC from "agora-rtc-sdk-ng"
import CallingBar from "../CallingBar/CallingBar"
import {
  millisToMinutesAndSeconds,
  minutesAndSecondsToDisplayString,
} from "../../utils/timeUtils"
import appIds from "../../const/AppIds"
import MediaPlayer from "../MediaPlayer/MediaPlayer"
import { useSelector } from "react-redux"

const APP_ID = appIds.AGORA_APP_ID

const rtc = {
  // For the local client.
  client: null,
  // For the local audio and video tracks
  localAudioTrack: null,
  localVideoTrack: null,
  uid: null,
  remoteUser: {},
}

let timeInterval
const CallingPanel = (props) => {
  const { callStatus } = useSelector(({ calling }) => calling)

  const {
    user,
    showCloseButton,
    themeColor,
    isCaller,
    backToCall,
    isBackToCall,
    endCall,
    chatId,
    myProfile,
  } = props
  const [isVideoMuted, setVideoMuted] = useState(true)
  const [isAudioMuted, setAudioMuted] = useState(false)
  const [isRemoteVideoMuted, setIsRemoteVideoMuted] = useState(true)
  const [isWaiting, setIsWaiting] = useState(false)
  const [callingTime, setCallingTime] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  let joinTime = undefined
  let callingTimeOut
  useEffect(() => {
    const joinCallChannel = async (channelName, id) => {
      if (!rtc.client) {
        rtc.client = AgoraRTC.createClient({
          mode: "live",
          codec: "h264",
          role: "host",
        })
      }
      // joins a channel with a token, channel, user id
      rtc.uid = await rtc.client.join(APP_ID, channelName, null, id)

      // Create and publish the local tracks
      // Create an audio track from the audio captured by a microphone
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      // Publish the local audio and video tracks to the channel
      await rtc.client.publish([rtc.localAudioTrack])
    }

    joinCallChannel(shortenChannelId(chatId), myProfile.id)
    return () => {
      rtc.remoteUser = {}
    }
  }, [])

  useEffect(() => {
    if (!isCaller) {
      joinTime = new Date().getTime()
      setIsConnected(true)
      timeInterval = setInterval(() => {
        const timeMillisecondsDiff = new Date().getTime() - joinTime
        isEmpty(rtc.remoteUser) &&
          timeMillisecondsDiff > 4000 &&
          onPressEndCall()
        setCallingTime(millisToMinutesAndSeconds(timeMillisecondsDiff))
      }, 1000)
    }
    rtc.client.on("user-published", async (user, mediaType) => {
      await rtc.client.subscribe(user, mediaType)
      if (mediaType === "video" || mediaType === "all") {
        setIsRemoteVideoMuted(false)
        rtc.remoteUser = user
      }
      if (mediaType === "audio" || mediaType === "all") {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack
        // Play the audio track. Do not need to pass any DOM element
        remoteAudioTrack.play()
      }
    })
    rtc.client.on("unmute-video", function (evt) {
      console.log("unmute-video", evt)
      setIsRemoteVideoMuted(false)
    })
    rtc.client.on("mute-video", function (evt) {
      setIsRemoteVideoMuted(true)
    })
    rtc.client.on("disable-local-video", function (evt) {
      console.log("disable-local-video")
      setIsRemoteVideoMuted(true)
    })

    rtc.client.on("enable-local-video", function (evt) {
      console.log("disable-local-video")
      setIsRemoteVideoMuted(false)
    })

    rtc.client.on("user-left", () => {
      internalLeaveCallingChannel()
    })

    rtc.client.on("user-joined", (user) => {
      rtc.remoteUser = user
      if (!isConnected && isCaller) {
        const { callAccepted } = props
        callAccepted({})
        joinTime = new Date().getTime()
        setIsConnected(true)
        timeInterval = setInterval(() => {
          setCallingTime(
            millisToMinutesAndSeconds(new Date().getTime() - joinTime)
          )
        }, 1000)
      }

      if (isCaller && callingTimeOut) {
        clearTimeout(callingTimeOut)
        callingTimeOut = null
      }
    })

    if (isCaller && !callingTimeOut) {
      const { chatId, callCancelled, sendMessage, myProfile } = props

      const message = generateCallMessage({
        type: CALL_SIGNAL_CALL_END_NO_ANSWER,
        text: `No answer`,
        me: myProfile,
        callType: ONE_TO_ON_CALL,
      })
      callingTimeOut = setTimeout(() => {
        internalLeaveCallingChannel()
        callCancelled({})
        sendMessage({ chatId, message })
      }, 60000)
    }

    const handleBeforeUnload = () => {
      leaveCallingChannel()
    }
    // subscribe event
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      clearTimeout(callingTimeOut)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      rtc.client.removeAllListeners()
      rtc.client && rtc.client.leave()
      endCall()
      leaveCallingChannel()
    }
  }, [])

  const internalLeaveCallingChannel = async () => {
    clearInterval(timeInterval)
    const { setIsInCallingScreen, chatId, setIsCaller } = props
    setIsInCallingScreen({ chatId, status: false })
    setIsCaller({ chatId, status: false })
    leaveCallingChannel()
  }

  const onPressEndCall = () => {
    const { chatId, callCancelled, sendMessage, myProfile, isCaller, endCall } =
      props
    callCancelled({})
    const message = generateCallMessage({
      type: isConnected
        ? CALL_SIGNAL_END_CALL
        : isCaller
        ? CALL_SIGNAL_CALL_END_NO_ANSWER
        : CALL_SIGNAL_CALL_END_DECLINE,
      text: isConnected
        ? "Call ended " + minutesAndSecondsToDisplayString(callingTime)
        : isCaller
        ? "No answer"
        : "Call declined",
      me: myProfile,
      callType: ONE_TO_ON_CALL,
    })
    setTimeout(() => {
      sendMessage({ chatId, message })
    }, 200)
    internalLeaveCallingChannel()
    endCall()
  }

  const toggleMuteVideo = async () => {
    if (isVideoMuted) {
      setVideoMuted(false)
      // Create a video track from the video captured by a camera

      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack()
      await rtc.localVideoTrack.setEnabled(true)
      await rtc.client.publish([rtc.localVideoTrack])
    } else {
      setVideoMuted(true)
      await rtc.localVideoTrack.setEnabled(false)
      await rtc.client.unpublish([rtc.localVideoTrack])
      rtc.localVideoTrack = null
    }
  }
  const muteAudio = async () => {
    try {
      await rtc.localAudioTrack.setEnabled(false)
      await rtc.client.unpublish([rtc.localAudioTrack])
      rtc.localAudioTrack = null
      return true
    } catch (error) {
      return false
    }
  }
  let interval
  const toggleMuteAudio = async () => {
    //when just we started the call setEnable function is undefined
    // if the user click mute right away after the call
    // we get error so this setinter and loop solve the problem
    if (interval) {
      clearInterval(interval)
      setAudioMuted((prev) => !prev)
      return
    }
    if (isAudioMuted) {
      setAudioMuted(false)
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      await rtc.localAudioTrack.setEnabled(true)
      await rtc.client.publish([rtc.localAudioTrack])
    } else {
      setAudioMuted(true)
      let muted = await muteAudio()
      if (!muted) {
        interval = setInterval(async () => {
          if (!muted) {
            muted = await muteAudio()
          } else {
            clearInterval(interval)
          }
        }, 1000)
      }
    }
  }

  const backButtonHandler = () => {
    backToCall(false)
  }
  return (
    <StyledWrapper isMinimized={!isBackToCall}>
      <DesktopUp>
        <StyledShadow showCloseButton={showCloseButton} />
      </DesktopUp>

      <StyledCard showCloseButton={!showCloseButton}>
        <StyledHeader>
          <StyledHeaderButton
            blank
            small
            themeColor="back"
            onClick={backButtonHandler}
          >
            <Icon iconId="back" width="14px" />
          </StyledHeaderButton>
        </StyledHeader>
        {isVideoMuted ? (
          rtc.remoteUser?.videoTrack == undefined ? (
            <StyledProfileWrapper>
              <StyledProfileImage url={user.avatar.url} size="104px" />
              <StyledName showCloseButton={showCloseButton}>
                {user.username}
              </StyledName>
              <StyledStatus color={themeColor}>
                {isConnected
                  ? callingTime
                  : isWaiting
                  ? "Connecting..."
                  : callStatus == CALL_SIGNAL_CALL_END_BUSY
                  ? "In another call"
                  : "Calling..."}
              </StyledStatus>
            </StyledProfileWrapper>
          ) : rtc.remoteUser.videoTrack ? (
            <MediaPlayer videoTrack={rtc.remoteUser.videoTrack} />
          ) : null
        ) : (
          <StyledGrid>
            {rtc.localVideoTrack ? (
              <MediaPlayer videoTrack={rtc.localVideoTrack} local={true} />
            ) : null}
            {rtc.remoteUser?.videoTrack == undefined ? (
              <StyledProfileWrapperHalf>
                <StyledProfileImage url={user.avatar.url} size="104px" />
                <StyledName showCloseButton={showCloseButton}>
                  {user.username}
                </StyledName>
                <StyledStatus color={themeColor}>
                  {isConnected
                    ? callingTime
                    : isWaiting
                    ? "Connecting..."
                    : "Calling..."}
                </StyledStatus>
              </StyledProfileWrapperHalf>
            ) : rtc.remoteUser.videoTrack ? (
              <MediaPlayer videoTrack={rtc.remoteUser.videoTrack} />
            ) : null}
          </StyledGrid>
        )}
        <CallingBarWrapper>
          <CallingBar
            endCall={onPressEndCall}
            toggleMuteAudio={toggleMuteAudio}
            toggleMuteVideo={toggleMuteVideo}
            isAudioMuted={isAudioMuted}
            isVideoMuted={isVideoMuted}
          />
        </CallingBarWrapper>
      </StyledCard>
    </StyledWrapper>
  )
}

export default CallingPanel

export const leaveCallingChannel = async () => {
  try {
    rtc.localAudioTrack && rtc.localAudioTrack.setEnabled(false)
    rtc.localVideoTrack && rtc.localVideoTrack.setEnabled(false)
    rtc.localAudioTrack && rtc.localAudioTrack.close()
    rtc.localVideoTrack && rtc.localVideoTrack.close()
  } catch (error) {
    console.log(error)
  }
  if (rtc.client) {
    const localPlayer = document.getElementById(rtc.client.uid)
    localPlayer && localPlayer.remove()

    // Traverse all remote users
    rtc.client.remoteUsers.forEach((user) => {
      // Destroy the dynamically created DIV container
      const playerContainer = document.getElementById(user.uid)
      playerContainer && playerContainer.remove()
    })

    // Leave the channel
    rtc.client && (await rtc.client.leave())
  }
}

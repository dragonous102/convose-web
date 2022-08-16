import { useSelector } from "react-redux"
import { CALL_SIGNAL_END_CALL } from "../../../redux/constants"
import { generateCallMessage } from "../../../utils/faye/helpers"
import CallingBar from "../../CallingBar/CallingBar"
//import Icon from "../../Icon"
//import MediaPlayer from "../../MediaPlayer/MediaPlayer"
// import MediaPlayerActive from "../../MediaPlayer/MediaPlayerActive"
// import { StyledButton, StyledName } from "../styled"
import {
  CallingBarWrapper,
  //StyledNameMicWrapper,
  // StyledVideoContainer,
  StyledWrapper,
} from "./styled"

const VideoScreen = ({
  leave,
  sendMessage,
  chatId,
  //speaking,
  toggleMuteAudio,
  toggleMuteVideo,
  isMuted,
  isVideoEnabled,
  shareScreen,
  isScreenShared,
  // toggleSpeakingUser,
}) => {
  const myProfile = useSelector(({ profile }) => profile)
  const onPressEndCall = async () => {
    let message = generateCallMessage({
      type: CALL_SIGNAL_END_CALL,
      text: `Call ended`,
      me: myProfile,
    })
    sendMessage({ chatId, message })
    await leave()
  }

  return (
    <StyledWrapper>
      {/* <StyledVideoContainer>
        <StyledNameMicWrapper>
          <StyledName>{"Farhad"}</StyledName>
          {!speaking?.local && (
            <StyledButton
              themeColor="mic"
              onClick={() => toggleSpeakingUser(speaking)}
              lightHover={true}
              isInGroupCalling
            >
              {speaking?.audioTrack ? (
                <Icon iconId="miccall" width="20px" />
              ) : (
                <Icon iconId="micMutedcall" width="15px" />
              )}
            </StyledButton>
          )}
        </StyledNameMicWrapper>

        <MediaPlayerActive
          audioTrack={speaking?.audioTrack}
          videoTrack={speaking?.videoTrack}
        />
      </StyledVideoContainer> */}
      <CallingBarWrapper>
        <CallingBar
          endCall={onPressEndCall}
          toggleMuteAudio={toggleMuteAudio}
          toggleMuteVideo={toggleMuteVideo}
          isAudioMuted={isMuted}
          isVideoMuted={!isVideoEnabled}
          shareScreen={shareScreen}
          isScreenShared={isScreenShared}
        />
      </CallingBarWrapper>
    </StyledWrapper>
  )
}

export default VideoScreen

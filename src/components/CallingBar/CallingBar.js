import { StyledButtonGroup, StyledButton } from "./styled"
import Icon from "../Icon"

const CallingBar = (props) => {
  const {
    toggleMuteAudio,
    toggleScreenShare,
    toggleMuteVideo,
    endCall,
    isAudioMuted,
    isScreenShared,
    isVideoMuted,
    isInGroupCalling,
    shareScreen,
  } = props
  return (
    <StyledButtonGroup>
      <StyledButton
        themeColor="mic"
        onClick={toggleMuteAudio}
        backgroundColor={
          isInGroupCalling
            ? isAudioMuted
              ? "rgba(0, 0, 0, 0)"
              : "#19B6ED"
            : isAudioMuted
            ? "#19B6ED"
            : "rgba(0, 0, 0, 0)"
        }
        lightHover={isInGroupCalling ? isAudioMuted : !isAudioMuted}
        isInGroupCalling={isInGroupCalling}
      >
        {isInGroupCalling ? (
          <Icon
            iconId={isAudioMuted ? "micMutedSm" : "micSm"}
            width={isAudioMuted ? "18px" : "15px"}
          />
        ) : (
          <Icon iconId={isAudioMuted ? "micMuted" : "mic"} width="29px" />
        )}
      </StyledButton>
      {/* <StyledButton
        themeColor="mic"
        onClick={shareScreen}
        backgroundColor={
          isInGroupCalling
            ? isScreenShared
              ? "rgba(0, 0, 0, 0)"
              : "#19B6ED"
            : isScreenShared
            ? "#19B6ED"
            : "rgba(0, 0, 0, 0)"
        }
        lightHover={isInGroupCalling ? isScreenShared : !isScreenShared}
        isInGroupCalling={isInGroupCalling}
      >
        <Icon
          iconId={isScreenShared ? "screenShared" : "screenShare"}
          width={isScreenShared ? "40px" : "35px"}
        />
      </StyledButton> */}
      <StyledButton
        themeColor="video"
        onClick={toggleMuteVideo}
        backgroundColor={isVideoMuted ? "rgba(0, 0, 0, 0)" : "#19B6ED"}
        lightHover={isVideoMuted}
        isInGroupCalling={isInGroupCalling}
      >
        <Icon
          iconId={isVideoMuted ? "videoMuted" : "video"}
          width={isScreenShared ? "40px" : "35px"}
        />
      </StyledButton>
      <StyledButton
        themeColor="hangUp"
        onClick={endCall}
        backgroundColor="#FF6F6F"
        isInGroupCalling={isInGroupCalling}
      >
        {isInGroupCalling ? (
          <Icon iconId="hangUpSm" width="18px" />
        ) : (
          <Icon iconId="hangUp" width="35px" />
        )}
      </StyledButton>
    </StyledButtonGroup>
  )
}

export default CallingBar

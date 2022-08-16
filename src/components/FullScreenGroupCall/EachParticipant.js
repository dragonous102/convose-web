import Icon from "../Icon"

import MediaPlayerActive from "../MediaPlayer/MediaPlayerActive"
import {
  StyledButton,
  //StyledName,
  StyledParticipant,
  StyledVideoWrapper,
} from "./styled"

const EachParticipant = ({
  user,
  isInGroupCalling,
  muteUserAudio,
  isVideoEnabled,
  activeId,
}) => {
  return (
    <StyledParticipant>
      {/* <StyledName>{user.name}</StyledName> */}

      <StyledVideoWrapper activeId={activeId}>
        <MediaPlayerActive
          audioTrack={user?.audioTrack}
          videoTrack={user?.videoTrack}
          isVideoEnabled={isVideoEnabled}
          local={user.local}
        />
      </StyledVideoWrapper>
      {!user.local && muteUserAudio && (
        <StyledButton
          themeColor="mic"
          onClick={() => muteUserAudio(user)}
          lightHover={true}
          isInGroupCalling={isInGroupCalling}
        >
          {user?.audioTrack ? (
            <Icon iconId="miccall" width="20px" />
          ) : (
            <Icon iconId="micMutedcall" width="15px" />
          )}
        </StyledButton>
      )}
    </StyledParticipant>
  )
}

export default EachParticipant

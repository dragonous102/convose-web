//import { Icon } from "../../components"
import { useMemo } from "react"
import { columnsRows } from "../../utils/faye/helpers"
import EachParticipant from "./EachParticipant"
import {
  //StyledButton,
  //StyledMutedWrapper,
  //StyledName,
  //StyledParticipant,
  StyledParticipantsContainer,
  //StyledUserImage,
  StyledWrapperParticipant,
} from "./styled"

const usersd = [
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
]
const mutedUsers = [
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Ali",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mahmood",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Mohsen",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
  {
    name: "Farhad",
    image: "https://xsgames.co/randomusers/assets/avatars/male/58.jpg",
  },
]

const isInGroupCalling = false
const CallParticipants = ({
  users,
  muteUserAudio = null,
  isVideoEnabled,
  activeId,
}) => {
  const count = users.length
  const { rows, columns } = useMemo(() => columnsRows(count), [count])
  return (
    <StyledWrapperParticipant>
      <StyledParticipantsContainer rows={rows} columns={columns}>
        {users.map((user) => (
          <EachParticipant
            key={user.uid}
            isInGroupCalling={isInGroupCalling}
            user={user}
            muteUserAudio={muteUserAudio}
            isVideoEnabled={isVideoEnabled}
            activeId={activeId == user.uid ? true : undefined}
          />
        ))}
      </StyledParticipantsContainer>
      {/* <StyledMutedWrapper>
        <StyledParticipantsContainer muted>
          {mutedUsers.map((user, index) => (
            <StyledParticipant width={60} height={60} key={index}>
              <StyledName fontSize="10">{user.name}</StyledName>
              <StyledUserImage src={user.image} />
              <StyledButton
                themeColor="mic"
                onClick={toggleMuteAudio}
                lightHover={isInGroupCalling ? isAudioMuted : !isAudioMuted}
                isInGroupCalling={isInGroupCalling}
                muted
              >
                <Icon iconId="micMutedcall" width="15px" />
              </StyledButton>
            </StyledParticipant>
          ))}
        </StyledParticipantsContainer>
      </StyledMutedWrapper> */}
    </StyledWrapperParticipant>
  )
}

export default CallParticipants

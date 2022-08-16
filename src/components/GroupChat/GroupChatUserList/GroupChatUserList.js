import { useEffect, useState } from "react"
import Popup from "reactjs-popup"
import { Scrollbars } from "react-custom-scrollbars"
import PulseLoader from "react-spinners/PulseLoader"

import { ProfileImage, ChatInterestList, Card } from "../.."
// import { openChat } from "../../../redux/actions/chats";
import {
  StyledContainer,
  StyledItem,
  StyledLoadingSpinnerWrapper,
  StyledName,
} from "./Styled"
const GroupChatUserList = ({
  participants,
  loading,
  showAll,
  fetchParticipants,
  chatId,
  historyLoaded,
  openUserChat,
  profiles,
  fetchUserProfileFromServer,
  toggleChatParticipant,
}) => {
  const [listEl, setListEl] = useState(null)
  const loadMore = async () => {
    fetchParticipants({ chatId })
  }
  const handleScroll = () => {
    if (
      listEl.getScrollTop() + listEl.getClientHeight() + 20 >=
        listEl.getScrollHeight() &&
      !historyLoaded &&
      !loading
    ) {
      loadMore()
    }
  }
  //first time the component mount it will refresh,
  //we will have the new participants
  useEffect(() => {
    fetchParticipants({ chatId, loadHistoryFrom: 0 })
  }, [])
  return (
    <StyledContainer className="tooltipBoundary" showAll={showAll}>
      <Scrollbars
        autoHide
        ref={(ref) => {
          setListEl(ref)
        }}
        onScroll={handleScroll}
      >
        {Object.values(participants).map((profile, key) => (
          <Popup
            key={key}
            trigger={
              <StyledItem>
                <ProfileImage
                  url={profile.avatar.url}
                  withStatus
                  isActive={profile.status === "online"}
                  size="48px"
                />
                <StyledName themeColor={profile.theme_color}>
                  {profile.username}
                </StyledName>
              </StyledItem>
            }
            position={["bottom right", "bottom left", "top right", "top left"]}
            closeOnDocumentClick
            keepTooltipInside=".tooltipBoundary"
          >
            {(close) => (
              <Card
                onClick={() => {
                  openUserChat(profile.uuid)
                  toggleChatParticipant()
                  close()
                }}
                user={profiles[profile.uuid]}
                avatar={profile.avatar}
                username={profile.username}
                uuid={profile.uuid}
                fetchUserProfileFromServer={fetchUserProfileFromServer}
                withStatus={false}
                extraShadow={true}
              >
                <ChatInterestList
                  topPadding={10}
                  interests={profile.interests}
                  showAll
                />
              </Card>
            )}
          </Popup>
        ))}
        {loading && (
          <StyledLoadingSpinnerWrapper height={30}>
            <PulseLoader
              color={"#19aaeb"}
              loading={loading}
              size={15}
              margin={2}
            />
          </StyledLoadingSpinnerWrapper>
        )}
      </Scrollbars>
    </StyledContainer>
  )
}

export default GroupChatUserList

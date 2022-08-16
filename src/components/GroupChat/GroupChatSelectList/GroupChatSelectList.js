import GroupChatSelectItem from "./GroupChatSelectItem"
import { useState } from "react"
import { connect } from "react-redux"
import { Scrollbars } from "react-custom-scrollbars"
import { getProfile } from "../../../redux/reducers"
import { getChatId } from "../../../utils/faye/helpers"

import {
  StyledScrollContainer,
  StyledHeader,
  StyledList,
  StyledInviteButton,
  StyledText,
  StyledLoader,
} from "./Styled"

const GroupChatSelectList = ({
  profile: { uuid: myUuid },
  selected,
  profiles,
  selectParticipant,
  deselectParticipant,
  startGroupChat,
  addToGroupChat,
  getUserAddToGroup,
  groupChatFrom,
  loading,
  joining,
}) => {
  const [listEl, setListEl] = useState(null)

  const isGroup = groupChatFrom === "group"
  const verb = isGroup ? "Add" : "invite"

  const allowStartGroup = selected.length > 1
  const allowAddToGroup = isGroup && selected.length > 0

  const handleScroll = () => {
    if (loading) return
    if (
      listEl.getScrollTop() + listEl.getClientHeight() + 20 >=
      listEl.getScrollHeight()
    ) {
      getUserAddToGroup()
    }
  }
  return (
    <Scrollbars
      ref={(ref) => {
        setListEl(ref)
      }}
      onScroll={handleScroll}
      autoHide
    >
      <StyledScrollContainer>
        {profiles.length > 0 ? (
          <>
            <StyledHeader>{`${verb} to group chat`}</StyledHeader>
            <StyledList>
              {profiles.map((profile) => {
                const { uuid } = profile
                const isSelected = selected.includes(uuid)
                function onProfileClick() {
                  return isSelected
                    ? deselectParticipant(uuid)
                    : selectParticipant(uuid)
                }
                return (
                  <GroupChatSelectItem
                    key={uuid}
                    chatId={getChatId({ chatPartnerUuid: uuid, myUuid })}
                    profile={profile}
                    selected={isSelected}
                    onProfileClick={onProfileClick}
                    disabled={loading}
                  />
                )
              })}
            </StyledList>
          </>
        ) : (
          <>
            {!loading && (
              <StyledText>
                You need at least two partners to create a group chat.
              </StyledText>
            )}
          </>
        )}
      </StyledScrollContainer>

      {allowAddToGroup ? (
        <StyledInviteButton
          type="button"
          onClick={joining ? undefined : addToGroupChat}
          disabled={joining}
        >
          {joining ? <StyledLoader /> : verb}
        </StyledInviteButton>
      ) : (
        allowStartGroup && (
          <StyledInviteButton
            type="button"
            onClick={joining ? undefined : startGroupChat}
            disabled={joining}
          >
            {joining ? <StyledLoader /> : verb}
          </StyledInviteButton>
        )
      )}
    </Scrollbars>
  )
}

// export default GroupChatSelectList

const mapStateToProps = () => {
  return (state, props) => ({
    ...props,
    profile: getProfile(state),
  })
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatSelectList)

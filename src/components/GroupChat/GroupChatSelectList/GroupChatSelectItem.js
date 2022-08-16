import { connect } from "react-redux"
import { Icon, ProfileImage } from "../.."
import { StyledGroupChatItem, StyledName, StyledMark } from "./Styled"
import { makeGetIsActive } from "../../../redux/selectors/users"

const GroupChatSelectItem = ({
  profile,
  selected,
  onProfileClick,
  loading,
  partnerIsActive,
}) => {
  return (
    <StyledGroupChatItem>
      <button
        type="button"
        className={selected ? "selected" : ""}
        onClick={loading ? undefined : onProfileClick}
        disabled={loading}
      >
        <ProfileImage
          url={profile.avatar.url}
          withStatus
          isActive={partnerIsActive}
        />
        <StyledName themeColor={profile.theme_color}>
          {profile.username}
        </StyledName>
        {selected ? <Icon iconId="circleTick" width="30px" /> : <StyledMark />}
      </button>
    </StyledGroupChatItem>
  )
}

// export default GroupChatSelectItem

const mapStateToProps = () => {
  const getIsActive = makeGetIsActive()
  return (state, props) => ({
    ...props,
    partnerIsActive: getIsActive(state, props),
  })
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatSelectItem)

import { connect } from "react-redux"
import { Component } from "react"
import PropTypes from "prop-types"
import { ProfileShape } from "../../components"
import { StyledItem, StyledWrapper } from "./Styled"
import { getChatId } from "../../utils/faye/helpers"
import Chatbox from "../Chatbox"
import GroupChatbox from "../GroupChatbox"
import KnowledgeLevelModal from "../KnowledgeLevelModal"
import {
  makeGetIsMobileOrTabletView,
  makeGetIsMobileView,
} from "../../redux/selectors/viewport"
import { getProfile } from "../../redux/reducers"
import { removeAllOpenChats, triggerOpenChat } from "../../redux/actions/chats"
import { makeGetUsersList } from "../../redux/selectors/users"
import { makeGetFilteredPartners } from "../../redux/selectors/partners"

class UserList extends Component {
  componentDidUpdate(prevProps) {
    const { isMobileOrTabletView, removeAllOpenChats, triggerOpenChat } =
      this.props
    if (!prevProps.isMobileOrTabletView && isMobileOrTabletView) {
      removeAllOpenChats()
    }
    if (
      this.props.partners &&
      this.props.partners.length > 0 &&
      !this.chatOpened
    ) {
      this.props.partners.map((partner) => {
        if (
          partner.partnerUuid ===
          "NzYwNjliNzAwZmQxNzQ5MQ-ODU4ZDMwYzkxMzc1OWM1ZA"
        ) {
          setTimeout(() => {
            triggerOpenChat({
              chatId: partner.chatId,
              partnerUuid: partner.partnerUuid,
              isInitiator: true,
            })
          }, 5000)
        }
      })
      this.chatOpened = true
    }
  }

  componentDidMount() {
    this.chatOpened = false
  }

  getUserCard({ uuid, key }) {
    if (uuid) {
      const {
        profile: { uuid: myUuid },
      } = this.props
      const isGroup = uuid.indexOf("-") === -1

      return (
        <StyledItem key={uuid}>
          {isGroup ? (
            <GroupChatbox myUuid={myUuid} chatId={uuid} />
          ) : (
            <Chatbox chatId={getChatId({ chatPartnerUuid: uuid, myUuid })} />
          )}
        </StyledItem>
      )
    }
    const { isMobileView } = this.props
    if (isMobileView) {
      return null
    }
    return <StyledItem key={key} />
  }

  render() {
    const { users } = this.props

    return (
      <StyledWrapper className="tooltipBoundary">
        {users.map((uuid, key) => this.getUserCard({ uuid, key }))}
        <KnowledgeLevelModal />
      </StyledWrapper>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  profile: ProfileShape.isRequired,
  partners: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  isMobileView: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
  removeAllOpenChats: PropTypes.func.isRequired,
  triggerOpenChat: PropTypes.func.isRequired,
}

UserList.defaultProps = {
  users: [],
  partners: [],
}

const mapActionsToProps = {
  removeAllOpenChats,
  triggerOpenChat,
}

const mapStateToProps = () => {
  const getIsMobileView = makeGetIsMobileView()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getUsersList = makeGetUsersList()
  const getFilteredPartners = makeGetFilteredPartners()
  return (state, props) => ({
    ...props,
    isMobileView: getIsMobileView(state),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    profile: getProfile(state),
    users: getUsersList(state),
    partners: getFilteredPartners(state),
  })
}

export default connect(mapStateToProps, mapActionsToProps)(UserList)

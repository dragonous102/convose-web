import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { ElementList, InboxItem } from "../../components"
import {
  makeGetFilteredPartners,
  makeGetIsLoadingPartner,
  makeGetHasNextPage,
} from "../../redux/selectors/partners"
import { makeGetMyUuid } from "../../redux/selectors/profile"
import { StyledWrapper, StyledHeadline } from "./Styled"
import {
  makeGetIsMobileOrTabletView,
  makeGetIsMobileView,
} from "../../redux/selectors/viewport"
import {
  markInboxAsRead,
  openChatFromInbox,
  fetchPartners,
} from "../../redux/actions/partners"
import { closeInbox, openInbox } from "../../redux/actions/modals"
import { useEffect } from "react"
import { PARTNERS_FETCH_LIMIT } from "../../redux/constants"

const Inbox = ({
  isMobileView,
  openInbox,
  markInboxAsRead,
  closeInbox,
  partners,
  groups,
  isMobileOrTabletView,
  openChatFromInbox,
  style,
  isLoadingPartners,
  nextPage,
  fetchPartners,
  myUuid,
}) => {
  useEffect(() => {
    isMobileView && openInbox()
    return () => {
      markInboxAsRead()
      isMobileView && closeInbox()
    }
  }, [isMobileView])

  useEffect(() => {
    fetchPartners({ from: 0, limit: PARTNERS_FETCH_LIMIT, myUuid })
  }, [])

  return (
    <StyledWrapper style={style}>
      <StyledHeadline>Inbox</StyledHeadline>
      <ElementList
        autoScrollToBottom={false}
        reverse={isMobileView}
        partners={partners}
        isLoadingPartners={isLoadingPartners}
        nextPage={nextPage}
        fetchPartners={fetchPartners}
        myUuid={myUuid}
      >
        {partners.map((partner) => {
          const { chatId, partnerUuid } = partner
          if (isMobileOrTabletView) {
            return (
              <Link to={`/chat/${chatId}`} key={partnerUuid}>
                <InboxItem groups={groups} {...partner} displayIndicator />
              </Link>
            )
          }
          return (
            <InboxItem
              {...partner}
              groups={groups}
              key={partnerUuid}
              onClick={openChatFromInbox}
              displayIndicator
            />
          )
        })}
      </ElementList>
    </StyledWrapper>
  )
}

Inbox.propTypes = {
  // Todo: replace by proper shape
  // eslint-disable-next-line react/forbid-prop-types
  partners: PropTypes.array,
  isMobileView: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
  markInboxAsRead: PropTypes.func.isRequired,
  openChatFromInbox: PropTypes.func.isRequired,
  openInbox: PropTypes.func.isRequired,
  closeInbox: PropTypes.func.isRequired,
  fetchPartners: PropTypes.func.isRequired,
  isLoadingPartners: PropTypes.bool,
  nextPage: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  myUuid: PropTypes.string.isRequired,
}

Inbox.defaultProps = {
  partners: [],
  style: {},
  groups: [],
}

const mapActionsToProps = {
  markInboxAsRead,
  openChatFromInbox,
  openInbox,
  closeInbox,
  fetchPartners,
}

const mapStateToProps = () => {
  const getIsMobileView = makeGetIsMobileView()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getFilteredPartners = makeGetFilteredPartners()
  const getIsLoadingPartner = makeGetIsLoadingPartner()
  const getHasNextPage = makeGetHasNextPage()
  const getMyUuid = makeGetMyUuid()
  const getGroups = (state) => {
    const { profiles } = state.users
    const groups = []

    Object.keys(profiles).forEach((id) => {
      profiles[id].type === "group" &&
        groups.push({ id, participants: profiles[id].participants })
    })
    return groups
  }

  return (state, props) => ({
    ...props,
    myUuid: getMyUuid(state),
    isMobileView: getIsMobileView(state),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    partners: getFilteredPartners(state),
    isLoadingPartners: getIsLoadingPartner(state),
    nextPage: getHasNextPage(state),
    groups: getGroups(state),
  })
}

export default connect(mapStateToProps, mapActionsToProps)(Inbox)

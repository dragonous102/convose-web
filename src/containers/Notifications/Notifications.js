import { PureComponent } from "react"
import PropTypes from "prop-types"
import { location as LocationShape } from "react-router-prop-types"
import { connect } from "react-redux"
import { Transition } from "react-spring/renderprops"
import { Link, withRouter } from "react-router-dom"
import { InboxItem } from "../../components"
import { getNotifications } from "../../redux/reducers"
import { StyledItem, StyledWrapper } from "./Styled"

class Notifications extends PureComponent {
  render() {
    const {
      notifications,
      groups,
      location: { pathname },
    } = this.props
    if (pathname.indexOf("/inbox") !== -1) return null
    return (
      <StyledWrapper>
        <Transition
          items={notifications}
          keys={notifications.map((notification, key) => key)}
          from={{ transform: "translateY(-100%)" }}
          enter={{ opacity: 1, transform: "translateY(0)" }}
          leave={{ opacity: 0 }}
        >
          {(notification) => (styleProps) =>
            notification ? (
              <StyledItem style={styleProps}>
                <Link to={`/chat/${notification.chatId}`}>
                  <InboxItem
                    groups={groups}
                    {...notification}
                    displayIndicator={false}
                    displayTime
                  />
                </Link>
              </StyledItem>
            ) : null}
        </Transition>
      </StyledWrapper>
    )
  }
}

Notifications.propTypes = {
  // Todo: replace by proper Notifcation/InboxItemShape in ../../ui_components
  // eslint-disable-next-line react/forbid-prop-types
  notifications: PropTypes.array,
  location: LocationShape.isRequired,
}

Notifications.defaultProps = {
  notifications: [],
}

const mapActionsToProps = {}

const mapStateToProps = () => (state, props) => {
  const getGroups = (state) => {
    const { profiles } = state.users
    const groups = []

    Object.keys(profiles).forEach((id) => {
      profiles[id].type === "group" &&
        groups.push({ id, participants: profiles[id].participants })
    })
    return groups
  }
  return {
    ...props,
    notifications: getNotifications(state).notifications,
    groups: getGroups(state),
  }
}

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(Notifications)
)

import { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { animated, Transition } from "react-spring/renderprops"
import { LoadingSplash, Modal } from "../components"
import {
  AlertBar,
  ErrorBoundary,
  GroupChatInfoModal,
  GroupChatSelect,
  Header,
  Inbox,
  LoginModal,
  ForgotPasswordModal,
  Menu,
  Notifications,
  SignupModal,
  UserList,
  AlertOfflineOnline,
} from "../containers"
import { StyledAbsoluteCenteredContainer } from "../global/styles"
import { closeInbox } from "../redux/actions/modals"
import { makeGetInboxIsOpen } from "../redux/selectors/modals"
import { makeGetMyUuid } from "../redux/selectors/profile"
import { makeGetIsMobileOrTabletView } from "../redux/selectors/viewport"

class HomeRoute extends Component {
  render() {
    const { myUuid, isMobileOrTabletView, inboxIsOpen, closeInbox } = this.props
    const renderUserList = Boolean(myUuid)
    return (
      <Fragment>
        <ErrorBoundary key="errorBoundary">
          <Transition
            items={renderUserList}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {(user) =>
              user
                ? (styleProps) => (
                    <animated.div style={{ width: "100%", ...styleProps }}>
                      <AlertBar />
                      <Header />
                      <UserList />
                      <AlertOfflineOnline />
                    </animated.div>
                  )
                : (styleProps) => (
                    <StyledAbsoluteCenteredContainer
                      centered
                      style={styleProps}
                    >
                      <LoadingSplash />
                    </StyledAbsoluteCenteredContainer>
                  )
            }
          </Transition>
          {isMobileOrTabletView && <Notifications />}
          {isMobileOrTabletView ? (
            <Modal show={inboxIsOpen} onClose={closeInbox} opaque>
              <Transition
                items={inboxIsOpen}
                from={{ transform: "translateX(100%)" }}
                enter={{ transform: "translateX(12%)" }}
                leave={{ transform: "translateX(100%)" }}
              >
                {(show) =>
                  show && ((styleProps) => <Inbox style={styleProps} />)
                }
              </Transition>
            </Modal>
          ) : (
            <Modal show={inboxIsOpen} onClose={closeInbox}>
              <Inbox />
            </Modal>
          )}
          <Menu />
          <LoginModal />
          <SignupModal />
          <ForgotPasswordModal />
          <GroupChatInfoModal />
          <GroupChatSelect />
        </ErrorBoundary>
      </Fragment>
    )
  }
}

HomeRoute.propTypes = {
  myUuid: PropTypes.string,
  isMobileOrTabletView: PropTypes.bool.isRequired,
  inboxIsOpen: PropTypes.bool.isRequired,
  closeInbox: PropTypes.func.isRequired,
}

HomeRoute.defaultProps = {
  myUuid: null,
}

const mapActionsToProps = {
  closeInbox,
}

const mapStateToProps = (state, ownState) => {
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getMyUuid = makeGetMyUuid()
  const getInboxIsOpen = makeGetInboxIsOpen()
  return {
    ...ownState,
    myUuid: getMyUuid(state),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    inboxIsOpen: getInboxIsOpen(state),
  }
}

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(HomeRoute)
)

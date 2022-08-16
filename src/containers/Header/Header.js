import { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { animated, Transition } from "react-spring/renderprops"
import {
  DesktopDown,
  DesktopUp,
  Icon,
  //InterestLabel,
  //InterestDropdown,
  InterestList,
  InterestShape,
  Onboardings,
  InboxIndicator,
} from "../../components"
import InterestForm from "../InterestForm"
import {
  toggleMenu,
  toggleInbox,
  showKnowledgeLevelModal,
} from "../../redux/actions/modals"
import { removeInterest } from "../../redux/actions/profile"
import {
  makeGetHasMessages,
  makeGetUnreadMessages,
} from "../../redux/selectors/partners"
import { makeGetMyInterests } from "../../redux/selectors/profile"
import { makeGetInboxIsOpen } from "../../redux/selectors/modals"
import {
  makeGetIsMobileOrTabletView,
  makeGetIsMobileView,
} from "../../redux/selectors/viewport"
import {
  StyledCenterBlock,
  StyledHeader,
  StyledRightBlock,
  StyledButton,
  // StyledSearch,
  // StyledSearchText,
} from "./Styled"
import Tooltip from "../../components/Tooltip"

// const searchText = "Search for people"
const onboardingText =
  "Add languages, locations, skills, hobbies, etc here to find relevant people."

const headingText = "Find relavant people."
class Header extends PureComponent {
  render() {
    const {
      interests,
      showKnowledgeLevelModal,
      removeInterest,
      hasMessages,
      unreadMessages,
      toggleInbox,
      inboxIsOpen,
      toggleMenu,
      isMobileView,
      isMobileOrTabletView,
    } = this.props

    return (
      <StyledHeader>
        <div>
          <DesktopDown>
            <StyledButton
              blank
              onClick={toggleMenu}
              title="Click to open the Menu"
            >
              <Icon iconId="newProfile" width="30px" />
            </StyledButton>
          </DesktopDown>
        </div>
        <Onboardings
          interestsLength={interests.length}
          headerText={headingText}
          bodyText={onboardingText}
        />
        <DesktopDown>
          <StyledCenterBlock>
            <InterestForm />
            {/* {interests && interests.length > 0 && (
              <InterestDropdown>
                {interests.map((interest) => (
                  <InterestLabel
                    primary
                    key={`${interest.name.replace(/\s/g, "")}${interest.level}`}
                    interest={interest}
                    onChange={showKnowledgeLevelModal}
                    onRemove={removeInterest}
                  />
                ))}
              </InterestDropdown>
            )} */}
          </StyledCenterBlock>
        </DesktopDown>
        <DesktopUp>
          <InterestForm />
          {interests && interests.length > 0 && (
            <InterestList
              onChange={showKnowledgeLevelModal}
              onRemove={removeInterest}
              interests={interests}
            />
          )}
          {/*  : (
            <StyledSearch>
              <Icon iconId="searchArrow" width="70px" />
              <StyledSearchText>{searchText}</StyledSearchText>
            </StyledSearch>
          )*/}
        </DesktopUp>

        <StyledRightBlock>
          <Transition
            items={hasMessages}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {(hasMessages) =>
              hasMessages &&
              ((styleProps) => (
                <animated.div style={styleProps}>
                  {isMobileView ? (
                    <InboxIndicator
                      unreadMessages={unreadMessages}
                      onClick={toggleInbox}
                    />
                  ) : (
                    <InboxIndicator
                      text={
                        unreadMessages > 0
                          ? "You have unseen messages!"
                          : "Inbox"
                      }
                      unreadMessages={unreadMessages}
                      showCircle={inboxIsOpen}
                      onClick={toggleInbox}
                      isDesktop={!isMobileOrTabletView}
                    />
                  )}
                </animated.div>
              ))
            }
          </Transition>
          <DesktopUp>
            <div>
              <StyledButton
                blank
                onClick={toggleMenu}
                data-tip
                data-for="new-profile"
              >
                <Icon iconId="newProfile" width="29px" />
              </StyledButton>
              <Tooltip id="new-profile" title="Profile" />
            </div>
          </DesktopUp>
        </StyledRightBlock>
      </StyledHeader>
    )
  }
}

Header.propTypes = {
  interests: PropTypes.arrayOf(InterestShape),
  showKnowledgeLevelModal: PropTypes.func.isRequired,
  removeInterest: PropTypes.func.isRequired,
  hasMessages: PropTypes.bool.isRequired,
  unreadMessages: PropTypes.number.isRequired,
  toggleInbox: PropTypes.func.isRequired,
  isMobileView: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
  inboxIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
}

Header.defaultProps = {
  interests: [],
}

const mapActionsToProps = {
  showKnowledgeLevelModal,
  removeInterest,
  toggleInbox,
  toggleMenu,
}

// Todo: only use reselect when required
const mapStateToProps = () => {
  const getMyInterests = makeGetMyInterests()
  const getHasMessages = makeGetHasMessages()
  const getUnreadMessages = makeGetUnreadMessages()
  const getIsMobileView = makeGetIsMobileView()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getInboxIsOpen = makeGetInboxIsOpen()
  return (state, props) => ({
    ...props,
    interests: getMyInterests(state),
    hasMessages: getHasMessages(state),
    unreadMessages: getUnreadMessages(state),
    isMobileView: getIsMobileView(state),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    inboxIsOpen: getInboxIsOpen(state),
  })
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Header))

import { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Transition } from "react-spring/renderprops"
import { Scrollbars } from "react-custom-scrollbars"
import { connect } from "react-redux"
import {
  DesktopDown,
  InterestShape,
  Modal,
  ProfileHeader,
  ProfileShape,
} from "../../components"
import { ROUTE_IMPRINT, ROUTE_PRIVACY } from "../../router/routeConstants"
import {
  StyledMenuWrapper,
  StyledMenuScrollContainer,
  StyledMenuBody,
  StyledMenuSection,
  StyledMenuButton,
  StyledMenuLinks,
  StyledAppSection,
} from "./Styled"
import {
  showLoginModal,
  showSignupModal,
  closeMenu,
  showKnowledgeLevelModal,
} from "../../redux/actions/modals"
import { getDisplayMenu } from "../../redux/selectors/modals"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import {
  getMyAvatarUrl,
  getMyThemeColor,
  makeGetMyInterests,
} from "../../redux/selectors/profile"
import { getProfile } from "../../redux/reducers"
import {
  updateAvatar,
  updateUsername,
  removeInterest,
} from "../../redux/actions/profile"
import { logoutProfile } from "../../redux/actions/registration"
import {
  URL_ABOUT,
  IMG_APPLE_BLACK,
  IMG_GOOGLE_PLAY_BLACK,
  URL_APP_STORE,
  URL_GOOGLE_PLAY,
} from "../../global/constants"
import { InterestListMobile } from "../../components/InterestList"

//import InterestForm from "../InterestForm"

const transition = {
  from: { transform: "translateX(-100%)" },
  enter: { transform: "translateX(0)" },
  leave: { transform: "translateX(-100%)" },
}

class Menu extends PureComponent {
  componentWillUnmount() {
    const { closeMenu } = this.props
    closeMenu()
  }

  renderMenu() {
    const {
      avatarUrl,
      themeColor,
      username,
      updateUsername,
      updateAvatar,
      myProfile,
      showLoginModal,
      showSignupModal,
      logoutProfile,
      interests,
      showKnowledgeLevelModal,
      removeInterest,
    } = this.props
    // const transition = isMobileOrTabletView ? mobileAndTabletTransition : desktopTransition;
    const headerProps = {
      avatarUrl,
      themeColor,
      username,
      avatarText: "Click here to edit your Avatar",
      usernameText: "Click here to edit your Username",
      onUsernameChange: updateUsername,
      onAvatarChange: updateAvatar,
      acceptedAvatarFileTypes: "image/jpg,image/jpeg,image/png",
    }
    const isGuest = !myProfile || myProfile.is_guest
    return (
      <Scrollbars autoHide>
        <StyledMenuScrollContainer>
          <ProfileHeader {...headerProps} />

          <DesktopDown>
            {interests.length > 0 && (
              <InterestListMobile
                onChange={showKnowledgeLevelModal}
                onRemove={removeInterest}
                interests={interests}
              />
            )}
          </DesktopDown>
          <StyledMenuBody>
            {isGuest && (
              <StyledMenuSection>
                <p>Sync your account</p>
                <StyledMenuButton onClick={showSignupModal} primary>
                  Sign up
                </StyledMenuButton>
                <StyledMenuButton onClick={showLoginModal}>
                  Login
                </StyledMenuButton>
              </StyledMenuSection>
            )}
            <StyledMenuSection>
              <StyledAppSection>
                <a
                  href={URL_GOOGLE_PLAY}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Get the Convose App on Google Play"
                  onClick={() =>
                    window.dataLayer.push({ event: "clickAppStoreLink" })
                  }
                >
                  <img src={IMG_GOOGLE_PLAY_BLACK} />
                  <h4>Get it on</h4>
                  <h3>Google Play</h3>
                </a>
                <div />
                <a
                  href={URL_APP_STORE}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download the Convose App on the App Store"
                  onClick={() =>
                    window.dataLayer.push({ event: "clickGooglePlayLink" })
                  }
                >
                  <img src={IMG_APPLE_BLACK} />
                  <h4>Get it on</h4>
                  <h3>App Store</h3>
                </a>
              </StyledAppSection>
            </StyledMenuSection>
            <StyledMenuLinks>
              <a href={URL_ABOUT}>About</a>
              <Link to={ROUTE_PRIVACY}>Privacy Policy</Link>
              <Link to={ROUTE_IMPRINT}>Imprint</Link>
              {!isGuest && (
                <button type="button" onClick={logoutProfile}>
                  Logout
                </button>
              )}
              <a href="https://www.freepik.com/vectors/people-design">
                People design vector created by freepik
                <span>www.freepik.com</span>
              </a>
            </StyledMenuLinks>
          </StyledMenuBody>
        </StyledMenuScrollContainer>
      </Scrollbars>
    )
  }

  render() {
    const { isMobileOrTabletView, showMenu, closeMenu } = this.props
    return (
      <Modal show={showMenu} onClose={closeMenu} opaque={isMobileOrTabletView}>
        {isMobileOrTabletView ? (
          <Transition items={showMenu} {...transition}>
            {(show) =>
              show &&
              ((styleProps) => (
                <StyledMenuWrapper
                  style={{ ...styleProps }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {this.renderMenu()}
                </StyledMenuWrapper>
              ))
            }
          </Transition>
        ) : (
          <StyledMenuWrapper onClick={(e) => e.stopPropagation()}>
            {this.renderMenu()}
          </StyledMenuWrapper>
        )}
      </Modal>
    )
  }
}

Menu.propTypes = {
  isMobileOrTabletView: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string,
  themeColor: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  myProfile: ProfileShape.isRequired,
  showLoginModal: PropTypes.func.isRequired,
  showSignupModal: PropTypes.func.isRequired,
  logoutProfile: PropTypes.func.isRequired,
  loadingLogout: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool,
  interests: PropTypes.arrayOf(InterestShape),
}

Menu.defaultProps = {
  avatarUrl: "",
  showMenu: false,
  interests: [],
}

const mapStateToProps = () => {
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getMyInterests = makeGetMyInterests()
  return (state, props) => ({
    ...props,
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    avatarUrl: getMyAvatarUrl(state),
    themeColor: getMyThemeColor(state),
    username: state.profile.username,
    myProfile: getProfile(state),
    loadingLogout: state.registration.loadingLogout,
    showMenu: getDisplayMenu(state),
    interests: getMyInterests(state),
  })
}

const mapDispatchToProps = {
  updateUsername,
  updateAvatar,
  showLoginModal,
  showSignupModal,
  logoutProfile,
  closeMenu,
  showKnowledgeLevelModal,
  removeInterest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

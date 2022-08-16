import { PureComponent } from "react"
import PropTypes from "prop-types"
import { location as LocationShape } from "react-router-prop-types"
import { Transition } from "react-spring/renderprops"
import { withRouter } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import { connect } from "react-redux"
import { Button, RichText } from "../../components"
import { ROUTE_COOKIE_POLICY, ROUTE_PRIVACY } from "../../router/routeConstants"
import { StyledCookie, StyledHeadline, StyledItem } from "./Styled"
import { acceptStorageConsent } from "../../redux/actions/storage"
import { getDisplayStorageConsent } from "../../redux/selectors/storage"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import cookie from "./cookie.png"

class CookieConsent extends PureComponent {
  render() {
    const {
      acceptStorageConsent,
      displayStorageConsent,
      isMobileOrTabletView,
      location: { pathname },
    } = this.props

    if (pathname === ROUTE_PRIVACY) return null
    if (pathname.indexOf("chat/") !== -1) return null

    const defaultTransform = isMobileOrTabletView ? "-120%" : "120%"
    const mobileTransform = isMobileOrTabletView ? "translateX(-50%)" : ""

    const transitionProps = {
      items: displayStorageConsent,
      from: {
        transform: `translateY(${defaultTransform}) ${mobileTransform}`,
      },
      enter: {
        transform: `translateY(0) ${mobileTransform} `,
      },
      leave: {
        transform: `translateY(${defaultTransform}) ${mobileTransform}`,
      },
    }
    return (
      <Transition {...transitionProps}>
        {(show) =>
          show &&
          ((styleProps) => (
            <StyledCookie mobile={isMobileOrTabletView} style={styleProps}>
              <StyledItem>
                <StyledHeadline>
                  Cookies
                  <img alt="cookies" src={cookie} />
                </StyledHeadline>
                <RichText smallText inverted={false} textAlign="left">
                  {"are used by Convose. "}
                  <br />
                  <HashLink to={ROUTE_COOKIE_POLICY}>Learn more</HashLink>
                </RichText>
              </StyledItem>
              <Button primary noRadius={false} onClick={acceptStorageConsent}>
                OK
              </Button>
            </StyledCookie>
          ))
        }
      </Transition>
    )
  }
}

CookieConsent.propTypes = {
  acceptStorageConsent: PropTypes.func.isRequired,
  displayStorageConsent: PropTypes.bool.isRequired,
  location: LocationShape.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

const mapActionsToProps = {
  acceptStorageConsent,
}

const mapStateToProps = () => {
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  return (state, props) => ({
    ...props,
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    displayStorageConsent: getDisplayStorageConsent(state),
  })
}

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(CookieConsent)
)

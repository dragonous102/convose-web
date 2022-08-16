import { Fragment, useEffect } from "react"
import { BrowserRouter, Redirect, Route } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import HomeRoute from "./HomeRoute"
import ChatRoute from "./ChatRoute"
import ImprintRoute from "./ImprintRoute"
import PrivacyRoute from "./PrivacyRoute"
import ResetRoute from "./ResetPassword"
import { CookieConsent } from "../containers"
import { makeGetIsMobileOrTabletView } from "../redux/selectors/viewport"
import { initializeApp } from "../redux/actions"
import { updateProfileConnect } from "../redux/actions/profile"
import {
  ROUTE_CHAT,
  ROUTE_IMPRINT,
  ROUTE_PRIVACY,
  ROUTE_ABOUT,
  ROUTE_INFO_EXTERNAL,
  ROUTE_RESET_PASSWORD,
  ROUTE_FULL_SCREEN_CALL,
} from "./routeConstants"
import GroupChatboxRoute from "./GroupChatboxRoute"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

let visibilityChange, hidden
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden"
  visibilityChange = "visibilitychange"
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden"
  visibilityChange = "msvisibilitychange"
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden"
  visibilityChange = "webkitvisibilitychange"
}

const Router = () => {
  const dispatch = useDispatch()
  const profile = useSelector(({ profile }) => profile)
  const isMobileOrTabletView = useSelector(makeGetIsMobileOrTabletView)
  const { app_initialized: appIsInitialized } = profile
  useEffect(() => {
    document.addEventListener(visibilityChange, handleVisibilityChange, false)
    dispatch(initializeApp())
    return () =>
      document.removeEventListener(visibilityChange, handleVisibilityChange)
  }, [])

  const handleVisibilityChange = () => {
    if (!document[hidden]) {
      //this endpoint is used to reconnect to the backend here

      appIsInitialized && dispatch(updateProfileConnect())
    }
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Route
          render={({ location }) =>
            location.pathname === ROUTE_RESET_PASSWORD ? (
              <Route path={ROUTE_RESET_PASSWORD} component={ResetRoute} />
            ) : (
              <Fragment>
                <CookieConsent />
                <Route
                  exact // NOTE: `exact` to avoid circular render
                  path="/"
                  component={HomeRoute}
                />
                <Route
                  exact // NOTE: `exact` to avoid circular render
                  path="/home"
                  component={HomeRoute}
                />
                <Route
                  path={ROUTE_CHAT}
                  render={(props) =>
                    isMobileOrTabletView ? (
                      <ChatRoute {...props} />
                    ) : (
                      <Redirect to="/" />
                    )
                  }
                />
                <Route
                  path={ROUTE_FULL_SCREEN_CALL}
                  render={(props) => <GroupChatboxRoute {...props} />}
                />
                <Route path={ROUTE_IMPRINT} component={ImprintRoute} />
                <Route path={ROUTE_PRIVACY} component={PrivacyRoute} />
                <Route
                  exact
                  path={ROUTE_ABOUT}
                  render={() => {
                    window.location = ROUTE_INFO_EXTERNAL
                    return null
                  }}
                />
              </Fragment>
            )
          }
        />
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default Router

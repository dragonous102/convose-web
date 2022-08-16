import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Routes from "./router"
import { StyledApp, RebootStyles } from "./global/styles"
import { AppModal } from "./components"

// TODO: refactor App component aligned with router !
const App = () => {
  const isMobileOrTabletView = useSelector((s) => s.viewport.lessThan.large)
  const ua = navigator.userAgent.toLowerCase()
  const isIOS = /ipad|iphone|ipod/.test(ua)
  const isAndroid = /android/.test(ua)
  const [displayAppTeaser, setDisplayAppTeaser] = useState(true)
  useEffect(() => {
    window.pushlogs =
      window &&
      (process.env.NODE_ENV === "development" ||
        window.location.search.indexOf("debug") !== -1)
    setDisplayAppTeaser(isMobileOrTabletView && (isIOS || isAndroid))
  }, [])

  const {
    location: { pathname },
  } = window
  return (
    <>
      <RebootStyles />
      <StyledApp>
        {pathname === "/" && displayAppTeaser ? (
          <AppModal
            onClose={() => setDisplayAppTeaser(false)}
            isIOS={isIOS}
            isAndroid={isAndroid}
          />
        ) : (
          <Routes />
        )}
      </StyledApp>
    </>
  )
}

export default App

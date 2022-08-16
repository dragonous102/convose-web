import {
  IMG_APP_STORE,
  IMG_GOOGLE_PLAY,
  URL_APP_STORE,
  URL_GOOGLE_PLAY,
} from "../../global/constants"
import { StyledLink, StyledBadge } from "./Styled"

const AppBadge = ({ isAndroid }) => {
  return isAndroid ? (
    <StyledLink
      href={URL_GOOGLE_PLAY}
      target="_blank"
      rel="noopener noreferrer"
      title="Get the Convose App on Google Play"
      onClick={() => window.dataLayer.push({ event: "clickAppStoreLink" })}
    >
      <StyledBadge src={IMG_GOOGLE_PLAY} />
    </StyledLink>
  ) : (
    <StyledLink
      href={URL_APP_STORE}
      target="_blank"
      rel="noopener noreferrer"
      title="Download the Convose App on the App Store"
      onClick={() => window.dataLayer.push({ event: "clickGooglePlayLink" })}
    >
      <StyledBadge src={IMG_APP_STORE} />
    </StyledLink>
  )
}

export default AppBadge

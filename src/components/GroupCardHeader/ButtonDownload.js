import { URL_APP_STORE, URL_GOOGLE_PLAY } from "../../global/constants"
import { detectSystem } from "../../utils/faye/helpers"
import Icon from "../Icon"
import { StyledDownload, StyledText } from "./Styled"

const renderDownloadButton = () => {
  const operatingSystem = detectSystem()
  if (operatingSystem == "unknown") {
    return (
      <>
        <a
          href={URL_GOOGLE_PLAY}
          target="_blank"
          rel="noopener noreferrer"
          title="Download the Convose App on the App Store"
          onClick={() =>
            window.dataLayer.push({ event: "clickGooglePlayLink" })
          }
        >
          <StyledDownload primary top>
            <Icon iconId="android" width="20px" size="XL" />
            <StyledText>Google Play</StyledText>
          </StyledDownload>
        </a>
        <a
          href={URL_APP_STORE}
          target="_blank"
          rel="noopener noreferrer"
          title="Download the Convose App on the App Store"
          onClick={() =>
            window.dataLayer.push({ event: "clickGooglePlayLink" })
          }
        >
          <StyledDownload primary top>
            <Icon iconId="ios" width="20px" />
            <StyledText>ios</StyledText>
          </StyledDownload>
        </a>
      </>
    )
  }

  return (
    <a
      href={operatingSystem == "ios" ? URL_APP_STORE : URL_GOOGLE_PLAY}
      target="_blank"
      rel="noopener noreferrer"
      title="Download the Convose App on the App Store"
      onClick={() => window.dataLayer.push({ event: "clickGooglePlayLink" })}
    >
      <StyledDownload primary width="240" height="74" fontsize="20">
        <Icon
          iconId={operatingSystem == "ios" ? "ios" : "android"}
          width="40px"
        />
        <StyledText>
          {operatingSystem == "ios" ? "ios" : "Google Play"}
        </StyledText>
      </StyledDownload>
    </a>
  )
}

export default renderDownloadButton

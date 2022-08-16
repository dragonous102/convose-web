import { PureComponent } from "react"
import PropTypes from "prop-types"

import {
  GroupProfileImageWrapperBanner,
  StyledProfileImageBanner,
} from "./Styled"

class ProfileCallBanner extends PureComponent {
  render() {
    const { url, size, width, height, upperImageStyle, lowerImageStyle } =
      this.props

    return (
      <GroupProfileImageWrapperBanner length={url.length || 1}>
        {url.map((image, index) => (
          <StyledProfileImageBanner
            key={index}
            size={20}
            width={20}
            height={20}
            url={image}
            index={index + 1}
          />
        ))}
      </GroupProfileImageWrapperBanner>
    )
  }
}

ProfileCallBanner.propTypes = {
  url: PropTypes.array.isRequired,
  size: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  upperImageStyle: PropTypes.object,
  lowerImageStyle: PropTypes.object,
}

ProfileCallBanner.defaultProps = {
  size: "104px",
  width: "18px",
  height: "18px",
  upperImageStyle: {
    position: "absolute",
    top: 5,
    left: 15,
  },
  lowerImageStyle: {
    position: "absolute",
    bottom: 10,
    right: -5,
  },
}

export default ProfileCallBanner

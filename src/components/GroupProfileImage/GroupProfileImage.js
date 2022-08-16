import { PureComponent } from "react"
import PropTypes from "prop-types"

import { StyledProfileImage, GroupProfileImageWrapper } from "./Styled"

class GroupProfileImage extends PureComponent {
  render() {
    const { url, size, width, height, upperImageStyle, lowerImageStyle } =
      this.props

    return (
      <GroupProfileImageWrapper
        size={size}
        width={width}
        height={height}
        upperImageStyle={upperImageStyle}
        lowerImageStyle={lowerImageStyle}
      >
        <StyledProfileImage
          width={width}
          height={height}
          url={url[0]}
          style={upperImageStyle}
        />
        <StyledProfileImage
          size={size}
          width={width}
          height={height}
          url={url[1]}
          style={lowerImageStyle}
        />
      </GroupProfileImageWrapper>
    )
  }
}

GroupProfileImage.propTypes = {
  url: PropTypes.array.isRequired,
  size: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  upperImageStyle: PropTypes.object,
  lowerImageStyle: PropTypes.object,
}

GroupProfileImage.defaultProps = {
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

export default GroupProfileImage

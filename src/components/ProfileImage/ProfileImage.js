import { PureComponent } from "react"
import PropTypes from "prop-types"

import { StyledProfileImage, StyledStatusDisplay } from "./Styled"

class ProfileImage extends PureComponent {
  render() {
    const { withStatus, isActive, url, onClick, size, isGroup } = this.props
    const statusDisplayProps = { isActive }
    return (
      <StyledProfileImage
        url={url}
        onClick={onClick}
        size={size}
        isGroup={isGroup}
      >
        {withStatus && <StyledStatusDisplay {...statusDisplayProps} />}
      </StyledProfileImage>
    )
  }
}

ProfileImage.propTypes = {
  withStatus: PropTypes.bool,
  isActive: PropTypes.bool,
  url: PropTypes.string.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
  isGroup: PropTypes.bool,
}

ProfileImage.defaultProps = {
  isActive: false,
  withStatus: false,
  size: "60px",
  onClick: null,
  isGroup: false,
}

export default ProfileImage

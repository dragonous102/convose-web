import { PureComponent } from "react"
import PropTypes from "prop-types"
import SVGInline from "react-svg-inline"
import { StyledIcon } from "./Styled"
import { SvgIcons } from "../../const"

class Icon extends PureComponent {
  render() {
    const { className, iconId, fontSize, color, width, height, size, onClick } =
      this.props

    return (
      <StyledIcon
        className={className}
        fontSize={fontSize}
        color={color}
        width={width}
        height={height}
        size={size}
        onClick={onClick}
      >
        <SVGInline svg={SvgIcons[iconId]} />
      </StyledIcon>
    )
  }
}

Icon.propTypes = {
  iconId: PropTypes.string.isRequired,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  className: null,
  color: null,
  fontSize: null,
  width: "13px",
  height: "auto",
  size: null,
  onClick: null,
}

export default Icon

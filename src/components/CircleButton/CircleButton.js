import { PureComponent } from "react"
import PropTypes from "prop-types"
import { StyledButton, StyledLink } from "./Styled"

class CircleButton extends PureComponent {
  render() {
    const { children, onClick, ...otherProps } = this.props

    if (onClick) {
      return (
        <StyledButton onClick={onClick} {...otherProps}>
          {children}
        </StyledButton>
      )
    }
    return <StyledLink {...otherProps}>{children}</StyledLink>
  }
}

CircleButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  showCircle: PropTypes.bool,
  isDesktop: PropTypes.bool,
  alt: PropTypes.string,
  title: PropTypes.string,
}

CircleButton.defaultProps = {
  showCircle: true,
  isDesktop: false,
  onClick: null,
  alt: "No alt Text supplied",
  title: "No title text supplied",
}

export default CircleButton

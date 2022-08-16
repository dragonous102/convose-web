import PropTypes from "prop-types"
import { StyledButton } from "./Styled"

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  blank: PropTypes.bool,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  tiny: PropTypes.bool,
  primary: PropTypes.bool,
  noRadius: PropTypes.bool,
}

Button.defaultProps = {
  blank: false,
  small: false,
  tiny: false,
  primary: false,
  onClick: null,
  noRadius: false,
}

export default Button

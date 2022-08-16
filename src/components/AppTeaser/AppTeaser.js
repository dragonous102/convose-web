import { PureComponent } from "react"
import PropTypes from "prop-types"
import {
  StyledItem,
  StyledWrapper,
  StyledButton,
  StyledH1,
  StyledImg,
} from "./Styled"
import { CONVOSE_SVG } from "../../global/constants"

class AppTeaser extends PureComponent {
  render() {
    const { children, onClose } = this.props
    return (
      <StyledWrapper>
        <StyledItem>
          <StyledImg src={CONVOSE_SVG} />
        </StyledItem>
        <StyledItem>
          <StyledH1>Convose works best as an app:</StyledH1>
        </StyledItem>
        <StyledItem>{children}</StyledItem>
        <StyledItem>
          <StyledButton blank tiny onClick={onClose}>
            Or continue to the mobile beta website
          </StyledButton>
        </StyledItem>
      </StyledWrapper>
    )
  }
}

AppTeaser.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

AppTeaser.defaultProps = {
  children: null,
}

export default AppTeaser

import { PureComponent } from "react"
import PropTypes from "prop-types"
import { StyledRichTextWrapper } from "./Styled"

class RichText extends PureComponent {
  render() {
    const { children, smallText, textAlign, inverted } = this.props
    return (
      <StyledRichTextWrapper
        smallText={smallText}
        textAlign={textAlign}
        inverted={inverted}
      >
        {children}
      </StyledRichTextWrapper>
    )
  }
}

RichText.propTypes = {
  children: PropTypes.node.isRequired,
  textAlign: PropTypes.oneOf(["left", "center", "right"]),
  smallText: PropTypes.bool,
  inverted: PropTypes.bool,
}

RichText.defaultProps = {
  textAlign: "left",
  smallText: false,
  inverted: false,
}

export default RichText

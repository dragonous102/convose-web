import { PureComponent } from "react"
import PropTypes from "prop-types"
import { StyledDropdownItem, ContentWrapper, ContentSpan } from "./Styled"

class DropdownItem extends PureComponent {
  render() {
    const { children, match, alreadyExist, ...others } = this.props
    return (
      <StyledDropdownItem {...this.props}>
        {children && (
          <ContentWrapper match={match} {...others}>
            <ContentSpan alreadyExist={alreadyExist}>
              {/* <div style={{width: 27, height: 27, borderRadius: 27, backgroundColor: "grey", position: "absolute", left: 12, top: 16}}/> */}
              {children}
            </ContentSpan>
          </ContentWrapper>
        )}
      </StyledDropdownItem>
    )
  }
}

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.number.isRequired,
  alreadyExist: PropTypes.bool.isRequired,
}

export default DropdownItem

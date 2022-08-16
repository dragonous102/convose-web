import { PureComponent } from "react"
import PropTypes from "prop-types"
import InterestLabel from "../InterestLabel"
import { StyledContainer, StyledItem } from "./Styled"
import { InterestShape } from "../../utils/shapes"

class ChatInterestList extends PureComponent {
  render() {
    const { interests, showAll, onClick, topPadding, textAlign } = this.props
    return (
      <StyledContainer
        showAll={showAll}
        onClick={onClick}
        topPadding={topPadding}
        textAlign={textAlign}
      >
        {interests.map((interest) => (
          <StyledItem key={`${interest.name.replace(/\s/g, "")}`}>
            <InterestLabel interest={interest} />
          </StyledItem>
        ))}
      </StyledContainer>
    )
  }
}

ChatInterestList.propTypes = {
  interests: PropTypes.arrayOf(InterestShape).isRequired,
  showAll: PropTypes.bool,
  onClick: PropTypes.func,
  topPadding: PropTypes.number,
}

ChatInterestList.defaultProps = {
  showAll: false,
  onClick: null,
  topPadding: 0,
}

export default ChatInterestList

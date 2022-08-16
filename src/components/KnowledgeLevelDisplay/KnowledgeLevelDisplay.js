/* eslint-disable max-len */
import PropTypes from "prop-types"
import Dot from "./Dot"
import { StyledWrapper } from "./Styled"

const KnowledgeLevelDisplay = ({ primary, level }) => {
  return (
    <StyledWrapper primary={primary}>
      {Array.from({ length: 5 }, (_, index) => (
        <Dot
          key={index}
          width={9}
          height={7}
          fill={index >= level ? "#C9C9C9" : "#000000"}
        />
      ))}
    </StyledWrapper>
  )
}
KnowledgeLevelDisplay.propTypes = {
  onClick: PropTypes.func,
  level: PropTypes.number,
  primary: PropTypes.bool,
}

KnowledgeLevelDisplay.defaultProps = {
  level: 0,
  onClick: null,
  primary: false,
}
export default KnowledgeLevelDisplay

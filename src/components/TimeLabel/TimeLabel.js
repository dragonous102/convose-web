import { StyledWrapper } from "./Styled"

const TimeLabel = ({ timestring, topPadding }) => {
  return <StyledWrapper topPadding={topPadding}>{timestring}</StyledWrapper>
}

export default TimeLabel

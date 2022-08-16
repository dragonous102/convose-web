import { StyledTooltip } from "./Styled"

const Tooltip = ({ id, title, offset, place, children }) => (
  <StyledTooltip
    id={id}
    offset={offset || { top: -5, left: 0 }}
    effect="solid"
    multiline={true}
    backgroundColor="rgba(80, 83, 85, 1)"
    place={place || "top"}
  >
    <p>{title || children}</p>
  </StyledTooltip>
)

export default Tooltip

import { PureComponent } from "react"
import { StyledIndicator } from "./Styled"
import { InboxItemIndicatorShape } from "../../utils/shapes"

class InboxItemIndicator extends PureComponent {
  render() {
    const {
      indicator: { count, opened },
    } = this.props

    return count > 0 ? (
      <StyledIndicator opened={opened}>
        {count > 9 ? "9+" : count}
      </StyledIndicator>
    ) : null
  }
}

InboxItemIndicator.propTypes = {
  indicator: InboxItemIndicatorShape.isRequired,
}

export default InboxItemIndicator

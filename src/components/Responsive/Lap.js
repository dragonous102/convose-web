import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class Lap extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <Responsive minWidth={breakPoints.lap} maxWidth={breakPoints.desktop - 1}>
        {children}
      </Responsive>
    )
  }
}

Lap.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Lap

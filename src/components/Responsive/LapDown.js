import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class LapDown extends PureComponent {
  render() {
    const { children } = this.props
    return <Responsive maxWidth={breakPoints.lap - 1}>{children}</Responsive>
  }
}

LapDown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LapDown

import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class DesktopDown extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <Responsive maxWidth={breakPoints.desktop - 1}>{children}</Responsive>
    )
  }
}

DesktopDown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DesktopDown

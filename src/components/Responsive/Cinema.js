import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class Cinema extends PureComponent {
  render() {
    const { children } = this.props
    return <Responsive minWidth={breakPoints.cinema}>{children}</Responsive>
  }
}

Cinema.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Cinema

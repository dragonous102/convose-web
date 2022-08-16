import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class Palm extends PureComponent {
  render() {
    const { children } = this.props
    return <Responsive maxWidth={breakPoints.lap - 1}>{children}</Responsive>
  }
}

Palm.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Palm

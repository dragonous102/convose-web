import { PureComponent } from "react"
import PropTypes from "prop-types"
import Responsive from "react-responsive"
import { breakPoints } from "../../utils/mediaQueryHelper"

class Desktop extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <Responsive
        minWidth={breakPoints.desktop}
        maxWidth={breakPoints.cinema - 1}
      >
        {children}
      </Responsive>
    )
  }
}

Desktop.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Desktop

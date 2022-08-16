import { PureComponent } from "react"
import PropTypes from "prop-types"

class VisibilityTrigger extends PureComponent {
  constructor(props) {
    super(props)
    this.el = null
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(this.handleChange)
      this.observer.observe(this.el)
    } else {
      const { visibilityHandler } = this.props
      visibilityHandler()
    }
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  handleChange(changes) {
    changes.forEach((change) => {
      if (change.intersectionRatio > 0) {
        const { visibilityHandler } = this.props
        visibilityHandler()
      }
    })
  }

  render() {
    const { children } = this.props
    return (
      <span
        ref={(el) => {
          this.el = el
        }}
      >
        {children}
      </span>
    )
  }
}

VisibilityTrigger.propTypes = {
  children: PropTypes.node,
  visibilityHandler: PropTypes.func.isRequired,
}

VisibilityTrigger.defaultProps = {
  children: null,
}

export default VisibilityTrigger

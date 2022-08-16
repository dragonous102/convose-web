import { PureComponent, Fragment } from "react"
import PropTypes from "prop-types"

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      errorMessage: "",
    }
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      errorMessage: error,
    })
  }

  render() {
    const { children } = this.props
    const { errorMessage, hasError } = this.state
    if (hasError) {
      return (
        <Fragment>
          <h1>{errorMessage}</h1>
          {/* TODO: replace by proper Error page */}
          <h3>Please contact support@convose.com</h3>
        </Fragment>
      )
    }
    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}

ErrorBoundary.defaultProps = {
  children: null,
}

export default ErrorBoundary

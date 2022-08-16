import { Component } from "react"
import PropTypes from "prop-types"
import { location as LocationShape } from "react-router-prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import cn from "classnames"
import { Notification } from "react-notification"
import { hideAlertBar } from "../../redux/actions/alertbar"
import "./AlertBar.css"

class AlertBar extends Component {
  componentDidUpdate(prevProps) {
    const {
      location: { pathname },
      isActive,
      hideOnRouteChange,
      hideAlertBar,
    } = this.props
    if (pathname !== prevProps.location.pathname) {
      if (isActive && hideOnRouteChange) {
        hideAlertBar()
      }
    }
  }

  render() {
    const { type, hideAlertBar, message, dismissAfter, ...rest } = this.props

    const activeClasses = cn({
      shown: true,
      [`alert-${type}`]: Boolean(type),
    })

    const messageBody = (
      <div>
        <span>{message}</span>
      </div>
    )

    // Read more about `style` prop:
    // eslint-disable-next-line max-len
    // https://github.com/pburtchaell/react-notification/blob/master/docs/guides/props.md#for-single-notification-component
    return (
      <aside role="alert">
        <Notification
          {...rest}
          message={messageBody}
          /*eslint-disable */
          // NOTE: unfortunately following should be present here to overwrite style.
          style={false}
          /* eslint-enable */
          isLast={false} // https://github.com/pburtchaell/react-notification/pull/108
          // someone did pull request and added check that clear
          // timeout on willReceiveProps
          dismissAfter={dismissAfter}
          activeClassName={activeClasses}
          className="alert-bar"
          onDismiss={dismissAfter ? hideAlertBar : null}
        />
      </aside>
    )
  }
}

AlertBar.propTypes = {
  location: LocationShape.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  dismissAfter: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
    .isRequired,
  action: PropTypes.string.isRequired,
  hideAlertBar: PropTypes.func.isRequired,
  hideOnRouteChange: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default withRouter(
  connect(
    ({ alertbar }) => ({
      ...alertbar,
    }),
    { hideAlertBar }
  )(AlertBar)
)

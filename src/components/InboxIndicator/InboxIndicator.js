import { PureComponent } from "react"
import PropTypes from "prop-types"
import { StyledIndicator, StyledButton } from "./Styled"
import Icon from "../Icon"
import Tooltip from "../Tooltip"

// import CircleButton from "../CircleButton";

const SIZE_MOBILE = "30px"
const SIZE_DESKTOP = "30px"

class InboxIndicator extends PureComponent {
  render() {
    const { isDesktop, showCircle, unreadMessages, onClick, text } = this.props
    const buttonProps = {
      isDesktop,
      showCircle,
      ...(onClick && { onClick }),
      ...(text && {
        alt: text,
        title: "",
      }),
    }
    const indicatorProps = {
      unreadMessages,
      showCircle,
    }
    const size = isDesktop ? SIZE_DESKTOP : SIZE_MOBILE

    return (
      <>
        <StyledButton {...buttonProps} data-tip data-for="inbox">
          <StyledIndicator {...indicatorProps}>
            <Icon iconId="newInbox" width={size} />
          </StyledIndicator>
        </StyledButton>
        <Tooltip id="inbox" title={text} />
      </>
    )
  }
}

InboxIndicator.propTypes = {
  unreadMessages: PropTypes.number.isRequired,
  isDesktop: PropTypes.bool,
  onClick: PropTypes.func,
  showCircle: PropTypes.bool,
  text: PropTypes.string,
}

InboxIndicator.defaultProps = {
  isDesktop: false,
  onClick: null,
  showCircle: false,
  text: "No Text supplied",
}

export default InboxIndicator

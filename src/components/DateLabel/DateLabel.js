import PropTypes from "prop-types"
import { PureComponent } from "react"
import { StyledWrapper } from "./Styled"

// TODO: move this to an i18n solution
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

class DateLabel extends PureComponent {
  render() {
    const { timestamp } = this.props
    const date = new Date(timestamp)
    const formattedDateString = `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`
    return <StyledWrapper>{formattedDateString}</StyledWrapper>
  }
}

DateLabel.propTypes = {
  timestamp: PropTypes.instanceOf(Date),
}

DateLabel.defaultProps = {
  timestamp: Date.now(),
}

export default DateLabel

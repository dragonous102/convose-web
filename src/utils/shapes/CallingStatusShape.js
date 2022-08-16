import PropTypes from "prop-types"

export default PropTypes.shape({
  startTime: PropTypes.string.isRequired,
  callAccepted: PropTypes.bool.isRequired,
})

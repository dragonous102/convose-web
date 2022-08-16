import PropTypes from "prop-types"

export default PropTypes.shape({
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date),
  mine: PropTypes.bool.isRequired,
  uuid: PropTypes.string.isRequired,
})

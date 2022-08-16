import PropTypes from "prop-types"

export default PropTypes.shape({
  count: PropTypes.number.isRequired,
  opened: PropTypes.bool.isRequired,
})

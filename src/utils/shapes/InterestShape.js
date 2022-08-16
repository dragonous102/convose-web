import PropTypes from "prop-types"

export default PropTypes.shape({
  name: PropTypes.string,
  level: PropTypes.number,
  type: PropTypes.oneOf(["language", "general"]),
})

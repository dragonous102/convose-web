import PropTypes from "prop-types"

export default PropTypes.shape({
  highlightOnMount: PropTypes.bool,
  iconConfig: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string | PropTypes.object,
  value: PropTypes.bool,
})

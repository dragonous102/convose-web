import PropTypes from "prop-types"

export default PropTypes.shape({
  agoraUuid: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isVideoEnabled: PropTypes.bool.isRequired,
})

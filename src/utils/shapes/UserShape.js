import PropTypes from "prop-types"
import AvatarShape from "./AvatarShape"
import InterestShape from "./InterestShape"

export default PropTypes.shape({
  avatar: AvatarShape,
  interests: PropTypes.arrayOf(InterestShape),
  is_guest: PropTypes.bool,
  theme_color: PropTypes.string,
  username: PropTypes.string,
  uuid: PropTypes.string,
  isInCallingScreen: PropTypes.bool,
})

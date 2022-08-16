import PropTypes from "prop-types"
import { StyledWrapperMobile } from "./Styled"
import { InterestShape } from "../../utils/shapes"
import DraggedInterestsInModal from "./DraggedInterestsInModal"

const InterestListMobile = (props) => {
  const { interests, onChange, onRemove } = props
  return (
    <StyledWrapperMobile>
      <DraggedInterestsInModal
        interests={interests}
        onChange={onChange}
        onRemove={onRemove}
        mobile={true}
      />
    </StyledWrapperMobile>
  )
}

InterestListMobile.propTypes = {
  interests: PropTypes.arrayOf(InterestShape).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default InterestListMobile

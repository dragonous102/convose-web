import PropTypes from "prop-types"
import {
  StyledText,
  StyledDotsWrapper,
  StyledRowContainer,
  // StyledIconContainer,
  // StyledWordIconContainer,
} from "./Styled"
import { InterestShape } from "../../utils/shapes"
import KnowledgeLevelSelector from "../KnowledgeLevelSelector"
// import Icon from "../Icon"
// import { StyledButton } from "../ProfileHeader/Styled"

const KnowledgeLevelWidget = (props) => {
  const { interest, onChange, onClose, isMobileOrTabletView, onEditIcon } =
    props
  const { name, level, type } = interest
  const handleReset = (e) => {
    onChange(
      {
        ...interest,
        level: 0,
      },
      e
    )
    onClose()
  }

  const handleChange = (level) => {
    onChange({
      ...interest,
      level,
    })
    onClose()
  }

  // const onEditIconClick = () => {
  //   onEditIcon(1, interest)
  // }

  return (
    <>
      <StyledRowContainer>
        {/* <StyledIconContainer>
          <StyledButton
            positionAbsolute
            width="17px"
            height="17px"
            padding="none"
            rightAbsolute="0px"
            topAbsolute="0px"
            backgroundColor="#ffffff"
            marginBottom="0px"
            onClick={onEditIconClick}
          >
            <Icon iconId="edit" width="8px" />
          </StyledButton>
          <StyledWordIconContainer>{name && name[0]}</StyledWordIconContainer>
        </StyledIconContainer> */}
        <StyledText>{name}</StyledText>
      </StyledRowContainer>
      <StyledText knowledge>My knowledge level:</StyledText>
      <StyledDotsWrapper>
        <KnowledgeLevelSelector
          level={level}
          type={type}
          onChange={handleChange}
          onReset={handleReset}
          isMobileOrTabletView={isMobileOrTabletView}
        />
      </StyledDotsWrapper>
    </>
  )
}

KnowledgeLevelWidget.propTypes = {
  interest: InterestShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditIcon: PropTypes.func.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

export default KnowledgeLevelWidget

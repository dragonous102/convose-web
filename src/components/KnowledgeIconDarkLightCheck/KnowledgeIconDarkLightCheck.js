import PropTypes from "prop-types"
import { StyledMenuButton } from "../../containers/Menu/Styled"
import { InterestShape } from "../../utils/shapes"
import { StyledText } from "../KnowledgeLevelWidget/Styled"
import { StyledIconName, StyledImageIcon, StyledThemeContainer } from "./Styled"

const KnowledgeIconDarkLightCheck = (props) => {
  const { interest, onEditIcon, editIconStep } = props

  const { name, uploadIcon } = interest

  const themes = {
    darkTheme: {
      backgroundColor: "#343434",
      textColor: "#ffffff",
    },
  }

  // we go to the first page beacuase the backend isn't ready for now
  const onLooksGoodClick = () => {
    onEditIcon(0, interest)
  }

  return (
    <>
      <StyledText knowledge>
        Make sure it looks good for dark and light mode:
      </StyledText>
      <StyledThemeContainer backgroundColor={themes.darkTheme.backgroundColor}>
        <StyledImageIcon src={uploadIcon} alt={name} />
        <StyledIconName textColor={themes.darkTheme.textColor}>
          {name}
        </StyledIconName>
      </StyledThemeContainer>
      <StyledThemeContainer>
        <StyledImageIcon src={uploadIcon} alt={name} />
        <StyledIconName>{name}</StyledIconName>
      </StyledThemeContainer>
      <StyledMenuButton marginTop="38px" primary onClick={onLooksGoodClick}>
        👍 Looks good
      </StyledMenuButton>
    </>
  )
}

KnowledgeIconDarkLightCheck.propTypes = {
  interest: InterestShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditIcon: PropTypes.func.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

export default KnowledgeIconDarkLightCheck

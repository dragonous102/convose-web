import React from "react"
import PropTypes from "prop-types"
import SVGInline from "react-svg-inline"
import Icon from "../Icon"
import { SvgIcons } from "../../const"
import {
  StyledItem,
  StyledWrapper,
  StyledCloseButton,
  StyledArrow,
  StyledIconsWrapper,
} from "./Styled"

import { useSelector } from "react-redux"
import { getIsGuest } from "../../redux/selectors/profile"
import { getInterestFocus } from "../../redux/selectors/interests"

// Functional component the onboarding component
const Onboarding = (props) => {
  const [displayWrapper, setDisplayWrapper] = React.useState(true)
  const { bodyText, headerText, interestsLength } = props
  const isLogged = useSelector(getIsGuest) // Getting the isGuest state from selectors.
  const interestBtnClicked = useSelector(getInterestFocus)

  const handleCloseButton = () => {
    setDisplayWrapper(!displayWrapper)
  }

  // If isLogged is false or if the Add Interests btn is clicked, then return null otherwise, return the component.
  if (!isLogged || interestBtnClicked || interestsLength > 0) return null

  return (
    <StyledWrapper displayWrapper={displayWrapper}>
      {displayWrapper && (
        <StyledCloseButton onClick={handleCloseButton}>
          <Icon iconId="close" color="TEXT_BRIGHT" width="24px" height="24px" />
        </StyledCloseButton>
      )}
      <StyledItem header>
        <StyledIconsWrapper>
          <Icon iconId="flatPeople" width="240px" height="148px" />
        </StyledIconsWrapper>
        {headerText}
      </StyledItem>
      <StyledItem>{bodyText}</StyledItem>
      <StyledArrow displayWrapper={!!displayWrapper}>
        <SVGInline svg={SvgIcons.arrow} />
      </StyledArrow>
    </StyledWrapper>
  )
}

Onboarding.propTypes = {
  bodyText: PropTypes.string.isRequired,
}

export default Onboarding

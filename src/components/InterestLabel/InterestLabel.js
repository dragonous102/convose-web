import PropTypes from "prop-types"
import SVGInline from "react-svg-inline"
import {
  StyledInterestLabel,
  StyledWrapperInterestLabel,
  StyledContent,
  StyledPositionIndicator,
  StyledButtonContainer,
} from "./Styled"
import Icon from "../Icon"
import KnowledgeLevelDisplay from "../KnowledgeLevelDisplay"
import { LapDown, LapUp } from "../Responsive"
import { useDndContext } from "@dnd-kit/core"
import { SvgIcons } from "../../const"
import { InterestShape } from "../../utils/shapes"
const iconConfig = {
  iconId: "close",
  color: "TEXT_DARK_GREY",
  width: "24px",
  height: "24px",
}

const InterestLabel = (props) => {
  const { over } = useDndContext()
  const {
    interest,
    onRemove,
    onChange,
    primary,
    DragOverlay = false,
    activeIndex,
    index,
    isDragging,
  } = props

  const handleProficiencyDisplayClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(interest)
  }

  const handleRemoveButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(interest)
  }

  const { name, level, pending } = interest
  const labelProps = {
    primary,
    ...(primary && { onClick: handleProficiencyDisplayClick }),
  }

  const interestHover =
    name.replace(/ /g, "") == over?.id.replace(/ /g, "") && !DragOverlay

  const names = name.replace(/\[(.+?)\]/g, "")

  return (
    <StyledInterestLabel {...labelProps} isDragging={isDragging}>
      <StyledPositionIndicator
        before={activeIndex > index}
        interestHover={interestHover}
      >
        <SVGInline svg={SvgIcons.arrowDown} />
      </StyledPositionIndicator>
      {/* <div style={{width: 27, height: 27, borderRadius: 27, backgroundColor: "grey"}}/> */}
      <StyledWrapperInterestLabel isDragging={isDragging}>
        {level > 0 && <KnowledgeLevelDisplay level={level} primary={primary} />}
        <StyledContent hasRightMargin={level > 0 || onRemove || pending}>
          {names}
        </StyledContent>
      </StyledWrapperInterestLabel>
      {pending ? (
        <Icon iconId="spinner" width="24px" />
      ) : (
        onRemove && (
          <StyledButtonContainer isDragging={isDragging}>
            <LapDown>
              <Icon onClick={handleRemoveButtonClick} {...iconConfig} />
            </LapDown>
            <LapUp>
              <Icon onClick={handleRemoveButtonClick} {...iconConfig} />
            </LapUp>
          </StyledButtonContainer>
        )
      )}
    </StyledInterestLabel>
  )
}

InterestLabel.propTypes = {
  interest: InterestShape,
  primary: PropTypes.bool,
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
  activeId: PropTypes.string,
}

InterestLabel.defaultProps = {
  interest: {
    name: "label missing",
    level: null,
  },
  primary: false,
  onChange: null,
  onRemove: null,
}

export default InterestLabel

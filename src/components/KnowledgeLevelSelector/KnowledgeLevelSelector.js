/* eslint-disable max-len */
import { Fragment, PureComponent } from "react"
import PropTypes from "prop-types"
import {
  StyledWrapperKnowledgePiece,
  StyledKnowledgePiece,
  StyledText,
  StyledButtonWrapper,
} from "./Styled"
import Button from "../Button"

// TODO: move this to an i18n solution
const levels = [
  "Rate Yourself",
  "Beginner",
  "Novice",
  "Intermediate",
  "Advanced",
  "Expert",
]

class KnowledgeLevelSelector extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hoveredLevel: 0,
      selectedLevel: props.level || 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { level } = this.props
    if (prevProps.level !== level) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selectedLevel: level })
    }
  }
  handleHoveredLevelChange(hoveredLevel) {
    this.setState({ hoveredLevel })
  }

  handleClick(selectedLevel) {
    const { isMobileOrTabletView, onChange } = this.props

    isMobileOrTabletView
      ? this.setState({ selectedLevel })
      : onChange(selectedLevel)
  }

  handleSubmit() {
    const { onChange } = this.props
    const { selectedLevel } = this.state
    onChange(selectedLevel)
  }

  render() {
    const { isMobileOrTabletView, type, onReset } = this.props
    const { hoveredLevel, selectedLevel } = this.state

    return (
      <Fragment>
        <StyledWrapperKnowledgePiece
          hoveredLevel={hoveredLevel}
          selectedLevel={selectedLevel}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <StyledKnowledgePiece
              key={n}
              value={n}
              isActive={n <= selectedLevel}
              onMouseOver={() => this.handleHoveredLevelChange(n)}
              onMouseLeave={() => this.handleHoveredLevelChange(0)}
              onClick={() => this.handleClick(n)}
            >
              <StyledText intermediate={levels[n]} key={n}>
                {levels[n]}
              </StyledText>
            </StyledKnowledgePiece>
          ))}
        </StyledWrapperKnowledgePiece>

        {isMobileOrTabletView &&
          (type !== "language" ||
            (type === "language" && selectedLevel > 0)) && (
            <StyledButtonWrapper>
              <Button
                height="60"
                semiRadius
                primary
                blank
                onClick={this.handleSubmit}
              >
                Done
              </Button>
            </StyledButtonWrapper>
          )}
        {type &&
          type !== "language" &&
          selectedLevel > 0 &&
          !isMobileOrTabletView && (
            <StyledButtonWrapper>
              <Button
                semiRadius
                blank
                medium
                semibold
                hovered
                onClick={onReset}
              >
                Remove knowledge Rating
              </Button>
            </StyledButtonWrapper>
          )}
      </Fragment>
    )
  }
}

KnowledgeLevelSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  level: PropTypes.number,
  type: PropTypes.string,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

export default KnowledgeLevelSelector

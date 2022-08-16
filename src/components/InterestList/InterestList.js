import { Fragment, Component } from "react"
import PropTypes from "prop-types"
import {
  StyledButton,
  StyledClickCatcher,
  StyledItem,
  StyledList,
  StyledWrapper,
} from "./Styled"
import Icon from "../Icon"
import { InterestShape } from "../../utils/shapes"
import InterestLabel from "../InterestLabel"
import DraggedInterestsInModal from "./DraggedInterestsInModal"
const iconConfig = {
  iconId: "triangleDownNew",
  color: "TEXT_BRIGHT",
  width: "auto",
}

class InterestList extends Component {
  constructor(props) {
    super(props)

    this.childRefs = []
    this.listRef = null

    this.state = {
      topItems: 10,
      displayModal: false,
    }

    this.handleResize = this.handleResize.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps) {
    const { interests } = this.props
    if (interests.length > prevProps.interests.length) {
      this.setState({ topItems: interests.length }, () => {
        this.handleResize()
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  toggleModal() {
    const { displayModal } = this.state
    this.setState({
      displayModal: !displayModal,
    })
  }

  handleResize() {
    const length = this.childRefs.filter((el) => el && el.offsetTop == 0).length
    this.setState({
      topItems: length,
    })
  }
  render() {
    const { interests, onChange, onRemove } = this.props
    const { topItems, displayModal } = this.state
    const visibleItems = interests.length - topItems

    return (
      <StyledWrapper>
        {!displayModal && interests.length > topItems && (
          <StyledButton onClick={this.toggleModal}>
            <Icon {...iconConfig} />
          </StyledButton>
        )}
        <StyledList
          ref={(ref) => {
            this.listRef = ref
          }}
        >
          {interests.slice(0, topItems).map((interest, index) => (
            <StyledItem
              key={`${interest.name.replace(/\s/g, "")}${interest.level}`}
              ref={(ref) => {
                this.childRefs[index] = ref
              }}
              draggable={true}
              onDragStart={this.toggleModal}
            >
              <InterestLabel
                primary
                interest={interest}
                onChange={onChange}
                onRemove={onRemove}
              />
            </StyledItem>
          ))}
        </StyledList>
        {displayModal && (
          <Fragment>
            <StyledClickCatcher onClick={this.toggleModal} />
            <DraggedInterestsInModal
              interests={interests}
              onChange={onChange}
              onRemove={onRemove}
              visibleItems={visibleItems}
            />
          </Fragment>
        )}
      </StyledWrapper>
    )
  }
}

InterestList.propTypes = {
  interests: PropTypes.arrayOf(InterestShape).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default InterestList

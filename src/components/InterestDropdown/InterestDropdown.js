import { Fragment, Component, Children } from "react"
import PropTypes from "prop-types"
import {
  StyledButton,
  StyledClickCatcher,
  StyledItem,
  StyledModal,
  StyledWrapper,
} from "./Styled"
import Icon from "../Icon"

const iconConfig = {
  iconId: "triangleUp",
  color: "PRIMARY",
}

class InterestDropdown extends Component {
  constructor(props) {
    super(props)

    this.childRefs = []
    this.listRef = null

    this.state = {
      displayModal: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState((prevState) => ({
      displayModal: !prevState.displayModal,
    }))
  }

  render() {
    const { children } = this.props
    const { displayModal } = this.state

    return (
      <StyledWrapper>
        <StyledButton onClick={this.toggleModal}>
          <span>{Children.count(children)}</span>
          <Icon {...iconConfig} />
        </StyledButton>
        {displayModal && (
          <Fragment>
            <StyledClickCatcher onClick={this.toggleModal} />
            <StyledModal>
              {children.map((item) => (
                <StyledItem key={item.key} item={item} inModal>
                  {item}
                </StyledItem>
              ))}
            </StyledModal>
          </Fragment>
        )}
      </StyledWrapper>
    )
  }
}

InterestDropdown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InterestDropdown

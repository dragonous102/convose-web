import { PureComponent } from "react"
import PropTypes from "prop-types"
import { Transition } from "react-spring/renderprops"
import { StyledModal, StyledModalBody } from "./Styled"

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    const { show } = this.props
    if (show && this.modalRef) {
      this.modalRef.focus()
    }
  }

  componentDidUpdate() {
    const { show } = this.props
    if (show && this.modalRef) {
      this.modalRef.focus()
    }
  }

  handleKeyDown(e) {
    const { onClose } = this.props
    if (e.key === "Escape") {
      onClose()
    }
  }

  render() {
    const {
      show,
      onClose,
      children,
      centered,
      opaque,
      dark,
      light,
      fullScreen,
      zIndex,
      transition,
      noClickCatcher,
    } = this.props

    const modalProps = {
      ...(onClose && { onClick: onClose }),
      ...(onClose && { onKeyDown: this.handleKeyDown }),
      tabIndex: "0",
      opaque,
      dark,
      light,
      fullScreen,
      zIndex,
      ref: (ref) => {
        this.modalRef = ref
      },
      noClickCatcher,
    }

    return (
      <Transition config={{ duration: 300 }} items={show} {...transition}>
        {(showModal) =>
          showModal &&
          ((props) => (
            <StyledModal {...modalProps} style={props}>
              {centered ? (
                <StyledModalBody onClick={(e) => e.stopPropagation()}>
                  {children}
                </StyledModalBody>
              ) : (
                <div>{children}</div>
              )}
            </StyledModal>
          ))
        }
      </Transition>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  opaque: PropTypes.bool,
  centered: PropTypes.bool,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  fullScreen: PropTypes.bool,
  zIndex: PropTypes.number,
  transition: PropTypes.shape({
    from: PropTypes.object,
    enter: PropTypes.object,
    leave: PropTypes.object,
  }),
  noClickCatcher: PropTypes.bool,
}

Modal.defaultProps = {
  show: false,
  opaque: false,
  centered: false,
  onClose: null,
  dark: false,
  light: false,
  fullScreen: false,
  zIndex: 1000,
  transition: {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  },
  noClickCatcher: false,
}

export default Modal

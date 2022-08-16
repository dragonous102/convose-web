import { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { ForgotPasswordForm, Modal } from "../../components"
import { hideForgotPasswordModal } from "../../redux/actions/modals"
import { forgotPassword } from "../../redux/actions/registration"

class ForgotPasswordModal extends PureComponent {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const { forgotPassword } = this.props
    const { email } = values
    forgotPassword(email)
  }

  render() {
    const { show, hideForgotPasswordModal } = this.props

    const modalProps = {
      show,
      opaque: true,
      centered: true,
      onClose: hideForgotPasswordModal,
    }

    return (
      <Modal {...modalProps}>
        <ForgotPasswordForm
          title="Enter your email"
          onSubmitForm={this.onSubmit}
          hide={hideForgotPasswordModal}
        />
      </Modal>
    )
  }
}

ForgotPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideForgotPasswordModal: PropTypes.func.isRequired,
  emailSent: PropTypes.bool,
}

const mapDispatchToProps = {
  hideForgotPasswordModal,
  forgotPassword,
}

const mapStateToProps = () => (state, props) => ({
  ...props,
  show: state.modals.displayForgotPasswordModal,
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModal)

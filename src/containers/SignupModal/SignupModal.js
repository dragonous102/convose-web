import { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { AuthForm, Modal } from "../../components"
import {
  hideSignupModal,
  hideForgotPasswordModal,
} from "../../redux/actions/modals"
import {
  signupProfile,
  facebookSignupProfile,
  appleSignupProfile,
  googleSignupProfile,
} from "../../redux/actions/registration"

class SignupModal extends PureComponent {
  constructor(props) {
    super(props)
    this.onSignup = this.onSignup.bind(this)
    this.onFacebookAuth = this.onFacebookAuth.bind(this)
    this.onAppleAuth = this.onAppleAuth.bind(this)
    this.onGoogleAuth = this.onGoogleAuth.bind(this)
  }

  onSignup(values) {
    const { signupProfile } = this.props
    const { email, password } = values
    signupProfile({
      user: {
        email: email.toLowerCase(),
        password,
        // eslint-disable-next-line camelcase
        password_confirmation: password,
      },
    })
  }

  onFacebookAuth(values) {
    const { facebookSignupProfile } = this.props
    facebookSignupProfile(values)
  }

  onAppleAuth(values) {
    const { appleSignupProfile } = this.props
    appleSignupProfile(values)
  }

  onGoogleAuth(values) {
    const { googleSignupProfile } = this.props
    googleSignupProfile(values)
  }

  onForgotPassword() {
    const { hideForgotPasswordModal } = this.props
    hideForgotPasswordModal()
  }

  render() {
    const { show, hideSignupModal, loadingSignup } = this.props

    const modalProps = {
      show,
      opaque: true,
      centered: true,
      onClose: hideSignupModal,
    }

    return (
      <Modal {...modalProps}>
        <AuthForm
          title="Sign up"
          onSubmitForm={this.onSignup}
          onFacebookAuth={this.onFacebookAuth}
          onAppleAuth={this.onAppleAuth}
          onGoogleAuth={this.onGoogleAuth}
          hide={hideSignupModal}
          loading={loadingSignup}
          onForgotPassword={this.onForgotPassword}
          forgotPasswordText={false}
        />
      </Modal>
    )
  }
}

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideSignupModal: PropTypes.func.isRequired,
  signupProfile: PropTypes.func.isRequired,
  loadingSignup: PropTypes.bool.isRequired,
  facebookSignupProfile: PropTypes.func.isRequired,
  appleSignupProfile: PropTypes.func.isRequired,
  googleSignupProfile: PropTypes.func.isRequired,
  hideForgotPasswordModal: PropTypes.func.isRequired,
  forgotPasswordText: PropTypes.bool,
}

const mapDispatchToProps = {
  hideSignupModal,
  signupProfile,
  facebookSignupProfile,
  appleSignupProfile,
  googleSignupProfile,
  hideForgotPasswordModal,
}

const mapStateToProps = () => (state, props) => ({
  ...props,
  show: state.modals.displaySignupModal,
  loadingSignup: state.registration.loadingSignup,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal)

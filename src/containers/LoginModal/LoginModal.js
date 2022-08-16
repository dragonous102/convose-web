import { PureComponent } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { AuthForm, Modal } from "../../components"
import {
  hideLoginModal,
  showForgotPasswordModal,
} from "../../redux/actions/modals"
import {
  loginProfile,
  facebookLoginProfile,
  appleLoginProfile,
  googleLoginProfile,
} from "../../redux/actions/registration"

class LoginModal extends PureComponent {
  constructor(props) {
    super(props)
    this.onLogin = this.onLogin.bind(this)
    this.onFacebookAuth = this.onFacebookAuth.bind(this)
    this.onAppleAuth = this.onAppleAuth.bind(this)
    this.onGoogleAuth = this.onGoogleAuth.bind(this)
    this.onForgotPassword = this.onForgotPassword.bind(this)
  }

  onLogin(values) {
    const { loginProfile } = this.props
    const { email, password } = values
    loginProfile(email.toLowerCase(), password)
  }

  onFacebookAuth(values) {
    const { facebookLoginProfile } = this.props
    facebookLoginProfile(values)
  }

  onAppleAuth(values) {
    const { appleLoginProfile } = this.props
    appleLoginProfile(values)
  }

  onGoogleAuth(values) {
    const { googleLoginProfile } = this.props
    googleLoginProfile(values)
  }

  onForgotPassword() {
    const { showForgotPasswordModal, hideLoginModal } = this.props
    showForgotPasswordModal()
    hideLoginModal()
  }

  render() {
    const { show, hideLoginModal, loadingLogin } = this.props

    const modalProps = {
      show,
      opaque: true,
      centered: true,
      onClose: hideLoginModal,
    }

    return (
      <Modal {...modalProps}>
        <AuthForm
          title="Login"
          onSubmitForm={this.onLogin}
          onFacebookAuth={this.onFacebookAuth}
          onAppleAuth={this.onAppleAuth}
          onGoogleAuth={this.onGoogleAuth}
          hide={hideLoginModal}
          loading={loadingLogin}
          onForgotPassword={this.onForgotPassword}
          forgotPasswordText={true}
        />
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideLoginModal: PropTypes.func.isRequired,
  loginProfile: PropTypes.func.isRequired,
  loadingLogin: PropTypes.bool.isRequired,
  facebookLoginProfile: PropTypes.func.isRequired,
  appleLoginProfile: PropTypes.func.isRequired,
  googleLoginProfile: PropTypes.func.isRequired,
  showForgotPasswordModal: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  hideLoginModal,
  loginProfile,
  facebookLoginProfile,
  appleLoginProfile,
  googleLoginProfile,
  showForgotPasswordModal,
}

const mapStateToProps = () => (state, props) => ({
  ...props,
  show: state.modals.displayLoginModal,
  loadingLogin: state.registration.loadingLogin,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)

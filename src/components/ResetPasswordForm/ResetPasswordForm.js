import { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Formik, ErrorMessage } from "formik"
import {
  StyledForm,
  StyledFieldWrapper,
  StyledLabel,
  StyledSubmitButton,
  StyledTogglePasswordButton,
} from "../AuthForm/Styled"
import {
  ResetPasswordFormWrapper,
  PasswordField,
  StyledErrorMessageReset,
  StyledHeader,
} from "./styled"
import { resetPassword } from "../../redux/actions/registration"
import { showLoginModal } from "../../redux/actions/modals"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"

const RESET_SUCCESS_MESSAGE =
  "Congratulations! You’ve successfully changed your password."

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props)
    //this.onLogin = this.onLogin.bind(this);
    this.state = {
      showPassword: false,
      redirect: null,
      focused: false,
      windowHeight: window.innerHeight,
    }
    this.toggleShowPassword = this.toggleShowPassword.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  validatePassword(value) {
    let error
    if (!value) {
      error = "Required"
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters"
    }
    return error
  }

  toggleShowPassword() {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }

  onFocus() {
    this.setState({
      focused: true,
    })
  }

  onBlur() {
    this.setState({
      focused: false,
    })
  }

  onSubmitForm(values) {
    const params = new URL(document.location).searchParams
    const { resetPassword } = this.props
    const token = params.get("token")
    const { password } = values
    resetPassword(password, token)
  }

  onRedirect() {
    window.location.replace("convoseapp://")
  }

  render() {
    const { showPassword } = this.state
    const { resetSuccess, isMobileOrTabletView } = this.props

    return (
      <center>
        {resetSuccess ? (
          <ResetPasswordFormWrapper>
            <StyledHeader>{RESET_SUCCESS_MESSAGE}</StyledHeader>
            {isMobileOrTabletView ? (
              <StyledSubmitButton
                type="button"
                primary
                onClick={this.onRedirect}
              >
                Continue
              </StyledSubmitButton>
            ) : null}
          </ResetPasswordFormWrapper>
        ) : (
          <ResetPasswordFormWrapper
            focused={this.state.focused}
            height={this.state.windowHeight}
          >
            <h1>Set new password</h1>
            <Formik
              initialValues={{ password: "" }}
              onSubmit={(values) => {
                this.onSubmitForm(values)
              }}
            >
              <StyledForm>
                <StyledFieldWrapper>
                  <PasswordField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    validate={this.validatePassword}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                  />
                  <StyledTogglePasswordButton
                    iconId={showPassword ? "eye" : "eyeSlash"}
                    color="TEXT_DARK_GREY"
                    width="24px"
                    height="24px"
                    size="XL"
                    onClick={this.toggleShowPassword}
                  />
                  <StyledLabel>PASSWORD</StyledLabel>
                  <ErrorMessage
                    name="password"
                    component={StyledErrorMessageReset}
                  />
                </StyledFieldWrapper>
                <StyledSubmitButton type="submit" primary>
                  Continue
                </StyledSubmitButton>
              </StyledForm>
            </Formik>
          </ResetPasswordFormWrapper>
        )}
      </center>
    )
  }
}

const mapDispatchToProps = {
  resetPassword,
  showLoginModal,
}

ResetPasswordForm.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  resetSuccess: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

const mapStateToProps = () => {
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  return (state, props) => ({
    ...props,
    resetSuccess: state.registration.resetSuccess,
    isMobileOrTabletView: getIsMobileOrTabletView(state),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)

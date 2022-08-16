import { Component } from "react"
import PropTypes from "prop-types"
import { Formik, ErrorMessage } from "formik"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import AppleLogin from "react-apple-login"
import GoogleLogin from "react-google-login"
import Icon from "../Icon"
import {
  FACEBOOK_APP_ID,
  APPLE_CLIENT_ID,
  GOOGLE_CLIENT_ID,
} from "../../redux/constants"
import {
  StyledFormWrapper,
  StyledForm,
  StyledFieldWrapper,
  StyledField,
  StyledLabel,
  StyledErrorMessage,
  StyledSubmitButton,
  StyledCloseButton,
  StyledFederatedSection,
  StyledTogglePasswordButton,
  StyledInfoButton,
} from "./Styled"

const closeIconConfig = {
  iconId: "close",
  color: "TEXT_DARK_GREY",
  width: "24px",
  height: "24px",
}

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      isSubmit: false,
    }
    this.toggleShowPassword = this.toggleShowPassword.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({ isSubmit: true })
  }

  toggleShowPassword() {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }

  validateEmail(value) {
    let error
    const { isSubmit } = this.state

    if (isSubmit) {
      if (!value) {
        error = "Required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = "Invalid email address"
      }
    }
    return error
  }

  validatePassword(value) {
    let error
    const { isSubmit } = this.state
    if (isSubmit) {
      if (!value && isSubmit) {
        error = "Required"
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters"
      }
    }
    return error
  }

  render() {
    const {
      title,
      hide,
      loading,
      onSubmitForm,
      onFacebookAuth,
      onAppleAuth,
      onGoogleAuth,
      onForgotPassword,
      forgotPasswordText,
    } = this.props

    return (
      <StyledFormWrapper title={title}>
        <StyledCloseButton onClick={hide} {...closeIconConfig} />
        <h1>{title}</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            onSubmitForm(values)
          }}
        >
          {({ values }) => {
            const { email, password } = values
            const { showPassword } = this.state
            return (
              <StyledForm>
                <StyledFieldWrapper>
                  <StyledField
                    autoFocus
                    id="email"
                    name="email"
                    type="email"
                    validate={this.validateEmail}
                  />
                  <StyledLabel emptyField={!email.length ? 1 : 0}>
                    E-MAIL
                  </StyledLabel>
                  <ErrorMessage name="email" component={StyledErrorMessage} />
                </StyledFieldWrapper>
                <StyledFieldWrapper>
                  <StyledField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    validate={this.validatePassword}
                  />
                  <StyledTogglePasswordButton
                    iconId={showPassword ? "eye" : "eyeSlash"}
                    color="TEXT_DARK_GREY"
                    width="24px"
                    height="24px"
                    size="XL"
                    onClick={this.toggleShowPassword}
                  />
                  <StyledLabel emptyField={!password.length ? 1 : 0}>
                    PASSWORD
                  </StyledLabel>
                  <ErrorMessage
                    name="password"
                    component={StyledErrorMessage}
                  />
                </StyledFieldWrapper>
                {forgotPasswordText && (
                  <StyledInfoButton type="button" onClick={onForgotPassword}>
                    FORGOT PASSWORD
                  </StyledInfoButton>
                )}
                <StyledSubmitButton
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={loading}
                  primary
                >
                  {title}
                </StyledSubmitButton>
                <StyledFederatedSection>
                  <p>
                    Or
                    {` ${title.toLowerCase()} `}
                    with
                  </p>
                  <div>
                    <GoogleLogin
                      clientId={GOOGLE_CLIENT_ID}
                      cookiePolicy={"single_host_origin"}
                      scope={"profile email"}
                      responseType={"code id_token"}
                      onSuccess={onGoogleAuth}
                      render={(renderProps) => (
                        <Icon
                          iconId="googleButton"
                          height="55px"
                          width="55px"
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                    <FacebookLogin
                      appId={FACEBOOK_APP_ID}
                      fields="name,email,picture.width(200).height(200)"
                      callback={onFacebookAuth}
                      render={(renderProps) => (
                        <Icon
                          iconId="facebookButton"
                          height="55px"
                          width="55px"
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                    <AppleLogin
                      clientId={APPLE_CLIENT_ID}
                      scope={"name email"}
                      redirectURI={"https://www.convose.com"}
                      responseType={"code id_token"}
                      responseMode={"form_post"}
                      usePopup={true}
                      callback={onAppleAuth}
                      render={(renderProps) => (
                        <Icon
                          iconId="appleButton"
                          height="55px"
                          width="55px"
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                  </div>
                </StyledFederatedSection>
              </StyledForm>
            )
          }}
        </Formik>
      </StyledFormWrapper>
    )
  }
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  onFacebookAuth: PropTypes.func.isRequired,
  onAppleAuth: PropTypes.func.isRequired,
  onGoogleAuth: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
}

export default AuthForm

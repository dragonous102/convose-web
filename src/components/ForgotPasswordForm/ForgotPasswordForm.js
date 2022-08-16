import { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Formik, ErrorMessage } from "formik"
import {
  StyledForm,
  StyledFieldWrapper,
  StyledField,
  StyledLabel,
  StyledErrorMessage,
  StyledSubmitButton,
  StyledCloseButton,
} from "../AuthForm/Styled"
import { StyledFormWrapper } from "./styled"
import { StyledHeader } from "./styled"

const closeIconConfig = {
  iconId: "close",
  color: "TEXT_DARK_GREY",
  width: "24px",
  height: "24px",
}

const EMAIL_SENT_MESSAGE =
  "An email has been sent to your account. Please click the link there to reset your password."

function validateEmail(value) {
  let error
  if (!value) {
    error = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Invalid email address"
  }
  return error
}

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, hide, onSubmitForm, emailSent } = this.props
    if (!emailSent) {
      return (
        <StyledFormWrapper>
          <StyledCloseButton onClick={hide} {...closeIconConfig} />
          <h1>{title}</h1>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values) => {
              onSubmitForm(values)
            }}
          >
            {({ values }) => {
              const { email } = values
              return (
                <StyledForm>
                  <StyledFieldWrapper>
                    <StyledField
                      autoFocus
                      id="email"
                      name="email"
                      type="email"
                      validate={validateEmail}
                    />
                    <StyledLabel emptyField={!email.length ? 1 : 0}>
                      E-MAIL
                    </StyledLabel>
                    <ErrorMessage name="email" component={StyledErrorMessage} />
                  </StyledFieldWrapper>
                  <StyledSubmitButton type="submit" primary>
                    Continue
                  </StyledSubmitButton>
                </StyledForm>
              )
            }}
          </Formik>
        </StyledFormWrapper>
      )
    } else {
      return (
        <StyledFormWrapper>
          <StyledCloseButton onClick={hide} {...closeIconConfig} />
          <StyledHeader>{EMAIL_SENT_MESSAGE}</StyledHeader>
        </StyledFormWrapper>
      )
    }
  }
}

ForgotPasswordForm.propTypes = {
  title: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  emailSent: PropTypes.bool.isRequired,
}

const mapStateToProps = () => (state, props) => ({
  ...props,
  emailSent: state.registration.emailSent,
})

export default connect(mapStateToProps, null)(ForgotPasswordForm)

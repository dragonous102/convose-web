import styled, { css } from "styled-components/macro"
import { Form, Field } from "formik"
import Icon from "../Icon"
import { media } from "../../utils/mediaQueryHelper"
import { StyleConst } from "../../const"

const { COLORS, SHADOWS } = StyleConst

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 95vw;
  height: 614px;
  /* height: 514px; */
  background: ${COLORS.TEXT_BRIGHT};
  border-radius: 20px;
  ${media.lap`
    width: 536px;
  `}

  h1 {
    ${"" /* margin: 64px 0px 22px; */}
    margin: ${(props) =>
      props.title === "Login" ? "64px 0px 36px" : "64px 0px"};
    font-size: 30px;
    font-weight: bold;
    line-height: 16px;
    letter-spacing: 0.433333px;
  }
`

const StyledForm = styled(Form)`
  background: #fff;
`

const StyledFieldWrapper = styled.div`
  position: relative;
  width: 310px;
  height: 60px;
  background: #fff;
  border-radius: 10px;
  padding: 6px 8px;
  margin: 16px 0;

  &:focus-within {
    box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.08);
  }

  text {
    font-size: 10px;
    color: #ff5e5e;
  }
`

const StyledField = styled(Field)`
  width: 290px;
  height: 45px;
  border: none;
  outline: 0;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding: 8px 12px 2px 12px;
  filter: none;

  &:focus {
    border: none;
  }

  &:-webkit-autofill {
    background-color: transparent !important;
    box-shadow: 0 0 0 50px white inset;
  }
`

const topLabel = css`
  top: 6px;
`

const StyledLabel = styled.label`
  position: absolute;
  pointer-events: none;
  left: 22px;
  top: 14px;
  font-size: 12px;
  font-weight: 600;
  color: #a0a0a0;
  transition: 0.3s ease all;
  ${(props) => !props.emptyField && topLabel};

  ${StyledField}:focus ~ & {
    ${topLabel};
  }
`

const StyledErrorMessage = styled.p`
  margin-top: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #ff5e5e;
  transition: 0.2s ease-out all;

  ${StyledField}:focus ~ & {
    margin-top: 12px;
  }
`

const StyledSubmitButton = styled.button`
  display: block;
  width: 135px;
  height: 56px;
  border-radius: 40px;
  margin: 36px auto 0 auto;
  /* margin: 64px auto 0 auto; */
  box-sizing: border-box;
  border: 2px solid ${COLORS.PRIMARY};
  background: ${(props) =>
    props.primary ? COLORS.PRIMARY : COLORS.TEXT_BRIGHT};
  cursor: pointer;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 0.433333px;
  color: ${(props) => (props.primary ? COLORS.TEXT_BRIGHT : COLORS.PRIMARY)};
  opacity: ${(props) => (props.disabled ? ".5" : "1")};

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: none;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props) =>
      props.primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
    border-color: ${(props) =>
      props.primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
  }

  &:active {
    background: ${(props) =>
      props.primary ? COLORS.PRIMARY_ACTIVE : COLORS.LIGHT_ACTIVE};
    border-color: ${(props) =>
      props.primary ? COLORS.PRIMARY_ACTIVE : COLORS.LIGHT_ACTIVE};
  }
`

const StyledCloseButton = styled(Icon)`
  position: absolute;
  right: 32px;
  top: 32px;
`

const StyledInfoButton = styled.button`
  align-self: center;
  display: flex;
  color: ${COLORS.PRIMARY};
  font-weight: bold;
  font-size: 11px;
  line-height: 16px;
  background: #fff;
  border: none;
  cursor: pointer;
  margin: 32px auto;
`

const StyledFederatedSection = styled.div`
  margin-top: 4px;
  padding: 36px;
  text-align: center;

  p {
    color: #6a6a6a;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    line-height: 16px;
  }

  & div {
    padding-top: 20px;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
  }

  svg.SVGInline-svg:hover {
    filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1));
  }

  svg.SVGInline-svg:active {
    filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.2));
  }
`

const StyledTogglePasswordButton = styled(Icon)`
  right: 16px;
  bottom: 14px;
  position: absolute;
`

export {
  StyledFormWrapper,
  StyledForm,
  StyledFieldWrapper,
  StyledField,
  StyledLabel,
  StyledErrorMessage,
  StyledSubmitButton,
  StyledCloseButton,
  StyledInfoButton,
  StyledFederatedSection,
  StyledTogglePasswordButton,
}

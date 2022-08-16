import styled, { css } from "styled-components/macro"
import { StyleConst } from "../../const"
import { Field } from "formik"

const { COLORS } = StyleConst

export const ResetPasswordFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 95vw;
  height: 614px;
  /* height: 514px; */
  background: ${COLORS.TEXT_BRIGHT};
  border-radius: 20px;

  transform: translateY(0);
  transition: transform 0.2s ease-out;

  ${(props) =>
    props.focused &&
    props.height > 640 &&
    props.height < 750 &&
    css`
      transform: translateY(-20%);
    `};

  ${(props) =>
    props.focused &&
    props.height > 470 &&
    props.height < 640 &&
    css`
      transform: translateY(-20px);
    `};

  h1 {
    margin: 64px 0;
    font-size: 30px;
    font-weight: bold;
    line-height: 16px;
    letter-spacing: 0.433333px;
  }
`

export const PasswordField = styled(Field)`
  width: 290px;
  height: 45px;
  border: none;
  outline: 0;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding: 8px 12px 2px 12px;
  filter: none;
  initial-scale=1;
  maximum-scale=1;
  &:focus {
    border: none;
  }
`

export const StyledErrorMessageReset = styled.p`
  margin-top: 12px;
  font-size: 11px;
  font-weight: 600;
  color: #ff5e5e;
  transition: 0.2s ease-out all;

  ${PasswordField}:focus ~ & {
    margin-top: 16px;
  }
`

export const StyledHeader = styled.h2`
  margin-left: 30%;
  margin-right: 30%;
  font-size: 30px;
  line-height: normal;
`

import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS } = StyleConst

const dragAndDropContainerStyle = {
  width: "331px",
  height: "38px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "37.5px",
  marginBottom: "18.5px",
}

const StyledUploadIconButton = styled.label`
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 300px;
  height: 56px;
  border-radius: 40px;
  margin: 0 auto 16px auto;
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
  transition: all 200ms ease-in-out;
  ${media.lap`
  width: 316px;
`}

  &:last-of-type {
    margin-bottom: 0;
  }

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: none;
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

export { dragAndDropContainerStyle, StyledUploadIconButton }

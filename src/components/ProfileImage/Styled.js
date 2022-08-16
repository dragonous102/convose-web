import styled from "styled-components/macro"
import { StyleConst } from "../../const"
const { COLORS } = StyleConst

const StyledProfileImage = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  ${(props) => `background-image: url(${props.url});`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: ${(props) => (props.isGroup ? "contain" : "cover")};
  border-radius: ${(props) => (props.isGroup ? "0" : "50%")};
  box-sizing: border-box;
  position: relative;
  pointer-events: none;
`

const StyledStatusDisplay = styled.div`
  width: 17px;
  height: 17px;
  bottom: 0;
  right: 0;
  position: absolute;
  border-radius: 50%;
  border: 2px solid ${COLORS.TERTIARY};
  background-color: ${(props) =>
    props.isActive ? COLORS.USER_ACTIVE : COLORS.USER_INACTIVE};
`

export { StyledProfileImage, StyledStatusDisplay }

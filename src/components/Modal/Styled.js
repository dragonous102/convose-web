import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS } = StyleConst

const StyledModal = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ zIndex }) => zIndex};

  &,
  &:focus {
    outline: none;
  }

  ${({ opaque }) =>
    opaque &&
    `
    position: fixed;
    background: ${COLORS.MODAL_BACKGROUND};
  `}

  ${({ dark }) =>
    dark &&
    `
    background: ${COLORS.MODAL_BACKGROUND_DARK};
  `}

${({ light }) =>
    light &&
    `
    background: ${COLORS.BACKGROUND};
  `}
  
  ${({ noClickCatcher }) =>
    noClickCatcher &&
    `
    pointer-events: none;
  `}
`

const StyledModalBody = styled.div`
  position: fixed;
  background: white;
  height: ${({ fullScreen }) => (fullScreen ? "100%" : "auto")};
  ${({ fullScreen }) =>
    fullScreen &&
    `
    width: 100%;
  `}
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${({ fullScreen }) => (fullScreen ? "0px" : "20px")};
  pointer-events: all;
`

export { StyledModal, StyledModalBody }

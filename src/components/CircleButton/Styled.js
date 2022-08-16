import styled, { css } from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, SHADOWS, TRANSITION } = StyleConst
const SIZE_MOBILE = "46px"
const SIZE_DESKTOP = "58px"

const styles = css`
  width: ${({ isDesktop }) => (isDesktop ? SIZE_DESKTOP : SIZE_MOBILE)};
  height: ${({ isDesktop }) => (isDesktop ? SIZE_DESKTOP : SIZE_MOBILE)};
  border-radius: 50%;
  background: ${({ showCircle }) =>
    showCircle ? COLORS.TEXT_BRIGHT : "transparent"};
  box-shadow: ${({ showCircle }) =>
    showCircle
      ? SHADOWS.BOX_SHADOW_CIRCLE_BUTTON
      : SHADOWS.BOX_SHADOW_CIRCLE_BUTTON_TRANSPARENT};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background ${TRANSITION.DURATION} ${TRANSITION.EASING} box-shadow
    ${TRANSITION.DURATION} ${TRANSITION.EASING};
`

const StyledButton = styled.button`
  ${styles};
  border: 0;
  padding: 0;
`

const StyledLink = styled.div`
  ${styles};
`

export { StyledButton, StyledLink }

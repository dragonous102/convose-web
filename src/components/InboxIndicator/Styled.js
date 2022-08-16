import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
import Button from "../Button"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

const StyledIndicator = styled.div`
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 50%;
    background-color: ${COLORS.SIGNAL.WARN};
    opacity: 0;
    transition: opacity ${TRANSITION.DURATION} ${TRANSITION.EASING};
    color: ${COLORS.TEXT_BRIGHT};
    bottom: 16px;
    right: -7px;
    width: 18px;
    height: 18px;
    font-size: ${FONT_SIZES.XS};
    line-height: 18px;
    ${FONT.BOLD};
    ${media.desktop`
      bottom: 17px;
      right: -10px;
      width: 24px;
      height: 24px;
      font-size: ${FONT_SIZES.SXS};
      line-height: 24px;
    `}
  }

  ${({ unreadMessages, showCircle }) =>
    unreadMessages &&
    unreadMessages > 0 &&
    !showCircle &&
    `
    &::after {
      content: '${unreadMessages > 9 ? "9+" : unreadMessages}';
      opacity: 1;
    }
  `}
`

const StyledButton = styled(Button)`
  width: 57px;
  height: 57px;
  border: none;
  border-radius: 50%;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 250ms ease-in-out;
  z-index: 1;
  margin-bottom: 0;

  &::-moz-focus-inner {
    border: none;
  }

  &:hover {
    background: ${COLORS.BACKGROUND_PROFILE_INBOX};
  }

  &:focus {
    background: ${COLORS.BACKGROUND_PROFILE_INBOX};
    outline: none;
  }

  &:active {
    background: ${COLORS.LIGHT_ACTIVE};
    outline: none;
  }
`

export { StyledIndicator, StyledButton }

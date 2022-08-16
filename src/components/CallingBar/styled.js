import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS } = StyleConst

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.isInGroupCalling ? "32px" : "60px")};
  height: ${(props) => (props.isInGroupCalling ? "32px" : "60px")};
  margin-right: ${(props) => (props.isInGroupCalling ? "5px" : "10px")};
  margin-left: ${(props) => (props.isInGroupCalling ? "5px" : "10px")};
  background-color: ${(props) => props.backgroundColor};
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? "#ccc" : COLORS.CARD_ICONS)};
  transition: all 200ms ease-in-out;
  box-shadow: ${(props) =>
    props.isInGroupCalling
      ? props.themeColor !== "hangUup"
        ? "0px 6px 24px rgba(0, 0, 0, 0.15)"
        : "0px 6px 24px rgba(0, 0, 0, 0.33)"
      : "none"};
  ${media.desktop`
    /* padding: 0 4px 0 12px; */
  `}
  span {
    display: none;
  }

  svg.SVGInline-svg {
    fill: none;
  }

  &:hover {
    ${(props) =>
      props.themeColor !== "hangUp"
        ? (props) =>
            props.lightHover ? `background:#E7F9FF` : `background:#35BFEF`
        : `background:${COLORS.HANGUP_HOVER}`}
  }

  &:active {
    ${({ disabled }) => !disabled && `background: ${COLORS.LIGHT_ACTIVE}`};
    ${({ disabled }) => !disabled && `color: ${COLORS.CARD_ICONS_ACTIVE}`};
  }
`

export { StyledButton, StyledButtonGroup }

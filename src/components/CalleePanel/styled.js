import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

const StyledWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.TEXT_BRIGHT};
  z-index: 11;
  box-sizing: border-box;
  border: none;
  overflow: hidden;
  border-radius: 12px;
`

const StyledName = styled.p`
  ${FONT.BOLD};
  position: relative;
  color: ${(props) => props.themeColor};
  font-size: ${FONT_SIZES.XL};
  line-height: 30px;
  transition: all ${TRANSITION.DURATION} ${TRANSITION.EASING};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledStatus = styled.p`
  ${FONT.LIGHT};
  position: relative;
  font-size: ${FONT_SIZES.XXS};
  line-height: 1.2;
  color: ${({ color }) => color};
  width: auto;
  text-align: center;
  height: 15px;
`
const StyledButtonGroup = styled.div`
  display: flex;
  position: relative;
  align-self: center;
  padding-top: 30px;
  z-index: 20;
`

const StyledButton = styled.button`
  /* padding: 0 24px 0 12px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: ${(props) =>
    props.themeColor === "call" ? "#1DD200" : "#FF6F6F"};
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? "#ccc" : COLORS.CARD_ICONS)};
  transition: all 200ms ease-in-out;
  ${media.desktop`
    /* padding: 0 4px 0 12px; */
  `}
  span {
    display: none;
  }

  svg.SVGInline-svg {
    fill: none;
    height: ${(props) => (props.small ? "15px" : "1rem")};
  }

  &:hover {
    ${(props) =>
      props.themeColor !== "hangup" && props.themeColor !== "call"
        ? `background:${COLORS.LIGHT_HOVER}`
        : `opacity:0.5`}
  }

  &:active {
    ${({ disabled }) => !disabled && `background: ${COLORS.LIGHT_ACTIVE}`};
    ${({ disabled }) => !disabled && `color: ${COLORS.CARD_ICONS_ACTIVE}`};
  }
`

export {
  StyledStatus,
  StyledName,
  StyledButton,
  StyledButtonGroup,
  StyledWrapper,
}

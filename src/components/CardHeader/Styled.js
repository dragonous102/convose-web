import styled from "styled-components/macro"
import ReactTooltip from "react-tooltip"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION, SHADOWS } = StyleConst

const Wrapper = styled.header`
  position: relative;
  padding: ${(props) => (props.showCloseButton ? "18px" : "0 18px")};
  display: flex;
  align-items: center;
  z-index: 10;
  flex: 0 0 auto;
  transition: all ${TRANSITION.DURATION} ${TRANSITION.EASING};
  height: ${(props) => (props.showCloseButton ? "58px" : "80px")};
  width: 100%;
  ${media.desktop`
    height: ${(props) => (props.showCloseButton ? "45px" : "90px")};
    padding: ${(props) => (props.showCloseButton ? "0 9px" : "4px 0 4px 16px")};
  `}
`

const ProfileImageWrapper = styled.button`
  transition: transform ${TRANSITION.DURATION} ${TRANSITION.EASING};
  background: 0;
  border: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  ${(props) => props.showCloseButton && "margin: 0px 5px 0px 10px"};
  ${media.desktop`
  margin:0px;
  ${(props) =>
    props.showCloseButton && "transform: scale(1.15) translate(-15px, 4px)"};`};

  ${({ onClick }) => onClick && "cursor: pointer;"}
`

const Username = styled.div`
  cursor: pointer;
  color: ${COLORS.TEXT_BRIGHT};
  margin: 0 16px 0 0;
  flex: 2 1 auto;
  position: relative;
  height: 30px;
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`

const StyledName = styled.p`
  ${FONT.BOLD};
  color: ${(props) => props.themeColor};
  font-size: ${FONT_SIZES.L};
  line-height: 30px;
  transition: all ${TRANSITION.DURATION} ${TRANSITION.EASING};
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 12px;
  margin-left: ${(props) => (props.isOpen ? "-10px" : "0")};
  ${media.desktop`
  font-size: ${FONT_SIZES.XL};
  `}
`

const StyledStatus = styled.p`
  ${FONT.LIGHT};
  font-size: ${FONT_SIZES.XXS};
  line-height: 1.2;
  color: ${({ color }) => color};
  width: auto;
  text-align: left;
`

const StyledButton = styled.button`
  /* padding: 0 24px 0 12px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: none;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  color: ${({ disabled }) => (disabled ? "#ccc" : COLORS.CARD_ICONS)};
  transition: all 200ms ease-in-out;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  ${media.desktop`
    /* padding: 0 4px 0 12px; */
  `}
  span {
    display: none;
  }

  svg.SVGInline-svg {
    height: ${(props) => (props.small ? "20px" : "1rem")};
  }

  &:hover {
    ${({ disabled }) => !disabled && `background: ${COLORS.LIGHT_HOVER}`};
  }

  &:active {
    ${({ disabled }) => !disabled && `background: ${COLORS.LIGHT_ACTIVE}`};
    ${({ disabled }) => !disabled && `color: ${COLORS.CARD_ICONS_ACTIVE}`};
  }
`

const StyledButtonGroup = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

const StyledBackToCallButton = styled.button`
  /* padding: 0 24px 0 12px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 130px;
  background-color: #77cf68;
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  ${media.desktop`
  /* padding: 0 4px 0 12px; */
`}
  span {
    color: white;
  }

  svg.SVGInline-svg {
    fill: none;
    height: ${(props) => (props.small ? "15px" : "1rem")};
  }
`

const ReactTooltipStyled = styled(ReactTooltip)`
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.7rem !important;
  height: 30px !important;
  text-align: center;
  line-height: 14px;
`

const StyledSettingsButton = styled.button`
  position: absolute;
  right: 44px;
  top: 44px;
  background-color: white;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.12);
  border: none;
  border-radius: 10px;
  width: 115px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 15px 16px;
  transition: all 200ms ease-in-out;
  box-shadow: ${SHADOWS.BOX_SHADOW_CARD_HEADER};
  p {
    font-size: 16px;
    padding-right: 6px;
  }

  &:hover {
    background: ${COLORS.LIGHT_HOVER};
  }

  &:active {
    background: ${COLORS.LIGHT_ACTIVE};
    color: ${COLORS.CARD_ICONS_ACTIVE};
  }
`

export {
  ProfileImageWrapper,
  Username,
  StyledName,
  StyledStatus,
  Wrapper,
  StyledButton,
  StyledButtonGroup,
  StyledBackToCallButton,
  ReactTooltipStyled,
  StyledSettingsButton,
}

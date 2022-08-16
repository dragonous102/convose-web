import styled, { css } from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION, SHADOWS } = StyleConst

const Wrapper = styled.header`
  position: relative;
  width: 100%;
  padding: ${(props) => (props.showCloseButton ? "18px" : "0 18px")};
  display: flex;
  align-items: center;
  z-index: 10;
  flex: 0 0 auto;
  transition: all ${TRANSITION.DURATION} ${TRANSITION.EASING};
  height: ${(props) => (props.showCloseButton ? "58px" : "80px")};
  ${({ showProfile }) =>
    !showProfile && `box-shadow:${SHADOWS.BOX_SHADOW_CARD_HEADER};`}
  ${media.desktop`
    box-shadow:none;
    height: ${(props) => (props.showCloseButton ? "45px" : "90px")};
    padding: ${(props) => (props.showCloseButton ? "0 9px" : "4px 0 4px 16px")};
  `};
`

const ProfileImageWrapper = styled.button`
  transition: transform ${TRANSITION.DURATION} ${TRANSITION.EASING};
  background: 0;
  border: 0;
  ${(props) => props.showCloseButton && "margin: 0px 0px 0px 15px"};
  ${(props) =>
    props.showCloseButton && "transform: scale(1.5) translate(-15px, 4px)"};
  z-index: -1;
  ${media.desktop`
  margin:0px;
  `};
  ${({ onClick }) => onClick && "cursor: pointer;"}
`

const Username = styled.div`
  cursor: pointer;
  color: ${COLORS.TEXT_BRIGHT};
  margin: 0 16px 0 0;
  flex: 2 1 auto;
  position: relative;
  height: 30px;
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledName = styled.p`
  ${FONT.BOLD};
  /* color: ${(props) => props.themeColor}; */
  //TODO: put this into const? Remove magic number value
  color: #404040;
  font-size: ${FONT_SIZES.LXL};
  line-height: 30px;
  transition: all ${TRANSITION.DURATION} ${TRANSITION.EASING};
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 12px;
`

const StyledStatus = styled.p`
  ${FONT.LIGHT};
  font-size: ${FONT_SIZES.XXS};
  line-height: 1.2;
  color: ${({ color }) => color || COLORS.TEXT_DARK};
  width: auto;
  text-align: left;
`

const StyledPopup = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  color: #0000;
  border-radius: 14px;
  width: 330px;
  height: 360px;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`
const StyledPopupDesktop = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  color: #0000;
  border-radius: 14px;
  width: 200px;
  height: 200px;
  top: 40px;
  right: 12px;
  z-index: 10;
  box-shadow: ${SHADOWS.BOX_SHADOW_CARD};
`
const StyledPopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgb(0 0 0 / 36%);
  align-items: center;
  justify-content: center;
  z-index: 9;
  top: 0px;
  left: 0px;
`
const StyledJoinCallContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 43px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: #77cf68;
  cursor: pointer;
  color: #fff;
`
const StyledJoinCallText = styled.div`
  color: #fff;
  margin-left: 10px;
  font-size: 14px;
  font-style: italic;
  font-weight: 500;
`

const StyledContentPopup = styled.h3`
  font-size: ${FONT_SIZES.LXL};
  color: ${COLORS.TEXT_DARK};
  ${FONT.SEMIBOLD};
  margin-top: -5px;
  padding: 0px 40px 30px 40px;
  line-height: 33px;
  ${media.desktop`
     padding:10px 20px;
     line-height:20px;
     font-size:${FONT_SIZES.L};
  `}
`

const StyledDownload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PRIMARY};
  border-radius: 99px;
  width: ${({ width }) => (width ? `${width}px` : "160px")};
  height: ${({ height }) => (height ? `${height}px` : "40px")};
  margin-top: ${(props) => (props.top ? "9px" : "4px")};
  margin-bottom: ${(props) => (props.top ? "4px" : "6px")};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${(props) =>
      props.primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
    border-color: ${(props) =>
      props.primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
  }
`
const StyledText = styled.span`
  font-size: ${FONT_SIZES.L};
  margin-left: 4px;
  ${FONT.DEFAULT};
  color: ${COLORS.LIGHT};
`
const sharedStyle = css`
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
  color: ${(props) => (props.color ? props.color : COLORS.CARD_ICONS)};
  transition: all 200ms ease-in-out;

  span {
    display: none;
  }

  svg.SVGInline-svg {
    height: ${(props) => (props.small ? "20px" : "1rem")};
  }

  &:hover {
    background: ${COLORS.LIGHT_HOVER};
    color: ${COLORS.CALL_HOVER};
  }

  &:active {
    background: ${COLORS.LIGHT_ACTIVE};
    color: ${COLORS.CARD_ICONS_ACTIVE};
  }
`
const StyledButton = styled.button`
  ${sharedStyle}
`
const StyledButtonJoinCall = styled.button`
  ${sharedStyle}
  width: 100px;
  background: #47d947;
  color: white;
  border-radius: 9px;
`

const StyledButtonGroup = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`

const StyledLeaveButton = styled.button`
  position: absolute;
  right: 44px;
  top: 44px;
  background-color: white;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.12);
  border: none;
  border-radius: 10px;
  width: 170px;
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
  StyledLeaveButton,
  StyledPopup,
  StyledContentPopup,
  StyledDownload,
  StyledJoinCallContainer,
  StyledJoinCallText,
  StyledPopupWrapper,
  StyledPopupDesktop,
  StyledText,
  StyledButtonJoinCall,
}

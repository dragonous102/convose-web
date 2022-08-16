import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.showCloseButton ? "auto" : "pointer")};
  position: absolute;
  z-index: 11;
  width: ${(props) => (props.isMinimized ? 0 : "100%")};
  height: ${(props) => (props.isMinimized ? 0 : "100%")};
  margin: "0";
  ${media.lap`
    width:  "100%" ;
    height: "100%" ;
  `}
  ${media.desktop`
    margin: 0;
    transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
    width: "354px";
    height: "290px";
  `}
  ${media.ultrawide`
    width: "440px";
    height:"340px";
  `}
`

const StyledProfileImage = styled.div`
  //margin-top:50px;
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

const StyledButtonGroup = styled.div`
  display: flex;
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

const StyledName = styled.p`
  ${FONT.BOLD};
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
  font-size: ${FONT_SIZES.XXS};
  line-height: 1.2;
  color: ${({ color }) => color};
  width: auto;
  text-align: center;
  height: 15px;
`

const VideoBox = styled.div`
  height: 100%;
  align-content: center;
`
const CallingBarWrapper = styled.div`
  //background-color: rgba(141, 141, 141, 0.66);
  position: absolute;
  bottom: 20px;
  z-index: 1;
  align-self: center;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledProfileWrapper = styled.div`
  align-self: center;
  margin-top: 15%;
`
const StyledHeader = styled.div``
const StyledHeaderButton = styled.button`
  /* padding: 0 24px 0 12px; */
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  z-index: 5;
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
  ${media.desktop`
  /* padding: 0 4px 0 12px; */
`}
  span {
    display: none;
  }

  svg.SVGInline-svg {
    // fill: none;
    height: ${(props) => (props.small ? "15px" : "1rem")};
  }

  &:hover {
    ${({ disabled }) => !disabled && `background: ${COLORS.LIGHT_HOVER}`};
  }

  &:active {
    ${({ disabled }) => !disabled && `background: ${COLORS.LIGHT_ACTIVE}`};
    ${({ disabled }) => !disabled && `color: ${COLORS.CARD_ICONS_ACTIVE}`};
  }
`

const StyledGrid = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`

const StyledProfileWrapperHalf = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export {
  StyledButton,
  StyledWrapper,
  StyledButtonGroup,
  StyledName,
  StyledStatus,
  StyledProfileImage,
  VideoBox,
  CallingBarWrapper,
  StyledProfileWrapper,
  StyledHeader,
  StyledHeaderButton,
  StyledGrid,
  StyledProfileWrapperHalf,
}

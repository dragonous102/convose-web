import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
const { COLORS, TRANSITION } = StyleConst

const StyledContainer = styled.div`
  display: block;
  cursor: ${(props) => (props.showCloseButton ? "auto" : "pointer")};
  position: relative;
  width: 100%;
  height: ${(props) => (props.showCloseButton ? "100%" : "auto")};
  margin: ${(props) => (props.showCloseButton ? "0px" : "8px 0px")};

  ${media.lap`
    width: ${(props) => (props.showCloseButton ? "100%" : "310px")};
    height: ${(props) => (props.showCloseButton ? "100%" : "250px")};
    `}
  ${media.desktop`
    transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
    width: ${(props) => (props.showCloseButton ? "354px" : "310px")};
    height: ${(props) => (props.showCloseButton ? "280px" : "250px")};
    `}
    ${media.ultrawide`
    width: ${(props) => (props.showCloseButton ? "440px" : "350px")};
    height: ${(props) => (props.showCloseButton ? "325px" : "250px")};
    `}
`

const CalleePanel = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.TEXT_BRIGHT};
  margin: 0;
  ${media.lap`
    width:100%;
    height: 100%;
    `}
  ${media.desktop`
    margin: 0;
    transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
    width: 354px;
    height: 290px;
    `}
    ${media.ultrawide`
    width:440px;
    height: 340px;
    `}
`
const GroupCallHeader = styled.div`
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 14px 14px 0px 0px;
  width: 100%;
  z-index: 2;
  height: 45px;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.isGroupCallingHeaderHovered ? "1" : "0")};
`
const StyledHeaderButton = styled.div`
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
  color: ${COLORS.CARD_ICONS};
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
    background: ${COLORS.LIGHT_HOVER};
  }

  &:active {
    background: ${COLORS.LIGHT_ACTIVE};
    color: ${COLORS.CARD_ICONS_ACTIVE};
  }
`

const StyledHeaderButtonGroup = styled.div`
  display: flex;
  flex: 2;
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5px;
`
const GroupImageWrapper = styled.div`
  position: relative;
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
`

const StyledHeaderName = styled.p`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 33px;
  /* identical to box height */
  display: flex;
  align-items: center;
  color: #404040;
  flex: 2;
`

const AvatarImage = styled.div`
  position: absolute;
  top: ${(props) => (props.position === "top" ? "0" : "10px")};
  left: ${(props) => (props.position === "top" ? "0" : "10px")};
  z-index: ${(props) => (props.position === "top" ? "3" : "4")};
  border-radius: 50%;
  ${(props) => `background-image: url(${props.url});`};
  width: 25px;
  height: 25px;
  background-size: cover;
`
const StyledBackButton = styled.div`
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
    fill: none;
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

export {
  CalleePanel,
  GroupCallHeader,
  StyledHeaderButton,
  StyledHeaderButtonGroup,
  GroupImageWrapper,
  StyledHeaderName,
  AvatarImage,
  StyledBackButton,
  StyledContainer,
}

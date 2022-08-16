import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
const { COLORS, TRANSITION, FONT, FONT_SIZES } = StyleConst
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
`
const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 30%;
  height: 100%;
  padding: 20px 0 20px 20px;
`

const StyledRightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  background-color: ${COLORS.BACKGROUND_GREY};
`
const StyledWrapperParticipant = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  justify-content: center;
`
const StyledMutedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  position: relative;
  padding: 5px;
  margin: 5px;
`
const StyledParticipantsContainer = styled.div`
  display: grid;
  width: 90vh;
  margin: 0 auto;
  height: 80vh;
  overflow-y: auto;
  grid-template-rows: ${({ rows }) =>
    `repeat(${rows}, ${Math.floor(75 / rows)}vh)`};
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-gap: 10px;
  justify-content: center;
`

const StyledParticipant = styled.div`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  border-radius: 10px;
`
const StyledUserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`
const StyledName = styled.span`
  position: absolute;
  top: ${({ fontSize }) => (fontSize ? `-${fontSize}px` : `3px`)};
  left: 3px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : `14px`)};
  font-weight: 400;
  border-radius: ${({ fontSize }) => (fontSize ? `0px` : `7px 0px 10px 0`)};
  padding: 2px 5px 2px 2px;
  color: ${COLORS.TEXT_BRIGHT};
  background-color: ${COLORS.MODAL_BACKGROUND_DARK};
  z-index: 1;

  ${media.lap`
     
    `}
  ${media.desktop`
     
    `}
    ${media.ultrawide`
     
    `}
`
const StyledVideoWrapper = styled.div`
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: ${({ activeId }) => (activeId ? `3px solid lightgreen` : `none`)};
  z-index: 0;
`
const StyledButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translate(-50%, 0);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.muted ? "25px" : "30px")};
  height: ${(props) => (props.muted ? "25px" : "30px")};
  background-color: #19aaeb;
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
    color: #fff;
  }

  &:hover {
    svg.SVGInline-svg {
      color: #19aaeb;
    }
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
  StyledContainer,
  StyledLeftContainer,
  StyledRightContainer,
  CalleePanel,
  GroupCallHeader,
  StyledHeaderButton,
  StyledHeaderButtonGroup,
  GroupImageWrapper,
  StyledHeaderName,
  AvatarImage,
  StyledBackButton,
  StyledParticipantsContainer,
  StyledParticipant,
  StyledUserImage,
  StyledName,
  StyledButton,
  StyledWrapperParticipant,
  StyledMutedWrapper,
  StyledVideoWrapper,
}

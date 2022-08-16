import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, TRANSITION, SHADOWS } = StyleConst

const StyledWrapper = styled.div`
  display: block;
  cursor: ${(props) => (props.showCloseButton ? "auto" : "pointer")};
  position: relative;
  width: 100%;
  height: ${(props) => (props.showCloseButton ? "100%" : "auto")};
  margin: ${(props) => (props.showCloseButton ? "0" : "10px 0")};
  ${media.lap`
    width: ${(props) => (props.showCloseButton ? "100%" : "310px")};
    height: ${(props) => (props.showCloseButton ? "100%" : "250px")};
  `}
  ${media.desktop`
    margin: 0;
    transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
    width: ${(props) => (props.showCloseButton ? "354px" : "310px")};
    height: ${(props) => (props.showCloseButton ? "290px" : "250px")};
  `}
  ${media.ultrawide`
    width: ${(props) => (props.showCloseButton ? "440px" : "350px")};
    height: ${(props) => (props.showCloseButton ? "325px" : "250px")};
  `}
`

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.isInGroupCalling ? "transparent" : COLORS.TEXT_BRIGHT};
  border: none;
  height: 100%;
  width: 100%;
  position: ${(props) => (props.showCloseButton ? "fixed" : "relative")};
  overflow: hidden;
  ${(props) =>
    !props.showCloseButton &&
    `
    box-shadow: ${SHADOWS.BOX_SHADOW_CARD};
  `}
  ${media.desktop`
    box-shadow: none;
    transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
    position: relative;
    border-radius: ${(props) => (props.showCloseButton ? "12px" : "27px")};
  `}
`

const StyledShadow = styled.div`
  display: block;
  position: absolute;
  max-width: 100%;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: ${(props) => (props.showCloseButton ? "12px" : "8px")};
  box-shadow: ${SHADOWS.BOX_SHADOW_CHAT_CLOSED};
  /* background: ${COLORS.BOX_SHADOW_CARD}; */
  transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
  ${media.desktop`
    /* max-width: 330px; */
    border-radius: ${(props) => (props.showCloseButton ? "12px" : "27px")};
    box-shadow: ${(props) =>
      props.showCloseButton && SHADOWS.BOX_SHADOW_CARD_OPENED};
  `}
`

const StyledContent = styled.div`
  display: block;
  width: 100%;
  flex: 1 1;
  overflow: hidden;
`

export { StyledWrapper, StyledCard, StyledContent, StyledShadow }

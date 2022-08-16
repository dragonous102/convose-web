import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, TRANSITION, SHADOWS } = StyleConst

const StyledWrapper = styled.div`
  display: block;
  cursor: ${(props) => (props.showCloseButton ? "auto" : "pointer")};
  position: relative;
  width: 100%;
  height: ${(props) => (props.showCloseButton ? "100%" : "auto")};
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
  background-color: ${COLORS.TEXT_BRIGHT};
  border: none;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: ${(props) => (props.showCloseButton ? "fixed" : "relative")};
  border-radius: ${(props) => (props.isMobileOrTabletView ? "0px" : "27px")};
  box-shadow: ${SHADOWS.BOX_SHADOW_CARD};

  ${media.desktop`
    box-shadow: none;
    position: relative;
    border-radius: ${(props) => (props.showCloseButton ? "12px" : "27px")};
  `}
  &:hover {
    box-shadow: ${SHADOWS.BOX_SHADOW_CARD_HOVER};
  }
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
  border-radius: ${(props) =>
    props.showCloseButton || props.isInGroupCalling ? "12px" : "8px"};
  transition: all ${TRANSITION.EASING} ${TRANSITION.DURATION};
  ${media.desktop`
    border-radius: ${(props) =>
      props.showCloseButton || props.isInGroupCalling ? "12px" : "27px"};
    box-shadow:  ${SHADOWS.BOX_SHADOW_CARD_OPENED};
  `}
`

const StyledContent = styled.div`
  display: block;
  width: 100%;
  flex: 1 1;
  overflow: hidden;
`

export { StyledWrapper, StyledCard, StyledContent, StyledShadow }

import styled from "styled-components"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

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
    height: ${(props) => (props.showCloseButton ? "290px" : "250px")};
    `}
    ${media.ultrawide`
    width: ${(props) => (props.showCloseButton ? "440px" : "350px")};
    height: ${(props) => (props.showCloseButton ? "325px" : "250px")};
    `}
`

export { StyledContainer }

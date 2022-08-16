import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, ICON_SIZES } = StyleConst
const IconColor = (props) => props.color && COLORS[props.color]
const IconSize = (props) =>
  props.size ? ICON_SIZES[props.size] : props.width || ICON_SIZES.S

const StyledIcon = styled.div`
  width: ${(props) => props.width || "13px"};
  height: ${(props) => props.height || "auto"};
  color: ${IconColor};
  font-size: ${IconSize};
  display: block;
  cursor: ${(props) => props.onClick && "pointer"};
  pointer-events: ${(props) => !props.onClick && "none"};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  .SVGInline {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .SVGInline-svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
`
export { StyledIcon }

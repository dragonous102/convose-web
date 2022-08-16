import styled from "styled-components/macro"
import { StyleConst } from "../../components"
const { COLORS, FONT, FONT_SIZES, SHADOWS } = StyleConst

const StyledCookie = styled.div`
  ${FONT.DEFAULT};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: stretch;
  box-shadow: ${SHADOWS.BOX_SHADOW_DROPDOWN};
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: ${FONT_SIZES.XXS};
  background: ${COLORS.BACKGROUND};
  width: 100%;
  text-align: left;

  button {
    width: 100px;
  }

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: none;
  }
  position: fixed;
  left: 16px;
  width: 310px;
  border-radius: 14px;
  box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.15);

  button {
    border-radius: 27px;
    font-weight: 600;
    margin: 20px 18px;
  }
  ${({ mobile }) =>
    mobile
      ? `
    top:4px;
    left:50%;
    
    `
      : `bottom:30px`};
`

const StyledItem = styled.div`
  padding: 12px 24px;
  flex: 1 1 auto;
`

const StyledHeadline = styled.h2`
  font-size: ${StyleConst.FONT_SIZES.L};
  font-weight: ${StyleConst.FONT.DEFAULT};
  line-height: 1.5;
  color: ${StyleConst.COLORS.TEXT_DARK};

  img {
    height: 25px;
    width: 25px;
    margin-bottom: -6px;
    margin-left: 5px;
  }
`

export { StyledCookie, StyledItem, StyledHeadline }

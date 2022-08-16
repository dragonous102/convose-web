import styled from "styled-components/macro"
import { StyleConst } from "../../../const"
import { media } from "../../../utils/mediaQueryHelper"
const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ${({ clickable }) => clickable && "cursor: pointer;"}
`

const StyledLoadingText = styled.div`
  color: ${COLORS.WARM_GREY};
  font-size: ${FONT_SIZES.SXS};
  ${FONT.DEFAULT};
  padding-bottom: 24px;
  width: 100%;
  text-align: center;
  ${media.lap`font-size: ${FONT_SIZES.M}`};
  ${media.desktop`font-size: ${FONT_SIZES.SXS}`};
`

const StyledButton = styled.button`
  visibility: hidden;
  position: absolute;
  background-color: ${COLORS.CARD_ICONS};
  color: ${COLORS.BACKGROUND};
  font-size: ${FONT_SIZES.XS};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  ${FONT.DEFAULT};
  width: 180px;
  height: 26.3px;
  border-radius: 40px;
  border-style: none;
  cursor: pointer;
  ${media.desktop`
    visibility: visible;
    margin-left: 87px;
    top: 73%;
  `}
  ${media.ultrawide`
    visibility: visible;
    margin-left: 130px;
    top: 77%;
  `}
`

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    margin-right: 10px;
  }
`

const StyledSpan = styled.span`
  ${media.ultrawide`
    padding-top: 1px;
  `}
`

export {
  StyledLoadingText,
  StyledWrapper,
  StyledButtonWrapper,
  StyledButton,
  StyledSpan,
}

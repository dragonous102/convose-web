import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? "column-reverse" : "column")};
  justify-content: ${({ reverse }) => (reverse ? "flex-end" : "flex-start")};
  width: 100%;
  flex: 1 1 auto;
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

export { StyledWrapper, StyledLoadingText }

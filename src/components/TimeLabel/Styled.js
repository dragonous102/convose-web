import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  text-align: center;
  ${FONT.DEFAULT}
  font-size: ${FONT_SIZES.XXS};
  color: ${COLORS.WARM_GREY};
  padding: ${({ topPadding }) => (topPadding ? "16px" : "0")} 0 4px 0;
`

export { StyledWrapper }

import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${FONT.DEFAULT}
  font-size: ${FONT_SIZES.XXS};
  font-weight: 600;
  color: ${COLORS.WARM_GREY};
  padding: 12px 0;

  /* &::before,
  &::after {
    content: '';
    border-top: 1px solid ${COLORS.BRIGHT_GREY};
    flex: 1 1 auto;
  } */
`

const StyledContent = styled.span`
  display: block;
  flex: 0 0 auto;
  padding: 0 2px;
`

export { StyledWrapper, StyledContent }

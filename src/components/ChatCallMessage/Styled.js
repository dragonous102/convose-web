import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES } = StyleConst

export const StyledWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${FONT.DEFAULT}
  font-size: ${FONT_SIZES.XXS};
  font-weight: 600;
  font-style: italic;
  color: ${COLORS.TEXT_DARK};
  padding: 2px 0 8px 0;
  margin-bottom: 10px;

  &::before,
  &::after {
    content: "";
    border-top: 1px;
    flex: 1 1 auto;
  }
`

export const StyledContent = styled.span`
  // display: block;
  // flex: 0 0 auto;
  // padding: 0 9px;
  // max-width: 250px;
`

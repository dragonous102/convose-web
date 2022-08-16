import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../components"

const { COLORS, FONT_SIZES } = StyleConst

const StyledToolTip = styled.div`
  position: absolute;
  display: none;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  background: ${COLORS.TOOLTIP_BACKGROUND};
  border-radius: 0.7rem;
  width: 295px;
  height: 32px;
  top: 70px;
`

const StyledContent = styled.span`
  font-size: ${FONT_SIZES.SXS};
  font-weight: 600;
  color: ${COLORS.TEXT_BRIGHT};
`

const StyledWrapper = styled.div`
  position: relative;

  ${media.desktop`
      form:hover{
        &, & ~ ${StyledToolTip} {
          display:flex;
        }
      }
      `}
`

export { StyledWrapper, StyledToolTip, StyledContent }

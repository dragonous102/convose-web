import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, SHADOWS } = StyleConst

const StyledWrapperInterestLabel = styled.div`
  display: flex;
  flex-direction: column-reverse;
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
  align-items: flex-start;
  max-width: 220px;
  ${media.desktop`
    max-width:100%;
  `}
`
const StyledInterestLabel = styled.div`
  ${({ primary, isDragging }) =>
    primary
      ? `
      background-color: ${COLORS.TEXT_BRIGHT};
      border: 1px ${COLORS.TEXT_BRIGHT}
      color: ${COLORS.TEXT_DARK};
      height: 36px;
      box-shadow: ${
        isDragging ? undefined : `${SHADOWS.BOX_SHADOW_INTEREST_LABEL}`
      };
      line-height: 40px;
      margin: 0 10px;
      `
      : `
      background-color: ${COLORS.CARD_BACKGROUND};
      color: ${COLORS.TEXT_DARK};
      height: 32px;
      line-height: 32px;
      margin: 0 11px 20px;
      // max-width: calc(100% - 22px);
      `}
  ${media.lap`${({ primary }) =>
    primary
      ? `
      height: 32px; 
      line-height: 32px;
      `
      : `
      height: 34px; 
      line-height: 32px;
      `}
  `}
  
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  padding: ${(props) => props.padding || "15px 10px"};
  font-size: ${FONT_SIZES.XS};
  ${media.lap`font-size: ${FONT_SIZES.XXS}`};
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${FONT.DEFAULT};
  cursor: ${(props) => (props.onClick ? "pointer" : "inherit")};
  ${media.desktop`
    max-width:350px;
    ${({ primary }) => primary && "height:50px; line-height: 50px;"}
  `}
`
const StyledPositionIndicator = styled.div`
  visibility: ${({ interestHover }) => (interestHover ? "visible" : "hidden")};
  background-color: #19a7e7;
  width: 3px;
  height: 52px;
  position: absolute;
  ${({ before }) =>
    before
      ? `
  left: -1px;
  top: 14px;
  `
      : `
  right: -1px;
  top: 14px;
  `}

  .SVGInline {
    position: absolute;
    top: -30px;
    left: -5px;
  }
`
const StyledContent = styled.span`
  margin: 0px 5px;
  white-space: nowrap;
  width: 100%;
  height: 16px;
  font-size: ${FONT_SIZES.SXS};
  line-height: 1.23;
  letter-spacing: 0.43px;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledButtonContainer = styled.div`
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
`

export {
  StyledInterestLabel,
  StyledContent,
  StyledWrapperInterestLabel,
  StyledPositionIndicator,
  StyledButtonContainer,
}

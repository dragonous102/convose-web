import styled from "styled-components/macro"

import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES, SHADOWS } = StyleConst

const contentSize = 300
const padding = "45px"

const StyledRatingsDots = styled.div`
  display: block;
  text-align: center;
  color: ${COLORS.TEXT_BLACK};
  ${FONT.SEMIBOLD}
  font-size: ${FONT_SIZES.SXS};
  min-height: 300px;
  position: relative;
`
const StyledKnowledgeWrapper = styled.div`
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 14px;
  width: 340px;
  padding: 20px;
  box-shadow: ${SHADOWS.BOX_SHADOW_MODAL};
`

const StyledText = styled.div`
  padding: ${({ verticalMargin }) => (verticalMargin ? verticalMargin : "20px")}
    0px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  ${(props) =>
    props.knowledge
      ? `
    font-size: ${FONT_SIZES.LXL}
  `
      : `
    font-size: ${FONT_SIZES.XL};
  `}
`

const StyledDotsWrapper = styled.div`
  user-select: none;
  max-width: ${contentSize}px;
  margin: auto;
`

const StyledRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledIconContainer = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 13px;
  position: relative;
`

const StyledWordIconContainer = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: #fe004e;
  font-size: 28px;
  font-weight: 600;
  font-family: Poppins;
  z-index: 0;
  color: #ffffff;
`

export {
  StyledRatingsDots,
  StyledText,
  StyledDotsWrapper,
  StyledKnowledgeWrapper,
  StyledRowContainer,
  StyledIconContainer,
  StyledWordIconContainer,
}

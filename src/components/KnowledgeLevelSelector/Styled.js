import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, TRANSITION, FONT, FONT_SIZES } = StyleConst

const StyledWrapperKnowledgePiece = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  margin-left: 13px;
  div:nth-last-child(${(props) => props.selectedLevel}) {
    p {
      font-size: ${FONT_SIZES.L};
      ${FONT.BOLD}
      transition: 0.3s linear;
      transition-delay: 0.2s;
    }
  }
  &:hover {
    ${(props) =>
      props.hoveredLevel > 0 && props.hoveredLevel !== props.selectedLevel
        ? `
    div:nth-last-child(${props.selectedLevel}) {
      p {
        font-size: ${FONT_SIZES.XXS};
        ${FONT.SEMIBOLD};
        transition: 0.3s linear;
      }
    }
  `
        : ``}

    cursor: pointer;
    div {
      background-color: ${COLORS.BACKGROUND_KNOWLEDGE_LEVEL};
      transition: 0.5s ease;
    }

    div:hover {
      cursor: pointer;
      &,
      & ~ div {
        background-color: ${COLORS.BACKGROUND_KNOWLEDGE_LEVEL_HOVER};
        transition: 0.5s ease;
      }
    }
  }
`

const StyledKnowledgePiece = styled.div`
  user-select: none;
  display: inline-block;
  width: 39px;
  height: 39px;
  margin-right: 16px;
  padding-top: 38px;
  padding-left: 25px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive
      ? COLORS.BACKGROUND_KNOWLEDGE_LEVEL_HOVER
      : COLORS.BACKGROUND_KNOWLEDGE_LEVEL};
  p {
    font-size: ${FONT_SIZES.XXS};
    transition: 0.3s linear;
  }
  &:hover {
    p {
      font-size: ${FONT_SIZES.L};
      ${FONT.BOLD}
      transition: 0.3s linear;
    }
  }
`

const StyledTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 37px;
  margin-left: 55px;
`
const StyledText = styled.p`
  user-select: none;

  ${(props) =>
    props.intermediate === "Intermediate"
      ? `
  color: ${COLORS.TEXT_BLACK};
  position: relative;
  margin-right: -41px;
  margin-bottom: -23px;
  margin-top: 13px;
  -webkit-transform: rotate(47.14deg);
  -ms-transform: rotate(47.14deg);
  transform-origin: 0 0;
  `
      : `
  left: 10%;
  color: ${COLORS.TEXT_BLACK};
  position: relative;
  margin-right: -10px;
  margin-bottom: -23px;
  margin-top: 13px;
  -webkit-transform: rotate(47.14deg);
  -ms-transform: rotate(47.14deg);
  transform-origin: 0 0;
  `}
`

const StyledButtonWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 153px;
`

export {
  StyledButtonWrapper,
  StyledKnowledgePiece,
  StyledWrapperKnowledgePiece,
  StyledTextWrapper,
  StyledText,
}

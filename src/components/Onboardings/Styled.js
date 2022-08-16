import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT } = StyleConst

const BODY_FONT = "16px"
const HEADER_FONT = "20px"

const StyledWrapper = styled.div`
  pointer-events: all;
  background-color: ${COLORS.ONBOARDING_BACKGROUND};
  border-radius: 22px;
  padding: 30px;
  max-width: 250px;
  width: 80vw;
  z-index: 999;
  display: ${({ displayWrapper }) => (displayWrapper ? "flex" : "none")};
  flex-direction: column;
  box-shadow: 0 10px 25px ${COLORS.BOX_SHADOW_ONBOARDING};
  position: ${({ displayWrapper }) => displayWrapper && "absolute"};
  /* left: 50%; */
  bottom: ${({ displayWrapper }) => displayWrapper && "auto"};
  top: ${({ displayWrapper }) => displayWrapper && "280px"};
  /* transform: translateX(-50%); */
  @media (max-width: 468px) {
    padding: 20px;
    max-width: 300px;
    transform: ${({ displayWrapper }) => displayWrapper && "translateY(-120%)"};
    top: ${({ displayWrapper }) => displayWrapper && "0rem"};
    left: ${({ displayWrapper }) => displayWrapper && "18vw"};
  }

  @media (max-width: 720px) and (min-width: 468px) {
    padding: 20px;
    max-width: 280px;
    transform: ${({ displayWrapper }) => displayWrapper && "translateY(-120%)"};
    top: ${({ displayWrapper }) => displayWrapper && "0rem"};
    left: ${({ displayWrapper }) => displayWrapper && "36vw"};
  }

  ${media.lap`
    transform: ${({ displayWrapper }) => displayWrapper && "translateY(-120%)"};
    top: ${({ displayWrapper }) => displayWrapper && "0px"};
    left: ${({ displayWrapper }) => displayWrapper && "35vw"};
    max-width: 280px;
  `}
  ${media.desktop`
    position: absolute;
    /* top: 20px;
    left: 160px; */
    transform: ${({ displayWrapper }) => displayWrapper && "translateX(-5%)"};
    top: ${({ displayWrapper }) => displayWrapper && "9px"};
    left: ${({ displayWrapper }) => displayWrapper && "25vw"};
    bottom: auto;
    max-width: 280px;
  `}
  ${media.cinema`
     ${({ displayWrapper }) => displayWrapper && "left: 16.5rem;"}
  `}
`

const StyledItem = styled.div`
  ${(props) => (!props.header ? `${FONT.LIGHT}` : `${FONT.SEMIBOLD}`)};
  ${(props) => props.header && "margin: -1.5rem 0 0.5rem 0;"};
  display: flex;
  flex-direction: column;
  gap: 5px;
  line-height: 1.5;
  color: ${COLORS.TEXT_BRIGHT};
  font-size: ${(props) => (props.header ? `${HEADER_FONT}` : `${BODY_FONT}`)};
  text-align: center;
`

const StyledCloseButton = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 15px;
  top: 13px;
  background: none;
  border: 1px solid transparent;
  border-radius: 50%;
  outline: 0;
  transition: background-color 250ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.16);
  }
`

const StyledArrow = styled.div`
  z-index: 1000;
  position: absolute;
  font-size: 0;
  transform: ${({ displayWrapper }) =>
    displayWrapper && "rotate(-180deg) translateX(50%)"};
  bottom: ${({ displayWrapper }) => (displayWrapper ? "100%" : "auto")};
  top: ${({ displayWrapper }) => (!displayWrapper ? "100%" : "auto")};
  left: ${({ displayWrapper }) => displayWrapper && "9.75rem"};
  @media (max-width: 720px) {
    transform: ${({ displayWrapper }) => displayWrapper && "translateY(95%)"};
    left: ${({ displayWrapper }) => displayWrapper && "5.25rem"};
    bottom: ${({ displayWrapper }) => displayWrapper && "0"};
  }
  ${media.lap`
      transform: ${({ displayWrapper }) => displayWrapper && "translateY(95%)"};
      bottom: ${({ displayWrapper }) => displayWrapper && "0"};
      left: ${({ displayWrapper }) => displayWrapper && "6.25rem"};
    `}
  ${media.desktop`
    transform: ${({ displayWrapper }) =>
      displayWrapper
        ? "rotate(90deg) scaleX(-1) translateY(35%)"
        : "rotate(180deg)"};
    right: ${({ displayWrapper }) => (displayWrapper ? "100%" : "auto")};
    left: ${({ displayWrapper }) => (displayWrapper ? "0" : "50px")};
    top: ${({ displayWrapper }) => (displayWrapper ? "31px" : "auto")};
    bottom: ${({ displayWrapper }) => (displayWrapper ? "auto" : "100%")};
    margin-right: -14px;
  `}
  ${media.cinema`
    left: ${({ displayWrapper }) => displayWrapper && "-6.5%"};
  `}
  .SVGInline {
    display: block;
    width: 43px;
    height: 19px;
  }
`

const StyledButton = styled.button`
  background-color: #fff;
  color: #19aaeb;
  font-size: 20px;
  margin-top: 1rem;
  padding: 0.75rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 30px;
  border: 1px solid;
  transition: background-color 150ms ease;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
`

const StyledIconsWrapper = styled.div`
  margin-top: -3rem;
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg.SVGInline-svg {
    fill: none;
  }
`

export {
  StyledItem,
  StyledCloseButton,
  StyledWrapper,
  StyledArrow,
  StyledButton,
  StyledIconsWrapper,
}

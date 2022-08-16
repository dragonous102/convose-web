import styled, { keyframes } from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

const highlightMobileAndTablet = keyframes`
  from {
    border-color: transparent;
  }

  to {
    border-color: ${COLORS.PRIMARY};
  }
`

const highlightDesktop = keyframes`
  from {
    border-color: ${COLORS.PRIMARY};
  }

  to {
    border-color: ${COLORS.TEXT_BRIGHT};
  }
`

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: ${({ focusInput }) => (focusInput ? "-20px" : "-75px")};
  align-items: center;
  ${media.desktop`
   margin-top:0px;
`}
  .icon {
    position: absolute;
    left: ${({ focusInput }) => (focusInput ? "10px" : "32px")};
    /* top: 50%; */
    /* transform: ${({ value }) =>
      value ? "translate(-400%, -50%)" : "translate(0, -50%)"};
    transition: transform ${TRANSITION.DURATION} ${TRANSITION.EASING}, color ${TRANSITION.DURATION} ${TRANSITION.EASING}; */
    z-index: 1;
    ${media.desktop`
      left:31px;
    `}
  }

  input {
    ${FONT.DEFAULT};
    max-width: 20em;
    width: 100%;
    line-height: 64px;
    height: 64px;
    background-color: ${({ focusInput }) =>
      focusInput ? COLORS.BACKGROUND_GREY : COLORS.ADD_INTEREST_BACKGROUND};
    border: ${({ focusInput }) =>
      focusInput ? `1px solid ${COLORS.BRIGHT_GREY}` : "none"};
    color: ${(props) => props.color || COLORS.TEXT_DARK};
    padding: ${(props) => (!props.iconConfig ? "0px" : "0 50px")};
    text-indent: 30px;
    font-size: ${FONT_SIZES.S};
    border-radius: 32px;
    outline: none;
    ${({ highlightOnMount }) =>
      highlightOnMount &&
      `animation: ${highlightMobileAndTablet} .75s 2s ${TRANSITION.EASING} 6 alternate both;`}

    &::placeholder {
      color: ${COLORS.LIGHT};
      text-align: center;
      font-weight: 600;
      opacity: 1;
      /* font-size: 15px;
      line-height: 15px;
      font-style: normal; */
    }

    ${media.lap`
      font-size: ${(props) => (props.small ? FONT_SIZES.XS : FONT_SIZES.S)};
      height:64px;
    `}
    ${media.desktop`
      border: 1px solid ${COLORS.PRIMARY};
      line-height: 50px;
      height: 55px;
      text-indent:5px;
      padding: 22px 30px 22px 50px;
      margin-top: 0;
      border-radius: 40px;
      border: 1px solid transparent;
      ${({ highlightOnMount }) =>
        highlightOnMount &&
        `animation: ${highlightDesktop} .75s 2s ${TRANSITION.EASING} 6 alternate both;`}
    `}
  }
`

export { StyledWrapper }

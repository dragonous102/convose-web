import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
import Button from "../Button"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledProfileHeaderWrapper = styled.header`
  width: 100%;
  background-color: ${COLORS.TEXT_BRIGHT};
  position: relative;
  padding: ${(props) => (props.showCloseButton ? "9px 32px" : "20px 32px")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
`

const StyledAvatarLabel = styled.label`
  /* transform: translateY(20px); */
  position: relative;
  cursor: pointer;
  min-width: 60px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

  &:after {
    position: absolute;
    content: "CHANGE AVATAR";
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #1cbaf1;
    font-weight: 700;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(232, 244, 255, 0.9);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &:hover:after {
    opacity: 1;
  }
`

const StyledAvatarInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const StyledButton = styled(Button)`
  width: ${({ width }) => (width ? width : "20px")};
  height: ${({ height }) => (height ? height : "20px")};
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "transparent"};
  border: none;
  border-radius: 43%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ padding }) => (padding ? padding : "16px")};
  transition: all 200ms ease-in-out;
  position: ${({ positionAbsolute }) =>
    positionAbsolute ? "absolute" : "relative"};
  top: ${({ topAbsolute }) => (topAbsolute ? topAbsolute : "none")};
  right: ${({ rightAbsolute }) => (rightAbsolute ? rightAbsolute : "none")};
  left: ${({ leftAbsolute }) => (leftAbsolute ? leftAbsolute : "none")};
  z-index: 999;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${marginBottom} !important` : "-12px"};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  svg,
  path {
    stroke: ${COLORS.PRIMARY};
    fill: ${COLORS.PRIMARY};
  }

  div {
    position: relative;
  }

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: none;
    background: ${COLORS.BACKGROUND_PROFILE_INBOX};
  }

  &:hover {
    background: ${COLORS.BACKGROUND_PROFILE_INBOX};
  }

  &:active {
    background: ${COLORS.LIGHT_ACTIVE};
    outline: none;
  }
`

const StyledLoadingSpinnerWrapper = styled.div`
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  color: ${COLORS.PRIMARY};
`

const StyledUsernameLabel = styled.label`
  position: relative;
  max-width: 250px;
  margin: 0 14px 0 16px;
  border-radius: 30px;
`

const StyledHiddenText = styled.span`
  visibility: hidden;
  margin-bottom: 6px;
`

const StyledUsername = styled.input`
  ${FONT.DEFAULT};
  color: ${(props) => props.themeColor};
  width: 100%;
  margin-bottom: 6px;
  padding: 0.25rem 1rem;
  flex: 0 1 auto;
  outline: none;
  position: relative;
  font-size: ${FONT_SIZES.XL};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 30px;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: #ebf5ff;
  }

  &:active {
    background-color: #d3eaff;
  }

  ${media.lap`
    font-size: 28px;
  `}
`

const StyledUpdateUsername = styled.span`
  visibility: ${({ updatingUsername }) =>
    updatingUsername ? "visible" : "hidden"};
  color: #aeaeae;
  font-style: italic;
  font-size: 14px;
`

export {
  StyledAvatarInput,
  StyledAvatarLabel,
  StyledLoadingSpinnerWrapper,
  StyledUsername,
  StyledUsernameLabel,
  StyledHiddenText,
  StyledProfileHeaderWrapper,
  StyledButton,
  StyledUpdateUsername,
}

/* stylelint-disable no-descending-specificity  */
import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
import { StyledIcon } from "../Icon/Styled"
import { StyledButton } from "../Button/Styled"

const { COLORS, FONT, FONT_SIZES, TRANSITION, SHADOWS } = StyleConst

const StyledDeleteButtonWrapper = styled.div`
  display: flex;
  opacity: 0;
  width: fit-content;
  justify-content: flex-end;
  margin-top: auto;
  padding-right: 3px;
  &:hover {
    opacity: 1;
  }
`

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ mine }) => (mine ? "flex-end" : "flex-start")};
  align-items: center;
  position: relative;
  width: 100%;
  /* max-height: 32px; */
  &:hover ${StyledDeleteButtonWrapper} {
    opacity: 1;
  }
`

const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 30px;
  height: 30px;
  font-size: ${FONT_SIZES.XL};
  line-height: 29px;
  display: flex;
  opacity: 1;
  justify-content: center;
  align-items: center;
  ${({ leftMargin }) => leftMargin && "margin-left: 17px"};
  ${({ rightMargin }) => rightMargin && "margin-right: 17px"};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  ${StyledIcon} {
    pointer-events: none;
    color: #b9bbbd;
  }
  &:hover {
    background: #e5e5e5;
    border-color: #e5e5e5;
    border-radius: 50%;
    ${StyledIcon} {
      color: #8b8d91;
    }
  }
`

const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 410px;
  height: 356px;
  border-radius: 10px;
  box-shadow: 0 14px 45px rgba(0, 0, 0, 0.25);
  background-color: ${COLORS.CARD_BACKGROUND};
  align-items: center;
`

const ConfirmationMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  ${FONT.DEFAULT};
  font-style: normal;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.43px;
  margin: 48px 55px;
`

const StyledLink = styled.a`
  /* from https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/ */
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;
  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;

  &,
  &:hover,
  &:focus,
  &:active,
  &:visited {
    text-decoration: underline;
  }
`

const StyledSelectionButton = styled(StyledButton)`
  width: 299px;
  height: 56px;
  border-radius: 50px;
  border: none;

  &:hover {
    background-color: ${({ primary }) =>
      primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
  }
`

const messageRadius = (position, mine) =>
  position === "bottom"
    ? mine
      ? "15px 5px 15px 15px"
      : "5px 15px 15px 15px"
    : position === "top"
    ? mine
      ? "15px 15px 5px 15px"
      : "15px 15px 15px 5px"
    : position === "middle"
    ? mine
      ? "15px 5px 5px 15px"
      : "5px 15px 15px 5px"
    : "15px"

const StyledChatMessage = styled.div`
  background-color: ${({ mine, hasImage, deleted }) =>
    deleted
      ? "transparent"
      : hasImage
      ? "#fff"
      : mine
      ? COLORS.CARD_USER_MESSAGE_BACKGROUND
      : COLORS.CARD_PARTNER_MESSAGE_BACKGROUND};
  border: ${({ deleted }) => (deleted ? "1px solid #dbdbdb" : "0")};
  color: ${({ mine, deleted }) =>
    deleted ? "#a5a5a5" : mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_DARK};
  display: block;
  font-size: ${({ hasImage }) => (hasImage ? 0 : FONT_SIZES.S)};
  line-height: ${({ hasImage }) => (hasImage ? 0 : "18px")};
  ${FONT.DEFAULT};
  /* margin-bottom: ${({ last, position }) =>
    !["bottom", "single"].includes(position) || last ? "2px" : "0px"}; */
  margin-top: ${({ last, sameSender, position }) =>
    sameSender ? "2px" : "9px"};
  width: ${({ hasImage }) => (hasImage ? "auto" : "content")};
  max-width: 80%;
  align-self: ${({ mine }) => (mine ? "flex-end" : "flex-start")};
  border-radius: ${({ position, mine }) => messageRadius(position, mine)};
  text-align: left;
  position: relative;
  opacity: ${({ timestamp }) => (timestamp ? 1 : 0.6)};
  transition: opacity ${TRANSITION.DURATION} ${TRANSITION.EASING};
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;
  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  hyphens: auto;

  .Linkify {
    display: block;
    padding: 10px 14px;
  }

  ${media.lap`
    line-height: ${({ hasImage }) => (hasImage ? 0 : "18px")};
    .Linkify {
      padding: 10px 14px;
    }
  `}
  ${media.desktop`
    line-height: ${({ hasImage }) => (hasImage ? 0 : "18px")};
    font-size: ${({ hasImage }) => (hasImage ? 0 : FONT_SIZES.XS)};
    .Linkify {
      padding: 6px 10px;
    }
  `}
  ${StyledLink} {
    &,
    &:hover,
    &:focus,
    &:active,
    &:visited {
      color: ${({ mine }) => (mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_DARK)};
    }
  }
`

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  vertical-align: middle;
  border-radius: 15px;
`
const StyledImageWrapper = styled.div`
  position: relative;
  height: 0;
  width: ${({ width }) => `${width}px`};
  padding-top: ${({ height }) => (height ? `${height}%` : "100%")};
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: ${({ loaded }) => (loaded ? `transparent` : "lightgray")};
  }
`

const StyledImageLoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Emoji = styled.span`
  font-size: ${FONT_SIZES.M};
  padding: 0 2px;
  ${FONT.EMOJI};
`

const StyledTimestamp = styled.span`
  font-size: ${FONT_SIZES.XXS};
  line-height: 1.8;
  padding: 0 5px;
  flex: none;
  height: 18px;
  vertical-align: bottom;
  /* display: flex; */
  display: none;
  align-items: flex-end;
  position: absolute;
  bottom: 1px;
  right: 1px;
  ${({ hasImage }) =>
    hasImage &&
    `
    color: ${COLORS.TEXT_BRIGHT};
    text-shadow: ${SHADOWS.TEXT_SHADOW_TIMESTAMP};
  `}
  ${media.lap`
    font-size: ${FONT_SIZES.XS};
  `}
  ${media.desktop`
    font-size: ${FONT_SIZES.XXS};
  `}
`
const StyledTryagain = styled.span`
  font-size: ${FONT_SIZES.XXS};
  line-height: 1.8;
  padding: 0 5px;
  height: 18px;
  vertical-align: bottom;
  align-items: flex-end;
  position: absolute;
  bottom: 6px;
  z-index: 999;
  color: black;
  left: -72px;
  color: blue;
  cursor: pointer;

  &hover: {
    color: darkblue;
  }
  ${({ hasImage }) =>
    hasImage &&
    `
    color: ${COLORS.TEXT_BRIGHT};
    text-shadow: ${SHADOWS.TEXT_SHADOW_TIMESTAMP};
  `}
  ${media.lap`
    font-size: ${FONT_SIZES.XS};
  `}
  ${media.desktop`
    font-size: ${FONT_SIZES.XXS};
  `}
`

export {
  StyledChatMessage,
  StyledLink,
  StyledTimestamp,
  StyledImage,
  StyledImageLoaderWrapper,
  Emoji,
  StyledImageWrapper,
  StyledTryagain,
  MessageWrapper,
  StyledDeleteButtonWrapper,
  StyledDeleteButton,
  ConfirmationWrapper,
  ConfirmationMessageWrapper,
  StyledSelectionButton,
}

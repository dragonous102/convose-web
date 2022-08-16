/* stylelint-disable no-descending-specificity  */
import styled from "styled-components/macro"
import { StyleConst } from "../../../const"
import { media } from "../../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, TRANSITION, SHADOWS } = StyleConst

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
  background-color: ${({ mine, hasImage }) =>
    mine
      ? hasImage
        ? "#fff"
        : COLORS.CARD_USER_MESSAGE_BACKGROUND
      : hasImage
      ? "#fff"
      : COLORS.CARD_PARTNER_MESSAGE_BACKGROUND};
  border: 0;
  color: ${({ mine }) => (mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_DARK)};
  display: block;
  font-size: ${({ hasImage }) => (hasImage ? 0 : FONT_SIZES.XS)};
  line-height: ${({ hasImage }) => (hasImage ? 0 : "22px")};
  ${FONT.DEFAULT};
  /* margin-bottom: ${({ last, position }) =>
    !["bottom", "single"].includes(position) || last ? "2px" : "10px"}; */
  margin-top: ${({ last, sameSender, position }) =>
    sameSender ? "2px" : "9px"};
  ${({ mine }) => !mine && "margin-left: 38px"};
  width: ${({ hasImage }) => (hasImage ? "auto" : "content")};
  max-width: 80%;
  ${({ isInGroupCalling }) => isInGroupCalling && "margin-left: 0"};
  ${({ isInGroupCalling }) => isInGroupCalling && "width: fit-content"};
  align-self: ${({ mine }) => (mine ? "flex-end" : "flex-start")};
  border-radius: ${({ position, mine }) => messageRadius(position, mine)};
  text-align: left;
  overflow: hidden;
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
    padding: 11px 16px;
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
    z-index: 99;
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

const Mention = styled.span`
  background-color: ${(props) =>
    props.isMeMentioned
      ? COLORS.MENTION_BACKGROUND_ME
      : COLORS.MENTION_BACKGROUND};
  font-weight: bold;
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

const StyledHeader = styled.div`
  height: 10px;
  width: fit-content;
  text-align: left;
  margin-top: 4px;
  ${(props) => (props.isInGroupCalling ? "display:flex;" : "")}
  align-self:flex-start;
  padding-right: 15px;
  &:hover {
    cursor: pointer;
  }
`

const StyledAvatar = styled.span`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: ${(props) => (props.isInGroupCalling ? "12px;" : "30px;")}
  position: relative;
  display: inline-block;
  left: ${(props) => (props.isInGroupCalling ? "8px;" : "0")}
  top: ${(props) => (props.isInGroupCalling ? "2px;" : "10px;")}
  width: ${(props) => (props.isInGroupCalling ? "12px;" : "30px;")}
  height: ${(props) => (props.isInGroupCalling ? "12px;" : "30px;")}
  border-radius: 50%;
`

const StyledUsername = styled.p`
  color: ${({ color }) => color || "#666"};
  font-size: 11px;
  font-weight: bold;
  display: inline;
  position: relative;
  top: ${(props) => (props.isInGroupCalling ? "0;" : "-16px;")}
  left: ${(props) => (props.isInGroupCalling ? "10px;" : "9px;")}
`

const StyledHeaderMessage = styled.div`
  border-radius: 15px 15px 15px 5px;
  width: fit-content;
  text-align: left;
  align-items: flex-start;
  justify-content: center;
`
const StyledGoToChatButton = styled.button`
  display: block;
  width: 100%;
  max-width: 300px;
  height: 56px;
  border-radius: 40px;
  margin: 0 auto 16px auto;
  box-sizing: border-box;
  border: 2px solid #19aaeb;
  background: #19aaeb;
  cursor: pointer;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 0.433333px;
  color: #ffffff;
  transition: all 200ms ease-in-out;
`

export {
  StyledChatMessage,
  StyledLink,
  StyledTimestamp,
  StyledImage,
  StyledImageLoaderWrapper,
  Emoji,
  Mention,
  StyledHeader,
  StyledAvatar,
  StyledUsername,
  StyledHeaderMessage,
  StyledImageWrapper,
  StyledGoToChatButton,
}

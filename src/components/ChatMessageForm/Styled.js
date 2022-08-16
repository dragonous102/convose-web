import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { StyledIcon } from "../Icon/Styled"
import { media } from "../../utils/mediaQueryHelper"
import ReactTooltip from "react-tooltip"
import { MentionsInput } from "react-mentions"

const { COLORS, FONT_SIZES, FONT } = StyleConst

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${COLORS.BACKGROUND_MESSAGE_FORM_TRANSPARENT};
  padding: 9px;
  ${media.desktop`
    border-bottom-right-radius: 12px
    border-bottom-left-radius: 12px
  `}
`

export const StyledEmoticonSelector = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: ${FONT_SIZES.XL};
  line-height: 29px;
  color: ${({ disabled }) => (disabled ? COLORS.SECONDARY : COLORS.PRIMARY)};
  ${StyledIcon} {
    pointer-events: none;
    color: ${COLORS.TEXT_GREY};
  }
`

export const StyledImageSelector = styled.input`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
`

export const StyledButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 30px;
  font-size: ${FONT_SIZES.XL};
  line-height: 29px;
  justify-content: center;
  align-items: center;
  margin: 0px 2px;
  ${({ leftMargin }) => leftMargin && "margin-left: 17px"};
  ${({ rightMargin }) => rightMargin && "margin-right: 17px"};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  ${StyledIcon} {
    pointer-events: none;
    color: ${({ disabled }) => (disabled ? COLORS.SECONDARY : COLORS.PRIMARY)};
  }
  &:hover {
    background: ${COLORS.LIGHT_HOVER};
    border-color: ${COLORS.LIGHT_HOVER};
    border-radius: 50%;
  }
  ${media.desktop`
    width:30px;
    margin:0px;
   `}
`

export const StyledButtonContainer = styled.div`
  width: 160px;
  height: 37px;
  background: ${COLORS.SECONDARY};
  border-radius: 0 99px 99px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  ${media.desktop`
    height:29px;
   `}
`

export const StyledLabel = styled.label`
  cursor: pointer;
  position: relative;
`

export const StyledTextInputWrapper = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  ${({ fullScreenCall }) =>
    fullScreenCall
      ? `
      padding:7px;
      border-radius:99px;
      background-color:#f1f1f1;
       
       
       `
      : `
       
      `};
`

export const StyledTextInput = styled(MentionsInput)`
  ${FONT.DEFAULT};
  width: ${({ isMobileOrTabletView }) =>
    isMobileOrTabletView ? "calc(100% - 70px)" : "calc(100% - 120px)"};
  line-height: 29px;
  height: 37px;
  background: ${COLORS.SECONDARY};
  border-radius: 99px 0 0 99px;
  border: none;
  color: inherit;
  font-size: ${FONT_SIZES.S};
  outline: none;
  padding: 0 29px 0 15px;
  & > div > input {
    height: 100%;
    top: 0px !important;
    color: inherit;
    &::placeholder {
      color: inherit;
    }
  }
  ${media.desktop`
   height:29px;
  `}
`

export const StyledWrapperOfapeEmojiPicker = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 1px;
  left: 0;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.11), 0px 6px 23px rgba(0, 0, 0, 0.11);
  background-color: #fff;
  height: 95%;
  width: 260px;
  border-radius: 12px;
  .emoji-picker-react {
    border: 0;
    .content-wrapper::before {
      padding-top: 14px;
      overflow: hidden;
      width: 260px;
      max-width: 260px;
      text-align: center;
    }
  }

  * {
    box-sizing: content-box;
  }
  ${media.ultrawide`
    left: 11%;
    bottom:9px;
    `}
`

export const StyledGridGifContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  * {
    box-sizing: content-box;
  }
`
export const StyledGifInputContainer = styled.div`
  display: flex;
  width: 230px;
  padding: 4px;
  margin: 5px auto;
  background-color: #eee;
  border-radius: 20px;
  align-items: center;
`
export const StyledGifInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  background-color: transparent;
  text-indent: 6px;
`

export const StyledIconSearchBox = styled.div`
  width: ${(props) => props.width || "13px"};
  height: ${(props) => props.height || "auto"};
  display: block;
  cursor: ${(props) => props.onClick && "pointer"};
  pointer-events: ${(props) => !props.onClick && "none"};
  margin: 0 10px;
  .SVGInline {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .SVGInline-svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
  }
`

export const StyledGridGif = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  div {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  * {
    box-sizing: content-box;
  }
`
export const StyledLoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
`
export const StyledGifContainer = styled.div`
  cursor: pointer;
  margin-top: -5px;
  img {
    width: 100%;
    height: 100%;
  }
  * {
    box-sizing: content-box;
  }
`

export const StyledClickcatcher = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`

export const StyledSuggestionText = styled.span`
  margin-top: 6px;
  font-size: ${FONT_SIZES.M};
  line-height: 40px;
  color: ${(props) =>
    props.focused ? "white" : props.color ? props.color : "black"};
`

export const Emoji = styled.span`
  display: inline-block;
  font-size: ${FONT_SIZES.L};
  margin-right: 10px;
  ${FONT.EMOJI};
`

export const StyledAvatar = styled.span`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: 26px;
  padding: 0 2px;
  margin-right: 10px;
  width: 26px;
  height: 26px;
  top: 8px;
  position: relative;
  display: inline-block;
  border-radius: 50%;
`

export const StyledCopyright = styled.footer`
  text-align: left;
  font-size: ${FONT_SIZES.XXS};
  ${FONT.LIGHT};
  color: #007add;
  padding: 3px 9px;
  background: rgba(255, 255, 255, 0.88);
  position: absolute;
  padding-top: 5px;
  width: 73px;
  bottom: 0px;
  border-top-right-radius: 18.8px;
  border-bottom-left-radius: 12px;
`

export const StyledAudioRecorder = styled.div`
  display: flex;
  align-items: center;
`

export const ReactTooltipStyled = styled(ReactTooltip)`
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.7rem !important;
  height: 30px !important;
  text-align: center;
  line-height: 14px;
`
export const StyledSpinnerContainer = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  width: 100%;
`

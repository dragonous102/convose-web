import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"
const { COLORS, SHADOWS, FONT_SIZES } = StyleConst
const StyledWrapper = styled.div`
  .react-autosuggest__container {
    border: none !important;
    width: 200px;
    margin: 0 auto;
    max-width: 60vw;
    height: 60px;
    ${media.desktop`
      margin:0;
      width:200px;
      height:70px;
    `}
  }

  .react-autosuggest__input {
    width: 100%;
    max-width: none;
    margin: 7px 0;
    transition: all 200ms ease-in-out;
    background: ${({ focusInput }) =>
      focusInput ? COLORS.TEXT_BRIGHT : COLORS.PRIMARY};
    cursor: pointer;
    box-shadow: ${SHADOWS.BOX_SHADOW_INTEREST};

    ${media.desktop`
      &:focus {
        background: ${COLORS.BACKGROUND};
        &::placeholder {
          color: ${COLORS.TEXT_GREY};
          font-weight: normal;
          text-align: left;
        }
      }
    `}
  }

  .react-autosuggest__input--open {
    width: 100%;
    max-width: none;
    margin: 7px 0;
    &::placeholder {
      color: ${COLORS.TEXT_DARK_GREY};
      font-weight: normal;
      font-size: ${FONT_SIZES.SXS};
    }
    ${media.desktop`
      padding: 17px 38px 17px 45px;
      background-color: ${COLORS.BACKGROUND};
      z-index: 201;
      box-shadow: none;
      &:focus {
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    `}
  }

  .react-autosuggest__input--focused {
    cursor: auto;
    border-radius: 14px;
  }

  .react-autosuggest__suggestions-container {
    cursor: pointer;
    ${media.desktop`
      width: 520px;
      margin-top: -7px;
      transition: all 200ms ease-in-out;
    `}
  }

  .react-autosuggest__suggestions-container--open {
    border: 0;
    border-radius: 10px;
    background-color: ${COLORS.BACKGROUND};
    position: fixed;
    right: 0;
    bottom: 90px;
    left: 0;
    z-index: 200;
    max-height: calc(100vh - 90px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    box-shadow: ${SHADOWS.BOX_SHADOW_DROPDOWN};
    cursor: pointer;
    ${media.desktop`
      left: 0;
      overflow: hidden;
      border-top-left-radius: 0px;
      position: absolute;
      width: 540px;
      max-height: 65vh;
      bottom: auto;
    `}
  }

  .react-autosuggest__suggestions-list {
    display: flex;
    flex-direction: column-reverse;
    ${media.desktop`
      flex-direction: column;
    `}
  }

  .react-autosuggest__suggestion {
    margin: 0;
    transition: all 150ms ease;

    &:first-child {
      border-bottom: 0;
    }

    ${media.desktop`
      margin: 0;
      &:last-child {
        border-bottom: 0;
      }
    `}

    &.react-autosuggest__suggestion--highlighted {
      background-color: ${COLORS.PRIMARY};
      color: ${COLORS.TEXT_BRIGHT};
    }
  }
`

export { StyledWrapper }

import styled from "styled-components/macro"
import { media, StyleConst } from "../../components"

const { COLORS, FONT_SIZES, SHADOWS } = StyleConst

export const StyledMenuWrapper = styled.menu`
  background: ${COLORS.BACKGROUND};
  width: 80%;
  max-width: 375px;
  height: 100%;
  display: flex;
  flex-direction: column;
  left: 0;
  position: absolute;
  box-shadow: ${SHADOWS.BOX_SHADOW_MENU};
  overflow: hidden;
  ${media.desktop`
    max-width: 390px;
    left: auto;
    height: 80%;
    top: 90px;
    bottom: auto;
    right: 40px;
    max-height: calc(100vh - 100px);
    box-shadow: -10px 0px 45px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  `}
`

export const StyledMenuScrollContainer = styled.div`
  padding: 0;
  margin: 0;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`

export const StyledMenuBody = styled.div`
  background-color: ${COLORS.TEXT_BRIGHT};
  flex: 1 1 auto;
  padding: 16px 20px;
  min-height: fit-content;
`

export const StyledMenuLinks = styled.div`
  padding: 16px 0;

  a:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    /* margin-top: 2rem; */
    font-size: 13px;
    font-style: italic;
    color: #a9a9a9;
    line-height: 16px;

    /* span {
      text-align: center;
    } */
  }

  a:not(:last-child),
  button {
    -webkit-tap-highlight-color: transparent;
    display: block;
    width: 100%;
    background-color: ${COLORS.TEXT_BRIGHT};
    border: none;
    padding: 0 0 0 32px;
    /* margin: 0; */
    outline: none;
    text-align: left;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    line-height: 54px;
    color: #000;
    border-radius: 40px;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &::-moz-focus-inner {
      border: 0;
    }

    &:focus {
      outline: none;
    }

    &:hover {
      background: ${COLORS.LIGHT_HOVER};
    }

    &:active {
      background: ${COLORS.LIGHT_ACTIVE};
    }
  }

  ${({ isGuest }) =>
    isGuest &&
    `
  a:nth-child(3) {
    margin-bottom: 3rem;
  }
  `}

  button {
    margin-bottom: 3rem;
  }
`

export const StyledMenuSection = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #e6e6e6;

  p {
    padding-left: 32px;
    text-align: left;
    font-size: ${FONT_SIZES.S};
    margin-bottom: 16px;
  }
`

export const StyledMenuButton = styled.button`
  -webkit-tap-highlight-color: transparent;
  display: block;
  width: 100%;
  max-width: 300px;
  height: 56px;
  border-radius: 40px;
  margin: ${({ marginTop }) => (marginTop ? marginTop : "0px")} auto 16px auto;
  box-sizing: border-box;
  border: 2px solid ${COLORS.PRIMARY};
  background: ${(props) =>
    props.primary ? COLORS.PRIMARY : COLORS.TEXT_BRIGHT};
  cursor: pointer;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 0.433333px;
  color: ${(props) => (props.primary ? COLORS.TEXT_BRIGHT : COLORS.PRIMARY)};
  transition: all 200ms ease-in-out;
  ${media.lap`
    width: 316px;
  `}

  &:last-of-type {
    margin-bottom: 0;
  }

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(props) =>
      props.primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
    border-color: ${(props) =>
      props.primary ? COLORS.PRIMARY_HOVER : COLORS.LIGHT_HOVER};
  }

  &:active {
    background: ${(props) =>
      props.primary ? COLORS.PRIMARY_ACTIVE : COLORS.LIGHT_ACTIVE};
    border-color: ${(props) =>
      props.primary ? COLORS.PRIMARY_ACTIVE : COLORS.LIGHT_ACTIVE};
  }
`

export const StyledInterest = styled.div`
  display: inline-block;
  vertical-align: bottom;
  flex: 0 1 auto;
  max-width: 100%;
`

export const StyledAppSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 105px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 11px 30px 0 rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  margin: 0 auto;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    border-radius: 0 20px 20px 0;

    &:first-of-type {
      border-radius: 20px 0 0 20px;
    }

    h4 {
      font-size: 10px;
      font-weight: 100;
      margin: 10px 0 1px 0;
    }
    h3 {
      font-size: 13px;
      font-weight: 400;
    }

    &:hover {
      background-color: ${COLORS.LIGHT_HOVER};
    }

    &:active {
      background-color: ${COLORS.LIGHT_ACTIVE};
    }
  }

  div {
    width: 1px;
    background-color: #d8d8d8;
    height: 58px;
  }
`

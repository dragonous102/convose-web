import styled from "styled-components/macro"
import { media, StyleConst, Button } from "../../components"

const { COLORS, FONT } = StyleConst

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 12px;
  background-color: ${COLORS.TEXT_BRIGHT};
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 30px 0;
  z-index: 100;
  padding: 5px 24px;

  ${media.lap`
    padding: 10px 36px;
  `}
  ${media.desktop`
    background-color: ${COLORS.CARD_BACKGROUND};
    position: relative;
    padding: 8px 28px 0px 28px;
    box-shadow: none;
    background: none;
    z-index: unset;
  `}
`

const StyledCenterBlock = styled.div`
  position: relative;

  > aside {
    position: absolute;
    top: 0;
    right: 0;
  }
`

// const StyledLeftBlock = styled.div``;

const StyledRightBlock = styled.div`
  display: flex;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  /* flex: 0 0 46px; */
  justify-content: flex-end;

  ${media.desktop`
   min-width:130px;
    flex: 1 0 100px;
    button {
      margin-left: 6px;
    }
  `}/* > button {
    height: 46px;
  } */
`

const StyledButton = styled(Button)`
  width: 57px;
  height: 57px;
  border: none;
  border-radius: 50%;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 200ms ease-in-out;
  z-index: 999;
  margin-bottom: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;

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

const StyledSearch = styled.div`
  display: flex;
  margin-left: 20px;
`

const StyledSearchText = styled.span`
  margin-top: 15px;
  margin-left: 25px;
  font-size: 27px;
  ${FONT.SECONDARY};
`

export {
  StyledCenterBlock,
  StyledHeader,
  // StyledLeftBlock,
  StyledRightBlock,
  StyledButton,
  StyledSearch,
  StyledSearchText,
}

import styled, { css, keyframes } from "styled-components/macro"
import { StyleConst } from "../../const"
import { StyledIcon } from "../Icon/Styled"

const { COLORS, FONT_SIZES } = StyleConst

export const StyledButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  font-size: ${FONT_SIZES.XL};
  height: 40px;
  width: 40px;
  background-color: ${({ bgColor }) => bgColor};

  ${StyledIcon} {
    pointer-events: none;
    color: ${COLORS.TEXT_BRIGHT};
    padding-left: 2px;
  }
`

export const StyledCloseIcon = styled.span`
  height: 16px;
  width: 16px;
  text-align: center;
  &:before,
  &:after {
    position: absolute;
    margin-left: -1px;
    content: "";
    height: 16px;
    width: 2px;
    background-color: #ffffff;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

export const StyledAudioRecorder = styled.div`
  position: absolute;
  right: 36px;
  width: 170px;
  border-radius: 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.TEXT_BRIGHT};
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
`

export const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70px;
`

export const StyledTimeContainer = styled.div`
  display: flex;
  width: 58px;
  justify-content: space-around;
  align-items: baseline;
`

export const StyledTime = styled.div`
  /* font-family: 'Courier New', Courier, monospace;
  letter-spacing: -1px; */
  width: 33px;
  text-align: left;
  font-weight: 300;
  font-size: 17px;
`

export const StyledTimeSub = styled.div`
  /* font-family: 'Courier New', Courier, monospace; */
  position: relative;
  width: 20px;
  text-align: left;
  font-weight: 300;
  font-size: 14px;
  bottom: 0;
`

const pulse = keyframes`
  0% {
    transform: scale(.33);
    opacity: 1;
  }
  80%, 100% {
    opacity: 0;
  }
`

export const StyledPulse = styled.div`
  position: relative;
  width: 6px;
  height: 6px;

  &:before {
    content: "";
    position: relative;
    display: block;
    width: 300%;
    height: 300%;
    box-sizing: border-box;
    margin-left: -100%;
    margin-top: -100%;
    border-radius: 45px;
    background-color: #ff0000;
    opacity: 0;
    ${({ isRecording }) =>
      isRecording &&
      css`
        animation: ${pulse} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      `};
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #ff0000;
    border-radius: 15px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
`

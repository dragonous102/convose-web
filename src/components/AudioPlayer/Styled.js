import styled from "styled-components/macro"
import { StyleConst } from "../../const"
const { COLORS, FONT_SIZES } = StyleConst

const thumbSize = "14px"

export const StyledPlayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
`

export const StyledButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;

  & path {
    fill: ${({ mine }) =>
      mine ? COLORS.TEXT_BRIGHT : COLORS.BUTTON_DARK_GREY};
  }
`

export const StyledSeek = styled.input`
  appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  margin: 0;
  border: none;
  outline: none; /* no focus outline */
  position: relative;
  background: transparent;
  width: 100%;
  font-size: ${FONT_SIZES.XXS};

  &::before {
    display: block;
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    background-color: ${({ mine }) =>
      mine ? COLORS.BACKGROUND_MID_GREY : COLORS.BACKGROUND_MID_GREY};
  }

  &::-moz-range-track {
    border: 0;
    background-color: ${({ mine }) =>
      mine ? COLORS.BACKGROUND_MID_GREY : COLORS.BACKGROUND_MID_GREY};
    height: 2px;
  }

  &::-ms-track {
    border: inherit;
    color: transparent; /* don't drawn vertical reference line */
    background: transparent;
  }

  &::-ms-fill-lower,
  &::-ms-fill-upper {
    background: transparent;
  }
  /* thumb */
  &::-webkit-slider-thumb {
    appearance: none;
    width: ${thumbSize};
    height: ${thumbSize};
    border: none;
    border-radius: 50%;
    background-color: ${({ mine }) =>
      mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_BRIGHT};
    box-shadow: 0.5px 1px 1px rgba(0, 0, 0, 0.0721524),
      -0.5px 0px 1px rgba(0, 0, 0, 0.07);
    position: relative;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: ${thumbSize};
    height: ${thumbSize};
    border: none;
    border-radius: 50%;
    background-color: ${({ mine }) =>
      mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_BRIGHT};
    box-shadow: 0.5px 1px 1px rgba(0, 0, 0, 0.0721524),
      -0.5px 0px 1px rgba(0, 0, 0, 0.07);
    position: relative;
    cursor: pointer;
  }

  &::-ms-thumb {
    width: ${thumbSize};
    height: ${thumbSize};
    border-radius: 50%;
    border: 0;
    background-color: ${({ mine }) =>
      mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_BRIGHT};
    box-shadow: 0.5px 1px 1px rgba(0, 0, 0, 0.0721524),
      -0.5px 0px 1px rgba(0, 0, 0, 0.07);
    position: relative;
    cursor: pointer;
  }
`

export const StyledTime = styled.div`
  margin: 0 12px;
  white-space: nowrap;
  color: ${({ mine }) => (mine ? COLORS.TEXT_BRIGHT : COLORS.TEXT_DARK_GREY)};
  opacity: 0.5;
  width: 20px;
`

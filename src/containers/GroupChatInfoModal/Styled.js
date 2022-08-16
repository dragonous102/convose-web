import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS } = StyleConst

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 95vw;
  height: 632px;
  background: ${COLORS.TEXT_BRIGHT};
  border-radius: 10px;
  padding-top: 58px;
  ${media.lap`
    width: 410px;
  `}

  h1 {
    margin: 64px 0;
    font-size: 30px;
    font-weight: bold;
    line-height: 16px;
    letter-spacing: 0.433333px;
  }
`

export const StyledImageWrapper = styled.div`
  position: relative;
`

export const StyledImage1 = styled.img``

export const StyledImage2 = styled.img`
  position: absolute;
  top: -30px;
  right: 60px;
`

export const StyledImage3 = styled.img`
  position: absolute;
  top: 95px;
  right: 56px;
`

export const StyledInfoText = styled.h2`
  width: 300px;
  padding-top: 18px;
  padding-bottom: 32px;
  font-size: 26px;
  line-height: 34px;
`

export const StyledSubmitButton = styled.button`
  display: block;
  width: 148px;
  height: 56px;
  border-radius: 50px;
  box-sizing: border-box;
  border: 2px solid ${COLORS.PRIMARY};
  background: ${COLORS.PRIMARY};
  cursor: pointer;
  font-family: Poppins, sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: ${COLORS.TEXT_BRIGHT};

  &::-moz-focus-inner {
    border: none;
  }

  &:focus {
    outline: none;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    background: ${COLORS.PRIMARY_HOVER};
    border-color: ${COLORS.PRIMARY_HOVER};
  }

  &:active {
    background: ${COLORS.PRIMARY_ACTIVE};
    border-color: ${COLORS.PRIMARY_ACTIVE};
  }
`

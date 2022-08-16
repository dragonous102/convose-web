import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS } = StyleConst

export const StyledLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 74px;
  background-color: ${({ white }) => (white ? "white" : COLORS.PRIMARY)};
  border-radius: 40px;

  &::-moz-focus-inner {
    border: none;
  }

  &:hover {
    background: ${COLORS.PRIMARY_HOVER};
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: ${COLORS.PRIMARY_ACTIVE};
    outline: none;
  }
`

export const StyledBadge = styled.img`
  display: block;
  width: 160px;
  height: auto;
  color: ${({ black }) => (black ? "black" : COLORS.PRIMARY)};
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

import styled from "styled-components/macro"
// import { StyleConst } from "../../const"
// import { media } from "../../utils/mediaQueryHelper"

// const { COLORS } = StyleConst

const StyledThemeContainer = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 157px;
  height: 50px;
  margin-top: 33px;
  margin-inline: auto;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const StyledImageIcon = styled.img`
  width: 27px;
  height: 27px;
  border-radius: 27px;
`

const StyledIconName = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  color: ${({ textColor }) => textColor};
  white-space: nowrap;
  width: 100px;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export { StyledThemeContainer, StyledImageIcon, StyledIconName }

import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledWrapper = styled.div`
  background-color: ${COLORS.TERTIARY};
  min-height: 100vh;
  min-height: -webkit-fill-available;
  width: 100vw;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 0 25px 0;
`

const StyledItem = styled.div`
  ${FONT.LIGHT};
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  max-width: 300px;
  color: ${COLORS.TEXT_DARK};
  font-size: ${FONT_SIZES.LXL};

  &:last-of-type {
    width: 150px;
    font-size: 14px;
    word-wrap: break-word;
    margin-bottom: 3rem;
  }
`

const StyledH1 = styled.h1`
  font-size: 24px;
  line-height: 34px;
`

const StyledButton = styled.button`
  border: 0;
  padding: 0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  background: none;
  cursor: pointer;
  color: ${COLORS.PRIMARY};
  font-family: Poppins;
`

const StyledImg = styled.img`
  width: 88px;
  max-height: 99px;
  padding: 2px;
`

export { StyledItem, StyledWrapper, StyledButton, StyledH1, StyledImg }

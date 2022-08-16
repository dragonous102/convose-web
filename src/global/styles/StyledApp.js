import styled from "styled-components/macro"
import { StyleConst, media } from "../../components"

const { COLORS, FONT } = StyleConst

const StyledApp = styled.main`
  background-color: ${COLORS.TERTIARY};
  text-align: center;
  ${FONT.DEFAULT};
  ${media.lap`min-height: 100vh`};
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  max-width: 100%;

  input,
  textarea,
  button {
    font-family: inherit;
  }
`

export { StyledApp }

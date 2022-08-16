import styled from "styled-components/macro"
import { media } from "../../utils/mediaQueryHelper"
import { StyleConst } from "../../const"

const { COLORS, SHADOWS } = StyleConst
export const StyledHeader = styled.h2`
  margin-left: 10%;
  margin-right: 10%;
  font-size: 30px;
  line-height: normal;
`

export const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 95vw;
  height: 614px;
  background: ${COLORS.TEXT_BRIGHT};
  border-radius: 20px;
  ${media.lap`
    width: 536px;
  `}

  h1 {
    margin: 20px 0;
    font-size: 30px;
    font-weight: bold;
    line-height: 16px;
    letter-spacing: 0.433333px;
  }
`

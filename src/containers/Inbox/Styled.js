import styled from "styled-components/macro"
import { media, StyleConst } from "../../components"

const { COLORS, FONT_SIZES, FONT } = StyleConst

const StyledWrapper = styled.aside`
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px 10px 50px 20px;
  background-color: ${COLORS.TEXT_BRIGHT};
  ${media.lap`
    height: 60%;
    max-height: 100vh;
    width: 100%;
    box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);
    position: fixed;
    top: auto;
    bottom: 84px;
    right: 40px;
    max-width: 390px;
    max-height: calc(100vh - 110px);
    padding: 20px 10px 5px 20px;
    box-shadow: -10px 0px 45px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
 `}
  ${media.desktop`
    height: 80%;
    top: 90px;
    bottom: auto;
    right: 40px;
    max-height: calc(100vh - 100px);
    box-shadow: -10px 0px 45px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  `}
`

const StyledButtonWrapper = styled.menu`
  position: fixed;
  bottom: 8px;
  right: 20px;
`

const StyledHeadline = styled.h2`
  font-size: ${FONT_SIZES.LXL};
  ${FONT.SEMIBOLD};
  text-align: left;
  margin-bottom: 8px;
  color: ${COLORS.TEXT_DARK};
`

export { StyledWrapper, StyledButtonWrapper, StyledHeadline }

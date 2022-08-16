import styled from "styled-components/macro"
import { media } from "../../../utils/mediaQueryHelper"
import { StyleConst } from "../../../const"

const { FONT, FONT_SIZES, COLORS } = StyleConst

const StyledContainer = styled.ul`
  ${({ showAll }) => !showAll && "max-height: 155px;"}
  padding: 0px 15px;

  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  text-align: center;
  overflow-x: hidden;
  height: 100%;
  padding-right: 0;
  ${media.lap`
    ${({ showAll }) => !showAll && "max-height: 160px"};
    overflow: hidden;
  `}
`

const StyledItem = styled.li`
  display: flex;
  flex: 1 1 50%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  border-radius: 40px;
  margin: 4px 0;
  padding: 6px;
  transition: background-color 200ms ease-in-out;
  width:fit-content;
  padding:5px 14px

  &:hover {
    background-color: ${COLORS.LIGHT_HOVER};
  }

  &:active {
    background-color: ${COLORS.LIGHT_ACTIVE};
  }
`

const StyledName = styled.p`
  display: flex;
  ${FONT.BOLD};
  color: ${(props) => props.themeColor};
  font-size: ${FONT_SIZES.L};
  line-height: 20px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 80px;
  margin-left: 9px;
`
const StyledLoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  position: absolute;
  width: 100%;
`
export { StyledContainer, StyledItem, StyledName, StyledLoadingSpinnerWrapper }

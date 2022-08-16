import styled from "styled-components/macro"
import { media } from "../../utils/mediaQueryHelper"

const StyledContainer = styled.ul`
  min-width: 100%;
  position: relative;
  left: 0;
  width: 100%;
  overflow: hidden;
  ${({ showAll }) => !showAll && "max-height: 145px"};
  padding: ${({ topPadding }) => topPadding}px 10px 0;
  margin-bottom: 10px;
  display: block;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  ${({ onClick }) => onClick && "cursor: pointer;"}
  ${media.lap`
    ${({ showAll }) => !showAll && "max-height: 174px"};
    overflow: hidden;
  `}
`

const StyledItem = styled.li`
  display: inline-block;
  vertical-align: bottom;
  flex: 0 1 auto;
  max-width: 100%;
`

export { StyledContainer, StyledItem }

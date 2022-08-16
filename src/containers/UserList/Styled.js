import styled from "styled-components/macro"
import { media } from "../../components"

export const StyledWrapper = styled.section`
  display: flex;
  padding: 0 12px 70px;
  max-width: 100vw;
  flex-wrap: wrap;
  ${media.lap`padding: 0 36px 70px;`}
  ${media.desktop`
    padding: 0 36px;
    position: relative;
  `}
`

export const StyledItem = styled.div`
  display: flex;
  flex: 0 0 100%;
  max-width: calc(100vw - 24px);
  justify-content: center;
  align-items: center;

  ${media.lap`
 
  max-width: initial;
  min-height: 270px;
  flex-basis: 50%;
  `}
  ${media.desktop` 
    margin: 10px 0px;
    min-height: 300px;
  `}
  ${media.cinema`
    flex-basis: 33%;
  `}
  ${media.ultrawide`
    min-height: 325px;  
  `}
`

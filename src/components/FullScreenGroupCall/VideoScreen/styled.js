import styled from "styled-components"
import { media } from "../../../utils/mediaQueryHelper"

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${media.lap`
     
    `}
`
const StyledVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100vh;
  height: 70vh;
`
const CallingBarWrapper = styled.div`
  align-self: center;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledNameMicWrapper = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 0;
  height: 15px;
  width: 100%;
`
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #fff;
`
export {
  StyledWrapper,
  StyledVideoContainer,
  CallingBarWrapper,
  StyledNameMicWrapper,
  StyledImage,
}

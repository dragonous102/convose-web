import styled from "styled-components/macro"

const StyledVideoContainer = styled.div`
  ${({ local }) =>
    local
      ? `
      width:70px;
      height:90px;
      position:absolute;
      z-index:99;
      top:0px;
      right:0px;
      border-radius:10px;
      & > div{
        border-radius:10px;
      }
      
      `
      : `
      width: 100%;
      height: 100%;
      left:0;
      right:0;
      position:absolute;
      `}
`
export { StyledVideoContainer }

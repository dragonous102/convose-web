import styled from "styled-components/macro"

const StyledWrapper = styled.ol`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 200;
  margin: 20px;
`

const StyledItem = styled.li`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`

export { StyledWrapper, StyledItem }

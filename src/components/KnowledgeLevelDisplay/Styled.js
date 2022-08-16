import styled from "styled-components/macro"

// if primary === false, margin top is 0
const StyledWrapper = styled.div`
  display: flex;
  margin-top: ${(props) => (props.primary ? "4px" : "1px")};
  margin-left: 6px;
  padding-bottom: ${(props) => (props.primary ? "4px" : "2px")};
`

export { StyledWrapper }

import styled from "styled-components/macro"

const StyledAbsoluteCenteredContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledRichTextContainer = styled.div`
  padding: 24px;
  width: 100%;
`

export { StyledAbsoluteCenteredContainer, StyledRichTextContainer }

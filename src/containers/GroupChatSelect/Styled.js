import styled from "styled-components/macro"
import { media, StyleConst } from "../../components"

const { COLORS, SHADOWS } = StyleConst

const StyledWrapper = styled.menu`
  background: ${COLORS.BACKGROUND};
  width: 80%;
  max-width: 375px;
  height: 100%;
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 12px 0;
  position: absolute;
  box-shadow: ${SHADOWS.BOX_SHADOW_MENU};
  overflow: hidden;
  /* overflow-y: scroll; */
  /* scrollbar-width: none; /* stylelint-disable property-no-unknown */
  /* &::-webkit-scrollbar {
    width: 0;
    height: 0;
  } */

  ${media.lap`
  `}
  ${media.desktop`
    width: 371px;
    left: 50%;
    margin-left: -195px;
    height: 600px;
    top: 50%;
    margin-top: -300px;
    /* right: 40px; */
    /* max-height: calc(100vh - 100px); */
    box-shadow: 0 14px 45px rgba(0, 0, 0, .25);
    border-radius: 10px;
  `}
`

const StyledLoadingContainer = styled.div`
  display: ${({ loading }) => (loading ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: ${({ center }) => (center ? "50%" : "95%")};
  transform: translate(-50%, -50%);
`

export { StyledWrapper, StyledLoadingContainer }

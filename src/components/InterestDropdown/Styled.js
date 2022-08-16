import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES, SHADOWS } = StyleConst

const StyledWrapper = styled.aside`
  display: flex;
`

const StyledClickCatcher = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const StyledModal = styled.ol`
  left: 50%;
  transform: translateX(-50%);
  bottom: 90px;
  position: fixed;
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 24px 12px 12px;
  z-index: 100;
  background-color: ${COLORS.TEXT_BRIGHT};
  box-shadow: ${SHADOWS.BOX_SHADOW_DROPDOWN};
  width: calc(100vw - 24px);
  ${media.palm`
    width: 600px;
    max-width: 60vw;
  `}
`

const StyledItem = styled.li`
  position: relative;
  ${(props) =>
    !props.inModal
      ? `
    margin-right: 60px;
    margin-left: -60px;
  `
      : `
    margin-bottom: 14px;
  `}
`

const StyledButton = styled.button`
  flex: 0 0 auto;
  background: none;
  margin: 0;
  padding: 0 16px 0 8px;
  line-height: 40px;
  width: 48px;
  font-size: ${FONT_SIZES.XS};
  ${media.lap`font-size: ${FONT_SIZES.XXS}`};
  border: 0;
  border-radius: 4px;
  color: ${COLORS.PRIMARY};
  ${FONT.DEFAULT};
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  right: 10px;

  > div:last-child {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`

export {
  StyledButton,
  StyledClickCatcher,
  StyledItem,
  StyledModal,
  StyledWrapper,
}

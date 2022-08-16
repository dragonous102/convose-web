import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES, SHADOWS } = StyleConst

const StyledWrapper = styled.section`
  position: relative;
  display: flex;
  padding-right: 18px;
  margin-right: 42px;
  width: fit-content;
`
const StyledWrapperMobile = styled.section`
  position: relative;
  display: flex;
  width: 100%;
`

const StyledClickCatcher = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
`
const HiddenItemSpan = styled.span`
  padding-right: 8px;
  font-size: 13px;
`

const StyledModal = styled.ol`
  ${({ mobile }) =>
    mobile
      ? `
  position: relative;
  top:0px;
  box-shadow:"none";
  `
      : `
  position: absolute;
  top: -6%;
  box-shadow:${SHADOWS.BOX_SHADOW_DROPDOWN};
  `};
  max-width: 100%;
  border-radius: 14px;
  width: 100%;
  left: -2px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  z-index: 101;
  background-color: ${COLORS.TEXT_BRIGHT};
  justify-content: flex-start;
`

const StyledList = styled.ol`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  max-height: 70px;
  width: 100%;
  flex-grow: 1;
`

const StyledItem = styled.li`
  position: relative;
  ${(props) =>
    !props.inModal
      ? `
    padding: 10px 0;
  `
      : `
    margin-bottom: 14px;
  `}
`

const StyledButton = styled.button`
  flex: 0 0 auto;
  background-color: ${COLORS.PRIMARY};
  position: absolute;
  top: 29%;
  left: 99%;
  margin-left: 2px;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 40px;
  color: ${COLORS.TEXT_BRIGHT};
  ${FONT.DEFAULT};
  cursor: pointer;
  z-index: 102;
`

const StyledActiveInterest = styled.div`
  width: 3px;
  height: 52px;
  background-color: ${COLORS.PRIMARY};
  margin: 20px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: -70%;
    left: 20%;
    border-bottom: 15px solid ${COLORS.PRIMARY};
    border-top: 15px solid transparent;
    border-left: 15px solid transparent;
    border-radius: 1%;
    transform: rotate(45deg);
  }
`

export {
  StyledButton,
  StyledClickCatcher,
  StyledItem,
  StyledList,
  StyledModal,
  StyledWrapper,
  HiddenItemSpan,
  StyledActiveInterest,
  StyledWrapperMobile,
}

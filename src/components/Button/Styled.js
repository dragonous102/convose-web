import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledButton = styled.button`
  ${(props) => (props.semibold ? FONT.SEMIBOLD : FONT.DEFAULT)};
  background-color: ${({ primary }) =>
    primary ? COLORS.PRIMARY : COLORS.BACKGROUND_TRANSPARENT};
  border: ${({ blank }) => (blank ? 0 : `1px solid ${COLORS.PRIMARY}`)};
  color: ${({ primary }) => (primary ? COLORS.BACKGROUND : COLORS.PRIMARY)};
  padding: 0 12px;
  margin-bottom: 20px;
  height: ${({ height }) => (height ? `${height}px` : `auto`)};
  font-size: ${(props) =>
    props.tiny
      ? FONT_SIZES.XS
      : props.small
      ? FONT_SIZES.S
      : props.medium
      ? FONT_SIZES.M
      : FONT_SIZES.L};
  line-height: ${(props) =>
    props.tiny ? "26px" : props.small ? "30px" : "45px"};
  border-radius: ${({ noRadius, semiRadius }) =>
    noRadius ? 0 : semiRadius ? "50px" : "4px"};
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: ${(props) => (props.hovered ? COLORS.PRIMARY_HOVER : "")};
  }
`

export { StyledButton }

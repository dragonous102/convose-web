import styled from "styled-components/macro"
import { colors, fonts } from "../../const"

const StyledIndicator = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background-color: ${(props) =>
    props.opened ? colors.TEXT_GREY : colors.SIGNAL.WARN};
  font-size: ${fonts.SIZES.XS};
  color: ${colors.TEXT_BRIGHT};
  ${fonts.DEFAULT};
  margin-left: 5px;
`

export { StyledIndicator }

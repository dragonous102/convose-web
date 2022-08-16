import styled from "styled-components/macro"
import { StyleConst } from "../../const"
import { media } from "../../utils/mediaQueryHelper"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const InboxWrapper = styled.article`
  position: relative;
  width: 100%;
  ${({ displayIndicator }) =>
    !displayIndicator && "box-shadow: rgba(0, 0, 0, .1) 1px 1px 3px 1px;"};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 16px;
  ${media.desktop`max-width: 350px;`};
  text-decoration: none;
  background-color: ${({ displayIndicator, themeColor }) =>
    displayIndicator ? COLORS.TEXT_BRIGHT : themeColor};
  ${FONT.DEFAULT};
  font-size: ${FONT_SIZES.M};
  color: ${({ displayIndicator }) =>
    displayIndicator ? COLORS.TEXT_DARK : COLORS.TEXT_BRIGHT};
  ${({ displayIndicator }) =>
    displayIndicator ? "padding-right: 10px" : "padding: 0 20px;"}
`

const ProfileImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ displayIndicator }) => (displayIndicator ? "0" : "20px")};
  transform: translateY(-50%);
`

const StyledUserName = styled.div`
  ${FONT.SEMIBOLD};
  line-height: 30px;
  color: ${({ themeColor }) => themeColor || "inherit"};
`

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 10px 60px;
`

const StyledMessage = styled.div`
  flex: 1 0 40px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`

const UserWrapper = styled.div`
  flex: 1 0 40px;
  padding: 10px 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDateLabel = styled.div`
  font-size: ${FONT_SIZES.XS};
  opacity: 0.5;
`

const StyledIconWrapper = styled.aside`
  margin-right: 5px;
`

export {
  ProfileImageWrapper,
  StyledUserName,
  InboxWrapper,
  MessageWrapper,
  StyledMessage,
  UserWrapper,
  StyledDateLabel,
  StyledIconWrapper,
}

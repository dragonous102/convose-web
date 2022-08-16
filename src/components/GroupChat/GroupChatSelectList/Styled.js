import styled, { keyframes } from "styled-components/macro"
import { StyleConst } from "../../../const"

const { COLORS, FONT, FONT_SIZES } = StyleConst

const StyledScrollContainer = styled.div`
  padding: 0 18px 0 18px;
  margin: 0;
  /* height: calc(100vh - 70px); */
  display: flex;
  flex-direction: column;
`

const StyledHeader = styled.h3`
  text-align: center;
  font-size: 24px;
  height: 80px;
  line-height: 80px;
  /* padding-top: 18px; */
`


const StyledList = styled.ul`
  height: fit-content;
  min-height: 460px;
  width: 335px;
`

const StyledGroupChatItem = styled.li`
  width: 335px;
  height: 84px;
  background-color: ${COLORS.TEXT_BRIGHT};
  margin-bottom: 18px;

  button {
    width: 100%;
    height: 100%;
    border: 0 solid #e0e0e0;
    border-radius: 27px;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.15);
    transition: all 100ms ease-in-out;
    background-color: ${COLORS.TEXT_BRIGHT};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.selected,
    &.selected:hover {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.15);
      border: 3px solid #04e000;
      background-color: #ebffeb;
    }

    &:hover {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.15);
      border: 3px solid #04e000;
      background-color: ${COLORS.TEXT_BRIGHT};
    }
  }
`

const StyledMark = styled.div`
  position: relative;
  border: 2px solid #f1f1f1;
  background-color: #f1f1f1;
  width: 28px;
  height: 28px;
  border-radius: 50%;
`

const StyledName = styled.p`
  ${FONT.BOLD};
  color: ${(props) => props.themeColor};
  font-size: ${FONT_SIZES.XL};
  line-height: 30px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
  margin-left: 20px;
`

const StyledInviteButton = styled.button`
  width: 300px;
  height: 56px;
  background-color: ${({ disabled }) => (disabled ? "#26c7ff" : "#1cb9f1")};
  color: ${COLORS.TEXT_BRIGHT};
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  position: sticky;
  bottom: 35px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: #26c7ff;
  }

  &:active {
    background-color: #47d0ff;
  }
`

const StyledText = styled.p``

const spinLoader = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  font-size: 3px;
  margin: auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: ${spinLoader} 1.4s infinite linear;
  animation: ${spinLoader} 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }

  &:after {
    background: #26c7ff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export {
  StyledScrollContainer,
  StyledHeader,
  StyledList,
  StyledGroupChatItem,
  StyledName,
  StyledMark,
  StyledInviteButton,
  StyledText,
  StyledLoader,
  
}

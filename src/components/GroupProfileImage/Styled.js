import styled from "styled-components/macro"

const GroupProfileImageWrapper = styled.div`
  width: ${({ size = 80 }) => size}px;
  height: ${({ size = 80 }) => size}px;
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`
const GroupProfileImageWrapperBanner = styled.div`
  position: relative;
  margin-left:-8px;
  height:30px;
  width:${(props) =>
    props.length == 1 ? `25px` : props.length == 2 ? `45px` : `65px`}};
`

const StyledProfileImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => `background-image: url(${props.url});`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  box-sizing: border-box;
  pointer-events: none;
`
const StyledProfileImageBanner = styled.div`
  width: ${(props) =>
    props.index == 1
      ? `${props.width + 2}px`
      : props.index == 2
      ? `${props.width + 1}px`
      : `${props.width}px`}};
  height: ${(props) =>
    props.index == 1
      ? `${props.height + 2}px`
      : props.index == 2
      ? `${props.height + 1}px`
      : `${props.height}px`}};;
  ${(props) => `background-image: url(${props.url});`};
  position:absolute;
  z-index:${(props) => (props.index == 1 ? 30 : props.index == 2 ? 20 : 10)};
  top:50%;
  transform:translate(0px,-50%);
  left:${(props) => `${props.index * props.width - props.width + 8}px`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  box-sizing: border-box;
  pointer-events: none;
`

export {
  StyledProfileImage,
  GroupProfileImageWrapper,
  StyledProfileImageBanner,
  GroupProfileImageWrapperBanner,
}

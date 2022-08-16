import styled, { css } from "styled-components/macro"
import { media } from "../../utils/mediaQueryHelper"
import { StyleConst } from "../../const"
const { FONT, FONT_SIZES } = StyleConst

const StyledDropdownItem = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${FONT.DEFAULT};
  font-size: ${FONT_SIZES.S};
  line-height: 60px;
  ${media.lap`
    font-size: ${FONT_SIZES.M}
    line-height: 66px;
  `}
  ${media.desktop`
    font-size: ${FONT_SIZES.S}
    line-height: 46px;
  `}
  > span {
    display: inline-block;
  }
`

const ContentWrapper = styled.div`
  box-sizing: border-box;
  text-align: left;
  overflow: hidden;
`

const ContentSpan = styled.span`
  width: 100%;
  display: block;
  padding: 0 20px;
  padding-right: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;

  ${(props) =>
    props.alreadyExist &&
    css`
      &:after {
        content: "(Already added)";
        position: absolute;
        right: 0px;
        transform: translate(-2px, -50%);
        top: 50%;
        color: gray;
        font-style: italic;
        font-size: 13px;
      }
    `}
  ${media.desktop`
    padding: 0 49px;
    padding-right:120px;
  `}
`

const MatchWrapper = styled.div`
  margin-left: 6px;
  flex: 0 0 auto;
  white-space: nowrap;

  > div {
    display: inline-block;
    margin-right: 4px;
  }
`

const MatchSpan = styled.span`
  padding: 0 4px;
`

const BadgeSpan = styled.span`
  width: ${(props) => props.width || "45%"};
  height: auto;
  display: inline-block;
  white-space: nowrap;

  .SVGInline {
    display: inline-block;
    width: 100%;
  }
`

export {
  StyledDropdownItem,
  ContentWrapper,
  ContentSpan,
  MatchWrapper,
  MatchSpan,
  BadgeSpan,
}

import styled from "styled-components/macro"
import { StyleConst } from "../../const"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

const DEFAULT_MARGIN = 12

const StyledRichTextWrapper = styled.article`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ inverted }) =>
    inverted ? COLORS.TEXT_BRIGHT : COLORS.TEXT_DARK};
  ${FONT.LIGHT};
  line-height: 1.4;
  font-size: ${({ smallText }) => (smallText ? FONT_SIZES.XXS : FONT_SIZES.M)};

  a {
    color: ${COLORS.PRIMARY};
    text-decoration: underline;
    transition: color ${TRANSITION.DURATION} ${TRANSITION.EASING};

    &:focus,
    &:hover,
    &:active {
      text-decoration: underline;
      color: ${COLORS.TEXT_GREY};
    }
  }

  ol {
    list-style-type: decimal;
    padding-left: 30px;
    margin-bottom: ${DEFAULT_MARGIN}px;
    text-align: left;
  }

  ul {
    list-style-type: disc;
    padding-left: 30px;
    margin-bottom: ${DEFAULT_MARGIN}px;
    text-align: left;
  }

  section {
    margin-bottom: ${2 * DEFAULT_MARGIN}px;
  }

  h1 {
    ${FONT.BOLD};
    font-size: ${FONT_SIZES.XL};
    margin-bottom: ${2 * DEFAULT_MARGIN}px;
  }

  h2 {
    ${FONT.BOLD};
    font-size: ${({ smallText }) =>
      smallText ? FONT_SIZES.L : FONT_SIZES.LXL};
    margin-bottom: ${DEFAULT_MARGIN}px;
  }

  h3 {
    ${FONT.BOLD};
    font-size: ${({ smallText }) => (smallText ? FONT_SIZES.M : FONT_SIZES.L)};
    margin-bottom: ${DEFAULT_MARGIN}px;
  }

  p {
    margin-bottom: ${DEFAULT_MARGIN}px;
  }

  strong {
    ${FONT.BOLD};
  }
`

export { StyledRichTextWrapper }

import styled from "styled-components/macro"
import { StyleConst } from "../../../const"

const { COLORS, FONT, FONT_SIZES, TRANSITION } = StyleConst

const StyledWrapper = styled.div`
    background: rgba(255, 255, 255, 0.77);
    border-radius: 7px;
    margin-left:0;
    margin-top:2px;
    width:fit-content; 
    height:18px;
    display: inline-block
    text-align: left;
    overflow: hidden;
    max-width: 80%;
    position: relative;
    transition: opacity ${TRANSITION.DURATION} ${TRANSITION.EASING};
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;
    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    hyphens: auto;
    padding-left:2px;
    padding-right:2px;
`

const StyledContent = styled.span`
  font-family: Poppins;
  ${(props) => (!props.isTimestamp ? "font-style:italic;" : "")}
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  align-items: center;
  color: #9a9a9a;
`

export { StyledWrapper, StyledContent }

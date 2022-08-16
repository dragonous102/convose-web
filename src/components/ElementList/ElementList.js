import { PureComponent } from "react"
import PropTypes from "prop-types"
import { Scrollbars } from "react-custom-scrollbars"
import { StyledWrapper, StyledLoadingText } from "./Styled"
import VisibilityTrigger from "../VisibilityTrigger"
import { PARTNERS_FETCH_LIMIT } from "../../redux/constants"

class ElementList extends PureComponent {
  constructor(props) {
    super(props)
    this.handleVisibilityTrigger = this.handleVisibilityTrigger.bind(this)
  }
  handleVisibilityTrigger() {
    const { partners, fetchPartners, myUuid, nextPage, isLoadingPartners } =
      this.props
    !isLoadingPartners &&
      nextPage &&
      fetchPartners({
        from: partners.length,
        limit: PARTNERS_FETCH_LIMIT,
        myUuid: myUuid,
      })
  }
  componentDidMount() {
    this.scrollUp()
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props
    if (prevProps.children !== children) {
      this.scrollUp()
    }
  }

  scrollUp() {
    const { autoScrollToBottom } = this.props
    if (autoScrollToBottom) {
      this.wrapperEl.scrollToBottom()
    }
  }

  render() {
    const { isLoadingPartners, nextPage, children, ...others } = this.props
    return (
      <Scrollbars
        ref={(ref) => {
          this.wrapperEl = ref
        }}
        autoHide
      >
        <StyledWrapper {...others}>{children}</StyledWrapper>
        <VisibilityTrigger visibilityHandler={this.handleVisibilityTrigger}>
          <StyledLoadingText>
            {nextPage ? "Loading chats" : "No more chats"}
          </StyledLoadingText>
        </VisibilityTrigger>
      </Scrollbars>
    )
  }
}

ElementList.propTypes = {
  children: PropTypes.node.isRequired,
  autoScrollToBottom: PropTypes.bool,
  reverse: PropTypes.bool,
  partners: PropTypes.array,
  fetchPartners: PropTypes.func.isRequired,
  isLoadingPartners: PropTypes.bool,
  nextPage: PropTypes.bool.isRequired,
  myUuid: PropTypes.string.isRequired,
}

ElementList.defaultProps = {
  autoScrollToBottom: false,
  reverse: false,
}

export default ElementList

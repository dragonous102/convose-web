/* eslint-disable react/require-default-props */
import { PureComponent } from "react"
import PropTypes from "prop-types"
import { StyledWrapper } from "./Styled"
import { focusInterestInput } from "../../redux/actions/interests"
import { connect } from "react-redux"
import Icon from "../Icon"

class TextInput extends PureComponent {
  constructor(props) {
    super(props)
  }
  dispatchInputFocus() {
    const { focusInterestInput } = this.props
    focusInterestInput(true)
  }

  render() {
    const {
      iconConfig,
      highlightOnMount,
      refCallback,
      value,
      small,
      focusInput,
      ...otherProps
    } = this.props
    return (
      <StyledWrapper
        value={value}
        highlightOnMount={highlightOnMount}
        small={small}
        focusInput={focusInput}
      >
        <Icon width="20px" height="20px" {...iconConfig} />
        <input
          onClick={() => this.props.dispatch(focusInterestInput(true))}
          value={value}
          {...otherProps}
          ref={refCallback}
        />
      </StyledWrapper>
    )
  }
}

TextInput.propTypes = {
  refCallback: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  iconConfig: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string,
  small: PropTypes.bool,
  highlightOnMount: PropTypes.bool,
}

TextInput.defaultProps = {
  highlightOnMount: false,
  small: false,
}

export default connect(null, null)(TextInput)

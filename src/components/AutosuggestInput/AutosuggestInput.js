import { PureComponent } from "react"
import Autosuggest from "react-autosuggest"
import PropTypes from "prop-types"
import isEqual from "lodash-es/isEqual"
import TextInput from "../TextInput/TextInput"
import DropdownItem from "../DropdownItem/DropdownItem"
import { StyledWrapper } from "./Styled"
import AutoSuggestInputPropsShape from "../../utils/shapes/AutoSuggestInputPropsShape"
import { InterestShape } from "../../utils/shapes"
import { checkIfAlreadyExistInterest } from "../../utils/faye/helpers"
import Tooltip from "../Tooltip"

const toolTip = "Add Languages, skills, hobbies, locations"

const getSuggestionValue = (suggestion) => suggestion.name || suggestion

const renderSuggestion = (interests, suggestion) => (
  <DropdownItem
    alreadyExist={checkIfAlreadyExistInterest(interests, suggestion.name)}
    match={suggestion.match}
  >
    {suggestion.name}
  </DropdownItem>
)

class AutosuggestInput extends PureComponent {
  constructor(props) {
    super(props)
    this.createInputRef = this.createInputRef.bind(this)
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this)
    this.renderInputComponent = this.renderInputComponent.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { isMobileOrTabletView, suggestions } = this.props
    if (isMobileOrTabletView) {
      if (!isEqual(prevProps.suggestions, suggestions)) {
        this.scrollUp()
      }
    }
  }
  renderInputComponent(inputProps) {
    const focusInput = document.activeElement === this.inputEl ? true : false
    const iconId = focusInput ? "searchO" : "addInterest"
    const color = focusInput ? "TEXT_DARK_GREY" : "BACKGROUND"
    const props = {
      ...inputProps,
      focusInput,
      iconConfig: { iconId, className: "icon", color },
    }
    return <TextInput {...props} refCallback={inputProps.ref} ref={null} />
  }

  scrollUp() {
    if (this.containerEl) {
      this.containerEl.scrollTop = this.containerEl.scrollHeight
    }
  }

  createInputRef(node) {
    if (node) {
      this.inputEl = node.input
    }
  }

  renderSuggestionsContainer(localProps) {
    const {
      containerProps: { ref, ...restContainerProps },
      children,
    } = localProps
    const callRef = (container) => {
      if (container) {
        ref(container)
        this.containerEl = container
      }
    }

    return (
      <div ref={callRef} {...restContainerProps}>
        {children}
      </div>
    )
  }

  render() {
    const {
      inputProps,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      onSuggestionSelected,
      highlightFirstSuggestion,
      suggestions,
      interests,
      value,
      onChange,
      onClick,
      isMobileOrTabletView,
    } = this.props
    const mergedInputProps = {
      ...inputProps,
      onChange,
      onClick,
      value,
    }
    const focusInput = document.activeElement === this.inputEl ? true : false

    return (
      <>
        <StyledWrapper focusInput={focusInput} data-tip data-for="addInterests">
          <Autosuggest
            inputProps={mergedInputProps}
            renderInputComponent={this.renderInputComponent}
            suggestions={suggestions}
            renderSuggestion={(props) => renderSuggestion(interests, props)}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            highlightFirstSuggestion={highlightFirstSuggestion}
            getSuggestionValue={getSuggestionValue}
            shouldRenderSuggestions={() => true}
            focusInputOnSuggestionClick={!isMobileOrTabletView}
            ref={this.createInputRef}
          />
        </StyledWrapper>
        {!focusInput && (
          <Tooltip
            id="addInterests"
            title={toolTip}
            offset={{ top: 10, left: -20 }}
            place="bottom"
          />
        )}
      </>
    )
  }
}

AutosuggestInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSuggestionsFetchRequested: PropTypes.func.isRequired,
  onSuggestionsClearRequested: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(InterestShape),
  interests: PropTypes.arrayOf(InterestShape),
  inputProps: AutoSuggestInputPropsShape,
  highlightFirstSuggestion: PropTypes.bool,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

AutosuggestInput.defaultProps = {
  highlightFirstSuggestion: true,
}
export default AutosuggestInput

import { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import debounce from "lodash-es/debounce"
import { AutosuggestInput, InterestShape } from "../../components"
import {
  fetchSuggestions,
  updateSearchValue,
  clearSearchValue,
  focusInterestInput,
} from "../../redux/actions/interests"
import { addOrUpdateInterest } from "../../redux/actions/profile"
import { makeGetMyInterests } from "../../redux/selectors/profile"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import superplaceholder from "superplaceholder"
import {
  makeGetInterestsSearchSuggestions,
  makeGetInterestsSearchValue,
} from "../../redux/selectors/interests"
import { StyledWrapper } from "./Styled"
import { checkIfAlreadyExistInterest } from "../../utils/faye/helpers"

const initialPlaceholder = "Add interests"

class InterestForm extends Component {
  constructor(props) {
    super(props)
    this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClearSearchValue = this.handleClearSearchValue.bind(this)
    this.updatePlaceholder = this.updatePlaceholder.bind(this)
    this.changePlaceHolder = this.changePlaceHolder.bind(this)

    this.fetchSuggestions = debounce(props.fetchSuggestions, 500, {
      leading: true,
    })
    this.state = {
      placeholder: initialPlaceholder,
      interestBtnFocus: false,
    }
  }

  componentDidMount() {
    this.autosuggest.inputEl.addEventListener("focus", this.updatePlaceholder)
    this.autosuggest.inputEl.addEventListener("blur", this.updatePlaceholder)
    this.changePlaceHolder()

    document.addEventListener("mouseup", this.handleClickOutside)
  }

  componentWillUnmount() {
    this.autosuggest.inputEl.removeEventListener(
      "focus",
      this.updatePlaceholder
    )
    this.autosuggest.inputEl.removeEventListener("blur", this.updatePlaceholder)
    document.removeEventListener("mouseup", this.handleClickOutside)
  }

  handleClickOutside(event) {
    const { focusInterestInput } = this.props
    if (
      this.autosuggest.current &&
      !this.autosuggest.current.contains(event.target)
    ) {
      this.setState({
        interestBtnFocus: false,
      })
      focusInterestInput(false)
    }
  }

  updatePlaceholder() {
    const { placeholder } = this.state
    this.setState({
      placeholder:
        placeholder === initialPlaceholder
          ? this.changePlaceHolder()
          : initialPlaceholder,
    })
  }

  changePlaceHolder() {
    return superplaceholder({
      el: document.querySelector("input"),
      sentences: [
        "Add languages",
        "Add hobbies",
        "Add Locations",
        "Add skills",
      ],
      options: {
        letterDelay: 100,
        sentenceDelay: 2000,
        loop: true,
        shuffle: false,
      },
    })
  }

  handleSuggestionSelected(e, { suggestion: { name, type, level = 0 } }) {
    e.preventDefault()
    const { addOrUpdateInterest, interests } = this.props
    const alreadyExist = checkIfAlreadyExistInterest(interests, name)
    const cleanSuggestion = {
      name,
      type,
      level,
      alreadyExist,
    }

    addOrUpdateInterest({ ...cleanSuggestion })
  }

  handleChange(e, { newValue }) {
    const { updateSearchValue, focusInterestInput } = this.props

    updateSearchValue(newValue)
    this.setState({ interestBtnFocus: true })
    focusInterestInput(true)
  }

  // called when a normal form input value has been selected
  handleSubmit(e) {
    e.preventDefault()

    const { addOrUpdateInterest, clearSearchValue, searchValue } = this.props

    clearSearchValue()

    window.pushlogs &&
      console.log("autosuggest.inputEl: ", this.autosuggest.inputEl)

    // this.autosuggest.inputEl.blur();

    if (searchValue) {
      addOrUpdateInterest({
        name: searchValue.trim(),
        type: "general",
        level: 0,
      })
    }
  }

  handleClearSearchValue() {
    const { clearSearchValue } = this.props
    clearSearchValue()
  }

  handleClick() {
    const { focusInterestInput } = this.props
    this.setState({ interestBtnFocus: true })
    focusInterestInput(true)
  }

  render() {
    const { searchValue, searchSuggestions, isMobileOrTabletView, interests } =
      this.props
    const { placeholder, interestBtnFocus } = this.state

    return (
      <>
        <StyledWrapper>
          <form onSubmit={this.handleSubmit}>
            <AutosuggestInput
              inputProps={{
                placeholder,
                name: "query",
              }}
              onChange={this.handleChange}
              interests={interests}
              suggestions={searchSuggestions}
              onSuggestionsFetchRequested={this.fetchSuggestions}
              onSuggestionsClearRequested={this.handleClearSearchValue}
              onSuggestionSelected={this.handleSuggestionSelected}
              highlightFirstSuggestion={searchValue !== ""}
              value={searchValue}
              isMobileOrTabletView={isMobileOrTabletView}
              ref={(node) => {
                this.autosuggest = node
              }}
            />
          </form>
        </StyledWrapper>
      </>
    )
  }
}

InterestForm.propTypes = {
  interests: PropTypes.arrayOf(InterestShape),
  fetchSuggestions: PropTypes.func.isRequired,
  updateSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  addOrUpdateInterest: PropTypes.func.isRequired,
  clearSearchValue: PropTypes.func.isRequired,
  searchSuggestions: PropTypes.arrayOf(InterestShape),
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

InterestForm.defaultProps = {
  searchSuggestions: [],
}

const mapActionsToProps = {
  fetchSuggestions,
  addOrUpdateInterest,
  updateSearchValue,
  clearSearchValue,
  focusInterestInput,
}

const mapStateToProps = () => {
  const getMyInterests = makeGetMyInterests()
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  const getInterestsSearchSuggestions = makeGetInterestsSearchSuggestions()
  const getInterestsSearchValue = makeGetInterestsSearchValue()
  return (state, props) => ({
    ...props,
    interests: getMyInterests(state),
    isMobileOrTabletView: getIsMobileOrTabletView(state),
    searchSuggestions: getInterestsSearchSuggestions(state),
    searchValue: getInterestsSearchValue(state),
  })
}

export default connect(mapStateToProps, mapActionsToProps)(InterestForm)

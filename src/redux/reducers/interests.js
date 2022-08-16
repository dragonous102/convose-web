import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  searchValue: "",
  searchSuggestions: [],
  cachedSuggestions: [],
  triggerInterestFocus: false,
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_INTERESTS:
      return initialState

    case ACTION_TYPES.CHANGE_INTERESTS_SUGGESTIONS: {
      const { autocomplete } = action.payload

      const searchSuggestions = autocomplete.map((suggestion) => ({
        level: 0,
        ...suggestion,
      }))

      return {
        ...state,
        searchSuggestions,
        cachedSuggestions: searchSuggestions,
        loading: false,
      }
    }

    case ACTION_TYPES.CLEAR_INTERESTS_SEARCH_VALUE:
      return {
        ...state,
        searchValue: "",
        searchSuggestions: state.cachedSuggestions || [],
      }

    case ACTION_TYPES.UPDATE_INTERESTS_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.payload,
      }
    }
    case ACTION_TYPES.INTERESTS_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case ACTION_TYPES.FOCUS_INTEREST_INPUT: {
      return {
        ...state,
        triggerInterestFocus: action.payload,
      }
    }

    default:
      return state
  }
}

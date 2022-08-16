import ACTION_TYPES from "./actionTypes"
import * as Api from "../../api"

const changeSuggestions = (suggestions) => ({
  type: ACTION_TYPES.CHANGE_INTERESTS_SUGGESTIONS,
  payload: suggestions,
})
const interestsLoading = () => ({
  type: ACTION_TYPES.INTERESTS_LOADING,
})

export const clearSearchValue = () => ({
  type: ACTION_TYPES.CLEAR_INTERESTS_SEARCH_VALUE,
})

export const updateSearchValue = (payload) => ({
  type: ACTION_TYPES.UPDATE_INTERESTS_SEARCH_VALUE,
  payload,
})

export const fetchSuggestions =
  ({ value = "" }) =>
  (dispatch, getState) => {
    window.pushlogs && console.log("fetchSuggestions value:", { value })
    const { interests } = getState()
    dispatch(interestsLoading())
    Api.fetchSuggestions({ q: value, limit: 6, prevRequest: interests.loading })
      .then((suggestions) => {
        window.pushlogs && console.log("suggestions received", suggestions)

        dispatch(changeSuggestions(suggestions))
      })
      .catch((error) => {
        //dispatch(showErrorBar(error.toString()))
        console.log("error:", error)
      })
  }

export const focusInterestInput = (payload) => ({
  type: ACTION_TYPES.FOCUS_INTEREST_INPUT,
  payload,
})

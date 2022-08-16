import { createSelector } from "reselect"

const getInterestsSearchValue = (state) => state.interests.searchValue

export const makeGetInterestsSearchValue = () =>
  createSelector(getInterestsSearchValue, (searchValue) => searchValue)

const getInterestsSearchSuggestions = (state) =>
  state.interests.searchSuggestions

export const makeGetInterestsSearchSuggestions = () =>
  createSelector(getInterestsSearchSuggestions, (suggestions) => suggestions)

export const getInterestFocus = createSelector(
  (state) => state.interests.triggerInterestFocus,
  (triggerInterestFocus) => triggerInterestFocus
)

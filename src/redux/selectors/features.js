import { createSelector } from "reselect"

const getFeature = (state, feature) => {
  return state.features[feature] || false
}

export const makeGetFeature = () =>
  createSelector(getFeature, (featureEnabled) => featureEnabled)

export const getFeatures = createSelector(
  (state) => state.features,
  (features) => features
)

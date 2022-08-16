import { createSelector } from "reselect"

export const getDisplayStorageConsent = createSelector(
  (state) => !state.storage.consentAccepted,
  (displayStorageConsent) => displayStorageConsent
)

export const getOptionalStorageDisabled = createSelector(
  (state) => state.storage.disableOptionalStorage,
  (optionalStorageDisabled) => optionalStorageDisabled
)

import { createSelector } from "reselect"

export const getBrowserIsActive = createSelector(
  (state) => state.browser.isActive,
  (isActive) => isActive
)
export const getBrowserIsOnline = createSelector(
  (state) => state.browser.isOnline,
  (isOnline) => isOnline
)
export const getBrowserIsAnimate = createSelector(
  (state) => state.browser.animate,
  (animate) => animate
)

export const getBrowserIsInactive = createSelector(
  (state) => !state.browser.isActive,
  (isInactive) => isInactive
)

export const getIsIOS = createSelector(
  (state) => state.browser.isIOS,
  (isIOS) => isIOS
)

export const getIsAndroid = createSelector(
  (state) => state.browser.isAndroid,
  (isAndroid) => isAndroid
)

export const getIsSafari = createSelector(
  (state) => state.browser.isSafari,
  (isSafari) => isSafari
)

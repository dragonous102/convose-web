import { createSelector } from "reselect"

const getIsMobileView = (state) => {
  const isMobileView = state.viewport.lessThan.medium
  return isMobileView
}

export const makeGetIsMobileView = () =>
  createSelector(getIsMobileView, (isMobileView) => isMobileView)

const getIsMobileOrTabletView = (state) => {
  const isMobileView = state.viewport.lessThan.large
  return isMobileView
}

export const makeGetIsMobileOrTabletView = () =>
  createSelector(
    getIsMobileOrTabletView,
    (isMobileOrTabletView) => isMobileOrTabletView
  )

const getViewportHeight = (state) => {
  const viewportHeight = state.viewport.height
  return viewportHeight
}

export const makeGetViewportHeight = () =>
  createSelector(getViewportHeight, (viewportHeight) => viewportHeight)

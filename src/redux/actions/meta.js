import ACTION_TYPES from "./actionTypes"

export const incrementFavicon = () => ({
  type: ACTION_TYPES.FAVICON_INCREMENT,
  meta: {
    favicon: "increment",
  },
})

export const resetFavicon = () => ({
  type: ACTION_TYPES.FAVICON_RESET,
  meta: {
    favicon: 0,
  },
})

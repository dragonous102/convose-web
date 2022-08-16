import ACTION_TYPES from "./actionTypes"

export const initBrowser = () => ({
  type: ACTION_TYPES.INIT_BROWSER,
})

export const browserUASniffing = (payload) => ({
  type: ACTION_TYPES.BROWSER_UA_SNIFFING,
  payload,
})

export const browserIsOnline = () => ({
  type: ACTION_TYPES.BROWSER_IS_ONLINE,
})

export const browserIsOffline = () => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.BROWSER_IS_OFFLINE,
  })
  setTimeout(() => {
    dispatch({
      type: ACTION_TYPES.BROWSER_IS_OFFLINE_ANIMATE_OFF,
    })
  }, 1000)
}

export const browserIsActive = () => ({
  type: ACTION_TYPES.BROWSER_IS_ACTIVE,
})

export const browserIsInactive = () => ({
  type: ACTION_TYPES.BROWSER_IS_INACTIVE,
})

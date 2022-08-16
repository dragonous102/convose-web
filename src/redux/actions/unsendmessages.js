import ACTION_TYPES from "./actionTypes"

export const storeUnsendMessage = (payload) => ({
  type: ACTION_TYPES.STORE_UNSEND_MESSAGE,
  payload,
})
export const removeUnsendMessage = (payload) => ({
  type: ACTION_TYPES.REMOVE_UNSEND_MESSAGE,
  payload,
})

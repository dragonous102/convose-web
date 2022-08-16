import ACTION_TYPES from "../actions/actionTypes"

const initialState = {
  messages: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.STORE_UNSEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, ...[action.payload]],
      }
    case ACTION_TYPES.REMOVE_UNSEND_MESSAGE: {
      const { uuid } = action.payload
      const messages = state.messages.filter((message) => message.uuid !== uuid)
      return {
        messages,
      }
    }

    default:
      return state
  }
}

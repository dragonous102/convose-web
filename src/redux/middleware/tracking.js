import ACTION_TYPES from "../actions/actionTypes"

export default ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action)

    switch (action.type) {
      case ACTION_TYPES.OPEN_CHAT:
        window.dataLayer.push({ event: "openChat" })
        break

      case ACTION_TYPES.SEND_MESSAGE:
        window.dataLayer.push({ event: "sendMessage" })
        break
      case ACTION_TYPES.MODAL_INBOX_TOGGLE:
      case ACTION_TYPES.MODAL_INBOX_OPEN:
        if (getState().modals.displayInbox) {
          window.dataLayer.push({ event: "openInbox" })
        }
        window.dataLayer.push({ event: "openInbox" })
        break

      default:
    }

    return result
  }

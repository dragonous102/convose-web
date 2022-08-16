import Cable from "actioncable"
import { WS_ACTIONCABLE } from "./endpoints"

export default class ActionCable {
  connect({ token }) {
    window.pushlogs && console.log(`connecting websocket with token: ${token}`)
    this.consumer = Cable.createConsumer(
      `${WS_ACTIONCABLE}${token ? `?token=${token}` : ""}`
    )
  }

  getConsumer(options) {
    if (!this.consumer) {
      this.connect(options)
    }
    return this.consumer
  }

  closeConnection() {
    if (this.consumer) {
      this.consumer.disconnect()
    }
    delete this.consumer
  }
}

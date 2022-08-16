import { PureComponent } from "react"
import { match as matchShape } from "react-router-prop-types"
import { ChatboxMobile, GroupChatboxMobile } from "../containers"

class ChatRoute extends PureComponent {
  render() {
    const { match } = this.props
    const {
      params: { chatId },
    } = match
    const isGroup = chatId.indexOf("-") === -1
    if (isGroup) {
      return <GroupChatboxMobile chatId={chatId} />
    } else {
      return <ChatboxMobile chatId={chatId} />
    }
  }
}

ChatRoute.propTypes = {
  match: matchShape.isRequired,
}

export default ChatRoute

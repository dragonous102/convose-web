import { PureComponent } from "react"
import { match as matchShape } from "react-router-prop-types"
import { GroupCall } from "../containers"

class GroupChatboxRoute extends PureComponent {
  render() {
    const { match } = this.props
    const {
      params: { chatId, start },
    } = match

    return <GroupCall start={start} chatId={chatId} />
  }
}

GroupChatboxRoute.propTypes = {
  match: matchShape.isRequired,
}

export default GroupChatboxRoute

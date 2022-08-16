import { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { InterestShape } from "../../utils/shapes"

import { StyledWrapper } from "./Styled"
import Interests from "./Interests"
import Chat from "./Chat"
import { useDispatch, useSelector } from "react-redux"
import { makeGetMessagesByChatId } from "../../redux/selectors/chats"
import { fetchMessages } from "../../redux/actions/chats"
import usePrevious from "../../hooks/usePrevious"
import { useCallback } from "react"
const getMessagesByChatId = makeGetMessagesByChatId()
const ChatContent = (props) => {
  const {
    showProfile,
    chatscrolled,
    updateScroll,
    sharedInterests,
    enableAutoScrollOnImageLoad,
    chatId,
    interests,
  } = props
  const prevShowProfile = usePrevious(showProfile)
  const [showProfileToggled, setShowProfileToggled] = useState(false)
  useEffect(() => {
    if (!showProfile) return
    setShowProfileToggled(true)
  }, [showProfile])
  const makefalse = useCallback(() => {
    setShowProfileToggled(false)
  }, [])
  const messages = useSelector((state) => getMessagesByChatId(state, props))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMessages({ chatId }))
  }, [])

  return (
    <StyledWrapper clickable={showProfile}>
      {showProfile ? (
        <Interests interests={interests} />
      ) : (
        <Chat
          updateScroll={updateScroll}
          chatscrolled={chatscrolled}
          prevShowProfile={prevShowProfile}
          showProfile={showProfile}
          makefalse={makefalse}
          showProfileToggled={showProfileToggled}
          chatId={chatId}
          messages={messages}
          sharedInterests={sharedInterests}
          enableAutoScrollOnImageLoad={enableAutoScrollOnImageLoad}
        />
      )}
    </StyledWrapper>
  )
}

ChatContent.propTypes = {
  chatId: PropTypes.string.isRequired,
  interests: PropTypes.arrayOf(InterestShape).isRequired,
  sharedInterests: PropTypes.arrayOf(InterestShape).isRequired,
  showProfile: PropTypes.bool.isRequired,
  updateScroll: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onSendImage: PropTypes.func.isRequired,
  onSendAudio: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
  browserIsOffline: PropTypes.func.isRequired,
  historyIsLoaded: PropTypes.bool.isRequired,
  historyLoadingText: PropTypes.string.isRequired,
  unreadMessagesText: PropTypes.string.isRequired,
  enableImage: PropTypes.bool.isRequired,
  enableAudio: PropTypes.bool.isRequired,
  enableAutoScrollOnImageLoad: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

export default ChatContent

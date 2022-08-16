import { useState, Fragment, useEffect } from "react"
import Scrollbars from "react-custom-scrollbars"
import { useDispatch } from "react-redux"
import { fetchMessages } from "../../redux/actions/chats"
import ChatInterestList from "../ChatInterestList"
import ChatMessageForm from "../ChatMessageForm"
import ChatMessageList from "../ChatMessageList"
import Icon from "../Icon"
import VisibilityTrigger from "../VisibilityTrigger"
import PropTypes from "prop-types"
import {
  StyledButton,
  StyledButtonWrapper,
  StyledInterestTitle,
  StyledLoadingText,
  StyledSpan,
} from "./Styled"
import { LOADING_HISTORY, NEW_UNREAD_MESSAGES } from "../../redux/constants"
import { useSelector } from "react-redux"
import { makeGetHistoryIsLoaded } from "../../redux/selectors/chats"
import { useRef } from "react"

const historyLoadingText = LOADING_HISTORY
const getHistoryIsLoaded = makeGetHistoryIsLoaded()

const initialState = {
  isLoadingAdditionalHistory: false,
  initialized: false,
  isRead: false,
  scrollValue: 0,
  scrollHeight: 0,
}
const Chat = (props) => {
  let listEl = useRef(null)
  const [lastMessageId, setLastMessageId] = useState(null)
  const historyIsLoaded = useSelector((state) =>
    getHistoryIsLoaded(state, props)
  )

  const {
    chatId,
    sharedInterests,
    updateScroll,
    chatscrolled,
    messages,
    enableAutoScrollOnImageLoad,
    showProfileToggled,
    makefalse,
  } = props
  const dispatch = useDispatch()
  const [state, setState] = useState({ ...initialState })
  const {
    isLoadingAdditionalHistory,
    initialized,
    isRead,
    scrollValue,
    scrollHeight,
  } = state
  const messageCount = messages.length

  useEffect(() => {
    const scrolled = scrollValue - listEl?.current?.getScrollTop()
    if (!isLoadingAdditionalHistory) {
      if (
        messageCount > 0 &&
        !messages[messageCount - 1].mine &&
        scrolled > 200
      ) {
        setState({ ...state, isRead: true })
      } else if (chatscrolled != null && showProfileToggled) {
        scrollDown(chatscrolled)
        makefalse()
      } else {
        scrollDown()
      }
      if (!initialized) {
        // eslint-disable-next-line react/no-did-update-set-state
        setState({ ...state, initialized: true })
      }
    } else {
      const diff = listEl?.current?.getScrollHeight() - scrollHeight
      if (
        messageCount > 0 &&
        !messages[messageCount - 1].mine &&
        scrolled > 100 &&
        messages[messageCount - 1].uuid != lastMessageId
      ) {
        setState({ ...state, isRead: true })
      } else if (
        messages[messageCount - 1].mine &&
        messages[messageCount - 1].uuid != lastMessageId
      ) {
        scrollDown()
        setState({ ...state, isLoadingAdditionalHistory: false })
      } else {
        if (scrollHeight != 0) {
          scrollDown(diff)
          setState({ ...state, isLoadingAdditionalHistory: false })
        } else {
          scrollDown()
        }
      }
    }
    setLastMessageId(messages[messageCount - 1]?.uuid)
  }, [messageCount, listEl])

  useEffect(() => {
    return () => {
      setState({ ...initialState })
    }
  }, [])
  useEffect(() => {
    const scrollPositionBottom =
      listEl?.current?.getScrollHeight() - listEl?.current?.getScrollTop() < 400
    if (!isLoadingAdditionalHistory && scrollPositionBottom) {
      scrollDown()
    }
  }, [isLoadingAdditionalHistory])

  const handleVisibilityTrigger = () => {
    setState({
      ...state,
      isLoadingAdditionalHistory: true,
      scrollHeight: listEl?.current?.getScrollHeight(),
    })
    dispatch(fetchMessages({ chatId }))
  }

  const handleScroll = () => {
    // we only need the scroll for chatbox,
    //for profile when we open it always scroll to the top
    updateScroll(listEl?.current?.getScrollTop())
    if (listEl?.current?.getScrollTop() >= scrollValue) {
      setState({
        ...state,
        isRead: false,
        scrollValue: listEl?.current?.getScrollTop(),
      })
    }
  }

  const scrollDown = (val) => {
    //we run scrollDown when the image load,
    // so we controll if the user scrolled to read the history here

    if (val == "image") {
      const scrolled = scrollValue - listEl?.current?.getScrollTop()
      //if we are not in the first page we don't scroll, message lenght will be greater
      if (scrolled > 120 || messageCount > 30) return false
    }

    if (val != undefined && !isNaN(val)) {
      listEl?.current?.scrollTop(val)
    } else {
      listEl?.current?.scrollToBottom()
      //run this again,because it does miss the first message
      setTimeout(() => {
        listEl?.current?.scrollToBottom()
      }, 1000)
      handleScroll()
      setState({ ...state, isRead: false })
    }
  }

  return (
    <Fragment>
      <Scrollbars
        ref={listEl}
        renderTrackHorizontal={(props) => (
          <div
            {...props}
            className="track-horizontal"
            style={{ display: "none", overflowX: "hidden" }}
          />
        )}
        onScroll={handleScroll}
      >
        {historyIsLoaded && sharedInterests && sharedInterests.length > 0 && (
          <>
            <StyledInterestTitle>Common interests:</StyledInterestTitle>
            <ChatInterestList
              showAll={true}
              interests={sharedInterests}
              topPadding={20}
              textAlign="center"
            />
          </>
        )}

        {!historyIsLoaded && initialized && (
          <VisibilityTrigger visibilityHandler={handleVisibilityTrigger}>
            <StyledLoadingText>{historyLoadingText}</StyledLoadingText>
          </VisibilityTrigger>
        )}
        <ChatMessageList
          messages={messages}
          chatId={chatId}
          {...(enableAutoScrollOnImageLoad && {
            onChange: () => scrollDown("image"),
          })}
        />
      </Scrollbars>

      {isRead && (
        <StyledButton onClick={scrollDown}>
          <StyledButtonWrapper>
            <Icon iconId="unreadMessageArrow" className="icon" />
            <StyledSpan>{NEW_UNREAD_MESSAGES}</StyledSpan>
          </StyledButtonWrapper>
        </StyledButton>
      )}

      <ChatMessageForm chatId={chatId} isInGroup={false} />
    </Fragment>
  )
}

Chat.propTypes = {
  chatId: PropTypes.string.isRequired,
}
export default Chat

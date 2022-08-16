import { Fragment, PureComponent } from "react"
import PropTypes from "prop-types"
import { Scrollbars } from "react-custom-scrollbars"
import { MessageShape, UserShape } from "../../../utils/shapes"
import GroupChatMessageList from "../GroupChatMessageList"
import ChatMessageForm from "../../ChatMessageForm"
import {
  StyledLoadingText,
  StyledWrapper,
  StyledButtonWrapper,
  StyledButton,
  StyledSpan,
} from "./Styled"
import VisibilityTrigger from "../../VisibilityTrigger"
import GroupChatUserList from "../GroupChatUserList"
import Icon from "../../Icon"

class GroupChatContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingAdditionalHistory: false,
      initialized: false,
      isRead: false,
      scrollValue: 0,
      scrollHeight: 0,
      lastMessageId: null,
    }
    this.handleVisibilityTrigger = this.handleVisibilityTrigger.bind(this)
    this.scrollDown = this.scrollDown.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const { messages } = this.props
    const { initialized } = this.state
    this.scrollDown()
    if (messages.length > 1) {
      if (!initialized) {
        this.setState({ initialized: true })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { messages, showProfile, chatScrolled } = this.props
    const { initialized, isLoadingAdditionalHistory } = this.state
    const messageCount = messages.length
    if (
      prevProps.messages.length !== messages.length ||
      (!showProfile && prevProps.showProfile)
    ) {
      const scrolled = this.state.scrollValue - this.listEl.getScrollTop()

      if (!isLoadingAdditionalHistory) {
        if (
          !messages[messages.length - 1].mine &&
          showProfile == prevProps.showProfile &&
          scrolled > 100
        ) {
          this.setState({
            isRead: true,
          })
        } else if (!showProfile && prevProps.showProfile) {
          this.scrollDown(chatScrolled)
        } else {
          this.scrollDown()
        }
        if (!initialized) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ initialized: true })
        }
      } else {
        // eslint-disable-next-line react/no-did-update-set-state

        const diff = this.listEl.getScrollHeight() - this.state.scrollHeight
        if (
          messageCount > 0 &&
          !messages[messageCount - 1].mine &&
          scrolled > 100 &&
          messages[messageCount - 1].uuid != this.state.lastMessageId
        ) {
          this.setState({
            isRead: true,
          })
        } else {
          if (
            this.state.scrollHeight != 0 &&
            messages[messageCount - 1].uuid == this.state.lastMessageId
          ) {
            this.setState({ isLoadingAdditionalHistory: false }, () => {
              if (
                prevProps.messages.length + 1 == messages.length &&
                messages[messageCount - 1].mine
              ) {
                this.scrollDown()
              } else {
                this.scrollDown(diff)
              }
            })
          } else {
            this.setState({ isLoadingAdditionalHistory: false }, () =>
              this.scrollDown()
            )
          }
        }
      }
    }

    if (showProfile && !prevProps.showProfile) {
      this.scrollUp()
    }
    this.setState({ lastMessageId: messages[messageCount - 1]?.uuid })
  }

  handleVisibilityTrigger() {
    const { fetchMessages } = this.props
    this.setState({
      isLoadingAdditionalHistory: true,
      scrollHeight: this.listEl.getScrollHeight(),
    })
    fetchMessages()
  }

  handleScroll() {
    const { updateScroll, showProfile } = this.props
    // we only need the scroll for chatbox,
    //for profile when we open it always scroll to the top
    if (!showProfile) {
      updateScroll(this.listEl.getScrollTop())
    }
    if (this.listEl.getScrollTop() >= this.state.scrollValue) {
      this.setState({
        isRead: false,
        scrollValue: this.listEl.getScrollTop(),
      })
    }
  }

  scrollDown(val) {
    const { isLoadingAdditionalHistory } = this.state

    if (!isLoadingAdditionalHistory) {
      //we run scrollDown when the image load,
      // so we controll if the user scrolled to read the history here

      if (val == "image") {
        const { messages } = this.props
        const scrolled = this.state.scrollValue - this.listEl.getScrollTop()
        //if we are not in the first page we don't scroll, message lenght will be greater
        if (scrolled > 120 || messages.length > 29) return false
      }
      // if it has val, we scroll the chatbox where the user were
      if (val && typeof val == "number") {
        this.listEl.scrollTop(val)
      } else {
        this.listEl.scrollToBottom()
        setTimeout(() => {
          this.listEl.scrollToBottom()
        }, 1000)
        this.handleScroll()
        this.setState({ isRead: false })
      }
    }
  }

  scrollUp() {
    this.listEl.scrollToTop()
  }

  renderChat() {
    const {
      group,
      messages,
      onSendMessage,
      onSendImage,
      onSendAudio,
      autoFocus,
      typingTimeout,
      onStartTyping,
      onStopTyping,
      historyIsLoaded,
      historyLoadingText,
      unreadMessagesText,
      enableAudio,
      enableImage,
      enableAutoScrollOnImageLoad,
      isMobileOrTabletView,
      isInGroupCalling,
      myProfile,
      queryMentionPerson,
      chatId,
      browserIsOffline,
      openUserChat,
      fetchUserProfileFromServer,
      profiles,
      fullScreenCall,
    } = this.props
    const { initialized, isRead } = this.state

    return (
      <Fragment>
        <Scrollbars
          ref={(ref) => {
            this.listEl = ref
          }}
          autoHide
          onScroll={this.handleScroll}
        >
          {!historyIsLoaded && initialized && (
            <VisibilityTrigger visibilityHandler={this.handleVisibilityTrigger}>
              <StyledLoadingText>{historyLoadingText}</StyledLoadingText>
            </VisibilityTrigger>
          )}
          <GroupChatMessageList
            participants={group.participants}
            profiles={profiles}
            messages={messages}
            openUserChat={openUserChat}
            fetchUserProfileFromServer={fetchUserProfileFromServer}
            {...(enableAutoScrollOnImageLoad && {
              onChange: () => this.scrollDown("image"),
            })}
            isInGroupCalling={isInGroupCalling}
            myProfile={myProfile}
          />
        </Scrollbars>

        {isRead && (
          <StyledButton onClick={this.scrollDown}>
            <StyledButtonWrapper>
              <Icon iconId="unreadMessageArrow" className="icon" />
              <StyledSpan>{unreadMessagesText}</StyledSpan>
            </StyledButtonWrapper>
          </StyledButton>
        )}

        <ChatMessageForm
          key={chatId}
          fullScreenCall={fullScreenCall}
          onSendMessage={onSendMessage}
          browserIsOffline={browserIsOffline}
          onSendImage={onSendImage}
          onSendAudio={onSendAudio}
          autoFocus={autoFocus}
          group={group}
          typingTimeout={typingTimeout}
          onStartTyping={onStartTyping}
          onStopTyping={onStopTyping}
          enableAudio={enableAudio}
          enableImage={enableImage}
          isMobileOrTabletView={isMobileOrTabletView}
          isInGroupCalling={isInGroupCalling}
          isInGroup={true}
          queryMentionPerson={queryMentionPerson}
          chatId={chatId}
        />
      </Fragment>
    )
  }

  renderParticipants() {
    const {
      group,
      chatId,
      fetchParticipants,
      openUserChat,
      profiles,
      fetchUserProfileFromServer,
      toggleChatParticipant,
    } = this.props

    return (
      <Scrollbars
        ref={(ref) => {
          this.listEl = ref
        }}
        autoHide
      >
        <GroupChatUserList
          openUserChat={openUserChat}
          toggleChatParticipant={toggleChatParticipant}
          fetchUserProfileFromServer={fetchUserProfileFromServer}
          profiles={profiles}
          participants={group.participants}
          historyLoaded={group.historyLoaded}
          loading={group.loading}
          fetchParticipants={fetchParticipants}
          chatId={chatId}
          showAll
          topPadding={30}
        />
      </Scrollbars>
    )
  }

  render() {
    const { showProfile } = this.props
    return (
      <StyledWrapper clickable={showProfile}>
        {showProfile ? this.renderParticipants() : this.renderChat()}
      </StyledWrapper>
    )
  }
}

GroupChatContent.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  group: UserShape.isRequired,
  showProfile: PropTypes.bool.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onSendImage: PropTypes.func.isRequired,
  browserIsOffline: PropTypes.func.isRequired,
  onSendAudio: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  onStartTyping: PropTypes.func.isRequired,
  onStopTyping: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  openUserChat: PropTypes.func.isRequired,
  typingTimeout: PropTypes.number,
  historyIsLoaded: PropTypes.bool.isRequired,
  historyLoadingText: PropTypes.string.isRequired,
  unreadMessagesText: PropTypes.string.isRequired,
  enableImage: PropTypes.bool.isRequired,
  enableAudio: PropTypes.bool.isRequired,
  enableAutoScrollOnImageLoad: PropTypes.bool.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

GroupChatContent.defaultProps = {
  autoFocus: false,
  typingTimeout: 1000,
}

export default GroupChatContent

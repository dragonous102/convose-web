import { useCallback, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import ProfileImage from "../ProfileImage/ProfileImage"
import {
  ProfileImageWrapper,
  StyledButtonGroup,
  StyledButton,
  StyledName,
  StyledStatus,
  Username,
  Wrapper,
  StyledBackToCallButton,
  StyledSettingsButton,
} from "./Styled"
import Icon from "../Icon"
import { DesktopDown, DesktopUp } from "../Responsive"
import { timeIsNotUp } from "../../utils/faye/helpers"
import {
  StyledContentPopup,
  StyledPopup,
  StyledPopupWrapper,
} from "../GroupCardHeader/Styled"
import { ButtonDownload } from "../GroupCardHeader"
import Tooltip from "../Tooltip"
import { useDispatch, useSelector } from "react-redux"
import { blockUser } from "../../redux/actions/users"
import { makeGetIsActive } from "../../redux/selectors/users"
const getIsActive = makeGetIsActive()
const CardHeader = (props) => {
  const ref = useRef(null)
  const [joinCall, setJoinCall] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const {
    themeColor,
    avatar,
    username,
    isTyping,
    showCloseButton,
    onClick,
    withStatus,
    onProfileImageClick,
    isGroup,
    onGroupChatClick,
    startCall,
    isInCallingScreen,
    isOpen,
    isMobileOrTabletView,
    onClose,
    backToCall,
    user,
    chatId,
  } = props

  const dispatch = useDispatch()
  const isPartner = useSelector(
    (state) => state.chats[chatId]?.messages?.length > 0
  )
  const isActive = useSelector((state) => getIsActive(state, props))
  const closeHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  const backToCallHandler = () => {
    backToCall(true)
  }

  const handleClickListener = useCallback(
    (e) => {
      if (ref.current && ref.current.id !== e.target.id) {
        setShowSettings(false)
      }
    },
    {
      /* eslint-disable-line react-hooks/exhaustive-deps */
    }[ref.current]
  )

  const handleShowSettings = () => setShowSettings(!showSettings)

  useEffect(() => {
    document.addEventListener("click", handleClickListener)
    return () => {
      document.removeEventListener("click", handleClickListener)
    }
  }, [handleClickListener])

  const handleBlockUser = (id) => {
    if (id) {
      dispatch(blockUser(id))
    }
  }

  return (
    <Wrapper showCloseButton={showCloseButton}>
      <DesktopDown>
        {showCloseButton && (
          <StyledButton
            blank
            small
            onClick={closeHandler}
            themeColor={themeColor}
          >
            <span>Back</span>
            <Icon iconId="back" width="20px" />
          </StyledButton>
        )}
      </DesktopDown>
      <ProfileImageWrapper
        showCloseButton={showCloseButton}
        onClick={() => {
          // eslint-disable-next-line no-extra-semi
          ;(onProfileImageClick && onProfileImageClick()) ||
            (onClick && onClick())
        }}
        {...(onProfileImageClick && {
          title: "Click here to toggle between Profile and Chat",
        })}
      >
        <ProfileImage
          url={avatar?.url}
          withStatus={withStatus}
          isActive={isActive}
          onClick={onClick}
          isGroup={isGroup}
          size={isMobileOrTabletView ? "35px" : "60px"}
        />
      </ProfileImageWrapper>

      <Username
        onClick={() => {
          // eslint-disable-next-line no-extra-semi
          ;(onProfileImageClick && onProfileImageClick()) ||
            (onClick && onClick())
        }}
        showCloseButton={showCloseButton}
      >
        <StyledName
          showCloseButton={showCloseButton}
          themeColor={themeColor}
          isOpen={isOpen && !isMobileOrTabletView}
        >
          {username}
        </StyledName>
        {showCloseButton && isTyping.typing && timeIsNotUp(isTyping.date) && (
          <StyledStatus color={themeColor}>Typing...</StyledStatus>
        )}
      </Username>

      {showCloseButton && (
        <>
          <DesktopDown>
            <StyledButtonGroup>
              {isInCallingScreen ? (
                <StyledBackToCallButton onClick={backToCallHandler}>
                  <Icon iconId="cardCallWhite" width="22px" />
                  <span>Ongoing call</span>
                </StyledBackToCallButton>
              ) : (
                <StyledButton small onClick={() => setJoinCall(true)}>
                  <Icon iconId="cardCall" width="22px" />
                </StyledButton>
              )}
            </StyledButtonGroup>
          </DesktopDown>

          <DesktopUp>
            <StyledButtonGroup>
              {isInCallingScreen ? (
                <StyledBackToCallButton onClick={backToCallHandler}>
                  <Icon iconId="cardCallWhite" width="22px" />
                  <span>Ongoing call</span>
                </StyledBackToCallButton>
              ) : (
                <>
                  <StyledButton
                    onClick={startCall}
                    data-tip
                    data-for="voiceCall"
                  >
                    <Icon iconId="cardCall" width="22px" />
                  </StyledButton>
                  <Tooltip id="voiceCall" title="Call" />
                </>
              )}
              <StyledButton
                disabled={!isPartner}
                onClick={() => onGroupChatClick()}
                data-tip
                data-for="addFriend"
              >
                <Icon iconId="cardGroupChat" width="22px" />
              </StyledButton>
              <Tooltip id="addFriend" title="Start a group" />
              <StyledButton
                ref={ref}
                onClick={handleShowSettings}
                data-tip
                data-for="settings"
              >
                <Icon iconId="cardOptions" width="22px" />
              </StyledButton>
              <Tooltip id="settings" title="Menu" />
              <StyledButton
                last
                onClick={closeHandler}
                themeColor={themeColor}
                data-tip
                data-for="minimizeChat"
              >
                <span>Close</span>
                <Icon iconId="cardClose" width="22px" />
              </StyledButton>
              <Tooltip id="minimizeChat" title="Minimize" />
            </StyledButtonGroup>
          </DesktopUp>
        </>
      )}
      {joinCall && (
        <StyledPopupWrapper onClick={() => setJoinCall(false)}>
          <StyledPopup>
            <StyledContentPopup>
              That function is currently only available on the Convose app or
              convose.com on computer
            </StyledContentPopup>
            <ButtonDownload />
          </StyledPopup>
        </StyledPopupWrapper>
      )}
      {showSettings && (
        <StyledSettingsButton onClick={() => handleBlockUser(user.uuid)}>
          <Icon iconId="ban" width="22px" />
          <p>Block</p>
        </StyledSettingsButton>
      )}
    </Wrapper>
  )
}

CardHeader.propTypes = {
  avatar: PropTypes.objectOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  isTyping: PropTypes.object,
  themeColor: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  onProfileImageClick: PropTypes.func,
  isGroup: PropTypes.bool,
  onGroupChatClick: PropTypes.func,
  startCall: PropTypes.func,
  isInCallingScreen: PropTypes.bool,
  backToCall: PropTypes.func,
  user: PropTypes.object,
}

CardHeader.defaultProps = {
  isTyping: { typing: false },
  showCloseButton: false,
  themeColor: "#24AF6C",
  onClick: null,
  onProfileImageClick: null,
  isGroup: false,
  onGroupChatClick: null,
}

export default CardHeader

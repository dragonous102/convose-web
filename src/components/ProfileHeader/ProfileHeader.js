import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import ProfileImage from "../ProfileImage/ProfileImage"
import {
  StyledAvatarInput,
  StyledHiddenText,
  StyledUsernameLabel,
  StyledProfileHeaderWrapper,
  StyledUsername,
  StyledAvatarLabel,
  StyledLoadingSpinnerWrapper,
  StyledButton,
  StyledUpdateUsername,
} from "./Styled"
import Icon from "../Icon"
import Tooltip from "../Tooltip"

class ProfileHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.usernameRef = React.createRef() // Ref for username input
    this.handleClickOutside = this.handleClickOutside.bind(this) // Handling click outside of username input
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleAvatarChange = this.handleAvatarChange.bind(this)
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleEditUsernameClick = this.handleEditUsernameClick.bind(this)
    this.state = {
      avatarIsUploading: false,
      avatarUrl: props.avatarUrl,
      usernameHasChanged: false,
      usernameValue: props.username,
      updatingUsername: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { username } = this.props
    if (username !== prevProps.username) {
      this.updateUsername(username)
    }

    document.addEventListener("mouseup", this.handleClickOutside)
  }

  // Making sure to unmount the mouseup event listener to prevent the errors.
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutside)
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.avatarUrl !== state.avatarUrl) {
      return {
        avatarUrl: props.avatarUrl,
        avatarIsUploading: false,
        usernameHasChanged: state.usernameHasChanged,
        usernameValue: state.usernameValue,
      }
    }

    // No state update necessary
    return null
  }

  // Function to update the updatingUsername state to false when the user clicks outside of the usernameRef
  handleClickOutside(event) {
    if (
      this.usernameRef.current &&
      !this.usernameRef.current.contains(event.target)
    ) {
      this.setState({
        updatingUsername: false,
      })
    }
  }

  updateUsername(name) {
    this.setState({
      usernameValue: name,
      usernameHasChanged: true,
      updatingUsername: true,
    })
  }

  handleUsernameChange(e) {
    this.updateUsername(e.target.value)
  }

  handleAvatarChange(e) {
    const { onAvatarChange } = this.props
    if (e.target.files && e.target.files.length > 0) {
      onAvatarChange(e.target.files[0])
    }
    this.setState({
      avatarIsUploading: true,
    })
  }

  handleKeyDown(e) {
    const { usernameHasChanged } = this.state
    if (e.keyCode === 13 && usernameHasChanged) {
      // 13 is "Enter" key code
      e.target.blur()
      this.setState({
        updatingUsername: false,
      })
    }
  }

  handleUsernameBlur() {
    const { onUsernameChange } = this.props
    const { usernameHasChanged, usernameValue } = this.state
    if (usernameHasChanged) {
      onUsernameChange(usernameValue)
    }
  }

  handleEditUsernameClick() {
    this.setState({
      updatingUsername: true,
    })
  }

  render() {
    const { themeColor, avatarText, usernameText, acceptedAvatarFileTypes } =
      this.props

    const { usernameValue, updatingUsername, avatarIsUploading, avatarUrl } =
      this.state

    return (
      <StyledProfileHeaderWrapper>
        <StyledAvatarLabel data-tip data-for="profile">
          <StyledAvatarInput
            type="file"
            accept={acceptedAvatarFileTypes}
            onChange={this.handleAvatarChange}
          />

          {avatarIsUploading ? (
            <StyledLoadingSpinnerWrapper>
              <Icon iconId="spinner" width="38px" />
            </StyledLoadingSpinnerWrapper>
          ) : (
            <ProfileImage url={avatarUrl} size="60px" />
          )}
        </StyledAvatarLabel>
        <Tooltip id="profile" title={avatarText} />
        <StyledUsernameLabel>
          <StyledHiddenText>{usernameText}</StyledHiddenText>
          <StyledUsername
            themeColor={themeColor}
            title={usernameText}
            value={usernameValue}
            onBlur={this.handleUsernameBlur}
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyDown}
            ref={this.usernameRef}
            maxLength={12}
          />

          <StyledUpdateUsername updatingUsername={updatingUsername}>
            Press enter to save.
          </StyledUpdateUsername>
        </StyledUsernameLabel>

        {!updatingUsername && (
          <StyledButton onClick={this.handleEditUsernameClick}>
            <Icon iconId="edit" width="16px" />
          </StyledButton>
        )}
      </StyledProfileHeaderWrapper>
    )
  }
}

ProfileHeader.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  avatarText: PropTypes.string.isRequired,
  usernameText: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
  acceptedAvatarFileTypes: PropTypes.string.isRequired,
}

export default ProfileHeader

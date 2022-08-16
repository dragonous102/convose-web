import { PureComponent } from "react"
import PropTypes from "prop-types"
import Icon from "../Icon"
import { StyledButton, StyledPlayer, StyledSeek, StyledTime } from "./Styled"
import { timeFormaterFromSecs } from "../../utils/timeUtils"

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props)

    this.handleLoaded = this.handleLoaded.bind(this)
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleSeek = this.handleSeek.bind(this)
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.handleEnded = this.handleEnded.bind(this)

    this.state = {
      isLoaded: false,
      isPlaying: false,
      duration: 0,
      // eslint-disable-next-line react/no-unused-state
      currentTime: 0,
    }
  }

  async handleLoaded() {
    // https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
    while (this.audio.duration === Infinity) {
      await new Promise((r) => setTimeout(r, 100))
      this.audio.currentTime = 10000000 * Math.random()
    }
    const { duration } = this.audio
    this.audio.currentTime = 0
    this.setState({
      isLoaded: true,
      duration,
    })
  }

  async handlePlayButtonClick() {
    if (this.audio) {
      const { isPlaying } = this.state
      if (isPlaying) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      window.pushlogs && console.log("Error: this.audio is:", this.audio)
    }
  }

  handlePlay() {
    this.setState({
      isPlaying: true,
      duration: this.audio.duration,
    })
  }

  handlePause() {
    this.setState({
      isPlaying: false,
    })
  }

  handleSeek() {
    const { duration } = this.state
    this.audio.pause()
    this.audio.currentTime = (this.seek.value / 100) * duration
    this.audio.play()
  }

  handleTimeUpdate() {
    const { currentTime } = this.audio
    this.setState({ currentTime })
  }

  handleEnded() {
    this.setState({ currentTime: 0 })
  }

  render() {
    const { mine, src } = this.props
    const { currentTime, duration, isPlaying } = this.state
    const seekValue = duration ? Math.round((currentTime / duration) * 100) : 0
    return (
      <StyledPlayer>
        <StyledButton
          onClick={this.handlePlayButtonClick}
          mine={mine}
          disabled={!this.state.isLoaded}
        >
          {<Icon iconId={isPlaying ? "pause" : "play"} width="22px" />}
        </StyledButton>
        <StyledSeek
          ref={(ref) => {
            this.seek = ref
          }}
          type="range"
          value={seekValue}
          max="100"
          step="1"
          onChange={this.handleSeek}
          mine={mine}
          disabled={!this.state.isLoaded}
        />

        <audio
          ref={(ref) => {
            this.audio = ref
          }}
          onLoadedData={this.handleLoaded}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleEnded}
        >
          <source src={src} type="audio/webm" preload="auto" />
        </audio>
        <StyledTime mine={mine}>
          {this.audio && timeFormaterFromSecs((currentTime - duration) * -1)}
        </StyledTime>
      </StyledPlayer>
    )
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  mine: PropTypes.bool,
}

AudioPlayer.defaultProps = {
  mine: false,
}

export default AudioPlayer

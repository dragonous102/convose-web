import { useRef, useEffect } from "react"
//import { StyledImage } from "../FullScreenGroupCall/VideoScreen/styled"
//import { quickUuid } from "../../utils/faye/helpers"
import { StyledVideoContainer } from "./Styled"

const MediaPlayer = (props) => {
  const container = useRef(null)
  const { local } = props
  useEffect(() => {
    let video = props.videoTrack
    if (!video) return

    if (!container.current) return
    video && video.play(container.current)
    return () => {
      video && video.stop()
    }
  }, [container, props.videoTrack])
  useEffect(() => {
    props.audioTrack && props.audioTrack.play()
    return () => {
      props.audioTrack && props.audioTrack.stop()
    }
  }, [props.audioTrack])
  return (
    <StyledVideoContainer
      ref={container}
      local={local ? local : undefined}
    ></StyledVideoContainer>
  )
}

export default MediaPlayer

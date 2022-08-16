import { useRef, useEffect } from "react"
import { StyledImage } from "../FullScreenGroupCall/VideoScreen/styled"
//import { quickUuid } from "../../utils/faye/helpers"
import { StyledVideoContainer } from "./Styled"

const MediaPlayerActive = (props) => {
  const container = useRef(null)
  const { local } = props
  useEffect(() => {
    let video = props.videoTrack
    if (!video) return
    // if (video._ID.search("bigvideo") != -1) {
    //   video._ID = quickUuid()
    // }

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
    <>
      {(props.videoTrack && !props.local) ||
      (props.isVideoEnabled && props.videoTrack) ? (
        <StyledVideoContainer
          ref={container}
          local={undefined}
        ></StyledVideoContainer>
      ) : (
        <StyledImage src="https://res.cloudinary.com/hj0txfloi/image/upload/v1655879679/qpgn5undf2ft90tncifk.png" />
      )}
    </>
  )
}

export default MediaPlayerActive

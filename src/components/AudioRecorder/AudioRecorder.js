import { useEffect, useCallback, useRef, useState } from "react"
import useTimer from "./useTimer"
import Icon from "../Icon"
import {
  StyledAudioRecorder,
  StyledButton,
  StyledCloseIcon,
  StyledInfo,
  StyledPulse,
  StyledTimeContainer,
  StyledTime,
  StyledTimeSub,
} from "./Styled"
import {
  formatToMinuteAndSecondDisplay,
  formatTrailingMilliseconds,
} from "./timeRender"

let mediaRecorder, MIME_TYPE
if (window.MediaRecorder) {
  MIME_TYPE = "audio/ogg"
  if (!MediaRecorder.isTypeSupported(MIME_TYPE)) {
    MIME_TYPE = "audio/webm"
  }
} else {
  console.log("Browser does not support MediaRecorder API")
}
const options = { mimeType: MIME_TYPE }
const constraints = { audio: true, video: false }

const AudioRecorder = ({ onSubmitRecording, onCancelRecording }) => {
  const [shouldSend, setShouldSend] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const shouldSendRef = useRef(shouldSend)
  const [
    startTimer,
    stopTimer,
    resetTimer,
    elapsedTimeInMs,
    elapsedTimeInMsRef,
  ] = useTimer()

  const containerRef = useRef(null)
  const clickListener = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onCancelRecording()
      }
    },
    [containerRef.current]
  )

  useEffect(() => {
    document.addEventListener("click", clickListener)
    resetTimer()
    handleRequestRecording()
    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [])

  const handleRequestRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      handleStartRecording(stream)
    } catch (err) {
      console.error("UserMedia not available!", err)
      onCancelRecording()
    }
  }

  const handleStartRecording = (stream) => {
    if (MediaRecorder.isTypeSupported(MIME_TYPE)) {
      mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorder.ondataavailable = (e) => {
        if (typeof e.data === "undefined") return
        if (e.data.size === 0) return
        handleAudioData(e.data)
      }
      mediaRecorder.onstop = (e) => {
        stream.getTracks().forEach((track) => track.stop())
      }
      mediaRecorder.onstart = (e) => window.pushlogs && console.log(e)
      mediaRecorder.onerror = (err) => console.error(err)

      mediaRecorder.start()
      setIsRecording(true)
      startTimer()
    } else {
      console.error("MIME_TYPE not supported")
    }
  }

  const handleAudioData = (data) => {
    stopTimer()
    setIsRecording(false)
    if (shouldSendRef.current) {
      const blob = data
      onSubmitRecording(blob, formMetadata())
    } else {
      onCancelRecording()
    }
    resetTimer()
  }

  const formMetadata = () => {
    return {
      length: formatToMinuteAndSecondDisplay(elapsedTimeInMsRef.current),
    }
  }

  const sendRecording = (_shouldSend) => {
    shouldSendRef.current = _shouldSend
    setShouldSend(_shouldSend)
    mediaRecorder && mediaRecorder.stop()
    stopTimer()
  }

  return (
    <StyledAudioRecorder ref={containerRef}>
      <StyledButton bgColor="#FF5555" onClick={() => sendRecording(false)}>
        <StyledCloseIcon />
      </StyledButton>
      <StyledInfo>
        <StyledPulse isRecording={isRecording} />
        <StyledTimeContainer>
          <StyledTime>
            {formatToMinuteAndSecondDisplay(elapsedTimeInMs)}
          </StyledTime>
          <StyledTimeSub>
            {formatTrailingMilliseconds(elapsedTimeInMs)}
          </StyledTimeSub>
        </StyledTimeContainer>
      </StyledInfo>
      <StyledButton bgColor="#19aaeb" onClick={() => sendRecording(true)}>
        <Icon iconId="plane2" width="18px" />
      </StyledButton>
    </StyledAudioRecorder>
  )
}

export default AudioRecorder

import { browserIsOffline } from "../redux/actions/browser"

export const canRecordAudio = () => {
  const hasUserMedia = !!navigator.mediaDevices.getUserMedia
  const hasMediaRecorder = "MediaRecorder" in window
  console.warn(
    "checking browser support for MediaRecorder:",
    hasUserMedia,
    hasMediaRecorder
  )
  return hasUserMedia && hasMediaRecorder
}

export const checkOnline = () => {
  const online = window.navigator.onLine
  if (!online) {
    browserIsOffline()
    return false
  }
  return true
}

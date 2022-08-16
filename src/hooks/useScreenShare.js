import { useState } from "react"
import AgoraRTC from "agora-rtc-sdk-ng"
const screenClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
export default function useScreenShare() {
  const [localVideoScreenTrack, setLocalVideoScreenTrack] = useState(undefined)
  const [isScreenShared, setIsScreenShared] = useState(false)

  async function shareScreen(appid, channel, token, uid) {
    if (!screenClient) return
    if (isScreenShared) {
      if (localVideoScreenTrack) {
        localVideoScreenTrack.stop()
        localVideoScreenTrack.close()
      }

      setLocalVideoScreenTrack(undefined)
      setIsScreenShared(false)
      await screenClient?.leave()
    } else {
      console.log("you start screen sharing")
      const screenTrack = await AgoraRTC.createScreenVideoTrack()
      await screenClient.join(appid, channel, token || null, uid)
      await screenClient.publish(screenTrack)
      setLocalVideoScreenTrack(screenTrack)
      setIsScreenShared(true)
    }
  }

  return {
    localVideoScreenTrack,
    shareScreen,
    isScreenShared,
  }
}

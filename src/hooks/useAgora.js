import { useState, useEffect } from "react"
import AgoraRTC from "agora-rtc-sdk-ng"
import { useDispatch } from "react-redux"
import {
  toggleAudioSuccess,
  toggleVideoSuccess,
} from "../redux/actions/calling"

export default function useAgora(client, history, screenId) {
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined)
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined)
  const [volumes, setVolumes] = useState([])
  const [joinState, setJoinState] = useState(false)
  const [toggeling, setToggeling] = useState(false)
  const dispatch = useDispatch()

  const [remoteUsers, setRemoteUsers] = useState([])

  async function join(appid, channel, token, uid) {
    if (!client) return
    await client.join(appid, channel, token || null, uid)
    window.client = client
    setJoinState(true)
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop()
      localAudioTrack.close()
    }
    if (localVideoTrack) {
      localVideoTrack.stop()
      localVideoTrack.close()
    }
    setRemoteUsers([])
    setJoinState(false)
    await client?.leave()
    history.push(`/`)
  }

  useEffect(() => {
    if (!client) return
    setRemoteUsers(client.remoteUsers)
    const handleUserPublished = async (user, mediaType) => {
      if (user.uid != screenId) {
        await client.subscribe(user, mediaType)
      }

      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    const handleValueIndicator = async (volumesn) => {
      setVolumes(volumesn)
    }
    const handleUserUnpublished = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    const handleUserJoined = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    const handleUserLeft = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    client.on("user-published", handleUserPublished)
    client.on("user-unpublished", handleUserUnpublished)
    client.on("user-joined", handleUserJoined)
    client.on("user-left", handleUserLeft)
    client.enableAudioVolumeIndicator()
    client.on("volume-indicator", handleValueIndicator)
    return () => {
      client.off("user-published", handleUserPublished)
      client.off("user-unpublished", handleUserUnpublished)
      client.off("user-joined", handleUserJoined)
      client.off("user-left", handleUserLeft)
    }
  }, [client])
  const toggleMuteVideo = async (isVideoEnabled) => {
    if (!isVideoEnabled) {
      const disableVideo = await localVideoTrack.setEnabled(false)
      const unpublishVideo = await client.unpublish([localVideoTrack])
      localVideoTrack &&
        Promise.all([disableVideo, unpublishVideo]).then((res) => {
          setLocalVideoTrack(undefined)
          dispatch(toggleVideoSuccess())
        })
    } else {
      let Video = await AgoraRTC.createCameraVideoTrack({
        optimizationMode: "motion",
        encoderConfig: {
          width: 200,
          height: 200,
          frameRate: 15,
          bitrateMin: 100,
          bitrateMax: 260,
        },
      })
      const publishVideo = await client.publish([Video])
      Promise.all([Video, publishVideo]).then((res) => {
        setLocalVideoTrack(Video)
        dispatch(toggleVideoSuccess())
      })
    }
  }
  const toggleMuteAudio = async (isMuted) => {
    if (isMuted) {
      const disableAudio = await localAudioTrack.setEnabled(false)
      const unpublishAudio = await client.unpublish([localAudioTrack])
      localAudioTrack &&
        Promise.all([disableAudio, unpublishAudio]).then((res) => {
          setLocalAudioTrack(undefined)
          dispatch(toggleAudioSuccess())
        })
    } else {
      const Audio = await AgoraRTC.createMicrophoneAudioTrack()
      const publishAudio = await client.publish([Audio])
      Promise.all([Audio, publishAudio]).then((res) => {
        setLocalAudioTrack(Audio)
        dispatch(toggleAudioSuccess())
      })
    }
  }

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    volumes,
    remoteUsers,
    toggleMuteAudio,
    toggleMuteVideo,
  }
}

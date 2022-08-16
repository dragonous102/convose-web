import { createSelector } from "reselect"

const getCalling = (state) => {
  return state.calling.callingStatus || false
}

export const makeSelectAudioSetting = () =>
  createSelector(
    (state) => state.calling && state.calling.audioSetting,
    (audioSetting) => audioSetting
  )
export const makeGetGroupInfo = () =>
  createSelector(
    (state) => state.calling && state.calling.groupInfo,
    (groupInfo) => groupInfo
  )

export const makeSelectCallingStatus = () =>
  createSelector(getCalling, (callingStatus) => callingStatus)

export const makeGetPeers = () =>
  createSelector(
    (state) => state.calling && state.calling.peers,
    (peers) => peers
  )

export const makeGetIsCaller = () =>
  createSelector(
    (state) => state.calling && state.calling.isCaller,
    (isCaller) => isCaller
  )

export const makeGetIsCalling = () =>
  createSelector(
    (state) => state.calling && state.calling.isCallling,
    (isCallling) => isCallling
  )

export const makeGetIsInCallingScreen = () =>
  createSelector(
    (state) => state.calling && state.calling.isInCallingScreen,
    (isInCallingScreen) => isInCallingScreen
  )

export const makeGetJoinCall = () =>
  createSelector(
    (state) => state.calling && state.calling.joinCall,
    (joinCall) => joinCall
  )

export const makeGetChannel = () =>
  createSelector(
    (state) => state.calling && state.calling.callingChannel,
    (callingChannel) => callingChannel
  )

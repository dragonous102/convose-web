import { createSelector } from "reselect"
import { getUserIdFromChatId } from "../../utils/faye/helpers"

const getUserByUuid = (state, props) => {
  const { profile, users } = state
  if (!profile) return {}
  const { chatId } = props
  const { uuid: myUuid } = profile
  // const onetoone = chatId.indexOf("xx-xx") !== -1;
  // const user = onetoone ? users.profiles[getUserIdFromChatId({ chatId, myUuid })]
  // : users.profiles[chatId] || null;
  const user = users.profiles[getUserIdFromChatId({ chatId, myUuid })] || null
  return user
}

export const makeGetUserByUuid = () =>
  createSelector(getUserByUuid, (user) => user)

const getGroupByChatId = (state, props) => {
  const { profile, users } = state
  if (!profile) return {}
  const { chatId } = props
  const group = users.profiles[chatId]
  return group
}

export const makeGetGroupByChatId = () =>
  createSelector(getGroupByChatId, (group) => group)

const getIsGroupActive = (state, props) => {
  const group = getUserByUuid(state, props)
  if (!group || !group?.participants) return false
  const isActive = Object.values(group.participants).some(
    (profile) => profile.status === "online"
  )
  return isActive
}

export const makeGetIsGroupActive = () =>
  createSelector(getIsGroupActive, (isActive) => isActive)

const getIsActive = (state, props) => {
  const user = getUserByUuid(state, props)
  const isActive = (user && user.status === "online") || false
  return isActive
}

export const makeGetIsActive = () =>
  createSelector(getIsActive, (isActive) => isActive)

const getUsersList = (state) => {
  const {
    users: { list },
  } = state
  return list
}

export const makeGetUsersList = () =>
  createSelector(getUsersList, (list) => list)

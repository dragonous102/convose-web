import { createSelector } from "reselect"

const getMyUuid = (state) => state.profile.uuid

export const makeGetMyUuid = () =>
  createSelector(getMyUuid, (partners) => partners)

const getMyInterests = (state) => state.profile.interests

export const makeGetMyInterests = () =>
  createSelector(getMyInterests, (partners) => partners)

export const getMyAvatarUrl = createSelector(
  (state) => state.profile.avatar && state.profile.avatar.url,
  (avatarUrl) => avatarUrl
)

export const getMyUsername = createSelector(
  (state) => state.profile.username,
  (username) => username
)

// State to get the current state of the user (Logged in or is guest)
export const getIsGuest = createSelector(
  (state) => state.profile.is_guest,
  (is_guest) => is_guest
)

export const getMyThemeColor = createSelector(
  (state) => state.profile.theme_color,
  (themeColor) => themeColor
)

export const getMyFilteredInterests = createSelector(
  getMyInterests,
  (interests) => interests.filter((interest) => !interest.pending)
)

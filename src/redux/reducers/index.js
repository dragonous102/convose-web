import { combineReducers } from "redux"
import alertbar from "./alertbar"
import browser from "./browser"
import chats from "./chats"
import features from "./features"
import group from "./group"
import interests from "./interests"
import modals from "./modals"
import notifications from "./notifications"
import unsendmessages from "./unsendmessage"
import partners from "./partners"
import profile from "./profile"
import registration from "./registration"
import storage from "./storage"
import users from "./users"
import viewport from "./viewport"
import calling from "./calling"

export default combineReducers({
  alertbar,
  browser,
  chats,
  features,
  group,
  interests,
  modals,
  notifications,
  unsendmessages,
  partners,
  profile,
  registration,
  storage,
  users,
  viewport,
  calling,
})

export const getModals = ({ modals }) => modals
export const getProfile = ({ profile }) => profile
export const getProfiles = ({ users }) => users.profiles
export const getNotifications = ({ notifications }) => notifications
export const getFailedMessages = ({ unsendmessages }) => unsendmessages

import { createSelector } from "reselect"

export const getKnowledgeLevelModal = createSelector(
  (state) => state.modals.knowledgeLevelModal,
  (knowledgeLevelModal) => knowledgeLevelModal
)

export const getDisplayMenu = createSelector(
  (state) => state.modals.displayMenu,
  (displayMenu) => displayMenu
)

export const getDisplayAppModal = createSelector(
  (state) => state.modals.displayAppModal,
  (displayAppModal) => displayAppModal
)

const getInboxIsOpen = (state) => state.modals.displayInbox

export const makeGetInboxIsOpen = () =>
  createSelector(getInboxIsOpen, (displayInbox) => displayInbox)

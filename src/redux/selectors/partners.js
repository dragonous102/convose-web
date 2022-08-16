import { createSelector } from "reselect"

const getFilteredPartners = (state) => {
  const isMobileOrTabletView = state.viewport.lessThan.large
  const filteredPartners =
    state.partners.messages.map((message) => message) || []
  // const filteredPartners =
  //   state.partners.messages.filter(
  //     (partner) =>
  //       !state.chats[partner.chatId] || !state.chats[partner.chatId].isOpen
  //   ) || []
  return isMobileOrTabletView ? filteredPartners : filteredPartners.reverse()
}
export const makeGetFilteredPartners = () =>
  createSelector(getFilteredPartners, (partners) => partners)

const getHasUnreadMessages = (state) =>
  getFilteredPartners(state).some((partner) => {
    const {
      indicator: { count, opened },
    } = partner
    return count > 0 && opened === false
  })

export const makeGetHasUnreadMessages = () =>
  createSelector(getHasUnreadMessages, (hasUnreadMessages) => hasUnreadMessages)

export const getUnreadMessages = (state) =>
  getFilteredPartners(state).reduce((acc, partner) => {
    const {
      indicator: { count, opened },
    } = partner
    return count > 0 && opened === false ? acc + count : acc
  }, 0)

export const makeGetUnreadMessages = () =>
  createSelector(getUnreadMessages, (unreadMessages) => unreadMessages)

const getHasMessages = (state) => getFilteredPartners(state).length > 0

export const makeGetHasMessages = () =>
  createSelector(getHasMessages, (hasMessages) => hasMessages)

const getIsLoadingPartner = (state) => state.partners.getIsLoading

export const makeGetIsLoadingPartner = () =>
  createSelector(getIsLoadingPartner, (isLoading) => isLoading)

const getHasNextPage = (state) => state.partners.nextPage

export const makeGetHasNextPage = () =>
  createSelector(getHasNextPage, (nextPage) => nextPage)

const getPartners = (state) => state.partners.profiles

export const makeGetPartners = () =>
  createSelector(getPartners, (partners) => partners)

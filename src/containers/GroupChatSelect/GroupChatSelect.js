import PropTypes from "prop-types"
import PulseLoader from "react-spinners/PulseLoader"
import { connect } from "react-redux"
import { Modal, UserShape } from "../../components"
import { GroupChatSelectList } from "../../components"
import { StyledLoadingContainer, StyledWrapper } from "./Styled"
import {
  selectParticipant,
  deselectParticipant,
  startGroupChat,
  addToGroupChat,
  getUserAddToGroup,
} from "../../redux/actions/group"
import { hideGroupChatModal } from "../../redux/actions/modals"

const GroupChatSelect = (props) => {
  const {
    show,
    hideGroupChatModal,
    selected,
    selectParticipant,
    deselectParticipant,
    startGroupChat,
    addToGroupChat,
    groupChatFrom,
    joining,
    loading,
    getUserAddToGroup,
    profiles,
  } = props
  return (
    <Modal show={show} onClose={hideGroupChatModal} opaque>
      {/* {isMobileOrTabletView ? (
          <Transition
            items={showModal}
            {...transition}
          >
            {show => show && (
              styleProps => (
                <StyledWrapper
                  style={{ ...styleProps }}
                  onClick={e => e.stopPropagation()}
                >
                  {this.renderList()}
                </StyledWrapper>
              )
            )}
          </Transition>
        ) : (
          <StyledWrapper onClick={e => e.stopPropagation()}>
            {this.renderList()}
          </StyledWrapper>
        )} */}

      <StyledWrapper onClick={(e) => e.stopPropagation()}>
        <GroupChatSelectList
          selected={selected}
          profiles={profiles}
          selectParticipant={selectParticipant}
          deselectParticipant={deselectParticipant}
          startGroupChat={startGroupChat}
          addToGroupChat={addToGroupChat}
          getUserAddToGroup={getUserAddToGroup}
          groupChatFrom={groupChatFrom}
          loading={loading}
          joining={joining}
        />
        <StyledLoadingContainer loading={loading} center={!profiles.length}>
          <PulseLoader
            color={"#19aaeb"}
            loading={loading}
            size={15}
            margin={2}
          />
        </StyledLoadingContainer>
      </StyledWrapper>
    </Modal>
  )
}

GroupChatSelect.propTypes = {
  profiles: PropTypes.arrayOf(UserShape),
  show: PropTypes.bool.isRequired,
  groupChatFrom: PropTypes.string.isRequired,
  hideGroupChatModal: PropTypes.func.isRequired,
  selectParticipant: PropTypes.func.isRequired,
  deselectParticipant: PropTypes.func.isRequired,
  startGroupChat: PropTypes.func.isRequired,
  addToGroupChat: PropTypes.func.isRequired,
  getUserAddToGroup: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(UserShape).isRequired,
  loading: PropTypes.bool.isRequired,
  joining: PropTypes.bool.isRequired,
}

const mapStateToProps = () => (state) => ({
  profiles: state.group.users,
  show: state.modals.displayGroupChatSelect,
  groupChatFrom: state.group.type,
  selected: state.group.selected,
  loading: state.group.loading,
  joining: state.group.joining,
})

const mapDispatchToProps = {
  hideGroupChatModal,
  selectParticipant,
  deselectParticipant,
  startGroupChat,
  addToGroupChat,
  getUserAddToGroup,
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatSelect)

import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  Icon,
  InterestShape,
  KnowledgeIconSelector,
  KnowledgeLevelWidget,
  Modal,
} from "../../components"
import { hideKnowledgeLevelModal } from "../../redux/actions/modals"
import { makeGetIsMobileOrTabletView } from "../../redux/selectors/viewport"
import { addOrEditIcon, addOrUpdateInterest } from "../../redux/actions/profile"
import { getKnowledgeLevelModal } from "../../redux/selectors/modals"
import {
  StyledKnowledgeWrapper,
  StyledRatingsDots,
} from "../../components/KnowledgeLevelWidget/Styled"
import { StyledButton } from "../../components/ProfileHeader/Styled"
import KnowledgeIconDarkLightCheck from "../../components/KnowledgeIconDarkLightCheck"

const KnowledgeLevelModal = (props) => {
  const {
    interest,
    show,
    onClose,
    onChange,
    isMobileOrTabletView,
    onEditIcon,
    editIconStep,
  } = props
  const modalProps = {
    show,
    opaque: true,
    centered: true,
    zIndex: 200,
    onClose,
  }
  const { level, type } = interest
  const widgetProps = {
    interest,
    onChange,
    onClose,
    isMobileOrTabletView,
    onEditIcon,
    editIconStep,
  }

  const KnowledgeModalController = () => {
    switch (editIconStep) {
      case 1:
        return <KnowledgeIconSelector {...widgetProps} />
      case 2:
        return <KnowledgeIconDarkLightCheck {...widgetProps} />
      default:
        return interest && <KnowledgeLevelWidget {...widgetProps} />
    }
  }

  const onBackButtonClick = () => {
    onEditIcon(editIconStep - 1, interest)
  }

  return (
    <Modal {...modalProps}>
      <StyledKnowledgeWrapper level={level} type={type}>
        {editIconStep > 0 && (
          <StyledButton
            positionAbsolute
            width="20px"
            height="20px"
            padding="none"
            leftAbsolute="11px"
            topAbsolute="15px"
            backgroundColor="#ffffff"
            marginBottom="0px"
            onClick={onBackButtonClick}
          >
            <Icon iconId="back" width="11px" />
          </StyledButton>
        )}
        <StyledRatingsDots level={level} type={type}>
          <KnowledgeModalController />
        </StyledRatingsDots>
      </StyledKnowledgeWrapper>
    </Modal>
  )
}

KnowledgeLevelModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditIcon: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  interest: InterestShape.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

const mapActionsToProps = {
  onChange: addOrUpdateInterest,
  onClose: hideKnowledgeLevelModal,
  onEditIcon: addOrEditIcon,
}

const mapStateToProps = () => {
  const getIsMobileOrTabletView = makeGetIsMobileOrTabletView()
  return (state, props) => ({
    ...props,
    show: getKnowledgeLevelModal(state).show,
    interest: getKnowledgeLevelModal(state).interest,
    editIconStep: getKnowledgeLevelModal(state).editIconStep,
    isMobileOrTabletView: getIsMobileOrTabletView(state),
  })
}

export default connect(mapStateToProps, mapActionsToProps)(KnowledgeLevelModal)

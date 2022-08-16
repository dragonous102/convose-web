import PropTypes from "prop-types"
import { InterestShape } from "../../utils/shapes"
import Icon from "../Icon"
import { StyledText } from "../KnowledgeLevelWidget/Styled"
import FilesDragAndDrop from "@yelysei/react-files-drag-and-drop"
import { dragAndDropContainerStyle, StyledUploadIconButton } from "./Styled"
import { checkOnline } from "../../utils/browserUtils"
import { getBase64, loadImage } from "../../api/utils"
import { StyledImageSelector } from "../ChatMessageForm/Styled"

const KnowledgeIconSelector = (props) => {
  const { interest, isMobileOrTabletView, onEditIcon, editIconStep } = props
  const { name } = interest

  const uploadingIcon = (files) => {
    if (!checkOnline()) return
    files.forEach((file) => {
      getBase64(file).then((data) => {
        loadImage(data)
          .then((img) => {
            interest["uploadIcon"] = img?.src
            onEditIcon(editIconStep + 1, interest)
          })
          .catch((err) => console.error(err))
      })
    })
  }

  const onUploadIconClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.nativeEvent.target
    uploadingIcon([files[0]])
  }

  return (
    <>
      <StyledText verticalMargin="7.5px">Choose an icon for</StyledText>
      <StyledText verticalMargin="7.5px">{name}</StyledText>
      <FilesDragAndDrop
        onUpload={(files) => uploadingIcon(files)}
        count={3}
        formats={["jpg", "png", "svg", "jpeg"]}
        containerStyles={dragAndDropContainerStyle}
        openDialogOnClick={false}
      >
        <p>Drag image here or</p>
      </FilesDragAndDrop>
      <StyledUploadIconButton primary htmlFor="uploadIconButton">
        <Icon iconId="image" width={isMobileOrTabletView ? "20px" : "17px"} />
        upload from computer
        <StyledImageSelector
          type="file"
          id="uploadIconButton"
          onChange={onUploadIconClick}
        />
      </StyledUploadIconButton>
    </>
  )
}

KnowledgeIconSelector.propTypes = {
  interest: InterestShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditIcon: PropTypes.func.isRequired,
  isMobileOrTabletView: PropTypes.bool.isRequired,
}

export default KnowledgeIconSelector

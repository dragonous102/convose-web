import FilesDragAndDrop from "@yelysei/react-files-drag-and-drop"
import { getBase64, loadImage } from "../../api/utils"

const UploadDropImage = ({ children, isOpen, onSendImage }) => {
  return (
    <FilesDragAndDrop
      onUpload={(files) => {
        files.forEach((file) => {
          getBase64(file).then((data) => {
            loadImage(data)
              .then((img) => {
                const ratio = img.height / img.width

                onSendImage({
                  data,
                  ratio,
                })
              })
              .catch((err) => console.error(err))
          })
        })
      }}
      count={5}
      formats={["jpg", "png", "svg", "jpeg"]}
      openDialogOnClick={false}
      hoverText="Upload Image"
      hoverMessageStyles={
        isOpen
          ? {
              background: "#a9a9a960",
              color: "black",
              borderRadius: "12px",
              fontFamily: "Poppins",
            }
          : {
              background: "#a9a9a960",
              color: "black",
              borderRadius: "27px",
              fontFamily: "Poppins",
            }
      }
    >
      {children}
    </FilesDragAndDrop>
  )
}

export default UploadDropImage

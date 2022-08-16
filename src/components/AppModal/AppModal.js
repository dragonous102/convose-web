import { AppBadge, AppTeaser, Modal } from "../../components"

const AppModal = ({ isAndroid, isIOS, onClose }) => {
  return (
    <Modal show={true} onClose={undefined} centered fullScreen>
      <AppTeaser onClose={onClose}>
        <AppBadge isIOS={isIOS} isAndroid={isAndroid} />
      </AppTeaser>
    </Modal>
  )
}

export default AppModal

import { useEffect, useRef } from "react"
import Scrollbars from "react-custom-scrollbars"
import ChatInterestList from "../ChatInterestList"

const Interests = ({ interests }) => {
  let listEl = useRef(null)

  useEffect(() => {
    listEl.scrollToTop()
  }, [])
  return (
    <Scrollbars
      ref={(ref) => {
        listEl = ref
      }}
      autoHide
      renderTrackHorizontal={(props) => (
        <div
          {...props}
          className="track-horizontal"
          style={{ display: "none", overflowX: "hidden" }}
        />
      )}
    >
      <ChatInterestList interests={interests} showAll topPadding={30} />
    </Scrollbars>
  )
}

export default Interests

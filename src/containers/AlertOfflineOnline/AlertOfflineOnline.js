import { Detector } from "react-detect-offline"
import iconOffline from "./offline.png"
import iconOnline from "./online.png"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { getBrowserIsAnimate } from "../../redux/selectors/browser"
import "./AlertOfflineOnline.css"
import { initResendFailedMessage } from "../../redux/actions/chats"
import { useState } from "react"
const AlertOfflineOnline = ({ animate, initResendFailedMessage }) => {
  const [prevState, setPrevState] = useState(true)
  const handleChange = (online) => {
    if (online) initResendFailedMessage(true)
  }
  return (
    <Detector
      onChange={handleChange}
      render={({ online }) => {
        return (
          <div
            className={`offline-online-container ${
              animate == true ? "animate-offline" : ""
            } ${online ? "bg-online" : "bg-offline"}`}
          >
            <span style={{ fontSize: "17px" }}>
              You are {online ? "online" : "offline"}
            </span>
            <img
              src={online ? iconOnline : iconOffline}
              className={`offline-online-img`}
            />
          </div>
        )
      }}
    />
  )
}
const mapDispatchToProps = {
  initResendFailedMessage,
}
const makeMapStateToProps = () => {
  return (state, props) => ({
    animate: getBrowserIsAnimate(state),
  })
}

export default withRouter(
  connect(makeMapStateToProps, mapDispatchToProps)(AlertOfflineOnline)
)

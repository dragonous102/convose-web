import { createResponsiveStateReducer } from "redux-responsive"

export default createResponsiveStateReducer(
  {
    extraSmall: 480,
    small: 720,
    medium: 1024,
    large: 1280,
  },
  {
    extraFields: () => ({
      height: window.innerHeight,
    }),
  }
)

import features from "../../config"

const initialState = {
  ...features(),
}

export default function (state = initialState) {
  return state
}

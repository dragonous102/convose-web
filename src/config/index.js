import developmentConfig from "./development.json"
import productionConfig from "./production.json"

const getConfig = () => {
  let config = productionConfig
  if (process.env.NODE_ENV === "development") {
    config = developmentConfig
  }
  return config
}

export default () => {
  const config = getConfig()
  // eslint-disable-next-line no-restricted-globals
  const params = new URL(location.href).searchParams
  const featureParams = params.get("features") || ""

  const overwrites = featureParams.split(",").reduce((obj, feature) => {
    const splitFeature = feature.split("=")
    return {
      ...obj,
      [splitFeature[0]]: splitFeature[1] === "true",
    }
  }, {})

  return {
    ...config,
    ...overwrites,
  }
}

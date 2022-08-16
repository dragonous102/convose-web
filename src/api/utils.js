export const checkStatus = (response) => {
  const { status } = response
  if (response.status === 204) {
    return response.text()
  }
  const json = response.json()
  if (response.ok) {
    return json
  }
  return json.then((error) => {
    if (
      Object.prototype.hasOwnProperty.call(error, "errors") &&
      Object.prototype.hasOwnProperty.call(error.errors, "email")
    ) {
      return { emailTaken: true }
    }
    let errorMessage
    if (typeof error === "string") {
      errorMessage = error
    } else if (Object.prototype.hasOwnProperty.call(error, "error")) {
      errorMessage = error.error
    } else {
      errorMessage = "Unhandled Error."
    }
    const errorObj = new Error(errorMessage)
    // error needs to be a string, but can have additional props, we need the status sometimes
    errorObj.status = status
    throw errorObj
  })
}
export const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", (err) => reject(err))
    img.src = url
  })

const baseUrl = "https://res.cloudinary.com/hj0txfloi/image/upload/"
const isInCloudinary = (src, width, ratio) => {
  let url
  if (src && src.length < 300) {
    if (src.search(/cloudinary/) !== -1) {
      const arrayUrl = src.split("/")
      url = `${baseUrl}c_scale,h_${
        ratio ? Math.round(width * ratio) : 100
      },w_${width}/${arrayUrl[arrayUrl.length - 2]}/${
        arrayUrl[arrayUrl.length - 1]
      }`
    }
  } else {
    url = src
  }

  return url
}
export const calculateImageDimension = (ratio, src) => {
  let width = 250
  let height = ratio ? Math.round(100 * ratio) : 100
  if (ratio && ratio >= 1) {
    let numsubstract = ratio * 80
    width = width - numsubstract < 50 ? 50 : Math.round(width - numsubstract)
  }
  let url = isInCloudinary(src, width, ratio)

  return {
    width,
    height,
    url,
  }
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

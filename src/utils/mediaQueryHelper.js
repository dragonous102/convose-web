import { css } from "styled-components/macro"

const breakPoints = {
  ultrawide: 1440,
  cinema: 1280,
  desktop: 1024,
  lap: 720,
  palm: 480,
}

const media = Object.keys(breakPoints).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = breakPoints[label] / 16

  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const e = function (selector) {
  let element = document.querySelector(selector)
  if (element === null) {
    let s = `Element not found, selector ${selector} is wrong or js is not in the body`
    console.log(s)
    return null
  } else {
    return element
  }
}

export { breakPoints, media, e }

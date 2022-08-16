export const formatToMinuteAndSecondDisplay = (timeInMs) => {
  const elapsed = new Date(timeInMs)
  const mins = elapsed.getUTCMinutes()
  const secs = elapsed.getUTCSeconds()

  return `${mins}:${secs > 9 ? secs : `0${secs}`}`
}

export const formatTrailingMilliseconds = (timeInMs) => {
  const elapsed = new Date(timeInMs)
  const csecs = Math.trunc(elapsed.getUTCMilliseconds() / 10)
  return `${csecs > 9 ? csecs : `0${csecs}`}`
}

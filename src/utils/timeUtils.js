export const timeFormater = (date) => {
  const parsedDate = new Date(date)
  const hours = parsedDate.getHours().toString()
  const minutes = parsedDate.getMinutes().toString()
  return `${hours.length === 1 ? "0" : ""}${hours}:${
    minutes.length === 1 ? "0" : ""
  }${minutes}`
}

export const timeFormaterFromSecs = (seconds) => {
  const date = new Date(null)
  date.setSeconds(seconds) // specify value for SECONDS here
  const timeString = date.toISOString().substr(15, 4)
  return timeString
}

export const timestampToDisplayString = (date) => {
  const oneDay = 24 * 60 * 60 * 1000
  const today = new Date(Date.now())
  const yesterday = new Date(new Date().valueOf() - oneDay)
  const normalizedDate = new Date(date)

  today.setUTCHours(0, 0, 0, 0)
  yesterday.setUTCHours(0, 0, 0, 0)
  normalizedDate.setUTCHours(0, 0, 0, 0)

  const differenceInDays = Math.round(
    Math.abs((normalizedDate.getTime() - today.getTime()) / oneDay)
  )
  // eslint-disable-next-line no-nested-ternary,max-len
  const displayString =
    date >= today
      ? timeFormater(date)
      : date > yesterday
      ? "yesterday"
      : `${differenceInDays} days ago`

  return displayString
}

export const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}

export const minutesAndSecondsToDisplayString = (string) => {
  const minutes = parseInt(string.split(":", 1))
  const seconds = parseInt(string.split(":", 2)[1])
  const formateMinutes =
    minutes == 0 ? " " : minutes == 1 ? ` 1 minute ` : ` ${minutes} minutes`
  const formatSeconds =
    seconds == 0 ? " " : seconds == 1 ? ` 1 second ` : ` ${seconds} seconds`
  return `${formateMinutes} ${formatSeconds}`
}

import { useEffect, useRef, useState } from "react"

const useTimer = () => {
  let startTime
  let interval
  const timerRef = useRef()
  const timerSubRef = useRef()

  const run = () => {
    const now = new Date()
    const elapsed = new Date(now - startTime)
    const mins = elapsed.getUTCMinutes()
    const secs = elapsed.getUTCSeconds()
    const csecs = Math.trunc(elapsed.getUTCMilliseconds() / 10)

    const time = `${mins}:${secs > 9 ? secs : `0${secs}`}`
    const timeSub = `${csecs > 9 ? csecs : `0${csecs}`}`

    timerRef.current.innerHTML = time
    timerSubRef.current.innerHTML = timeSub
  }

  const stopTimer = () => {
    if (interval) {
      clearInterval(interval)
      interval = undefined
    }
  }

  const resetTimer = () => {
    timerRef.current.innerHTML = `0:00`
    timerSubRef.current.innerHTML = `00`
  }

  const startTimer = () => {
    resetTimer()
    stopTimer()
    startTime = new Date()
    interval = setInterval(() => {
      run()
    }, 10)
  }

  useEffect(() => {
    return () => {
      stopTimer()
    }
  }, [])

  return [timerRef, timerSubRef, startTimer, stopTimer, resetTimer]
}

const useTimerV2 = () => {
  const [elapsedTimeInMs, setElapsedTimeInMs] = useState(0)
  // DEVNOTE, using ref here to combat the weird scoping issue in consumer of timer
  const elapsedTimeInMsRef = useRef(0)
  const [start, setStart] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [startTime, setStartTime] = useState(new Date())

  const setElapsedTimeInMsHandler = (time) => {
    elapsedTimeInMsRef.current = time
    setElapsedTimeInMs(time)
  }

  const resetTimer = () => {
    setElapsedTimeInMsHandler(0)
    setStartTime(new Date())
  }

  const stopTimer = () => {
    setIsPause(true)
  }

  const startTimer = () => {
    setStart(true)
    setIsPause(false)
  }

  useEffect(() => {
    if (isPause) {
      setStart(false)
    }
  }, [isPause])

  useEffect(() => {
    let interval = null

    if (start) {
      interval = setInterval(() => {
        const now = new Date()
        setElapsedTimeInMsHandler(now - startTime)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [start, startTime])

  return [
    startTimer,
    stopTimer,
    resetTimer,
    elapsedTimeInMs,
    elapsedTimeInMsRef,
  ]
}

// export default useTimer
export default useTimerV2

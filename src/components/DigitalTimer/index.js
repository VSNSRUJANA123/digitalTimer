import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

// // Write your code here
// import {Component} from 'react'
// import './index.css'

// class DigitalTimer extends Component {
//   state = {setClock: false, timeLimit: 25}

//   playClock = () => {
//     // const {timeLimit} = this.state
//     this.setState({setClock: true})
//   }

//   pauseClock = () => {
//     this.setState({setClock: false})
//   }

//   minus = () => {
//     const {timeLimit} = this.state
//     this.setState({
//       timeLimit: timeLimit - 1,
//     })
//   }

//   plus = () => {
//     const {timeLimit} = this.state
//     this.setState({
//       timeLimit: timeLimit + 1,
//     })
//   }

//   reset = () => {
//     const {timeLimit} = this.state
//     this.setState({
//       timeLimit: 25,
//     })
//   }

//   render() {
//     const {setClock, timeLimit} = this.state
//     return (
//       <div className="bgContainer">
//         <h1>Digital Timer</h1>
//         <div className="timingContainer">
//           <div className="clockContainer">
//             <div className="clock">
//               <h1>{timeLimit}:00</h1>
//               {setClock ? <p>Running</p> : <p>Paused</p>}
//             </div>
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png"
//               alt="clock"
//               className="bgClock"
//             />
//           </div>
//           <div className="timeSetupContainer">
//             <div className="iconsContainer">
//               {setClock ? (
//                 <div className="icons">
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
//                     alt="pause icon"
//                     onClick={this.pauseClock}
//                   />
//                   <p>Pause</p>
//                 </div>
//               ) : (
//                 <div className="icons">
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
//                     alt="play icon"
//                     onClick={this.playClock}
//                   />
//                   <p>Start</p>
//                 </div>
//               )}
//               <div className="icons">
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
//                   alt="reset icon"
//                   onClick={this.reset}
//                 />
//                 <p>Reset</p>
//               </div>
//             </div>
//             <div className="setTimeLimit">
//               <p>Set Time Limit</p>
//               <button onClick={this.minus}>-</button>
//               <span>{timeLimit}</span>
//               <button onClick={this.plus}>+</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default DigitalTimer

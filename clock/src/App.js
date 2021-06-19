import React, { Component } from "react";
import TimerOption from "./timerOption";
import "./App.scss";

const audio = document.getElementById("beep");
class App extends Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 1500,
    currentTimer: "Session",
    isPlaying: false,
  };

  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  convertTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // prettier-ignore
    if (seconds < 10) {seconds = "0" + seconds;}
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${minutes} : ${seconds}`;
  };

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false,
      });
    } else {
      this.setState({
        isPlaying: true,
      });
      this.loop = setInterval(() => {
        const {
          breakCount,
          sessionCount,
          clockCount,
          currentTimer,
        } = this.state;
        let newTimer = currentTimer === "Session" ? "Break" : "Session";
        let newClockCount =
          currentTimer === "Session" ? breakCount * 60 : sessionCount * 60;
        if (clockCount === 0) {
          audio.play();
          this.setState({
            currentTimer: newTimer,
            clockCount: newClockCount,
          });
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1000);
    }
  };
  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      isPlaying: false,
    });
    clearInterval(this.loop);

    audio.pause();
    audio.currentTime = 0;
  };

  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;
    if (currentTimer === "Session") {
      this.setState({
        clockCount: sessionCount * 60,
      });
    }
    if (sessionCount < 60 && !isPlaying) {
      this.setState({
        sessionCount: sessionCount + 1,
      });
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;

    if (currentTimer === "Session") {
      this.setState({
        clockCount: sessionCount * 60,
      });
    }
    if (sessionCount > 1 && !isPlaying) {
      this.setState({
        sessionCount: sessionCount - 1,
      });
    }
  };

  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;
    if (currentTimer === "Break") {
      this.setState({
        clockCount: breakCount * 60,
      });
    }
    if (breakCount < 60 && !isPlaying) {
      this.setState({
        breakCount: breakCount + 1,
      });
    }
  };
  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;
    if (currentTimer === "Break") {
      this.setState({
        clockCount: breakCount * 60,
      });
    }
    if (breakCount > 1 && !isPlaying) {
      this.setState({
        breakCount: breakCount - 1,
      });
    }
  };

  render() {
    const {
      sessionCount,
      breakCount,
      currentTimer,
      isPlaying,
      clockCount,
    } = this.state;

    const breakTimerProps = {
      title: "Break Length",
      count: breakCount,
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease,
    };
    const sessionTimerProps = {
      title: "Session Length",
      count: sessionCount,
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease,
    };

    return (
      <div className="app">
        <header className="header">
          <h1 className="header-heading">25 + 5 Clock</h1>
        </header>
        <main className="container">
          <section className="clock_option">
            <TimerOption {...breakTimerProps} />
            <TimerOption {...sessionTimerProps} />
          </section>
          <section className="clock_display">
            <h3 className="clock_display-heading">{currentTimer}</h3>

            <i
              className={`btn fas fa-${isPlaying ? "pause" : "play"}`}
              onClick={this.handlePlayPause}
            ></i>
            <span
              className={`clock_timer ${
                clockCount < 60 ? "clock_timer--danger" : ""
              }`}
            >
              {this.convertTime(clockCount)}
            </span>
            <i className="btn fas fa-sync" onClick={this.handleReset}></i>
          </section>
        </main>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }
}

export default App;

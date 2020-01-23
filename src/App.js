import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeBreak: 5,
      timeSession: 25,
      timeMin: 25,
      timeSec: 0,
      timeState: false,
      timeLabel: 'Session'
    };
    this.handleBreakInc = this.handleBreakInc.bind(this);
    this.handleBreakDec = this.handleBreakDec.bind(this);
    this.handleSessionInc = this.handleSessionInc.bind(this);
    this.handleSessionDec = this.handleSessionDec.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
    this.handleStartSession = this.handleStartSession.bind(this);
    this.handleStartBreak = this.handleStartBreak.bind(this);
    this.returnClock = this.returnClock.bind(this);
  };
  
  handleBreakInc() {
    if(this.state.timeBreak < 60) {
      if(this.state.timeLabel == "Break") {
        this.setState({
          timeBreak: this.state.timeBreak += 1,
          timeSec: 0
        });
      } else {
        this.setState({
          timeBreak: this.state.timeBreak += 1,
        });
      }
    }
  }
  handleBreakDec() {
    if(this.state.timeBreak > 1) {
      if(this.state.timeLabel == "Break") {
        this.setState({
          timeBreak: this.state.timeBreak -= 1,
          timeSec: 0
        });
      } else {
        this.setState({
          timeBreak: this.state.timeBreak -= 1,
        });
      }
    }
  }
  handleSessionInc() {
    if(this.state.timeSession < 60) {
      this.setState({
        timeSession: this.state.timeSession += 1,
        timeMin: this.state.timeSession,
        timeSec: 0
      });
    }
  }
  handleSessionDec() {
    if(this.state.timeSession > 1) {
      this.setState({
        timeSession: this.state.timeSession -= 1,
        timeMin: this.state.timeSession,
        timeSec: 0
      });
    }
  }
  handleReset() {
    this.setState({
      timeBreak: 5,
      timeSession: 25,
      timeMin: 25,
      timeSec: 0,
      timeState: false,
      timeLabel: 'Session'
    });
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }
  handleStartStop() {
    console.log(this.state.timeState)
    this.setState({
      timeState: !this.state.timeState
    });
    this.handleInterval();
  }
  handleInterval() {
    if(this.state.timeLabel == 'Session') {
      setTimeout(this.handleStartSession, 1000)
    } else {
      setTimeout(this.handleStartBreak, 1000)
    }
  }
  handleStartSession() {
    if(this.state.timeState) {
      if(this.state.timeMin == 0 && this.state.timeSec == 0) {
        const sound = document.getElementById("beep");
        sound.currentTime = 0;
        sound.play();
        this.setState({
          timeMin: this.state.timeBreak,
          timeLabel: 'Break'
        });
        this.handleInterval();
      } else if(this.state.timeSec > 0) {
        this.setState({
          timeSec: this.state.timeSec - 1                                    
        });
      } else {
        this.setState({
          timeSec: 59,
          timeMin: this.state.timeMin - 1 
        });
      }
      this.handleInterval();
    }
  }
  handleStartBreak() {
    if(this.state.timeState) {
      if(this.state.timeMin == 0 && this.state.timeSec == 0) {
          const sound = document.getElementById("beep");
          sound.currentTime = 0;
          sound.play();
          this.setState({
            timeMin: this.state.timeSession,
            timeLabel: 'Session'
          });
          this.handleInterval();
        } else if(this.state.timeSec > 0) {
          this.setState({
            timeSec: this.state.timeSec - 1                                    
          });
        } else {
          this.setState({
            timeSec: 59,
            timeMin: this.state.timeMin - 1 
          });
        }
        this.handleInterval();
      }
    }
  returnClock() {
    const minute = this.state.timeMin;
    const second = this.state.timeSec;
    return (minute < 10 ? '0' : '') + minute + ':' + (second < 10 ? '0' : '') + second
  }
 
  render() {
    const bodyStyle = {
      background: "linear-gradient(grey 60%, black 250%)",
      boxShadow: "3px 3px 20px black",
      border: "solid 5px silver",
      borderRadius: "2em",
      width: "50%",
      margin: "auto",
      marginTop: ".5em",
      padding: "1em",
      fontSize: "210%",
      textAlign: "center",
      fontFamily: "Orbitron, sans-serif"
    }
    const butStyle = {
      display: "block",
      backgroundColor: "silver",
      borderRadius: "1em",
      boxShadow: "3px 3px 20px black",
      margin: "auto"
    }
    const butClockStyle = {
      background: "none",
      border: "none",
      margin: "0.25em"
    }
    const displayStyle = {
      backgroundColor: "green",
      width: "7em",
      margin: "auto",
      padding: "0.25em",
      border: "solid 3px black",
      boxShadow: "3px 3px 10px black",
      background: "linear-gradient(green 60%, black 250%)"
    }
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      margin: "2em",
      marginBottom: "0em",
      marginTop: "0em",
      padding: "0em"
    }
    return(
      <div style={bodyStyle}>
        <div>
          <div>
            <audio id="beep" preload="auto" src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" type="audio/mpeg"></audio>
            <h1 id="timer-label" class="font-weight-bold" style={{fontFamily: "Orbitron, sans-serif"}}>{this.state.timeLabel}</h1>
            <div style={displayStyle}>
              <h1 id="time-left" style={{fontFamily: "Orbitron, sans-serif"}}>        {this.returnClock()}
              </h1>
            </div>
            <div>
              <button id="start_stop" onClick={this.handleStartStop} style={butClockStyle}>
                <i class="fas fa-play"></i><i class="fas fa-pause"></i>
              </button>
              <button id="reset" onClick={this.handleReset} style={butClockStyle}>
                <i class="fas fa-history"></i>
              </button>
            </div>
          </div>
          <div style={gridStyle}>
            <div>
              <p id="break-label" class="font-weight-bold">Break Length</p>
              <div style={gridStyle}>
                <div id="break-length">{this.state.timeBreak}</div>
                <div>
                  <button id="break-increment" style={butStyle} onClick={this.handleBreakInc}>
                    <i class="fas fa-sort-up"></i>
                  </button>
                  <button id="break-decrement" style={butStyle} onClick={this.handleBreakDec}>
                    <i class="fas fa-sort-down"></i>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p id="session-label" class="font-weight-bold">Session Length</p>
              <div style={gridStyle}>
                <div>
                  <button id="session-increment"style={butStyle} onClick={this.handleSessionInc}>
                    <i class="fas fa-sort-up"></i>
                  </button>
                  <button id="session-decrement" style={butStyle} onClick={this.handleSessionDec}>
                    <i class="fas fa-sort-down"></i>
                  </button>
                </div>
                <div id="session-length">{this.state.timeSession}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;

const EventEmitter = require("events").EventEmitter;
const spawn = require("child_process").spawn;

module.exports = class BalanceBoard extends EventEmitter {
  constructor() {
    super();
    //Python code that tries to connect to balance board and recieves its data when connected
    this.boardListener = null;
    this.boardConnected = false;
  }

  //Try to connect to the balance board and recieve data. The sync button has to be pressed to connect to the board
  connect() {
    this.boardListener = spawn("python", ["boardListener.py"]);
    this.boardListener.stdout.on("data", this.processBalanceBoardData);
  }

  //Stop trying to connect to the balance board
  disconnect() {
    if (this.boardListener != null) {
      this.boardListener.stdin.pause();
      this.boardListener.kill();
      this.boardListener = null;
    }
  }

  //Check if the balance board is currently connected
  isConnected() {
    return this.boardConnected;
  }

  processBalanceBoardData(data) {
    try {
      var balanceBoardFrame = JSON.parse(data.toString());
      if (balanceBoardFrame.connected) {
        //Recieved data from connected balance board
        this.boardConnected = true;
        this.emit("data", balanceBoardFrame);
      } else {
        //Balance board is disconnected
        this.boardConnected = false;
      }
    } catch (error) {
      //JSON.parse isnt always successful as a easy fix we catch these cases here
      return;
    }
  }
};

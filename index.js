const EventEmitter = require("events").EventEmitter;
const spawn = require("child_process").spawn;
const BalanceBoard = new EventEmitter();

//Python code that tries to connect to balance board and recieves its data when connected
var BoardListener = null;
var boardConnected = false;

function processBalanceBoardData(data) {
  try {
    var balanceBoardFrame = JSON.parse(data.toString());
    if (balanceBoardFrame.connected) {
      //Recieved data from connected balance board
      boardConnected = true;
      BalanceBoard.emit("data", balanceBoardFrame);
    } else {
      //Balance board is disconnected
      boardConnected = false;
    }
  } catch (error) {
    //JSON.parse isnt always successful as a easy fix we catch these cases here
    return;
  }
}

//Try to connect to the balance board and recieve data. The sync button has to be pressed to connect to the board
BalanceBoard.connect = function() {
  BoardListener = spawn("python", ["boardListener.py"]);
  BoardListener.stdout.on("data", processBalanceBoardData);
};

//Stop trying to connect to the balance board
BalanceBoard.disconnect = function() {
  if (BoardListener != null) {
    BoardListener.stdin.pause();
    BoardListener.kill();
    BoardListener = null;
  }
};

//Check if the balance board is currently connected
BalanceBoard.isConnected = function() {
  return boardConnected;
};

module.exports = BalanceBoard;

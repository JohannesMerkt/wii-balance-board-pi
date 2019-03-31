const BalanceBoard = require("./index");

var b = new BalanceBoard();

b.connect();

b.on("data", data => {
  console.log(data);
});
